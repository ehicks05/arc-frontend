import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  { db: { schema: 'arc' as any } },
);

export { supabase };
