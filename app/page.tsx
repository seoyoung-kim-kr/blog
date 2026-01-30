import Container from "@/src/components/Container";
import PostCard from "@/src/components/PostCard";
import Profile from "@/src/components/Profile";
import { getFeaturedPosts } from "@/src/service/posts";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <>
      <section className="bg-gray-50 py-20">
        <Profile />
      </section>

      <Container>
        <h1>Featured Posts</h1>
        <section className="grid grid-cols-3 gap-x-4 gap-y-10 mt-4">
          {featuredPosts.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
        </section>
      </Container>
    </>
  );
}
