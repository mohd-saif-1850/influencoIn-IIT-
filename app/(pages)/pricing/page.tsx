"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Zap, Star, BadgeCheck, Shield } from "lucide-react";

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const starterPrice = yearly ? "₹499/mo" : "₹699/mo";
  const growthPrice = yearly ? "₹999/mo" : "₹1299/mo";
  const enterprisePrice = yearly ? "₹2499/mo" : "₹2999/mo";

  return (
    <div className="min-h-screen bg-white text-[#0A1A3F] antialiased mt-10">
      <section className="py-16 text-center">
        <h1 className="text-4xl font-extrabold">
          Simple, Transparent{" "}
          <span className="bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>
        <p className="mt-3 text-[#0A1A3F]/70 max-w-xl mx-auto text-lg">
          Plans built to support creators, brands and fast-growing teams. No hidden fees.
        </p>

        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-3 bg-[#E8F7FA] px-4 py-2 rounded-xl border shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 cursor-pointer rounded-md text-sm transition-all ${
                !yearly
                  ? "bg-[#0ABBB7] text-white shadow-md"
                  : "text-[#0A1A3F] hover:text-[#0ABBB7]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-md cursor-pointer text-sm transition-all ${
                yearly
                  ? "bg-[#7A4CD9] text-white shadow-md"
                  : "text-[#0A1A3F] hover:text-[#7A4CD9]"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid gap-10 md:grid-cols-3">
        <PricingCard
          icon={<Star className="text-[#0ABBB7]" />}
          title="Starter"
          price={starterPrice}
          badge="For beginners"
          features={[
            "AI creator matching",
            "Basic trust score",
            "Up to 3 campaigns",
            "Email support",
          ]}
          color="from-[#0ABBB7] to-[#7A4CD9]"
          loggedIn={loggedIn}
        />

        <PricingCard
          icon={<Zap className="text-[#7A4CD9]" />}
          title="Growth"
          price={growthPrice}
          badge="Most popular"
          features={[
            "Advanced AI matching",
            "Detailed analytics",
            "Smart contracts",
            "Escrow payments",
            "Up to 10 campaigns",
            "Priority support",
          ]}
          highlighted
          color="from-[#7A4CD9] to-[#0ABBB7]"
          loggedIn={loggedIn}
        />

        <PricingCard
          icon={<Shield className="text-[#0ABBB7]" />}
          title="Enterprise"
          price={enterprisePrice}
          badge="For teams"
          features={[
            "Full analytics suite",
            "Unlimited campaigns",
            "Dedicated manager",
            "Custom integrations",
            "API access",
            "24/7 support",
          ]}
          color="from-[#0ABBB7] to-[#0A1A3F]"
          loggedIn={loggedIn}
        />
      </section>
    </div>
  );
}

function PricingCard({ icon, title, price, badge, features, highlighted, color, loggedIn }: any) {
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

        <div className="text-3xl font-bold">{price}</div>
        <div className="text-sm text-[#0A1A3F]/60 mt-1">{badge}</div>

        <div className="mt-6 space-y-3">
          {features.map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <BadgeCheck size={16} className="text-[#0ABBB7]" />
              <span className="text-[#0A1A3F]/80">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
          href="#"
          className={`mt-8 w-full text-center py-3 rounded-xl cursor-not-allowed font-semibold text-white bg-gradient-to-r ${color} shadow-lg transition-all hover:shadow-xl`}
        >
          Get Started
        </Link>
    </div>
  );
}
