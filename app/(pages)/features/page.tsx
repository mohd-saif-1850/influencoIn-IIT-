"use client";
import Link from "next/link";
import {
  Bot,
  Shield,
  Zap,
  FileCheck,
  BarChart3,
  Users,
  Search,
  BadgeCheck,
  Layers,
  Workflow,
  Globe,
  TrendingUp,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    { icon: <Bot size={28} />, title: "AI Smart Matching", text: "Find perfect creator or brand matches using niche, audience and engagement signals." },
    { icon: <MessageSquare size={28} />, title: "AI Chat Assist", text: "Real-time help with ideas, briefs, budgets and collaboration guidance." },
    { icon: <Search size={28} />, title: "Advanced Search & Filters", text: "Discover creators using deep category, geo and performance filters." },
    { icon: <Workflow size={28} />, title: "Workflow & Approvals", text: "Manage deliverables, approvals and content stages in one place." },
    { icon: <BarChart3 size={28} />, title: "Analytics & ROI Tracking", text: "Track KPIs, conversions, audience quality and true ROI impact." },
    { icon: <Shield size={28} />, title: "Secure Escrow Payment", text: "Funds held safely until deliverables are verified & approved." },
    { icon: <BadgeCheck size={28} />, title: "Trust Score Verification", text: "AI-driven authenticity checks on creators' audience and engagement." },
    { icon: <TrendingUp size={28} />, title: "Growth Insights", text: "Smart predictions on performance trends and campaign outcomes." },
    { icon: <Users size={28} />, title: "Team Collaboration", text: "Invite teammates, share notes and manage campaigns together." },
    { icon: <Zap size={28} />, title: "Smart Contract Automation", text: "Auto-generated agreements based on deliverables and milestones." },
    { icon: <FileCheck size={28} />, title: "Deliverable Checker", text: "Track deadlines, uploads and approval stages in one place." },
    { icon: <Globe size={28} />, title: "Global Compliance", text: "International payment and contract compliance built in." },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A1A3F] antialiased mt-10">
      <section className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Explore Influenco{" "}
          <span className="bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] bg-clip-text text-transparent">
            Features
          </span>
        </h1>
        <p className="mt-4 text-[#0A1A3F]/70 max-w-2xl mx-auto text-lg">
          Smart tools to help creators and brands collaborate faster, safer and more intelligently — powered by AI and trust verification.
        </p>

        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <Link href="#ai" className="px-6 py-2 rounded-lg border text-sm bg-[#E8F7FA] hover:bg-[#d9f0f3] transition">
            AI Features
          </Link>
          <Link href="#trust" className="px-6 py-2 rounded-lg border text-sm bg-[#E8F7FA] hover:bg-[#d9f0f3] transition">
            Trust & Safety
          </Link>
          <Link href="#workflow" className="px-6 py-2 rounded-lg border text-sm bg-[#E8F7FA] hover:bg-[#d9f0f3] transition">
            Workflow Tools
          </Link>
          <Link href="#analytics" className="px-6 py-2 rounded-lg border text-sm bg-[#E8F7FA] hover:bg-[#d9f0f3] transition">
            Analytics
          </Link>
        </div>
      </section>

      <section id="ai" className="py-12 bg-[#E8F7FA]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">AI Features</h2>
          <p className="text-[#0A1A3F]/70 text-center mt-2">AI helps you match, plan and grow with accuracy.</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.slice(0, 6).map((f, i) => (
              <FeatureCard key={i} index={i} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Trust & Safety</h2>
          <p className="text-[#0A1A3F]/70 text-center mt-2">Verified profiles, fraud checks and secure payments.</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.slice(5, 11).map((f, i) => (
              <FeatureCard key={i + 6} index={i + 6} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-12 bg-[#E8F7FA]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Workflow Tools</h2>
          <p className="text-[#0A1A3F]/70 text-center mt-2">Everything you need to work seamlessly.</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard index={11} icon={<FileCheck size={28} />} title="Deliverable Tracking" text="Track deadlines, deliverables and approval stages." />
            <FeatureCard index={12} icon={<BarChart3 size={28} />} title="Campaign Monitoring" text="Reach, conversions, engagement and spend insights." />
            <FeatureCard index={13} icon={<Users size={28} />} title="Team Collaboration" text="Invite team members with role-based permissions." />
          </div>
        </div>
      </section>

      <section id="analytics" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Analytics</h2>
          <p className="text-[#0A1A3F]/70 text-center mt-2">Real insights that help you make confident decisions.</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<BarChart3 size={28} />} title="Performance Dashboard" text="Monitor campaign performance with clean metrics." index={14} />
            <FeatureCard icon={<TrendingUp size={28} />} title="Growth Insights" text="Track creator or brand growth over time." index={15} />
            <FeatureCard icon={<Search size={28} />} title="Market Trends" text="AI identifies trending niches, creators and campaign formats." index={16} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E8F7FA] text-center">
        <h2 className="text-3xl font-bold">Want to see Influenco in action?</h2>
        <p className="mt-3 text-[#0A1A3F]/70 max-w-xl mx-auto">Explore our interactive product preview and see how the platform works.</p>

        <div className="mt-8">
          <Link href="/get-start" className="px-8 py-3 rounded-lg bg-[#0ABBB7] text-white font-semibold hover:bg-[#089f9c] hover:shadow-xl transition">
            Explore Platform Overview
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text, index = 0 }: any) {
  const accent = index % 2 === 0 ? "from-[#0ABBB7] to-[#7A4CD9]" : "from-[#7A4CD9] to-[#0ABBB7]";
  return (
    <div className="relative group">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b ${accent} blur-[14px]`} />
      <div className="relative bg-white border border-[#E3EBEE] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-transparent">
        <div className="w-14 h-14 rounded-xl bg-[#E8F7FA] text-[#0ABBB7] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <p className="mt-2 text-sm text-[#0A1A3F]/70 leading-relaxed">{text}</p>
        <div className="mt-5 w-full flex justify-center">
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
        </div>
      </div>
    </div>
  );
}
