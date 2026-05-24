-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS general_skill_type CASCADE;
DROP TYPE IF EXISTS skill_sfia_category_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE general_skill_type AS ENUM (
    'sfia',
    'custom',
    'soft_skill',
    'tool',
    'language',
    'certification'
);

CREATE TYPE skill_sfia_category_type AS ENUM (
    'strategy_architecture',
    'change_delivery',
    'development_implementation',
    'delivery_operation',
    'skills_quality',
    'relationships_engagement',
    'people_skills',
    'none'
);

-- 3. CREATE THE TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    name TEXT NOT NULL UNIQUE, -- Enforces uniqueness so skill entries aren't duplicated
    type general_skill_type NOT NULL,
    
    -- Optional fields (Null fields correspond to blank non-SFIA spaces)
    sfia_code TEXT,
    sfia_category skill_sfia_category_type DEFAULT 'none'::skill_sfia_category_type,
    description TEXT,
    
    -- Array strings mapping perfectly to native text arrays
    industry_tags TEXT[] DEFAULT '{}',
    levels_supported TEXT[] DEFAULT '{}',
    
    -- Boolean flags with strict application layer defaults
    is_verified BOOLEAN DEFAULT FALSE,
    created_by_user BOOLEAN DEFAULT FALSE,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_skills_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_skills_modtime
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE PROCEDURE update_skills_timestamp();