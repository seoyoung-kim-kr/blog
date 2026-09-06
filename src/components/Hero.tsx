import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 px-4">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#FFC7C7]/20 dark:bg-[#FFC7C7]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Headline & Bio */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#FFC7C7]/60 mb-4 shadow-sm">
          💻 Frontend Engineer & Portfolio
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED] mb-4">
          안녕하세요, 프론트엔드 개발자
          <br />
          <span className="bg-linear-to-r from-[#4B6346] via-[#2D3A2C] to-[#E57A7A] dark:from-[#ADC2A9] dark:to-[#FFC7C7] bg-clip-text text-transparent">
            김서영{" "}
          </span>
          입니다.
        </h2>

        <p className="text-base sm:text-lg text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 max-w-xl mb-8 leading-relaxed font-normal">
          사용자 경험과 코드의 가치를 고민하며, 직관적인 UI와 안정적인 웹 경험을
          <br />
          만들어가는 프론트엔드 개발자입니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ADC2A9] hover:bg-[#9BB397] text-[#2D3A2C] text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 border border-[#ADC2A9]/50"
          >
            <span>Explore Projects</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFC7C7]/40 hover:bg-[#FFC7C7]/70 text-[#2D3A2C] dark:text-[#FEF5ED] text-sm font-bold border border-[#FFC7C7]/60 shadow-sm transition-all duration-200 active:scale-95 backdrop-blur-md"
          >
            <FiMail className="w-4 h-4" />
            <span>Contact Me</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
