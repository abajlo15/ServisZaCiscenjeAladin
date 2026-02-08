# PowerShell skripta za kompresiju video fajlova
# Smanjuje veličinu video fajlova koristeći FFmpeg
# Koristi H.264 codec s optimiziranim postavkama

$sourceDir = "public\Slike"
$maxSizeMB = 50  # Maksimalna veličina u MB (možete prilagoditi)

# Provjeri da li FFmpeg postoji
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
    Write-Host "FFmpeg nije instaliran ili nije u PATH-u!" -ForegroundColor Red
    Write-Host "Instalirajte FFmpeg: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    exit
}

# Pronađi sve video fajlove
$videoFiles = Get-ChildItem -Path $sourceDir -Include *.mp4,*.mov -Recurse

if ($videoFiles.Count -eq 0) {
    Write-Host "Nema video fajlova u $sourceDir" -ForegroundColor Yellow
    exit
}

Write-Host "Pronađeno $($videoFiles.Count) video fajlova za kompresiju" -ForegroundColor Green
Write-Host ""

foreach ($file in $videoFiles) {
    $fileSizeMB = [math]::Round($file.Length / 1MB, 2)
    Write-Host "Fajl: $($file.Name) - Veličina: $fileSizeMB MB" -ForegroundColor Cyan
    
    # Ako je fajl već manji od maksimalne veličine, preskoči
    if ($fileSizeMB -lt $maxSizeMB) {
        Write-Host "  [SKIP] Fajl je već manji od $maxSizeMB MB" -ForegroundColor Yellow
        continue
    }
    
    # Kreiraj backup ime
    $backupName = $file.FullName -replace '\.(mp4|mov)$', '_original.$1'
    $outputName = $file.FullName -replace '\.(mp4|mov)$', '_compressed.mp4'
    
    # Backup originalnog fajla
    Write-Host "  [BACKUP] Kreiranje backup-a..." -ForegroundColor Gray
    Copy-Item $file.FullName $backupName
    
    # Kompresija s FFmpeg
    # CRF 23 je dobar balans između kvalitete i veličine (niži = bolja kvaliteta, veća veličina)
    # -preset slow = bolja kompresija, sporije
    # -movflags +faststart = optimizacija za web streaming
    Write-Host "  [COMPRESS] Kompresiranje..." -ForegroundColor Gray
    
    $ffmpegArgs = @(
        "-i", "`"$($file.FullName)`"",
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "slow",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-y",
        "`"$outputName`""
    )
    
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -Wait -NoNewWindow -PassThru
    
    if ($process.ExitCode -eq 0) {
        $newFile = Get-Item $outputName
        $newSizeMB = [math]::Round($newFile.Length / 1MB, 2)
        $savings = [math]::Round((($file.Length - $newFile.Length) / $file.Length) * 100, 1)
        
        Write-Host "  [OK] Kompresirano: $newSizeMB MB (ušteda: $savings%)" -ForegroundColor Green
        
        # Zamijeni originalni fajl s kompresiranim
        Remove-Item $file.FullName
        Rename-Item $outputName $file.Name
        
        Write-Host "  [DONE] Originalni fajl zamijenjen s kompresiranim verzijom" -ForegroundColor Green
        Write-Host "  [BACKUP] Originalni fajl je spremljen kao: $($backupName.Split('\')[-1])" -ForegroundColor Gray
    } else {
        Write-Host "  [ERROR] Greška pri kompresiji: $($file.Name)" -ForegroundColor Red
        # Vrati originalni fajl ako je backup kreiran
        if (Test-Path $backupName) {
            Remove-Item $outputName -ErrorAction SilentlyContinue
        }
    }
    Write-Host ""
}

Write-Host "Kompresija završena!" -ForegroundColor Green
Write-Host ""
Write-Host "Napomene:" -ForegroundColor Yellow
Write-Host "- Originalni fajlovi su spremljeni s '_original' sufiksom" -ForegroundColor Gray
Write-Host "- Ako niste zadovoljni kvalitetom, možete vratiti originalne fajlove" -ForegroundColor Gray
Write-Host "- Za još manju veličinu, smanjite CRF vrijednost (npr. 25 ili 28)" -ForegroundColor Gray
Write-Host "- Za bolju kvalitetu, povećajte CRF vrijednost (npr. 20 ili 18)" -ForegroundColor Gray

