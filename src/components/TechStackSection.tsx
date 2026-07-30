import React from "react";
import {
  FiCode,
  FiLayers,
  FiCpu,
  FiTool,
  FiDatabase,
  FiServer,
  FiCheckCircle,
} from "react-icons/fi";
import { sanityFetch, TECH_STACK_QUERY } from "@/src/service/sanity";

export type TechCategoryItem = {
  category?: string;
  title?: string;
  description?: string;
  icon?: string;
  coreSkills?: string[];
  experiencedSkills?: string[];
};

const ICON_MAP: Record<string, React.ElementType> = {
  FiCode,
  FiLayers,
  FiCpu,
  FiTool,
  FiDatabase,
  FiServer,
};

const DEFAULT_CATEGORIES = [
  {
    title: "Frontend & Core",
    description: "반응형 웹 및 모던 컴포넌트 아키텍처 설계",
    iconName: "FiCode",
    coreSkills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)"],
    experiencedSkills: ["HTML5/CSS3", "Web Vitals", "A11y (웹 접근성)"],
  },
  {
    title: "State & UI System",
    description: "전역 상태, 데이터 캐싱 및 디자인 시스템",
    iconName: "FiLayers",
    coreSkills: ["TanStack Query", "Zustand", "Tailwind CSS", "shadcn/ui"],
    experiencedSkills: ["Redux Toolkit", "Recoil", "CSS Modules", "Framer Motion"],
  },
  {
    title: "Tools, BaaS & Infra",
    description: "개발 환경, 백엔드 연동 및 인프라",
    iconName: "FiTool",
    coreSkills: ["Git / GitHub", "Vite", "Sanity CMS", "Node.js"],
    experiencedSkills: ["Express", "Supabase", "Docker", "Nginx", "FastAPI", "Vercel", "Figma"],
  },
];

export default async function TechStackSection({
  hideHeader = false,
}: {
  hideHeader?: boolean;
} = {}) {
  const sanityTechData =
    await sanityFetch<TechCategoryItem[]>(TECH_STACK_QUERY);

  const categories =
    sanityTechData && sanityTechData.length > 0
      ? sanityTechData.map((item) => ({
          title: item.category || item.title || "Skill Category",
          description: item.description || "",
          iconName: item.icon || "FiCode",
          coreSkills: item.coreSkills || [],
          experiencedSkills: item.experiencedSkills || [],
        }))
      : DEFAULT_CATEGORIES;

  return (
    <section className={hideHeader ? "space-y-6" : "space-y-6 pt-4"}>
      {!hideHeader && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
            Tech Stack
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => {
          const IconComponent = ICON_MAP[category.iconName] || FiCode;
          const validCoreSkills = (category.coreSkills || []).filter(
            (s) => Boolean(s && s.trim())
          );
          const validExperiencedSkills = (
            category.experiencedSkills || []
          ).filter((s) => Boolean(s && s.trim()));
          const hasExperienced = validExperiencedSkills.length > 0;

          return (
            <div
              key={category.title}
              className="p-6 rounded-3xl bg-white/80 dark:bg-[#1E271D]/80 border border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 backdrop-blur-md shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED]">
                    <IconComponent className="w-5 h-5" />
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

                {/* Core Skills */}
                {validCoreSkills.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider uppercase text-[#4B6346] dark:text-[#ADC2A9]">
                      <FiCheckCircle className="w-3 h-3" />
                      <span>Main Focus</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {validCoreSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-bold bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/50 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experienced Skills */}
                {hasExperienced && (
                  <div className="space-y-1.5 pt-2 border-t border-[#ADC2A9]/20 dark:border-[#ADC2A9]/10">
                    <div className="text-[11px] font-semibold text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60">
                      Experienced
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {validExperiencedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF5ED]/60 dark:bg-[#171E16]/60 text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 border border-dashed border-[#ADC2A9]/40"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
