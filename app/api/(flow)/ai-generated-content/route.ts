import { NextResponse } from "next/server";
import { buildPrompt } from "@/src/utils/buildPrompt";
import { generateAIResponse } from "@/src/utils/aiClient";
import { formatError } from "@/src/utils/error";
import { ChatMessage } from "@/src/types/chat";

export async function POST(req: Request) {
  try {
    const { message, history = [] }: { message: string; history: ChatMessage[] } =
      await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const prompt = buildPrompt(message, history);
    const answer = await generateAIResponse(prompt);

    return NextResponse.json({
      success: true,
      answer,
      model: "gemini-2.5-flash",
      timestamp: Date.now(),
    });
  } catch (err) {
    const errorMessage = formatError(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
