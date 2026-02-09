/**
 * Test skripta za testiranje API endpointa
 * 
 * Korištenje:
 *   node test-endpoints.js
 * 
 * Ili s custom base URL:
 *   BASE_URL=https://vasadomen.com node test-endpoints.js
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, url, options = {}) {
  try {
    log(`\n🧪 Testiranje: ${name}`, 'cyan');
    log(`   URL: ${url}`, 'blue');
    
    const startTime = Date.now();
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;
    
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    const statusColor = response.ok ? 'green' : 'red';
    log(`   Status: ${response.status} ${response.statusText} (${duration}ms)`, statusColor);
    
    if (response.ok) {
      log(`   ✅ Uspješno!`, 'green');
      if (typeof data === 'object') {
        console.log('   Response:', JSON.stringify(data, null, 2));
      } else {
        console.log('   Response:', data);
      }
      return { success: true, data };
    } else {
      log(`   ❌ Greška!`, 'red');
      console.log('   Error:', data);
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    log(`   ❌ Exception: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n═══════════════════════════════════════', 'cyan');
  log('   TESTIRANJE API ENDPOINTA', 'cyan');
  log('═══════════════════════════════════════\n', 'cyan');
  log(`Base URL: ${BASE_URL}\n`, 'yellow');

  const results = [];

  // GET Endpointi
  results.push(await testEndpoint('Test Environment Varijabli', `${BASE_URL}/api/test-env`));
  results.push(await testEndpoint('Test Email Konfiguracije', `${BASE_URL}/api/test-email`));
  results.push(await testEndpoint('Dohvaćanje Recenzija', `${BASE_URL}/api/recenzije`));

  // POST Endpointi - Rezervacija
  results.push(await testEndpoint(
    'POST Rezervacija',
    `${BASE_URL}/api/rezervacija`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ime: 'Test Korisnik',
        email: 'test@example.com',
        telefon: '+385 99 123 4567',
        usluga: 'Čišćenje stana',
        datum: '2024-12-25',
        vrijeme: '10:00',
        poruka: 'Ovo je test rezervacija'
      })
    }
  ));

  // POST Endpointi - Kontakt
  results.push(await testEndpoint(
    'POST Kontakt',
    `${BASE_URL}/api/kontakt`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ime: 'Test Korisnik',
        email: 'test@example.com',
        telefon: '+385 98 765 4321',
        poruka: 'Ovo je test kontakt poruka'
      })
    }
  ));

  // Sažetak
  log('\n═══════════════════════════════════════', 'cyan');
  log('   SAŽETAK REZULTATA', 'cyan');
  log('═══════════════════════════════════════\n', 'cyan');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  log(`✅ Uspješno: ${successful}`, 'green');
  log(`❌ Neuspješno: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`📊 Ukupno: ${results.length}\n`, 'blue');

  if (failed > 0) {
    log('Provjerite greške iznad za detalje.', 'yellow');
    process.exit(1);
  } else {
    log('Svi testovi su prošli uspješno! 🎉', 'green');
    process.exit(0);
  }
}

// Provjeri da li je fetch dostupan (Node.js 18+)
if (typeof fetch === 'undefined') {
  log('❌ Greška: Node.js verzija mora biti 18+ za fetch API', 'red');
  log('   Ili instalirajte node-fetch: npm install node-fetch', 'yellow');
  process.exit(1);
}

// Pokreni testove
runTests().catch(error => {
  log(`\n❌ Fatalna greška: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});

