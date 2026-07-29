import React from "react";
import Link from "next/link";
import { getFeaturedPosts } from "@/src/service/posts";
import PostsGrid from "./PostsGrid";
import { FiArrowRight } from "react-icons/fi";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
            Featured Projects
          </h2>
        </div>

        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#4B6346] dark:text-[#ADC2A9] hover:underline self-start sm:self-auto"
        >
          <span>모든 프로젝트 보기</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <PostsGrid posts={featuredPosts} />
    </section>
  );
}
