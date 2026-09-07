"use client";

import dynamic from "next/dynamic";

const ProjectEditor = dynamic(() => import("@/src/components/ProjectEditor"), {
  ssr: false,
});

export default function AdminWritePage() {
  return <ProjectEditor />;
}
