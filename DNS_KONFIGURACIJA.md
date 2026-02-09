# DNS Konfiguracija za Resend na Vercelu

## Važno: DNS se NE konfigurira na Vercelu!

DNS zapisi se dodaju na vašem **DNS provideru** (gdje je vaš domen registriran), a domen se verificira na **Resend dashboardu**.

## Koraci za konfiguraciju

### 1. Verificirajte domen na Resend-u

1. Idite na [Resend Dashboard](https://resend.com/domains)
2. Kliknite **"Add Domain"**
3. Unesite vaš domen (npr. `vasadomen.com`)
4. Resend će vam dati DNS zapise koje trebate dodati

### 2. Dodajte DNS zapise na vašem DNS provideru

Resend će vam dati sljedeće DNS zapise koje trebate dodati:

#### SPF zapis (TXT)
```
v=spf1 include:resend.com ~all
```

#### DKIM zapisi (TXT)
Resend će vam dati specifične DKIM zapise, primjer:
```
resend._domainkey.vasadomen.com TXT "k=rsa; p=MIGfMA0GCSqGSIb3..."
```

**Važno za Vercel DNS:** Resend može zahtijevati TTL "automatic", ali Vercel DNS nudi samo brojčane vrijednosti. Umjesto "automatic", koristite:
- **3600** sekundi (1 sat) - preporučeno za DKIM zapise
- ili **300** sekundi (5 minuta) - ako želite brže ažuriranje

Vercel će automatski koristiti default TTL od 60 sekundi ako ne unesete vrijednost, ali za DKIM zapise je bolje koristiti veću vrijednost (3600).

#### DMARC zapis (TXT) - opcionalno ali preporučeno
```
_dmarc.vasadomen.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@vasadomen.com"
```

### 3. Gdje dodati DNS zapise?

DNS zapise dodajete na vašem DNS provideru (gdje je domen registriran):

- **Namecheap** → Advanced DNS
- **GoDaddy** → DNS Management
- **Cloudflare** → DNS → Records
- **Google Domains** → DNS
- **Vercel** (ako koristite Vercel DNS) → Domains → DNS Records
  - **Napomena:** Za TTL vrijednost, unesite **3600** (umjesto "automatic" koju Resend može preporučiti)

### 4. Provjera DNS zapisa

Nakon što dodate DNS zapise, provjerite ih:

1. **Online alati:**
   - [MXToolbox](https://mxtoolbox.com/spf.aspx) - provjera SPF zapisa
   - [DKIM Validator](https://dkimvalidator.com/) - provjera DKIM zapisa

2. **Resend Dashboard:**
   - Idite na vaš domen u Resend dashboardu
   - Status će se promijeniti na "Verified" kada su svi zapisi ispravno postavljeni
   - Može potrajati 24-48 sati da se DNS propagira

### 5. Ažurirajte environment varijable na Vercelu

Nakon što je domen verificiran:

1. Idite na Vercel Dashboard → vaš projekt → Settings → Environment Variables
2. Ažurirajte `FROM_EMAIL` varijablu:
   ```
   FROM_EMAIL=noreply@vasadomen.com
   ```
   (ili bilo koji drugi email na vašem domenu)

### 6. Testiranje

Nakon konfiguracije, testirajte slanje emaila:

1. Pošaljite test email kroz vašu aplikaciju
2. Provjerite Vercel logs (Deployments → Functions → Logs)
3. Provjerite Resend Dashboard → Emails za status slanja

## Troubleshooting

### Problem: Email se ne šalje / greška u logovima

**Provjerite:**
1. ✅ Je li `RESEND_API_KEY` postavljen u Vercel environment varijablama?
2. ✅ Je li `FROM_EMAIL` postavljen na verificirani email?
3. ✅ Je li domen verificiran na Resend dashboardu?
4. ✅ Provjerite Vercel logs za detaljne greške

### Problem: DNS zapisi se ne propagiraju

- DNS propagacija može potrajati 24-48 sati
- Provjerite da li su zapisi točno kopirani (bez dodatnih razmaka)
- Provjerite da li koristite točan tip zapisa (TXT, CNAME, itd.)

### Problem: "Domain not verified" greška

- Provjerite da li su svi potrebni DNS zapisi dodani
- Provjerite da li su zapisi ispravno formatirani
- Pričekajte da se DNS propagira (može potrajati)

### Problem: TTL mora biti "automatic" na Vercelu

**Problem:** Resend može zahtijevati TTL "automatic", ali Vercel DNS nudi samo brojčane vrijednosti.

**Rješenje:**
- Umjesto "automatic", unesite **3600** sekundi (1 sat) za DKIM zapise
- Ovo je standardna vrijednost i potpuno je validna
- Vercel default TTL od 60 sekundi je premali za DKIM - koristite 3600

**Kako dodati DNS zapis na Vercelu:**
1. Idite na Vercel Dashboard → Domains → vaš domen → DNS Records
2. Kliknite "Add Record"
3. Odaberite tip: **TXT**
4. Unesite Name: `resend._domainkey` (ili kako Resend specificira)
5. Unesite Value: (DKIM vrijednost koju vam je dao Resend)
6. Unesite TTL: **3600** (umjesto "automatic")
7. Spremite zapis

## Test email (bez DNS konfiguracije)

Ako još niste konfigurirali DNS, možete koristiti test email:
```
FROM_EMAIL=onboarding@resend.dev
```

**Napomena:** Ovaj email ima ograničenja:
- Može se koristiti samo za testiranje
- Nije preporučeno za produkciju
- Može imati nižu deliverability

## Korisni linkovi

- [Resend Domains Documentation](https://resend.com/docs/dashboard/domains/introduction)
- [Resend DNS Records Guide](https://resend.com/docs/dashboard/domains/verify-domain)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

