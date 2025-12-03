import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import robotCityscape from "@/assets/robot-cityscape.webp";
import TypewriterText from "./TypewriterText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTracking } from '@/hooks/useTracking';

const Hero = () => {
  const { t } = useLanguage();
  const { trackCTA } = useTracking();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* Full Background Robot Image */}
      <div className="absolute inset-0">
        <img
          src={robotCityscape}
          alt="Robot futurista con inteligencia artificial observando ciudad tecnológica - Automatización empresarial"
          className="w-full h-full object-cover opacity-65"
          loading="eager"      
          fetchpriority="high"
          decoding="async"
          width="1200" 
          height="675" 
        />
        {/* Gradient overlays for smoother transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-[1]">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-purple rounded-full will-change-transform"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center lg:justify-start min-h-screen">
          {/* Text Content - Centered/Left aligned over full background */}
          <motion.div
            className="max-w-3xl text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span className="text-sm text-brand-purple-light">
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TypewriterText 
                text={t.hero.title}
                delay={100}
              />
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
                <TypewriterText 
                  text={t.hero.titlePart2}
                  delay={1080}
                />
                <TypewriterText 
                  text={t.hero.titlePart3}
                  delay={1900}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                variant="cta"
                onClick={() => {
                    trackCTA('hero_descubre_servicios');
                    scrollToSection("servicios");
                }}
                className="group"
              >
                {t.hero.cta1}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                    trackCTA('hero_agenda_demo_principal');
                    window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
                }}
                className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
              >
                {t.hero.cta2}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-1">{t.hero.stats.projectsValue}</div>
                <div className="text-sm text-foreground/80">{t.hero.stats.projects}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-1">{t.hero.stats.satisfactionValue}</div>
                <div className="text-sm text-foreground/80">{t.hero.stats.satisfaction}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-1">{t.hero.stats.supportValue}</div>
                <div className="text-sm text-foreground/80">{t.hero.stats.support}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-1">{t.hero.stats.responseValue}</div>
                <div className="text-sm text-foreground/80">{t.hero.stats.response}</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-brand-purple rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-brand-purple rounded-full will-change-transform"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
