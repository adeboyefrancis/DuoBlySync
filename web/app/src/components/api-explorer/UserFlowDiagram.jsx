import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  Heart,
  MessageSquare,
  Target,
  Brain,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Registration",
    desc: "User creates profile with career interests & SFIA skills",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Search,
    title: "Discovery",
    desc: "Browse mentor/mentee profiles matched by interests",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  },
  {
    icon: Heart,
    title: "Matching",
    desc: "Swipe-based mutual interest creates connections",
    color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "Collaboration",
    desc: "Communicate, schedule sessions & define goals",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    icon: Target,
    title: "Progress",
    desc: "Track goals, skills growth & session outcomes",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    icon: Brain,
    title: "Focus",
    desc: "Body doubling & accountability sessions",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
];

export default function UserFlowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
        User Journey Flow
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            className="relative"
          >
            <div
              className={`flex items-start gap-3 p-4 rounded-lg border ${step.color} transition-all hover:scale-[1.02]`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <step.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold">{step.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
