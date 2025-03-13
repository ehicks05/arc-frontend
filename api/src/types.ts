import { AuthUser } from '@supabase/supabase-js';

export interface ApolloContext {
  req: any;
  user?: AuthUser & { id: string };
}
