export default function ONamaPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              O nama
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Naša misija</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Servis za čišćenje Aladin je profesionalni servis za čišćenje posvećen pružanju vrhunske kvalitete usluga 
                čišćenja za domove i poslovne prostore. Naša misija je osigurati da svaki klijent dobije 
                čist, zdrav i ugodan prostor za život i rad.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Zašto odabrati nas?</h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Profesionalna oprema:</strong> Koristimo najmoderniju opremu i proizvode za najbolje rezultate</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Iskusni tim:</strong> Naš tim ima godina iskustva u profesionalnom čišćenju</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Fleksibilnost:</strong> Prilagođavamo se vašim potrebama i rasporedu</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Zadovoljstvo klijenata:</strong> Vaše zadovoljstvo je naš prioritet</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Eco-friendly:</strong> Koristimo ekološki prihvatljive proizvode gdje je moguće</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Naše vrijednosti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Kvaliteta</h3>
                  <p className="text-gray-700">Ne kompromitiramo s kvalitetom naših usluga</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pouzdanost</h3>
                  <p className="text-gray-700">Možete računati na nas da ispunimo naše obećanja</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Profesionalizam</h3>
                  <p className="text-gray-700">Pristupamo svakom zadatku s profesionalnošću</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Inovativnost</h3>
                  <p className="text-gray-700">Koristimo najnovije tehnologije i metode</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
              <p className="text-xl mb-6 text-blue-100">
                Kontaktirajte nas danas i dobit ćete besplatnu procjenu
              </p>
              <a
                href="/rezerviraj"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Rezerviraj termin
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

