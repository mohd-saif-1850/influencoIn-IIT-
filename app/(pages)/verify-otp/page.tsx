"use client";

import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyPage() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const submitOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setMsg("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post("/api/auth/verify-user", {
        email,
        otp: code,
      });

      if (res.data.success) {
        setMsg("OTP Verified! Redirecting...");
        setTimeout(() => {
          localStorage.removeItem("verifyEmail");
          window.location.href = "/login";
        }, 1500);
      } else {
        setMsg(res.data.message);
      }
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Verification failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-center mb-1">Verify OTP</h1>
        <p className="text-sm text-neutral-600 text-center mb-6">
          Enter the 6-digit code sent to
        </p>

        <div className="bg-[#E8F7FA] border border-[#0ABBB7]/30 text-[#0A1A3F] text-center py-2 rounded-xl mb-4 font-medium">
          {email || "your email"}
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border border-neutral-300 rounded-xl outline-none focus:border-[#0ABBB7]"
            />
          ))}
        </div>

        {msg && (
          <p className="text-center text-sm mb-3 text-red-500 font-medium">
            {msg}
          </p>
        )}

        <button
          onClick={submitOtp}
          disabled={loading}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white font-semibold rounded-2xl transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        <p className="text-center mt-4 text-sm text-neutral-600">
          Didn’t receive the code?{" "}
          <button className="text-[#7A4CD9] font-medium cursor-pointer">
            Resend
          </button>
        </p>

        <p className="text-center mt-2 text-xs text-neutral-500">
          Wrong email?{" "}
          <Link
            href="/signup"
            className="text-[#0ABBB7] underline cursor-pointer"
          >
            Go back and fix it
          </Link>
        </p>
      </div>
    </div>
  );
}
