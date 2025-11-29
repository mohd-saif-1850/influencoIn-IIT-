"use client";
import { useRef, ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-center mb-2">Verify OTP</h1>
        <p className="text-sm text-neutral-600 text-center mb-6">
          Enter the 6-digit code we sent to your email
        </p>

        <form className="space-y-6">
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border border-neutral-300 rounded-xl outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <Link
            href="/"
            className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-2xl"
          >
            Verify & Continue
          </Link>
        </form>

        <p className="text-center mt-4 text-sm">
          Didn’t receive the code?{" "}
          <button className="text-blue-600 cursor-not-allowed font-medium" disabled>
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
