"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Post } from "@/src/service/posts";
import { FiX, FiPlus, FiEdit2, FiUploadCloud, FiImage } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialPost?: Post & { content?: string };
};

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialPost,
}: Props) {
  const isEdit = Boolean(initialPost);
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.path || "");
  const [description, setDescription] = useState(initialPost?.description || "");
  const [date, setDate] = useState(initialPost?.date || new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState(initialPost?.category || "frontend");
  const [type, setType] = useState<"project" | "retrospective">(
    initialPost?.type || "project"
  );
  const [featured, setFeatured] = useState(initialPost?.featured || false);
  const [skills, setSkills] = useState(initialPost?.skills ? initialPost.skills.join(", ") : "");
  const [demoUrl, setDemoUrl] = useState(initialPost?.demoUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialPost?.githubUrl || "");
  const [company, setCompany] = useState(initialPost?.company || "");
  const [role, setRole] = useState(initialPost?.role || "");
  const [content, setContent] = useState(initialPost?.content || "");

  // Thumbnail State
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    initialPost?.image || (initialPost?.path ? `/images/posts/${initialPost.path}.png` : "")
  );
  const [assetId, setAssetId] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "이미지 업로드에 실패했습니다.");
      }

      setAssetId(json.assetId);
      setThumbnailPreview(json.url);
    } catch (err: any) {
      setErrorMsg(err.message || "이미지 업로드 오류");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const skillArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || undefined,
      description,
      date,
      category,
      type,
      company,
      featured,
      skills: skillArray,
      demoUrl,
      githubUrl,
      role,
      content,
      assetId: assetId || undefined,
    };

    try {
      const url = isEdit ? `/api/posts/${initialPost?.path}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "요청 처리에 실패했습니다.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const modalJSX = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-[#171E16] border border-[#ADC2A9]/40 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          {isEdit ? (
            <FiEdit2 className="w-6 h-6 text-[#ADC2A9]" />
          ) : (
            <FiPlus className="w-6 h-6 text-[#ADC2A9]" />
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D3A2C] dark:text-[#FEF5ED]">
            {isEdit ? "프로젝트 수정" : "새 프로젝트 생성"}
          </h2>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Thumbnail Image Picker & Preview Section */}
          <div className="space-y-1.5">
            <label className="block font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">
              대표 썸네일 이미지
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#1E271D] border border-dashed border-[#ADC2A9]">
              {thumbnailPreview ? (
                <div className="relative w-36 aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 aspect-[16/10] rounded-xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 shrink-0">
                  <FiImage className="w-8 h-8 mb-1" />
                  <span className="text-[10px]">이미지 없음</span>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  프로젝트 카드에 렌더링될 대표 썸네일 이미지 파일(JPG, PNG, WebP)을 직접 업로드하세요.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#ADC2A9] text-[#2D3A2C] hover:bg-[#9BB397] cursor-pointer shadow-sm">
                  <FiUploadCloud className="w-4 h-4" />
                  <span>{uploadingImage ? "업로드 중..." : "썸네일 이미지 선택"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                프로젝트 제목 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 리액트 디자인 패턴 프로젝트"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                슬러그 (URL 경로)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="자동 생성 (예: react-design-patterns)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
              프로젝트 개요 / 핵심 설명 (마크다운 지원) *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="프로젝트 개요 및 핵심 성과를 마크다운 문법으로 자유롭게 작성하세요 (# 제목, > 인용구, * 리스트 등)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] font-mono text-xs focus:outline-none focus:border-[#ADC2A9]"
            />
          </div>

          {/* Content Type Selector */}
          <div>
            <label className="block font-bold mb-1.5 text-[#2D3A2C] dark:text-[#FEF5ED]">
              콘텐츠 유형 *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("project")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  type === "project"
                    ? "bg-[#ADC2A9] text-[#2D3A2C] border-[#ADC2A9] shadow-sm"
                    : "bg-gray-50 dark:bg-[#1E271D] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#ADC2A9]"
                }`}
              >
                <span>📁 프로젝트 (Projects)</span>
              </button>
              <button
                type="button"
                onClick={() => setType("retrospective")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  type === "retrospective"
                    ? "bg-[#ADC2A9] text-[#2D3A2C] border-[#ADC2A9] shadow-sm"
                    : "bg-gray-50 dark:bg-[#1E271D] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#ADC2A9]"
                }`}
              >
                <span>📝 기술 회고 (Retrospectives)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                카테고리 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              >
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="javascript">javascript</option>
                <option value="my-story">my-story</option>
                <option value="retrospective">retrospective</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                날짜 *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#ADC2A9]"
              />
              <label htmlFor="featured" className="font-bold text-[#2D3A2C] dark:text-[#FEF5ED] cursor-pointer">
                대표 프로젝트 지정
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                소속 / 프로젝트 구분
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="예: (주)썬더소프트코리아 / 개인 프로젝트"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                기술 스택 (쉼표 구별)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, TypeScript, Next.js"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                역할 / 기여도
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Frontend Lead (80%)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                GitHub 주소
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
                Live Demo 주소
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] focus:outline-none focus:border-[#ADC2A9]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-[#2D3A2C] dark:text-[#FEF5ED]">
              마크다운 상세 본문 (Case Study)
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="마크다운 문법으로 프로젝트 설명 및 이슈 해결 과정 작성"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E271D] font-mono text-xs focus:outline-none focus:border-[#ADC2A9]"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="px-6 py-2.5 rounded-xl font-bold bg-[#ADC2A9] text-[#2D3A2C] hover:bg-[#9BB397] disabled:opacity-50"
            >
              {submitting ? "저장 중..." : isEdit ? "수정 완료" : "생성 하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return mounted ? createPortal(modalJSX, document.body) : null;
}
