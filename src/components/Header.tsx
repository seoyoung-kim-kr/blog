"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

type Menu = {
  label: string;
  href: string;
};

const MENU_LIST: Menu[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Retrospectives", href: "/posts" },
  { label: "Contact", href: "/contact" },
];

function MenuBar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-1 sm:gap-2">
        {MENU_LIST.map((menu) => {
          const isActive = pathname === menu.href || (menu.href !== "/" && pathname.startsWith(menu.href));
          return (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#ADC2A9] text-[#2D3A2C] shadow-sm"
                    : "text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 hover:text-[#2D3A2C] dark:hover:text-white hover:bg-[#ADC2A9]/20 dark:hover:bg-[#ADC2A9]/20"
                }`}
              >
                {menu.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 dark:bg-[#121712]/85 border-b border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 transition-colors duration-300">
      <Container className="py-3.5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/images/favicon-logo.png"
            alt="Seoyoung Portfolio Logo"
            width={32}
            height={32}
            className="group-hover:scale-105 transition-transform duration-300 object-contain"
          />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED] group-hover:text-[#4B6346] transition-colors">
            Seoyoung<span className="text-[#FFC7C7]">.</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <MenuBar />
          <div className="w-px h-5 bg-[#ADC2A9]/30 dark:bg-[#ADC2A9]/20 hidden sm:block" />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
