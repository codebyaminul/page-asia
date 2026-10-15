Add-Type -AssemblyName System.Drawing

$imgPath = Join-Path (Get-Location) "public/page logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)

for ($x = 350; $x -le 520; $x += 5) {
    $reds = 0
    for ($y = 100; $y -le 650; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 180 -and $c.G -lt 60) { $reds++ }
    }
    Write-Host "X=${x} RedCount=${reds}"
}





