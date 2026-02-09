# Troubleshooting - Email se ne šalje

Ako se mailovi ne šalju, slijedite ove korake za dijagnostiku:

## 1. Provjera Environment Varijabli

Provjerite da li su sve potrebne environment varijable postavljene na Vercelu:

1. Idite na **Vercel Dashboard → vaš projekt → Settings → Environment Variables**
2. Provjerite da li postoje:
   - ✅ `RESEND_API_KEY` - vaš Resend API ključ (mora počinjati s `re_`)
   - ✅ `FROM_EMAIL` - email adresa s vašeg verificiranog domena (npr. `noreply@vasadomen.com`)
   - ✅ `TO_EMAIL` - email adresa na koju se šalju poruke (npr. `Serviszaciscenjealadin@gmail.com`)

**Napomena:** Ako `FROM_EMAIL` nije postavljen, koristi se `onboarding@resend.dev` koji ima ograničenja.

## 2. Test Email Endpoint

Koristite test endpoint za provjeru konfiguracije:

```
GET https://vasadomen.com/api/test-email
```

Ili lokalno:
```
GET http://localhost:3000/api/test-email
```

Ovaj endpoint će:
- Provjeriti da li su environment varijable postavljene
- Pokušati poslati test email
- Vratiti detaljne informacije o greškama

**Primjer odgovora:**
```json
{
  "success": true,
  "message": "Test email je uspješno poslan!",
  "diagnostics": {
    "hasApiKey": true,
    "apiKeyPrefix": "re_1234567...",
    "fromEmail": "noreply@vasadomen.com",
    "toEmail": "Serviszaciscenjealadin@gmail.com"
  }
}
```

## 3. Provjera Vercel Logs

Provjerite Vercel logs za detaljne greške:

1. Idite na **Vercel Dashboard → vaš projekt → Deployments**
2. Kliknite na najnoviji deployment
3. Idite na **Functions** tab
4. Kliknite na funkciju (npr. `/api/rezervacija`)
5. Provjerite **Logs** za greške

Tražite poruke poput:
- `RESEND_API_KEY nije postavljen`
- `Error sending email:`
- `Error message:`
- `Error response:`

## 4. Provjera Resend Dashboarda

Provjerite Resend dashboard za status emailova:

1. Idite na [Resend Dashboard → Emails](https://resend.com/emails)
2. Provjerite da li se emailovi pojavljuju u listi
3. Provjerite status svakog emaila:
   - ✅ **Sent** - email je uspješno poslan
   - ❌ **Bounced** - email je odbačen
   - ❌ **Failed** - slanje nije uspjelo

## 5. Česti Problemi i Rješenja

### Problem: "You can only send testing emails to your own email address"

**Uzrok:** Koristite `onboarding@resend.dev` kao `FROM_EMAIL`, što ima ograničenja.

**Rješenje:**
1. Verificirajte domen na [Resend Dashboard → Domains](https://resend.com/domains)
2. Dodajte DNS zapise (vidi [DNS_KONFIGURACIJA.md](./DNS_KONFIGURACIJA.md))
3. Postavite `FROM_EMAIL` na email s verificiranog domena (npr. `noreply@vasadomen.com`)
4. `TO_EMAIL` može ostati `serviszaciscenjealadin@gmail.com` - tu ćete primati poruke
5. **Redeployajte aplikaciju** nakon promjene environment varijabli

**Detaljno objašnjenje:** [RESENJE_EMAIL_PROBLEMA.md](./RESENJE_EMAIL_PROBLEMA.md)

### Problem: "RESEND_API_KEY nije postavljen"

**Rješenje:**
1. Provjerite da li je `RESEND_API_KEY` postavljen u Vercel environment varijablama
2. Provjerite da li API ključ počinje s `re_`
3. Provjerite da li je API ključ ispravno kopiran (bez razmaka)
4. **Nakon dodavanja environment varijable, redeployajte aplikaciju!**

### Problem: "Domain not verified" ili "Invalid from address"

**Rješenje:**
1. Provjerite da li je vaš domen verificiran na [Resend Dashboard → Domains](https://resend.com/domains)
2. Provjerite da li `FROM_EMAIL` koristi email s verificiranog domena
3. Provjerite da li su svi DNS zapisi ispravno postavljeni (vidi [DNS_KONFIGURACIJA.md](./DNS_KONFIGURACIJA.md))

### Problem: Email se šalje, ali ne stiže u inbox

**Mogući uzroci:**
1. Email je u spam folderu - provjerite spam folder
2. Email je blokiran od strane email providera
3. DNS zapisi nisu ispravno konfigurirani (SPF, DKIM, DMARC)

**Rješenje:**
1. Provjerite spam folder
2. Provjerite Resend dashboard za status emaila
3. Provjerite DNS zapise (vidi [DNS_KONFIGURACIJA.md](./DNS_KONFIGURACIJA.md))

### Problem: "Rate limit exceeded"

**Rješenje:**
- Resend ima ograničenja na broj emailova po danu
- Provjerite vaš plan na [Resend Dashboard](https://resend.com)
- Pričekajte ili nadogradite plan

### Problem: API vraća success, ali email se ne šalje

**Provjera:**
1. Provjerite Vercel logs za detaljne greške
2. Provjerite Resend dashboard za status emailova
3. Koristite test endpoint (`/api/test-email`) za dijagnostiku

## 6. Debugging u Development Modu

U development modu, aplikacija prikazuje detaljnije greške:

1. Pokrenite lokalno: `npm run dev`
2. Otvorite browser konzolu (F12)
3. Pokušajte poslati email
4. Provjerite konzolu za detaljne greške

Također, provjerite terminal gdje je pokrenut dev server za server-side logove.

## 7. Provjera Resend API Statusa

Provjerite da li Resend ima problema:

- [Resend Status Page](https://status.resend.com/)
- [Resend Twitter](https://twitter.com/resend) za najnovije informacije

## 8. Kontaktiranje Podrške

Ako ništa od navedenog ne pomaže:

1. Prikupite informacije:
   - Vercel logs
   - Resend dashboard status
   - Test endpoint odgovor
   - Environment varijable (bez osjetljivih podataka)

2. Kontaktirajte:
   - [Resend Support](https://resend.com/support)
   - [Vercel Support](https://vercel.com/support)

## Korisni Linkovi

- [Resend Dashboard](https://resend.com)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Logs Documentation](https://vercel.com/docs/concepts/observability/logs)
- [DNS Konfiguracija](./DNS_KONFIGURACIJA.md)

