import { SYSTEM_PROMPT } from "@/src/lib/systemPrompt";
import { ChatMessage } from "@/src/types/chat";

export function buildPrompt(message: string, history: ChatMessage[]) {
  const formattedHistory = history
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  return `
SYSTEM:
${SYSTEM_PROMPT}

HISTORY:
${formattedHistory}

USER:
${message}

ASSISTANT:
`;
}
