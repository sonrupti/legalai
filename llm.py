import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

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
9. Do not mention section numbers unless you are highly confident.
10. If uncertain, explain the concept without section numbers.
11. Never discuss your internal reasoning or verification process.
"""


def review_answer(answer):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
You are a legal answer quality checker.

Review the answer internally.

Check:
- Wrong legal sections
- Fake citations
- Incorrect laws
- Overconfident statements

IMPORTANT:
Do NOT explain your review.
Do NOT mention mistakes found.
Do NOT show analysis.

Only output the final improved legal answer that should be shown to the user.

Original answer:

{answer}
"""
    )

    return response.text



def legal_chat(question):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
{SYSTEM_PROMPT}

User Question:
{question}
"""
    )

    first_answer = response.text

    checked_answer = review_answer(first_answer)

    return checked_answer



if __name__ == "__main__":
    while True:
        question = input("\nAsk legal question: ")

        if question.lower() == "exit":
            break

        answer = legal_chat(question)
        print("\nAI:", answer)