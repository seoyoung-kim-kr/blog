import { Post } from "../service/posts";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Props = {
  post: Post;
  type: "next" | "prev";
};

export default function AdjacentPostCard({
  post: { path, title, description },
  type,
}: Props) {
  const isPrev = type === "prev";

  return (
    <Link
      href={`/posts/${path}`}
      className="group flex-1 flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1E271D]/80 border border-[#ADC2A9]/40 dark:border-[#ADC2A9]/20 backdrop-blur-md hover:bg-white dark:hover:bg-[#1E271D] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      {isPrev && (
        <div className="w-10 h-10 rounded-full bg-[#ADC2A9]/30 dark:bg-[#ADC2A9]/20 flex items-center justify-center text-[#2D3A2C] dark:text-[#FEF5ED] shrink-0 group-hover:-translate-x-1 transition-transform">
          <FiArrowLeft className="w-5 h-5" />
        </div>
      )}

      <div className={`flex-1 min-w-0 ${isPrev ? "text-left" : "text-right"}`}>
        <span className="text-xs font-bold text-[#4B6346] dark:text-[#ADC2A9] uppercase tracking-wider block mb-1">
          {isPrev ? "← Previous Post" : "Next Post →"}
        </span>
        <h3 className="text-sm sm:text-base font-bold text-[#2D3A2C] dark:text-[#FEF5ED] truncate group-hover:text-[#4B6346] dark:group-hover:text-[#ADC2A9] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-[#2D3A2C]/60 dark:text-[#FEF5ED]/60 truncate mt-0.5">
          {description}
        </p>
      </div>

      {!isPrev && (
        <div className="w-10 h-10 rounded-full bg-[#ADC2A9]/30 dark:bg-[#ADC2A9]/20 flex items-center justify-center text-[#2D3A2C] dark:text-[#FEF5ED] shrink-0 group-hover:translate-x-1 transition-transform">
          <FiArrowRight className="w-5 h-5" />
        </div>
      )}
    </Link>
  );
}
