"use client";

import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiGithub, FiExternalLink, FiLayers, FiEdit2, FiTrash2, FiUserCheck } from "react-icons/fi";
import { PostData } from "../service/posts";
import MarkdownViewer from "./MarkdownViewer";
import { useAdmin } from "../context/AdminContext";
import dynamic from "next/dynamic";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { useRouter } from "next/navigation";

const ProjectFormModal = dynamic(() => import("./ProjectFormModal"), {
  ssr: false,
});

function PostContent({ post }: { post: PostData }) {
  const { path, title, date, description, content, category, skills, githubUrl, demoUrl, role } = post;
  const { isAdmin } = useAdmin();
  const { deleteProject, deleting } = useDeleteProject();
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <section className="p-6 sm:p-10 space-y-8 relative">
        {/* Admin Actions Bar in Detail Page */}
        {isAdmin && (
          <div className="flex items-center justify-end gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ADC2A9]/40 hover:bg-[#ADC2A9]/70 text-[#2D3A2C] dark:text-[#FEF5ED] text-xs font-bold border border-[#ADC2A9]"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
              <span>Edit Project</span>
            </button>
            <button
              onClick={() => deleteProject(path, title, true)}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold border border-red-300 disabled:opacity-50"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              <span>Delete Project</span>
            </button>
          </div>
        )}

        {/* Project Specs Header */}
        <header className="space-y-6 text-center max-w-3xl mx-auto pb-8 border-b border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {category && (
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFC7C7]/40 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#FFC7C7]/60 shadow-sm">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60 font-medium px-3 py-1 rounded-full bg-[#ADC2A9]/20">
              <FaRegCalendarAlt aria-hidden="true" className="w-3 h-3 text-[#4B6346] dark:text-[#ADC2A9]" />
              <time dateTime={date}>{date}</time>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED] leading-tight">
            {title}
          </h1>

          {/* Role & Contribution Highlight Badge */}
          {role && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#FFC7C7]/30 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#FFC7C7]/60 shadow-sm mx-auto">
              <FiUserCheck className="w-4 h-4 text-[#E57A7A]" />
              <span>Role & Contribution: {role}</span>
            </div>
          )}

          {/* Tech Stack Badges */}
          {skills && skills.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-bold text-[#4B6346] dark:text-[#ADC2A9] flex items-center gap-1 mr-1">
                <FiLayers className="w-3.5 h-3.5" />
                Stack:
              </span>
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Quick Project Action Buttons */}
          {(githubUrl || demoUrl) && (
            <div className="flex items-center justify-center gap-3 pt-2">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ADC2A9] hover:bg-[#9BB397] text-[#2D3A2C] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 border border-[#ADC2A9]/60"
                >
                  <FiExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#1E271D]/80 hover:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] text-xs sm:text-sm font-bold border border-[#ADC2A9]/40 shadow-sm transition-all active:scale-95"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Main Documentation / Case Study Content */}
        <div className="max-w-3xl mx-auto">
          <MarkdownViewer content={content} />
        </div>
      </section>

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

export default PostContent;
