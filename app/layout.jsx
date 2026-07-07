import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site-data";

export const metadata = {
  title: site.name,
  description: `${site.name} · ${site.dateLabel} · ${site.venue}`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col bg-white text-[#1a1a1a] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
