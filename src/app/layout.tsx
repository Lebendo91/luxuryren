import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Rental - Location de Voitures de Sport",
  description: "Louez les voitures les plus exclusives au monde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={cn(outfit.className, "antialiased bg-black text-white selection:bg-gold selection:text-black")}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
