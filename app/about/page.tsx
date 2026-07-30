import Container from "@/src/components/Container";
import Hero from "@/src/components/Hero";
import TechStackSection from "@/src/components/TechStackSection";
import CoreHighlights from "@/src/components/CoreHighlights";
import ExperienceSummary from "@/src/components/ExperienceSummary";
import type { Metadata } from "next";
import { FiUser, FiBriefcase, FiBookOpen, FiCode } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About",
  description:
    "프론트엔드 개발자 김서영의 개발 역량, 경력, 학력 및 기술 스택 소개 페이지입니다.",
};

const EDUCATION_LIST = [
  {
    school: "한신대학교",
    major: "컴퓨터공학과",
    degree: "학사",
    period: "2021.03 ~ 2023.02",
  },
  {
    school: "수원여자대학교",
    major: "모바일미디어과",
    degree: "전문학사",
    period: "2019.03 ~ 2021.02",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Container className="max-w-4xl pb-16">
        <div className="space-y-8">
          {/* Who am I */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#ADC2A9]/30 text-[#2D3A2C] dark:text-[#FEF5ED]">
                <FiUser className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
                Who Am I?
              </h2>
            </div>
            <p className="text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 text-sm sm:text-base leading-relaxed space-y-2">
              프론트엔드 개발자{" "}
              <strong className="text-[#2D3A2C] dark:text-[#FEF5ED] font-bold">
                김서영
              </strong>
              입니다.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 list-disc list-inside marker:text-[#ADC2A9]">
              <li>
                레거시 환경의 한계를 돌파하며 React 기반 모던 플랫폼 전환과
                아키텍처 설계를 주도해 온 4년 차 프론트엔드 리드
              </li>
              <li>
                주어진 화면 개발에 머물지 않고, 고객 VOC 분석부터
                백엔드(FastAPI) 영역까지 파고들어 비즈니스 문제를 해결하는
                프로덕트 엔지니어
              </li>
              <li>
                순수 DOM 제어부터 TanStack 생태계 기반의 데이터 캐싱까지, 기술의
                한계를 직접 부딪히며 실무적인 문제 해결 역량 확보
              </li>
            </ul>
          </section>

          {/* Core Engineering Highlights (Relocated to About Page) */}
          <CoreHighlights hideAboutLink />

          {/* Career Timeline */}
          <ExperienceSummary />

          {/* Education */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#ADC2A9]/30 text-[#2D3A2C] dark:text-[#FEF5ED]">
                <FiBookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
                Education
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_LIST.map((edu) => (
                <div
                  key={edu.school}
                  className="p-4 rounded-2xl bg-[#FEF5ED]/60 dark:bg-[#171E16]/60 border border-[#ADC2A9]/30 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#2D3A2C] dark:text-[#FEF5ED] text-base">
                        {edu.school}
                      </h3>
                      <span className="text-[11px] font-bold text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 px-2.5 py-0.5 rounded-full bg-[#ADC2A9]/25 border border-[#ADC2A9]/40">
                        {edu.degree}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#4B6346] dark:text-[#ADC2A9] mt-1">
                      {edu.major}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60 font-medium">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED]">
                <FiCode className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
                Tech Stack
              </h2>
            </div>

            <TechStackSection hideHeader />
          </section>
        </div>
      </Container>
    </>
  );
}
