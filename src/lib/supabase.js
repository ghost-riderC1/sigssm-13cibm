import { createClient } from '@supabase/supabase-js';

// Essas variáveis de ambiente ficam escondidas e seguras. 
// O Vite as lê do seu arquivo ".env" localizado na raiz do projeto.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
