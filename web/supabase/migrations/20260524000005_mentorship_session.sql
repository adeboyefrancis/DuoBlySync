-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS session_category_type CASCADE;
DROP TYPE IF EXISTS session_format_type CASCADE;
DROP TYPE IF EXISTS session_status_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE session_category_type AS ENUM (
    'one_on_one',
    'goal_review',
    'skill_assessment',
    'career_planning',
    'body_doubling',
    'focus_session'
);

CREATE TYPE session_format_type AS ENUM (
    'video_call',
    'voice_call',
    'text_chat',
    'in_person'
);

CREATE TYPE session_status_type AS ENUM (
    'scheduled',
    'in_progress',
    'completed',
    'cancelled',
    'no_show'
);

-- 3. CREATE THE TABLE
CREATE TABLE mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    match_id TEXT NOT NULL,
    mentor_email TEXT NOT NULL,
    mentee_email TEXT NOT NULL,
    title TEXT NOT NULL,
    scheduled_date TIMESTAMPTZ NOT NULL,
    
    -- Optional properties
    description TEXT,
    duration_minutes INT,
    session_type session_category_type,
    format session_format_type,
    notes TEXT,
    
    -- Numeric ratings with validation rules built-in
    mentor_rating INT CHECK (mentor_rating >= 1 AND mentor_rating <= 5),
    mentee_rating INT CHECK (mentee_rating >= 1 AND mentee_rating <= 5),
    
    -- Properties with explicit defaults
    status session_status_type DEFAULT 'scheduled'::session_status_type,
    
    -- Array of custom action item objects
    action_items JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_mentorship_sessions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentorship_sessions_modtime
    BEFORE UPDATE ON mentorship_sessions
    FOR EACH ROW
    EXECUTE PROCEDURE update_mentorship_sessions_timestamp();