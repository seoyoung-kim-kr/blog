import CarouselProvider from "@/src/components/CarouselProvider";
import Container from "@/src/components/Container";
import PostCard from "@/src/components/PostCard";
import Profile from "@/src/components/Profile";
import { getFeaturedPosts, getNonFeaturedPosts } from "@/src/service/posts";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();
  const nonFeaturedPosts = await getNonFeaturedPosts();

  return (
    <>
      <section className="bg-gray-50 py-20">
        <Profile />
      </section>

      <Container className="space-y-7">
        <section>
          <h1>Featured Posts</h1>
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 mt-4">
            {featuredPosts.map((post, idx) => (
              <PostCard post={post} key={idx} />
            ))}
          </div>
        </section>

        <section>
          <h1>You may like</h1>
          <CarouselProvider className="mt-4 space-x-4">
            {nonFeaturedPosts.map((post, idx) => (
              <PostCard post={post} key={idx} />
            ))}
          </CarouselProvider>
        </section>
      </Container>
    </>
  );
}
