"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "@/src/components/Sidebar";
import { Send, Search, ArrowLeft } from "lucide-react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-14 h-14 border-4 border-[#0ABBB7] border-t-[#7A4CD9] rounded-full animate-spin" />
    </div>
  );
}

export default function MessagesPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const allChats = [
    {
      name: "Raiyyan Gaming",
      image: "/founder.png",
      lastMessage: "Video edited. Check now.",
      time: "3:22 PM",
      messages: [
        { from: "them", text: "Bro thumbnail bana diya?" },
        { from: "me", text: "Haan bhai, sending." },
        { from: "them", text: "Video edited. Check now." }
      ],
    },
    {
      name: "Saif Developer",
      image: "/devloper.jpg",
      lastMessage: "Check now.",
      time: "12:03 PM",
      messages: [
        { from: "me", text: "API ready." },
        { from: "them", text: "Push the update today." },
        { from: "them", text: "Check now." }
      ],
    },
    {
      name: "Karan Sharma",
      image: "/InfluencoLogo.jpg",
      lastMessage: "Thanks, sending draft.",
      time: "Yesterday",
      messages: [
        { from: "them", text: "Draft ready?" },
        { from: "me", text: "Almost." },
        { from: "them", text: "Thanks, sending draft." }
      ],
    },
  ];

  const chats = allChats.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const active = activeChat !== null ? chats[activeChat] : null;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/auth/get-user");
        if (res.data?.success) setUser(res.data.user);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <Loader />;

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login.
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white text-[#0A1A3F] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex overflow-hidden">

        <div className={`w-72 md:flex hidden flex-col border-r bg-white overflow-y-auto`}>
          <div className="px-4 py-4 border-b">
            <div className="flex items-center bg-[#F7FAFB] px-3 py-2 rounded-full gap-2">
              <Search size={16} className="text-[#0A1A3F]/50" />
              <input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((c, i) => (
              <div
                key={i}
                onClick={() => setActiveChat(i)}
                className={`relative px-4 py-4 cursor-pointer transition group ${
                  activeChat === i ? "bg-[#F7FAFF]" : "hover:bg-[#F2FAFD]"
                }`}
              >
                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-b from-[#0ABBB7] to-[#7A4CD9] blur-xl" />
                <div className="relative flex items-center gap-3 z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border shadow">
                    <Image
                      src={c.image}
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-[#0A1A3F]/60 truncate">{c.lastMessage}</div>
                  </div>
                  <div className="text-[10px] text-[#0A1A3F]/50">{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex-1 flex flex-col bg-white ${activeChat !== null ? "block" : "hidden"} md:block`}>

          {active && (
            <div className="border-b px-6 py-4 flex items-center gap-3">
              <button
                onClick={() => setActiveChat(null)}
                className="md:hidden p-2 cursor-pointer rounded-lg bg-[#F7FAFB]"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="w-12 h-12 rounded-full overflow-hidden border shadow">
                <Image
                  src={active.image}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="font-semibold">{active.name}</div>
                <div className="text-xs text-[#0A1A3F]/60">Active now</div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 md:pb-75">
            {active &&
              active.messages.map((m, index) => (
                <div
                  key={index}
                  className={`flex ${
                    m.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs ${
                      m.from === "me"
                        ? "bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white"
                        : "bg-[#F1F5F9] text-[#0A1A3F]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
          </div>

          {active && (
            <div className="fixed bottom-0 left-0 right-0 md:static bg-white px-4 py-3 mb-15  border-t flex items-center gap-3 md:border-none">
                <div className="flex items-center bg-[#F7FAFB] border rounded-full px-4 py-3 flex-1">
                    <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full bg-transparent outline-none text-sm"
                    />
                </div>

                <button className="w-12 h-12 cursor-pointer flex items-center justify-center bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white rounded-full shadow hover:scale-105 transition">
                    <Send size={20} />
                </button>
                </div>
          )}

        </div>

        <div className="md:hidden w-full" hidden={activeChat !== null}>
          <div className="p-4 border-b">
            <div className="flex items-center bg-[#F7FAFB] px-3 py-2 rounded-full gap-2">
              <Search size={16} className="text-[#0A1A3F]/50" />
              <input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {chats.map((c, i) => (
              <div
                key={i}
                onClick={() => setActiveChat(i)}
                className="flex items-center gap-3 p-3 border rounded-xl hover:bg-[#F2FAFD] transition cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border shadow">
                  <Image
                    src={c.image}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-[#0A1A3F]/60 truncate">{c.lastMessage}</div>
                </div>
                <div className="text-[10px] text-[#0A1A3F]/50">{c.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
