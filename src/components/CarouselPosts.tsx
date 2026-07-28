import { getCarouselPosts } from "@/src/service/posts";
import MultiCarousel from "@/src/components/MultiCarousel";
import PostCard from "@/src/components/PostCard";

export default async function CarouselPosts() {
  const posts = await getCarouselPosts();

  return (
    <section className="space-y-6 pt-6 border-t border-[#ADC2A9]/30 dark:border-[#ADC2A9]/20">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2D3A2C] dark:text-[#FEF5ED]">
          Other Projects & Case Studies
        </h2>
        <p className="text-sm text-[#2D3A2C]/70 dark:text-[#FEF5ED]/70 mt-1">
          다양한 연구 모듈 및 기술 검증 케이스 스터디입니다.
        </p>
      </div>
      <MultiCarousel className="mt-4">
        {posts.map((post, idx) => (
          <div key={idx} className="p-2 h-full">
            <PostCard post={post} />
          </div>
        ))}
      </MultiCarousel>
    </section>
  );
}
