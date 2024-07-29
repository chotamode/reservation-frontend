import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_LOCAL;
const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID_LOCAL;
const supabaseUrl = `https://${supabaseProjectId}.supabase.co`;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getToken = () => {
    const storageKey = `sb-${supabaseProjectId}-auth-token`;
    const sessionDataString = localStorage.getItem(storageKey);
    const sessionData = JSON.parse(sessionDataString || "null");
    const token = sessionData?.access_token;

    return token;
};

export default supabase;