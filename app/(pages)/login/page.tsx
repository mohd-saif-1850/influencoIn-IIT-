"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<{ email?: string; pass?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const e: any = {};

    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email format";

    if (!pass.trim()) e.pass = "Password is required";
    else if (pass.length < 6) e.pass = "Password must be at least 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    const res = await signIn("credentials", {
      redirect: false,
      identifier: email,
      password: pass,
    });

    if (res?.error) {
      setErrors({ server: res.error });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none focus:border-[#0ABBB7]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none focus:border-[#7A4CD9]"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.pass && <p className="text-red-500 text-xs mt-1">{errors.pass}</p>}
          </div>

          {errors.server && (
            <p className="text-red-500 text-xs text-center">{errors.server}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white font-semibold rounded-2xl disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#0ABBB7] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
