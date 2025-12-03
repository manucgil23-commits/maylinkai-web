import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ConnectedParticles from "./ConnectedParticles";
import { useTracking } from "@/hooks/useTracking"; // 👈 1. IMPORTADO

const FAQ = () => {
  const { t } = useLanguage();
  const { trackCTA } = useTracking(); // 👈 2. INICIADO
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
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
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.faq.title}
            <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
              {t.faq.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.faq.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.questions.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 hover:border-brand-purple transition-colors"
                >
                  <AccordionTrigger 
                    onClick={() => trackCTA(`faq_abrir_pregunta_${index + 1}`)} // 👈 3. TRACKING DE PREGUNTAS
                    className="text-left hover:text-brand-purple hover:no-underline py-5"
                  >
                    <span className="font-semibold text-base md:text-lg">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-card p-8 rounded-2xl border border-border max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              <ConnectedParticles />
            </div>
            <HelpCircle className="w-12 h-12 text-brand-purple mx-auto mb-4 relative z-10" aria-hidden="true" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">{t.faq.moreQuestions}</h3>
            <p className="text-muted-foreground mb-6 relative z-10">
              {t.faq.contactUs}
            </p>
            <Button
              onClick={() => {
                trackCTA('faq_ir_a_contacto'); // 👈 4. TRACKING BOTÓN FINAL
                window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
              }}
              variant="cta"
              className="relative z-10"
              aria-label="Agendar sesión de estrategia"
            >
              {t.faq.contactButton}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;