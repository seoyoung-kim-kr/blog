import React from "react";
import { FiCode, FiLayers, FiCpu, FiTool } from "react-icons/fi";

const SKILL_CATEGORIES = [
  {
    icon: FiCode,
    title: "Frontend Core",
    description: "반응형 웹 및 컴포넌트 아키텍처 설계",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)"],
    color: "from-[#ADC2A9]/40 to-[#ADC2A9]/10",
  },
  {
    icon: FiLayers,
    title: "State & Data",
    description: "효율적인 전역 상태 및 비동기 데이터 관리",
    skills: ["TanStack Query", "Zustand", "Axios", "REST API"],
    color: "from-[#FFC7C7]/40 to-[#FFC7C7]/10",
  },
  {
    icon: FiCpu,
    title: "Styling & UI",
    description: "모던 글래스모피즘 및 시스템 디자인",
    skills: ["Tailwind CSS", "CSS Modules", "Glassmorphism", "A11y"],
    color: "from-[#ADC2A9]/40 to-[#ADC2A9]/10",
  },
  {
    icon: FiTool,
    title: "Tools & Environment",
    description: "협업, 형상 관리 및 개발 최적화",
    skills: ["Git / GitHub", "Vite", "ESLint / Prettier", "Figma"],
    color: "from-[#FFC7C7]/40 to-[#FFC7C7]/10",
  },
];

export default function TechStackSection() {
  return (
    <section className="space-y-6 pt-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
          Technical Capabilities
        </h2>
        <p className="text-sm text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 mt-1">
          실무와 프로젝트에서 주력으로 활용하는 핵심 기술 스택 및 역량입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="p-6 rounded-3xl bg-white/80 dark:bg-[#1E271D]/80 border border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 backdrop-blur-md shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF5ED] dark:bg-[#171E16] text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/40 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
