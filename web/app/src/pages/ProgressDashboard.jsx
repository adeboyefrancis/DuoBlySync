import React, { useState } from "react";
// 🚀 Fixed: Imported useAuth and removed the broken axios import
import { useAuth } from "@/lib/AuthContext";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import SkillTracker from "@/components/dashboard/SkillTracker";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Target,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  Clock,
  Star,
  ChevronRight,
  Award,
  Brain,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ── Demo data ─────────────────────────────────── */
const sessionProgressData = [
  { month: "Jan", sessions: 2, goals: 1 },
  { month: "Feb", sessions: 3, goals: 2 },
  { month: "Mar", sessions: 2, goals: 1 },
  { month: "Apr", sessions: 4, goals: 3 },
  { month: "May", sessions: 5, goals: 2 },
  { month: "Jun", sessions: 3, goals: 4 },
];

const skillProgressData = [
  { month: "Jan", level: 2 },
  { month: "Feb", level: 2 },
  { month: "Mar", level: 3 },
  { month: "Apr", level: 3 },
  { month: "May", level: 4 },
  { month: "Jun", level: 4 },
];

const demoGoals = [
  {
    id: 1,
    title: "Achieve AWS Solutions Architect",
    category: "certification",
    progress: 65,
    status: "in_progress",
    target_date: "2025-09-01",
    skill: "Cloud Computing",
    current: 3,
    target: 5,
  },
  {
    id: 2,
    title: "Build a CI/CD Pipeline Project",
    category: "project_completion",
    progress: 40,
    status: "in_progress",
    target_date: "2025-07-15",
    skill: "DevOps",
    current: 2,
    target: 4,
  },
  {
    id: 3,
    title: "Learn Python for Data Pipelines",
    category: "skill_development",
    progress: 80,
    status: "in_progress",
    target_date: "2025-06-30",
    skill: "Python",
    current: 3,
    target: 4,
  },
  {
    id: 4,
    title: "Contribute to Open Source Project",
    category: "networking",
    progress: 100,
    status: "completed",
    target_date: "2025-05-01",
    skill: "GitHub",
    current: 4,
    target: 4,
  },
];

const demoSessions = [
  {
    id: 1,
    title: "Career Path Deep Dive",
    type: "career_planning",
    date: "2025-05-20 10:00",
    duration: 60,
    status: "scheduled",
    mentor: "Sarah Chen",
  },
  {
    id: 2,
    title: "AWS Exam Strategy Review",
    type: "goal_review",
    date: "2025-05-14 14:00",
    duration: 45,
    status: "completed",
    mentor: "Sarah Chen",
    rating: 5,
  },
  {
    id: 3,
    title: "CI/CD Hands-On Pairing",
    type: "body_doubling",
    date: "2025-05-07 11:00",
    duration: 90,
    status: "completed",
    mentor: "Sarah Chen",
    rating: 4,
  },
  {
    id: 4,
    title: "Python Script Review",
    type: "skill_assessment",
    date: "2025-04-29 15:00",
    duration: 60,
    status: "completed",
    mentor: "Sarah Chen",
    rating: 5,
  },
];

const skillBreakdown = [
  { name: "Cloud Computing", value: 35, color: "#6366f1" },
  { name: "DevOps", value: 25, color: "#06b6d4" },
  { name: "Python", value: 25, color: "#a855f7" },
  { name: "Other", value: 15, color: "#e2e8f0" },
];

const mentorStats = [
  {
    label: "Active Mentees",
    value: 3,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Sessions Given",
    value: 47,
    icon: CalendarDays,
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Goals Supported",
    value: 18,
    icon: Target,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    label: "Avg Rating",
    value: "4.9",
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

const menteeStats = [
  {
    label: "Sessions Done",
    value: 12,
    icon: CalendarDays,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Goals Active",
    value: 3,
    icon: Target,
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Skills Levelled",
    value: 4,
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    label: "Focus Sessions",
    value: 8,
    icon: Brain,
    color: "text-teal-600",
    bg: "bg-teal-500/10",
  },
];

const statusColors = {
  in_progress: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  not_started: "bg-secondary text-muted-foreground border-border",
  on_hold: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const sessionTypeColors = {
  career_planning: "bg-indigo-500/10 text-indigo-600",
  goal_review: "bg-emerald-500/10 text-emerald-600",
  body_doubling: "bg-teal-500/10 text-teal-600",
  skill_assessment: "bg-amber-500/10 text-amber-600",
  focus_session: "bg-purple-500/10 text-purple-600",
};

function StatCard({ stat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + i * 0.07 }}
      className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
    >
      <div
        className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
      >
        <stat.icon className={`w-5 h-5 ${stat.color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        <p className="text-xs text-muted-foreground">{stat.label}</p>
      </div>
    </motion.div>
  );
}

function GoalCard({ goal, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + i * 0.07 }}
      className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground leading-snug">
            {goal.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-mono text-muted-foreground">
              {goal.skill}
            </span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <span className="text-[10px] text-muted-foreground">
              Due{" "}
              {new Date(goal.target_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] shrink-0 ${statusColors[goal.status]}`}
        >
          {goal.status === "in_progress"
            ? "In Progress"
            : goal.status === "completed"
              ? "✓ Done"
              : goal.status}
        </Badge>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>Progress</span>
          <span className="font-medium text-foreground">{goal.progress}%</span>
        </div>
        <Progress value={goal.progress} className="h-2" />
      </div>
      {goal.current && (
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5, 6, 7].slice(0, goal.target).map((l) => (
            <div
              key={l}
              className={`flex-1 h-1.5 rounded-full ${l <= goal.current ? "bg-primary" : l <= goal.target ? "bg-primary/20" : "bg-secondary"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            L{goal.current}→L{goal.target}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function SessionRow({ session, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + i * 0.06 }}
      className="flex items-center gap-3 py-3 border-b border-border last:border-0"
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${sessionTypeColors[session.type] || "bg-secondary text-muted-foreground"}`}
      >
        {session.status === "completed" ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Clock className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight truncate">
          {session.title}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {new Date(session.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          · {session.duration}min
        </p>
      </div>
      <div className="shrink-0 text-right">
        {session.status === "scheduled" ? (
          <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Upcoming
          </Badge>
        ) : session.rating ? (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: session.rating }).map((_, j) => (
              <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function ProgressDashboard() {
  const [view, setView] = useState("mentee");

  // 🚀 Fixed: Extracted user dynamically from your updated local hook (removes broken useEffect setup)
  const { user } = useAuth();

  const stats = view === "mentee" ? menteeStats : mentorStats;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Progress Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Mentor &amp; Mentee workspace preview
              </p>
            </div>
          </div>
          <div className="sm:ml-auto">
            <Tabs value={view} onValueChange={setView}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="mentee" className="text-xs gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Mentee View
                </TabsTrigger>
                <TabsTrigger value="mentor" className="text-xs gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Mentor View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Profile header */}
        <ProfileHeader user={user} view={view} />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} i={i} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions + goals over time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card border border-border rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {view === "mentee"
                ? "Sessions & Goals Over Time"
                : "Sessions Delivered Over Time"}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Last 6 months activity
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sessionProgressData}>
                <defs>
                  <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="hsl(var(--primary))"
                  fill="url(#sessionGrad)"
                  strokeWidth={2}
                  name="Sessions"
                />
                {view === "mentee" && (
                  <Area
                    type="monotone"
                    dataKey="goals"
                    stroke="#06b6d4"
                    fill="url(#goalGrad)"
                    strokeWidth={2}
                    name="Goals Updated"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill focus pie */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Skill Focus Split
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Session time by skill area
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={skillBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {skillBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [`${v}%`]}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {skillBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="text-xs text-muted-foreground flex-1 truncate">
                    {s.name}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {s.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill level progress (mentee only) */}
        {view === "mentee" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Skill Level Progression
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Cloud Computing SFIA level over time
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={skillProgressData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  domain={[1, 7]}
                  ticks={[1, 2, 3, 4, 5, 6, 7]}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`Level ${v}`, "SFIA Level"]}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Goals + Sessions two-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goals */}
          {view === "mentee" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Active Goals
                </h3>
                <Badge variant="outline" className="text-[10px]">
                  {demoGoals.length} total
                </Badge>
              </div>
              <div className="space-y-3">
                {demoGoals.map((goal, i) => (
                  <GoalCard key={goal.id} goal={goal} i={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Mentor: Mentee overview */}
          {view === "mentor" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">
                  My Mentees
                </h3>
                <Badge variant="outline" className="text-[10px]">
                  3 active
                </Badge>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Marcus Rivera",
                    progress: 65,
                    skill: "Cloud Computing",
                    next: "May 20",
                  },
                  {
                    name: "Aisha Okonkwo",
                    progress: 42,
                    skill: "Data Science",
                    next: "May 22",
                  },
                  {
                    name: "Liam Torres",
                    progress: 88,
                    skill: "DevOps",
                    next: "May 25",
                  },
                ].map((mentee, i) => (
                  <motion.div
                    key={mentee.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {mentee.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {mentee.name}
                        </p>
                        <span className="text-[11px] text-muted-foreground shrink-0">
                          Next: {mentee.next}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={mentee.progress}
                          className="h-1.5 flex-1"
                        />
                        <span className="text-[11px] text-muted-foreground shrink-0">
                          {mentee.progress}%
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {mentee.skill}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                {view === "mentee" ? "Recent Sessions" : "Upcoming & Recent"}
              </h3>
              <Badge variant="outline" className="text-[10px]">
                {demoSessions.length} sessions
              </Badge>
            </div>
            <div>
              {demoSessions.map((session, i) => (
                <SessionRow key={session.id} session={session} i={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Tracker */}
        {view === "mentee" && <SkillTracker />}

        {/* Neurodiversity & Focus sessions note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Brain className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Neurodiversity &amp; Focus Session Tracking
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Body doubling, accountability check-ins and quiet focus sessions
                are tracked separately via the
                <code className="font-mono text-teal-600 mx-1">
                  FocusSession
                </code>{" "}
                entity. Mentees can flag accommodation preferences (visual aids,
                written summaries, structured agendas) directly in their
                profile. Mentors who support neurodivergent mentees are surfaced
                higher in compatible matches.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
