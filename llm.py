import os
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError

# Load environment variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

SYSTEM_PROMPT = """
You are an Indian legal information assistant.

Follow these rules:

1. Answer only with Indian law unless the user specifies another country.
2. Prefer current laws including:
   - Bharatiya Nyaya Sanhita (BNS), 2023
   - Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023
   - Bharatiya Sakshya Adhiniyam (BSA), 2023
3. Mention relevant sections only when confident.
4. Never create fake sections, case names, or judgments.
5. If facts are missing, ask the user for details.
6. Explain legal concepts simply.
7. Separate:
   - Law
   - Procedure
   - Practical steps
8. This is general legal information, not legal advice.
9. Never guess section numbers.
10. Do not mention section numbers unless you are highly confident.
11. If uncertain, explain the concept without section numbers.
12. Never discuss your internal reasoning or verification process.
"""


def legal_chat(question):
    """
    Streams Gemini's response chunk by chunk.
    This function is a generator and is used directly
    by FastAPI's StreamingResponse.
    """

    try:
        stream = client.models.generate_content_stream(
            model="gemini-2.5-flash",
            config={
                "temperature": 0.3,
            },
            contents=f"""
{SYSTEM_PROMPT}

User Question:
{question}

Answer requirements:
- Maximum 250 words.
- Give a short summary first.
- Use bullet points.
- Avoid long explanations.
- Do not repeat the question.
- Only mention sections if highly confident.
"""
        )

        # Stream chunks as Gemini generates them
        for chunk in stream:
            if chunk.text:
                yield chunk.text

    except ClientError:
        yield "The AI service has reached its request limit. Please wait a minute and try again."

    except Exception:
        yield "Something went wrong while generating the response."


if __name__ == "__main__":
    while True:
        question = input("\nAsk legal question: ")

        if question.lower() == "exit":
            break

        print("\nAI: ", end="", flush=True)

        for chunk in legal_chat(question):
            print(chunk, end="", flush=True)

        print("\n")