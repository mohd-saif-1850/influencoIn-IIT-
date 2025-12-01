"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how" },
    { name: "Pricing", href: "/pricing" },
    { name: "AI Chatbot", href: "/influenco-ai" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/" className="cursor-pointer">
            <Image src="/InfluencoLogo.png" alt="Influenco Logo" width={60} height={60} priority />
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div key={link.name} whileHover={{ scale: 1.08 }}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? "text-[#0ABBB7] font-semibold"
                      : "text-[#0A1A3F] hover:text-[#7A4CD9]"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}

          {!session ? (
            <>
              <motion.div whileHover={{ scale: 1.07 }}>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-[#0A1A3F] border border-[#0ABBB7]/40 hover:border-[#7A4CD9] transition"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/get-start"
                  className="px-6 py-2.5 font-semibold text-white rounded-2xl cursor-pointer bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] shadow-sm"
                >
                  Get Started
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.07 }}>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl text-[#0A1A3F] border border-[#0ABBB7]/40 hover:border-[#7A4CD9] transition"
                >
                  Dashboard
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2.5 font-semibold text-white rounded-2xl cursor-pointer bg-gradient-to-r from-[#7A4CD9] to-[#0ABBB7] shadow-sm"
                >
                  Logout
                </button>
              </motion.div>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg border border-neutral-300 cursor-pointer"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 cursor-pointer"
          />

          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-6 z-50"
          >
            <button onClick={() => setOpen(false)} className="self-end mb-4 cursor-pointer">
              <X size={25} />
            </button>

            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium cursor-pointer ${
                    isActive ? "text-[#0ABBB7] font-semibold" : "text-[#0A1A3F] hover:text-[#7A4CD9]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {!session ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#0A1A3F] border border-[#0ABBB7]/40 transition"
                >
                  Login
                </Link>

                <Link
                  href="/get-start"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2.5 font-semibold text-white rounded-2xl cursor-pointer bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-center block shadow"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#0A1A3F] border border-[#0ABBB7]/40 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="px-6 py-2.5 font-semibold text-white rounded-2xl cursor-pointer bg-gradient-to-r from-[#7A4CD9] to-[#0ABBB7] text-center block shadow"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </nav>
  );
}
