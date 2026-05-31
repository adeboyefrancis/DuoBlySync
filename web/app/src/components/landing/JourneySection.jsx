import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  Heart,
  MessageSquare,
  Target,
  Brain,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    emoji: "👤",
    step: "01",
    title: "Create Your Profile",
    desc: "Set your SFIA skills, career goals, industry focus and neurodiversity preferences. Takes 3 minutes.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/20",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    side: "left",
  },
  {
    icon: Search,
    emoji: "🔍",
    step: "02",
    title: "Discover Matches",
    desc: "Our algorithm scores compatibility across skills, availability, communication style and inclusion support.",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
    side: "right",
  },
  {
    icon: Heart,
    emoji: "💜",
    step: "03",
    title: "Swipe & Match",
    desc: "Like mentor or mentee profiles. When both sides like each other — it's a match. Just like Tinder, but for careers.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/20",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-500/10",
    side: "left",
  },
  {
    icon: MessageSquare,
    emoji: "💬",
    step: "04",
    title: "Connect & Plan",
    desc: "Chat, schedule sessions, set shared goals and define your mentorship format together.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    side: "right",
  },
  {
    icon: Target,
    emoji: "🎯",
    step: "05",
    title: "Track Progress",
    desc: "Monitor skill level growth, goal milestones and session outcomes on your personal dashboard.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    side: "left",
  },
  {
    icon: Brain,
    emoji: "🧠",
    step: "06",
    title: "Focus Together",
    desc: "Body doubling, accountability check-ins and quiet focus sessions — built for neurodivergent minds.",
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-500/10",
    side: "right",
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            From stranger to mentor match
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Six steps. Zero awkward cold emails.
          </p>
        </motion.div>

        <div className="relative">
          {/* Centre line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: step.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex items-center gap-6 md:gap-0 ${step.side === "right" ? "md:flex-row-reverse" : ""}`}
              >
                {/* Card */}
                <div
                  className={`flex-1 ${step.side === "left" ? "md:pr-12" : "md:pl-12"}`}
                >
                  <div
                    className={`bg-card border ${step.border} rounded-2xl p-5 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0`}
                      >
                        <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">
                            {step.step}
                          </span>
                          <h3 className="text-sm font-bold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Centre dot */}
                <div className="hidden md:flex w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md shrink-0 z-10" />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
