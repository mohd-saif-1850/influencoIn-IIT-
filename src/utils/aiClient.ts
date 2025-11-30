import { ai } from "@/src/lib/genai";

export async function generateAIResponse(prompt: string) {
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(prompt);

  return result?.response?.text() ?? "";
}
