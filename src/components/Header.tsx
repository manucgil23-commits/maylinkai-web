import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/maylink-logo.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { trackCTA } = useTracking();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    trackCTA(`nav_scroll_${id}`);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      scrollToSection("inicio");
    }
  };

  const menuItems = [
    { label: t.nav.inicio, id: "inicio" },
    { label: t.nav.porQueElegirnos, id: "por-que-elegirnos" },
    { label: t.nav.servicios, id: "servicios" },
    { label: "Blog", id: "blog" },
    { label: t.nav.faq, id: "faq" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(168,85,247,0.15)] border-b border-brand-purple/10" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="banner"
    >
      <nav 
        className={`container mx-auto px-4 transition-all duration-300 flex items-center justify-between ${
          isScrolled ? "py-2" : "py-4"
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: isScrolled ? 0.85 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={logo} 
            alt="MayLink AI Logo - Automatización inteligente con IA" 
            className={`transition-all duration-300 ${
              isScrolled ? "w-14 h-14" : "w-20 h-20"
            }`} 
            width={isScrolled ? 56 : 80}
            height={isScrolled ? 56 : 80}
            loading="eager"
            decoding="async"
          />
          <span className={`font-bold transition-all duration-300 ${
            isScrolled ? "text-xl" : "text-2xl"
          }`}>
            May<span className="text-brand-purple">Link</span> AI
          </span>
        </motion.div>

        {/* Desktop Menu - Center */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-foreground/80 hover:text-brand-purple transition-colors relative group whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-purple group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </div>

        {/* Desktop Right Side - Contact and Language */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            onClick={() => {
             trackCTA('navbar_cambiar_idioma');
             toggleLanguage();
            }}
            variant="outline"
            size="icon"
            className="border-brand-purple/50 hover:bg-brand-purple/10"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
            title={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
          >
            <Languages className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => {
                trackCTA('navbar_contactanos');
                window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
            }}
            variant="cta"
            aria-label="Agendar sesión de estrategia"
          >
            {t.nav.contacto}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            onClick={() => {
              trackCTA('navbar_mobile_cambiar_idioma');
              toggleLanguage();
            }}
            variant="outline"
            size="icon"
            className="border-brand-purple/50 hover:bg-brand-purple/10"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
            title={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
          >
            <Languages className="w-5 h-5" aria-hidden="true" />
          </Button>
          <button
            className="text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          role="navigation"
          aria-label="Menú móvil"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-foreground/80 hover:text-brand-purple transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                trackCTA('navbar_contactanos_mobile');
                window.open('https://cal.com/maylinkai/sesiondeestrategia', '_blank');
              }}
              variant="cta"
              aria-label="Agendar sesión de estrategia"
            >
              {t.nav.contacto}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
