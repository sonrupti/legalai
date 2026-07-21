"use client";

import { useState } from "react";
import { Paperclip, Mic, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {

  const [input, setInput] = useState("");

  function handleSend() {

    const message = input.trim();

    if (!message || disabled) return;

    onSend(message);

    setInput("");
  }


  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSend();

    }

  }


  return (

    <div className="
      border-t
      border-zinc-800
      bg-black
      p-4
    ">


      <div className="
        mx-auto
        flex
        max-w-4xl
        items-end
        gap-2
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900
        p-3
      ">


        {/* Attachment */}

        <button
          className="
            rounded-lg
            p-2
            text-zinc-400
            hover:bg-zinc-800
          "
        >

          <Paperclip size={20} />

        </button>



        {/* Input */}

        <textarea

          maxLength={2000}

          value={input}


          disabled={disabled || !input.trim()}

          onChange={(e) => setInput(e.target.value)}

          onKeyDown={handleKeyDown}

          rows={1}

          className="
            max-h-40
            flex-1
            resize-none
            bg-transparent
            p-2
            text-white
            outline-none
          "

          placeholder="Ask a legal question..."

        />



        {/* Voice */}

        <button
          className="
            rounded-lg
            p-2
            text-zinc-400
            hover:bg-zinc-800
          "
        >

          <Mic size={20} />

        </button>



        {/* Send */}

        <button

          onClick={handleSend}

          disabled={disabled || !input.trim()}

          className="
            rounded-xl
            bg-blue-600
            p-3
            hover:bg-blue-500
            disabled:opacity-50
          "

        >

          <Send size={18} />

        </button>


      </div>


      <p className="
        mt-2
        text-center
        text-xs
        text-zinc-500
      ">

        {input.length}/2000

      </p>


    </div>

  );
}