import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConnectedParticles from "./ConnectedParticles";
import { useLanguage } from "@/contexts/LanguageContext";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Testimonials = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t.testimonials.items.map((item) => ({
    ...item,
    rating: 5,
  }));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="resenas" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background to-background" />

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
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            >
              {t.testimonials.title}
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-light bg-clip-text text-transparent">
                {t.testimonials.titleHighlight}
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t.testimonials.subtitle}
            </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 bg-gradient-card border-border relative overflow-hidden min-h-[400px] flex flex-col hover-glow transition-all duration-300">
                <Quote className="absolute top-4 right-4 w-16 h-16 text-brand-purple/10" />
                
                <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
                  <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-8 h-8 text-brand-purple mb-1" />
                      <span className="text-brand-purple font-bold text-sm">
                        {getInitials(testimonials[currentIndex].name)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-purple text-brand-purple" />
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic flex-1">
                      "{testimonials[currentIndex].text}"
                    </p>
                    
                    <div className="mt-auto">
                      <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                      <p className="text-brand-purple">{testimonials[currentIndex].role}</p>
                      <p className="text-muted-foreground text-sm">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-brand-purple hover:bg-brand-purple/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-brand-purple hover:bg-brand-purple/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-brand-purple w-8" : "bg-muted"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
