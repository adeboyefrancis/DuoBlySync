export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      focus_sessions: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          host_email: string
          id: string
          is_recurring: boolean | null
          max_participants: number | null
          participants: string[] | null
          recurrence_pattern:
            | Database["public"]["Enums"]["recurrence_pattern_type"]
            | null
          scheduled_date: string
          session_type: Database["public"]["Enums"]["focus_session_type"]
          status: Database["public"]["Enums"]["focus_session_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          host_email: string
          id?: string
          is_recurring?: boolean | null
          max_participants?: number | null
          participants?: string[] | null
          recurrence_pattern?:
            | Database["public"]["Enums"]["recurrence_pattern_type"]
            | null
          scheduled_date: string
          session_type: Database["public"]["Enums"]["focus_session_type"]
          status?: Database["public"]["Enums"]["focus_session_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          host_email?: string
          id?: string
          is_recurring?: boolean | null
          max_participants?: number | null
          participants?: string[] | null
          recurrence_pattern?:
            | Database["public"]["Enums"]["recurrence_pattern_type"]
            | null
          scheduled_date?: string
          session_type?: Database["public"]["Enums"]["focus_session_type"]
          status?: Database["public"]["Enums"]["focus_session_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mentee_profiles: {
        Row: {
          availability: Database["public"]["Enums"]["availability_type"] | null
          avatar_url: string | null
          bio: string | null
          career_stage: Database["public"]["Enums"]["career_stage_type"] | null
          communication_preferences:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          created_at: string | null
          current_skills: Json | null
          display_name: string
          headline: string
          id: string
          is_active: boolean | null
          is_neurodivergent: boolean | null
          learning_interests: string[] | null
          linkedin_url: string | null
          location: string | null
          neurodiversity_accommodations:
            | Database["public"]["Enums"]["accommodation_type"][]
            | null
          preferred_mentorship_style:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          target_industry: Database["public"]["Enums"]["target_industry_type"]
          target_skills: Json | null
          updated_at: string | null
          user_email: string
        }
        Insert: {
          availability?: Database["public"]["Enums"]["availability_type"] | null
          avatar_url?: string | null
          bio?: string | null
          career_stage?: Database["public"]["Enums"]["career_stage_type"] | null
          communication_preferences?:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          created_at?: string | null
          current_skills?: Json | null
          display_name: string
          headline: string
          id?: string
          is_active?: boolean | null
          is_neurodivergent?: boolean | null
          learning_interests?: string[] | null
          linkedin_url?: string | null
          location?: string | null
          neurodiversity_accommodations?:
            | Database["public"]["Enums"]["accommodation_type"][]
            | null
          preferred_mentorship_style?:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          target_industry: Database["public"]["Enums"]["target_industry_type"]
          target_skills?: Json | null
          updated_at?: string | null
          user_email: string
        }
        Update: {
          availability?: Database["public"]["Enums"]["availability_type"] | null
          avatar_url?: string | null
          bio?: string | null
          career_stage?: Database["public"]["Enums"]["career_stage_type"] | null
          communication_preferences?:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          created_at?: string | null
          current_skills?: Json | null
          display_name?: string
          headline?: string
          id?: string
          is_active?: boolean | null
          is_neurodivergent?: boolean | null
          learning_interests?: string[] | null
          linkedin_url?: string | null
          location?: string | null
          neurodiversity_accommodations?:
            | Database["public"]["Enums"]["accommodation_type"][]
            | null
          preferred_mentorship_style?:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          target_industry?: Database["public"]["Enums"]["target_industry_type"]
          target_skills?: Json | null
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          active_mentees_count: number | null
          availability: Database["public"]["Enums"]["availability_type"] | null
          avatar_url: string | null
          bio: string | null
          communication_preferences:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          company: string | null
          created_at: string | null
          display_name: string
          headline: string
          id: string
          industry: Database["public"]["Enums"]["target_industry_type"]
          is_active: boolean | null
          job_title: string | null
          linkedin_url: string | null
          location: string | null
          max_mentees: number | null
          mentorship_style:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          mentorship_topics: string[] | null
          neurodiversity_support: boolean | null
          rating: number | null
          sfia_skills: Json | null
          total_sessions: number | null
          updated_at: string | null
          user_email: string
          years_experience: number | null
        }
        Insert: {
          active_mentees_count?: number | null
          availability?: Database["public"]["Enums"]["availability_type"] | null
          avatar_url?: string | null
          bio?: string | null
          communication_preferences?:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          company?: string | null
          created_at?: string | null
          display_name: string
          headline: string
          id?: string
          industry: Database["public"]["Enums"]["target_industry_type"]
          is_active?: boolean | null
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          max_mentees?: number | null
          mentorship_style?:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          mentorship_topics?: string[] | null
          neurodiversity_support?: boolean | null
          rating?: number | null
          sfia_skills?: Json | null
          total_sessions?: number | null
          updated_at?: string | null
          user_email: string
          years_experience?: number | null
        }
        Update: {
          active_mentees_count?: number | null
          availability?: Database["public"]["Enums"]["availability_type"] | null
          avatar_url?: string | null
          bio?: string | null
          communication_preferences?:
            | Database["public"]["Enums"]["comm_preference_type"][]
            | null
          company?: string | null
          created_at?: string | null
          display_name?: string
          headline?: string
          id?: string
          industry?: Database["public"]["Enums"]["target_industry_type"]
          is_active?: boolean | null
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          max_mentees?: number | null
          mentorship_style?:
            | Database["public"]["Enums"]["mentorship_style_type"]
            | null
          mentorship_topics?: string[] | null
          neurodiversity_support?: boolean | null
          rating?: number | null
          sfia_skills?: Json | null
          total_sessions?: number | null
          updated_at?: string | null
          user_email?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      mentorship_goals: {
        Row: {
          category: Database["public"]["Enums"]["goal_category_type"]
          created_at: string | null
          current_level: number | null
          description: string | null
          id: string
          match_id: string
          mentee_email: string
          milestones: Json | null
          progress_percentage: number | null
          status: Database["public"]["Enums"]["goal_status_type"] | null
          target_date: string | null
          target_level: number | null
          target_sfia_skill: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["goal_category_type"]
          created_at?: string | null
          current_level?: number | null
          description?: string | null
          id?: string
          match_id: string
          mentee_email: string
          milestones?: Json | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["goal_status_type"] | null
          target_date?: string | null
          target_level?: number | null
          target_sfia_skill?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["goal_category_type"]
          created_at?: string | null
          current_level?: number | null
          description?: string | null
          id?: string
          match_id?: string
          mentee_email?: string
          milestones?: Json | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["goal_status_type"] | null
          target_date?: string | null
          target_level?: number | null
          target_sfia_skill?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mentorship_matches: {
        Row: {
          compatibility_score: number | null
          created_at: string | null
          feedback_mentee: number | null
          feedback_mentor: number | null
          id: string
          matched_skills: string[] | null
          mentee_name: string | null
          mentor_email: string
          mentor_name: string | null
          mentorship_goals: string | null
          next_session_date: string | null
          sessions_completed: number | null
          status: Database["public"]["Enums"]["match_status_type"] | null
          text_email: string
          updated_at: string | null
        }
        Insert: {
          compatibility_score?: number | null
          created_at?: string | null
          feedback_mentee?: number | null
          feedback_mentor?: number | null
          id?: string
          matched_skills?: string[] | null
          mentee_name?: string | null
          mentor_email: string
          mentor_name?: string | null
          mentorship_goals?: string | null
          next_session_date?: string | null
          sessions_completed?: number | null
          status?: Database["public"]["Enums"]["match_status_type"] | null
          text_email: string
          updated_at?: string | null
        }
        Update: {
          compatibility_score?: number | null
          created_at?: string | null
          feedback_mentee?: number | null
          feedback_mentor?: number | null
          id?: string
          matched_skills?: string[] | null
          mentee_name?: string | null
          mentor_email?: string
          mentor_name?: string | null
          mentorship_goals?: string | null
          next_session_date?: string | null
          sessions_completed?: number | null
          status?: Database["public"]["Enums"]["match_status_type"] | null
          text_email?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mentorship_sessions: {
        Row: {
          action_items: Json | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          format: Database["public"]["Enums"]["session_format_type"] | null
          id: string
          match_id: string
          mentee_email: string
          mentee_rating: number | null
          mentor_email: string
          mentor_rating: number | null
          notes: string | null
          scheduled_date: string
          session_type:
            | Database["public"]["Enums"]["session_category_type"]
            | null
          status: Database["public"]["Enums"]["session_status_type"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          format?: Database["public"]["Enums"]["session_format_type"] | null
          id?: string
          match_id: string
          mentee_email: string
          mentee_rating?: number | null
          mentor_email: string
          mentor_rating?: number | null
          notes?: string | null
          scheduled_date: string
          session_type?:
            | Database["public"]["Enums"]["session_category_type"]
            | null
          status?: Database["public"]["Enums"]["session_status_type"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          format?: Database["public"]["Enums"]["session_format_type"] | null
          id?: string
          match_id?: string
          mentee_email?: string
          mentee_rating?: number | null
          mentor_email?: string
          mentor_rating?: number | null
          notes?: string | null
          scheduled_date?: string
          session_type?:
            | Database["public"]["Enums"]["session_category_type"]
            | null
          status?: Database["public"]["Enums"]["session_status_type"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          match_id: string
          message_type: Database["public"]["Enums"]["message_kind_type"] | null
          receiver_email: string
          sender_email: string
          updated_at: string | null
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          match_id: string
          message_type?: Database["public"]["Enums"]["message_kind_type"] | null
          receiver_email: string
          sender_email: string
          updated_at?: string | null
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          match_id?: string
          message_type?: Database["public"]["Enums"]["message_kind_type"] | null
          receiver_email?: string
          sender_email?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profile_swipes: {
        Row: {
          action: Database["public"]["Enums"]["swipe_action_type"]
          created_at: string | null
          id: string
          is_match: boolean | null
          swiper_email: string
          swiper_role: Database["public"]["Enums"]["platform_role_type"]
          target_email: string
          target_role: Database["public"]["Enums"]["platform_role_type"]
          updated_at: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["swipe_action_type"]
          created_at?: string | null
          id?: string
          is_match?: boolean | null
          swiper_email: string
          swiper_role: Database["public"]["Enums"]["platform_role_type"]
          target_email: string
          target_role: Database["public"]["Enums"]["platform_role_type"]
          updated_at?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["swipe_action_type"]
          created_at?: string | null
          id?: string
          is_match?: boolean | null
          swiper_email?: string
          swiper_role?: Database["public"]["Enums"]["platform_role_type"]
          target_email?: string
          target_role?: Database["public"]["Enums"]["platform_role_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      sfia_skills: {
        Row: {
          category: Database["public"]["Enums"]["sfia_category_type"]
          code: string
          created_at: string | null
          description: string | null
          id: string
          level_descriptions: Json | null
          levels_available: number[] | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["sfia_category_type"]
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          level_descriptions?: Json | null
          levels_available?: number[] | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["sfia_category_type"]
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          level_descriptions?: Json | null
          levels_available?: number[] | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string | null
          created_by_user: boolean | null
          description: string | null
          id: string
          industry_tags: string[] | null
          is_verified: boolean | null
          levels_supported: string[] | null
          name: string
          sfia_category:
            | Database["public"]["Enums"]["skill_sfia_category_type"]
            | null
          sfia_code: string | null
          type: Database["public"]["Enums"]["general_skill_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_user?: boolean | null
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          is_verified?: boolean | null
          levels_supported?: string[] | null
          name: string
          sfia_category?:
            | Database["public"]["Enums"]["skill_sfia_category_type"]
            | null
          sfia_code?: string | null
          type: Database["public"]["Enums"]["general_skill_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_user?: boolean | null
          description?: string | null
          id?: string
          industry_tags?: string[] | null
          is_verified?: boolean | null
          levels_supported?: string[] | null
          name?: string
          sfia_category?:
            | Database["public"]["Enums"]["skill_sfia_category_type"]
            | null
          sfia_code?: string | null
          type?: Database["public"]["Enums"]["general_skill_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      accommodation_type:
        | "body_doubling"
        | "structured_agendas"
        | "written_summaries"
        | "flexible_scheduling"
        | "quiet_focus_sessions"
        | "visual_aids"
      availability_type:
        | "1_hour_week"
        | "2_hours_week"
        | "3_hours_week"
        | "flexible"
      career_stage_type:
        | "student"
        | "career_changer"
        | "early_career"
        | "mid_career"
        | "senior"
      comm_preference_type:
        | "video_call"
        | "voice_call"
        | "text_chat"
        | "email"
        | "in_person"
      focus_session_status:
        | "open"
        | "full"
        | "in_progress"
        | "completed"
        | "cancelled"
      focus_session_type:
        | "body_doubling"
        | "accountability_checkin"
        | "collaborative_work"
        | "quiet_focus"
      general_skill_type:
        | "sfia"
        | "custom"
        | "soft_skill"
        | "tool"
        | "language"
        | "certification"
      goal_category_type:
        | "skill_development"
        | "career_transition"
        | "certification"
        | "project_completion"
        | "networking"
        | "leadership"
        | "other"
      goal_status_type:
        | "not_started"
        | "in_progress"
        | "completed"
        | "on_hold"
        | "abandoned"
      match_status_type:
        | "pending"
        | "active"
        | "paused"
        | "completed"
        | "cancelled"
      mentorship_style_type:
        | "structured"
        | "flexible"
        | "project_based"
        | "goal_oriented"
        | "exploratory"
      message_kind_type:
        | "text"
        | "session_invite"
        | "goal_update"
        | "resource_share"
        | "system"
      platform_role_type: "mentor" | "mentee"
      recurrence_pattern_type: "daily" | "weekly" | "biweekly" | "monthly"
      session_category_type:
        | "one_on_one"
        | "goal_review"
        | "skill_assessment"
        | "career_planning"
        | "body_doubling"
        | "focus_session"
      session_format_type:
        | "video_call"
        | "voice_call"
        | "text_chat"
        | "in_person"
      session_status_type:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      sfia_category_type:
        | "strategy_architecture"
        | "change_delivery"
        | "development_implementation"
        | "delivery_operation"
        | "skills_quality"
        | "relationships_engagement"
        | "people_skills"
      skill_sfia_category_type:
        | "strategy_architecture"
        | "change_delivery"
        | "development_implementation"
        | "delivery_operation"
        | "skills_quality"
        | "relationships_engagement"
        | "people_skills"
        | "none"
      swipe_action_type: "like" | "pass" | "super_like"
      target_industry_type:
        | "technology"
        | "digital_marketing"
        | "data_science"
        | "cybersecurity"
        | "cloud_computing"
        | "software_engineering"
        | "product_management"
        | "ux_design"
        | "devops"
        | "ai_ml"
        | "business_analysis"
        | "project_management"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      accommodation_type: [
        "body_doubling",
        "structured_agendas",
        "written_summaries",
        "flexible_scheduling",
        "quiet_focus_sessions",
        "visual_aids",
      ],
      availability_type: [
        "1_hour_week",
        "2_hours_week",
        "3_hours_week",
        "flexible",
      ],
      career_stage_type: [
        "student",
        "career_changer",
        "early_career",
        "mid_career",
        "senior",
      ],
      comm_preference_type: [
        "video_call",
        "voice_call",
        "text_chat",
        "email",
        "in_person",
      ],
      focus_session_status: [
        "open",
        "full",
        "in_progress",
        "completed",
        "cancelled",
      ],
      focus_session_type: [
        "body_doubling",
        "accountability_checkin",
        "collaborative_work",
        "quiet_focus",
      ],
      general_skill_type: [
        "sfia",
        "custom",
        "soft_skill",
        "tool",
        "language",
        "certification",
      ],
      goal_category_type: [
        "skill_development",
        "career_transition",
        "certification",
        "project_completion",
        "networking",
        "leadership",
        "other",
      ],
      goal_status_type: [
        "not_started",
        "in_progress",
        "completed",
        "on_hold",
        "abandoned",
      ],
      match_status_type: [
        "pending",
        "active",
        "paused",
        "completed",
        "cancelled",
      ],
      mentorship_style_type: [
        "structured",
        "flexible",
        "project_based",
        "goal_oriented",
        "exploratory",
      ],
      message_kind_type: [
        "text",
        "session_invite",
        "goal_update",
        "resource_share",
        "system",
      ],
      platform_role_type: ["mentor", "mentee"],
      recurrence_pattern_type: ["daily", "weekly", "biweekly", "monthly"],
      session_category_type: [
        "one_on_one",
        "goal_review",
        "skill_assessment",
        "career_planning",
        "body_doubling",
        "focus_session",
      ],
      session_format_type: [
        "video_call",
        "voice_call",
        "text_chat",
        "in_person",
      ],
      session_status_type: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      sfia_category_type: [
        "strategy_architecture",
        "change_delivery",
        "development_implementation",
        "delivery_operation",
        "skills_quality",
        "relationships_engagement",
        "people_skills",
      ],
      skill_sfia_category_type: [
        "strategy_architecture",
        "change_delivery",
        "development_implementation",
        "delivery_operation",
        "skills_quality",
        "relationships_engagement",
        "people_skills",
        "none",
      ],
      swipe_action_type: ["like", "pass", "super_like"],
      target_industry_type: [
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
    },
  },
} as const

