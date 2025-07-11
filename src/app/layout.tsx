import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Job Board Challenge",
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: "300",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="w-full bg-dark-blue text-white flex flex-col lg:flex-row min-h-screen">
        <Navbar />
        <div id="parallel-modal-root" />
        {modal}
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
