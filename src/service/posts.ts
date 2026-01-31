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
  const sortedPosts = [...JSON.parse(data)].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return sortedPosts;
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

export async function getAdjacentPosts({
  slug,
}: {
  slug: string;
}): Promise<{ prevPost: Post | null; nextPost: Post | null } | undefined> {
  const posts = await getPosts();

  const currentIndex = posts.findIndex((post) => post.path === slug);

  if (currentIndex === -1) return undefined;

  const prevPost = posts[currentIndex + 1] ?? null;
  const nextPost = posts[currentIndex - 1] ?? null;

  return {
    prevPost,
    nextPost,
  };
}
