import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const consent = localStorage.getItem('maylink_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('maylink_cookie_consent', 'accepted');
    setShow(false);
    window.dispatchEvent(new Event('maylink_tracking_activated'));
  };

  const reject = () => {
    localStorage.setItem('maylink_cookie_consent', 'rejected');
    setShow(false);
  };

  if (!hydrated || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-2xl border-t border-purple-500/30">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl">
        <div className="flex items-start gap-3">
          <Cookie className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Usamos cookies para mejorar tu experiencia</h3>
            <p className="text-sm text-slate-300">
              Analizamos el uso de la web para optimizar nuestros servicios. 
              <a href="/privacidad" className="text-purple-400 hover:text-purple-300 ml-2 underline">
                Política de privacidad
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={reject} 
            variant="outline" 
            size="sm"
            className="text-white border-white/30 hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-2" />
            Rechazar
          </Button>
          <Button 
            onClick={accept} 
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Aceptar cookies
          </Button>
        </div>
      </div>
    </div>
  );
};