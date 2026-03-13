import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqfiduydicukkebxolsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZmlkdXlkaWN1a2tlYnhvbHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0Mzc3MTQsImV4cCI6MjA4OTAxMzcxNH0.W77Ybp6xsXt7CStwnZ6wimN2R--9i-CG5dYinPQyhAU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
