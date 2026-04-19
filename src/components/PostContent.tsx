import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PostData } from "../service/posts";
import MarkdownViewer from "./MarkdownViewer";

function PostContent({ post }: { post: PostData }) {
  const { title, date, description, content } = post;
  return (
    <section className="px-4.5 py-3 space-y-4">
      {/* Post Header */}
      <header className="space-y-1">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <time
            dateTime={date}
            className="text-sm flex gap-x-2 items-center whitespace-nowrap shrink-0"
          >
            <FaRegCalendarAlt aria-hidden="true" />
            <span>{date}</span>
          </time>
        </div>
        <p className="text-gray-600">{description}</p>
      </header>

      <hr className="bg-gray-200 border-0 h-1" />

      {/* Content */}
      <MarkdownViewer content={content} />
    </section>
  );
}

export default PostContent;
