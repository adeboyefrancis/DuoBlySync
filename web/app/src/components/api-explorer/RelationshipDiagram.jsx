import React from "react";
import { motion } from "framer-motion";

const entities = [
  { id: "user", label: "User", x: 50, y: 8, color: "#6366f1" },
  { id: "mentor", label: "MentorProfile", x: 15, y: 30, color: "#06b6d4" },
  { id: "mentee", label: "MenteeProfile", x: 85, y: 30, color: "#8b5cf6" },
  { id: "sfia", label: "SFIASkill", x: 50, y: 30, color: "#f59e0b" },
  { id: "swipe", label: "ProfileSwipe", x: 50, y: 52, color: "#ec4899" },
  { id: "match", label: "MentorshipMatch", x: 50, y: 72, color: "#10b981" },
  { id: "session", label: "MentorshipSession", x: 20, y: 90, color: "#3b82f6" },
  { id: "goal", label: "MentorshipGoal", x: 50, y: 90, color: "#f97316" },
  { id: "message", label: "Message", x: 80, y: 90, color: "#6366f1" },
  { id: "focus", label: "FocusSession", x: 85, y: 60, color: "#14b8a6" },
];

const connections = [
  { from: "user", to: "mentor", label: "has" },
  { from: "user", to: "mentee", label: "has" },
  { from: "mentor", to: "sfia", label: "skills" },
  { from: "mentee", to: "sfia", label: "targets" },
  { from: "mentor", to: "swipe", label: "swipes" },
  { from: "mentee", to: "swipe", label: "swipes" },
  { from: "swipe", to: "match", label: "creates" },
  { from: "match", to: "session", label: "schedules" },
  { from: "match", to: "goal", label: "tracks" },
  { from: "match", to: "message", label: "enables" },
  { from: "user", to: "focus", label: "hosts" },
];

export default function RelationshipDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-card border border-border rounded-xl p-6 overflow-hidden"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Entity Relationships
      </h3>
      <div className="relative w-full" style={{ paddingBottom: "60%" }}>
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="hsl(var(--muted-foreground))"
                opacity="0.4"
              />
            </marker>
          </defs>

          {/* Connection lines */}
          {connections.map((conn, i) => {
            const from = entities.find((e) => e.id === conn.from);
            const to = entities.find((e) => e.id === conn.to);
            if (!from || !to) return null;
            return (
              <motion.line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsl(var(--border))"
                strokeWidth="0.3"
                strokeDasharray="1,1"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              />
            );
          })}

          {/* Entity nodes */}
          {entities.map((entity, i) => (
            <motion.g
              key={entity.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.3,
                ease: "backOut",
              }}
            >
              <circle
                cx={entity.x}
                cy={entity.y}
                r="3.5"
                fill={entity.color}
                opacity="0.15"
              />
              <circle
                cx={entity.x}
                cy={entity.y}
                r="2"
                fill={entity.color}
                opacity="0.9"
              />
              <text
                x={entity.x}
                y={entity.y + 5.5}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="2.2"
                fontWeight="500"
                fontFamily="var(--font-sans)"
              >
                {entity.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
}
