import { getCarouselPosts } from "@/src/service/posts";
import MultiCarousel from "@/src/components/MultiCarousel";
import PostCard from "@/src/components/PostCard";

export default async function CarouselPosts() {
  const posts = await getCarouselPosts();

  return (
    <section>
      <h2>You may like</h2>
      <MultiCarousel className="mt-4">
        {posts.map((post, idx) => (
          <PostCard post={post} key={idx} />
        ))}
      </MultiCarousel>
    </section>
  );
}
