import React from "react";
import { getFeaturedPosts } from "@/src/service/posts";
import PostCard from "./PostCard";
import PostsGrid from "./PostsGrid";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section>
      <h2>Featured Posts</h2>
      <PostsGrid posts={featuredPosts} />
    </section>
  );
}
