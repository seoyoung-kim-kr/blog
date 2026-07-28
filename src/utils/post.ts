import { Post } from "../service/posts";

/**
 * Returns the resolved thumbnail image URL for a post.
 * Prefers the Sanity Cloud asset URL if present, otherwise falls back to local image assets.
 */
export function getPostImageUrl(post: Partial<Post>): string {
  if (post.image) {
    return post.image;
  }
  if (post.path) {
    return `/images/posts/${post.path}.png`;
  }
  return "/images/favicon-logo.png";
}
