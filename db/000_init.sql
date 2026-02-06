CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE completionState AS ENUM ('INCOMPLETE', 'COMPLETE');

CREATE TABLE todos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    state completionState DEFAULT 'INCOMPLETE',
    description TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    completedAt TIMESTAMPTZ DEFAULT NULL
);
