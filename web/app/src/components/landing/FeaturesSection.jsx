import React from "react";
import { motion } from "framer-motion";
import { Zap, Brain, Target, Star, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Smart Matching",
    desc: "Multi-factor compatibility scoring across skills, style, availability and communication preferences.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Neurodiversity First",
    desc: "Body doubling, structured agendas, written summaries and quiet focus sessions built in by default.",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    icon: Target,
    title: "SFIA + Custom Skills",
    desc: "Map career growth to SFIA levels or use custom skills like React, Emotional Intelligence or AWS certs.",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  {
    icon: Star,
    title: "Goal Tracking",
    desc: "Set milestones, track SFIA level progression and celebrate completions with your mentor.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Safe & Inclusive",
    desc: "DEI-centred design. Neurodivergent disclosure is optional. Accommodation preferences respected.",
    color: "text-rose-600",
    bg: "bg-rose-500/10",
  },
  {
    icon: Users,
    title: "Dual Workspace",
    desc: "Separate dashboards for mentors and mentees. Each view is tailored to your role.",
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Built different. On purpose.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Not just another networking app. DuoBlySync is designed from the
            ground up for meaningful mentorship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div
                className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
