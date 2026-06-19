import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import IsraBit from "@/components/ui/IsraBit";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "הזהב החדש | The New Gold",
  description: "פלטפורמה חינוכית לישראלים על ביטקוין, כלכלה ועתיד הכסף",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
        <IsraBit />
      </body>
    </html>
  );
}
