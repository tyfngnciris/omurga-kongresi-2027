import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PWARegister from "@/components/PWARegister";
import { site } from "@/lib/site-data";

export const metadata = {
  title: site.name,
  description: `${site.name} · ${site.dateLabel} · ${site.venue}`,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.shortName,
  },
};

export const viewport = {
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col bg-white text-[#1a1a1a] antialiased">
        <PWARegister />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
