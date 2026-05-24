-- 1. DROP EXISTING TYPES IF THEY EXIST
DROP TYPE IF EXISTS message_kind_type CASCADE;

-- 2. CREATE CUSTOM ENUMS
CREATE TYPE message_kind_type AS ENUM (
    'text',
    'session_invite',
    'goal_update',
    'resource_share',
    'system'
);

-- 3. CREATE THE TABLE
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required properties (NOT NULL)
    match_id TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    receiver_email TEXT NOT NULL,
    content TEXT NOT NULL,
    
    -- Optional fields
    attachment_url TEXT,
    
    -- Fields with explicit defaults
    message_type message_kind_type DEFAULT 'text'::message_kind_type,
    is_read BOOLEAN DEFAULT FALSE,
    
    -- Metadata tracking
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AUTOMATIC UPDATE TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_messages_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_messages_modtime
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE PROCEDURE update_messages_timestamp();