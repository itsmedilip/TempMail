import { GoogleGenAI } from "@google/genai";

export const summarizeEmail = async (text: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Summarize the following email content concisely, in 2-3 sentences. Focus on the main purpose and any calls to action. Here is the email content:\n\n---\n\n${text}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing email with Gemini:", error);
    throw new Error("Failed to generate summary from AI.");
  }
};
