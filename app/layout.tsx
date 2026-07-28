import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { AdminProvider } from "@/src/context/AdminContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Seoyoung's Portfolio",
    template: "%s | Seoyoung's Portfolio",
  },
  description: "프론트엔드 개발자 김서영의 프로젝트 포트폴리오",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col w-full bg-white dark:bg-[#121712] text-[#2D3A2C] dark:text-[#FEF5ED] transition-colors duration-300 antialiased selection:bg-[#FFC7C7] selection:text-[#2D3A2C]">
        <AdminProvider>
          <Header />
          <main className="grow w-full">{children}</main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
