-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS platform_role_type CASCADE;
DROP TYPE IF EXISTS swipe_action_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE platform_role_type AS ENUM (
    'mentor',
    'mentee'
);

CREATE TYPE swipe_action_type AS ENUM (
    'like',
    'pass',
    'super_like'
);

-- 3. CREATE THE TABLE
CREATE TABLE profile_swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    swiper_email TEXT NOT NULL,
    swiper_role platform_role_type NOT NULL,
    target_email TEXT NOT NULL,
    target_role platform_role_type NOT NULL,
    action swipe_action_type NOT NULL,
    
    -- Properties with explicit defaults
    is_match BOOLEAN DEFAULT FALSE,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Data Integrity Guard: Ensure users cannot swipe on themselves
    CONSTRAINT check_not_self_swipe CHECK (swiper_email != target_email)
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_profile_swipes_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_swipes_modtime
    BEFORE UPDATE ON profile_swipes
    FOR EACH ROW
    EXECUTE PROCEDURE update_profile_swipes_timestamp();