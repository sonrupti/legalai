"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
} from "lucide-react";
import { Chat } from "@/types/chat";

interface SidebarProps {
  chats: Chat[];
  currentChatId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}

export default function Sidebar({
  chats,
  currentChatId,
  onSelect,
  onNewChat,
  onDelete,
  onRename,
}: SidebarProps) {

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState("");

  const filtered = chats.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date();

  const todayChats = filtered.filter(chat => {
    const d = new Date(chat.updatedAt);

    return d.toDateString() === today.toDateString();
  });

  const yesterdayChats = filtered.filter(chat => {
    const d = new Date(chat.updatedAt);

    const y = new Date();

    y.setDate(today.getDate() - 1);

    return d.toDateString() === y.toDateString();
  });

  const olderChats = filtered.filter(chat => {
    const d = new Date(chat.updatedAt);

    return (
      d.toDateString() !== today.toDateString() &&
      d.toDateString() !==
      new Date(today.getTime() - 86400000).toDateString()
    );
  });

  function renderChats(title: string, list: Chat[]) {
    if (list.length === 0) return null;

    return (
      <>
        <p className="px-3 mt-5 mb-2 text-xs uppercase text-zinc-500">
          {title}
        </p>

        {list.map(chat => (
          <div
            key={chat.id}
            className={`group mx-2 mb-2 rounded-lg ${currentChatId === chat.id
                ? "bg-zinc-800"
                : "hover:bg-zinc-900"
              }`}
          >
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => onSelect(chat.id)}
            >
              {editingId === chat.id ? (
                <input
                  autoFocus
                  defaultValue={chat.title}
                  className="w-full bg-transparent outline-none"
                  onBlur={(e) => {
                    onRename(chat.id, e.target.value);
                    setEditingId("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRename(
                        chat.id,
                        (e.target as HTMLInputElement).value
                      );
                      setEditingId("");
                    }
                  }}
                />
              ) : (
                <>
                  <span className="truncate">
                    {chat.title}
                  </span>

                  <div className="hidden gap-2 group-hover:flex">

                    <Pencil
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(chat.id);
                      }}
                    />

                    <Trash2
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (
                          confirm(
                            "Delete this conversation?"
                          )
                        ) {
                          onDelete(chat.id);
                        }
                      }}
                    />

                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <aside className="w-72 border-r border-zinc-800 bg-[#171717] flex flex-col">

      <div className="border-b border-zinc-800 p-5">

        <h1 className="text-2xl font-bold">
          ⚖️ Legal AI
        </h1>

        <p className="text-sm text-zinc-500">
          Indian Legal Assistant
        </p>

      </div>

      <div className="p-4">

        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 hover:bg-blue-500"
        >
          <Plus size={18} />
          New Chat
        </button>

      </div>

      <div className="px-4">

        <div className="flex items-center rounded-lg bg-zinc-900 px-3">

          <Search size={16} />

          <input
            className="w-full bg-transparent p-2 outline-none"
            placeholder="Search chats..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="flex-1 overflow-y-auto mt-4">

        {renderChats("Today", todayChats)}

        {renderChats("Yesterday", yesterdayChats)}

        {renderChats("Older", olderChats)}

      </div>

    </aside>
  );
}