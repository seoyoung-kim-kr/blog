import React from "react";
import { Post } from "../service/posts";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
  variant?: "home" | "blog";
};

export default function PostsGrid({ posts, variant = "home" }: Props) {
  if (variant === "blog") {
    return (
      <div className="divide-y divide-[#ADC2A9]/30 dark:divide-[#ADC2A9]/20">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} variant="blog" />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col space-y-4 sm:space-y-6">
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard key={post.path} post={post} variant="home" />
        </li>
      ))}
    </ul>
  );
}
