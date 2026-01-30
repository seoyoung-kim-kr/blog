import Container from "@/src/components/Container";
import MarkDownProvider from "@/src/components/MarkDownProvider";
import { getPost } from "@/src/service/posts";
import Image from "next/image";
import { notFound } from "next/navigation";

import { FaRegCalendarAlt } from "react-icons/fa";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DetailPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost({ slug });

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <div className="bg-gray-50 space-y-4">
        <div className="w-full relative h-64 overflow-hidden rounded-t-2xl">
          <Image
            src={`/images/posts/${slug}.png`}
            alt="post-image"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <section className="px-4.5 py-3 space-y-4">
          {/* Title, Date, Description */}
          <div>
            <div className="flex justify-between items-start space-y-1">
              <h1 className="text-xl">{post.title}</h1>
              <div className="text-sm flex gap-x-2 items-center">
                <FaRegCalendarAlt />
                {post.date}
              </div>
            </div>
            <p>{post.description}</p>
          </div>
          <div className="bg-gray-200 w-full h-1" />
          {/* Content */}
          <MarkDownProvider>{post.content}</MarkDownProvider>
        </section>
      </div>
    </Container>
  );
}
