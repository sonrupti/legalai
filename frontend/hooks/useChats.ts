"use client";

import { useEffect, useState } from "react";

import { Chat } from "@/types/chat";

import {
  getChats,
  saveChats,
  getCurrentChatId,
  saveCurrentChatId,
} from "@/lib/chatStorage";


export function useChats() {


  const [chats, setChats] =
    useState<Chat[]>([]);


  const [currentChatId, setCurrentChatId] =
    useState("");



  const [initialized, setInitialized] =
    useState(false);





  // Load chats once

  useEffect(() => {


    if (initialized)
      return;



    const saved =
      getChats();



    if (saved.length > 0) {


      setChats(saved);



      const current =
        getCurrentChatId();



      const exists =
        saved.find(
          chat =>
            chat.id === current
        );



      setCurrentChatId(
        exists
          ? exists.id
          : saved[0].id
      );



    } else {


      const firstChat: Chat = {


        id: crypto.randomUUID(),


        title: "New Chat",


        messages: [],


        createdAt: Date.now(),


        updatedAt: Date.now(),


      };



      setChats([firstChat]);

      setCurrentChatId(firstChat.id);



    }



    setInitialized(true);



  }, [initialized]);








  // Save chats whenever changed

  useEffect(() => {


    if (initialized) {

      saveChats(chats);

    }


  }, [chats, initialized]);







  // Save current chat

  useEffect(() => {


    if (currentChatId) {

      saveCurrentChatId(
        currentChatId
      );

    }


  }, [currentChatId]);









  function createChat() {


    const chat: Chat = {


      id: crypto.randomUUID(),


      title: "New Chat",


      messages: [],


      createdAt: Date.now(),


      updatedAt: Date.now(),


    };





    setChats(prev => [

      chat,

      ...prev,

    ]);




    setCurrentChatId(chat.id);



  }









  function deleteChat(
    id: string
  ) {



    const updated =

      chats.filter(
        chat =>
          chat.id !== id
      );





    // If deleting last chat

    if (updated.length === 0) {



      const newChat: Chat = {


        id: crypto.randomUUID(),


        title: "New Chat",


        messages: [],


        createdAt: Date.now(),


        updatedAt: Date.now(),


      };



      setChats([newChat]);

      setCurrentChatId(
        newChat.id
      );


      return;

    }







    setChats(updated);







    if (currentChatId === id) {


      setCurrentChatId(
        updated[0].id
      );


    }


  }









  function renameChat(
    id: string,
    title: string
  ) {



    setChats(prev =>


      prev.map(chat =>


        chat.id === id

          ?


          {


            ...chat,


            title:

              title.trim()
              || "New Chat",


            updatedAt:
              Date.now(),


          }


          : chat


      )


    );


  }








  return {


    chats,


    setChats,


    currentChatId,


    setCurrentChatId,


    createChat,


    deleteChat,


    renameChat,


  };


}