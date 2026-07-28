"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Post } from "../service/posts";
import Link from "next/link";
import { useAdmin } from "../context/AdminContext";
import ProjectFormModal from "./ProjectFormModal";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { getPostImageUrl } from "../utils/post";
import {
  FiCalendar,
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
  FiEdit2,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  const { path, title, description, date, category, skills, githubUrl, demoUrl, role } = post;
  const { isAdmin } = useAdmin();
  const { deleteProject, deleting } = useDeleteProject();
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const imageSrc = getPostImageUrl(post);

  return (
    <>
      <div className="group h-full flex flex-col rounded-3xl bg-white/90 dark:bg-[#1E271D]/80 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative">
        {/* Admin Action Buttons */}
        {isAdmin && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 dark:bg-[#121712]/90 border border-[#ADC2A9]/50 shadow-md backdrop-blur-md">
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

        {/* Thumbnail Image Link */}
        <Link href={`/posts/${path}`} className="relative aspect-[16/10] w-full overflow-hidden bg-[#ADC2A9]/10 block">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFC7C7]/90 text-[#2D3A2C] backdrop-blur-md shadow-sm border border-[#FFC7C7]">
              {category}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col justify-between grow">
          <div>
            <Link href={`/posts/${path}`} className="block">
              <h3 className="text-lg font-bold text-[#2D3A2C] dark:text-[#FEF5ED] group-hover:text-[#4B6346] dark:group-hover:text-[#ADC2A9] transition-colors line-clamp-2 mb-2 leading-snug">
                {title}
              </h3>
            </Link>

            {/* Role & Contribution Pill */}
            {role && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FFC7C7]/30 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#FFC7C7]/50 mb-3">
                <FiUserCheck className="w-3 h-3 text-[#E57A7A]" />
                <span>{role}</span>
              </div>
            )}

            <p className="text-sm text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 line-clamp-2 leading-relaxed mb-4">
              {description}
            </p>

            {/* Tech Stack Pills */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ADC2A9]/25 dark:bg-[#ADC2A9]/20 text-[#2D3A2C] dark:text-[#FEF5ED] border border-[#ADC2A9]/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Links & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#ADC2A9]/20 text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60">
            <span className="flex items-center gap-1.5 font-medium">
              <FiCalendar className="w-3.5 h-3.5" />
              <time dateTime={date}>{date}</time>
            </span>

            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repo"
                  className="p-1 text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 hover:text-[#4B6346] dark:hover:text-[#ADC2A9] transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Demo"
                  className="p-1 text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 hover:text-[#4B6346] dark:hover:text-[#ADC2A9] transition-colors"
                >
                  <FiExternalLink className="w-4 h-4" />
                </a>
              )}
              <Link
                href={`/posts/${path}`}
                className="inline-flex items-center gap-0.5 text-[#4B6346] dark:text-[#ADC2A9] font-bold group-hover:translate-x-0.5 transition-transform"
              >
                View
                <FiArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
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
