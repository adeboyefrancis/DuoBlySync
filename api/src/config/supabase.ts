import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types"; // Reading cleanly through your symlink!

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "🔧 Critical Setup Error: Missing local Supabase environment definitions.",
  );
}

// Exporting a unified, type-safe Postgres wrapper client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
