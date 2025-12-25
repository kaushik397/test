import { createClient } from "@supabase/supabase-js";

// Client-side Supabase instance. Use NEXT_PUBLIC_* env vars for browser usage.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default supabase;
