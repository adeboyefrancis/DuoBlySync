import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import {
  Database,
  Users,
  GraduationCap,
  Award,
  ArrowLeftRight,
  Handshake,
  CalendarDays,
  Target,
  MessageSquare,
  Brain,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsBar from "@/components/api-explorer/StatsBar";
import EntityCard from "@/components/api-explorer/EntityCard";
import RelationshipDiagram from "@/components/api-explorer/RelationshipDiagram";
import ApiEndpointList from "@/components/api-explorer/ApiEndpointList";
import UserFlowDiagram from "@/components/api-explorer/UserFlowDiagram";

const allEntities = [
  {
    name: "MentorProfile",
    icon: Users,
    color: "bg-cyan-500/10 text-cyan-600",
    properties: {
      user_email: {
        type: "string",
        description: "Email of the user who owns this mentor profile",
      },
      display_name: { type: "string", description: "Public display name" },
      avatar_url: { type: "string", description: "Profile photo URL" },
      headline: { type: "string", description: "Short professional headline" },
      bio: { type: "string", description: "Detailed professional biography" },
      industry: {
        type: "string",
        enum: [
          "technology",
          "digital_marketing",
          "data_science",
          "cybersecurity",
          "cloud_computing",
          "software_engineering",
          "product_management",
          "ux_design",
          "devops",
          "ai_ml",
          "business_analysis",
          "project_management",
          "other",
        ],
        description: "Primary industry",
      },
      years_experience: {
        type: "number",
        description: "Years of professional experience",
      },
      job_title: { type: "string", description: "Current job title" },
      company: {
        type: "string",
        description: "Current company or organization",
      },
      sfia_skills: {
        type: "array",
        description: "SFIA skill IDs with proficiency levels",
        items: {
          type: "object",
          properties: {
            skill_id: { type: "string" },
            skill_name: { type: "string" },
            sfia_level: { type: "number" },
          },
        },
      },
      mentorship_topics: {
        type: "array",
        description: "Topics the mentor can guide on",
        items: { type: "string" },
      },
      mentorship_style: {
        type: "string",
        enum: [
          "structured",
          "flexible",
          "project_based",
          "goal_oriented",
          "exploratory",
        ],
        description: "Preferred mentorship approach",
      },
      availability: {
        type: "string",
        enum: ["1_hour_week", "2_hours_week", "3_hours_week", "flexible"],
        description: "Weekly availability",
      },
      communication_preferences: {
        type: "array",
        description: "Preferred communication formats",
        items: {
          type: "string",
          enum: ["video_call", "voice_call", "text_chat", "email", "in_person"],
        },
      },
      neurodiversity_support: {
        type: "boolean",
        description: "Offers neurodiversity-inclusive mentoring",
      },
      max_mentees: {
        type: "number",
        description: "Maximum number of active mentees",
      },
      active_mentees_count: {
        type: "number",
        description: "Current number of active mentees",
      },
      is_active: {
        type: "boolean",
        description: "Currently accepting mentees",
      },
      location: { type: "string", description: "City/Country" },
      linkedin_url: { type: "string", description: "LinkedIn profile URL" },
      rating: { type: "number", description: "Average rating from mentees" },
      total_sessions: {
        type: "number",
        description: "Total completed sessions",
      },
    },
    required: ["user_email", "display_name", "headline", "industry"],
  },
  {
    name: "MenteeProfile",
    icon: GraduationCap,
    color: "bg-purple-500/10 text-purple-600",
    properties: {
      user_email: {
        type: "string",
        description: "Email of the user who owns this mentee profile",
      },
      display_name: { type: "string", description: "Public display name" },
      avatar_url: { type: "string", description: "Profile photo URL" },
      headline: {
        type: "string",
        description: "Short professional headline or aspiration",
      },
      bio: { type: "string", description: "Background and mentorship goals" },
      career_stage: {
        type: "string",
        enum: [
          "student",
          "career_changer",
          "early_career",
          "mid_career",
          "senior",
        ],
        description: "Current career stage",
      },
      target_industry: {
        type: "string",
        enum: [
          "technology",
          "digital_marketing",
          "data_science",
          "cybersecurity",
          "cloud_computing",
          "software_engineering",
          "product_management",
          "ux_design",
          "devops",
          "ai_ml",
          "business_analysis",
          "project_management",
          "other",
        ],
        description: "Target industry",
      },
      current_skills: {
        type: "array",
        description: "Current SFIA skills with self-assessed levels",
        items: {
          type: "object",
          properties: {
            skill_id: { type: "string" },
            skill_name: { type: "string" },
            sfia_level: { type: "number" },
          },
        },
      },
      target_skills: {
        type: "array",
        description: "SFIA skills the mentee wants to develop",
        items: {
          type: "object",
          properties: {
            skill_id: { type: "string" },
            skill_name: { type: "string" },
            target_level: { type: "number" },
          },
        },
      },
      learning_interests: {
        type: "array",
        description: "Topics to learn about",
        items: { type: "string" },
      },
      preferred_mentorship_style: {
        type: "string",
        enum: [
          "structured",
          "flexible",
          "project_based",
          "goal_oriented",
          "exploratory",
        ],
        description: "Preferred mentorship approach",
      },
      communication_preferences: {
        type: "array",
        description: "Preferred communication formats",
        items: {
          type: "string",
          enum: ["video_call", "voice_call", "text_chat", "email", "in_person"],
        },
      },
      availability: {
        type: "string",
        enum: ["1_hour_week", "2_hours_week", "3_hours_week", "flexible"],
        description: "Weekly availability",
      },
      is_neurodivergent: {
        type: "boolean",
        description: "Whether user identifies as neurodivergent",
      },
      neurodiversity_accommodations: {
        type: "array",
        description: "Preferred accommodations",
        items: {
          type: "string",
          enum: [
            "body_doubling",
            "structured_agendas",
            "written_summaries",
            "flexible_scheduling",
            "quiet_focus_sessions",
            "visual_aids",
          ],
        },
      },
      is_active: { type: "boolean", description: "Currently seeking mentors" },
      location: { type: "string", description: "City/Country" },
      linkedin_url: { type: "string", description: "LinkedIn profile URL" },
    },
    required: ["user_email", "display_name", "headline", "target_industry"],
  },
  {
    name: "SFIASkill",
    icon: Award,
    color: "bg-amber-500/10 text-amber-600",
    properties: {
      code: {
        type: "string",
        description: "SFIA skill code (e.g., PROG, TEST, ARCH)",
      },
      name: { type: "string", description: "Full SFIA skill name" },
      category: {
        type: "string",
        enum: [
          "strategy_architecture",
          "change_delivery",
          "development_implementation",
          "delivery_operation",
          "skills_quality",
          "relationships_engagement",
          "people_skills",
        ],
        description: "SFIA category",
      },
      description: { type: "string", description: "Skill description" },
      levels_available: {
        type: "array",
        description: "SFIA levels (1-7) this skill covers",
        items: { type: "number" },
      },
      level_descriptions: {
        type: "array",
        description: "Description for each level",
        items: {
          type: "object",
          properties: {
            level: { type: "number" },
            description: { type: "string" },
          },
        },
      },
    },
    required: ["code", "name", "category"],
  },
  {
    name: "ProfileSwipe",
    icon: ArrowLeftRight,
    color: "bg-pink-500/10 text-pink-600",
    properties: {
      swiper_email: {
        type: "string",
        description: "Email of the user who swiped",
      },
      swiper_role: {
        type: "string",
        enum: ["mentor", "mentee"],
        description: "Role of the swiper",
      },
      target_email: {
        type: "string",
        description: "Email of the user being swiped on",
      },
      target_role: {
        type: "string",
        enum: ["mentor", "mentee"],
        description: "Role of the target",
      },
      action: {
        type: "string",
        enum: ["like", "pass", "super_like"],
        description: "Swipe action taken",
      },
      is_match: {
        type: "boolean",
        description: "Whether this resulted in a mutual match",
      },
    },
    required: [
      "swiper_email",
      "swiper_role",
      "target_email",
      "target_role",
      "action",
    ],
  },
  {
    name: "MentorshipMatch",
    icon: Handshake,
    color: "bg-emerald-500/10 text-emerald-600",
    properties: {
      mentor_email: { type: "string", description: "Mentor's email" },
      mentee_email: { type: "string", description: "Mentee's email" },
      mentor_name: { type: "string", description: "Mentor's display name" },
      mentee_name: { type: "string", description: "Mentee's display name" },
      status: {
        type: "string",
        enum: ["pending", "active", "paused", "completed", "cancelled"],
        description: "Match status",
      },
      matched_skills: {
        type: "array",
        description: "Skills that aligned",
        items: { type: "string" },
      },
      mentorship_goals: { type: "string", description: "Agreed goals summary" },
      sessions_completed: {
        type: "number",
        description: "Completed sessions count",
      },
      next_session_date: {
        type: "string",
        format: "date-time",
        description: "Next scheduled session",
      },
      compatibility_score: {
        type: "number",
        description: "Compatibility percentage",
      },
      feedback_mentor: { type: "number", description: "Mentor's rating (1-5)" },
      feedback_mentee: { type: "number", description: "Mentee's rating (1-5)" },
    },
    required: ["mentor_email", "mentee_email"],
  },
  {
    name: "MentorshipSession",
    icon: CalendarDays,
    color: "bg-blue-500/10 text-blue-600",
    properties: {
      match_id: { type: "string", description: "ID of the MentorshipMatch" },
      mentor_email: { type: "string", description: "Mentor's email" },
      mentee_email: { type: "string", description: "Mentee's email" },
      title: { type: "string", description: "Session title or topic" },
      description: { type: "string", description: "Session agenda" },
      scheduled_date: {
        type: "string",
        format: "date-time",
        description: "Scheduled date and time",
      },
      duration_minutes: { type: "number", description: "Duration in minutes" },
      session_type: {
        type: "string",
        enum: [
          "one_on_one",
          "goal_review",
          "skill_assessment",
          "career_planning",
          "body_doubling",
          "focus_session",
        ],
        description: "Type of session",
      },
      format: {
        type: "string",
        enum: ["video_call", "voice_call", "text_chat", "in_person"],
        description: "Session format",
      },
      status: {
        type: "string",
        enum: ["scheduled", "in_progress", "completed", "cancelled", "no_show"],
        description: "Session status",
      },
      notes: { type: "string", description: "Key takeaways" },
      action_items: {
        type: "array",
        description: "Action items from session",
        items: {
          type: "object",
          properties: {
            task: { type: "string" },
            assigned_to: { type: "string" },
            due_date: { type: "string" },
            completed: { type: "boolean" },
          },
        },
      },
      mentor_rating: {
        type: "number",
        description: "Session rating by mentee (1-5)",
      },
      mentee_rating: {
        type: "number",
        description: "Session rating by mentor (1-5)",
      },
    },
    required: [
      "match_id",
      "mentor_email",
      "mentee_email",
      "title",
      "scheduled_date",
    ],
  },
  {
    name: "MentorshipGoal",
    icon: Target,
    color: "bg-orange-500/10 text-orange-600",
    properties: {
      match_id: { type: "string", description: "ID of the MentorshipMatch" },
      mentee_email: { type: "string", description: "Mentee's email" },
      title: { type: "string", description: "Goal title" },
      description: { type: "string", description: "Detailed description" },
      category: {
        type: "string",
        enum: [
          "skill_development",
          "career_transition",
          "certification",
          "project_completion",
          "networking",
          "leadership",
          "other",
        ],
        description: "Goal category",
      },
      target_sfia_skill: {
        type: "string",
        description: "SFIA skill code this goal targets",
      },
      current_level: { type: "number", description: "Current SFIA level" },
      target_level: { type: "number", description: "Target SFIA level" },
      status: {
        type: "string",
        enum: [
          "not_started",
          "in_progress",
          "completed",
          "on_hold",
          "abandoned",
        ],
        description: "Goal status",
      },
      progress_percentage: { type: "number", description: "Progress (0-100)" },
      target_date: {
        type: "string",
        format: "date",
        description: "Target completion date",
      },
      milestones: {
        type: "array",
        description: "Goal milestones",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            completed: { type: "boolean" },
            completed_date: { type: "string" },
          },
        },
      },
    },
    required: ["match_id", "mentee_email", "title", "category"],
  },
  {
    name: "Message",
    icon: MessageSquare,
    color: "bg-indigo-500/10 text-indigo-600",
    properties: {
      match_id: { type: "string", description: "ID of the MentorshipMatch" },
      sender_email: { type: "string", description: "Sender's email" },
      receiver_email: { type: "string", description: "Receiver's email" },
      content: { type: "string", description: "Message content" },
      message_type: {
        type: "string",
        enum: [
          "text",
          "session_invite",
          "goal_update",
          "resource_share",
          "system",
        ],
        description: "Type of message",
      },
      attachment_url: { type: "string", description: "Attached file URL" },
      is_read: { type: "boolean", description: "Read status" },
    },
    required: ["match_id", "sender_email", "receiver_email", "content"],
  },
  {
    name: "FocusSession",
    icon: Brain,
    color: "bg-teal-500/10 text-teal-600",
    properties: {
      host_email: { type: "string", description: "Session host email" },
      title: { type: "string", description: "Focus session title" },
      description: { type: "string", description: "Session description" },
      session_type: {
        type: "string",
        enum: [
          "body_doubling",
          "accountability_checkin",
          "collaborative_work",
          "quiet_focus",
        ],
        description: "Type of focus session",
      },
      scheduled_date: {
        type: "string",
        format: "date-time",
        description: "Date and time",
      },
      duration_minutes: { type: "number", description: "Duration in minutes" },
      max_participants: { type: "number", description: "Max participants" },
      participants: {
        type: "array",
        description: "Participant emails",
        items: { type: "string" },
      },
      status: {
        type: "string",
        enum: ["open", "full", "in_progress", "completed", "cancelled"],
        description: "Session status",
      },
      is_recurring: { type: "boolean", description: "Recurring session" },
      recurrence_pattern: {
        type: "string",
        enum: ["daily", "weekly", "biweekly", "monthly"],
        description: "Recurrence pattern",
      },
    },
    required: ["host_email", "title", "session_type", "scheduled_date"],
  },
];

export default function ApiExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { user } = useAuth();

  const totalFields = allEntities.reduce(
    (sum, e) => sum + Object.keys(e.properties).length,
    0,
  );
  const entityNames = allEntities.map((e) => e.name);

  const filteredEntities = allEntities.filter((entity) => {
    const matchesSearch = entity.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "profiles")
      return (
        matchesSearch &&
        ["MentorProfile", "MenteeProfile", "SFIASkill"].includes(entity.name)
      );
    if (activeTab === "matching")
      return (
        matchesSearch &&
        ["ProfileSwipe", "MentorshipMatch"].includes(entity.name)
      );
    if (activeTab === "collaboration")
      return (
        matchesSearch &&
        [
          "MentorshipSession",
          "MentorshipGoal",
          "Message",
          "FocusSession",
        ].includes(entity.name)
      );
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Database className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    DuoBlySync
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Backend API Architecture
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 h-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <StatsBar
          entityCount={allEntities.length}
          totalFields={totalFields}
          relationships={11}
          integrations={3}
        />

        {/* User Journey */}
        <UserFlowDiagram />

        {/* Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-secondary">
              <TabsTrigger value="all" className="text-xs">
                All Entities
              </TabsTrigger>
              <TabsTrigger value="profiles" className="text-xs">
                Profiles & Skills
              </TabsTrigger>
              <TabsTrigger value="matching" className="text-xs">
                Matching
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="text-xs">
                Collaboration
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {filteredEntities.length} entities
          </p>
        </div>

        {/* Entity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map((entity, i) => (
            <EntityCard
              key={entity.name}
              entity={entity}
              color={entity.color}
              icon={entity.icon}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* Relationship Diagram & API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RelationshipDiagram />
          <ApiEndpointList entityNames={entityNames} />
        </div>
      </div>
    </div>
  );
}
