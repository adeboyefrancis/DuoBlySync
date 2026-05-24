-- 1. DROP EXISTING TYPES IF THEY EXIST (Prevents crash if rerunning scripts)
DROP TYPE IF EXISTS focus_session_type CASCADE;
DROP TYPE IF EXISTS focus_session_status CASCADE;
DROP TYPE IF EXISTS recurrence_pattern_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE focus_session_type AS ENUM (
    'body_doubling', 
    'accountability_checkin', 
    'collaborative_work', 
    'quiet_focus'
);

CREATE TYPE focus_session_status AS ENUM (
    'open', 
    'full', 
    'in_progress', 
    'completed', 
    'cancelled'
);

CREATE TYPE recurrence_pattern_type AS ENUM (
    'daily', 
    'weekly', 
    'biweekly', 
    'monthly'
);

-- 3. CREATE THE TABLE
CREATE TABLE focus_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    host_email TEXT NOT NULL,
    title TEXT NOT NULL,
    session_type focus_session_type NOT NULL,
    scheduled_date TIMESTAMPTZ NOT NULL,
    
    -- Optional properties
    description TEXT,
    duration_minutes INT,
    max_participants INT,
    
    -- Array property mapping to native Postgres text array
    participants TEXT[] DEFAULT '{}',
    
    -- Properties with default constraints
    status focus_session_status DEFAULT 'open'::focus_session_status,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern recurrence_pattern_type,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER (Keeps updated_at accurate)
CREATE OR REPLACE FUNCTION update_focus_sessions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_focus_sessions_modtime
    BEFORE UPDATE ON focus_sessions
    FOR EACH ROW
    EXECUTE PROCEDURE update_focus_sessions_timestamp();