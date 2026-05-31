import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const INITIAL_SKILLS = [
  {
    id: 1,
    name: "Cloud Computing",
    code: "CLDD",
    current: 4,
    target: 6,
    category: "cloud",
  },
  {
    id: 2,
    name: "DevOps",
    code: "DOPS",
    current: 3,
    target: 5,
    category: "devops",
  },
  {
    id: 3,
    name: "Python",
    code: "PROG",
    current: 4,
    target: 5,
    category: "dev",
  },
  {
    id: 4,
    name: "Data Science",
    code: "DATS",
    current: 2,
    target: 4,
    category: "data",
  },
  {
    id: 5,
    name: "Security Architecture",
    code: "ARCH",
    current: 2,
    target: 4,
    category: "security",
  },
];

const categoryColors = {
  cloud: "bg-cyan-500/10 text-cyan-600",
  devops: "bg-teal-500/10 text-teal-600",
  dev: "bg-indigo-500/10 text-indigo-600",
  data: "bg-purple-500/10 text-purple-600",
  security: "bg-rose-500/10 text-rose-600",
};

const levelLabels = [
  "",
  "Awareness",
  "Foundation",
  "Practitioner",
  "Advanced",
  "Expert",
  "Thought Leader",
  "Master",
];

export default function SkillTracker() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  function adjustLevel(id, delta) {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next = Math.max(1, Math.min(7, s.current + delta));
        return { ...s, current: next };
      }),
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            SFIA Skill Tracker
          </h3>
        </div>
        <Badge variant="outline" className="text-[10px]">
          {skills.length} skills tracked
        </Badge>
      </div>

      <div className="space-y-3">
        {skills.map((skill, i) => {
          const pct = Math.round((skill.current / 7) * 100);
          const targetPct = Math.round((skill.target / 7) * 100);
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${categoryColors[skill.category] || "bg-secondary text-muted-foreground"}`}
                  >
                    {skill.code}
                  </span>
                  <span className="text-xs font-medium text-foreground truncate">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => adjustLevel(skill.id, -1)}
                    className="w-5 h-5 rounded flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-foreground w-6 text-center">
                    L{skill.current}
                  </span>
                  <button
                    onClick={() => adjustLevel(skill.id, 1)}
                    className="w-5 h-5 rounded flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-muted-foreground ml-1">
                    →L{skill.target}
                  </span>
                </div>
              </div>

              {/* Progress bar with target marker */}
              <div className="relative h-2 bg-secondary rounded-full overflow-visible">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
                {/* Target marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-amber-400 rounded-full"
                  style={{ left: `${targetPct}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {levelLabels[skill.current]}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-1.5 bg-primary rounded-full" />{" "}
          Current level
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-0.5 h-3 bg-amber-400 rounded-full" />{" "}
          Target level
        </span>
      </div>
    </motion.div>
  );
}
