import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE!;

export const supabase = createClient(supabaseUrl, serviceRole, {
  auth: { persistSession: false },
});
