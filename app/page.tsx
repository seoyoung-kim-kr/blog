import Container from "@/src/components/Container";
import Hero from "@/src/components/Hero";
import FeaturedPosts from "@/src/components/FeaturedPosts";
import TechStackSection from "@/src/components/TechStackSection";
import ExperienceSummary from "@/src/components/ExperienceSummary";
import ContactCTA from "@/src/components/ContactCTA";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Container className="space-y-12 pb-16">
        {/* 1. Tech Stack */}
        <TechStackSection />

        {/* 2. Career Timeline */}
        <ExperienceSummary />

        {/* 3. Featured Projects Showcase */}
        <FeaturedPosts />

        {/* 4. Contact CTA */}
        <ContactCTA />
      </Container>
    </>
  );
}
