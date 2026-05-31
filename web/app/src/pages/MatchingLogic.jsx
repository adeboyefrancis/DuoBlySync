import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Sliders,
  CheckCircle2,
  Circle,
  ArrowRight,
  BarChart2,
  Star,
  Brain,
  Users,
  Target,
  Clock,
  MessageSquare,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const scoringFactors = [
  {
    id: "skills",
    label: "Skill Alignment",
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
    weight: 35,
    description:
      "Matches mentor SFIA/custom skills against mentee target skills. Scores overlap and level gap.",
    formula: "overlapping_skills / total_target_skills × (1 - avg_level_gap/7)",
    max: 35,
  },
  {
    id: "industry",
    label: "Industry Match",
    icon: BarChart2,
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
    weight: 20,
    description:
      "Full score if mentor industry matches mentee target. Partial if adjacent industries.",
    formula: "exact_match → 20pts | adjacent_match → 10pts | no_match → 0pts",
    max: 20,
  },
  {
    id: "style",
    label: "Mentorship Style",
    icon: Sliders,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    weight: 15,
    description:
      "Compares preferred mentorship approach between mentor and mentee.",
    formula: "exact_match → 15pts | compatible → 8pts | incompatible → 0pts",
    max: 15,
  },
  {
    id: "availability",
    label: "Availability",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    weight: 15,
    description:
      "Checks if both parties have compatible weekly time commitments.",
    formula: "compatible_hours → 15pts | partial → 7pts | mismatch → 0pts",
    max: 15,
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    weight: 10,
    description:
      "Scores overlap in preferred communication formats (video, chat, etc.).",
    formula: "shared_formats / max(mentor_formats, mentee_formats) × 10",
    max: 10,
  },
  {
    id: "neurodiversity",
    label: "Inclusion Support",
    icon: Brain,
    color: "text-rose-600",
    bg: "bg-rose-500/10",
    weight: 5,
    description:
      "Bonus if mentor supports neurodiversity and mentee has flagged inclusion needs.",
    formula:
      "mentor.neurodiversity_support && mentee.is_neurodivergent → +5pts",
    max: 5,
  },
];

const demoMentor = {
  name: "Sarah Chen",
  skills: ["Cloud Computing", "DevOps", "Python", "Agile"],
  industry: "Cloud Computing",
  style: "structured",
  availability: "2_hours_week",
  comms: ["video_call", "text_chat"],
  neurodiversity_support: true,
};

const demoMentee = {
  name: "Marcus Rivera",
  target_skills: ["Cloud Computing", "Python", "Project Management"],
  target_industry: "Cloud Computing",
  style: "structured",
  availability: "2_hours_week",
  comms: ["video_call", "voice_call"],
  is_neurodivergent: true,
};

function computeScore(mentor, mentee, weights) {
  const skillOverlap = mentor.skills.filter((s) =>
    mentee.target_skills.includes(s),
  ).length;
  const skillScore =
    (skillOverlap / mentee.target_skills.length) * weights.skills;

  const industryScore =
    mentor.industry === mentee.target_industry ? weights.industry : 0;

  const styleScore =
    mentor.style === mentee.style
      ? weights.style
      : mentor.style === "flexible"
        ? weights.style * 0.5
        : 0;

  const availScore =
    mentor.availability === mentee.availability
      ? weights.availability
      : weights.availability * 0.5;

  const commOverlap = mentor.comms.filter((c) =>
    mentee.comms.includes(c),
  ).length;
  const commScore =
    (commOverlap / Math.max(mentor.comms.length, mentee.comms.length)) *
    weights.communication;

  const neurodivScore =
    mentor.neurodiversity_support && mentee.is_neurodivergent
      ? weights.neurodiversity
      : 0;

  return {
    skills: Math.round(skillScore),
    industry: Math.round(industryScore),
    style: Math.round(styleScore),
    availability: Math.round(availScore),
    communication: Math.round(commScore),
    neurodiversity: Math.round(neurodivScore),
    total: Math.round(
      skillScore +
        industryScore +
        styleScore +
        availScore +
        commScore +
        neurodivScore,
    ),
  };
}

export default function MatchingLogic() {
  const [weights, setWeights] = useState({
    skills: 35,
    industry: 20,
    style: 15,
    availability: 15,
    communication: 10,
    neurodiversity: 5,
  });

  const scores = computeScore(demoMentor, demoMentee, weights);

  const radarData = scoringFactors.map((f) => ({
    factor: f.label.split(" ")[0],
    score: scores[f.id],
    max: f.max,
  }));

  const barData = scoringFactors.map((f) => ({
    name: f.label,
    score: scores[f.id],
    max: weights[f.id],
    pct: Math.round((scores[f.id] / weights[f.id]) * 100) || 0,
  }));

  const barColors = [
    "#6366f1",
    "#06b6d4",
    "#a855f7",
    "#f59e0b",
    "#10b981",
    "#f43f5e",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Matching Logic
            </h1>
            <p className="text-xs text-muted-foreground">
              Compatibility scoring algorithm — interactive preview
            </p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
              Score: {scores.total} / 100
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Demo pair banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
        >
          {/* Mentor card */}
          <div className="bg-card border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mentor</p>
                <p className="text-sm font-semibold text-foreground">
                  {demoMentor.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {demoMentor.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-700 rounded font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Score bubble */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary flex flex-col items-center justify-center shadow-lg shadow-primary/20"
            >
              <span className="text-2xl font-bold text-primary-foreground">
                {scores.total}
              </span>
              <span className="text-[10px] text-primary-foreground/70">
                / 100
              </span>
            </motion.div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowRight className="w-3 h-3" />
              <span>Compatibility</span>
            </div>
            {scores.total >= 70 && (
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Strong Match
              </Badge>
            )}
          </div>

          {/* Mentee card */}
          <div className="bg-card border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mentee</p>
                <p className="text-sm font-semibold text-foreground">
                  {demoMentee.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {demoMentee.target_skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-1.5 py-0.5 bg-purple-500/10 text-purple-700 rounded font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Score Radar
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="factor"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Radar
                  name="Max"
                  dataKey="max"
                  stroke="hsl(var(--border))"
                  fill="transparent"
                  strokeWidth={1}
                  strokeDasharray="4 2"
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Score Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} layout="vertical" barCategoryGap="30%">
                <XAxis
                  type="number"
                  domain={[0, 35]}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(val, name) => [`${val} pts`, name]}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={barColors[index]}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Interactive weight tuner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Adjust Scoring Weights
            </h3>
            <span className="text-xs text-muted-foreground ml-auto">
              Drag sliders to re-tune the algorithm
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {scoringFactors.map((factor) => (
              <div key={factor.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <factor.icon className={`w-3.5 h-3.5 ${factor.color}`} />
                    <span className="text-sm font-medium text-foreground">
                      {factor.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${factor.color}`}>
                      {scores[factor.id]} / {weights[factor.id]}
                    </span>
                  </div>
                </div>
                <Slider
                  min={0}
                  max={50}
                  step={1}
                  value={[weights[factor.id]]}
                  onValueChange={([val]) =>
                    setWeights((prev) => ({ ...prev, [factor.id]: val }))
                  }
                  className="w-full"
                />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scoring factor cards */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            Algorithm Factor Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoringFactors.map((factor, i) => (
              <motion.div
                key={factor.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${factor.bg} flex items-center justify-center shrink-0`}
                  >
                    <factor.icon className={`w-4 h-4 ${factor.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">
                        {factor.label}
                      </h4>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono"
                      >
                        weight: {weights[factor.id]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {factor.description}
                    </p>
                    <div className="mt-2 p-2 bg-secondary rounded-md">
                      <code className="text-[10px] font-mono text-muted-foreground break-all">
                        {factor.formula}
                      </code>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2">
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(scores[factor.id] / weights[factor.id]) * 100}%`,
                          }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                          className={`h-full rounded-full ${factor.bg.replace("/10", "")}`}
                          style={{ background: barColors[i] }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Non-SFIA skills note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Star className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Non-SFIA & Custom Skills in Matching
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                The <code className="font-mono text-amber-600">Skill</code>{" "}
                entity supports both SFIA-mapped and custom skills (soft skills,
                tools, languages, certifications). In the matching algorithm,
                custom skills are compared by <strong>name match</strong> rather
                than SFIA level gap — so "React.js", "Emotional Intelligence",
                or "AWS Certified" are valid matchable skills alongside SFIA
                codes like PROG or ARCH.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
