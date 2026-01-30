import Image from "next/image";

import type { Post } from "../service/posts";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.path}`}>
      <div className="shadow-md w-75 h-80 rounded-b-md">
        <Image
          src={`/images/posts/${post.path}.png`}
          alt="Profile"
          width={300}
          height={200}
        />
        <div className="px-4 py-3 grid gap-y-2 h-40">
          <h3>{post.title}</h3>
          <p className="text-xs">{post.description}</p>
          <div className="h-6 w-fit text-center px-4 flex items-center bg-pink-50 text-xs rounded-full text-gray-500">
            {post.category}
          </div>
          <div className="flex justify-end">
            <p className="text-gray-500 text-xs">{post.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
