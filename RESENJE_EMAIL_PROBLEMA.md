# Rješenje: "You can only send testing emails to your own email address"

## 🔍 Objašnjenje Problema

Ako vidite grešku:
> "You can only send testing emails to your own email address (serviszaciscenjealadin@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains"

**Uzrok:** Koristite `onboarding@resend.dev` kao `FROM_EMAIL`, što ima ograničenja.

## ✅ Rješenje

**VAŽNO:** Ovo NIJE problem s `TO_EMAIL` adresom! 

- ✅ `TO_EMAIL=serviszaciscenjealadin@gmail.com` je **ISPRAVNO** - tu ćete primati sve poruke
- ❌ `FROM_EMAIL=onboarding@resend.dev` ima ograničenja - trebate verificirati domen

### Kako funkcionira slanje emailova:

```
Kupac popunjava formu na stranici
         ↓
Vaša aplikacija šalje email:
  FROM: noreply@vasadomen.com (mora biti s verificiranog domena)
  TO: serviszaciscenjealadin@gmail.com (vaša email adresa)
         ↓
Vi primate email na serviszaciscenjealadin@gmail.com
```

**Kupci NE šalju direktno emailove** - vaša aplikacija šalje emailove u njihovo ime.

## 📋 Koraci za Rješenje

### 1. Verificirajte domen na Resend-u

1. Idite na [Resend Dashboard → Domains](https://resend.com/domains)
2. Kliknite **"Add Domain"**
3. Unesite vaš domen (npr. `vasadomen.com`)
4. Resend će vam dati DNS zapise koje trebate dodati

### 2. Dodajte DNS zapise

Dodajte DNS zapise na vašem DNS provideru (gdje je domen registriran):

- **SPF zapis (TXT)**
- **DKIM zapisi (TXT)** - Resend će vam dati specifične vrijednosti
- **DMARC zapis (TXT)** - opcionalno ali preporučeno

Detaljne upute: [DNS_KONFIGURACIJA.md](./DNS_KONFIGURACIJA.md)

### 3. Postavite Environment Varijable

Nakon što je domen verificiran na Resend-u:

1. Idite na **Vercel Dashboard → vaš projekt → Settings → Environment Variables**
2. Postavite ili ažurirajte:

```
FROM_EMAIL=noreply@vasadomen.com
TO_EMAIL=serviszaciscenjealadin@gmail.com
RESEND_API_KEY=re_your_api_key_here
```

**Napomena:** 
- `FROM_EMAIL` mora biti email s vašeg **verificiranog domena** (npr. `noreply@vasadomen.com`, `info@vasadomen.com`)
- `TO_EMAIL` može biti **bilo koja email adresa** - tu ćete primati poruke (npr. `serviszaciscenjealadin@gmail.com`)

### 4. Redeploy Aplikaciju

**VAŽNO:** Nakon promjene environment varijabli, **redeployajte aplikaciju** na Vercelu!

1. Idite na Vercel Dashboard → Deployments
2. Kliknite "..." na najnovijem deploymentu
3. Odaberite "Redeploy"

Ili jednostavno napravite novi commit i push.

### 5. Testirajte

Testirajte slanje emaila:

```bash
# Lokalno
curl http://localhost:3000/api/test-email

# Ili u browseru
http://localhost:3000/api/test-email
```

Provjerite:
- ✅ Email stiže na `serviszaciscenjealadin@gmail.com`
- ✅ Nema grešaka u Vercel logovima
- ✅ Resend Dashboard pokazuje "Sent" status

## 🎯 Sažetak

| Varijabla | Vrijednost | Objašnjenje |
|-----------|------------|-------------|
| `FROM_EMAIL` | `noreply@vasadomen.com` | Email s **verificiranog domena** - adresa s koje se šalje |
| `TO_EMAIL` | `serviszaciscenjealadin@gmail.com` | **Vaša email adresa** - tu ćete primati sve poruke |
| `RESEND_API_KEY` | `re_...` | Vaš Resend API ključ |

## ❓ Često Postavljana Pitanja

### Q: Mogu li koristiti bilo koju email adresu za TO_EMAIL?

**A:** Da! `TO_EMAIL` može biti bilo koja email adresa - tu ćete primati poruke. Nema ograničenja.

### Q: Zašto moram verificirati domen?

**A:** Resend zahtijeva verificirani domen za `FROM_EMAIL` da bi osigurao da ne zloupotrebljavate servis i da emailovi ne završe u spam folderu.

### Q: Što ako nemam vlastiti domen?

**A:** Nažalost, Resend zahtijeva verificirani domen za produkciju. `onboarding@resend.dev` je samo za testiranje i ima ograničenja.

### Q: Kupci će vidjeti moju email adresu?

**A:** Ne! Kupci popunjavaju formu na vašoj stranici. Vaša aplikacija šalje email s `FROM_EMAIL` na `TO_EMAIL` sa sadržajem forme. Kupci ne vide niti `FROM_EMAIL` niti `TO_EMAIL`.

## 🔗 Korisni Linkovi

- [Resend Domains](https://resend.com/domains)
- [DNS Konfiguracija](./DNS_KONFIGURACIJA.md)
- [Troubleshooting Email](./TROUBLESHOOTING_EMAIL.md)

