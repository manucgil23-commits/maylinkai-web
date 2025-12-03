import { supabase } from '@/lib/supabase';

export async function POST({ request }: { request: Request }) {
  try {
    const payload = await request.json();
    
    // ✅ SOLUCIÓN DEFINITIVA: @ts-ignore es necesario cuando los tipos RPC fallan
    // Esto es porque Supabase no genera tipos correctamente para funciones RPC dinámicas
    // @ts-ignore - El tipo de la función RPC no se genera automáticamente
    const { error } = await supabase.rpc('insert_cal_com_lead', { 
      payload: payload as any 
    });
    
    if (error) {
      console.error('❌ RPC Error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('✅ Lead insertado:', payload.attendees?.[0]?.email);
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}