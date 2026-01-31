import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seoyoung's blog",
  description: "Seoyoung's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter} ${poppins} ${playfair}`}>
      <body className={inter.className}>
        <header className="sticky top-0 bg-white">
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
