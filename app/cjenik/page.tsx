const cjenikKategorije = [
  {
    kategorija: "Strojno pranje tepiha",
    usluge: [
      { naziv: "Tepih (do 4m²)", cijena: "od 80 kn" },
      { naziv: "Tepih (4-8m²)", cijena: "od 120 kn" },
      { naziv: "Tepih (8-12m²)", cijena: "od 180 kn" },
      { naziv: "Tepih (12m²+)", cijena: "Po dogovoru" },
      { naziv: "Prikup i dostava", cijena: "Besplatno" },
    ],
  },
  {
    kategorija: "Strojno pranje tepisona",
    usluge: [
      { naziv: "Tepison (do 20m²)", cijena: "od 200 kn" },
      { naziv: "Tepison (20-40m²)", cijena: "od 350 kn" },
      { naziv: "Tepison (40m²+)", cijena: "Po dogovoru" },
    ],
  },
  {
    kategorija: "Dubinsko čišćenje namještaja",
    usluge: [
      { naziv: "Kauč (2-3 sjedala)", cijena: "od 250 kn" },
      { naziv: "Kauč (4+ sjedala)", cijena: "od 350 kn" },
      { naziv: "Fotelja", cijena: "od 150 kn" },
      { naziv: "Stolica (po komadu)", cijena: "od 80 kn" },
      { naziv: "Ostali namještaj", cijena: "Po dogovoru" },
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

