import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vyihbujkbsyltodxgusq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aWhidWprYnN5bHRvZHhndXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTI1MTQsImV4cCI6MjA3MzAyODUxNH0.EMAxfsBS4gkizRi6kFfX05iVWn8WWzDD2-onQkKroMQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
