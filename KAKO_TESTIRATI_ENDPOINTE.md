# Kako Testirati Endpointe

Ovaj vodič objašnjava različite načine testiranja API endpointa u projektu.

## 📋 Dostupni Endpointi

1. **GET** `/api/recenzije` - Dohvaća Google recenzije
2. **GET** `/api/test-email` - Testira email konfiguraciju
3. **GET** `/api/test-env` - Provjerava environment varijable
4. **POST** `/api/rezervacija` - Šalje rezervaciju
5. **POST** `/api/kontakt` - Šalje kontakt poruku
6. **GET** `/api/check-place` - Provjerava Google Place ID
7. **GET** `/api/test-google` - Testira Google Places API

---

## 🌐 Metoda 1: Browser (GET zahtjevi)

Najjednostavniji način za testiranje GET endpointa je direktno u browseru.

### Lokalno testiranje:
```
http://localhost:3000/api/recenzije
http://localhost:3000/api/test-email
http://localhost:3000/api/test-env
```

### Produkcija:
```
https://vasadomen.com/api/recenzije
https://vasadomen.com/api/test-email
https://vasadomen.com/api/test-env
```

**Primjer:** Otvorite browser i idite na `http://localhost:3000/api/test-env` da provjerite environment varijable.

---

## 💻 Metoda 2: cURL (Command Line)

cURL je moćan alat za testiranje endpointa iz terminala.

### GET Zahtjevi

#### Test Email Endpoint:
```bash
# Lokalno
curl http://localhost:3000/api/test-email

# Produkcija
curl https://vasadomen.com/api/test-email
```

#### Test Environment Varijabli:
```bash
curl http://localhost:3000/api/test-env
```

#### Dohvaćanje Recenzija:
```bash
curl http://localhost:3000/api/recenzije
```

#### Lijep formatirani odgovor (JSON):
```bash
curl http://localhost:3000/api/test-email | python -m json.tool
```

### POST Zahtjevi

#### Test Rezervacije:
```bash
curl -X POST http://localhost:3000/api/rezervacija \
  -H "Content-Type: application/json" \
  -d '{
    "ime": "Ivan Horvat",
    "email": "ivan@example.com",
    "telefon": "+385 99 123 4567",
    "usluga": "Čišćenje stana",
    "datum": "2024-12-25",
    "vrijeme": "10:00",
    "poruka": "Test rezervacija"
  }'
```

#### Test Kontakt Forme:
```bash
curl -X POST http://localhost:3000/api/kontakt \
  -H "Content-Type: application/json" \
  -d '{
    "ime": "Marko Markić",
    "email": "marko@example.com",
    "telefon": "+385 98 765 4321",
    "poruka": "Ovo je test poruka za kontakt formu"
  }'
```

---

## 🔧 Metoda 3: PowerShell (Windows)

Ako koristite Windows PowerShell, možete koristiti `Invoke-RestMethod` ili `Invoke-WebRequest`.

### GET Zahtjevi

```powershell
# Test Email
Invoke-RestMethod -Uri "http://localhost:3000/api/test-email" -Method Get

# Test Environment
Invoke-RestMethod -Uri "http://localhost:3000/api/test-env" -Method Get

# Recenzije
Invoke-RestMethod -Uri "http://localhost:3000/api/recenzije" -Method Get
```

### POST Zahtjevi

```powershell
# Test Rezervacije
$body = @{
    ime = "Ivan Horvat"
    email = "ivan@example.com"
    telefon = "+385 99 123 4567"
    usluga = "Čišćenje stana"
    datum = "2024-12-25"
    vrijeme = "10:00"
    poruka = "Test rezervacija"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/rezervacija" -Method Post -Body $body -ContentType "application/json"

# Test Kontakt
$body = @{
    ime = "Marko Markić"
    email = "marko@example.com"
    telefon = "+385 98 765 4321"
    poruka = "Ovo je test poruka"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/kontakt" -Method Post -Body $body -ContentType "application/json"
```

---

## 📮 Metoda 4: Postman / Insomnia

### Postman Setup:

1. **Instalirajte Postman** ili koristite web verziju na [postman.com](https://www.postman.com)

2. **Kreirajte novi Request:**
   - Method: `GET` ili `POST`
   - URL: `http://localhost:3000/api/test-email`
   - Headers: Za POST zahtjeve dodajte `Content-Type: application/json`
   - Body: Za POST zahtjeve, odaberite "raw" i "JSON", zatim unesite podatke

### Primjeri za Postman:

#### GET `/api/test-email`
```
Method: GET
URL: http://localhost:3000/api/test-email
```

#### POST `/api/rezervacija`
```
Method: POST
URL: http://localhost:3000/api/rezervacija
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "ime": "Ivan Horvat",
  "email": "ivan@example.com",
  "telefon": "+385 99 123 4567",
  "usluga": "Čišćenje stana",
  "datum": "2024-12-25",
  "vrijeme": "10:00",
  "poruka": "Test rezervacija"
}
```

---

## 🧪 Metoda 5: JavaScript / TypeScript (fetch)

Možete testirati endpointe direktno iz browser konzole ili Node.js skripte.

### Browser Console (F12):

```javascript
// GET zahtjev
fetch('http://localhost:3000/api/test-email')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));

// POST zahtjev - Rezervacija
fetch('http://localhost:3000/api/rezervacija', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ime: 'Ivan Horvat',
    email: 'ivan@example.com',
    telefon: '+385 99 123 4567',
    usluga: 'Čišćenje stana',
    datum: '2024-12-25',
    vrijeme: '10:00',
    poruka: 'Test rezervacija'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

### Node.js Test Skripta:

Kreirajte `test-endpoints.js`:

```javascript
const testEndpoint = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Test GET endpoint
testEndpoint('http://localhost:3000/api/test-email');

// Test POST endpoint
testEndpoint('http://localhost:3000/api/rezervacija', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ime: 'Ivan Horvat',
    email: 'ivan@example.com',
    telefon: '+385 99 123 4567',
    usluga: 'Čišćenje stana',
    datum: '2024-12-25',
    vrijeme: '10:00'
  })
});
```

---

## ✅ Očekivani Odgovori

### `/api/test-email` (GET)
```json
{
  "success": true,
  "message": "Test email je uspješno poslan!",
  "diagnostics": {
    "hasApiKey": true,
    "apiKeyPrefix": "re_1234567...",
    "fromEmail": "noreply@vasadomen.com",
    "toEmail": "Serviszaciscenjealadin@gmail.com",
    "nodeEnv": "development"
  }
}
```

### `/api/test-env` (GET)
```json
{
  "hasApiKey": true,
  "hasPlaceId": true,
  "apiKeyLength": 39,
  "placeIdLength": 27,
  "apiKeyPreview": "AIzaSyBx...",
  "placeIdPreview": "ChIJN1t_tDeuEmsR...",
  "message": "Environment varijable su postavljene ✓"
}
```

### `/api/recenzije` (GET)
```json
{
  "reviews": [
    {
      "name": "Ivan H.",
      "location": "Zadar",
      "text": "Odlična usluga!",
      "rating": 5,
      "date": "prije 2 tjedna"
    }
  ]
}
```

### `/api/rezervacija` (POST)
```json
{
  "message": "Rezervacija je uspješno poslana!"
}
```

### `/api/kontakt` (POST)
```json
{
  "message": "Poruka je uspješno poslana!"
}
```

---

## 🐛 Debugging

### Provjera Logova

1. **Lokalno:** Provjerite terminal gdje je pokrenut `npm run dev`
2. **Vercel:** Idite na Vercel Dashboard → Deployments → Functions → Logs

### Česte Greške

#### 400 Bad Request
- Provjerite da li su svi obavezni podaci poslani
- Provjerite format podataka (JSON)

#### 500 Internal Server Error
- Provjerite environment varijable
- Provjerite logove za detaljne greške
- Provjerite da li su svi servisi dostupni (Resend, Google Places API)

#### CORS Greške
- Provjerite da li endpoint prima zahtjeve s ispravnog domena
- Provjerite CORS konfiguraciju u Next.js

---

## 🤖 Metoda 6: Automatska Test Skripta

Projekt sadrži test skriptu koja automatski testira sve endpointe.

### Korištenje:

```bash
# Lokalno testiranje (default: http://localhost:3000)
npm run test:endpoints
# ili direktno:
node test-endpoints.js

# Testiranje produkcije
BASE_URL=https://vasadomen.com npm run test:endpoints
```

**Napomena:** Zahtijeva Node.js 18+ (zbog ugrađenog fetch API-ja).

Skripta će:
- ✅ Testirati sve GET endpointe
- ✅ Testirati sve POST endpointe s test podacima
- ✅ Prikazati status kodove i odgovore
- ✅ Prikazati sažetak rezultata

---

## 🚀 Brzi Test Checklist

- [ ] Pokrenite dev server: `npm run dev`
- [ ] Pokrenite test skriptu: `node test-endpoints.js`
- [ ] Testirajte GET endpoint u browseru
- [ ] Testirajte POST endpoint s cURL ili Postman
- [ ] Provjerite logove za greške
- [ ] Provjerite environment varijable s `/api/test-env`
- [ ] Testirajte email funkcionalnost s `/api/test-email`

---

## 📚 Dodatni Resursi

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [cURL Documentation](https://curl.se/docs/)
- [Postman Documentation](https://learning.postman.com/docs/)
- [Troubleshooting Email](./TROUBLESHOOTING_EMAIL.md)

