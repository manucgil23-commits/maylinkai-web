import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, Puzzle, Heart, TrendingUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import ConnectedParticles from "./ConnectedParticles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTracking } from "@/hooks/useTracking"; 

const reasons = [
  {
    icon: Lightbulb,
    title: "Innovación continua",
    description: "Aplicamos lo más avanzado en IA para mantener tu negocio a la vanguardia tecnológica.",
    expandedContent: "Nuestro equipo está constantemente investigando y aplicando las últimas tecnologías en inteligencia artificial. Trabajamos con modelos de lenguaje de última generación, visión por computadora y aprendizaje automático para garantizar que tu negocio siempre esté un paso adelante.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Puzzle,
    title: "Soluciones personalizadas",
    description: "Adaptamos la tecnología a tus objetivos específicos, no al revés.",
    expandedContent: "Cada negocio es único. Por eso, diseñamos soluciones a medida que se integran perfectamente con tus procesos existentes. No ofrecemos plantillas genéricas, sino desarrollo personalizado que resuelve tus desafíos específicos.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Atención cercana",
    description: "Comunicación directa y humana. Estamos contigo en cada paso del proceso.",
    expandedContent: "Creemos en las relaciones a largo plazo. Tendrás un equipo dedicado que conoce tu negocio y responde rápidamente a tus necesidades. Ofrecemos soporte continuo, formación personalizada y actualizaciones regulares.",
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Resultados medibles",
    description: "Impacto real con datos. Transformamos tu inversión en crecimiento tangible.",
    expandedContent: "Implementamos sistemas de análisis y métricas desde el inicio. Recibirás informes detallados sobre el rendimiento de tus automatizaciones: tiempo ahorrado, conversiones mejoradas, satisfacción del cliente y ROI claro.",
    color: "from-amber-500 to-yellow-500",
  },
];

const WhyChooseUsEnhanced = () => {
  const { t } = useLanguage();
  const { trackCTA } = useTracking();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  return (
    <section id="por-que-elegirnos" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="why-choose-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-secondary/20 to-background" />
      
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
            id="why-choose-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.whyChooseUs.title}
            <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
              {t.whyChooseUs.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.whyChooseUs.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {t.whyChooseUs.cards.map((card, index) => {
            const reason = reasons[index];
            const Icon = reason.icon;
            const isExpanded = expandedCards.has(index);
            
            const toggleCard = (e: React.MouseEvent) => {
              e.stopPropagation();
              const isExpanding = !expandedCards.has(index);
              trackCTA(`whychoose_expand_${card.title.replace(/\s+/g, '_').toLowerCase()}`);
              setExpandedCards(prev => {
                const newSet = new Set(prev);
                if (newSet.has(index)) {
                  newSet.delete(index);
                } else {
                  newSet.add(index);
                }
                return newSet;
              });
            };
            
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex"
              >
                <Card
                  className={`p-6 bg-gradient-card border-border hover:border-brand-purple transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col hover-glow hover-lift focus-visible:ring-2 focus-visible:ring-brand-purple ${
                    isExpanded ? "border-brand-purple shadow-purple" : ""
                  }`}
                  onClick={(e) => toggleCard(e)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(e as any);
                    }
                  }}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    animate={
                      isExpanded
                        ? {
                            opacity: [0.05, 0.1, 0.05],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Floating Code Lines Effect */}
                  {isExpanded && (
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-0.5 bg-brand-purple rounded-full mb-2"
                          initial={{ width: 0 }}
                          animate={{ width: ["0%", "100%", "0%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    
                    {/* Pulsing Ring Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-brand-purple"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-purple transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                    {card.description}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-border/50 pt-4 mt-2">
                          <p className="text-foreground leading-relaxed text-sm">
                            {card.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="flex items-center gap-2 text-brand-purple text-sm font-medium mt-auto pt-4"
                    animate={
                      isExpanded
                        ? { y: [0, -5, 0] }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <span>{isExpanded ? t.whyChooseUs.readLess : t.whyChooseUs.readMore}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: t.whyChooseUs.stats.projectsValue, label: t.whyChooseUs.stats.projectsLabel },
            { value: t.whyChooseUs.stats.satisfactionValue, label: t.whyChooseUs.stats.satisfactionLabel },
            { value: t.whyChooseUs.stats.supportValue, label: t.whyChooseUs.stats.supportLabel },
            { value: t.whyChooseUs.stats.responseValue, label: t.whyChooseUs.stats.responseLabel },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gradient-card border border-border/50 rounded-xl hover:border-brand-purple transition-all group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsEnhanced;
