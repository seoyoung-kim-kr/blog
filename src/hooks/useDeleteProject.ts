"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useDeleteProject() {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const deleteProject = async (path: string, title: string, redirectOnSuccess = false) => {
    if (!confirm(`정말로 "${title}" 프로젝트를 삭제하시겠습니까?`)) {
      return false;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${path}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "삭제에 실패했습니다.");
      }

      if (redirectOnSuccess) {
        router.push("/posts");
      }
      router.refresh();
      return true;
    } catch (e: any) {
      alert(`삭제 오류: ${e.message}`);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return { deleteProject, deleting };
}
