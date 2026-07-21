import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function MarkdownMessage({
  content
}:{
  content:string;
}){


return (

<div
className="
prose
prose-invert
max-w-none
"
>

<ReactMarkdown
remarkPlugins={[remarkGfm]}
>

{content}

</ReactMarkdown>

</div>

);

}