import React from "react";
import Link from "next/link";
import { FiBriefcase, FiArrowRight, FiCheckCircle } from "react-icons/fi";

type Props = {
  hideAboutLink?: boolean;
};

export const CAREER_TIMELINE = [
  {
    company: "(주)썬더소프트코리아",
    department: "SmartPlatform팀 (System SW 파트)",
    role: "Software Engineer / Frontend Lead",
    period: "2023.01 ~ 현재",
    isCurrent: true,
    highlights: [
      "파편화된 바닐라 JS 레거시 시스템을 React/TS 및 FSD 아키텍처 기반 단일 모던 B2B 웹 플랫폼으로 통합 전환 및 프론트엔드 설계 주도",
      "TanStack 생태계(Query/Table)와 비제어 폼 기반 대용량 회귀 테스트 데이터 캐싱 최적화 및 FastAPI 연동으로 E2E 문제 해결",
    ],
  },
  {
    company: "(주)썬더소프트코리아",
    department: "FR1팀",
    role: "인턴 (Intern)",
    period: "2022.07.01 ~ 2022.12.31",
    isCurrent: false,
    highlights: [
      "Anritsu 및 Keysight 전문 측정 장비를 활용한 이동통신 프로토콜 테스트 수행 및 회귀 테스트 결함 데이터 검증",
    ],
  },
];

export default function ExperienceSummary({ hideAboutLink = false }: Props) {
  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-[#ADC2A9]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED]">
            <FiBriefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">
              Career Timeline
            </h2>
            <p className="text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60">
              실무 개발 경력 및 주요 소속 이력입니다.
            </p>
          </div>
        </div>

        {!hideAboutLink && (
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#4B6346] dark:text-[#ADC2A9] hover:underline"
          >
            <span>자세한 소개 보기</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#ADC2A9]/30">
        {CAREER_TIMELINE.map((item, idx) => (
          <div key={idx} className="relative pl-9 space-y-2">
            {/* Timeline Dot Indicator */}
            <span
              className={`absolute left-3.5 top-1.5 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 ${
                item.isCurrent
                  ? "bg-[#E57A7A] border-[#FFC7C7] ring-4 ring-[#FFC7C7]/30"
                  : "bg-[#ADC2A9] border-white dark:border-[#1E271D]"
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div>
                <h3 className="font-bold text-[#2D3A2C] dark:text-[#FEF5ED] text-base flex items-center gap-2 flex-wrap">
                  <span>{item.company}</span>
                  <span className="text-xs font-semibold text-[#4B6346] dark:text-[#ADC2A9] bg-[#ADC2A9]/15 dark:bg-[#ADC2A9]/10 px-2.5 py-0.5 rounded-full border border-[#ADC2A9]/30">
                    {item.department}
                  </span>
                </h3>
                <p className="text-xs text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 mt-0.5 font-medium">
                  {item.role}
                </p>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto shadow-2xs border ${
                  item.isCurrent
                    ? "bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED] border-[#FFC7C7]"
                    : "bg-[#ADC2A9]/20 text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 border-[#ADC2A9]/40"
                }`}
              >
                {item.period}
              </span>
            </div>

            <ul className="space-y-1.5 pt-1">
              {item.highlights.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80"
                >
                  <FiCheckCircle className="w-3.5 h-3.5 text-[#4B6346] dark:text-[#ADC2A9] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
