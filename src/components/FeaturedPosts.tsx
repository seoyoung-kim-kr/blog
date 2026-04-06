import React from "react";
import { getFeaturedPosts } from "@/src/service/posts";
import PostCard from "./PostCard";
import PostsGrid from "./PostsGrid";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section>
      <h1>Featured Posts</h1>
      <PostsGrid posts={featuredPosts} />
    </section>
  );
}
