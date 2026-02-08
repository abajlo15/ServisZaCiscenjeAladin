# Upute za Konverziju Video Fajlova

## Problem
`.mov` format nije dobro podržan u svim browserima (posebno Chrome/Firefox na Windowsu). Za najbolju kompatibilnost, preporučujemo konverziju u `.mp4` format.

## Opcije Konverzije

### 1. Online Konverteri (Najbrže - Preporučeno)

#### CloudConvert
1. Idite na: https://cloudconvert.com/mov-to-mp4
2. Kliknite "Select File" i odaberite sve 3 .mov fajlova iz `public/Slike/`
3. Kliknite "Convert"
4. Sačekajte da se konverzija završi
5. Downloadajte .mp4 fajlove
6. Zamijenite .mov fajlove s .mp4 fajlovima u `public/Slike/`

#### FreeConvert
1. Idite na: https://www.freeconvert.com/mov-to-mp4
2. Uploadajte fajlove
3. Kliknite "Convert"
4. Downloadajte i zamijenite fajlove

### 2. VLC Media Player (Ako imate instaliran)

1. Otvorite VLC Media Player
2. Idite na: **Media → Convert/Save**
3. Kliknite **Add** i odaberite sve 3 .mov fajlova iz `public/Slike/`
4. Kliknite **Convert/Save**
5. U **Profile** odaberite: **Video - H.264 + MP3 (MP4)**
6. U **Destination** odaberite gdje želite spremiti fajlove (ili isti folder)
7. Kliknite **Start**
8. Zamijenite stare .mov fajlove s novim .mp4 fajlovima

### 3. FFmpeg (Najpreciznije)

#### Instalacija FFmpeg:
1. Preuzmite FFmpeg: https://www.gyan.dev/ffmpeg/builds/
   - Preuzmite "ffmpeg-release-essentials.zip"
2. Ekstraktirajte u `C:\ffmpeg`
3. Dodajte u PATH:
   - Otvorite "Environment Variables"
   - U "System variables" pronađite "Path"
   - Kliknite "Edit" → "New" → dodajte `C:\ffmpeg\bin`
   - Kliknite OK

#### Konverzija s FFmpeg:
```powershell
# U folderu projekta pokrenite:
cd public\Slike

# Konvertiraj svaki fajl:
ffmpeg -i copy_179C13BF-3DB6-450C-8878-2DBF6E842901.mov -c:v libx264 -c:a aac copy_179C13BF-3DB6-450C-8878-2DBF6E842901.mp4
ffmpeg -i copy_83BC6465-8913-43E7-8439-8B3C7CAEF0B5.mov -c:v libx264 -c:a aac copy_83BC6465-8913-43E7-8439-8B3C7CAEF0B5.mp4
ffmpeg -i copy_95F33B7C-926A-4E36-BBB3-5BDC680859CE.mov -c:v libx264 -c:a aac copy_95F33B7C-926A-4E36-BBB3-5BDC680859CE.mp4
```

Ili koristite PowerShell skriptu `convert-videos.ps1`:
```powershell
.\convert-videos.ps1
```

## Nakon Konverzije

1. Zamijenite stare .mov fajlove s novim .mp4 fajlovima u `public/Slike/`
2. Ažurirajte `components/VideoSection.tsx` da koristi .mp4 umjesto .mov:
   - Promijenite ekstenzije u `src` atributima iz `.mov` u `.mp4`
   - Promijenite `type="video/quicktime"` u `type="video/mp4"`

## Preporuka

Za najbrže rješenje, koristite **CloudConvert** ili **FreeConvert** - jednostavno, brzo i ne zahtijeva instalaciju.

