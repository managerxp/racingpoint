"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.dob ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setError("");

        // Store token in localStorage
        if (data.data.token) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }

        // Navigate to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join RacingPoint and start racing</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-lg">
              <p className="text-green-400 font-semibold">✓ Account created successfully!</p>
              <p className="text-green-300 text-sm mt-1">Redirecting to login page...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg">
              <p className="text-red-400 font-semibold">✗ {error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* First Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="John"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Doe"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1234567890"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="w-full bg-black border border-gray-600 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg py-3 px-4 transition"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="text-gray-400 text-xs">
              <label className="hover:text-gray-300 transition">
                <input type="checkbox" className="mr-2" required />
                I agree to the Terms & Conditions
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 hover:text-red-500 transition font-semibold">
                Login
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <button className="w-full border border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600 font-semibold py-2 px-6 rounded-lg transition">
              Sign Up with Google
            </button>
            <button className="w-full border border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600 font-semibold py-2 px-6 rounded-lg transition">
              Sign Up with Discord
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
