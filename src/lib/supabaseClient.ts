import { createClient } from '@supabase/supabase-js';

// Your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://vcyywmyzqgpaucwrqtcw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjeXl3bXl6cWdwYXVjd3JxdGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzA2MTIsImV4cCI6MjA2NzcwNjYxMn0._8QqUEpRDCotD0uUmEP4twFPFOkuGsWXLwpeXMaESxE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 