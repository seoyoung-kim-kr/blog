import Container from "@/src/components/Container";
import Hero from "@/src/components/Hero";
import FeaturedPosts from "@/src/components/FeaturedPosts";
import CarouselPosts from "@/src/components/CarouselPosts";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Container className="space-y-7">
        <FeaturedPosts />
        <CarouselPosts />
      </Container>
    </>
  );
}
