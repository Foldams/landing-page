-- Create the subscribers table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_source ON subscribers(source);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all subscribers
CREATE POLICY "Allow authenticated users to read all subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert subscribers
CREATE POLICY "Allow authenticated users to insert subscribers"
  ON subscribers FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for authenticated users to update subscribers
CREATE POLICY "Allow authenticated users to update subscribers"
  ON subscribers FOR UPDATE
  TO authenticated
  USING (true);