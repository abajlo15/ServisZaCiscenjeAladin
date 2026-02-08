# AladinWEB - Web Stranica za Servis Čišćenja

Moderna Next.js aplikacija za servis čišćenja, inspirirana dizajnom cistka.hr.

## Tehnologije

- **Next.js 16** - React framework s App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Resend** - Email servis za rezervacije i kontakt forme
- **React Hook Form** - Form handling
- **Zod** - Validacija podataka

## Funkcionalnosti

- ✅ Responsive dizajn
- ✅ Online rezervacija termina
- ✅ Kontakt forma
- ✅ Galerija slika s lightbox funkcionalnostima
- ✅ Cjenik usluga
- ✅ Blog sekcija
- ✅ Stranice: Usluge, Najam uređaja, O nama
- ✅ Email obavijesti za rezervacije i kontakt poruke

## Postavljanje

### Lokalno razvojno okruženje

1. Klonirajte repozitorij ili preuzmite projekt
2. Instalirajte dependencies:
```bash
npm install
```

3. Kopirajte `.env.example` u `.env.local` i popunite:
```bash
cp .env.example .env.local
```

4. Dodajte API ključeve u `.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=your-verified-email@domain.com
TO_EMAIL=Serviszaciscenjealadin@gmail.com

# Google Places API za recenzije
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACE_ID=your_place_id
```

5. Pokrenite development server:
```bash
npm run dev
```

6. Otvorite [http://localhost:3000](http://localhost:3000) u browseru

### Vercel Deployment

1. Pushajte kod na GitHub/GitLab/Bitbucket
2. Povežite repozitorij s Vercel accountom
3. Dodajte environment varijable u Vercel dashboard:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `TO_EMAIL`
   - `GOOGLE_PLACES_API_KEY`
   - `GOOGLE_PLACE_ID`
4. Vercel će automatski deployati aplikaciju

## Struktura Projekta

```
AladinWEB/
├── app/                    # Next.js App Router
│   ├── api/               # API rute
│   ├── blog/              # Blog stranice
│   ├── cjenik/            # Cjenik stranica
│   ├── galerija/          # Galerija stranica
│   ├── najam/             # Najam uređaja stranica
│   ├── o-nama/            # O nama stranica
│   ├── rezerviraj/        # Rezervacija stranica
│   ├── usluge/            # Usluge stranica
│   ├── layout.tsx         # Glavni layout
│   └── page.tsx           # Početna stranica
├── components/            # React komponente
├── lib/                   # Utility funkcije
├── public/                # Statički fajlovi
│   └── Slike/            # Slike za galeriju
└── vercel.json           # Vercel konfiguracija
```

## Email Konfiguracija

Aplikacija koristi Resend za slanje emailova. Za produkciju:

1. Kreirajte account na [Resend](https://resend.com)
2. Verificirajte email domenu ili koristite test domenu
3. Generirajte API ključ
4. Dodajte ključ u environment varijable

## Google Recenzije Konfiguracija

Aplikacija automatski dohvaća recenzije s Google Places API:

1. Kreirajte Google Cloud projekt i omogućite Places API
2. Generirajte API ključ na [Google Cloud Console](https://console.cloud.google.com/)
3. Pronađite Place ID vašeg Google Business profila:
   - Koristite [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Ili pronađite Place ID u URL-u vašeg Google Business profila
4. Dodajte u environment varijable:
   - `GOOGLE_PLACES_API_KEY` - vaš Google Places API ključ
   - `GOOGLE_PLACE_ID` - Place ID vašeg Google Business profila

**Napomena:** Ako API nije konfiguriran, aplikacija će prikazati fallback recenzije.

## Skripte

- `npm run dev` - Pokreće development server
- `npm run build` - Builda aplikaciju za produkciju
- `npm run start` - Pokreće produkcijski server
- `npm run lint` - Pokreće ESLint

## Napomene

- Sve slike se nalaze u `public/Slike/` folderu
- Logo se očekuje na `public/Slike/logo.png`
- Kontakt informacije se mogu mijenjati u Footer komponenti
- Cijene u cjeniku su orientacijske i trebaju se ažurirati

## Licenca

Privatni projekt - AladinWEB

