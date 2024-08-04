import { createClient } from '@supabase/supabase-js';
import config from '../config.js';

const supabaseUrl = config.supabaseUrl;
const supabaseAnonKey = config.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;