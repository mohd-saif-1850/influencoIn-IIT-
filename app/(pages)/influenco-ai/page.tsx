"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SendHorizontal, User, Bot, X } from "lucide-react";

export default function InfluencoAI() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"influencer" | "brand">("influencer");
  const [showConfirm, setShowConfirm] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    "Fashion",
    "Tech",
    "Fitness",
    "Travel",
    "Food",
    "Beauty",
    "Lifestyle",
    "Finance",
    "Education",
    "Influencer Analytics",
    "Brand Strategy",
    "Trending",
    "YouTube Content",
    "Content Ideas"
  ];

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  useEffect(() => {
    const saved = localStorage.getItem("influenco_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("influenco_history", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function generatePrompt(category: string) {
    if (activeTab === "influencer") {
      return `Explain the ${category} category in terms of influencer insights, audience behavior, content trends and niche performance.`;
    }
    return `Explain the ${category} category in terms of brand opportunities, campaign performance, audience targeting and market suitability.`;
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = {
      role: "user" as const,
      content: input,
      time: getTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setActiveCategory(null);
    setLoading(true);

    try {
      const response = await axios.post("/api/ai-generated-content", {
        message: userMsg.content,
        history: [...messages, userMsg]
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          time: getTime()
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Try again.",
          time: getTime()
        }
      ]);
    }

    setLoading(false);
  }

  const resetChat = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    setMessages([]);
    localStorage.setItem("influenco_history", "[]");
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <div
      className="min-h-screen fixed w-full flex flex-col items-center px-4 py-6"
      style={{
        background:
          "linear-gradient(135deg, #F8FBFF, #F3F5FF, #F8FFFE, #F9F9FF)"
      }}
    >
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-[#0A1A3F] mb-2">
              Start a new chat?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              This will remove your current conversation.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelReset}
                className="px-4 cursor-pointer py-2 rounded-lg border text-[#0A1A3F]"
              >
                Cancel
              </button>

              <button
                onClick={confirmReset}
                className="px-4 py-2 cursor-pointer rounded-lg bg-[#0ABBB7] text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl h-[85vh] bg-white/70 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-6 flex flex-col">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A1A3F]">Influenco — AI Chat</h2>

          <button
            onClick={resetChat}
            className="text-sm cursor-pointer text-[#0ABBB7] underline"
          >
            New Chat
          </button>
        </div>

        <div className="flex gap-3 border-b pb-3 mb-3">
          <button
            onClick={() => {
              setActiveTab("influencer");
              setActiveCategory(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              activeTab === "influencer"
                ? "bg-[#0ABBB7] cursor-not-allowed text-white"
                : "bg-white cursor-pointer border border-gray-200"
            }`}
          >
            Influencer
          </button>

          <button
            onClick={() => {
              setActiveTab("brand");
              setActiveCategory(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              activeTab === "brand"
                ? "bg-[#0ABBB7] cursor-not-allowed text-white"
                : "bg-white cursor-pointer border border-gray-200"
            }`}
          >
            Brand
          </button>
        </div>

        <div className="w-full overflow-x-auto pb-3">
          <div className="flex gap-3 min-w-max">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  const p = generatePrompt(cat);
                  setInput(p);
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition shadow-sm ${
                  activeCategory === cat
                    ? "bg-[#0ABBB7] cursor-not-allowed text-white shadow-md"
                    : "bg-white border cursor-pointer border-gray-200 hover:bg-[#0ABBB7] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 mt-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] shadow">
                <Bot size={34} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#0A1A3F]">
                How can Influenco assist you today?
              </h3>

              <p className="mt-2 text-sm text-[#0A1A3F]/70 max-w-sm">
                Select a category or type your query to begin. Influenco provides structured insights tailored for influencers and brands.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="w-10 h-10 rounded-full bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] shadow">
                  <Bot size={18} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0ABBB7] text-white flex items-center justify-center shadow">
                  <User size={18} />
                </div>
              )}

              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0ABBB7] text-white"
                    : "bg-white text-[#0A1A3F]"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>

                <div
                  className={`text-xs mt-2 ${
                    msg.role === "user" ? "text-teal-100" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8F7FA] text-[#0ABBB7] flex items-center justify-center shadow">
                <Bot size={18} />
              </div>

              <div className="bg-white px-4 py-3 rounded-xl shadow flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="mt-4 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setActiveCategory(null);

              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px"; 
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Write a message..."
            className="flex-1 bg-transparent outline-none text-[#0A1A3F] placeholder-gray-400 resize-none overflow-hidden"
            rows={2}
            style={{
              maxHeight: "80px" 
            }}
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="w-11 cursor-pointer h-11 bg-[#0ABBB7] hover:bg-[#089f9b] transition rounded-xl flex items-center justify-center text-white shadow disabled:opacity-50"
          >
            <SendHorizontal size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
