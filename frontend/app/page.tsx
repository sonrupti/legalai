"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

import { useChats } from "@/hooks/useChats";
import { Chat } from "@/types/chat";


export default function Home() {


  const {

    chats,

    setChats,

    currentChatId,

    setCurrentChatId,

    createChat,

    deleteChat,

    renameChat,


  } = useChats();




  const currentChat =
    chats.find(
      (chat) =>
        chat.id === currentChatId
    );




  const messages =
    currentChat?.messages || [];





  const [loading, setLoading] =
    useState(false);





  const bottomRef =
    useRef<HTMLDivElement>(null);



  const controllerRef =
    useRef<AbortController | null>(null);







  // Auto scroll
  useEffect(() => {


    bottomRef.current?.scrollIntoView({

      behavior: "smooth",

    });


  }, [messages]);









  function generateTitle(
    text: string
  ) {

    return text

      .replace(/[?.!,]/g, "")

      .trim()

      .split(" ")

      .slice(0, 4)

      .join(" ");

  }








  function updateCurrentChat(
    updater: (chat: Chat) => Chat
  ) {


    setChats((prev) => {


      const updated =

        prev.map((chat) =>


          chat.id === currentChatId

            ? updater(chat)

            : chat


        );




      return updated.sort(

        (a, b) =>

          b.updatedAt - a.updatedAt

      );


    });


  }









  function clearCurrentChat() {


    if (!currentChatId)
      return;




    setChats((prev) =>


      prev.map((chat) =>


        chat.id === currentChatId

          ?

          {

            ...chat,

            title: "New Chat",

            messages: [],

            updatedAt: Date.now(),

          }


          :

          chat


      )


    );


  }









  async function sendMessage(
    text: string
  ) {



    if (!currentChatId) {

      createChat();

      return;

    }



    if (loading)
      return;






    const controller =
      new AbortController();



    controllerRef.current =
      controller;







    // Add user message

    updateCurrentChat((chat) => ({


      ...chat,


      title:

        chat.title === "New Chat"

          ?

          generateTitle(text)

          :

          chat.title,



      updatedAt:
        Date.now(),



      messages: [


        ...chat.messages,


        {

          role: "user",

          content: text,


        },


      ],


    }));









    // Add assistant placeholder

    updateCurrentChat((chat) => ({


      ...chat,


      messages: [


        ...chat.messages,


        {


          role: "ai",


          content: "",


          isStreaming: true,


        },


      ],


    }));








    setLoading(true);








    try {


      const response =

        await fetch(

          "https://legalai-production-58b2.up.railway.app/legal",

          {


            method: "POST",


            signal:
              controller.signal,


            headers: {


              "Content-Type":

                "application/json",


            },



            body: JSON.stringify({


              question: text,


            }),


          }


        );







      if (!response.body) {

        throw new Error(
          "No response body"
        );

      }







      const reader =

        response.body.getReader();




      const decoder =

        new TextDecoder();









      while (true) {



        const {

          value,

          done


        } = await reader.read();





        if (done)
          break;





        const chunk =

          decoder.decode(

            value,

            {

              stream: true

            }

          );





        if (!chunk)
          continue;








        updateCurrentChat((chat) => {


          const updated =

            [...chat.messages];



          const last =

            updated.length - 1;





          updated[last] = {


            ...updated[last],



            content:

              updated[last].content

              +

              chunk,



            isStreaming: true,



          };






          return {


            ...chat,


            updatedAt:

              Date.now(),



            messages: updated,


          };



        });




      }









      // Remove streaming cursor

      updateCurrentChat((chat) => {


        const updated =

          [...chat.messages];



        const last =

          updated.length - 1;




        if (updated[last]) {


          updated[last] = {


            ...updated[last],


            isStreaming: false,


          };


        }




        return {


          ...chat,


          messages: updated,


        };


      });








    }

    catch (error: any) {



      if (error.name === "AbortError") {

        return;

      }




      console.error(error);






      updateCurrentChat((chat) => {


        const updated =

          [...chat.messages];



        const last =

          updated.length - 1;





        updated[last] = {


          role: "ai",


          content:

            "Error connecting to server.",


          isStreaming: false,


        };





        return {


          ...chat,


          messages: updated,


        };



      });





    }

    finally {


      setLoading(false);


      controllerRef.current = null;


    }



  }









  function stopGeneration() {



    if (controllerRef.current) {

      controllerRef.current.abort();

    }






    updateCurrentChat((chat) => {


      const updated =

        [...chat.messages];



      const last =

        updated.length - 1;





      if (updated[last]) {


        updated[last] = {


          ...updated[last],


          isStreaming: false,


        };


      }





      return {


        ...chat,


        messages: updated,


      };



    });






    setLoading(false);


  }









  return (

    <main

      className="

      flex

      h-screen

      bg-black

      text-white

      "

    >





      <Sidebar


        chats={chats}


        currentChatId={

          currentChatId

        }


        onSelect={

          setCurrentChatId

        }


        onNewChat={

          createChat

        }


        onDelete={

          deleteChat

        }


        onRename={

          renameChat

        }


      />








      <section

        className="

        flex

        flex-1

        flex-col

        "

      >




        <Topbar

          onClearChat={

            clearCurrentChat

          }

        />







        <ChatWindow


          messages={messages}


          onSuggestion={

            sendMessage

          }


        />






        <div ref={bottomRef} />









        {
          loading && (


            <div

              className="

              flex

              justify-center

              p-3

              "

            >



              <button


                onClick={

                  stopGeneration

                }



                className="

                rounded-xl

                bg-red-600

                px-5

                py-2

                hover:bg-red-500

                "

              >

                Stop Generating

              </button>



            </div>


          )
        }








        {
          !loading && (


            <ChatInput


              onSend={

                sendMessage

              }


              disabled={false}


            />


          )
        }





      </section>





    </main>

  );

}