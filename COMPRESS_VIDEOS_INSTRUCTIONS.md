# Upute za Kompresiju Video Fajlova

## Problem
Neki video fajlovi prelaze GitHub limit od 100MB:
- `copy_83BC6465-8913-43E7-8439-8B3C7CAEF0B5.mov` (115MB)
- `copy_95F33B7C-926A-4E36-BBB3-5BDC680859CE.mov` (138MB)
- `copy_95F33B7C-926A-4E36-BBB3-5BDC680859CE.mp4` (103MB)

## Rješenje

### Opcija 1: Automatska kompresija (Preporučeno)

1. **Instalirajte FFmpeg** (ako već nije instaliran):
   - Preuzmite s: https://ffmpeg.org/download.html
   - Ili koristite Chocolatey: `choco install ffmpeg`
   - Provjerite instalaciju: `ffmpeg -version`

2. **Pokrenite skriptu za kompresiju**:
   ```powershell
   .\compress-videos.ps1
   ```

3. **Skripta će**:
   - Automatski pronaći sve video fajlove veće od 50MB
   - Kreirati backup originalnih fajlova (s `_original` sufiksom)
   - Kompresirati video fajlove koristeći H.264 codec
   - Zamijeniti originalne fajlove s kompresiranim verzijama

### Opcija 2: Ručna kompresija s FFmpeg

Za svaki video fajl, pokrenite:

```powershell
ffmpeg -i "public\Slike\copy_83BC6465-8913-43E7-8439-8B3C7CAEF0B5.mov" -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart "public\Slike\copy_83BC6465-8913-43E7-8439-8B3C7CAEF0B5_compressed.mp4"
```

**Parametri:**
- `-crf 23` - Kvaliteta (18-28, niži = bolja kvaliteta, veća veličina)
- `-preset slow` - Brzina kompresije (ultrafast, fast, medium, slow, veryslow)
- `-b:a 128k` - Audio bitrate

### Opcija 3: Online kompresija

Ako nemate FFmpeg, možete koristiti online alate:
- https://www.freeconvert.com/video-compressor
- https://www.clipchamp.com/
- https://www.veed.io/tools/video-compressor

## Postavke kvalitete

**Za maksimalnu kompresiju (manja veličina, niža kvaliteta):**
```powershell
-crf 28 -preset veryslow
```

**Za balans (preporučeno):**
```powershell
-crf 23 -preset slow
```

**Za visoku kvalitetu (veća veličina, bolja kvaliteta):**
```powershell
-crf 20 -preset medium
```

## Nakon kompresije

1. Provjerite da li su novi fajlovi manji od 100MB
2. Testirajte kvalitetu videa u browseru
3. Ako ste zadovoljni, možete obrisati `_original` backup fajlove
4. Commit-ajte nove kompresirane fajlove u Git

## Napomena

- Originalni fajlovi su automatski backup-ovani
- Kompresija može potrajati nekoliko minuta za velike fajlove
- Preporučeno je testirati kvalitetu prije brisanja originalnih fajlova

