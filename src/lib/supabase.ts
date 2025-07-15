import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yoldrqnimgaimhofnqbe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbGRycW5pbWdhaW1ob2ZucWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjQ3ODAsImV4cCI6MjA2NzU0MDc4MH0.MoeqJrDgEx1cUYyUBq9fXsttAvaeHrcZPgfMW72ko5c';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if we're using fallback values and log a warning
if (supabaseUrl === 'https://placeholder-url.supabase.co') {
  console.warn('Supabase URL not configured. Using localStorage fallback for development.');
} else {
  console.log('Supabase configured with URL:', supabaseUrl);
}

// Function to check if we can connect to Supabase and ensure table exists
export const ensureSubscribersTable = async () => {
  try {
    // Skip if we're using fallback URL
    if (supabase.supabaseUrl === 'https://placeholder-url.supabase.co') {
      return;
    }
    
    // Check if the subscribers table exists
    const { error: checkError, data } = await supabase
      .from('app_756f9e3ca9454cb782f1af778d02d691_subscribers')
      .select('count()')
      .limit(1);
      
    if (checkError) {
      console.log('Subscribers table may not exist, attempting to create it');
      
      // Create the subscribers table using SQL
      const { error: createError } = await supabase.rpc('create_subscribers_table', {});
      
      if (createError) {
        console.error('Error creating subscribers table using RPC:', createError);
        
        // Try creating the table using a SQL query through Supabase Manager
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS public.subscribers (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            name TEXT,
            source TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
          );
          
          -- Add row level security policies
          ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
          
          -- Create policy for admins to read all subscribers
          DROP POLICY IF EXISTS "Admin users can read all subscribers" ON public.subscribers;
          CREATE POLICY "Admin users can read all subscribers" 
            ON public.subscribers 
            FOR SELECT USING (
              auth.role() = 'authenticated'
            );
          
          -- Create policy for anyone to insert
          DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
          CREATE POLICY "Anyone can subscribe" 
            ON public.subscribers 
            FOR INSERT WITH CHECK (true);
        `;
        
        try {
          // Since we're in a browser environment, we don't have direct SQL access
          // Using the RPC method instead
          const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
          if (sqlError) {
            console.error('Failed to create subscribers table using RPC:', sqlError);
            throw new Error('Unable to create subscribers table');
          } else {
            console.log('Created subscribers table via RPC SQL execution');
          }
        } catch (error) {
          console.error('Error creating table:', error);
          throw new Error('Unable to create subscribers table');
        }
      } else {
        console.log('Successfully created subscribers table');
      }
    } else {
      console.log('Successfully connected to subscribers table');
    }
  } catch (error) {
    console.error('Error checking/creating Supabase subscribers table:', error);
  }
};

// Initialize the database schema
export const initializeSupabase = async () => {
  try {
    // Check if Supabase is properly configured
    if (supabase.supabaseUrl === 'https://placeholder-url.supabase.co') {
      console.log('Supabase not configured, using localStorage fallback');
      return;
    }
    
    await ensureSubscribersTable();
    console.log('Supabase initialized successfully');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    console.log('Falling back to localStorage for data storage');
  }
};