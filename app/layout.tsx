import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";

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
      <body className="min-h-screen flex flex-col relative">
        <VideoBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

