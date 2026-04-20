import Image from "next/image";

import type { Post } from "../service/posts";
import Link from "next/link";

type Props = { post: Post };

export default function PostCard({
  post: { path, title, description, date, category },
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <div className="shadow-md w-70 h-80 rounded-b-md">
        <Image
          src={`/images/posts/${path}.png`}
          alt="Profile"
          width={280}
          height={200}
        />
        <div className="px-4 py-3 grid gap-y-2 h-40">
          <h3>{title}</h3>
          <p className="text-xs">{description}</p>
          <div className="h-6 w-fit text-center px-4 flex items-center bg-pink-50 text-xs rounded-full text-gray-500">
            {category}
          </div>
          <div className="flex justify-end">
            <p className="text-gray-500 text-xs">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
