import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, MessageSquareCode, Settings2, ArrowRight, Check, Globe, Zap, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConnectedParticles from "./ConnectedParticles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useTouchGestures } from "@/hooks/useTouchGestures";
import { useTracking } from '@/hooks/useTracking';

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web y Aplicaciones",
    price: "Consultar",
    description: "Sitios web y aplicaciones profesionales con hosting y mantenimiento incluido.",
    features: [],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    icon: Settings2,
    title: "Software a Medida",
    price: "Consultar",
    description: "Sistemas personalizados de gestión, turnos y procesos.",
    features: [],
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    featured: true,
  },
  {
    icon: MessageSquareCode,
    title: "IA Conversacional",
    price: "Consultar",
    description: "Agentes inteligentes, chatbots y asistentes de voz.",
    features: [],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Automatización de Procesos",
    price: "Consultar",
    description: "Optimiza tu operativa automatizando tareas y workflows.",
    features: [],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    icon: Palette,
    title: "Branding y Estrategia Digital",
    price: "Consultar",
    description: "Logos profesionales, SEO y estrategia digital integral.",
    features: [],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
  },
];

// Particles for icon animation
const IconParticles = ({ gradient }: { gradient: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${gradient}`}
          initial={{
            x: Math.random() * 64,
            y: Math.random() * 64,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * 64,
              Math.random() * 64,
              Math.random() * 64,
            ],
            y: [
              Math.random() * 64,
              Math.random() * 64,
              Math.random() * 64,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Services3D = () => {
  const { t } = useLanguage();
  const { trackCTA } = useTracking();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setIsAutoRotating(false);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoRotating(false);
  };

  useKeyboardNavigation({
    onNext: nextService,
    onPrev: prevService,
    isEnabled: isInView,
  });

  useTouchGestures({
    onSwipeLeft: nextService,
    onSwipeRight: prevService,
    isEnabled: isInView,
  });

  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useEffect(() => {
    if (isAutoRotating) return;
    
    const timer = setTimeout(() => {
      setIsAutoRotating(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAutoRotating, currentIndex]);

  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="services-heading">
      {/* Connected Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ConnectedParticles />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          >
            <motion.h2
              id="services-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {t.services.title}
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
                {t.services.titleHighlight}
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t.services.subtitle}
            </motion.p>
        </motion.div>

        {/* Carousel 3D */}
        <div className="relative h-[680px] flex items-center justify-center overflow-hidden mb-8" role="region" aria-label="Carrusel de servicios" aria-live="polite">
          <div className="relative w-full max-w-7xl">
            {services.map((service, index) => {
              // Calculate circular offset
              let offset = index - currentIndex;
              if (offset > services.length / 2) offset -= services.length;
              if (offset < -services.length / 2) offset += services.length;
              
              const absOffset = Math.abs(offset);
              const Icon = service.icon;
              
              // Don't render items that are too far away
              if (absOffset > 2) return null;
              
              return (
                <motion.div
                  key={service.title}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  initial={false}
                  animate={{
                    x: offset * 380 - 175,
                    y: -250,
                    scale: absOffset === 0 ? 1.15 : absOffset === 1 ? 0.85 : 0.6,
                    opacity: absOffset > 2 ? 0 : absOffset === 2 ? 0.5 : absOffset === 1 ? 0.85 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 35,
                  }}
                  style={{
                    zIndex: absOffset === 0 ? 50 : absOffset === 1 ? 40 : 30,
                  }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoRotating(false);
                  }}
                  whileHover={absOffset === 0 ? { scale: 1.25, y: -260 } : {}}
                  whileTap={absOffset === 0 ? { scale: 1.12 } : {}}
                >
                  <Card
                    className={`w-[350px] p-6 bg-gradient-card border-border transition-all duration-500 hover-glow ${
                      absOffset === 0
                        ? "border-brand-purple shadow-purple"
                        : "border-border/50"
                    } ${service.featured && absOffset === 0 ? "ring-2 ring-brand-purple/50" : ""}`}
                  >
                    {service.featured && absOffset === 0 && (
                      <div className="absolute top-4 right-4 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </div>
                    )}

                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <IconParticles gradient={service.gradient} />
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                        animate={
                          absOffset === 0
                            ? {
                                boxShadow: [
                                  "0 0 20px rgba(168, 85, 247, 0.4)",
                                  "0 0 40px rgba(168, 85, 247, 0.6)",
                                  "0 0 20px rgba(168, 85, 247, 0.4)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.5} aria-hidden="true" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-center">{t.services.packs[index].title}</h3>
                    <div className="text-center mb-2">
                      <span className="text-lg font-semibold text-brand-purple">{t.services.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-center text-sm">
                      {t.services.packs[index].description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {t.services.packs[index].features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-xs"
                          initial={{ opacity: 0, x: -20 }}
                          animate={absOffset === 0 ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                          transition={{ delay: absOffset === 0 ? 0.3 + i * 0.1 : 0 }}
                        >
                          <Check className="w-3 h-3 text-brand-purple mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {absOffset === 0 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          const safeTitle = service.title.toLowerCase().replace(/\s+/g, '_');
                          trackCTA(`servicios_demo_${safeTitle}`);
                          window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
                        }}
                        variant="cta"
                        className="w-full mt-4"
                        aria-label={`Solicitar información sobre ${t.services.packs[index].title}`}
                      >
                        {t.services.requestInfo}
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />  
                      </Button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20" role="tablist" aria-label="Navegación de servicios">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoRotating(false);
                }}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-brand-purple w-8 h-3"
                    : "bg-border hover:bg-brand-purple/50 w-3 h-3"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir al servicio ${t.services.packs[index].title}`}
                role="tab"
                aria-selected={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services3D;
