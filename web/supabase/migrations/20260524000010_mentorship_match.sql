-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS match_status_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE match_status_type AS ENUM (
    'pending',
    'active',
    'paused',
    'completed',
    'cancelled'
);

-- 3. CREATE THE TABLE
CREATE TABLE mentorship_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    mentor_email TEXT NOT NULL,
    text_email TEXT NOT NULL, -- Mentee's email from schema
    
    -- Optional fields from Base44 specification
    mentor_name TEXT,
    mentee_name TEXT,
    status match_status_type DEFAULT 'pending'::match_status_type,
    
    -- Text array for matched skills
    matched_skills TEXT[] DEFAULT '{}',
    mentorship_goals TEXT,
    
    -- Numbers with clean defaults / validation constraints
    sessions_completed INT DEFAULT 0,
    compatibility_score NUMERIC, -- Using numeric to allow clean percentage/decimals
    feedback_mentor INT CONSTRAINT check_mentor_rating CHECK (feedback_mentor BETWEEN 1 AND 5),
    feedback_mentee INT CONSTRAINT check_mentee_rating CHECK (feedback_mentee BETWEEN 1 AND 5),
    
    -- Date-time tracking
    next_session_date TIMESTAMPTZ,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Data Integrity Guard: Ensure unique pairings to prevent duplicate relation engines
    CONSTRAINT unique_mentor_mentee_match UNIQUE (mentor_email, text_email)
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_mentorship_matches_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentorship_matches_modtime
    BEFORE UPDATE ON mentorship_matches
    FOR EACH ROW
    EXECUTE PROCEDURE update_mentorship_matches_timestamp();