import { createClient } from "@supabase/supabase-js";

// 🚀 Safely guard the environment lookup using optional chaining
const supabaseUrl =
  import.meta?.env?.VITE_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseAnonKey) {
  console.warn(
    "⚠️ Warning: VITE_SUPABASE_ANON_KEY is empty. Check your root .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
