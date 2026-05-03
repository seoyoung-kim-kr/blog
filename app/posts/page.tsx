import FilterablePosts from "@/src/components/FilterablePosts";
import { getAllPosts } from "@/src/service/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Seoyoung's 블로그의 게시글 페이지.",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return <FilterablePosts posts={posts} categories={categories} />;
}
