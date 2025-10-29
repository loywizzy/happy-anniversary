import type { Metadata } from "next";
import { Noto_Sans_Thai, Sriracha } from "next/font/google";
import "./globals.css";
import { NAMES } from "./config";

const sans = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const display = Sriracha({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: `Happy Anniversary | ${NAMES}`,
  description:
    "เว็บแฟนครบรอบโทนพาสเทล น่ารัก ละมุน เพื่อเก็บความทรงจำสุดพิเศษของเรา"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-rose-50 text-slate-800">{children}</body>
    </html>
  );
}
