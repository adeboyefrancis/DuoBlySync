-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS goal_category_type CASCADE;
DROP TYPE IF EXISTS goal_status_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE goal_category_type AS ENUM (
    'skill_development',
    'career_transition',
    'certification',
    'project_completion',
    'networking',
    'leadership',
    'other'
);

CREATE TYPE goal_status_type AS ENUM (
    'not_started',
    'in_progress',
    'completed',
    'on_hold',
    'abandoned'
);

-- 3. CREATE THE TABLE
CREATE TABLE mentorship_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    match_id TEXT NOT NULL,          -- Connects to your future MentorshipMatch table
    mentee_email TEXT NOT NULL,
    title TEXT NOT NULL,
    category goal_category_type NOT NULL,
    
    -- Optional properties
    description TEXT,
    target_sfia_skill TEXT,
    current_level INT,
    target_level INT,
    
    -- Date targets formatted as pure Calendar Dates (YYYY-MM-DD)
    target_date DATE,
    
    -- Properties with explicit defaults
    status goal_status_type DEFAULT 'not_started'::goal_status_type,
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    
    -- Nested milestones array of objects handled smoothly in JSONB
    milestones JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_mentorship_goals_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentorship_goals_modtime
    BEFORE UPDATE ON mentorship_goals
    FOR EACH ROW
    EXECUTE PROCEDURE update_mentorship_goals_timestamp();