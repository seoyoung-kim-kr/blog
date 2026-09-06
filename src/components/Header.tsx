"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiLayers,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";

type Menu = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const MENU_LIST: Menu[] = [
  { label: "Home", href: "/", icon: <FiHome className="w-4 h-4" /> },
  { label: "About", href: "/about", icon: <FiUser className="w-4 h-4" /> },
  { label: "Retrospectives", href: "/posts", icon: <FiLayers className="w-4 h-4" /> },
  { label: "Contact", href: "/contact", icon: <FiMail className="w-4 h-4" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#121712]/90 border-b border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 transition-colors duration-300">
      <Container className="py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <Image
            src="/images/favicon-logo.png"
            alt="Seoyoung Portfolio Logo"
            width={32}
            height={32}
            className="group-hover:scale-105 transition-transform duration-300 object-contain w-7 h-7 sm:w-8 sm:h-8"
          />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED] group-hover:text-[#4B6346] transition-colors">
            Seoyoung<span className="text-[#FFC7C7]">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation (sm and larger) */}
        <div className="hidden sm:flex items-center gap-3">
          <nav>
            <ul className="flex items-center gap-1.5">
              {MENU_LIST.map((menu) => {
                const isActive =
                  pathname === menu.href ||
                  (menu.href !== "/" && pathname.startsWith(menu.href));
                return (
                  <li key={menu.href}>
                    <Link
                      href={menu.href}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 block ${
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
          <div className="w-px h-5 bg-[#ADC2A9]/30 dark:bg-[#ADC2A9]/20" />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Toggle (sm and smaller) */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] hover:bg-[#ADC2A9]/40 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-5 h-5 text-[#E57A7A]" />
            ) : (
              <FiMenu className="w-5 h-5 text-[#2D3A2C] dark:text-[#FEF5ED]" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-[#ADC2A9]/20 bg-white/95 dark:bg-[#121712]/95 backdrop-blur-2xl shadow-xl animate-fade-in">
          <nav className="p-4 space-y-1.5">
            {MENU_LIST.map((menu) => {
              const isActive =
                pathname === menu.href ||
                (menu.href !== "/" && pathname.startsWith(menu.href));
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#ADC2A9] text-[#2D3A2C] shadow-md"
                      : "text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 hover:bg-[#ADC2A9]/20 dark:hover:bg-[#ADC2A9]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-[#2D3A2C]" : "text-[#8AA385]"}>
                      {menu.icon}
                    </span>
                    <span>{menu.label}</span>
                  </div>
                  <FiChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
