"use client";

import React, { useState } from "react";
import type { Post } from "../service/posts";
import Link from "next/link";
import { useAdmin } from "../context/AdminContext";
import dynamic from "next/dynamic";
import { useDeleteProject } from "../hooks/useDeleteProject";

const ProjectFormModal = dynamic(() => import("./ProjectFormModal"), {
  ssr: false,
});
import MarkdownViewer from "./MarkdownViewer";
import {
  FiCalendar,
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
  FiEdit2,
  FiTrash2,
  FiUserCheck,
  FiChevronDown,
  FiChevronUp,
  FiBookOpen,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

type Props = { post: Post & { content?: string } };

export default function HomePostCard({ post }: Props) {
  const {
    path,
    title,
    description,
    content,
    date,
    category,
    skills,
    githubUrl,
    demoUrl,
    role,
  } = post;
  const { isAdmin } = useAdmin();
  const { deleteProject, deleting } = useDeleteProject();
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasFullContent = Boolean(content && content.trim());

  return (
    <>
      <div className="group relative rounded-3xl bg-white/80 dark:bg-[#1E271D]/80 border border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20 backdrop-blur-md p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-4">
        {/* Admin Action Buttons */}
        {isAdmin && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 dark:bg-[#121712]/90 border border-[#ADC2A9]/50 shadow-md backdrop-blur-md">
            <button
              onClick={() => setIsEditOpen(true)}
              title="프로젝트 수정"
              className="p-1.5 rounded-full hover:bg-[#ADC2A9]/30 text-[#2D3A2C] dark:text-[#FEF5ED] transition-colors"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => deleteProject(path, title)}
              disabled={deleting}
              title="프로젝트 삭제"
              className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors disabled:opacity-50"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="space-y-4">
          {/* Top Line: Category, Title, Role, Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pr-16 sm:pr-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#FFC7C7]/60 shadow-2xs">
                {category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#2D3A2C] dark:text-[#FEF5ED] group-hover:text-[#4B6346] dark:group-hover:text-[#ADC2A9] transition-colors">
                <Link href={`/posts/${path}`}>{title}</Link>
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60 flex-wrap">
              {post.company && (
                <span className="inline-flex items-center gap-1 font-semibold text-[#2D3A2C] dark:text-[#FEF5ED] bg-[#FFC7C7]/30 border border-[#FFC7C7]/50 px-2.5 py-1 rounded-md">
                  <span>🏢 {post.company}</span>
                </span>
              )}
              {role && (
                <span className="inline-flex items-center gap-1 font-semibold text-[#4B6346] dark:text-[#ADC2A9] bg-[#ADC2A9]/15 dark:bg-[#ADC2A9]/10 px-2.5 py-1 rounded-md">
                  <FiUserCheck className="w-3.5 h-3.5 text-[#E57A7A]" />
                  <span>{role}</span>
                </span>
              )}
              <span className="flex items-center gap-1 font-medium">
                <FiCalendar className="w-3.5 h-3.5" />
                <time dateTime={date}>{date}</time>
              </span>
            </div>
          </div>

          {/* Description / Markdown Preview */}
          <div className="text-sm text-[#2D3A2C]/80 dark:text-[#FEF5ED]/80 leading-relaxed font-normal">
            <MarkdownViewer content={description} />
          </div>

          {/* Expandable Case Study Panel */}
          {isExpanded && hasFullContent && (
            <div className="p-4 sm:p-6 rounded-2xl bg-[#FEF5ED]/50 dark:bg-[#171E16]/60 border border-[#ADC2A9]/30 space-y-4 animate-fade-in my-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#4B6346] dark:text-[#ADC2A9] uppercase tracking-wider border-b border-[#ADC2A9]/20 pb-2">
                <FiBookOpen className="w-4 h-4" />
                <span>Project Overview & Case Study</span>
              </div>
              <MarkdownViewer content={content || ""} />
            </div>
          )}
        </div>

        {/* Bottom Line: Skills Tags & Direct Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#ADC2A9]/20 mt-auto">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {skills &&
              skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/40"
                >
                  {skill}
                </span>
              ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 text-xs font-bold flex-wrap self-end sm:self-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FEF5ED]/80 dark:bg-[#171E16]/80 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/40 hover:bg-[#ADC2A9]/25 transition-colors shadow-2xs"
              >
                <FiGithub className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ADC2A9]/30 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/50 hover:bg-[#ADC2A9]/50 transition-colors shadow-2xs"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            {/* Expand / Collapse Button */}
            {hasFullContent && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ADC2A9]/20 hover:bg-[#ADC2A9]/40 text-[#4B6346] dark:text-[#ADC2A9] border border-[#ADC2A9]/40 transition-colors"
              >
                <span>{isExpanded ? "회고 접기" : "인라인 회고"}</span>
                {isExpanded ? (
                  <FiChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FiChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}

            <Link
              href={`/posts/${path}`}
              className="inline-flex items-center gap-1 text-[#4B6346] dark:text-[#ADC2A9] hover:underline px-2 py-1"
            >
              <span>상세 회고</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {isEditOpen && (
        <ProjectFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialPost={post}
          onSuccess={() => router.refresh()}
        />
      )}
    </>
  );
}
