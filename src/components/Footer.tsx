import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 py-8 px-4 bg-white/80 dark:bg-[#121712]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70">
        <p className="font-semibold">
          Copyright © 2026 Seoyoung Kim. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:seoyoung.k.kr@gmail.com"
            className="hover:text-[#4B6346] dark:hover:text-[#ADC2A9] transition-colors"
          >
            seoyoung.k.kr@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
