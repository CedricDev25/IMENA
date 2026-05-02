import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getAIResponse = async (messages: ChatMessage[], businessContext?: string) => {
  try {
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));
    
    const lastMessage = messages[messages.length - 1].content;

    const systemInstruction = `You are FinAI Coach, a financial advisor for Rwandan small businesses. Always respond in Rwandan Francs (RWF). Provide practical, actionable advice for micro and small enterprises in the Rwandan context. Be encouraging and professional.
    
    Current Business Context:
    ${businessContext || "No transaction data available yet."}
    
    If the user has 0 revenue, encourage them to add their first transaction. If they have expenses higher than income, suggest ways to save or increase sales in the Rwandan market (e.g., platforms like Irembo, local market trends, etc.)`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Error: Could not connect to the AI coach. Please check your API key and try again.";
  }
};
