-- 1. BUILD THE MENTOR PROFILES TABLE
CREATE TABLE mentor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    user_email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    -- Reuses target_industry_type defined in your mentee schema
    industry target_industry_type NOT NULL,
    
    -- Optional flat fields
    avatar_url TEXT,
    bio TEXT,
    years_experience INT DEFAULT 0,
    job_title TEXT,
    company TEXT,
    -- Reuses mentorship_style_type and availability_type
    mentorship_style mentorship_style_type,
    availability availability_type,
    neurodiversity_support BOOLEAN DEFAULT FALSE,
    max_mentees INT,
    location TEXT,
    linkedin_url TEXT,
    rating NUMERIC(3,2), -- Protects decimal precision (e.g., 4.75) for ratings
    
    -- Fields with explicit numeric and boolean defaults
    active_mentees_count INT DEFAULT 0,
    total_sessions INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Array of strings maps to native text array
    mentorship_topics TEXT[] DEFAULT '{}',
    
    -- Array of custom enum mappings
    communication_preferences comm_preference_type[] DEFAULT '{}',
    
    -- Complex array of objects maps to high-performance JSONB
    sfia_skills JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_mentor_profiles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentor_profiles_modtime
    BEFORE UPDATE ON mentor_profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_mentor_profiles_timestamp();