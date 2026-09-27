import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THREADVIBE PRO | Custom Polo T-Shirts & Corporate Merch Printing",
  description: "Design and print custom 3D embroidered & DTF printed polo shirts on 240 GSM Bio-Wash Pique Cotton. Zero setup fees, 48-hour dispatch, volume tiered discounts for Indian enterprises.",
  keywords: [
    "custom polo t-shirts",
    "embroidered polo shirts india",
    "vistaprint polo alternative",
    "corporate merchandise",
    "240 gsm bio wash polo",
    "custom uniforms",
    "swag boxes india"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
