import React from "react";
import Link from "next/link";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function ContactCTA() {
  return (
    <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#ADC2A9]/30 via-white/90 to-[#FFC7C7]/30 dark:from-[#1E271D] dark:via-[#171E16] dark:to-[#241E20] border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3A2C] dark:text-[#FEF5ED] tracking-tight">
        Let's Connect 📬
      </h2>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ADC2A9] hover:bg-[#9BB397] text-[#2D3A2C] text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0 border border-[#ADC2A9]/60"
      >
        <FiMail className="w-4 h-4" />
        <span>Contact Me</span>
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
