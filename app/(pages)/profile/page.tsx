"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState<any>({
    name: "",
    username: "",
    email: "",
    gender: "",
    mobileNumber: "",
    profilePic: "",
    subscription: "Free",
  });

  const [originalData, setOriginalData] = useState<any>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/auth/get-user");

      if (res.data?.success && res.data.user) {
        setData(res.data.user);
        setOriginalData(res.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }

    setIsEditing(false);
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const startEditing = () => {
    setOriginalData({ ...data });
    setIsEditing(true);
    setMsg("");
  };

  const cancelEditing = () => {
    setData(originalData);
    setIsEditing(false);
    setMsg("");
  };

  const saveProfile = async () => {
    setSaving(true);

    try {
      const res = await axios.patch("/api/auth/update-user", {
        name: data.name,
        username: data.username,
        gender: data.gender,
        mobileNumber: data.mobileNumber,
      });

      setMsg(res.data?.message || "Profile updated.");
      setIsEditing(false);
      loadProfile();
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Failed to update.");
    }

    setSaving(false);
  };

  const uploadPicture = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4_000_000) {
      setMsg("Image too large (max 4MB).");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      setUploading(true);

      try {
        const res = await axios.patch("/api/auth/change-picture", {
          image: reader.result,
        });

        if (res.data?.success) {
          setData((prev: any) => ({ ...prev, profilePic: res.data.profilePic }));
        }
      } catch {
        setMsg("Failed to upload.");
      }

      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#0A1A3F]">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Please Login</h2>
        <p className="text-[#0A1A3F]/70 mb-6">
          Login to manage your profile.
        </p>

        <Link
          href="/login"
          className="px-6 py-3 bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9] text-white rounded-xl shadow-md"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 sm:px-6 py-10 text-[#0A1A3F]">
      <div className="max-w-3xl mx-auto p-6 sm:p-10 border rounded-3xl shadow bg-white">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Your Profile
          </h1>

          {!isEditing ? (
            <button
              onClick={startEditing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9]
              text-white font-semibold shadow-md hover:scale-[1.02] transition"
            >
              Edit Details
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={cancelEditing}
                className="px-5 py-2 rounded-xl border font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0ABBB7] to-[#7A4CD9]
                text-white font-semibold disabled:opacity-60 shadow-md"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* MESSAGE */}
        {msg && (
          <div className="text-center mb-4 text-[#7A4CD9] font-medium">
            {msg}
          </div>
        )}

        {/* PROFILE IMAGE + EDIT BUTTON */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
            <Image
              src={data.profilePic || "/default-avatar.png"}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {isEditing && (
            <>
              <label
                htmlFor="profilePicInput"
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-[#0ABBB7] text-white 
                rounded-full text-sm cursor-pointer shadow hover:scale-105 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l6-6 3.536 3.536-6 6H9v-3.536z"
                  />
                </svg>
                {uploading ? "Uploading..." : "Change Picture"}
              </label>

              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadPicture}
              />
            </>
          )}
        </div>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full px-4 py-2 border rounded-xl outline-none
              ${isEditing ? "focus:ring-2 focus:ring-[#7A4CD9]/40 hover:shadow bg-white"
                : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              name="username"
              value={data.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full px-4 py-2 border rounded-xl outline-none
              ${isEditing ? "focus:ring-2 focus:ring-[#7A4CD9]/40 hover:shadow bg-white"
                : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={data.email}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-xl bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              name="mobileNumber"
              value={data.mobileNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full px-4 py-2 border rounded-xl outline-none
              ${isEditing ? "focus:ring-2 focus:ring-[#7A4CD9]/40 hover:shadow bg-white"
                : "bg-gray-100 cursor-not-allowed"}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 w-full px-4 py-2 border rounded-xl outline-none
              ${isEditing ? "focus:ring-2 focus:ring-[#7A4CD9]/40 hover:shadow bg-white"
                : "bg-gray-100 cursor-not-allowed"}`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Subscription</label>
            <input
              value={data.subscription}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-xl bg-gray-100 cursor-not-allowed"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
