import Container from "@/src/components/Container";
import Hero from "@/src/components/Hero";
import TechStackSection from "@/src/components/TechStackSection";
import type { Metadata } from "next";
import { FiUser, FiBriefcase, FiBookOpen, FiCode } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 개발자 김서영의 개발 역량, 경력, 학력 및 기술 스택 소개 페이지입니다.",
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
              프론트엔드 개발자 <strong className="text-[#2D3A2C] dark:text-[#FEF5ED] font-bold">김서영</strong>입니다.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 list-disc list-inside marker:text-[#ADC2A9]">
              <li>새로운 기술에 대해 두려움 없이 도전하며, 학습하는 과정 자체를 즐깁니다.</li>
              <li>사용자의 관점에서 생각하며, 직관적이고 편리한 UI/UX를 구현하는 데 깊은 관심을 두고 있습니다.</li>
            </ul>
          </section>

          {/* Career */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED]">
                <FiBriefcase className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
                Career
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FEF5ED]/60 dark:bg-[#171E16]/60 border border-[#ADC2A9]/30">
              <div>
                <h3 className="font-bold text-[#2D3A2C] dark:text-[#FEF5ED] text-base">
                  (주)썬더소프트코리아
                </h3>
                <p className="text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60 mt-0.5">
                  Software Engineer / Frontend
                </p>
              </div>
              <span className="mt-2 sm:mt-0 text-xs font-bold text-[#2D3A2C] dark:text-[#FEF5ED] px-3 py-1 rounded-full bg-[#FFC7C7]/50 border border-[#FFC7C7] self-start sm:self-auto shadow-sm">
                2023.01.01 ~ 현재
              </span>
            </div>
          </section>

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
