"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChatPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessage = {
      role: "user" as const,
      content: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-generated-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          time: getTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Server error.",
          time: getTime(),
        },
      ]);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white border-gray-200 shadow-sm p-4 text-center text-lg font-semibold">
        Influenco AI Chat
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar */}
            {msg.role === "assistant" ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                AI
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                You
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-xl rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <div className="prose max-w-none prose-p:my-2 prose-li:my-1 prose-strong:font-semibold prose-headings:mt-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>

              {/* Timestamp */}
              <div
                className={`text-xs mt-2 ${
                  msg.role === "user" ? "text-purple-200" : "text-gray-500"
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <div className="bg-gray-100 text-gray-600 px-5 py-4 rounded-2xl shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl outline-none text-black"
            placeholder="Ask something..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
