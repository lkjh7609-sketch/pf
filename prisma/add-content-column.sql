-- Add content column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content TEXT;

-- Add content column to writings table
ALTER TABLE writings ADD COLUMN IF NOT EXISTS content TEXT;
