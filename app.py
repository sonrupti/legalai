from fastapi import FastAPI
from pydantic import BaseModel
from llm import legal_chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

    answer = legal_chat(question.question)

    return {
        "answer": answer
    }