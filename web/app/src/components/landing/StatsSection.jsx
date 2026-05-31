import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Entity Types", sub: "powering the backend" },
  { value: "6", label: "Match Factors", sub: "in the algorithm" },
  { value: "100%", label: "DEI Focused", sub: "by design" },
  { value: "∞", label: "Skill Types", sub: "SFIA & custom" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 bg-primary">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl font-black text-primary-foreground">
              {s.value}
            </p>
            <p className="text-sm font-semibold text-primary-foreground mt-1">
              {s.label}
            </p>
            <p className="text-xs text-primary-foreground/60 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
