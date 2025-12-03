// src/hooks/useTracking.ts
import { useEffect, useRef } from 'react';
import { supabaseClient } from '@/lib/supabase';

// --- Funciones auxiliares (se mantienen igual) ---
const getUserId = () => {
  let userId = localStorage.getItem('maylink_user_id');
  if (!userId) {
    userId = (crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15));
    localStorage.setItem('maylink_user_id', userId);
  }
  return userId;
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('maylink_session_id');
  if (!sessionId) {
    sessionId = (crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15));
    sessionStorage.setItem('maylink_session_id', sessionId);
  }
  return sessionId;
};

const isFirstVisit = () => {
  const visited = localStorage.getItem('maylink_visited');
  if (!visited) {
    localStorage.setItem('maylink_visited', 'true');
    return true;
  }
  return false;
};

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getReferrer = () => {
  const ref = document.referrer;
  if (ref.includes('linkedin.com')) return 'linkedin';
  if (ref.includes('google.com')) return 'google';
  if (ref.includes('facebook.com')) return 'facebook';
  return ref || 'direct';
};

// --- PERSISTENCIA EN SESIÓN ---
const SESSION_START_KEY = 'maylink_session_start';
const CURRENT_EVENT_ID_KEY = 'maylink_current_event_id';

const getPersistedStartTime = () => {
  const saved = sessionStorage.getItem(SESSION_START_KEY);
  return saved ? parseInt(saved) : null;
};

const setPersistedStartTime = (time: number) => {
  sessionStorage.setItem(SESSION_START_KEY, time.toString());
};

const getPersistedEventId = () => {
  return sessionStorage.getItem(CURRENT_EVENT_ID_KEY);
};

const setPersistedEventId = (id: string | null) => {
  if (id) {
    sessionStorage.setItem(CURRENT_EVENT_ID_KEY, id);
  } else {
    sessionStorage.removeItem(CURRENT_EVENT_ID_KEY);
  }
};

// --- VARIABLES GLOBALES ---
let pageStartTime: number | null = null;
let intervalId: number | null = null;
let isTrackingActive = false;

// --- UPSERT DE TIEMPO ---
const upsertTimeEvent = async (timeInSeconds: number, isInitial: boolean = false) => {
  const supabase = supabaseClient.getClient();
  const userId = getUserId();
  const sessionId = getSessionId();
  const pagePath = window.location.pathname;
  
  const eventData: any = {
    type: 'time_on_page',
    element: `${timeInSeconds}s`,
    page_path: pagePath,
    user_id: userId,
    session_id: sessionId,
    device_type: getDeviceType(),
    screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language || 'es-ES',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid',
    referrer: getReferrer(),
    is_first_visit: isFirstVisit(),
    time_spent_seconds: timeInSeconds,
    metadata: {
      interval: !isInitial,
      last_update: new Date().toISOString(),
      current_page: pagePath
    }
  };

  try {
    const currentEventId = getPersistedEventId();
    
    if (isInitial || !currentEventId) {
      // @ts-ignore
      const { data, error } = await supabase.from('events').insert([eventData]).select('id');
      
      if (error) throw error;
      
      // @ts-ignore
      const newId = data?.[0]?.id || null;
      setPersistedEventId(newId);
      
      if (import.meta.env.DEV) console.log(`📊 Tracking: ${timeInSeconds}s (ID: ${newId?.substring(0, 8)}...)`);
    } else {
      // @ts-ignore
      const { error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', currentEventId);
      
      if (error) throw error;
      
      if (import.meta.env.DEV) console.log(`⏱️ Tracking: ${timeInSeconds}s (ID: ${currentEventId?.substring(0, 8)}...)`);
    }
  } catch (err: any) {
    console.error('❌ Error tracking:', err.message);
  }
};

// --- INICIAR TRACKING ---
const startTimeTracking = () => {
  // ✅ Silencioso: no mostrar warning si ya está activo
  if (isTrackingActive) {
    return; // Salir sin log
  }

  const savedStartTime = getPersistedStartTime();
  if (savedStartTime) {
    pageStartTime = savedStartTime;
  } else {
    pageStartTime = Date.now();
    setPersistedStartTime(pageStartTime);
  }

  isTrackingActive = true;
  
  // Actualizar inmediatamente
  const currentTime = Math.floor((Date.now() - pageStartTime) / 1000);
  upsertTimeEvent(currentTime, true);
  
  // Actualizar cada 10s
  intervalId = window.setInterval(() => {
    if (pageStartTime) {
      const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
      upsertTimeEvent(timeOnPage, false);
    }
  }, 10000);
};

// --- DETENER TRACKING ---
const stopTimeTracking = () => {
  if (intervalId !== null) {
    if (pageStartTime) {
      const finalTime = Math.floor((Date.now() - pageStartTime) / 1000);
      upsertTimeEvent(finalTime, false);
    }
    
    window.clearInterval(intervalId);
    intervalId = null;
  }
  pageStartTime = null;
  isTrackingActive = false;
};

// --- HOOK PRINCIPAL ---
export const useTracking = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    startTimeTracking();
    
    // Limpiar al cerrar pestaña
    const handleBeforeUnload = () => {
      stopTimeTracking();
      sessionStorage.removeItem(SESSION_START_KEY);
      sessionStorage.removeItem(CURRENT_EVENT_ID_KEY);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      initializedRef.current = false;
    };
  }, []);

  // --- FUNCIONES PÚBLICAS ---
  const sendEvent = async (type: string, element: string | null, metadata: any = {}) => {
    const supabase = supabaseClient.getClient();
    const data: any = {
      type,
      element,
      page_path: window.location.pathname,
      user_id: getUserId(),
      session_id: getSessionId(),
      device_type: getDeviceType(),
      screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || 'es-ES',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid',
      referrer: getReferrer(),
      is_first_visit: isFirstVisit(),
      time_spent_seconds: null,
      metadata
    };
    
    try {
      // @ts-ignore
      await supabase.from('events').insert([data]);
      if (import.meta.env.DEV) console.log(`📡 Evento: ${type} - ${element}`);
    } catch (err: any) {
      console.error('❌ Error evento:', err.message);
    }
  };

  const trackCTA = (buttonName: string) => sendEvent('cta_click', buttonName);
  
  const trackFormStart = (formName: string) => sendEvent('form_start', formName);

  const trackFormSubmit = (formName: string, formData: any) => sendEvent('form_submit', formName, { formData });

  return { trackCTA, trackFormStart, trackFormSubmit };
};