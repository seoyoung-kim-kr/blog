import React from "react";
import { Post } from "../service/posts";
import PostCard from "./PostCard";

type Props = { posts: Post[] };

export default function PostsGrid({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post) => (
        <li key={post.path} className="h-full">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
