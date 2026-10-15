Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Get-Location) "public/page logo.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Source bounds of "P"
$pX = 65
$pY = 136
$pW = 484
$pH = 510

# 1. Generate 512x512 transparent "P" emblem favicon.png
$size = 512
$bmp512 = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp512)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Fit P inside 512x512 with padding (say 430px tall)
$targetH = 430
$scale = $targetH / $pH
$targetW = [int]($pW * $scale)
$destX = [int](($size - $targetW) / 2)
$destY = [int](($size - $targetH) / 2)

$srcRect = New-Object System.Drawing.Rectangle $pX, $pY, $pW, $pH
$destRect = New-Object System.Drawing.Rectangle $destX, $destY, $targetW, $targetH

$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$favPngPath = Join-Path (Get-Location) "public/favicon.png"
$bmp512.Save($favPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/favicon.png (512x512)"

# 2. Generate 32x32 favicon
$bmp32 = New-Object System.Drawing.Bitmap 32, 32, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g32 = [System.Drawing.Graphics]::FromImage($bmp32)
$g32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g32.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g32.Clear([System.Drawing.Color]::Transparent)
$g32.DrawImage($bmp512, 0, 0, 32, 32)
$g32.Dispose()
$bmp32.Save((Join-Path (Get-Location) "public/favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/favicon-32x32.png"

# 3. Generate 16x16 favicon
$bmp16 = New-Object System.Drawing.Bitmap 16, 16, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g16 = [System.Drawing.Graphics]::FromImage($bmp16)
$g16.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g16.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g16.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g16.Clear([System.Drawing.Color]::Transparent)
$g16.DrawImage($bmp512, 0, 0, 16, 16)
$g16.Dispose()
$bmp16.Save((Join-Path (Get-Location) "public/favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/favicon-16x16.png"

# 4. Generate 180x180 apple-touch-icon.png with premium dark rounded container
$bmpApple = New-Object System.Drawing.Bitmap 180, 180, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gApple = [System.Drawing.Graphics]::FromImage($bmpApple)
$gApple.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gApple.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gApple.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 15, 15, 18))
$gApple.FillRectangle($bgBrush, 0, 0, 180, 180)
# Draw P in center (120px tall)
$appleH = 124
$scaleA = $appleH / $pH
$appleW = [int]($pW * $scaleA)
$aDestX = [int]((180 - $appleW) / 2)
$aDestY = [int]((180 - $appleH) / 2)
$aDestRect = New-Object System.Drawing.Rectangle $aDestX, $aDestY, $appleW, $appleH
$gApple.DrawImage($src, $aDestRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gApple.Dispose()
$bgBrush.Dispose()
$bmpApple.Save((Join-Path (Get-Location) "public/apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/apple-touch-icon.png (180x180)"

# 5. Generate 512x512 PWA / Taskbar icon with dark background (windows taskbar loves this)
$bmpDark512 = New-Object System.Drawing.Bitmap 512, 512, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gDark = [System.Drawing.Graphics]::FromImage($bmpDark512)
$gDark.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gDark.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gDark.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$darkBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 12, 12, 14))
$gDark.FillRectangle($darkBrush, 0, 0, 512, 512)
$darkH = 360
$scaleD = $darkH / $pH
$darkW = [int]($pW * $scaleD)
$dDestX = [int]((512 - $darkW) / 2)
$dDestY = [int]((512 - $darkH) / 2)
$dDestRect = New-Object System.Drawing.Rectangle $dDestX, $dDestY, $darkW, $darkH
$gDark.DrawImage($src, $dDestRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gDark.Dispose()
$darkBrush.Dispose()
$bmpDark512.Save((Join-Path (Get-Location) "public/icon-512.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpDark192 = New-Object System.Drawing.Bitmap 192, 192, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g192 = [System.Drawing.Graphics]::FromImage($bmpDark192)
$g192.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g192.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g192.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g192.DrawImage($bmpDark512, 0, 0, 192, 192)
$g192.Dispose()
$bmpDark192.Save((Join-Path (Get-Location) "public/icon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/icon-512.png and public/icon-192.png"

# 6. Also generate a square version of the FULL PAGE logo (never squashed!)
# Bounds of entire logo: X=70, Y=134, W=1824, H=556
$fullW = 1824
$fullH = 556
$fullSrcRect = New-Object System.Drawing.Rectangle 70, 134, $fullW, $fullH
$bmpFullSq = New-Object System.Drawing.Bitmap 512, 512, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFull = [System.Drawing.Graphics]::FromImage($bmpFullSq)
$gFull.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFull.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gFull.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gFull.Clear([System.Drawing.Color]::Transparent)
# Fit width into 480px (leaving 16px padding on sides)
$fitW = 470
$fullScale = $fitW / $fullW
$fitH = [int]($fullH * $fullScale)
$fDestX = [int]((512 - $fitW) / 2)
$fDestY = [int]((512 - $fitH) / 2)
$fDestRect = New-Object System.Drawing.Rectangle $fDestX, $fDestY, $fitW, $fitH
$gFull.DrawImage($src, $fDestRect, $fullSrcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gFull.Dispose()
$bmpFullSq.Save((Join-Path (Get-Location) "public/page-logo-square.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created public/page-logo-square.png (512x512 proportional full logo)"

$src.Dispose()
Write-Host "ALL ICONS GENERATED SUCCESSFULLY!"
