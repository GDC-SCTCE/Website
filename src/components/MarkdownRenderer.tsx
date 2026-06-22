import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`markdown-container ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="font-sora font-extrabold text-[28px] uppercase tracking-tight text-[#FF7A00] mt-8 mb-4 first:mt-0" {...props} />,
          h2: ({ node, ...props }) => <h2 className="font-sora font-bold text-[20px] uppercase tracking-tight text-[#FFB68B] mt-5 mb-3 first:mt-0" {...props} />,
          h3: ({ node, ...props }) => <h3 className="font-sora font-bold text-[18px] uppercase tracking-tight text-[#FFB68B] mt-5 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="font-sans text-[15px] text-[#E5E2E3] leading-[26px] mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-outside text-[#E5E2E3] mb-6 ml-5" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-outside text-[#E5E2E3] mb-6 ml-5" {...props} />,
          li: ({ node, ...props }) => <li className="font-sans text-[15px] text-[#E5E2E3] leading-[26px] [&>p]:mb-0" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
          a: ({ node, ...props }) => <a className="text-[#00DBE9] hover:text-[#FF7A00] underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-[#FF7A00] bg-[#FF7A00]/10 pl-4 py-2 italic text-[#E0C0AF] my-4" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return <code className="bg-[#1C1B1C] text-[#FFB68B] font-mono text-[13px] px-1.5 py-0.5 rounded border border-[#584235]" {...props}>{children}</code>;
            }
            return (
              <pre className="bg-[#131314] text-[#E0C0AF] font-mono text-[13px] p-4 rounded border border-[#584235] overflow-x-auto my-4">
                <code {...props}>{children}</code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
