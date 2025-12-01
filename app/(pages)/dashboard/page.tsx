"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Activity,
  Bell,
  ChartPie,
  LayoutDashboard,
  MessageSquare,
  User,
  Users,
  Clock,
  Search,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";

function formatCurrency(n: number) {
  return n >= 1000 ? "₹" + (n / 1000).toFixed(1) + "k" : "₹" + n;
}

function Sparkline({ data = [] as number[] }: { data?: number[] }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1 || 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points={points} stroke="url(#g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#0ABBB7" stopOpacity="1" />
          <stop offset="1" stopColor="#7A4CD9" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [query, setQuery] = useState("");
  const sampleAnalytics = useMemo(
    () => ({
      overview: [
        { label: "Reach", value: 1200000, delta: "+6.2%", spark: [10, 12, 14, 13, 15, 18, 20] },
        { label: "Engagement", value: 8.3, delta: "+0.8%", spark: [6, 7, 8, 9, 8, 8.3, 8.3] },
        { label: "Spend", value: 12500, delta: "-2.1%", spark: [2, 3, 4, 4.5, 4.2, 4.0, 3.9] },
        { label: "Trust Score", value: 98, delta: "+1", spark: [95, 96, 97, 97.5, 98, 98, 98] },
      ],
      campaigns: [
        { id: "CAMP-001", name: "Summer Drop", status: "Active", reach: 420000, engagement: "9.2%", budget: 4200, progress: 72 },
        { id: "CAMP-002", name: "Gadget Launch", status: "Review", reach: 210000, engagement: "6.5%", budget: 3200, progress: 54 },
        { id: "CAMP-003", name: "Skincare Collab", status: "Completed", reach: 570000, engagement: "8.9%", budget: 5200, progress: 100 },
      ],
      insights: [
        { title: "Top Creator", stat: "Anaya", metric: "9.8% engagement" },
        { title: "Best Format", stat: "Short Video", metric: "Higher CTR" },
        { title: "Fraud Alert", stat: "1 profile flagged", metric: "Review before payout" },
      ],
      activity: [
        { text: "Campaign Summer Drop reached 400k", time: "2h ago" },
        { text: "Escrow released for Skincare Collab", time: "1d ago" },
        { text: "New verification completed for @raj", time: "3d ago" },
      ],
    }),
    []
  );

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get("/api/auth/get-user");
        if (mounted && res.data?.success) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      }
      setLoadingUser(false);
    };
    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadAnalytics = async () => {
      setLoadingAnalytics(true);
      try {
        const res = await axios.get("/api/analytics/overview");
        if (mounted && res.data?.success) {
          setAnalytics(res.data);
        } else if (mounted) {
          setAnalytics(sampleAnalytics);
        }
      } catch {
        if (mounted) setAnalytics(sampleAnalytics);
      }
      setLoadingAnalytics(false);
    };
    loadAnalytics();
    return () => {
      mounted = false;
    };
  }, [sampleAnalytics]);

  const filteredCampaigns = (analytics?.campaigns || sampleAnalytics.campaigns).filter((c: any) =>
    c.name.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#0A1A3F]">
      <div className="flex h-screen">
        <aside className="w-72 bg-white border-r hidden md:flex flex-col px-4 py-6 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/InfluencoLogo.png"
                alt="Influenco Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-semibold">INFLUENCO</div>
              <div className="text-xs text-[#0A1A3F]/60">AI • Trust • Collab</div>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              <li className="px-3 py-2 rounded-lg hover:bg-[#0ABBB7]/6 cursor-pointer transition">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <LayoutDashboard size={18} />
                  Dashboard
                </div>
              </li>
              <li className="px-3 py-2 rounded-lg hover:bg-[#0ABBB7]/6 cursor-pointer transition">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <ChartPie size={18} />
                  Analytics
                </div>
              </li>
              <li className="px-3 py-2 rounded-lg hover:bg-[#0ABBB7]/6 cursor-pointer transition">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Users size={18} />
                  Creators
                </div>
              </li>
              <li className="px-3 py-2 rounded-lg hover:bg-[#0ABBB7]/6 cursor-pointer transition">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <MessageSquare size={18} />
                  Messages
                </div>
              </li>
            </ul>
          </nav>

          <div className="mb-20">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#7A4CD9]/6 cursor-pointer transition">
              <Settings size={16} />
              Settings
            </div>
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#FFEBEE]/6 cursor-pointer text-red-600">
              <LogOut size={16} />
              Logout
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 bg-[#F7FAFB] border rounded-full px-3 py-2">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search campaigns or ids..."
                  className="bg-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-[#0A1A3F]/70">Welcome,</div>
                <div className="font-semibold">{loadingUser ? "Loading..." : user?.name || session?.user?.name || "Creator"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-[#0ABBB7]/6 transition">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-[#7A4CD9] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="hidden md:flex items-center gap-2 bg-white border rounded-full px-3 py-2">
                <img src={user?.profilePic || "/default-avatar.png"} alt="me" className="w-8 h-8 rounded-full object-cover" />
                <div className="text-sm">{user?.name || session?.user?.name || "You"}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(analytics?.overview || sampleAnalytics.overview).map((o: any, i: number) => (
                <div key={i} className="relative bg-white border rounded-2xl p-5 hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-[#0A1A3F]/60">{o.label}</div>
                      <div className="mt-2 text-2xl font-bold">
                        {o.label === "Engagement" ? `${o.value}%` : o.label === "Trust Score" ? `${o.value}` : formatCurrency(o.value)}
                      </div>
                      <div className={`mt-1 text-sm ${o.delta && o.delta.toString().startsWith("-") ? "text-red-500" : "text-[#0ABBB7]"}`}>{o.delta}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Sparkline data={o.spark} />
                      <div className="mt-2 text-xs text-[#0A1A3F]/50">{o.label === "Spend" ? "Last 7 days" : "7d trend"}</div>
                    </div>
                  </div>
                  <div className="absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Trust Score</div>
                  <div className="text-sm text-[#0A1A3F]/60">Live</div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0ABBB7] to-[#7A4CD9] flex items-center justify-center text-white text-xl font-bold">
                    {analytics?.overview?.[3]?.value ?? sampleAnalytics.overview[3].value}
                  </div>
                  <div>
                    <div className="font-semibold">Overall trust</div>
                    <div className="text-sm text-[#0A1A3F]/70 mt-1">Verified creators & fraud protection</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
                <div className="text-sm font-semibold">Quick Actions</div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button className="px-3 py-2 bg-[#0ABBB7] text-white rounded-lg text-sm hover:brightness-95 transition">New Campaign</button>
                  <button className="px-3 py-2 bg-[#7A4CD9] text-white rounded-lg text-sm hover:brightness-95 transition">Find Creators</button>
                  <button className="px-3 py-2 bg-white border rounded-lg text-sm hover:shadow">Upload Brief</button>
                  <button className="px-3 py-2 bg-white border rounded-lg text-sm hover:shadow">Escrow</button>
                </div>
              </div>
            </aside>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Campaigns</div>
                <div className="text-sm text-[#0A1A3F]/60">{(analytics?.campaigns || sampleAnalytics.campaigns).length} active</div>
              </div>

              <div className="mt-4 space-y-3">
                {filteredCampaigns.map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-[#F8FAFB] transition cursor-pointer border">
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-[#0A1A3F]/60">{c.id} • {c.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{formatCurrency(c.reach)}</div>
                      <div className="text-xs text-[#0A1A3F]/60 mt-1">{c.engagement} • {formatCurrency(c.budget)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Insights</div>
                <div className="text-sm text-[#0A1A3F]/60">AI suggestions</div>
              </div>

              <div className="mt-4 space-y-3">
                {(analytics?.insights || sampleAnalytics.insights).map((ins: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg hover:bg-[#F8FAFB] transition cursor-pointer border flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7]">
                      <Activity size={18} />
                    </div>
                    <div>
                      <div className="font-semibold">{ins.title}</div>
                      <div className="text-sm text-[#0A1A3F]/60 mt-1">{ins.stat} • {ins.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
              <div className="font-semibold">Recent Activity</div>
              <div className="mt-3 space-y-3">
                {(analytics?.activity || sampleAnalytics.activity).map((a: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F7FA] flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-[#0A1A3F]/60 mt-1">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
              <div className="font-semibold">Messages</div>
              <div className="mt-3 text-sm text-[#0A1A3F]/60">You have 4 unread messages. Open the inbox to reply.</div>
              <div className="mt-4">
                <button className="px-3 py-2 bg-[#0ABBB7] text-white rounded-lg">Open Inbox</button>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 hover:shadow-xl transition">
              <div className="font-semibold">Account</div>
              <div className="mt-3">
                <div className="text-sm">Name</div>
                <div className="font-medium">{user?.name || session?.user?.name || "—"}</div>
                <div className="text-sm mt-3">Email</div>
                <div className="font-medium">{user?.email || session?.user?.email || "—"}</div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-[#0A1A3F]/60 mt-8">Built with care · © {new Date().getFullYear()} Influenco</div>
        </main>
      </div>
    </div>
  );
}
