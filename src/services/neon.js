import { createClient, SupabaseAuthAdapter } from "@neondatabase/neon-js";

// Unified Neon client for finex: Neon Auth (via the Supabase-compatible adapter
// so existing `auth.signInWithPassword` / `getUser` / `signOut` calls keep
// working) + the Neon Data API for database access. The auth JWT is attached to
// every Data API request automatically, so RLS decides what each request can do.
//
// URLs come from the Neon Console (ep-purple-waterfall project):
//   - Auth URL     -> Console > Auth
//   - Data API URL -> Console > Data API  (…/rest/v1)
const neon = createClient({
  auth: {
    adapter: SupabaseAuthAdapter(),
    url: import.meta.env.VITE_APP_NEON_AUTH_URL,
  },
  dataApi: {
    url: import.meta.env.VITE_APP_NEON_DATA_API_URL,
  },
});

export default neon;
