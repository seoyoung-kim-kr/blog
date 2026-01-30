import path from "path";
import { promises as fs } from "fs";

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export type PostWithContent = Post & {
  content: string;
};

export async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  return featuredPosts;
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  const featuredPosts = posts.filter((post) => !post.featured);
  return featuredPosts;
}

export async function getPost({
  slug,
}: {
  slug: string;
}): Promise<PostWithContent | undefined> {
  const posts = await getPosts();
  const foundPost = posts.find((post) => post.path === slug);

  if (!foundPost) return undefined;

  const filePath = path.join(process.cwd(), "data/posts", `${slug}.md`);
  const content = await fs.readFile(filePath, "utf-8");

  return {
    ...foundPost,
    content,
  };
}
