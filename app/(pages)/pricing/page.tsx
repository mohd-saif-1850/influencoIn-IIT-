"use client";
import Link from "next/link";
import { BadgeCheck, Star, Zap, Shield, Crown } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1A3F] antialiased mt-10">
      <section className="py-16 text-center">
        <h1 className="text-4xl font-extrabold">
          Influencer{" "}
          <span className="bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] bg-clip-text text-transparent">
            Budget Filters
          </span>
        </h1>

        <p className="mt-3 text-[#0A1A3F]/70 max-w-xl mx-auto text-lg">
          Choose influencer categories based on industry-standard budget ranges.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid gap-10 md:grid-cols-4">

        <PricingCard
          icon={<Star className="text-[#0ABBB7]" />}
          title="Nano Influencers"
          badge="₹500 – ₹3,000"
          features={[
            "Best for hyperlocal promotions",
            "High engagement rates",
            "Audience trust is strong",
            "Cost-effective for small brands",
            "Ideal for product seeding",
          ]}
          color="from-[#0ABBB7] to-[#7A4CD9]"
        />

        <PricingCard
          icon={<Zap className="text-[#7A4CD9]" />}
          title="Micro Influencers"
          badge="₹3,000 – ₹20,000"
          features={[
            "More consistent creator performance",
            "Highly targeted audience niches",
            "Better ROI for campaigns",
            "Good for paid collaborations",
            "Stronger conversion potential",
          ]}
          highlighted
          color="from-[#7A4CD9] to-[#0ABBB7]"
        />

        <PricingCard
          icon={<Shield className="text-[#0ABBB7]" />}
          title="Mid-tier Influencers"
          badge="₹20,000 – ₹1,00,000"
          features={[
            "Large and loyal audience base",
            "Strong brand recall",
            "Suitable for performance campaigns",
            "Professional content quality",
            "Ideal for brand storytelling",
          ]}
          color="from-[#0ABBB7] to-[#0A1A3F]"
        />

        <PricingCard
          icon={<Crown className="text-[#7A4CD9]" />}
          title="Macro Influencers"
          badge="₹1,00,000+"
          features={[
            "Massive audience reach",
            "High brand visibility",
            "Premium partnership category",
            "Best for nationwide campaigns",
            "Strong influence across platforms",
          ]}
          color="from-[#7A4CD9] to-[#0ABBB7]"
        />
      </section>
    </div>
  );
}

function PricingCard({ icon, title, badge, features, highlighted, color }: any) {
  return (
    <div
      className={`p-8 rounded-3xl border bg-white shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:border-[#0ABBB7] ${
        highlighted ? "border-[#7A4CD9] shadow-xl scale-[1.03]" : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8F7FA] flex items-center justify-center">
            {icon}
          </div>
          <div className="font-semibold">{title}</div>
        </div>

        <div className="text-xl font-bold">{badge}</div>

        <div className="mt-6 space-y-3">
          {features.map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <BadgeCheck size={16} className="text-[#0ABBB7]" />
              <span className="text-[#0A1A3F]/80">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled
        className={`mt-8 w-full text-center py-3 rounded-xl cursor-not-allowed opacity-70 font-semibold text-white bg-gradient-to-r ${color} shadow-lg`}
      >
        Coming Soon
      </button>
    </div>
  );
}
