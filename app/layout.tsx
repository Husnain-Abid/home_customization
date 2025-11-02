import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { ProductProvider } from "@/contexts/ProductContext";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Freepoint Homes",
  description: "Home Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ProductProvider>
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow mb-16 mt-28 md:mt-32">{children}</main>

          <Footer />
          <Toaster />
        </ProductProvider>
      </body>
    </html>
  );
}
