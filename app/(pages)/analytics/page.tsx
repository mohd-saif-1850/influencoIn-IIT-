"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "@/src/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  Users,
  Eye,
  BarChart3,
  Star,
  Heart,
  Activity,
  Target,
  ArrowUpRight,
  MessageSquare,
  Cpu
} from "lucide-react";
import Link from "next/link";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-14 h-14 border-4 border-[#0ABBB7] border-t-[#7A4CD9] rounded-full animate-spin" />
    </div>
  );
}

function GlowCard({ icon, title, value, grad }: any) {
  return (
    <div className="relative group p-6 bg-white border border-[#E3EBEE] rounded-2xl shadow-sm cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex items-start gap-4">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-b ${grad} blur-2xl`} />
      <div className="w-12 h-12 rounded-lg bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] z-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="z-10">
        <div className="text-sm text-[#0A1A3F]/70">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`h-1 w-10 mt-3 rounded-full bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const g1 = "from-[#0ABBB7] to-[#7A4CD9]";
  const g2 = "from-[#7A4CD9] to-[#0ABBB7]";

  const growthData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1600 },
    { month: "Mar", value: 2100 },
    { month: "Apr", value: 2600 },
    { month: "May", value: 3100 },
    { month: "Jun", value: 3800 }
  ];

  const audienceData = [
    { name: "India", value: 55 },
    { name: "USA", value: 20 },
    { name: "UK", value: 10 },
    { name: "Dubai", value: 8 },
    { name: "Other", value: 7 }
  ];

  const COLORS = ["#0ABBB7", "#7A4CD9", "#4DD0E1", "#9575CD", "#80CBC4"];

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

      <div className="flex-1 px-5 sm:px-10 py-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-14">

          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow">
                  <Image
                    src={user.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <Star size={22} className="text-[#7A4CD9]" />
                  </div>
                  <div className="text-sm text-[#0A1A3F]/70 mt-1">{user.role} • {user.category}</div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Users size={18} className="text-[#0ABBB7]" />
                    Analytics Active
                  </div>
                </div>
              </div>

              <Link href={"/pricing"} className="px-6 py-3 bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white rounded-xl font-semibold shadow cursor-pointer hover:scale-105 transition flex items-center gap-2">
                <ArrowUpRight size={18} />
                Boost Performance
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlowCard icon={<TrendingUp size={24} />} title="Total Growth" value="+28%" grad={g1} />
            <GlowCard icon={<Eye size={24} />} title="Profile Views" value="42,310" grad={g2} />
            <GlowCard icon={<Heart size={24} />} title="Engagement Rate" value="8.4%" grad={g1} />
            <GlowCard icon={<Target size={24} />} title="Projected Performance" value="+16%" grad={g2} />
          </div>

          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <div className="text-xl font-bold mb-6">Growth Timeline</div>
            <div className="w-full h-80">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#7A4CD9" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="bg-white border rounded-3xl p-8 shadow-sm">
              <div className="text-xl font-bold mb-6">Audience Distribution</div>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={audienceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      innerRadius={50}
                      paddingAngle={4}
                    >
                      {audienceData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-2 bg-white border rounded-3xl p-8 shadow-sm">
              <div className="text-xl font-bold mb-6">Engagement Breakdown</div>
              <div className="grid sm:grid-cols-2 gap-8">

                <div className="relative group p-6 bg-white border border-[#E3EBEE] rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="text-[#0ABBB7]"><Heart size={26} /></div>
                  <div className="text-xl font-semibold mt-4">Likes</div>
                  <div className="text-3xl font-bold mt-1">18,240</div>
                </div>

                <div className="relative group p-6 bg-white border border-[#E3EBEE] rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="text-[#7A4CD9]"><MessageSquare size={26} /></div>
                  <div className="text-xl font-semibold mt-4">Comments</div>
                  <div className="text-3xl font-bold mt-1">4,390</div>
                </div>

                <div className="relative group p-6 bg-white border border-[#E3EBEE] rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="text-[#0ABBB7]"><Activity size={26} /></div>
                  <div className="text-xl font-semibold mt-4">Shares</div>
                  <div className="text-3xl font-bold mt-1">1,230</div>
                </div>

                <div className="relative group p-6 bg-white border border-[#E3EBEE] rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="text-[#7A4CD9]"><BarChart3 size={26} /></div>
                  <div className="text-xl font-semibold mt-4">Saves</div>
                  <div className="text-3xl font-bold mt-1">7,420</div>
                </div>

              </div>
            </div>
          </div>

          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <div className="text-xl font-bold mb-6">Advanced Insights</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <GlowCard icon={<Cpu size={26} />} title="AI Prediction" value="92% Accuracy" grad={g1} />
              <GlowCard icon={<Activity size={26} />} title="Peak Hours" value="6PM–8PM" grad={g2} />
              <GlowCard icon={<Users size={26} />} title="Audience Quality" value="High" grad={g1} />
              <GlowCard icon={<Heart size={26} />} title="Sentiment" value="Positive" grad={g2} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
