
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const sendMessageToGemini = async (prompt: string, history: Message[]) => {
  // Ключ берется из окружения (автоматически подставляется при хостинге)
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("Gemini API Key is missing.");
    return "Error: API key is not configured in the environment.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const contents = history.map(msg => ({
    role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "You are CeloraAI, a professional and helpful AI assistant created by Element Intelligent. Respond clearly and adapt to the user's language (English, Russian, or Uzbek).",
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message || "Unable to get response from CeloraAI"}`;
  }
};
