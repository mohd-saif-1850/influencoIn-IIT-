"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    pass?: string;
  }>({});

  const validate = () => {
    const e: any = {};

    if (!fullName.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email format";

    if (!pass.trim()) e.pass = "Password is required";
    else if (pass.length < 6) e.pass = "Password must be at least 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = "/verify";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none focus:border-blue-500"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none focus:border-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none focus:border-blue-500"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.pass && (
              <p className="text-red-500 text-xs mt-1">{errors.pass}</p>
            )}
          </div>
          <Link href="/verify-otp" className="block">
            <button
              type="submit"
              className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-2xl"
              onClick={(e) => {
                if (!validate()) {
                  e.preventDefault();
                }
              }}
            >
              Create Account
            </button>
          </Link>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 cursor-pointer font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
