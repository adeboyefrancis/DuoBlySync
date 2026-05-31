import React from "react";
import { motion } from "framer-motion";
import { Database, Layers, GitBranch, Shield } from "lucide-react";

export default function StatsBar({
  entityCount,
  totalFields,
  relationships,
  integrations,
}) {
  const stats = [
    {
      label: "Entities",
      value: entityCount,
      icon: Database,
      color: "text-primary",
    },
    {
      label: "Total Fields",
      value: totalFields,
      icon: Layers,
      color: "text-accent",
    },
    {
      label: "Relationships",
      value: relationships,
      icon: GitBranch,
      color: "text-purple-500",
    },
    {
      label: "Integrations",
      value: integrations,
      icon: Shield,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
        >
          <div className={`${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
