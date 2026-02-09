import Link from "next/link";

export default function RezervacijaCTA() {
  return (
    <section className="py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rezerviraj svoj termin online u samo nekoliko trenutaka
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Rezervirajte uslugu čišćenja online u samo nekoliko klikova – brzo, jednostavno i bez telefonskih poziva ili čekanja.
        </p>
        <Link
          href="/rezerviraj"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
        >
          Rezerviraj online u nekoliko trenutaka
        </Link>
      </div>
    </section>
  );
}

