-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS sfia_category_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE sfia_category_type AS ENUM (
    'strategy_architecture',
    'change_delivery',
    'development_implementation',
    'delivery_operation',
    'skills_quality',
    'relationships_engagement',
    'people_skills'
);

-- 3. CREATE THE TABLE
CREATE TABLE sfia_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL) with code enforcement
    code TEXT UNIQUE NOT NULL, -- Ensures unique lookup codes (e.g., 'PROG')
    name TEXT NOT NULL,
    category sfia_category_type NOT NULL,
    
    -- Optional flat fields
    description TEXT,
    
    -- Arrays of primitives map to native integer arrays
    levels_available INT[] DEFAULT '{}',
    
    -- Array of structured description objects handled elegantly via JSONB
    level_descriptions JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_sfia_skills_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sfia_skills_modtime
    BEFORE UPDATE ON sfia_skills
    FOR EACH ROW
    EXECUTE PROCEDURE update_sfia_skills_timestamp();