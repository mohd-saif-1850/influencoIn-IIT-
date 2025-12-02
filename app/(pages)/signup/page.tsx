"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const influencerCategories = [
    "Fashion",
    "Beauty",
    "Fitness",
    "Travel",
    "Gaming",
    "Tech",
    "Lifestyle",
    "Food",
    "Motivation",
    "Education",
    "Other",
  ];

  const brandCategories = [
    "E-commerce",
    "Clothing",
    "Tech Brand",
    "Beauty Brand",
    "Food Brand",
    "Fitness Brand",
    "Travel Agency",
    "Gaming Company",
    "Education Company",
    "Lifestyle Brand",
    "Other",
  ];

  const [errors, setErrors] = useState({
    username: "",
    mobile: "",
    email: "",
    pass: "",
    role: "",
    category: "",
    api: "",
  });

  const validate = () => {
    const e: any = {};
    if (!username.trim()) e.username = "Username is required";
    if (!mobileNumber.trim()) e.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(mobileNumber)) e.mobile = "Please Enter a Valid 10 Digit Mobile Number";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email format";
    if (!pass.trim()) e.pass = "Password is required";
    else if (pass.length < 6) e.pass = "Password must be at least 6 characters";
    if (!role.trim()) e.role = "Role is required";
    if (!category.trim()) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({ username: "", mobile: "", email: "", pass: "", role: "", category: "", api: "" });

    try {
      const finalCategory = category === "Other" ? otherCategory : category;

      const res = await axios.post("/api/auth/register-user", {
        username,
        mobileNumber,
        email,
        password: pass,
        role,
        category: finalCategory,
      });

      if (res.data.success) {
        localStorage.setItem("verifyEmail", email);
        window.location.href = "/verify-otp";
      }
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        api: err?.response?.data?.message || "Something went wrong",
      }));
    } finally {
      setLoading(false);
    }
  };

  const categories = role === "Influencer" ? influencerCategories : role === "Brand" ? brandCategories : [];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-200 rounded-2xl shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {errors.api && <div className="text-red-500 text-sm text-center">{errors.api}</div>}

          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none bg-white"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setCategory("");
                setOtherCategory("");
              }}
            >
              <option value="">Select Role</option>
              <option value="Influencer">Influencer</option>
              <option value="Brand">Brand</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {role && (
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          )}

          {category === "Other" && (
            <div>
              <label className="text-sm font-medium">Other Category</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none"
                placeholder="Enter your category"
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none"
              placeholder="9876543210"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none"
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
              className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-xl outline-none"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.pass && <p className="text-red-500 text-xs mt-1">{errors.pass}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white font-semibold rounded-2xl disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0ABBB7] cursor-pointer font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
