import { MetadataRoute } from "next";
import { getAllPosts } from "@/src/service/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://portfolio.seoyoung.dev";

  // 동적 포스트 / 프로젝트 경로 가져오기
  const posts = await getAllPosts().catch(() => []);
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.path}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 정적 경로들
  const routes = ["", "/about", "/posts", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...routes, ...postUrls];
}
