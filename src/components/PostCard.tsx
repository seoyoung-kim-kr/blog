import React from "react";
import type { Post } from "../service/posts";
import HomePostCard from "./HomePostCard";
import BlogPostListItem from "./BlogPostListItem";

type Props = {
  post: Post & { content?: string };
  variant?: "home" | "blog";
};

export default function PostCard({ post, variant = "home" }: Props) {
  if (variant === "blog") {
    return <BlogPostListItem post={post} />;
  }

  return <HomePostCard post={post} />;
}
