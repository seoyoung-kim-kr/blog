import FilterablePosts from "@/src/components/FilterablePosts";
import { getAllPosts } from "@/src/service/posts";

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return <FilterablePosts posts={posts} categories={categories} />;
}
