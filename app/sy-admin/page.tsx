"use client";

import React, { useState } from "react";
import Container from "@/src/components/Container";
import { useAdmin } from "@/src/context/AdminContext";
import ProjectFormModal from "@/src/components/ProjectFormModal";
import Link from "next/link";
import {
  FiShield,
  FiUnlock,
  FiPlus,
  FiArrowRight,
  FiLogOut,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SecretAdminPage() {
  const { isAdmin, loginAdmin, logoutAdmin } = useAdmin();
  const [passcode, setPasscode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const success = await loginAdmin(passcode);
    if (!success) {
      setErrorMsg("비밀번호가 올바르지 않습니다.");
    }
    setSubmitting(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/");
  };

  return (
    <Container className="py-16 sm:py-24 max-w-xl mx-auto">
      {!isAdmin ? (
        /* Secret Login Form Card */
        <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#ADC2A9]/30 flex items-center justify-center text-[#4B6346] dark:text-[#ADC2A9] mb-4">
              <FiShield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3A2C] dark:text-[#FEF5ED]">
              Seoyoung Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              포트폴리오 관리자 전용 시크릿 게이트웨이입니다.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-semibold text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-[#2D3A2C] dark:text-[#FEF5ED]">
                관리자 비밀번호
              </label>
              <input
                type="password"
                required
                placeholder="비밀번호 입력 (기본값: admin)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg("");
                }}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121712] text-sm focus:outline-none focus:border-[#ADC2A9]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-[#ADC2A9] hover:bg-[#9BB397] text-[#2D3A2C] font-bold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              {submitting ? "로그인 중..." : "관리자 모드 잠금 해제"}
            </button>
          </form>
        </div>
      ) : (
        /* Logged In Admin Dashboard Card */
        <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#1E271D]/90 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#ADC2A9]/30 pb-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="w-6 h-6 text-[#8AA385]" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">
                  Admin Active
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  관리자 권한이 활성화되었습니다.
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-xs font-bold hover:bg-red-200 transition-colors"
            >
              <FiLogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-extrabold text-[#4B6346] dark:text-[#ADC2A9] uppercase tracking-wider">
              Quick Admin Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#ADC2A9]/30 hover:bg-[#ADC2A9]/50 text-[#2D3A2C] dark:text-[#FEF5ED] font-bold text-sm border border-[#ADC2A9]/60 transition-all active:scale-95 shadow-sm"
              >
                <FiPlus className="w-4 h-4" />
                <span>새 프로젝트 작성</span>
              </button>

              <Link
                href="/posts"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-[#121712] hover:bg-gray-50 dark:hover:bg-gray-800 text-[#2D3A2C] dark:text-[#FEF5ED] font-bold text-sm border border-gray-200 dark:border-gray-700 transition-all active:scale-95 shadow-sm"
              >
                <FiLayers className="w-4 h-4 text-[#ADC2A9]" />
                <span>프로젝트 목록 관리</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#121712] border border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p className="font-bold text-[#2D3A2C] dark:text-[#FEF5ED]">💡 안내</p>
            <p>
              이제 사이트 어디서든(Home, Projects, 상세페이지) 프로젝트 작성, 수정(연필), 삭제(휴지통) 버튼이 나타납니다.
            </p>
          </div>

          {/* Create Modal inside Admin Dashboard */}
          {isCreateOpen && (
            <ProjectFormModal
              isOpen={isCreateOpen}
              onClose={() => setIsCreateOpen(false)}
              onSuccess={() => {
                router.push("/posts");
                router.refresh();
              }}
            />
          )}
        </div>
      )}
    </Container>
  );
}
