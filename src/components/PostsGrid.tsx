import React from "react";
import { Post } from "../service/posts";
import PostCard from "./PostCard";

type Props = { posts: Post[] };

export default function PostsGrid({ posts }: Props) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,280px)] gap-x-4 gap-y-10">
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
