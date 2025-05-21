/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `is_pro` (boolean)
      - `streak` (integer)
      - `habit_score` (integer)
      - `joined_at` (timestamp)
      - `last_active` (timestamp)
    
    - `checklists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `platform` (text)
      - `is_daily` (boolean)
      - `created_at` (timestamp)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `checklist_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `completed` (boolean)
      - `is_premade` (boolean)
      - `is_custom` (boolean)
      - `created_at` (timestamp)
      - `due_date` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  is_pro boolean DEFAULT false,
  streak integer DEFAULT 0,
  habit_score integer DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  last_active timestamptz DEFAULT now()
);

-- Create checklists table
CREATE TABLE IF NOT EXISTS checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  platform text NOT NULL,
  is_daily boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id uuid REFERENCES checklists(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  is_premade boolean DEFAULT false,
  is_custom boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  due_date timestamptz
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can manage their own checklists"
  ON checklists
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage tasks in their checklists"
  ON tasks
  FOR ALL
  TO authenticated
  USING (checklist_id IN (
    SELECT id FROM checklists WHERE user_id = auth.uid()
  ));