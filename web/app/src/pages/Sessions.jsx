import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  Star,
  Plus,
  ChevronRight,
  Target,
  Brain,
  Users,
  X,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

let nextId = 6;

const PLATFORMS = [
  {
    id: "meet",
    label: "Google Meet",
    generateLink: () => "https://meet.google.com/new",
  },
  {
    id: "teams",
    label: "Microsoft Teams",
    generateLink: () => "https://teams.microsoft.com/l/meetup-join",
  },
];

const INITIAL_SESSIONS = [
  {
    id: 1,
    title: "Career Path Deep Dive",
    mentor: "Sarah Chen",
    type: "career_planning",
    date: "2026-05-26 10:00",
    duration: 60,
    format: "video_call",
    status: "scheduled",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
    meetLink: "https://meet.google.com/new",
    platformLabel: "Google Meet",
  },
  {
    id: 2,
    title: "AWS Exam Strategy Review",
    mentor: "Sarah Chen",
    type: "goal_review",
    date: "2026-05-20 14:00",
    duration: 45,
    format: "video_call",
    status: "completed",
    rating: 5,
    notes:
      "Covered exam prep timeline, practice questions strategy and gap analysis.",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
  },
  {
    id: 3,
    title: "CI/CD Hands-On Pairing",
    mentor: "Sarah Chen",
    type: "body_doubling",
    date: "2026-05-14 11:00",
    duration: 90,
    format: "video_call",
    status: "completed",
    rating: 4,
    notes:
      "Built a GitHub Actions pipeline together. Deployed to staging successfully.",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
  },
  {
    id: 4,
    title: "Python Script Code Review",
    mentor: "Marcus Lee",
    type: "skill_assessment",
    date: "2026-04-29 15:00",
    duration: 60,
    format: "video_call",
    status: "completed",
    rating: 5,
    notes:
      "Reviewed data pipeline script. Key feedback: use generators for memory efficiency.",
    avatar_emoji: "👨‍🔬",
    avatar_color: "from-purple-400 to-indigo-500",
  },
  {
    id: 5,
    title: "Quiet Focus: AWS Study Block",
    mentor: "Sarah Chen",
    type: "focus_session",
    date: "2026-05-28 09:00",
    duration: 120,
    format: "video_call",
    status: "scheduled",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
    meetLink: "https://meet.google.com/new",
    platformLabel: "Google Meet",
  },
];

const typeConfig = {
  career_planning: {
    label: "Career Planning",
    color: "bg-indigo-500/10 text-indigo-600",
    icon: Target,
  },
  goal_review: {
    label: "Goal Review",
    color: "bg-emerald-500/10 text-emerald-600",
    icon: CheckCircle2,
  },
  body_doubling: {
    label: "Body Doubling",
    color: "bg-teal-500/10 text-teal-600",
    icon: Brain,
  },
  skill_assessment: {
    label: "Skill Assessment",
    color: "bg-amber-500/10 text-amber-600",
    icon: Star,
  },
  focus_session: {
    label: "Focus Session",
    color: "bg-purple-500/10 text-purple-600",
    icon: Brain,
  },
  one_on_one: {
    label: "1:1 Session",
    color: "bg-primary/10 text-primary",
    icon: Users,
  },
};

const formatIcon = { video_call: Video, text_chat: MessageSquare };

function ScheduleModal({ onClose, onSchedule }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "10:00",
    duration: "60",
    type: "one_on_one",
    platform: "meet",
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  function submit() {
    if (!form.title || !form.date) return;
    const platform = PLATFORMS.find((p) => p.id === form.platform);
    onSchedule({
      id: nextId++,
      title: form.title,
      mentor: "Sarah Chen",
      type: form.type,
      date: `${form.date} ${form.time}`,
      duration: parseInt(form.duration),
      format: "video_call",
      status: "scheduled",
      avatar_emoji: "👩‍💻",
      avatar_color: "from-cyan-400 to-blue-500",
      meetLink: platform.generateLink(),
      platformLabel: platform.label,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Schedule a Session
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Session Title
            </label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. AWS Exam Strategy"
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Duration
              </label>
              <select
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              >
                {["30", "45", "60", "90", "120"].map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="one_on_one">1:1 Session</option>
                <option value="goal_review">Goal Review</option>
                <option value="skill_assessment">Skill Assessment</option>
                <option value="career_planning">Career Planning</option>
                <option value="body_doubling">Body Doubling</option>
                <option value="focus_session">Focus Session</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Meeting Platform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => update("platform", p.id)}
                  className={`px-3 py-2 rounded-xl border-2 text-xs font-medium transition ${
                    form.platform === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={!form.title || !form.date}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition disabled:opacity-50"
        >
          Schedule &amp; Generate Link
        </button>
      </motion.div>
    </div>
  );
}

function SessionCard({ session, i }) {
  const [showNotes, setShowNotes] = useState(false);
  const type = typeConfig[session.type] || typeConfig.one_on_one;
  const TypeIcon = type.icon;
  const FormatIcon = formatIcon[session.format] || Video;
  const date = new Date(session.date);
  const isScheduled = session.status === "scheduled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 }}
      className={`bg-card border rounded-2xl p-5 hover:shadow-md transition-all ${
        isScheduled ? "border-primary/30 bg-primary/[0.02]" : "border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${session.avatar_color} flex items-center justify-center shrink-0 text-2xl`}
        >
          {session.avatar_emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground text-sm leading-tight">
                {session.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                with {session.mentor}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`text-[10px] shrink-0 ${
                isScheduled
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {isScheduled ? "Upcoming" : "✓ Done"}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {date.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              · {session.duration}min
            </span>
            <span className="flex items-center gap-1">
              <FormatIcon className="w-3 h-3" />
              {session.platformLabel || "Video Call"}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${type.color}`}
            >
              <TypeIcon className="w-2.5 h-2.5" />
              {type.label}
            </span>
            {session.rating && (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${j < session.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {session.notes && (
            <div className="mt-2">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-[11px] text-primary hover:underline"
              >
                <ChevronRight
                  className={`w-3 h-3 transition-transform ${showNotes ? "rotate-90" : ""}`}
                />
                Session notes
              </button>
              {showNotes && (
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed bg-secondary/50 rounded-lg p-3">
                  {session.notes}
                </p>
              )}
            </div>
          )}

          {isScheduled && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {session.meetLink ? (
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition"
                >
                  <ExternalLink className="w-3 h-3" /> Join on{" "}
                  {session.platformLabel}
                </a>
              ) : (
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition">
                  <Video className="w-3 h-3" /> Join Session
                </button>
              )}
              <button className="px-4 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-secondary transition">
                Reschedule
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Sessions() {
  const [tab, setTab] = useState("upcoming");
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [showModal, setShowModal] = useState(false);

  function addSession(s) {
    setSessions((prev) => [...prev, s]);
    setTab("upcoming");
  }

  const upcoming = sessions.filter((s) => s.status === "scheduled");
  const past = sessions.filter((s) => s.status === "completed");
  const displayed = tab === "upcoming" ? upcoming : past;

  const totalHours = past.reduce((sum, s) => sum + s.duration, 0);
  const avgRating = past
    .filter((s) => s.rating)
    .reduce((sum, s, _, arr) => sum + s.rating / arr.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sessions</h1>
              <p className="text-xs text-muted-foreground">
                {upcoming.length} upcoming · {past.length} completed
              </p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="upcoming" className="text-xs">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="text-xs">
                  Past
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {tab === "past" && past.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Sessions",
                value: past.length,
                icon: CalendarDays,
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Hours",
                value: `${Math.round(totalHours / 60)}h ${totalHours % 60}m`,
                icon: Clock,
                color: "text-cyan-600",
                bg: "bg-cyan-500/10",
              },
              {
                label: "Avg Rating",
                value: avgRating.toFixed(1),
                icon: Star,
                color: "text-amber-600",
                bg: "bg-amber-500/10",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}
                >
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {displayed.map((session, i) => (
            <SessionCard key={session.id} session={session} i={i} />
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">{tab === "upcoming" ? "📅" : "📋"}</p>
            <p className="font-semibold text-foreground">No {tab} sessions</p>
            <p className="text-sm text-muted-foreground mt-1">
              {tab === "upcoming"
                ? "Schedule a session with your mentor to get started."
                : "Your completed sessions will appear here."}
            </p>
            {tab === "upcoming" && (
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
              >
                Schedule Now
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <ScheduleModal
            onClose={() => setShowModal(false)}
            onSchedule={addSession}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
