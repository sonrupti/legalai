import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 text-zinc-100"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>

        {!isUser && (
          <button
            className="absolute right-3 top-3 text-zinc-400 hover:text-white"
            onClick={() => navigator.clipboard.writeText(content)}
          >
            <Copy size={16} />
          </button>
        )}
      </div>
    </div>
  );
}