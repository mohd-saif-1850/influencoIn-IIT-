"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  UserPlus,
  CheckCircle,
  Shield,
  Bot,
  Zap,
  FileCheck,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function GetStarted() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen mt-10 bg-white text-[#0A1A3F] antialiased">
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Get Started with{" "}
          <span className="bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] bg-clip-text text-transparent">
            Influenco
          </span>
        </h1>
        <p className="mt-4 text-[#0A1A3F]/70 max-w-2xl mx-auto text-lg">
          Your journey to trusted collaborations begins here. Simple onboarding,
          powerful AI support, secure payouts.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {!loggedIn ? (
            <Link
              href="/signup"
              className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#0ABBB7] text-white transition-all hover:bg-[#089f9c] hover:shadow-xl hover:shadow-[#0ABBB7]/30"
            >
              Create Account <ArrowRight size={18} />
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#0ABBB7] text-white transition-all hover:bg-[#089f9c] hover:shadow-xl hover:shadow-[#0ABBB7]/30"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          )}

          <Link
            href="/influenco-ai"
            className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#7A4CD9] text-white transition-all hover:bg-[#6938c7] hover:shadow-xl hover:shadow-[#7A4CD9]/30"
          >
            Ask AI <Bot size={18} />
          </Link>
        </div>

        <div className="mt-10 text-sm bg-white px-4 py-2 rounded-full border inline-flex items-center gap-2 shadow-sm">
          <div className="w-2 h-2 bg-[#7A4CD9] rounded-full" />
          Trusted by 10,000+ creators & brands
        </div>
      </section>

      <section className="py-16 bg-[#E8F7FA]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why Join Influenco?</h2>
          <p className="mt-2 text-[#0A1A3F]/70 max-w-xl mx-auto">
            AI-powered matching, secure contracts, trust scores and verified
            partners in one platform.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Bot />}
              title="AI Matching"
              text="Find perfect partners based on niche, audience, engagement and performance."
            />
            <FeatureCard
              icon={<Shield />}
              title="Trust Score"
              text="Fraud detection, audience quality and authenticity checks."
            />
            <FeatureCard
              icon={<FileCheck />}
              title="Smart Contracts"
              text="Auto-generated agreements with milestones and safe delivery terms."
            />
            <FeatureCard
              icon={<Zap />}
              title="Escrow Payments"
              text="Secure money flow. Payouts released after deliverables are verified."
            />
            <FeatureCard
              icon={<Users />}
              title="Verified Network"
              text="Quality influencers and trusted brands actively collaborating."
            />
            <FeatureCard
              icon={<CheckCircle />}
              title="One-Click Approvals"
              text="Fast onboarding and seamless deal workflow."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Three Steps to Begin</h2>
          <p className="mt-2 text-[#0A1A3F]/70 text-center max-w-xl mx-auto">
            Smooth onboarding designed for both creators and brands.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <StepBox
              number="01"
              icon={<UserPlus className="text-[#0ABBB7]" />}
              title="Create your account"
              text="Choose creator or brand profile and enter basic details."
            />
            <StepBox
              number="02"
              icon={<Users className="text-[#7A4CD9]" />}
              title="Complete profile"
              text="Add social links, audience info or collaboration requirements."
            />
            <StepBox
              number="03"
              icon={<Bot className="text-[#0ABBB7]" />}
              title="Get AI matches"
              text="Influenco instantly recommends verified partners with high ROI."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E8F7FA]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">What You Unlock</h2>

          <div className="mt-12 grid sm:grid-cols-2 gap-8">
            <UnlockCard
              title="Full Dashboard Access"
              text="Analytics, matches, contracts, payouts— everything in one place."
            />
            <UnlockCard
              title="Influenco AI Assistant"
              text="Content ideas, contract guidance, brand suggestions and more."
            />
            <UnlockCard
              title="Safety & Verification"
              text="Trust score, audience breakdown and fraud indicators."
            />
            <UnlockCard
              title="Growth Tools"
              text="Performance insights, campaign tracking and collaboration metrics."
            />
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to Start?</h2>
        <p className="mt-2 text-[#0A1A3F]/70 max-w-xl mx-auto">
          Take the first step in transforming your collaborations.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {!session ? (
            <Link
              href="/signup"
              className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#0ABBB7] text-white transition-all hover:bg-[#089f9c] hover:shadow-xl hover:shadow-[#0ABBB7]/30"
            >
              Create Account <ArrowRight size={18} />
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#0ABBB7] text-white transition-all hover:bg-[#089f9c] hover:shadow-xl hover:shadow-[#0ABBB7]/30"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          )}

          <Link
            href="/influenco-ai"
            className="px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-[#7A4CD9] text-white transition-all hover:bg-[#6938c7] hover:shadow-xl hover:shadow-[#7A4CD9]/30"
          >
            Ask AI <Bot size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text }: any) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] mb-4">
        {icon}
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <p className="mt-2 text-sm text-[#0A1A3F]/70">{text}</p>
    </div>
  );
}

function StepBox({ number, icon, title, text }: any) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-8 text-center transition-all hover:scale-[1.03] hover:shadow-xl cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-[#E8F7FA] flex items-center justify-center mx-auto text-[#0ABBB7]">
        {icon}
      </div>
      <div className="mt-5 text-2xl font-bold">{number}</div>
      <div className="mt-2 font-semibold">{title}</div>
      <p className="mt-2 text-sm text-[#0A1A3F]/70">{text}</p>
    </div>
  );
}

function UnlockCard({ title, text }: any) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg cursor-pointer">
      <div className="font-semibold text-lg">{title}</div>
      <p className="mt-2 text-sm text-[#0A1A3F]/70">{text}</p>
    </div>
  );
}
