-- Add category and tags columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add category and tags columns to writings table
ALTER TABLE writings ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE writings ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
