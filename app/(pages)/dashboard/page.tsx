"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  TrendingUp,
  Flame,
  Globe,
  Crown,
  Handshake,
  Briefcase,
  Target,
  Camera,
  Video,
  BarChart3,
  Users,
  Wallet,
  Rocket,
  Sparkles,
  Star,
  Activity,
  Layers,
  MessageSquare,
  Shield,
  Bell,
  HeartHandshake,
  Cpu,
  Puzzle,
  Link
} from "lucide-react";
import Sidebar from "@/src/components/Sidebar";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-14 h-14 border-4 border-[#0ABBB7] border-t-[#7A4CD9] rounded-full animate-spin" />
    </div>
  );
}

function GlowCard({ icon, title, text, grad }: any) {
  return (
    <div className="relative group">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-300 bg-gradient-to-b ${grad} blur-2xl`} />
      <div className="relative bg-white border border-[#E3EBEE] rounded-2xl p-6 shadow-sm flex gap-4 items-start group-hover:shadow-2xl transform transition-all duration-300 group-hover:-translate-y-2 cursor-pointer overflow-hidden">
        <div className="w-12 h-12 rounded-lg bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] z-10 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <div className="z-10">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-[#0A1A3F]/70 mt-1">{text}</div>
          <div className="mt-4">
            <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorCard({ name, niche, reach, url, grad }: any) {
  return (
    <div className="relative group">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-b ${grad} blur-2xl`} />
      <div className="relative bg-white border border-[#E3EBEE] rounded-2xl p-5 shadow-sm group-hover:shadow-2xl transform transition-all duration-300 group-hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border shadow z-10">
          <Image src={url} width={80} height={80} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="z-10 font-semibold text-lg">{name}</div>
        <div className="z-10 text-sm text-[#0A1A3F]/70">{niche}</div>
        <div className="z-10 text-xs bg-[#E8F7FA] px-3 py-1 rounded-full text-[#0ABBB7]">{reach} reach</div>
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const g1 = "from-[#0ABBB7] to-[#7A4CD9]";
  const g2 = "from-[#7A4CD9] to-[#0ABBB7]";

  const creators = [
    { name: "Raiyyan", niche: "Gaming", reach: "120k", url: "/founder.png" },
    { name: "Riya", niche: "Lifestyle", reach: "95k", url: "/InfluencoLogo.png" },
    { name: "Karan", niche: "Devloper", reach: "140k", url: "/InfluencoLogo.png" },
    { name: "Sara", niche: "Developer", reach: "80k", url: "/InfluencoLogo.png" },
    { name: "Kabir", niche: "Fashion", reach: "110k", url: "/InfluencoLogo.png" },
    { name: "Saif", niche: "Gaming", reach: "150k", url: "/devloper.jpg" }
  ];

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

  const isInfluencer = user.role === "Influencer";
  const isBrand = user.role === "Brand";

  return (
    <div className="flex min-h-screen bg-white text-[#0A1A3F] overflow-hidden">
      <Sidebar />

      <div className="flex-1 px-5 sm:px-10 py-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-14">

          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
                  <Image src={user.profilePic || "/default-avatar.png"} width={100} height={100} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <Star size={22} className="text-[#7A4CD9]" />
                  </div>
                  <div className="text-sm text-[#0A1A3F]/70 mt-1">{user.role} • {user.category}</div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Users size={18} className="text-[#0ABBB7]" />
                    Insights Enabled
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlowCard icon={<TrendingUp size={26} />} title="Growth" text="Weekly improvement" grad={g1} />
            <GlowCard icon={<Flame size={26} />} title="Engagement" text="Audience interaction" grad={g2} />
            <GlowCard icon={<Globe size={26} />} title="Reach" text="Total visibility" grad={g1} />
            <GlowCard icon={<Crown size={26} />} title="Influence" text="Authority score" grad={g2} />
          </div>

          {isBrand && (
            <div className="space-y-14">
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended Creators</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {creators.map((c, i) => (
                    <CreatorCard
                      key={i}
                      name={c.name}
                      niche={c.niche}
                      reach={c.reach}
                      url={c.url}
                      grad={i % 2 === 0 ? g1 : g2}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Campaign Performance</h2>
                <div className="grid sm:grid-cols-3 gap-8">
                  <GlowCard icon={<Wallet size={26} />} title="Budget Used" text="₹42,000 spent" grad={g1} />
                  <GlowCard icon={<Flame size={26} />} title="Total Reach" text="570k+ audience" grad={g2} />
                  <GlowCard icon={<Rocket size={26} />} title="Projected CTR" text="4.8% forecast" grad={g1} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">AI Business Tools</h2>
                <div className="grid sm:grid-cols-3 gap-8">
                  <GlowCard icon={<Sparkles size={26} />} title="Campaign Builder" text="Auto-generate campaign briefs" grad={g1} />
                  <GlowCard icon={<Shield size={26} />} title="Fraud Shield" text="Authenticity verification" grad={g2} />
                  <GlowCard icon={<Cpu size={26} />} title="AI Scoring" text="Performance prediction" grad={g1} />
                </div>
              </div>
            </div>
          )}

          {isInfluencer && (
            <div className="space-y-14">
              <div>
                <h2 className="text-2xl font-bold mb-6">Brand Opportunities</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <GlowCard icon={<Briefcase size={26} />} title="Tech Brand Launch" text="Looking for creators" grad={g1} />
                  <GlowCard icon={<Target size={26} />} title="Lifestyle Ad Shoot" text="High engagement needed" grad={g2} />
                  <GlowCard icon={<Crown size={26} />} title="Premium Collab" text="Exclusive shortlists" grad={g1} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Insights</h2>
                <div className="grid sm:grid-cols-3 gap-8">
                  <GlowCard icon={<Camera size={26} />} title="Posting Time" text="6PM – 8PM" grad={g1} />
                  <GlowCard icon={<Video size={26} />} title="Trending Format" text="Short reels" grad={g2} />
                  <GlowCard icon={<BarChart3 size={26} />} title="Engagement Boost" text="+14% potential" grad={g1} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">AI Creator Tools</h2>
                <div className="grid sm:grid-cols-3 gap-8">
                  <GlowCard icon={<Sparkles size={26} />} title="Caption Generator" text="Optimized captions" grad={g1} />
                  <GlowCard icon={<Layers size={26} />} title="Content Planner" text="Schedule your week" grad={g2} />
                  <GlowCard icon={<Puzzle size={26} />} title="Niche Finder" text="Strengthen your niche" grad={g1} />
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlowCard icon={<Activity size={26} />} title="Campaign Updated" text="Performance recalculated" grad={g1} />
              <GlowCard icon={<MessageSquare size={26} />} title="New Message" text="Creator replied to brief" grad={g2} />
              <GlowCard icon={<Bell size={26} />} title="Insight Added" text="AI found new trends" grad={g1} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Workflow Automations</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <GlowCard icon={<Puzzle size={26} />} title="Smart Matching" text="Creator-brand pairing" grad={g1} />
              <GlowCard icon={<Shield size={26} />} title="Fraud Detection" text="AI checks profiles" grad={g2} />
              <GlowCard icon={<HeartHandshake size={26} />} title="Contract Manager" text="Instant agreements" grad={g1} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
