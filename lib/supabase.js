import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn('Warning: SUPABASE_URL environment variable is missing.');
}
if (!supabaseServiceKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY environment variable is missing.');
}

// Client is configured using the service role key to allow writing digests and reading posts.
// Since this client doesn't use the NEXT_PUBLIC_ prefix, Next.js keeps these environment variables
// server-side only. This prevents key leakage to the client-side bundle.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key'
);
