import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Brain,
  Filter,
  Heart,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MENTORS = [
  {
    id: "1",
    display_name: "Sarah Chen",
    job_title: "Cloud Architect",
    company: "TechCorp",
    location: "London, UK",
    industry: "Cloud Computing",
    years_experience: 9,
    availability: "2_hours_week",
    neurodiversity_support: true,
    rating: 4.9,
    total_sessions: 47,
    sfia_skills: ["Cloud Computing L6", "DevOps L5", "Python L4"],
    topics: ["AWS", "System Design", "Career Growth"],
    headline: "Helping engineers level up in cloud & DevOps",
    avatar_emoji: "👩‍💻",
    avatar_color: "from-cyan-400 to-blue-500",
    compatibility: 92,
  },
  {
    id: "2",
    display_name: "Marcus Lee",
    job_title: "Data Science Lead",
    company: "Analytics Co",
    location: "Manchester, UK",
    industry: "Data Science",
    years_experience: 7,
    availability: "1_hour_week",
    neurodiversity_support: false,
    rating: 4.7,
    total_sessions: 31,
    sfia_skills: ["Data Science L6", "Python L5", "ML Engineering L4"],
    topics: ["Machine Learning", "Python", "Data Pipelines"],
    headline: "Turning data into career opportunities",
    avatar_emoji: "👨‍🔬",
    avatar_color: "from-purple-400 to-indigo-500",
    compatibility: 78,
  },
  {
    id: "3",
    display_name: "Aisha Okonkwo",
    job_title: "Product Manager",
    company: "Fintech Startup",
    location: "Edinburgh, UK",
    industry: "Product Management",
    years_experience: 5,
    availability: "flexible",
    neurodiversity_support: true,
    rating: 5.0,
    total_sessions: 22,
    sfia_skills: ["Product Strategy L5", "Agile L4", "Stakeholder Mgmt L5"],
    topics: ["Career Transition", "Product Thinking", "Roadmapping"],
    headline: "From engineer to PM — I can guide that journey",
    avatar_emoji: "👩‍💼",
    avatar_color: "from-amber-400 to-orange-500",
    compatibility: 85,
  },
  {
    id: "4",
    display_name: "James Wright",
    job_title: "Cybersecurity Consultant",
    company: "SecureOps",
    location: "Bristol, UK",
    industry: "Cybersecurity",
    years_experience: 12,
    availability: "2_hours_week",
    neurodiversity_support: false,
    rating: 4.8,
    total_sessions: 63,
    sfia_skills: ["Security Arch L7", "Pen Testing L6", "Compliance L5"],
    topics: ["Ethical Hacking", "SOC Operations", "Certifications"],
    headline: "Demystifying security for developers",
    avatar_emoji: "🛡️",
    avatar_color: "from-rose-400 to-pink-500",
    compatibility: 71,
  },
  {
    id: "5",
    display_name: "Priya Sharma",
    job_title: "UX Design Lead",
    company: "DesignLab",
    location: "Birmingham, UK",
    industry: "UX Design",
    years_experience: 6,
    availability: "3_hours_week",
    neurodiversity_support: true,
    rating: 4.9,
    total_sessions: 38,
    sfia_skills: [
      "UX Research L5",
      "Interaction Design L6",
      "Accessibility L5",
    ],
    topics: ["Design Systems", "User Research", "Accessibility"],
    headline: "Design that includes everyone, especially neurodivergent users",
    avatar_emoji: "🎨",
    avatar_color: "from-emerald-400 to-teal-500",
    compatibility: 88,
  },
  {
    id: "6",
    display_name: "Daniel Kim",
    job_title: "DevOps Engineer",
    company: "CloudNative Ltd",
    location: "Leeds, UK",
    industry: "DevOps",
    years_experience: 8,
    availability: "flexible",
    neurodiversity_support: false,
    rating: 4.6,
    total_sessions: 55,
    sfia_skills: ["DevOps L6", "Kubernetes L5", "CI/CD L6"],
    topics: ["Docker", "Kubernetes", "GitOps"],
    headline:
      "Building bulletproof pipelines and teaching others to do the same",
    avatar_emoji: "⚙️",
    avatar_color: "from-slate-400 to-gray-500",
    compatibility: 74,
  },
];

const availLabel = {
  "1_hour_week": "1h/wk",
  "2_hours_week": "2h/wk",
  "3_hours_week": "3h/wk",
  flexible: "Flexible",
};

export default function BrowseMentors() {
  const [search, setSearch] = useState("");
  const [filterNeurodiv, setFilterNeurodiv] = useState(false);
  const [liked, setLiked] = useState(new Set());

  const filtered = MENTORS.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.display_name.toLowerCase().includes(q) ||
      m.industry.toLowerCase().includes(q) ||
      m.topics.some((t) => t.toLowerCase().includes(q));
    return matchesSearch && (!filterNeurodiv || m.neurodiversity_support);
  });

  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Browse Mentors
              </h1>
              <p className="text-xs text-muted-foreground">
                {filtered.length} mentors available
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, industry or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <button
              onClick={() => setFilterNeurodiv(!filterNeurodiv)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                filterNeurodiv
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Neurodiv Friendly</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              {/* Avatar */}
              <div
                className={`bg-gradient-to-br ${mentor.avatar_color} h-28 flex items-center justify-center relative`}
              >
                <span className="text-5xl">{mentor.avatar_emoji}</span>
                <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-white text-xs font-bold">
                    {mentor.compatibility}%
                  </span>
                </div>
                {mentor.neurodiversity_support && (
                  <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-full p-1">
                    <Brain className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                {/* Like button */}
                <button
                  onClick={() => toggleLike(mentor.id)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform shadow"
                >
                  <Heart
                    className={`w-4 h-4 ${liked.has(mentor.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"}`}
                  />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">
                      {mentor.display_name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {mentor.job_title} · {mentor.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-foreground">
                      {mentor.rating}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground italic mb-3 leading-relaxed line-clamp-2">
                  "{mentor.headline}"
                </p>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {mentor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {availLabel[mentor.availability]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleLike(mentor.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                      liked.has(mentor.id)
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {liked.has(mentor.id) ? "❤️ Liked" : "♡ Like"}
                  </button>
                  <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-secondary text-foreground hover:bg-secondary/80 transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-foreground font-semibold">No mentors found</p>
            <p className="text-muted-foreground text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
