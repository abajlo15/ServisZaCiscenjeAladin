# PowerShell skripta za konverziju .mov u .mp4
# Koristi FFmpeg (mora biti instaliran i u PATH-u)

$sourceDir = "public\Slike"
$files = Get-ChildItem -Path $sourceDir -Filter "*.mov"

if ($files.Count -eq 0) {
    Write-Host "Nema .mov fajlova u $sourceDir" -ForegroundColor Yellow
    exit
}

Write-Host "Pronadeno $($files.Count) video fajlova za konverziju" -ForegroundColor Green

foreach ($file in $files) {
    $inputFile = $file.FullName
    $outputFile = $file.FullName -replace '\.mov$', '.mp4'
    
    Write-Host "Konvertiram: $($file.Name)..." -ForegroundColor Cyan
    
    # Provjeri da li FFmpeg postoji
    $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
    
    if (-not $ffmpeg) {
        Write-Host "FFmpeg nije instaliran ili nije u PATH-u!" -ForegroundColor Red
        Write-Host "Instalirajte FFmpeg ili koristite online konverter." -ForegroundColor Yellow
        exit
    }
    
    # Konvertiraj video
    ffmpeg -i $inputFile -c:v libx264 -c:a aac -preset medium -crf 23 $outputFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Uspjesno konvertirano: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Greska pri konverziji: $($file.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Konverzija zavrsena!" -ForegroundColor Green
$checkPath = Join-Path $sourceDir "*.mp4"
Write-Host "Provjerite $checkPath za nove .mp4 fajlove" -ForegroundColor Cyan

# Ažuriraj VideoSection.tsx da koristi .mp4 umjesto .mov
$videoSectionFile = "components\VideoSection.tsx"
if (Test-Path $videoSectionFile) {
    Write-Host ""
    Write-Host "Ažuriram VideoSection.tsx..." -ForegroundColor Cyan
    
    $content = Get-Content $videoSectionFile -Raw -Encoding UTF8
    
    # Zamijeni .mov s .mp4 u src atributima
    $content = $content -replace '\.mov"', '.mp4"'
    
    # Zamijeni type="video/quicktime" s type="video/mp4"
    $content = $content -replace 'type="video/quicktime"', 'type="video/mp4"'
    
    Set-Content -Path $videoSectionFile -Value $content -Encoding UTF8
    
    Write-Host "[OK] VideoSection.tsx je azuriran da koristi .mp4 fajlove" -ForegroundColor Green
} else {
    Write-Host "[WARNING] VideoSection.tsx nije pronaden" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Sve je gotovo! Video fajlovi su konvertirani i kod je azuriran." -ForegroundColor Green

