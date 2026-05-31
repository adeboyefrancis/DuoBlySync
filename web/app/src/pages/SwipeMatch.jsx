import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Star,
  MapPin,
  Briefcase,
  Clock,
  Brain,
  ChevronDown,
  ChevronUp,
  Lock,
  UserCircle,
} from "lucide-react";
import { axios } from "@/api/DuoBlySyncClient";
import { Badge } from "@/components/ui/badge";

const DEMO_PROFILES = [
  {
    id: "1",
    display_name: "Sarah Chen",
    job_title: "Cloud Architect",
    company: "TechCorp",
    headline: "Helping engineers level up in cloud & DevOps",
    location: "London, UK",
    industry: "cloud_computing",
    years_experience: 9,
    availability: "2_hours_week",
    neurodiversity_support: true,
    rating: 4.9,
    total_sessions: 47,
    sfia_skills: [
      { skill_name: "Cloud Computing", sfia_level: 6 },
      { skill_name: "DevOps", sfia_level: 5 },
      { skill_name: "Python", sfia_level: 4 },
    ],
    mentorship_topics: ["AWS", "System Design", "Career Growth"],
    bio: "Senior cloud architect with 9 years building scalable systems. Neurodiversity-friendly, structured sessions.",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
    compatibility: 92,
  },
  {
    id: "2",
    display_name: "Marcus Lee",
    job_title: "Data Science Lead",
    company: "Analytics Co",
    headline: "Turning data into career opportunities",
    location: "Manchester, UK",
    industry: "data_science",
    years_experience: 7,
    availability: "1_hour_week",
    neurodiversity_support: false,
    rating: 4.7,
    total_sessions: 31,
    sfia_skills: [
      { skill_name: "Data Science", sfia_level: 6 },
      { skill_name: "Python", sfia_level: 5 },
      { skill_name: "ML Engineering", sfia_level: 4 },
    ],
    mentorship_topics: ["Machine Learning", "Python", "Data Pipelines"],
    bio: "Data science lead passionate about making ML accessible. I take on 1-2 mentees at a time for quality focus.",
    avatar_emoji: "👨‍🔬",
    avatar_color: "from-purple-400 to-indigo-500",
    compatibility: 78,
  },
  {
    id: "3",
    display_name: "Aisha Okonkwo",
    job_title: "Product Manager",
    company: "Fintech Startup",
    headline: "From engineer to PM — I can guide that journey",
    location: "Edinburgh, UK",
    industry: "product_management",
    years_experience: 5,
    availability: "flexible",
    neurodiversity_support: true,
    rating: 5.0,
    total_sessions: 22,
    sfia_skills: [
      { skill_name: "Product Strategy", sfia_level: 5 },
      { skill_name: "Agile", sfia_level: 4 },
      { skill_name: "Stakeholder Mgmt", sfia_level: 5 },
    ],
    mentorship_topics: ["Career Transition", "Product Thinking", "Roadmapping"],
    bio: "Made the leap from software engineering to PM 5 years ago. I love helping technical people transition roles.",
    avatar_emoji: "👩‍💼",
    avatar_color: "from-amber-400 to-orange-500",
    compatibility: 85,
  },
  {
    id: "4",
    display_name: "James Wright",
    job_title: "Cybersecurity Consultant",
    company: "SecureOps",
    headline: "Demystifying security for developers",
    location: "Bristol, UK",
    industry: "cybersecurity",
    years_experience: 12,
    availability: "2_hours_week",
    neurodiversity_support: false,
    rating: 4.8,
    total_sessions: 63,
    sfia_skills: [
      { skill_name: "Security Architecture", sfia_level: 7 },
      { skill_name: "Penetration Testing", sfia_level: 6 },
      { skill_name: "Compliance", sfia_level: 5 },
    ],
    mentorship_topics: ["Ethical Hacking", "SOC Operations", "Certifications"],
    bio: "CISO background, now consulting and mentoring. I specialise in helping developers build security-first mindsets.",
    avatar_emoji: "🛡️",
    avatar_color: "from-rose-400 to-pink-500",
    compatibility: 71,
  },
];

const availabilityLabel = {
  "1_hour_week": "1h / week",
  "2_hours_week": "2h / week",
  "3_hours_week": "3h / week",
  flexible: "Flexible",
};

export default function SwipeMatch() {
  // All hooks must be declared before any early returns
  const [profiles] = useState(DEMO_PROFILES);
  const [current, setCurrent] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [matched, setMatched] = useState(null);
  const [swipedCount, setSwipedCount] = useState(0);
  const [authState, setAuthState] = useState("loading"); // loading | guest | incomplete | ready
  const [user, setUser] = useState(null);
  const [notifying, setNotifying] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/me")
      .then((u) => {
        setUser(u);
        const complete = !!(u?.full_name && u.full_name.trim().length > 0);
        setAuthState(complete ? "ready" : "incomplete");
      })
      .catch(() => setAuthState("guest"));
  }, []);

  async function sendMatchNotifications(matchedProfile) {
    setNotifying(true);
    const mentorName = matchedProfile.display_name;
    const menteeName = user?.full_name || "A mentee";
    const menteeEmail = user?.email;

    // Notify mentor (using their profile email placeholder)
    const mentorEmailPromise = axios.post("/emails/send", {
      to: menteeEmail, // In production use mentor's real email
      from_name: "DuoBlySync",
      subject: `🎉 New Match: You matched with ${mentorName}!`,
      body: `Hi ${menteeName},\n\nGreat news! You and ${mentorName} (${matchedProfile.job_title} at ${matchedProfile.company}) have matched on DuoBlySync!\n\nYou can now message each other and schedule your first session.\n\n${matchedProfile.headline}\n\nHead to your dashboard to get started:\nhttps://duoblysync.base44.app/sessions\n\n— The DuoBlySync Team`,
    });

    // Notify mentee
    const menteeEmailPromise = menteeEmail
      ? axios.post("/emails/send", {
          to: menteeEmail,
          from_name: "DuoBlySync",
          subject: `💜 It's a Match! ${mentorName} is waiting for you`,
          body: `Hi ${menteeName},\n\nYou just matched with ${mentorName} — ${matchedProfile.headline}\n\nThey have ${matchedProfile.years_experience} years of experience in ${matchedProfile.industry.replace("_", " ")}.\n\nDon't keep them waiting — send your first message now:\nhttps://duoblysync.base44.app/sessions\n\n— The DuoBlySync Team`,
        })
      : Promise.resolve();

    await Promise.allSettled([mentorEmailPromise, menteeEmailPromise]);
    setNotifying(false);
  }

  function swipe(dir) {
    setSwipeDir(dir);
    if (dir === "right") {
      if (Math.random() > 0.5) {
        const matchedProfile = profiles[current];
        setTimeout(() => {
          setMatched(matchedProfile);
          sendMatchNotifications(matchedProfile);
        }, 400);
      }
    }
    setTimeout(() => {
      setSwipeDir(null);
      setExpanded(false);
      setSwipedCount((c) => c + 1);
      setCurrent((c) => (c + 1 < profiles.length ? c + 1 : 0));
    }, 400);
  }

  // --- Guard states ---
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            Sign in to Match
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Create an account or log in to start discovering mentor matches.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin("/matching")}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition"
          >
            Sign In / Sign Up
          </button>
        </motion.div>
      </div>
    );
  }

  if (authState === "incomplete") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
            <UserCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            Complete Your Profile
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            You need to complete your profile before you can start matching with
            mentors.
          </p>
          <a href="/dashboard">
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition">
              Go to Dashboard
            </button>
          </a>
        </motion.div>
      </div>
    );
  }

  // --- Match screen ---
  if (matched) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: 3 }}
            className="text-8xl mb-6"
          >
            💜
          </motion.div>
          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            It's a Match!
          </h2>
          <p className="text-muted-foreground mb-2">
            You and <strong>{matched.display_name}</strong> liked each other.
          </p>
          {notifying ? (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Sending match notifications...
            </div>
          ) : (
            <p className="text-sm text-emerald-600 font-medium mb-8">
              ✉️ Both of you have been notified by email!
            </p>
          )}
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition"
              onClick={() => setMatched(null)}
            >
              Send a Message
            </button>
            <button
              className="w-full py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition"
              onClick={() => setMatched(null)}
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const profile = profiles[current];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Find a Match</h1>
            <p className="text-xs text-muted-foreground">
              {swipedCount} swiped ·{" "}
              {profiles.length - (swipedCount % profiles.length)} remaining
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">
              {profiles.length} mentors nearby
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-sm">
          {/* Card stack */}
          <div className="relative h-[520px] mb-6">
            {profiles[(current + 1) % profiles.length] && (
              <div className="absolute inset-x-3 top-3 bottom-0 bg-card border border-border rounded-3xl opacity-50 scale-95" />
            )}

            <AnimatePresence>
              {profile && (
                <motion.div
                  key={profile.id + current}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x:
                      swipeDir === "right"
                        ? 400
                        : swipeDir === "left"
                          ? -400
                          : 0,
                    rotate:
                      swipeDir === "right" ? 12 : swipeDir === "left" ? -12 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 bg-card border border-border rounded-3xl overflow-hidden shadow-xl flex flex-col"
                >
                  {swipeDir === "right" && (
                    <div className="absolute top-6 left-6 z-20 border-4 border-emerald-500 rounded-xl px-4 py-2 rotate-[-20deg]">
                      <span className="text-emerald-500 font-black text-2xl">
                        LIKE
                      </span>
                    </div>
                  )}
                  {swipeDir === "left" && (
                    <div className="absolute top-6 right-6 z-20 border-4 border-rose-500 rounded-xl px-4 py-2 rotate-[20deg]">
                      <span className="text-rose-500 font-black text-2xl">
                        PASS
                      </span>
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${profile.avatar_color} h-52 flex items-center justify-center relative shrink-0`}
                  >
                    <span className="text-7xl">{profile.avatar_emoji}</span>
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-bold">
                        {profile.compatibility}% match
                      </span>
                    </div>
                    {profile.neurodiversity_support && (
                      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-full p-1.5">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-5 overflow-y-auto">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h2 className="text-xl font-extrabold text-foreground">
                          {profile.display_name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {profile.job_title} · {profile.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-foreground">
                          {profile.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground my-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profile.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {profile.years_experience}yrs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {availabilityLabel[profile.availability]}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 italic">
                      "{profile.headline}"
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {profile.sfia_skills.map((s) => (
                        <Badge
                          key={s.skill_name}
                          variant="secondary"
                          className="text-[10px] font-medium"
                        >
                          {s.skill_name} · L{s.sfia_level}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {profile.mentorship_topics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="flex items-center gap-1 text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors"
                    >
                      {expanded ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                      {expanded ? "Less" : "Read bio"}
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-muted-foreground leading-relaxed mt-2"
                        >
                          {profile.bio}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => swipe("left")}
              className="w-16 h-16 rounded-full bg-card border-2 border-rose-300 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-950 hover:border-rose-500 transition-all hover:scale-110 shadow-lg"
            >
              <X className="w-7 h-7 text-rose-500" />
            </button>
            <button
              onClick={() => swipe("right")}
              className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 shadow-xl shadow-primary/30"
            >
              <Heart className="w-9 h-9 text-primary-foreground fill-current" />
            </button>
            <button
              onClick={() => swipe("right")}
              className="w-16 h-16 rounded-full bg-card border-2 border-amber-300 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-500 transition-all hover:scale-110 shadow-lg"
            >
              <Star className="w-7 h-7 text-amber-500" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Pass · Like · Super Like
          </p>
        </div>
      </div>
    </div>
  );
}
