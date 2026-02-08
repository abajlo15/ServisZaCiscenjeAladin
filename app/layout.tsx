import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Servis za čišćenje Aladin - Profesionalno čišćenje",
  description: "Dubinsko čišćenje za temeljitu čistoću svakog kutka vašeg doma ili ureda",
  keywords: "čišćenje, pranje tepiha, pranje tepisona, Zadar",
  openGraph: {
    title: "Servis za čišćenje Aladin - Profesionalno čišćenje",
    description: "Dubinsko čišćenje za temeljitu čistoću svakog kutka vašeg doma ili ureda",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

