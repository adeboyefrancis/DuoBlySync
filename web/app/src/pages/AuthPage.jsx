import React, { useState } from "react";
import { axios } from "@/api/DuoBlySyncClient";
import { Heart, Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Local sign up endpoint
        await axios.post("/auth/signup", {
          email,
          password,
          full_name: fullName,
        });
      }

      // Local login endpoint - should return a token or set a cookie
      const response = await axios.post("/auth/login", { email, password });

      // Store token locally if your Express backend expects it in headers
      const token = response?.data?.token || response?.token;
      if (token) {
        localStorage.setItem("base44_access_token", token);
        localStorage.setItem("token", token);
      }

      // Hard refresh to reload AuthContext with your brand new user session!
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Auth failed:", err);
      setError(
        err.response?.data?.message || err.message || "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-primary-foreground fill-current" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isSignUp ? "Create local account" : "Welcome back"}
          </h2>
          <p className="text-sm text-slate-400">
            DuoBlySync Local Development Environment
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setError("");
              setIsSignUp(!isSignUp);
            }}
            className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
          >
            {isSignUp
              ? "Already have a local profile? Sign in"
              : "Need an account? Register locally"}
          </button>
        </div>
      </div>
    </div>
  );
}
