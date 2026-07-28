import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#2D3A2C] dark:prose-headings:text-[#FEF5ED] prose-a:text-[#4B6346] dark:prose-a:text-[#ADC2A9] prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl prose-code:text-[#2D3A2C] dark:prose-code:text-[#FEF5ED] prose-code:bg-[#ADC2A9]/30 dark:prose-code:bg-[#ADC2A9]/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (match) {
              const language = match[1];
              return (
                <div className="my-6 rounded-2xl overflow-hidden border border-[#ADC2A9]/30 bg-[#1E271D] shadow-2xl">
                  {/* macOS Terminal Window Controls Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#263125] border-b border-[#ADC2A9]/20 text-xs text-[#ADC2A9]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FFC7C7] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#ADC2A9] inline-block" />
                      <span className="w-3 h-3 rounded-full bg-[#8AA385] inline-block" />
                    </div>
                    <span className="font-mono text-[11px] text-[#ADC2A9] uppercase tracking-wider">
                      {language}
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto text-sm">
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "0.9rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
