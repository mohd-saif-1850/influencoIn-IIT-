// "use client";
// import { Suspense, useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { ArrowRight, Bot, Shield, FileCheck, Zap, Users, ChartBar } from "lucide-react";
// import type { BufferAttribute, Group, Points as ThreePoints, Object3D } from "three";
// import * as THREE from "three";

// function useScrollProgress() {
//   const [progress, setProgress] = useState(0);
//   useEffect(() => {
//     const onScroll = () => {
//       const p = Math.min(1, Math.max(0, window.scrollY / (document.body.scrollHeight - window.innerHeight)));
//       setProgress(p);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
//   return progress;
// }

// function useIsMobile(breakpoint = 768) {
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < breakpoint);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, [breakpoint]);
//   return isMobile;
// }

// function FloatingParticles({ density = 900 }: { density?: number }) {
//   const pointsRef = useRef<ThreePoints | null>(null);
//   const count = density;
//   const positions = useMemo(() => {
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       arr[i * 3] = (Math.random() - 0.5) * 22;
//       arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
//       arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
//     }
//     return arr;
//   }, [count]);

//   const colors = useMemo(() => {
//     const col = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const t = Math.random();
//       col[i * 3] = 0.7 * (1 - t) + 0.3;
//       col[i * 3 + 1] = 0.3 * t + 0.08;
//       col[i * 3 + 2] = 1 - 0.25 * (1 - t);
//     }
//     return col;
//   }, [count]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     const pts = pointsRef.current;
//     if (!pts) return;
//     pts.rotation.y = t * 0.03;
//     const geom = pts.geometry;
//     const pos = geom.attributes.position as BufferAttribute;
//     for (let i = 0; i < pos.count; i++) {
//       const ix = i * 3;
//       const baseY = pos.array[ix + 1] as number;
//       pos.array[ix + 1] = baseY + Math.sin(t * 0.35 + i * 0.007) * 0.0018;
//     }
//     pos.needsUpdate = true;
//   });

//   return (
//     <points ref={pointsRef as React.RefObject<ThreePoints>}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//         <bufferAttribute attach="attributes-color" args={[colors, 3]} />
//       </bufferGeometry>
//       <pointsMaterial size={0.045} vertexColors transparent opacity={0.95} sizeAttenuation />
//     </points>
//   );
// }

// function NeuralWave({ intensity = 1, density = 6000 }: { intensity?: number; density?: number }) {
//   const groupRef = useRef<Group | null>(null);
//   const count = Math.max(2000, density);
//   const positions = useMemo(() => {
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const x = (Math.random() - 0.5) * 12;
//       const z = (Math.random() - 0.5) * 12;
//       const y = Math.sin(x * 1.6) * 0.18 + Math.cos(z * 1.4) * 0.18;
//       arr[i * 3] = x;
//       arr[i * 3 + 1] = y;
//       arr[i * 3 + 2] = z;
//     }
//     return arr;
//   }, [count]);

//   const colors = useMemo(() => {
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       arr[i * 3] = 0.75;
//       arr[i * 3 + 1] = 0.28;
//       arr[i * 3 + 2] = 1;
//     }
//     return arr;
//   }, [count]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (!groupRef.current) return;
//     groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.06;
//     const pts = groupRef.current.children[0] as ThreePoints;
//     const geom = pts.geometry;
//     const pos = geom.attributes.position as BufferAttribute;
//     for (let i = 0; i < pos.count; i++) {
//       const ix = i * 3;
//       const x = pos.array[ix] as number;
//       const z = pos.array[ix + 2] as number;
//       pos.array[ix + 1] =
//         Math.sin((x + t * 0.8) * 1.8) * 0.22 * intensity + Math.cos((z - t * 0.9) * 1.6) * 0.16 * intensity;
//     }
//     pos.needsUpdate = true;
//   });

//   return (
//     <group ref={groupRef}>
//       <points>
//         <bufferGeometry>
//           <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//           <bufferAttribute attach="attributes-color" args={[colors, 3]} />
//         </bufferGeometry>
//         <pointsMaterial size={0.038} vertexColors transparent opacity={0.96} sizeAttenuation />
//       </points>
//     </group>
//   );
// }

// function ElectricNodes({ active }: { active: number }) {
//   const groupRef = useRef<Group | null>(null);
//   const nodeCount = 14;
//   const nodes = useMemo(() => {
//     const arr: [number, number, number][] = [];
//     for (let i = 0; i < nodeCount; i++) {
//       const angle = (i / nodeCount) * Math.PI * 2;
//       const radius = 1.5 + (i % 3) * 0.18;
//       arr.push([Math.cos(angle) * radius, (i % 3) * 0.08 - 0.08, Math.sin(angle) * radius]);
//     }
//     return arr;
//   }, []);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (!groupRef.current) return;
//     groupRef.current.rotation.y = t * 0.08 + active * 0.12;
//     groupRef.current.children.forEach((child, idx) => {
//       const mesh = child as Object3D;
//       const wobble = Math.sin(t * 2 + idx) * 0.02 * (active + 1);
//       mesh.position.y = (idx % 3) * 0.06 - 0.06 + wobble;
//     });
//   });

//   return (
//     <group ref={groupRef}>
//       {nodes.map((pos, i) => (
//         <mesh key={i} position={pos}>
//           <sphereGeometry args={[0.06, 12, 12]} />
//           <meshStandardMaterial emissive="#9b5cf6" emissiveIntensity={0.95} color="#5b21b6" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function HeroCanvas({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
//   const camOffset = useMemo(() => ({ x: 0, y: 0, z: isMobile ? 10 : 8 }), [isMobile]);
//   return (
//     <Canvas
//       camera={{ position: [camOffset.x, camOffset.y + scroll * (isMobile ? 0.25 : 0.6), camOffset.z], fov: isMobile ? 60 : 50 }}
//       style={{ width: "100%", height: "100%" }}
//       gl={{ antialias: true, preserveDrawingBuffer: false }}
//     >
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[5, 5, 5]} intensity={0.8} />
//       <Suspense fallback={null}>
//         <FloatingParticles density={isMobile ? 220 : 900} />
//       </Suspense>
//     </Canvas>
//   );
// }

// function ShowcaseCanvas({ active, isMobile }: { active: number; isMobile: boolean }) {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, isMobile ? 9 : 8], fov: isMobile ? 60 : 50 }}
//       style={{ width: "100%", height: "100%" }}
//       gl={{ antialias: true, preserveDrawingBuffer: false }}
//     >
//       <ambientLight intensity={0.95} />
//       <directionalLight position={[5, 5, 5]} intensity={0.9} />
//       <Suspense fallback={null}>
//         <NeuralWave intensity={1 + active * 0.12} density={isMobile ? 2200 : 6000} />
//         <ElectricNodes active={active} />
//       </Suspense>
//       <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} />
//     </Canvas>
//   );
// }

// export default function Page() {
//   const [active, setActive] = useState<number>(0);
//   const stepsRef = useRef<HTMLDivElement | null>(null);
//   const pinRef = useRef<HTMLDivElement | null>(null);
//   const progress = useScrollProgress();
//   const isMobile = useIsMobile(900);
//   useEffect(() => {
//     const onScroll = () => {
//       if (!stepsRef.current || !pinRef.current) return;
//       const rect = stepsRef.current.getBoundingClientRect();
//       const total = rect.height - (pinRef.current.clientHeight || 1);
//       if (total <= 0) return;
//       const offset = Math.min(Math.max(-rect.top, 0), total);
//       const p = offset / total;
//       const idx = Math.min(3, Math.max(0, Math.floor(p * 4)));
//       setActive(idx);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const features = [
//     { Icon: Bot, title: "AI-Powered Matching", text: "Advanced AI finds high-ROI creator-brand partnerships." },
//     { Icon: Shield, title: "Trust Score System", text: "AI-driven fraud detection for authentic collaborations." },
//     { Icon: FileCheck, title: "Smart Contracts", text: "Auto-generated contracts that protect both parties." },
//     { Icon: Zap, title: "Escrow Payments", text: "Secure payouts released after verified deliverables." },
//     { Icon: ChartBar, title: "Real-Time Analytics", text: "Track campaign ROI, engagement and audience authenticity." },
//     { Icon: Users, title: "Portfolio Auto-Sync", text: "Sync Instagram, YouTube & TikTok — stats auto-update." },
//   ];

//   const steps = [
//     { title: "Sign Up", desc: "Create an account in under 60 seconds." },
//     { title: "AI Matches", desc: "Get matched with verified creators/brands." },
//     { title: "Smart Contract", desc: "Auto contracts protect both parties." },
//     { title: "Collaborate", desc: "Work together with tracking and secure payments." },
//   ];

//   const testimonials = [
//     { name: "Priya Sharma", role: "Fashion Influencer", score: 98, quote: "Influenco transformed my creator business." },
//     { name: "Rajesh Kumar", role: "Marketing Director, TechBrand", score: 95, quote: "The platform shows real ROI and prevents fraudulent partners." },
//     { name: "Ananya Desai", role: "Beauty Creator", score: 99, quote: "Escrow payments let me focus on creation, not chasing money." },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-gray-900 antialiased">
//       <section className="relative overflow-hidden pt-20 pb-10">
//         <div className="absolute inset-0 pointer-events-none opacity-40">
//           <div className="w-full h-full">
//             <div className="md:block hidden absolute inset-0">
//               <div className="w-full h-full">
//                 <HeroCanvas scroll={progress} isMobile={isMobile} />
//               </div>
//             </div>
//             <div className="md:hidden block absolute inset-0">
//               <div className="w-full h-full">
//                 <HeroCanvas scroll={progress} isMobile={true} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto px-6">
//           <div className="flex flex-col items-center text-center">
//             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600">
//               <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
//               Trusted by 10,000+ creators & brands
//             </div>

//             <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl">
//               Where Influence{" "}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Meets Trust</span>
//             </h1>

//             <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl">
//               AI-powered collaboration platform for creators and brands. Fraud protection, precise matches and guaranteed payouts.
//             </p>

//             <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
//               <Link href="/signup" className="w-full sm:w-auto">
//                 <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-lg flex items-center gap-2 justify-center">
//                   Join the Network
//                   <ArrowRight className="w-4 h-4" />
//                 </motion.button>
//               </Link>
//               <a href="#how-it-works" className="w-full sm:w-auto">
//                 <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-purple-300">
//                   Explore Platform
//                 </motion.button>
//               </a>
//             </div>

//             <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl w-full">
//               <div className="space-y-1 text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-purple-600">10K+</div>
//                 <div className="text-xs sm:text-sm text-gray-500">Active Users</div>
//               </div>
//               <div className="space-y-1 text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-purple-600">98%</div>
//                 <div className="text-xs sm:text-sm text-gray-500">Trust Score</div>
//               </div>
//               <div className="space-y-1 text-center">
//                 <div className="text-2xl sm:text-3xl font-bold text-purple-600">$2M+</div>
//                 <div className="text-xs sm:text-sm text-gray-500">Paid Out</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div className="rounded-2xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-1">
//             <Image src="/image.png" alt="influenco" width={1200} height={800} className="w-full h-auto object-cover" />
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-2xl sm:text-3xl font-bold">What Influenco Does</h2>
//             <p className="text-gray-600 text-base sm:text-lg">We match creators and brands using AI, verify authenticity with trust scores, automate contracts and secure payments — all in a single platform.</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//               {features.slice(0, 4).map((f, i) => (
//                 <motion.div key={i} whileHover={{ scale: 1.02 }} className="flex items-start gap-3 p-4 rounded-2xl cursor-pointer bg-white border shadow-sm transition transform hover:-translate-y-1">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center text-purple-600">
//                     <f.Icon className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <div className="font-semibold">{f.title}</div>
//                     <div className="text-sm text-gray-500">{f.text}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="how-it-works" className="py-12">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl font-bold">How Influenco Works</h2>
//             <p className="text-gray-600 mt-2">From signup to collaboration in four simple steps</p>
//           </div>

//           <div ref={stepsRef} className="relative grid md:grid-cols-2 gap-6">
//             <div className="space-y-4 px-2">
//               {steps.map((s, i) => (
//                 <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className={`p-5 rounded-2xl border bg-white shadow-sm transition transform ${active === i ? "scale-102 border-purple-300 shadow-lg" : ""}`}>
//                   <div className="text-lg font-bold text-purple-600 mb-1">{String(i + 1).padStart(2, "0")}</div>
//                   <div className="text-xl font-semibold">{s.title}</div>
//                   <p className="text-gray-600 mt-2">{s.desc}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <div ref={pinRef} className="sticky top-24 h-[420px] rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-200 shadow-lg flex items-center justify-center overflow-hidden">
//               <div className="w-full h-full relative">
//                 <div className="absolute inset-0 p-4">
//                   <ShowcaseCanvas active={active} isMobile={isMobile} />
//                 </div>
//                 <div className="absolute left-4 bottom-4 bg-white/95 px-3 py-2 rounded-xl border shadow-sm">
//                   <div className="text-xs text-gray-500">Interactive Preview</div>
//                   <div className="text-sm font-semibold text-purple-600">Step {active + 1}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Features</h2>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {features.map((f, i) => (
//               <motion.div key={i} whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(99,102,241,0.08)" }} className="p-6 bg-white rounded-2xl border shadow-sm cursor-pointer transition transform hover:-translate-y-1">
//                 <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 text-purple-600">
//                   <f.Icon className="w-6 h-6" />
//                 </div>
//                 <div className="font-semibold text-lg mb-2">{f.title}</div>
//                 <div className="text-gray-600">{f.text}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Trusted by Creators & Brands</h2>
//           <div className="grid gap-6 md:grid-cols-3">
//             {testimonials.map((t, i) => (
//               <motion.div key={i} whileHover={{ y: -6 }} className="p-6 bg-white rounded-2xl border shadow-sm cursor-pointer transition transform hover:-translate-y-1">
//                 <p className="italic text-gray-700">"{t.quote}"</p>
//                 <div className="flex items-center justify-between mt-4">
//                   <div>
//                     <div className="font-semibold">{t.name}</div>
//                     <div className="text-sm text-gray-500">{t.role}</div>
//                   </div>
//                   <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">✔ {t.score}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <footer className="bg-white border-t border-gray-100 py-8">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">IN</div>
//               <div>
//                 <div className="font-bold text-lg">INFLUENCO</div>
//                 <div className="text-sm text-gray-500">AI · Trust · Collaboration</div>
//               </div>
//             </div>
//             <p className="mt-3 text-gray-600 text-sm">The AI-first platform for creator-brand collaborations. Trusted, secure, and efficient.</p>
//           </div>

//           <div>
//             <div className="font-semibold mb-3">Product</div>
//             <ul className="space-y-2 text-gray-600 text-sm">
//               <li><a className="hover:text-purple-600 transition" href="#features">Features</a></li>
//               <li><a className="hover:text-purple-600 transition" href="#how-it-works">How It Works</a></li>
//               <li><a className="hover:text-purple-600 transition" href="/pricing">Pricing</a></li>
//             </ul>
//           </div>

//           <div>
//             <div className="font-semibold mb-3">Company</div>
//             <ul className="space-y-2 text-gray-600 text-sm">
//               <li><a className="hover:text-purple-600 transition" href="/about">About</a></li>
//               <li><a className="hover:text-purple-600 transition" href="/careers">Careers</a></li>
//               <li><a className="hover:text-purple-600 transition" href="/blog">Blog</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-6xl mx-auto px-6 mt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} INFLUENCO. All rights reserved.</div>
//       </footer>
//     </div>
//   );
// }


"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette
} from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Shield,
  FileCheck,
  Zap,
  Users,
  ChartBar
} from "lucide-react";
import type {
  BufferAttribute,
  Group,
  Points as ThreePoints,
  Object3D
} from "three";
import { Mesh } from "three";
import * as THREE from "three";

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const x = Math.min(
        1,
        Math.max(0, window.scrollY / (document.body.scrollHeight - window.innerHeight))
      );
      setP(x);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useIsMobile(b = 900) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const f = () =>
      setM(window.innerWidth < b || /Mobi|Android/i.test(navigator.userAgent));
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [b]);
  return m;
}

function FloatingParticles({ density = 5000, radius = 20 }: any) {
  const ref = useRef<ThreePoints | null>(null);
  const count = density;
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = radius * (0.3 + Math.random() * 0.7);
      a[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      a[i * 3 + 1] = Math.cos(phi) * r * 0.4;
      a[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    return a;
  }, [count, radius]);

  const col = useMemo(() => {
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      c[i * 3] = 0.2 + 0.8 * Math.pow(t, 0.6);
      c[i * 3 + 1] = 0.05 + 0.7 * Math.pow(1 - t, 0.8);
      c[i * 3 + 2] = 0.7 + 0.5 * (1 - Math.pow(t, 0.4));
    }
    return c;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y = t * 0.018;
    const g = pts.geometry;
    const p = g.attributes.position as BufferAttribute;
    const L = p.array.length;
    for (let i = 0; i < L; i += 3) {
      const x = p.array[i] as number;
      const z = p.array[i + 2] as number;
      p.array[i + 1] += Math.sin((x + z) * 0.02 + t * 0.6) * 0.0008;
    }
    p.needsUpdate = true;
  });

  return (
    <points ref={ref as any} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.95} sizeAttenuation />
    </points>
  );
}

function NeuralMesh({ density = 20000, intensity = 1 }: any) {
  const ref = useRef<ThreePoints | null>(null);
  const count = density;
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 14;
      const y = Math.sin(x * 1.8) * 0.25 + Math.cos(z * 1.6) * 0.25;
      a[i * 3] = x;
      a[i * 3 + 1] = y;
      a[i * 3 + 2] = z;
    }
    return a;
  }, [count]);

  const col = useMemo(() => {
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      c[i * 3] = 1;
      c[i * 3 + 1] = 0.2;
      c[i * 3 + 2] = 0.95;
    }
    return c;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y = Math.sin(t * 0.15) * 0.09;
    const g = pts.geometry;
    const p = g.attributes.position as BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const ix = i * 3;
      const x = p.array[ix] as number;
      const z = p.array[ix + 2] as number;
      p.array[ix + 1] =
        Math.sin((x + t * 0.9) * 1.9) * 0.35 * intensity +
        Math.cos((z - t * 0.8) * 1.7) * 0.28 * intensity;
    }
    p.needsUpdate = true;
  });

  return (
    <points ref={ref as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.98} sizeAttenuation />
    </points>
  );
}

function ElectricNodes({ active = 0, cluster = 20 }: any) {
  const ref = useRef<Group | null>(null);
  const nodeCount = cluster;
  const nodes = useMemo(() => {
    const a: any[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const ang = (i / nodeCount) * Math.PI * 2;
      const r = 1.2 + (i % 4) * 0.14;
      a.push([Math.cos(ang) * r, (i % 4) * 0.06 - 0.08, Math.sin(ang) * r]);
    }
    return a;
  }, [cluster]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = ref.current;
    if (!g) return;
    g.rotation.y = t * 0.12 + active * 0.18;
    g.children.forEach((c, idx) => {
      const m = c as Object3D;
      const wb = Math.sin(t * 2.2 + idx) * 0.03 * (active + 1);
      // @ts-ignore
      m.position.y = (idx % 4) * 0.06 - 0.08 + wb;
    });
  });

  return (
    <group ref={ref}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p as any}>
          <icosahedronGeometry args={[0.07, 1]} />
          <meshStandardMaterial
            emissive="#ff2de6"
            emissiveIntensity={1.2}
            color="#7c1cff"
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroScene({ isMobile }: any) {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 3]} intensity={1.3} />
      <Suspense fallback={null}>
        <FloatingParticles density={isMobile ? 900 : 6000} radius={isMobile ? 11 : 20} />
        <NeuralMesh density={isMobile ? 6000 : 20000} intensity={1.1} />
        <ElectricNodes active={0} cluster={isMobile ? 12 : 28} />
      </Suspense>
      <EffectComposer multisampling={4}>
        <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={3} />
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={isMobile ? 0.7 : 1.5} />
        <Noise opacity={isMobile ? 0.02 : 0.04} />
        <Vignette eskil={false} offset={0.1} darkness={isMobile ? 0.2 : 0.42} />
      </EffectComposer>
    </>
  );
}

function HeroCanvas({ scroll, isMobile }: any) {
  return (
    <Canvas
      camera={{
        position: [0, isMobile ? -0.4 : 0, isMobile ? 10 : 8],
        fov: isMobile ? 64 : 50
      }}
      gl={{ antialias: true}}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <HeroScene isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

function ShowcaseCanvas({ active, isMobile }: any) {
  return (
    <Canvas
      camera={{
        position: [0, isMobile ? -0.2 : 0, isMobile ? 9 : 7.5],
        fov: isMobile ? 60 : 50
      }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <NeuralMesh density={isMobile ? 6000 : 16000} intensity={1.2 + active * 0.08} />
        <ElectricNodes active={active} cluster={isMobile ? 12 : 28} />
      </Suspense>
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.12} luminanceSmoothing={0.9} intensity={isMobile ? 0.8 : 1.3} />
        <Noise opacity={isMobile ? 0.02 : 0.03} />
      </EffectComposer>
      <OrbitControls enableZoom={!isMobile} enableRotate={!isMobile} enablePan={!isMobile} />
    </Canvas>
  );
}

export default function Page() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress();
  const isMobile = useIsMobile(900);

  useEffect(() => {
    const f = () => {
      if (!stepsRef.current || !pinRef.current) return;
      const r = stepsRef.current.getBoundingClientRect();
      const total = r.height - (pinRef.current.clientHeight || 1);
      if (total <= 0) return;
      const off = Math.min(Math.max(-r.top, 0), total);
      setActive(Math.min(3, Math.max(0, Math.floor((off / total) * 4))));
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);

  const features = [
    { Icon: Bot, title: "AI-Powered Matching", text: "Advanced AI finds high-ROI creator-brand partnerships." },
    { Icon: Shield, title: "Trust Score System", text: "AI-driven fraud detection for authentic collaborations." },
    { Icon: FileCheck, title: "Smart Contracts", text: "Auto-generated contracts that protect both parties." },
    { Icon: Zap, title: "Escrow Payments", text: "Secure payouts released after verified deliverables." },
    { Icon: ChartBar, title: "Real-Time Analytics", text: "Track campaign ROI, engagement and audience authenticity." },
    { Icon: Users, title: "Portfolio Auto-Sync", text: "Sync Instagram, YouTube & TikTok — stats auto-update." }
  ];

  const steps = [
    { title: "Sign Up", desc: "Create an account in under 60 seconds." },
    { title: "AI Matches", desc: "Get matched with verified creators/brands." },
    { title: "Smart Contract", desc: "Auto contracts protect both parties." },
    { title: "Collaborate", desc: "Work together with tracking and secure payments." }
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Fashion Influencer", score: 98, quote: "Influenco transformed my creator business." },
    { name: "Rajesh Kumar", role: "Marketing Director, TechBrand", score: 95, quote: "The platform shows real ROI and prevents fraudulent partners." },
    { name: "Ananya Desai", role: "Beauty Creator", score: 99, quote: "Escrow payments let me focus on creation, not chasing money." }
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="absolute inset-0 opacity-70">
          <div className="w-full h-full">
            <div className="hidden md:block absolute inset-0">
              <HeroCanvas scroll={progress} isMobile={isMobile} />
            </div>
            <div className="md:hidden block absolute inset-0">
              <HeroCanvas scroll={progress} isMobile />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-blue-400/10 text-pink-300 border border-pink-800/20">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse" />
              Trusted by 10,000+ creators & brands
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
              Where Influence Meets Trust
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl text-purple-200 max-w-3xl">
              AI-powered collaboration platform for creators and brands. Fraud protection, precise matches and guaranteed payouts.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/signup" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 text-black font-semibold shadow-2xl flex items-center gap-2 justify-center"
                >
                  Join the Network
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-black/60 border border-purple-800/30 text-purple-200"
                >
                  Explore Platform
                </motion.button>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl w-full">
              <div className="space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400">10K+</div>
                <div className="text-xs sm:text-sm text-purple-300">Active Users</div>
              </div>

              <div className="space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400">98%</div>
                <div className="text-xs sm:text-sm text-purple-300">Trust Score</div>
              </div>

              <div className="space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400">$2M+</div>
                <div className="text-xs sm:text-sm text-purple-300">Paid Out</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
            <Image src="/image.png" alt="influenco" width={1200} height={800} className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">What Influenco Does</h2>
            <p className="text-purple-300 text-lg">
              We match creators and brands using AI, verify authenticity with trust scores, automate contracts and secure payments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {features.slice(0, 4).map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 p-4 rounded-2xl cursor-pointer bg-gradient-to-br from-black/60 to-black/40 border border-purple-900/20 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-blue-500 flex items-center justify-center text-black">
                    <f.Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{f.title}</div>
                    <div className="text-sm text-purple-300">{f.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">How Influenco Works</h2>
            <p className="text-purple-300 mt-2">From signup to collaboration in four steps</p>
          </div>

          <div ref={stepsRef} className="relative grid md:grid-cols-2 gap-6">
            <div className="space-y-4 px-2">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className={`p-5 rounded-2xl border bg-black/50 shadow-lg transition transform ${
                    active === i ? "scale-102 border-pink-500/40 shadow-2xl" : "border-purple-800/20"
                  }`}
                >
                  <div className="text-lg font-bold text-pink-400 mb-1">{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-xl font-semibold text-white">{s.title}</div>
                  <p className="text-purple-200 mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <div
              ref={pinRef}
              className="sticky top-24 h-[480px] rounded-3xl bg-gradient-to-br from-black/40 to-transparent border border-purple-900/20 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 p-4">
                  <ShowcaseCanvas active={active} isMobile={isMobile} />
                </div>
                <div className="absolute left-4 bottom-4 bg-black/70 px-3 py-2 rounded-xl border border-purple-800/30">
                  <div className="text-xs text-purple-300">Interactive Preview</div>
                  <div className="text-sm font-semibold text-pink-400">Step {active + 1}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, boxShadow: "0 50px 120px rgba(124,28,255,0.12)" }}
                className="p-6 bg-black/50 rounded-2xl border border-purple-900/20 shadow-lg cursor-pointer transform"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 text-black">
                  <f.Icon className="w-6 h-6" />
                </div>
                <div className="font-semibold text-white text-lg mb-2">{f.title}</div>
                <div className="text-purple-300">{f.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Trusted by Creators & Brands</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="p-6 bg-black/50 rounded-2xl border border-purple-900/20 shadow-lg cursor-pointer transform"
              >
                <p className="italic text-purple-200">"{t.quote}"</p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-purple-300">{t.role}</div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                    ✔ {t.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-purple-900/10 py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center text-black font-bold">
                IN
              </div>
              <div>
                <div className="font-bold text-white">INFLUENCO</div>
                <div className="text-sm text-purple-300">AI · Trust · Collaboration</div>
              </div>
            </div>

            <p className="mt-3 text-purple-300 text-sm">
              The AI-first platform for creator-brand collaborations.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-3 text-white">Product</div>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>
                <a className="hover:text-pink-400 transition" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-pink-400 transition" href="#how-it-works">
                  How It Works
                </a>
              </li>
              <li>
                <a className="hover:text-pink-400 transition" href="/pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3 text-white">Company</div>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>
                <a className="hover:text-pink-400 transition" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-pink-400 transition" href="/careers">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-pink-400 transition" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-6 text-center text-sm text-purple-300">
          © {new Date().getFullYear()} INFLUENCO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
