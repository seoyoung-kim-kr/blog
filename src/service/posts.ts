import path from "path";
import { readFile, writeFile, unlink } from "fs/promises";
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
  type?: "project" | "retrospective";
  company?: string;
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
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.featured || post.type === "project" || !post.type)
  );
}

export async function getProjects(): Promise<Post[]> {
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.type === "project" || post.featured || !post.type)
  );
}

export async function getRetrospectives(): Promise<Post[]> {
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.type === "retrospective")
  );
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

export async function updateLocalPost(
  slug: string,
  input: Partial<Post & { content?: string; slug?: string }>
): Promise<void> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  try {
    const fileContent = await readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(fileContent);

    const index = posts.findIndex(
      (p) => p.path === slug || p.title === input.title
    );

    const newPath = input.slug || input.path || slug;

    if (index !== -1) {
      const target = posts[index];
      posts[index] = {
        ...target,
        title: input.title ?? target.title,
        description: input.description ?? target.description,
        category: input.category ?? target.category,
        date: input.date ?? target.date,
        type: input.type ?? target.type,
        company: input.company ?? target.company,
        featured: input.featured ?? target.featured,
        skills: input.skills ?? target.skills,
        demoUrl: input.demoUrl ?? target.demoUrl,
        githubUrl: input.githubUrl ?? target.githubUrl,
        role: input.role ?? target.role,
        image: input.image ?? target.image,
        path: newPath,
      };

      await writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");
    }

    if (input.content !== undefined) {
      const mdPath = path.join(process.cwd(), "data", "posts", `${newPath}.md`);
      await writeFile(mdPath, input.content, "utf-8").catch(() => {});
    }
  } catch (error) {
    console.error("updateLocalPost failed:", error);
  }
}

export async function deleteLocalPost(slug: string): Promise<void> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  try {
    const fileContent = await readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(fileContent);
    const filtered = posts.filter((p) => p.path !== slug);
    await writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");

    const mdPath = path.join(process.cwd(), "data", "posts", `${slug}.md`);
    await unlink(mdPath).catch(() => {});
  } catch (error) {
    console.error("deleteLocalPost failed:", error);
  }
}
