import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useTracking } from '@/hooks/useTracking';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Users, MousePointer, Smartphone, Monitor, Clock, TrendingUp } from 'lucide-react';

interface Metrics {
  totalUsers: number;
  mobileUsers: number;
  desktopUsers: number;
  tabletUsers: number;
  avgTime: number;
  ctaClicks: any[];
  totalVisits: number;
  totalVisitsForPercentage: number;
}

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { trackCTA } = useTracking();
  const { toast } = useToast();

  useEffect(() => {
    if (auth) {
      loadMetrics();
      const interval = setInterval(loadMetrics, 30000);
      return () => clearInterval(interval);
    }
  }, [auth]);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      
      const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      // ✅ OBTENER TODOS LOS EVENTOS
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .gte('created_at', last7Days);

      // CTA clicks
      const { data: ctaData } = await supabase.rpc('get_cta_clicks_last_7_days');

      // ✅ CÁLCULOS CORREGIDOS CON TIPOS EXPLÍCITOS
      const totalEvents = events?.length || 0;
      const uniqueUsers = new Set(events?.map((v: any) => v.user_id) || []).size;

      // ✅ DISPOSITIVOS: Solo el último evento time_on_page por sesión
      const deviceStats: { sessionDevices: Record<string, string> } = events?.reduce((acc: any, v: any) => {
        if (v.type === 'time_on_page') {
          acc.sessionDevices[v.session_id] = v.device_type;
        }
        return acc;
      }, { sessionDevices: {} }) || { sessionDevices: {} };

      const devices: Record<string, number> = Object.values(deviceStats.sessionDevices).reduce((acc: any, device: any) => {
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {});

      const mobileUsers = devices.mobile || 0;
      const desktopUsers = devices.desktop || 0;
      const tabletUsers = devices.tablet || 0;

      // ✅ TIEMPO MEDIO: Tipos explícitos
      const timeEvents: any[] = events?.filter((v: any) => v.type === 'time_on_page') || [];
      const latestTimeBySession = [...new Map(
        timeEvents.map((e: any) => [e.session_id, e])
      ).values()] as any[];

      const avgTime = latestTimeBySession.length > 0 
        ? Math.round(
            latestTimeBySession.reduce((acc: number, v: any) => acc + (v.time_spent_seconds || 0), 0) / 
            latestTimeBySession.length
          )
        : 0;

      // Seguridad para porcentajes
      const totalForPercentage = uniqueUsers || 1;

      setMetrics({
        totalUsers: uniqueUsers,
        mobileUsers,
        desktopUsers,
        tabletUsers,
        avgTime,
        ctaClicks: ctaData || [],
        totalVisits: uniqueUsers, // Visitas = usuarios únicos
        totalVisitsForPercentage: totalForPercentage
      });
    } catch (error) {
      console.error('Error loading metrics:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las métricas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    if (password === import.meta.env.VITE_DASHBOARD_PASSWORD) {
      setAuth(true);
      trackCTA('dashboard_login_success');
    } else {
      toast({
        title: "Error",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
      trackCTA('dashboard_login_failed');
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="w-full max-w-md bg-slate-800 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Dashboard MayLink AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="password"
              placeholder="Contraseña de acceso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && login()}
              className="mb-4 bg-slate-700 border-purple-500 text-white"
            />
            <Button onClick={login} className="w-full bg-purple-600 hover:bg-purple-700">
              Acceder
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          📊 Dashboard MayLink AI
        </h1>

        {/* Métricas Generales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Usuarios Únicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Últimos 7 días</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Clicks Totales</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.ctaClicks?.reduce((acc, c) => acc + c.count, 0) || 0}
              </div>
              <p className="text-xs text-muted-foreground">Botones</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Tiempo Medio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgTime}s</div>
              <p className="text-xs text-muted-foreground">Por visita</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Visitas Totales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalVisits}</div>
              <p className="text-xs text-muted-foreground">Sesiones únicas</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Clicks por Botón */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white">🖱️ Clicks por Botón</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.ctaClicks?.map((cta: any) => (
                  <div key={cta.element} className="flex justify-between items-center">
                    <span className="text-slate-300">{cta.element}</span>
                    <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-bold">
                      {cta.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dispositivos - Corregido */}
          <Card className="bg-slate-800 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white">📱 Dispositivos (por sesión)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.mobileUsers > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Smartphone className="w-4 h-4" /> Móvil
                    </span>
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                      {metrics.mobileUsers} ({Math.round((metrics.mobileUsers / metrics.totalVisitsForPercentage) * 100)}%)
                    </span>
                  </div>
                )}
                {metrics.desktopUsers > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Monitor className="w-4 h-4" /> Desktop
                    </span>
                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      {metrics.desktopUsers} ({Math.round((metrics.desktopUsers / metrics.totalVisitsForPercentage) * 100)}%)
                    </span>
                  </div>
                )}
                {metrics.tabletUsers > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg> Tablet
                    </span>
                    <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                      {metrics.tabletUsers} ({Math.round((metrics.tabletUsers / metrics.totalVisitsForPercentage) * 100)}%)
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón Actualizar */}
        <div className="mt-6 flex justify-end">
          <Button onClick={loadMetrics} className="bg-purple-600 hover:bg-purple-700">
            🔄 Actualizar Datos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;