import Container from "@/src/components/Container";
import PostCard from "@/src/components/PostCard";
import { getPosts } from "@/src/service/posts";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

type Category = {
  label: string;
  href: string;
};

type CategoryFilterProps = {
  currentCategory?: string;
};

const categories: Category[] = [
  {
    label: "Frontend",
    href: "frontend",
  },
  { label: "Backend", href: "backend" },
  { label: "Javascript", href: "javascript" },
  { label: "My Story", href: "my-story" },
];

const linkClassName =
  "px-3 rounded bg-gray-100 text-sm font-semibold hover:bg-gray-200 h-9 flex items-center transition-colors duration-200 ease-in-out";
const activedLinkClassName = "bg-pink-50 text-gray-500";

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2">
      <Link
        href="/posts"
        className={
          currentCategory === undefined
            ? `${linkClassName} ${activedLinkClassName}`
            : linkClassName
        }
      >
        All
      </Link>

      {categories.map((category) => {
        const isActive = currentCategory === category.href;

        return (
          <Link
            key={category.href}
            href={`/posts?category=${category.href}`}
            className={
              isActive
                ? `${linkClassName} ${activedLinkClassName}`
                : linkClassName
            }
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function PostsPage({ searchParams }: Props) {
  const posts = await getPosts();
  const { category } = await searchParams;

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  if (!posts) {
    <div>No Data</div>;
  }
  return (
    <>
      <div className="inline-flex bg-gray-100 items-center justify-center rounded-md sticky top-20 left-30">
        <CategoryFilter currentCategory={category} />
      </div>

      <Container>
        <section className="grid grid-cols-3 gap-6 mt-4">
          {filteredPosts.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
        </section>
      </Container>
    </>
  );
}
