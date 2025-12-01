"use client";
import Link from "next/link";
import {
  User,
  Search,
  FileCheck,
  Zap,
  Shield,
  MessageSquare,
  BarChart,
  CheckCircle,
  ArrowRight,
  Users,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white text-[#0A1A3F] antialiased mt-10 relative overflow-x-hidden">

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -left-40 -top-40 w-[460px] h-[460px] bg-[#0ABBB7]/15 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute -right-40 bottom-0 w-[560px] h-[560px] bg-[#7A4CD9]/15 blur-[160px] rounded-full animate-pulse" />
      </div>

      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          How Influenco{" "}
          <span className="bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] bg-clip-text text-transparent">
            Works
          </span>
        </h1>
        <p className="mt-4 text-[#0A1A3F]/70 max-w-2xl mx-auto text-lg">
          Influenco simplifies creator-brand partnerships using AI, trust scoring,
          automation and secure payments — here is the full workflow.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid gap-20">
        <StepBlock
          number="01"
          icon={<User size={26} className="text-[#0ABBB7]" />}
          title="Create Your Account"
          text="Sign up and connect social profiles. Influenco builds your trust score automatically."
          points={[
            "Sign up in under 60 seconds",
            "Connect Instagram / YouTube / TikTok",
            "Initial trust score evaluation",
          ]}
        />

        <StepBlock
          number="02"
          icon={<Search size={26} className="text-[#7A4CD9]" />}
          title="AI Finds Best Matches"
          text="AI analyzes your audience, engagement and niche to match you with verified creators or brands."
          points={[
            "Audience + niche matching",
            "Fraud + authenticity checks",
            "AI improves based on your activity",
          ]}
          reverse
        />

        <StepBlock
          number="03"
          icon={<FileCheck size={26} className="text-[#0ABBB7]" />}
          title="Smart Contract Automation"
          text="Influenco generates contracts with clear deliverables, deadlines and payouts."
          points={[
            "Auto-generated agreements",
            "Milestones + scope added instantly",
            "No manual negotiation stress",
          ]}
        />

        <StepBlock
          number="04"
          icon={<Zap size={26} className="text-[#7A4CD9]" />}
          title="Collaborate & Secure Payment"
          text="Creators deliver content. Brands approve it. Influenco releases escrow payments securely."
          points={[
            "Escrow-protected transactions",
            "Milestone tracking",
            "Analytics dashboard for both sides",
          ]}
          reverse
        />
      </section>

      <section className="bg-[#E8F7FA] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why It Works Better</h2>

          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <ReasonCard
              icon={<Shield size={32} />}
              title="Trust at the Core"
              text="Every creator and brand gets a dynamic trust score powered by AI authenticity checks."
            />

            <ReasonCard
              icon={<BarChart size={32} />}
              title="Data-Driven Decisions"
              text="Real-time stats, audience quality insights and KPI tracking for transparency."
            />

            <ReasonCard
              icon={<Users size={32} />}
              title="Smart Collaboration"
              text="AI shortlists the perfect partnerships — reducing guesswork and wasted budgets."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold">What Happens After Matching?</h2>
            <p className="mt-3 text-[#0A1A3F]/70">
              Influenco guides you from contract → content → payout with complete automation.
            </p>

            <div className="mt-6 space-y-5">
              <AfterPoint
                icon={<MessageSquare className="text-[#0ABBB7]" />}
                title="In-app Communication"
                text="Chat inside Influenco to finalize requirements."
              />

              <AfterPoint
                icon={<FileCheck className="text-[#7A4CD9]" />}
                title="Contract Overview"
                text="Both sides review auto-generated contracts and approve instantly."
              />

              <AfterPoint
                icon={<CheckCircle className="text-[#0ABBB7]" />}
                title="Milestone Tracking"
                text="Track deliverables, deadlines, uploads and approvals easily."
              />
            </div>
          </div>

          <div className="relative group rounded-3xl bg-[#E8F7FA] border shadow-lg p-10 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-gradient-to-br from-[#0ABBB7] to-[#7A4CD9] blur-2xl transition duration-500" />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <Shield size={80} className="text-[#0ABBB7]" />
              </div>
              <h3 className="font-semibold text-xl">Secure, Fast & Transparent</h3>
              <p className="mt-2 text-[#0A1A3F]/70">
                Influenco reduces friction, boosts trust, and ensures collaboration is smooth from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-white">
        <h2 className="text-3xl font-bold">Start Your Journey with Influenco</h2>
        <p className="mt-2 text-[#0A1A3F]/70 max-w-lg mx-auto">
          Create your account and let AI handle the complexity of creator-brand partnerships.
        </p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <Link
            href="/get-start"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0ABBB7] to-[#089f9c] text-white font-semibold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition"
          >
            Get Started
          </Link>

          <Link
            href="/influenco-ai"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#7A4CD9] to-[#5a2fcf] text-white font-semibold shadow-xl flex items-center gap-2 hover:-translate-y-1 hover:shadow-2xl transition"
          >
            Ask AI <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepBlock({ number, icon, title, text, points, reverse }: any) {
  const gradient = reverse
    ? "from-[#7A4CD9] to-[#0ABBB7]"
    : "from-[#0ABBB7] to-[#7A4CD9]";

  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
      <div className={`${reverse ? "md:order-2" : ""}`}>
        <div className="relative group w-fit mb-5">
          <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} blur-xl opacity-0 group-hover:opacity-50 transition`} />
          <div className="relative w-16 h-16 rounded-2xl bg-[#E8F7FA] flex items-center justify-center border shadow-sm group-hover:scale-110 transition">
            {icon}
          </div>
        </div>

        <div className="text-2xl font-bold">{number}. {title}</div>
        <p className="mt-3 text-[#0A1A3F]/70 max-w-md">{text}</p>

        <ul className="mt-4 space-y-2">
          {points.map((p: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-[#0ABBB7]" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${reverse ? "md:order-1" : ""} flex justify-center`}>
        <div className="relative w-72 h-72 group">
          <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${gradient} blur-[36px] opacity-0 group-hover:opacity-40 transition`} />
          <div className="relative w-full h-full rounded-3xl bg-[#E8F7FA] border shadow-lg flex items-center justify-center group-hover:-translate-y-2 transition">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasonCard({ icon, title, text }: any) {
  return (
    <div className="relative group p-6 bg-white border rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] blur-xl opacity-0 group-hover:opacity-50 transition rounded-2xl" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] mb-4 group-hover:scale-105 transition">
          {icon}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <p className="text-sm text-[#0A1A3F]/70 mt-2">{text}</p>
      </div>
    </div>
  );
}

function AfterPoint({ icon, title, text }: any) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="relative w-12 h-12">
        <div className="absolute -inset-1 bg-gradient-to-br from-[#0ABBB7] to-[#7A4CD9] blur-xl rounded-xl opacity-0 group-hover:opacity-50 transition" />
        <div className="relative w-full h-full rounded-xl bg-[#E8F7FA] flex items-center justify-center group-hover:scale-110 transition">
          {icon}
        </div>
      </div>

      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-[#0A1A3F]/70">{text}</div>
      </div>
    </div>
  );
}
