// "use client";

// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// interface LinkType {
//   name: string;
//   href: string;
// }

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   const links: LinkType[] = [
//     { name: "Features", href: "/#features" },
//     { name: "How It Works", href: "/#how" },
//     { name: "Pricing", href: "/#pricing" },
//     { name: "Login", href: "/login" },
//   ];

//   return (
//     <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//           <Link href="/">
//             <Image src="/InfluencoLogo.png" alt="Influenco Logo" width={60} height={60} />
//           </Link>
//         </motion.div>

//         <div className="hidden md:flex items-center gap-8">
//           {links.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
//                 <Link
//                   href={link.href}
//                   className={`text-sm font-medium transition ${
//                     isActive ? "text-purple-600 font-semibold" : "hover:text-blue-600"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               </motion.div>
//             );
//           })}

//           <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//             <Link
//               href="#start"
//               className="px-6 py-2.5 font-semibold text-white rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500"
//             >
//               Get Started
//             </Link>
//           </motion.div>
//         </div>

//         <button
//           onClick={() => setOpen(true)}
//           className="md:hidden p-2 rounded-lg border border-neutral-300"
//         >
//           <Menu size={22} />
//         </button>
//       </div>

//       {open && (
//         <>
//           <div
//             onClick={() => setOpen(false)}
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
//           />

//           <motion.div
//             initial={{ x: 200 }}
//             animate={{ x: 0 }}
//             className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-6 z-50"
//           >
//             <button onClick={() => setOpen(false)} className="self-end mb-4">
//               <X size={25} />
//             </button>

//             {links.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   onClick={() => setOpen(false)}
//                   className={`text-lg font-medium ${
//                     isActive ? "text-purple-600 font-semibold" : "hover:text-blue-600"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               );
//             })}

//             <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//               <Link
//                 href="#start"
//                 onClick={() => setOpen(false)}
//                 className="px-6 py-2.5 font-semibold text-white rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 text-center block"
//               >
//                 Get Started
//               </Link>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </nav>
//   );
// }


"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Login", href: "/login" }
  ];

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-purple-900/20 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/">
            <Image src="/InfluencoLogo.png" alt="Influenco Logo" width={58} height={58} className="rounded-xl" />
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    active
                      ? "text-pink-400 font-semibold"
                      : "text-purple-300 hover:text-pink-400"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#start"
              className="px-6 py-2.5 font-semibold text-black rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg border border-purple-800/30 text-purple-200"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: 260 }}
            animate={{ x: 0 }}
            className="fixed right-0 top-0 h-full w-72 bg-black/90 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-6 z-50 border-l border-purple-900/30"
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end mb-4 text-purple-200"
            >
              <X size={26} />
            </button>

            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium ${
                    active
                      ? "text-pink-400 font-semibold"
                      : "text-purple-200 hover:text-pink-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#start"
                onClick={() => setOpen(false)}
                className="px-6 py-3 font-semibold text-black rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 text-center block shadow-xl"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </nav>
  );
}
