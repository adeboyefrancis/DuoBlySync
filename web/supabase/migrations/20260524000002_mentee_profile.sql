-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS career_stage_type CASCADE;
DROP TYPE IF EXISTS target_industry_type CASCADE;
DROP TYPE IF EXISTS mentorship_style_type CASCADE;
DROP TYPE IF EXISTS comm_preference_type CASCADE;
DROP TYPE IF EXISTS availability_type CASCADE;
DROP TYPE IF EXISTS accommodation_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE career_stage_type AS ENUM (
    'student', 
    'career_changer', 
    'early_career', 
    'mid_career', 
    'senior'
);

CREATE TYPE target_industry_type AS ENUM (
    'technology', 
    'digital_marketing', 
    'data_science', 
    'cybersecurity', 
    'cloud_computing', 
    'software_engineering', 
    'product_management', 
    'ux_design', 
    'devops', 
    'ai_ml', 
    'business_analysis', 
    'project_management', 
    'other'
);

CREATE TYPE mentorship_style_type AS ENUM (
    'structured', 
    'flexible', 
    'project_based', 
    'goal_oriented', 
    'exploratory'
);

CREATE TYPE comm_preference_type AS ENUM (
    'video_call', 
    'voice_call', 
    'text_chat', 
    'email', 
    'in_person'
);

CREATE TYPE availability_type AS ENUM (
    '1_hour_week', 
    '2_hours_week', 
    '3_hours_week', 
    'flexible'
);

CREATE TYPE accommodation_type AS ENUM (
    'body_doubling', 
    'structured_agendas', 
    'written_summaries', 
    'flexible_scheduling', 
    'quiet_focus_sessions', 
    'visual_aids'
);

-- 3. CREATE THE TABLE
CREATE TABLE mentee_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required fields (NOT NULL)
    user_email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    target_industry target_industry_type NOT NULL,
    
    -- Optional flat fields
    avatar_url TEXT,
    bio TEXT,
    career_stage career_stage_type,
    preferred_mentorship_style mentorship_style_type,
    availability availability_type,
    is_neurodivergent BOOLEAN DEFAULT FALSE,
    location TEXT,
    linkedin_url TEXT,
    
    -- Fields with explicit defaults
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Arrays of primitives map to native Postgres arrays
    learning_interests TEXT[] DEFAULT '{}',
    communication_preferences comm_preference_type[] DEFAULT '{}',
    neurodiversity_accommodations accommodation_type[] DEFAULT '{}',
    
    -- Arrays of nested objects map perfectly to high-performance JSONB
    current_skills JSONB DEFAULT '[]'::jsonb,
    target_skills JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_mentee_profiles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentee_profiles_modtime
    BEFORE UPDATE ON mentee_profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_mentee_profiles_timestamp();