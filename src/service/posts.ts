import path from "path";
import { readFile } from "fs/promises";

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export async function getCarouselPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data/posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) throw `${fileName} not found`;

  const content = await readFile(filePath, "utf-8");

  const currentIndex = posts.findIndex((post) => post.path === fileName);
  const prev = posts[currentIndex + 1] ?? null;
  const next = posts[currentIndex - 1] ?? null;

  return {
    ...post,
    content,
    next,
    prev,
  };
}
