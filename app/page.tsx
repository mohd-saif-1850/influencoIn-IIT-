"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Bot,
  Shield,
  Zap,
  FileCheck,
  ChartBar,
  Users,
  User,
  Search,
  Layers,
  TrendingUp,
  BadgeCheck,
  Globe,
  BarChart3,
  Workflow,
  ChevronDown
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { data: session } = useSession();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);


  const features = [
    { icon: <Bot size={24} />, title: "AI Smart Matching", text: "Find perfect creator or brand matches using niche, audience and engagement signals." },
    { icon: <MessageSquare size={24} />, title: "AI Chat Assist", text: "Real-time help with ideas, briefs, budgets and collaboration guidance." },
    { icon: <Search size={24} />, title: "Advanced Search & Filters", text: "Discover creators using deep category, geo and performance filters." },
    { icon: <Workflow size={24} />, title: "Workflow & Approvals", text: "Manage deliverables, approvals and content stages in one place." },
    { icon: <BarChart3 size={24} />, title: "Analytics & ROI Tracking", text: "Track KPIs, conversions, audience quality and true ROI impact." },
    { icon: <Shield size={24} />, title: "Secure Escrow Payment", text: "Funds held safely until deliverables are verified & approved." },
    { icon: <BadgeCheck size={24} />, title: "Trust Score Verification", text: "AI-driven authenticity checks on creators' audience and engagement." },
    { icon: <TrendingUp size={24} />, title: "Growth Insights", text: "Smart predictions on performance trends and campaign outcomes." },
    { icon: <Users size={24} />, title: "Team Collaboration", text: "Invite teammates, share notes and manage campaigns together." },
    { icon: <Zap size={24} />, title: "Smart Contract Automation", text: "Auto-generated agreements based on deliverables and milestones." },
    { icon: <FileCheck size={24} />, title: "Deliverable Checker", text: "Track deadlines, uploads and approval stages in one place." },
    { icon: <Globe size={24} />, title: "Global Compliance", text: "International payment and contract compliance built in." },
  ];

  const toggleFAQ = (index: number) => {
  setOpenFAQ(openFAQ === index ? null : index);
};

const faqItems = [
  {
    question: "What is Influenco?",
    answer: "Influenco is an AI driven platform that helps creators and brands collaborate through precision matching, trust-based verification, automated contracts and secure escrow payouts."
  },
  {
    question: "How does AI matching work?",
    answer: "Our AI analyzes audience quality, niche relevance, past performance, engagement authenticity and campaign fit to recommend the best creator-brand matches."
  },
  {
    question: "Is Influenco safe for payments?",
    answer: "Yes. Influenco uses secure escrow to hold payments until deliverables are completed and approved, ensuring fairness for both creators and brands."
  },
  {
    question: "Can brands track performance?",
    answer: "Brands get a detailed dashboard with KPIs, ROI insights, audience analytics and performance trends to measure campaign effectiveness."
  },
  {
    question: "How does Influenco verify creators?",
    answer: "We calculate a trust score using audience authenticity checks, engagement depth, fraud detection and content reliability metrics."
  },
  {
    question: "Is Influenco suitable for agencies?",
    answer: "Yes. Agencies can use team workspaces, collaborate with clients, manage multiple campaigns and automate all stages of the influencer workflow."
  },
  {
    question: "Is the platform free to use?",
    answer: "Influenco offers flexible plans for creators and brands. You can use essential tools for free and upgrade for advanced features like analytics and automation."
  }
];

  return (
    <div className="min-h-screen bg-white text-[#0A1A3F] antialiased relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-56 -top-48 w-[560px] h-[560px] rounded-full bg-[#0ABBB7]/12 blur-[140px] animate-[pulse_8s_infinite]" />
        <div className="absolute -right-56 bottom-0 w-[680px] h-[680px] rounded-full bg-[#7A4CD9]/12 blur-[160px] animate-[pulse_10s_infinite]" />
      </div>

      <header className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Where Influence{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9]">
                Meets Intelligence
              </span>
            </h1>

            <p className="text-lg text-[#0A1A3F]/80 max-w-xl">
              AI driven platform for creator-brand collaborations. Precision matches, verified trust scores, automated contracts and secure escrow payouts — all in one intelligent dashboard.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {!loadingAuth && !loggedIn ? (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white font-semibold shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  Create account
                  <ArrowRight size={16} />
                </Link>
              ) : !loadingAuth && loggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white font-semibold shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  Go to Dashboard
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8F7FA] text-[#0A1A3F] font-semibold shadow-sm">
                  Loading...
                </div>
              )}

              <Link
                href="/influenco-ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7A4CD9] to-[#5a2fcf] text-white font-semibold shadow-md transform transition hover:-translate-y-1 hover:shadow-2xl"
              >
                Try AI Chat
                <MessageSquare size={16} />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#0ABBB7]/20 text-[#0A1A3F] text-sm hover:shadow-md transition"
              >
                How it works
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mt-6">
              <FeatureMini label="AI Matching" accent="teal" />
              <FeatureMini label="Trust Score" accent="purple" />
              <FeatureMini label="Escrow" accent="teal" />
            </div>

            <div className="flex gap-3 flex-wrap mt-4">
              <MiniBadge icon={<CheckCircle />} color="teal" text="Verified creators" />
              <MiniBadge icon={<CheckCircle />} color="purple" text="Secure contracts" />
              <MiniBadge icon={<CheckCircle />} color="teal" text="Fast payouts" />
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-[520px] max-w-full">
              <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/30 shadow-2xl p-6 transform transition-all duration-400 hover:-translate-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image 
                        src="/InfluencoLogo.png" 
                        alt="Influenco Logo" 
                        width={40} 
                        height={40} 
                        className="object-contain"
                      />
                  </div>
                    <div>
                      <div className="font-semibold">Influenco AI Dashboard</div>
                      <div className="text-xs text-[#0A1A3F]/60">Campaign overview</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#0A1A3F]/60">v1.0</div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-lg bg-[#E8F7FA] p-3">
                    <div className="h-3 rounded bg-[#0ABBB7]/40 w-3/4 mb-3" />
                    <div className="h-3 rounded bg-[#7A4CD9]/30 w-1/2" />
                  </div>
                  <div className="rounded-lg bg-white border p-3 flex flex-col items-center justify-center">
                    <div className="text-lg font-semibold">98%</div>
                    <div className="text-xs text-[#0A1A3F]/70">Trust</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <InfoRow label="Active Campaigns" value="12" />
                  <InfoRow label="Pending Payouts" value="₹8,200" />
                  <InfoRow label="Matched Creators" value="34" />
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href="/influenco-ai"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white rounded-xl text-sm inline-flex items-center justify-center gap-2 hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    Chat with AI
                    <MessageSquare size={13} />
                  </Link>

                  <Link
                    href="/get-start"
                    className="px-4 py-2 bg-white border rounded-xl text-sm inline-flex items-center gap-2 hover:shadow-md transition"
                  >
                    Explore
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="absolute -right-20 -bottom-12 w-56 h-56 rounded-full bg-gradient-to-br from-[#0ABBB7]/14 to-[#7A4CD9]/14 blur-3xl" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold">What Influenco Does</h2>
                <p className="mt-4 text-[#0A1A3F]/70 text-lg max-w-2xl">
                  Influenco simplifies creator-brand collaboration. AI finds the best matches, verifies authenticity, automates contracts and secures payments — so teams can focus on creativity.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <HoverCard icon={<Bot size={20} />} title="AI Matching" text="Precision matches based on audience and performance." accent="teal" />
                  <HoverCard icon={<Shield size={20} />} title="Trust Score" text="Detect fraud and measure authenticity across profiles." accent="purple" />
                  <HoverCard icon={<FileCheck size={20} />} title="Smart Contracts" text="Automated agreements with clear milestones and deliverables." accent="teal" />
                  <HoverCard icon={<Zap size={20} />} title="Escrow Payments" text="Funds held securely until deliverables are verified." accent="purple" />
                </div>
              </div>

              <aside>
                <div className="p-6 bg-[#E8F7FA] rounded-2xl border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Live Insights</div>
                    <div className="text-sm text-[#0A1A3F]/60">Updated</div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="h-2 rounded bg-[#0ABBB7]/30 w-full" />
                    <div className="h-2 rounded bg-[#7A4CD9]/30 w-3/4" />
                    <div className="h-2 rounded bg-[#0ABBB7]/30 w-1/2" />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">Campaigns</div>
                    <div className="font-semibold">12</div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <div className="text-sm text-[#0A1A3F]/70">Matched</div>
                      <div className="font-semibold">34</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <div className="text-sm text-[#0A1A3F]/70">Payouts</div>
                      <div className="font-semibold">₹8.2k</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href="/influenco-ai" className="block px-4 py-2 text-center bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white rounded-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                      Open AI Chat
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-[#F7FBFC]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">How Influenco Works</h2>
            <p className="mt-3 text-[#0A1A3F]/70 max-w-2xl mx-auto">Four clear steps from signup to payout. AI guides the process and ensures trust at every stage.</p>

            <div className="mt-12 relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-12 w-px h-full bg-gradient-to-b from-transparent to-[#0ABBB7]/10 hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <Step icon={<User size={20} />} number="01" title="Create Account" text="Sign up and connect profiles." />
                <Step icon={<Search size={20} />} number="02" title="AI Matches" text="Get precise creator recommendations." />
                <Step icon={<FileCheck size={20} />} number="03" title="Smart Contract" text="Auto contracts with milestones." />
                <Step icon={<Zap size={20} />} number="04" title="Collaborate" text="Track delivery and release payments." />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Product Preview</h2>
            <p className="mt-2 text-[#0A1A3F]/70">Small interactive preview of the Influenco dashboard.</p>

            <div className="mt-10 flex justify-center">
              <div className="w-[820px] max-w-full rounded-3xl bg-white border shadow-2xl p-6 transform transition hover:-translate-y-3 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">Campaign Overview</div>
                  <div className="text-sm text-[#0A1A3F]/60">Live</div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-[#E8F7FA] rounded-lg">
                    <div className="text-sm text-[#0A1A3F]/70">Reach</div>
                    <div className="font-semibold text-xl mt-2">1.2M</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-sm text-[#0A1A3F]/70">Engagement</div>
                    <div className="font-semibold text-xl mt-2">8.3%</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-sm text-[#0A1A3F]/70">Budget</div>
                    <div className="font-semibold text-xl mt-2">₹35.5k</div>
                  </div>
                </div>

                <div className="h-48 rounded-lg bg-[#F8FAFB] border flex items-center justify-center text-[#0A1A3F]/70">Dashboard chart placeholder</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F7FBFC]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Platform Capabilities</h2>
            <p className="mt-3 text-[#0A1A3F]/70 max-w-2xl mx-auto">All the tools you need to run professional creator-brand collaborations.</p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.slice(0, 6).map((f, i) => (
                <FeatureCard key={i} index={i} icon={f.icon} title={f.title} text={f.text} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center">Voices That Inspire</h2>
    <p className="mt-3 text-[#0A1A3F]/70 text-center max-w-2xl mx-auto">
      Visionaries whose thinking aligns with Influenco’s mission.
    </p>

    <div className="mt-12 overflow-hidden relative">
      <div className="flex gap-8 w-max animate-marquee group">

        {[
          { 
            name: "Elon Musk",
            profession: "CEO of Tesla and SpaceX",
            img: "/elon.jpg",
            msg: "Intelligent platforms define the future of digital collaboration."
          },
          { 
            name: "Jeff Bezos",
            profession: "Founder of Amazon",
            img: "/jeff.jpg",
            msg: "Customer obsession drives great product ecosystems."
          },
          { 
            name: "Steve Jobs",
            profession: "Co-founder of Apple",
            img: "/steve.jpg",
            msg: "Simplicity builds powerful digital experiences."
          },
          { 
            name: "Bill Gates",
            profession: "Co-founder of Microsoft",
            img: "/bill.jpg",
            msg: "Data-driven collaboration unlocks true efficiency."
          },
          { 
            name: "Mark Zuckerberg",
            profession: "Founder and CEO of Meta",
            img: "/mark.jpg",
            msg: "The creator economy grows through intelligent tools."
          },
          { 
            name: "Sundar Pichai",
            profession: "CEO of Google and Alphabet",
            img: "/sundar.jpg",
            msg: "AI will power the next era of digital productivity."
          },
          { 
            name: "Raiyyan",
            profession: "Creator and Digital Strategist",
            img: "/raiyyanF.jpg",
            msg: "Influence isn’t about what social media shows you - it’s about what you choose to consume, create, and promote. Filth or growth… the choice is always yours."
          }
        ].map((p, i) => (
          <div key={i} className="relative group/card min-w-[300px]">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-300 bg-gradient-to-b from-[#0ABBB7] to-[#7A4CD9] blur-xl" />
            <div className="relative bg-white w-[300px] h-[260px] border rounded-2xl p-6 shadow-sm group-hover/card:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                <Image src={p.img} width={80} height={80} alt={p.name} className="object-cover w-full h-full" />
              </div>
              <div className="text-center font-semibold">{p.name}</div>
              <div className="text-center text-xs text-[#0A1A3F]/70">{p.profession}</div>
              <p className="text-sm text-[#0A1A3F]/70 mt-3 text-center leading-relaxed">{p.msg}</p>
            </div>
          </div>
        ))}

        {[
          { 
            name: "Elon Musk",
            profession: "CEO of Tesla and SpaceX",
            img: "/elon.jpg",
            msg: "Intelligent platforms define the future of digital collaboration."
          },
          { 
            name: "Jeff Bezos",
            profession: "Founder of Amazon",
            img: "/jeff.jpg",
            msg: "Customer obsession drives great product ecosystems."
          },
          { 
            name: "Steve Jobs",
            profession: "Co-founder of Apple",
            img: "/steve.jpg",
            msg: "Simplicity builds powerful digital experiences."
          },
          { 
            name: "Bill Gates",
            profession: "Co-founder of Microsoft",
            img: "/bill.jpg",
            msg: "Data-driven collaboration unlocks true efficiency."
          },
          { 
            name: "Mark Zuckerberg",
            profession: "Founder and CEO of Meta",
            img: "/mark.jpg",
            msg: "The creator economy grows through intelligent tools."
          },
          { 
            name: "Sundar Pichai",
            profession: "CEO of Google and Alphabet",
            img: "/sundar.jpg",
            msg: "AI will power the next era of digital productivity."
          },
          { 
            name: "Raiyyan",
            profession: "Creator and Digital Strategist",
            img: "/raiyyanF.jpg",
            msg: "Influence isn’t about what social media shows you - it’s about what you choose to consume, create, and promote. Filth or growth… the choice is always yours."
          }
        ].map((p, i) => (
          <div key={`clone-${i}`} className="relative group/card min-w-[300px]">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-300 bg-gradient-to-b from-[#0ABBB7] to-[#7A4CD9] blur-xl" />
            <div className="relative bg-white w-[300px] h-[260px] border rounded-2xl p-6 shadow-sm group-hover/card:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                <Image src={p.img} width={80} height={80} alt={p.name} className="object-cover w-full h-full" />
              </div>
              <div className="text-center font-semibold">{p.name}</div>
              <div className="text-center text-xs text-[#0A1A3F]/70">{p.profession}</div>
              <p className="text-sm text-[#0A1A3F]/70 mt-3 text-center leading-relaxed">{p.msg}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
    .group:hover .animate-marquee {
      animation-play-state: paused;
    }
  `}</style>
</section>



        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Testimonials</h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-2xl border shadow-sm transform transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] font-semibold">R</div>
                  <div className="text-left">
                    <div className="font-semibold">Raiyyan</div>
                    <div className="text-sm text-[#0A1A3F]/70">Founder</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#0A1A3F]/80">Influenco solved our collaboration headaches. Matching is precise and payouts are secure.</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border shadow-sm transform transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#E8F7FA] flex items-center justify-center text-[#7A4CD9] font-semibold">M</div>
                  <div className="text-left">
                    <div className="font-semibold">Mohd Said</div>
                    <div className="text-sm text-[#0A1A3F]/70">Developer</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#0A1A3F]/80">Built with reliability and performance in mind. The platform is fast and secure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#ffffff] to-[#F7FBFC] text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold">Ready to join Influenco?</h2>
            <p className="mt-2 text-[#0A1A3F]/70">Create your account and start collaborating with trusted creators and brands today.</p>
            <div className="mt-6">
              {!session ? (
                <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white rounded-lg font-semibold shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl">
                  Create your account
                </Link>
              ) :  (
                <Link href="/dashboard" className="px-8 py-3 bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white rounded-lg font-semibold shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl">
                  Go to Dashboard
                </Link>
              )
              }
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F7FBFC]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <p className="mt-3 text-center text-[#0A1A3F]/70 max-w-2xl mx-auto">
              Answers to common questions creators and brands ask about Influenco.
            </p>

            <div className="mt-10 space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border rounded-xl bg-white shadow-sm">
                  
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left text-[#0A1A3F] font-medium"
                  >
                    {item.question}

                    <ChevronDown
                      className={`w-5 h-5 text-[#0ABBB7] transition-transform duration-300 ${
                        openFAQ === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openFAQ === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-sm text-[#0A1A3F]/70 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>




        <footer className="border-t border-neutral-200 py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/InfluencoLogo.png"
                    alt="Influenco Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div>
                  <div className="font-bold text-lg">INFLUENCO</div>
                  <div className="text-sm text-[#0A1A3F]/60">AI • Trust • Collaboration</div>
                </div>
              </div>

              <p className="text-sm text-[#0A1A3F]/70 max-w-sm leading-relaxed">
                Nirman<br />
                2nd Floor, Sudha & Shankar Innovation Hub,<br />
                IIT Madras, Chennai 600 036, India
              </p>
            </div>

            <div>
              <div className="font-semibold mb-3 text-[#0A1A3F]">Product</div>
              <ul className="space-y-2 text-sm text-[#0A1A3F]/70">
                <li><Link href="/features" className="hover:text-[#7A4CD9]">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-[#7A4CD9]">Pricing</Link></li>
                <li><Link href="#how-it-works" className="hover:text-[#7A4CD9]">How It Works</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-3 text-[#0A1A3F]">Company</div>
              <ul className="space-y-2 text-sm text-[#0A1A3F]/70">
                <li><Link href="/about" className="hover:text-[#7A4CD9]">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-[#7A4CD9]">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-[#7A4CD9]">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold cursor-pointer mb-3 text-[#0A1A3F]">Send a Message</div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0ABBB7]/40"
                />

                <textarea
                  placeholder="Write your message…"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#0ABBB7]/40"
                />

                <button
                  className="w-full bg-gradient-to-r from-[#0ABBB7] to-[#069b96] text-white rounded-lg text-sm py-2 font-medium hover:shadow-lg transition"
                >
                  Send
                </button>
              </div>
            </div>

          </div>

          <div className="text-center text-sm text-[#0A1A3F]/60 mt-12">
            © {new Date().getFullYear()} Influenco. All rights reserved.
          </div>
        </footer>

      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#0A1A3F]/70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function FeatureMini({ label, accent = "teal" }: { label: string; accent?: "teal" | "purple" }) {
  const color = accent === "teal" ? "text-[#0ABBB7]" : "text-[#7A4CD9]";
  return (
    <div className="rounded-2xl bg-white px-4 py-3 border flex flex-col items-start shadow-sm">
      <div className={`text-sm font-semibold ${color}`}>{label}</div>
      <div className="text-xs text-[#0A1A3F]/70 mt-1">Short description</div>
    </div>
  );
}

function MiniBadge({ icon, color = "teal", text }: { icon: any; color?: "teal" | "purple"; text: string }) {
  const c = color === "teal" ? "text-[#0ABBB7]" : "text-[#7A4CD9]";
  return (
    <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm">
      <div className={c}>{icon}</div>
      <div className="text-sm font-medium">{text}</div>
    </div>
  );
}

function HoverCard({ icon, title, text, accent = "teal" }: { icon: any; title: string; text: string; accent?: "teal" | "purple" }) {
  const grad = accent === "teal" ? "from-[#0ABBB7] to-[#7A4CD9]" : "from-[#7A4CD9] to-[#0ABBB7]";
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

function Step({ icon, number, title, text }: { icon: any; number: string; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-[#E8F7FA] flex items-center justify-center text-[#0ABBB7] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="mt-3 font-semibold">{number}</div>
      <div className="mt-2 font-medium">{title}</div>
      <div className="text-sm text-[#0A1A3F]/70 mt-2">{text}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text, index = 0 }: any) {
  const accent = index % 2 === 0 ? "from-[#0ABBB7] to-[#7A4CD9]" : "from-[#7A4CD9] to-[#0ABBB7]";
  return (
    <div className="relative group">
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b ${accent} blur-[14px]`} />
      <div className="relative bg-white border border-[#E3EBEE] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-transparent overflow-hidden">
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
