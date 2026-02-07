CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE completionState AS ENUM ('INCOMPLETE', 'COMPLETE');

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE todos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    state completionState DEFAULT 'INCOMPLETE',
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ DEFAULT NULL,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_todos_user_id ON todos(user_id);

CREATE OR REPLACE FUNCTION update_last_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_update_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_at();