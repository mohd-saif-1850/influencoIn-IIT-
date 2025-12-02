"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/src/components/Sidebar";
import Image from "next/image";
import { Sparkles } from "lucide-react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-14 h-14 border-4 border-[#0ABBB7] border-t-[#7A4CD9] rounded-full animate-spin" />
    </div>
  );
}

export default function AIMatchedPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  const label =
    user.role === "Brand"
      ? "AI-Matched Influencers"
      : user.role === "Influencer"
      ? "AI-Matched Brands"
      : "AI-Matched";

  return (
    <div className="flex min-h-screen bg-white text-[#0A1A3F] overflow-hidden">
      <Sidebar />

      <div className="flex-1 px-6 sm:px-12 py-14 flex items-center justify-center">
        <div className="text-center max-w-lg">

          <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0ABBB7] to-[#7A4CD9] flex items-center justify-center shadow-xl mb-6">
            <Sparkles size={42} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold">{label}</h1>

          <p className="mt-3 text-[#0A1A3F]/70 text-sm">
            AI-powered smart matching based on deep profile scanning, niche recognition, engagement score,
            budget compatibility and performance forecasting is being prepared for release.
          </p>

          <div className="relative group max-w-xs mx-auto mt-10">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#0ABBB7] to-[#7A4CD9] blur-2xl opacity-40" />
            <div className="relative bg-white border border-[#E3EBEE] shadow-sm rounded-2xl px-6 py-4 text-center">
              <div className="text-[#0A1A3F]/70 text-sm tracking-wide">Coming Soon</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
