"use client";

import {
  Moon,
  UserCircle,
  Trash2,
} from "lucide-react";


export default function Topbar({

  onClearChat,

}: {

  onClearChat: () => void;

}) {


  return (

    <header
      className="
      flex
      h-16
      items-center
      justify-between
      border-b
      border-zinc-800
      px-6
      "
    >


      <h2
        className="
        text-lg
        font-semibold
        "
      >

        Indian Legal AI

      </h2>





      <div
        className="
        flex
        items-center
        gap-3
        "
      >



        {/* Clear Chat */}

        <button

          onClick={onClearChat}

          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-zinc-900
          px-3
          py-2
          text-sm
          hover:bg-zinc-800
          "

        >

          <Trash2 size={16} />

          Clear Chat

        </button>






        {/* Theme button */}

        <button

          className="
          rounded-lg
          p-2
          hover:bg-zinc-800
          "

        >

          <Moon size={20} />

        </button>







        {/* User */}

        <div

          className="
          flex
          items-center
          gap-2
          rounded-full
          bg-zinc-900
          px-3
          py-2
          "

        >

          <UserCircle size={20} />

          <span>

            Guest

          </span>

        </div>



      </div>



    </header>

  );

}