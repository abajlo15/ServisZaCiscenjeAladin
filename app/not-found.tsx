import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Stranica nije pronađena</h2>
        <p className="text-gray-600 mb-8">
          Stranica koju tražite ne postoji ili je premještena.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Povratak na početnu
        </Link>
      </div>
    </div>
  );
}

