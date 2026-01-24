"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Simulate login
    setSubmitted(true);
    setError("");
    
    // Reset form
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setPassword("");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to your RacingPoint account</p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-lg">
              <p className="text-green-400 font-semibold">✓ Login successful!</p>
              <p className="text-green-300 text-sm mt-1">Welcome to RacingPoint!</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg">
              <p className="text-red-400 font-semibold">✗ {error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="text-gray-400 hover:text-gray-300 transition">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-red-600 hover:text-red-500 transition">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 mt-8"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-600 hover:text-red-500 transition font-semibold">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full border border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600 font-semibold py-2 px-6 rounded-lg transition">
              Continue with Google
            </button>
            <button className="w-full border border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600 font-semibold py-2 px-6 rounded-lg transition">
              Continue with Discord
            </button>
          </div>
        </div>

        {/* Back Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-gray-300 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
