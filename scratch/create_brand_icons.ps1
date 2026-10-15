Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Get-Location) "public/page logo.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Content bounds: X=70, Y=134, W=1824, H=556
$fullW = 1824
$fullH = 556
$srcRect = New-Object System.Drawing.Rectangle 70, 134, $fullW, $fullH

# 1. Transparent 512x512 square (proportional, never squashed)
$bmpTrans = New-Object System.Drawing.Bitmap 512, 512, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gTrans = [System.Drawing.Graphics]::FromImage($bmpTrans)
$gTrans.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gTrans.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gTrans.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gTrans.Clear([System.Drawing.Color]::Transparent)

# Fit width into 480px
$fitW = 480
$scale = $fitW / $fullW
$fitH = [int]($fullH * $scale)
$destX = [int]((512 - $fitW) / 2)
$destY = [int]((512 - $fitH) / 2)
$destRect = New-Object System.Drawing.Rectangle $destX, $destY, $fitW, $fitH
$gTrans.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gTrans.Dispose()
$bmpTrans.Save((Join-Path (Get-Location) "public/favicon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Also 32x32 and 16x16
$bmp32 = New-Object System.Drawing.Bitmap 32, 32, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g32 = [System.Drawing.Graphics]::FromImage($bmp32)
$g32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g32.DrawImage($bmpTrans, 0, 0, 32, 32)
$g32.Dispose()
$bmp32.Save((Join-Path (Get-Location) "public/favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$bmp16 = New-Object System.Drawing.Bitmap 16, 16, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g16 = [System.Drawing.Graphics]::FromImage($bmp16)
$g16.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g16.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g16.DrawImage($bmpTrans, 0, 0, 16, 16)
$g16.Dispose()
$bmp16.Save((Join-Path (Get-Location) "public/favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Dark Luxury Badge (512x512) for Taskbar & Apple Touch Icon
# Dark charcoal background with subtle border, Red PAGE logo, white THINK NEXT
$bmpDark = New-Object System.Drawing.Bitmap 512, 512, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gDark = [System.Drawing.Graphics]::FromImage($bmpDark)
$gDark.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gDark.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gDark.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Fill dark background #0a0a0c
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 12, 12, 15))
$gDark.FillRectangle($bgBrush, 0, 0, 512, 512)

# Copy the cropped logo with white text for "THINK NEXT"
# First render onto temp bitmap
$tempBmp = New-Object System.Drawing.Bitmap $fitW, $fitH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gTemp = [System.Drawing.Graphics]::FromImage($tempBmp)
$gTemp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gTemp.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gTemp.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $fitW, $fitH), $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gTemp.Dispose()

# Convert dark pixels (THINK NEXT) to bright white/silver for contrast
for ($y = 0; $y -lt $fitH; $y++) {
    for ($x = 0; $x -lt $fitW; $x++) {
        $c = $tempBmp.GetPixel($x, $y)
        if ($c.A -gt 30) {
            # If it's the black text (R, G, B all low)
            if ($c.R -lt 70 -and $c.G -lt 70 -and $c.B -lt 70) {
                $tempBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($c.A, 255, 255, 255))
            }
        }
    }
}

$gDark.DrawImage($tempBmp, $destX, $destY)

# Add a subtle red accent line or border at the bottom
$accentPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 220, 38, 38)), 4
$gDark.DrawLine($accentPen, 32, 508, 480, 508)
$accentPen.Dispose()

$gDark.Dispose()
$bgBrush.Dispose()
$tempBmp.Dispose()

$bmpDark.Save((Join-Path (Get-Location) "public/icon-512.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpDark.Save((Join-Path (Get-Location) "public/apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$bmp192 = New-Object System.Drawing.Bitmap 192, 192, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g192 = [System.Drawing.Graphics]::FromImage($bmp192)
$g192.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g192.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g192.DrawImage($bmpDark, 0, 0, 192, 192)
$g192.Dispose()
$bmp192.Save((Join-Path (Get-Location) "public/icon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
Write-Host "Icons successfully generated!"
