import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const sendMessageToGemini = async (prompt: string, history: Message[]) => {
  /**
   * ==============================================================================
   * ИСПРАВЛЕНИЕ ОШИБКИ:
   * ==============================================================================
   * Ошибка возникала из-за того, что ключ был вставлен без кавычек и воспринимался
   * как набор переменных и математическая операция (минус).
   * 
   * Согласно правилам, мы используем [process.env.API_KEY]. 
   * Ключ автоматически подставляется в эту переменную из настроек среды.
   * ==============================================================================
   */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to CeloraAI. Please try again.";
  }
};