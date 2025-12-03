import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load heavy components
const WhyChooseUsEnhanced = lazy(() => import("@/components/WhyChooseUsEnhanced"));
const Services3D = lazy(() => import("@/components/Services3D"));
const BlogGrid = lazy(() => import("@/components/blog/BlogGrid"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader on first visit in this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    return !hasSeenLoader;
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenLoader', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // FAQ structured data - using first 3 questions
  const faqData = [
    {
      question: "¿Qué tipo de automatizaciones pueden crear?",
      answer: "Creamos automatizaciones personalizadas con IA para una amplia variedad de procesos: chatbots inteligentes, automatización de atención al cliente, análisis de datos, procesamiento de documentos, integración de sistemas, y mucho más. Cada solución se adapta específicamente a las necesidades de tu negocio.",
    },
    {
      question: "¿Cuánto tiempo tarda en implementarse una solución?",
      answer: "El tiempo varía según la complejidad del proyecto. Proyectos simples pueden estar listos en 1-2 semanas, mientras que soluciones más complejas pueden tomar 4-8 semanas. Siempre ofrecemos un cronograma detallado después de la consulta inicial.",
    },
    {
      question: "¿Necesito conocimientos técnicos para usar las automatizaciones?",
      answer: "No. Diseñamos todas nuestras soluciones para que sean intuitivas y fáciles de usar. Además, proporcionamos capacitación completa a tu equipo y documentación detallada. Nuestro soporte está disponible siempre que lo necesites.",
    },
  ];

  // Services structured data
  const servicesData = [
    {
      name: "Desarrollo Web y Aplicaciones",
      description: "Sitios web y aplicaciones profesionales con hosting y mantenimiento incluido para garantizar tu presencia digital.",
    },
    {
      name: "Chatbots Inteligentes",
      description: "Asistentes virtuales con IA que atienden a tus clientes 24/7, mejorando la satisfacción y reduciendo costos.",
    },
    {
      name: "Automatizaciones Personalizadas",
      description: "Soluciones a medida que optimizan procesos, ahorran tiempo y aumentan la eficiencia de tu negocio.",
    },
  ];

  return (
    <>
      <SEO
        title="Automatización Inteligente con IA para tu Negocio"
        description="Creamos automatizaciones con inteligencia artificial que impulsan tu negocio. Desarrollo web profesional, chatbots inteligentes y soluciones personalizadas con IA."
        keywords={[
          "inteligencia artificial",
          "automatización empresarial",
          "chatbots IA",
          "desarrollo web",
          "soluciones digitales",
          "automatización procesos",
          "IA personalizada",
          "transformación digital",
        ]}
        ogType="website"
      />
      <StructuredData type="organization" />
      <StructuredData type="faq" questions={faqData} />
      <StructuredData type="service" services={servicesData} />
      
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero />
            <Suspense fallback={<div className="min-h-screen" />}>
              <WhyChooseUsEnhanced />
              <Services3D />
              <BlogGrid limit={3} />
              <Testimonials />
              <FAQ />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
