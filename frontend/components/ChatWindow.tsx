"use client";

import CopyButton from "./CopyButton";
import SuggestionCard from "./SuggestionCard";
import MarkdownMessage from "./MarkdownMessage";
import StreamingCursor from "./StreamingCursor";

import { Message } from "@/types/chat";


export default function ChatWindow({

  messages,

  onSuggestion,

}: {

  messages: Message[];

  onSuggestion: (text: string) => void;

}) {


  return (

    <div
      className="
      flex-1
      overflow-y-auto
      p-6
      "
    >


      {
        messages.length === 0 && (

          <div
            className="
            flex
            h-full
            flex-col
            items-center
            justify-center
            gap-8
            "
          >


            <div
              className="text-center"
            >

              <h1
                className="
                text-3xl
                font-bold
                "
              >

                ⚖️ Indian Legal AI

              </h1>


              <p
                className="
                mt-3
                text-zinc-400
                "
              >

                Ask questions about Indian law

              </p>


            </div>





            <div
              className="
              grid
              grid-cols-2
              gap-4
              w-full
              max-w-xl
              "
            >


              <SuggestionCard

                title="Explain bail procedure"

                onClick={() =>
                  onSuggestion(
                    "Explain bail procedure in India"
                  )
                }

              />




              <SuggestionCard

                title="How to file an FIR?"

                onClick={() =>
                  onSuggestion(
                    "How to file an FIR?"
                  )
                }

              />





              <SuggestionCard

                title="Property dispute solution"

                onClick={() =>
                  onSuggestion(
                    "I have a property dispute. What can I do?"
                  )
                }

              />





              <SuggestionCard

                title="Divorce procedure"

                onClick={() =>
                  onSuggestion(
                    "Explain divorce procedure in India"
                  )
                }

              />


            </div>


          </div>

        )
      }







      {



        messages.map((msg, index) => (

          <div
            key={`${msg.role}-${index}`}

            className={`

              mb-4

              rounded-xl

              p-4


              ${msg.role === "user"

                ? "bg-zinc-800"

                : "bg-zinc-900"

              }

            `}

          >



            <b>

              {
                msg.role === "user"

                  ? "You"

                  : "Legal AI"
              }

            </b>





            <div
              className="mt-2"
            >



              {
                msg.role === "ai"

                  ?


                  (

                    <>


                      <MarkdownMessage

                        content={
                          msg.content
                        }

                      />





                      {
                        msg.isStreaming && (

                          <span
                            className="ml-1"
                          >

                            <StreamingCursor />

                          </span>

                        )
                      }







                      {
                        !msg.isStreaming &&
                        msg.content.length > 0 &&

                        (

                          <div
                            className="mt-3"
                          >

                            <CopyButton

                              text={
                                msg.content
                              }

                            />


                          </div>

                        )

                      }



                    </>


                  )



                  :


                  (

                    <p
                      className="
                    whitespace-pre-wrap
                    "
                    >

                      {msg.content}

                    </p>

                  )


              }



            </div>



          </div>


        ))

      }



    </div>


  );

}