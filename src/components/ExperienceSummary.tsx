import React from "react";
import Link from "next/link";
import { FiBriefcase, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const HIGHLIGHTS = [
  "사용자 경험(UX) 중심의 반응형 웹 인터페이스 및 UI 컴포넌트 설계",
  "React 및 TypeScript 기반의 비동기 데이터 관리 및 성능 최적화",
  "새로운 기술 스택을 두려움 없이 빠르게 학습하고 프로덕트에 적용",
];

export default function ExperienceSummary() {
  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ADC2A9]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED]">
            <FiBriefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">
              Work Experience
            </h2>
            <p className="text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60">
              (주)썬더소프트코리아 · Software Engineer / Frontend
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#2D3A2C] dark:text-[#FEF5ED] px-3.5 py-1.5 rounded-full bg-[#FFC7C7]/50 border border-[#FFC7C7] self-start sm:self-auto shadow-sm">
          2023.01 ~ 현재
        </span>
      </div>

      <ul className="space-y-2.5">
        {HIGHLIGHTS.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80">
            <FiCheckCircle className="w-4 h-4 text-[#4B6346] dark:text-[#ADC2A9] shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 flex justify-end">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4B6346] dark:text-[#ADC2A9] hover:underline"
        >
          <span> 자세한 경력 & 소개 보기</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
