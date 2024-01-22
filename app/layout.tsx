import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruslan Tsykaliak's TODO App",
  description: "Ruslan Tsykaliak's TODO App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en" className="!scroll-smooth">
    <body className={inter.className}>
          {/* <ThemeProvider>  */}

          <Header />

          {children}
          <Footer />

          {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
