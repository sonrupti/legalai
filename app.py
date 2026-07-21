
import time
from google import genai
import os

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from llm import legal_chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LegalQuestion(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Indian Legal AI is running"
    }


@app.post("/legal")
def ask_legal(question: LegalQuestion):
    """
    Streams the AI response back to the frontend.
    legal_chat() should return a generator that yields text chunks.
    """

    return StreamingResponse(
        legal_chat(question.question),
        media_type="text/plain",
    )