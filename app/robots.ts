import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://portfolio.seoyoung.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sy-admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
