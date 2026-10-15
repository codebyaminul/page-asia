$pngPath = Join-Path (Get-Location) "public/favicon-32x32.png"
$icoPath = Join-Path (Get-Location) "public/favicon.ico"

$pngBytes = [System.IO.File]::ReadAllBytes($pngPath)
$pngSize = $pngBytes.Length

$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter $ms

# ICONDIR
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type (1=icon)
$bw.Write([uint16]1) # Count (1 image)

# ICONDIRENTRY
$bw.Write([byte]32) # Width
$bw.Write([byte]32) # Height
$bw.Write([byte]0)  # Colors
$bw.Write([byte]0)  # Reserved
$bw.Write([uint16]1) # Color planes
$bw.Write([uint16]32) # Bits per pixel
$bw.Write([uint32]$pngSize) # Size of image data
$bw.Write([uint32]22) # Offset of image data

# Image data (PNG format)
$bw.Write($pngBytes)

[System.IO.File]::WriteAllBytes($icoPath, $ms.ToArray())
$bw.Dispose()
$ms.Dispose()

Write-Host "Created public/favicon.ico successfully! Size: $pngSize bytes"
