/*
  # Create agreements table

  1. New Tables
    - `agreements`
      - `id` (uuid, primary key)
      - `beat_id` (integer, references beats)
      - `license_id` (text)
      - `signature` (text)
      - `full_name` (text)
      - `email` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `agreements` table
    - Add policy for authenticated users to read their own agreements
*/

CREATE TABLE IF NOT EXISTS agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beat_id integer NOT NULL,
  license_id text NOT NULL,
  signature text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own agreements"
  ON agreements
  FOR SELECT
  TO authenticated
  USING (email = current_user);