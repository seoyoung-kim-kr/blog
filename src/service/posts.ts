import path from "path";
import { readFile } from "fs/promises";
import { cache } from "react";
import {
  sanityFetch,
  ALL_PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from "./sanity";

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
  skills?: string[];
  demoUrl?: string;
  githubUrl?: string;
  role?: string;
  image?: string;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

// Fallback to local posts.json if Sanity is not connected or returns empty
async function getLocalPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const sanityPosts = await sanityFetch<Post[]>(ALL_PROJECTS_QUERY);
  if (sanityPosts && sanityPosts.length > 0) {
    return sanityPosts;
  }
  return getLocalPosts();
});


export async function getFeaturedPosts(): Promise<Post[]> {
  const sanityPosts = await sanityFetch<Post[]>(FEATURED_PROJECTS_QUERY);
  if (sanityPosts && sanityPosts.length > 0) {
    return sanityPosts;
  }
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export async function getCarouselPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.path === fileName);
  const prev = posts[currentIndex + 1] ?? null;
  const next = posts[currentIndex - 1] ?? null;

  const sanityPost = await sanityFetch<any>(PROJECT_BY_SLUG_QUERY, {
    slug: fileName,
  });

  if (sanityPost) {
    return {
      ...sanityPost,
      content: sanityPost.content || "",
      next,
      prev,
    };
  }

  // Fallback to local markdown file
  const filePath = path.join(process.cwd(), "data/posts", `${fileName}.md`);
  const post = posts.find((post) => post.path === fileName);
  if (!post) throw `${fileName} not found`;

  const content = await readFile(filePath, "utf-8").catch(() => "");

  return {
    ...post,
    content,
    next,
    prev,
  };
}
