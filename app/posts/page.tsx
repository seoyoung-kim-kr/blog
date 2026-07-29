import FilterablePosts from "@/src/components/FilterablePosts";
import { getAllPosts } from "@/src/service/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "프론트엔드 개발자 김서영이 진행한 다양한 개발 프로젝트와 기술 포스트 아카이브입니다.",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return <FilterablePosts posts={posts} categories={categories} />;
}
