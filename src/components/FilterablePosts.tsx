"use client";
import { useState } from "react";
import { Post } from "../service/posts";
import PostsGrid from "./PostsGrid";
import Categories from "./Categories";
import Container from "./Container";

type Props = {
  posts: Post[];
  categories: string[];
};

const ALL_POSTS = "All Posts";

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);

  const filtered =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);

  if (!posts) {
    <div>No Data</div>;
  }
  return (
    <>
      <div className="justify-center rounded-md sticky top-20 left-30 w-full">
        <Categories
          categories={[ALL_POSTS, ...categories]}
          selected={selected}
          onClick={setSelected}
        />
      </div>
      <Container>
        <PostsGrid posts={filtered} />
      </Container>
    </>
  );
}
