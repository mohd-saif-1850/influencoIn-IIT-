"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, ChartPie, Users, MessageSquare, Brain, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [user, setUser] = useState<any | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/auth/get-user");
        if (res.data?.success) setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    load();
  }, []);

  const aiMatchedLabel =
    user?.role === "Brand"
      ? "AI-Matched Influencers"
      : user?.role === "Influencer"
      ? "AI-Matched Brands"
      : "AI-Matched";

  const items = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Analytics", icon: ChartPie, href: "/analytics" },
    { label: "Creators", icon: Users, href: "/creators" },
    { label: "Messages", icon: MessageSquare, href: "/messages" },
    { label: aiMatchedLabel, icon: Brain, href: "/ai-matched" }
  ];

  return (
    <>
      <aside className="hidden md:flex w-72 bg-white border-r flex-col px-4 py-6 gap-6 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/InfluencoLogo.png" alt="Influenco Logo" width={40} height={40} className="object-contain" />
          </div>
          <div>
            <div className="text-sm font-semibold">INFLUENCO</div>
            <div className="text-xs text-[#0A1A3F]/60">AI • Trust • Collab</div>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1 text-sm font-medium text-[#0A1A3F]">
            {items.map((item, i) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link key={i} href={item.href}>
                  <li
                    className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition
                      ${active ? "bg-gradient-to-r from-[#0ABBB7]/15 to-[#7A4CD9]/15 text-[#7A4CD9] font-semibold" : "hover:bg-[#0ABBB7]/6"}`}
                  >
                    <Icon size={18} className={active ? "text-[#7A4CD9]" : ""} />
                    <span>{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </aside>

      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50 select-none">
        {items.map((item, i) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link key={i} href={item.href}>
              <button
                className={`p-2 rounded-full transition ${
                  active ? "bg-gradient-to-r cursor-not-allowed from-[#0ABBB7] to-[#7A4CD9] text-white scale-110" : "hover:bg-gray-100 cursor-pointer"
                }`}
              >
                <Icon size={22} />
              </button>
            </Link>
          );
        })}
      </aside>
    </>
  );
}
