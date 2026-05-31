import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { axios } from "@/api/DuoBlySyncClient";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Tinder of Mentorship
          <Heart className="w-3.5 h-3.5 fill-current" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-tight tracking-tight"
        >
          Find your perfect
          <br />
          <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
            mentor match.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          DuoBlySync connects mentors and mentees through skill-based matching,
          SFIA frameworks and neurodiversity-inclusive focus sessions. Swipe.
          Match. Grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => axios.auth.redirectToLogin("/dashboard")}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
          >
            Get Started — it's free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => axios.auth.redirectToLogin("/dashboard")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm text-foreground font-semibold text-sm hover:bg-secondary transition-all hover:scale-105"
          >
            Sign In
          </button>
        </motion.div>

        {/* Floating card preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative"
        >
          <div className="flex items-end justify-center gap-4">
            {/* Mentee card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block bg-card border border-border rounded-2xl p-4 shadow-xl w-44 -rotate-6 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-lg mb-2">
                👩‍💻
              </div>
              <p className="text-xs font-bold text-foreground">Marcus R.</p>
              <p className="text-[10px] text-muted-foreground">
                Cloud Computing · L3
              </p>
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/10 text-purple-600 rounded-full">
                  DevOps
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">
                  Python
                </span>
              </div>
            </motion.div>

            {/* Match bubble */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="bg-primary rounded-2xl p-5 shadow-2xl shadow-primary/30 flex flex-col items-center gap-1 z-10"
            >
              <Heart className="w-8 h-8 text-primary-foreground fill-current" />
              <p className="text-primary-foreground font-black text-lg leading-none">
                92%
              </p>
              <p className="text-primary-foreground/70 text-[10px] font-medium">
                Match
              </p>
            </motion.div>

            {/* Mentor card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="hidden sm:block bg-card border border-border rounded-2xl p-4 shadow-xl w-44 rotate-6 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-lg mb-2">
                👨‍🏫
              </div>
              <p className="text-xs font-bold text-foreground">Sarah C.</p>
              <p className="text-[10px] text-muted-foreground">
                Cloud Architect · 8yrs
              </p>
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-600 rounded-full">
                  AWS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full">
                  Agile
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
