import AdjacentPostCard from "@/src/components/AdjacentPostCard";
import Container from "@/src/components/Container";
import PostContent from "@/src/components/PostContent";
import { getPostData, getAllPosts } from "@/src/service/posts";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const { path, title, next, prev } = post;

  return (
    <Container>
      <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
        <Image
          className="w-full h-1/5 max-h-125"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={760}
          height={420}
        />
        <PostContent post={post} />
        <section className="flex shadow-md">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </section>
      </article>
    </Container>
  );
}

export async function generateMetadata() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
