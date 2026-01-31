import React from "react";
import { Post } from "../service/posts";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AdjacentPostNav({
  prevPost,
  nextPost,
}: {
  prevPost: Post | null;
  nextPost: Post | null;
}) {
  return (
    <div className="flex w-full">
      {prevPost ? (
        <>
          {/* Previous Post */}
          <Link href={prevPost.path} className="w-1/2">
            <div className="relative h-64 w-full overflow-hidden rounded-bl-2xl">
              <Image
                src={`/images/posts/${prevPost.path}.png`}
                alt="prev-post-image"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <div className="absolute inset-0 z-20">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FaArrowLeft className="text-white" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-white text-lg font-bold mb-2">
                    {prevPost.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {prevPost.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <div className="w-1/2" />
      )}

      {nextPost ? (
        <>
          {/* Next Post */}
          <Link href={nextPost.path} className="w-1/2">
            <div className="relative h-64 w-full overflow-hidden rounded-br-2xl">
              <Image
                src={`/images/posts/${nextPost.path}.png`}
                alt="next-post-image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <div className="absolute inset-0 z-20">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <FaArrowRight className="text-white" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-white text-lg font-bold">
                    {nextPost.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {nextPost.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <div className="w-1/2" />
      )}
    </div>
  );
}
