const cjenikKategorije = [
  {
    kategorija: "Strojno pranje tepiha",
    usluge: [
      { naziv: "Tepisi (do 3 m²)", cijena: "25€" },
      { naziv: "Tepisi (od 3 m²)", cijena: "8€ / m²" },
      { naziv: "Prikup i dostava", cijena: "Besplatno" },
    ],
  },
  {
    kategorija: "Strojno pranje tepisona",
    usluge: [
      { naziv: "Tepisoni (do 3 m²)", cijena: "25€" },
      { naziv: "Tepisoni (od 3 m²)", cijena: "8€ / m²" },
      { naziv: "Prikup i dostava", cijena: "Besplatno" },
    ],
  },
  {
    kategorija: "Dubinsko čišćenje namještaja",
    usluge: [
      { naziv: "Kemijsko čišćenje madraca", cijena: "30€" },
      { naziv: "Kemijsko čišćenje fotelje", cijena: "30€" },
      { naziv: "Kemijsko čišćenje dvosjeda", cijena: "50€" },
      { naziv: "Kemijsko čišćenje trosjeda", cijena: "70€" },
      { naziv: "Kemijsko čišćenje kutne garniture", cijena: "90€" },
      { naziv: "Kemijsko čišćenje stolice", cijena: "15€" },
    ],
  },
  {
    kategorija: "Kemijsko čišćenje automobila",
    usluge: [
      { naziv: "Sjedala", cijena: "120€" },
      { naziv: "Kemijsko čišćenje kompletne unutrašnjosti automobila", cijena: "160€" },
      { naziv: "Kemijsko čišćenje kompletne unutrašnjosti većih automobila", cijena: "200€" },
    ],
  },
  {
    kategorija: "Generalno čišćenje stanova",
    usluge: [
      { naziv: "Generalno čišćenje stana", cijena: "4€ / m²" },
    ],
  },
];

export default function CjenikPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cjenik
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparentne cijene za sve naše usluge
          </p>
          <p className="text-gray-500 mt-4">
            * Cijene su orientacijske. Kontaktirajte nas za točnu ponudu prilagođenu vašim potrebama.
          </p>
        </div>

        <div className="space-y-8">
          {cjenikKategorije.map((kategorija, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">{kategorija.kategorija}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Usluga</th>
                      <th className="px-6 py-4 text-right text-gray-700 font-semibold">Cijena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kategorija.usluge.map((usluga, uIndex) => (
                      <tr
                        key={uIndex}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-gray-800">{usluga.naziv}</td>
                        <td className="px-6 py-4 text-right text-blue-600 font-semibold">
                          {usluga.cijena}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm italic font-bold">
            Cijena se može povećati zbog veće razine zaprljanja, hitnosti ili dodatnih usluga koje nisu uključene u standardnu ponudu.
          </p>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Trebate prilagođenu ponudu?
          </h3>
          <p className="text-gray-700 mb-6">
            Kontaktirajte nas za besplatnu procjenu i prilagođenu ponudu prema vašim potrebama.
          </p>
          <a
            href="/rezerviraj"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Kontaktirajte nas
          </a>
        </div>
      </div>
    </div>
  );
}

