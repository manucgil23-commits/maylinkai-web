import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTracking } from "@/hooks/useTracking";

const Contact = () => {
  const { t } = useLanguage();
  const { trackCTA } = useTracking();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorFields,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorEmail,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t.contact.successTitle,
      description: t.contact.successDescription,
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.contact.title}
            <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
              {t.contact.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.contact.infoTitle}</h3>
              <p className="text-muted-foreground mb-8">
                {t.contact.infoDescription}
              </p>
            </div>

            <div className="space-y-6">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 bg-gradient-card border-border hover:border-brand-purple transition-all group">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors" 
                      aria-hidden="true"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="w-6 h-6 text-brand-purple" aria-hidden="true" />
                    </motion.div>
                  <div>
                    <p className="font-semibold mb-1">{t.contact.email}</p>
                    <a
                      href="mailto:maylinkai00@gmail.com"
                      onClick={() => trackCTA('hablemos_email')}
                      className="text-muted-foreground hover:text-brand-purple transition-colors"
                    >
                      maylinkai00@gmail.com
                    </a>
                  </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 bg-gradient-card border-border hover:border-brand-purple transition-all group">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors" 
                      aria-hidden="true"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone className="w-6 h-6 text-brand-purple" aria-hidden="true" />
                    </motion.div>
                  <div>
                    <p className="font-semibold mb-1">{t.contact.phone}</p>
                    <a
                      href="tel:+34617029088"
                      onClick={() => trackCTA('hablemos_telefono')}
                      className="text-muted-foreground hover:text-brand-purple transition-colors"
                    >
                      +34 617 029 088
                    </a>
                  </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 bg-gradient-card border-border hover:border-brand-purple transition-all group">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors" 
                      aria-hidden="true"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="w-6 h-6 text-brand-purple" aria-hidden="true" />
                    </motion.div>
                  <div>
                    <p className="font-semibold mb-1">{t.contact.location}</p>
                    <p className="text-muted-foreground">{t.contact.locationValue}</p>
                  </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="p-6 bg-brand-purple/5 border border-brand-purple/20 rounded-lg">
              <CheckCircle className="w-8 h-8 text-brand-purple mb-3" aria-hidden="true" />
              <p className="font-semibold mb-2">{t.contact.guaranteeTitle}</p>
              <p className="text-sm text-muted-foreground">
                {t.contact.guaranteeDescription}
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <Card className="p-8 bg-gradient-card border-border w-full">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold mb-2">{t.contact.bookingTitle}</h3>
                <p className="text-muted-foreground mb-8">{t.contact.bookingDescription}</p>
                
                <Button
                  variant="cta"
                  size="lg"
                  onClick={() => {
                    trackCTA('hablemos_demo_final');
                    window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
                  }}
                  className="mx-auto"
                  aria-label="Agendar sesión de estrategia en Cal.com"
                >
                  <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t.contact.scheduleButton}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
