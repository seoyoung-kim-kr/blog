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
            Projects
          </h2>
        </div>
      </div>

      <PostsGrid posts={featuredPosts} variant="home" />
    </section>
  );
}
