import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabaseClient } from '@/lib/supabase';

const PageTracker = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);

  useEffect(() => {
    // 1. Resetear variables al cambiar de página
    startTime.current = Date.now();
    maxScroll.current = 0;
    const supabase: any = supabaseClient.getClient();

    // 2. Preparar datos comunes
    const getCommonData = () => ({
      page_path: location.pathname,
      user_id: localStorage.getItem('maylink_user_id'),
      session_id: sessionStorage.getItem('maylink_session_id'),
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || 'es-ES',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct',
    });

    // 3. Enviar evento PAGE_VIEW (Solo una vez por ruta)
    const trackPageView = async () => {
      await (supabase.from('events') as any).insert([{
        ...getCommonData(),
        type: 'page_view',
      }]);
      if (import.meta.env.DEV) console.log(`👁️ Página vista: ${location.pathname}`);
    };

    trackPageView();

    // 4. Listeners para Scroll y Tiempo
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      maxScroll.current = Math.max(maxScroll.current, scrollPercent);
    };

    // 5. Enviar evento TIME_ON_PAGE al salir
    const handleUnmount = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      // Solo enviar si ha estado al menos 2 segundos
      if (timeSpent > 2) {
        const data = {
            ...getCommonData(),
            type: 'time_on_page',
            time_spent_seconds: timeSpent,
            scroll_depth_percent: maxScroll.current,
        };
        // Usamos navigator.sendBeacon si es posible para asegurar el envío al cerrar
        // Pero como Supabase no soporta beacon nativo fácil, intentamos insert normal
        (supabase.from('events') as any).insert([data]);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleUnmount();
    };
  }, [location.pathname]); // Se ejecuta cada vez que cambia la URL

  return null; // Este componente no renderiza nada visual
};

export default PageTracker;