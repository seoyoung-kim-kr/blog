export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s21m3wpb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
};

export function getSanityApiUrl(query: string, params: Record<string, string> = {}): string {
  let url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(
    query
  )}`;
  for (const [key, value] of Object.entries(params)) {
    url += `&$${key}="${encodeURIComponent(value)}"`;
  }
  return url;
}

export function getSanityMutateUrl(): string {
  return `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/mutate/${SANITY_CONFIG.dataset}`;
}
