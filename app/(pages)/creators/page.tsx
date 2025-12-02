"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "@/src/components/Sidebar";
import {
  Users,
  Briefcase,
  Star,
  Flame,
  Target,
  TrendingUp,
  Camera,
} from "lucide-react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-14 h-14 border-4 border-[#0ABBB7] border-t-[#7A4CD9] rounded-full animate-spin" />
    </div>
  );
}

function GlowCard({ item, grad }: any) {
  return (
    <div className="relative group">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-b ${grad} blur-2xl`} />
      <div className="relative bg-white border border-[#E3EBEE] rounded-2xl p-6 shadow-sm group-hover:shadow-2xl transform transition-all duration-300 group-hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col items-center text-center gap-4">

        <div className="w-20 h-20 rounded-full overflow-hidden border shadow z-10">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="z-10 font-semibold text-lg">{item.name}</div>
        <div className="text-sm text-[#0A1A3F]/70">{item.category}</div>

        <div className="flex justify-center gap-3 text-xs mt-1">
          <div className="px-3 py-1 bg-[#E8F7FA] rounded-full text-[#0ABBB7]">
            {item.projects} projects
          </div>
          <div className="px-3 py-1 bg-[#F3E8FF] rounded-full text-[#7A4CD9]">
            {item.rating}★ rating
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
        </div>
      </div>
    </div>
  );
}

export default function CreatorsPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const g1 = "from-[#0ABBB7] to-[#7A4CD9]";
  const g2 = "from-[#7A4CD9] to-[#0ABBB7]";

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

  const influencerWorkedWithBrands = [
    {
      name: "MamaEarth",
      category: "Skincare",
      projects: 8,
      rating: 4.7,
      image: "/InfluencoLogo.png",
    },
    {
      name: "Boat",
      category: "Electronics",
      projects: 5,
      rating: 4.6,
      image: "/InfluencoLogo.png",
    },
    {
      name: "Zara",
      category: "Fashion",
      projects: 9,
      rating: 4.8,
      image: "/InfluencoLogo.png",
    },
    {
      name: "Samsung",
      category: "Tech",
      projects: 6,
      rating: 4.7,
      image: "/InfluencoLogo.png",
    },
  ];

  const brandWorkedWithInfluencers = [
    {
      name: "Rayyain",
      category: "Gaming Creator",
      projects: 14,
      rating: 4.9,
      image: "/founder.png",
    },
    {
      name: "Riya Mehra",
      category: "Fashion",
      projects: 11,
      rating: 4.8,
      image: "/InfluencoLogo.png",
    },
    {
      name: "Kabir Rana",
      category: "Designer",
      projects: 7,
      rating: 4.6,
      image: "/InfluencoLogo.png",
    },
    {
      name: "Anaya Kapoor",
      category: "Devloper",
      projects: 13,
      rating: 4.9,
      image: "/devloper.jpg",
    }
  ];

  const list = isInfluencer ? influencerWorkedWithBrands : brandWorkedWithInfluencers;

  return (
    <div className="flex min-h-screen bg-white text-[#0A1A3F] overflow-hidden">
      <Sidebar />

      <div className="flex-1 px-5 sm:px-10 py-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden border shadow">
                  <Image
                    src={user.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <Star size={20} className="text-[#7A4CD9]" />
                  </div>
                  <div className="mt-1 text-sm text-[#0A1A3F]/70">
                    {user.role} • {user.category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              {isInfluencer ? "Brands You've Worked With" : "Influencers You've Worked With"}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {list.map((item, i) => (
                <GlowCard key={i} item={item} grad={i % 2 === 0 ? g1 : g2} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Performance Stats</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <GlowCard
                item={{ name: "Total Projects", category: "Completed", projects: 0, rating: 0, image: "/InfluencoLogo.png" }}
                grad={g1}
              />
              <GlowCard
                item={{ name: "Avg Rating", category: "Overall", projects: 0, rating: 0, image: "/InfluencoLogo.png" }}
                grad={g2}
              />
              <GlowCard
                item={{ name: "Engagement", category: "Analytics", projects: 0, rating: 0, image: "/InfluencoLogo.png" }}
                grad={g1}
              />
              <GlowCard
                item={{ name: "Growth", category: "AI Score", projects: 0, rating: 0, image: "/InfluencoLogo.png" }}
                grad={g2}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
