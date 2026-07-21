const API_URL = "http://127.0.0.1:8000";

export async function askLegalAI(question: string) {
  const response = await fetch(`${API_URL}/legal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Status ${response.status}: ${text}`);
  }

  return response.json();
}