import { createClient } from "@supabase/supabase-js";

// Cast import.meta to any to avoid TypeScript "Property 'env' does not exist on type 'ImportMeta'" checks
const _meta = /** @type {any} */ (import.meta);
const supabaseUrl = _meta.env?.VITE_SUPABASE_URL;
const supabaseKey = _meta.env?.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
