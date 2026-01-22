
import { Message } from "../types";

export const sendMessageToGemini = async (prompt: string, history: Message[]) => {
  // Get API key from localStorage (set in Settings)
  const apiKey = localStorage.getItem('mistral_api_key');

  if (!apiKey) {
    return "Error: Mistral API key is not configured. Please go to Settings and enter your API key.";
  }

  const messages = [
    {
      role: "system",
      content: "You are CeloraAI, a professional and helpful AI assistant created by Element Intelligent. Respond clearly and adapt to the user's language (English, Russian, or Uzbek)."
    },
    ...history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    {
      role: "user",
      content: prompt
    }
  ];

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Mistral API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `Error: ${error.message || "Unable to get response from CeloraAI"}`;
  }
};
