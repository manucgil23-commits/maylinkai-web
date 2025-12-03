import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";


const FloatingBar = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/34123456789?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20sus%20servicios", "_blank");
  };

  const callPhone = () => {
    window.location.href = "tel:+34123456789";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={openWhatsApp}
          size="icon"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-glow group"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Phone Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={callPhone}
          size="icon"
          className="w-14 h-14 rounded-full bg-brand-purple hover:bg-brand-purple-dark shadow-purple group"
          aria-label="Llamar por teléfono"
        >
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="outline"
              className="w-14 h-14 rounded-full border-brand-purple hover:bg-brand-purple/10 group"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-6 h-6 text-brand-purple group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingBar;
