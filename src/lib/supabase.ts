// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// VALIDACIÓN FUERTE
if (!supabaseUrl) {
  throw new Error('❌ FATAL: VITE_SUPABASE_URL no está definida en .env');
}
if (!supabaseKey) {
  throw new Error('❌ FATAL: VITE_SUPABASE_ANON_KEY no está definida en .env');
}

// ✅ SINGLETON CORRECTO (una sola instancia)
class SupabaseSingleton {
  private static instance: ReturnType<typeof createClient> | null = null;

  static getClient() {
    if (!SupabaseSingleton.instance) {
      SupabaseSingleton.instance = createClient(supabaseUrl, supabaseKey);
    }
    return SupabaseSingleton.instance;
  }
}

export const supabaseClient = SupabaseSingleton;
export const supabase = SupabaseSingleton.getClient();