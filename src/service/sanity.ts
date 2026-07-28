import { SANITY_CONFIG, getSanityApiUrl } from "./sanityConfig";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {}
): Promise<T | null> {
  if (!SANITY_CONFIG.projectId) return null;

  try {
    const url = getSanityApiUrl(query, params);

    // In development or on-demand revalidation, use no-store or 10s revalidate for instant UI updates
    const fetchOptions: RequestInit =
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : ({ next: { revalidate: 10, tags: ["posts"] } } as any);

    const res = await fetch(url, fetchOptions);

    if (!res.ok) return null;
    const json = await res.json();
    return json.result as T;
  } catch (e) {
    console.warn("Sanity fetch error:", e);
    return null;
  }
}

// GROQ Queries
export const ALL_PROJECTS_QUERY = `
  *[_type == "post"] | order(date desc) {
    title,
    description,
    date,
    category,
    "path": select(defined(slug.current) => slug.current, path),
    featured,
    skills,
    demoUrl,
    githubUrl,
    role,
    "image": image.asset->url
  }
`;

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "post" && featured == true] | order(date desc) {
    title,
    description,
    date,
    category,
    "path": select(defined(slug.current) => slug.current, path),
    featured,
    skills,
    demoUrl,
    githubUrl,
    role,
    "image": image.asset->url
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "post" && (path == $slug || slug.current == $slug)][0] {
    title,
    description,
    date,
    category,
    "path": select(defined(slug.current) => slug.current, path),
    featured,
    skills,
    demoUrl,
    githubUrl,
    role,
    content,
    "image": image.asset->url
  }
`;
