import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

type TranslationObject = Record<string, any>;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationObject;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      porQueElegirnos: "Por qué elegirnos",
      resenas: "Reseñas",
      faq: "FAQ",
      contacto: "Contáctanos",
    },
    hero: {
      badge: "Innovación en Automatización",
      title: "Conectando ",
      titlePart2: "posibilidades ",
      titlePart3: "infinitas",
      description: "Creamos automatizaciones con inteligencia artificial que impulsan tu negocio hacia el futuro. Soluciones personalizadas que transforman ideas en realidad.",
      cta1: "Descubre nuestros servicios",
      cta2: "Agenda tu demo gratuita",
      stats: {
        projectsValue: "50+",
        projects: "Proyectos completados",
        satisfactionValue: "98%",
        satisfaction: "Satisfacción cliente",
        supportValue: "24/7",
        support: "Soporte disponible",
        responseValue: "3 días",
        response: "Respuesta garantizada",
      }
    },
    whyChooseUs: {
      title: "¿Por qué elegir ",
      titleHighlight: "MayLink AI?",
      subtitle: "Soluciones de IA diseñadas para tu éxito empresarial",
      readMore: "Ver más",
      readLess: "Ver menos",
      cards: [
        {
          title: "Innovación continua",
          description: "Aplicamos lo más avanzado en IA para mantener tu negocio a la vanguardia tecnológica.",
          detail: "Nuestro equipo está constantemente investigando y aplicando las últimas tecnologías en inteligencia artificial. Trabajamos con modelos de lenguaje de última generación, visión por computadora y aprendizaje automático para garantizar que tu negocio siempre esté un paso adelante.",
        },
        {
          title: "Soluciones personalizadas",
          description: "Adaptamos la tecnología a tus objetivos específicos, no al revés.",
          detail: "Cada negocio es único. Por eso, diseñamos soluciones a medida que se integran perfectamente con tus procesos existentes. No ofrecemos plantillas genéricas, sino desarrollo personalizado que resuelve tus desafíos específicos.",
        },
        {
          title: "Atención cercana",
          description: "Comunicación directa y humana. Estamos contigo en cada paso del proceso.",
          detail: "Creemos en las relaciones a largo plazo. Tendrás un equipo dedicado que conoce tu negocio y responde rápidamente a tus necesidades. Ofrecemos soporte continuo, formación personalizada y actualizaciones regulares.",
        },
        {
          title: "Resultados medibles",
          description: "Impacto real con datos. Transformamos tu inversión en crecimiento tangible.",
          detail: "Implementamos sistemas de análisis y métricas desde el inicio. Recibirás informes detallados sobre el rendimiento de tus automatizaciones: tiempo ahorrado, conversiones mejoradas, satisfacción del cliente y ROI claro.",
        },
      ],
      stats: {
        projectsValue: "50+",
        projectsLabel: "Proyectos completados",
        satisfactionValue: "98%",
        satisfactionLabel: "Satisfacción cliente",
        supportValue: "24/7",
        supportLabel: "Soporte disponible",
        responseValue: "3 días",
        responseLabel: "Respuesta garantizada",
      },
    },
    services: {
      title: "Nuestros ",
      titleHighlight: "Servicios",
      subtitle: "Elige el pack perfecto para impulsar tu transformación digital",
      requestInfo: "Solicita tu demo gratuita",
      price: "Consultar",
      packs: [
        {
          title: "Desarrollo Web y Aplicaciones",
          description: "Sitios web y aplicaciones profesionales con hosting y mantenimiento incluido para garantizar tu presencia digital.",
          features: [
            "Diseño responsive y moderno",
            "Hosting seguro y optimizado",
            "Mantenimiento continuo",
            "Optimización SEO avanzada",
          ],
        },
        {
          title: "Software a Medida",
          description: "Cualquier aplicación, sistema o solución programada que cubra tus necesidades específicas. Desde CRMs y gestión hasta herramientas completamente personalizadas.",
          features: [
            "Aplicaciones personalizadas",
            "Sistemas de gestión integral",
            "CRMs y herramientas empresariales",
            "Soluciones para cualquier necesidad",
          ],
        },
        {
          title: "IA Conversacional",
          description: "Agentes inteligentes, chatbots y asistentes de voz que revolucionan tu atención al cliente las 24 horas.",
          features: [
            "Agentes de IA avanzados",
            "Chatbots multicanal",
            "Asistentes de voz inteligentes",
            "RAG para respuestas contextuales",
          ],
        },
        {
          title: "Automatización de Procesos",
          description: "Optimiza tu operativa automatizando tareas repetitivas y flujos de trabajo complejos.",
          features: [
            "Integración entre plataformas",
            "Automatización de workflows",
            "Reducción de tareas manuales",
            "Análisis y optimización continua",
          ],
        },
        {
          title: "Branding y Estrategia Digital",
          description: "Construye tu identidad de marca con logos profesionales, SEO y estrategia digital integral.",
          features: [
            "Diseño de logos y branding",
            "Estrategia SEO completa",
            "Marketing digital",
            "Diseño de identidad corporativa",
          ],
        },
      ],
    },
    testimonials: {
      title: "Lo que dicen ",
      titleHighlight: "nuestros clientes",
      subtitle: "Resultados reales de empresas que confiaron en nosotros",
      items: [
        {
          name: "Carlos Méndez",
          company: "PymeTech Solutions",
          role: "Director General",
          text: "Gracias a MayLink AI, nuestra web ahora responde automáticamente a los clientes. La eficiencia ha aumentado un 300% y nuestros clientes están encantados.",
        },
        {
          name: "Laura Ríos",
          company: "EstudioNova",
          role: "Fundadora",
          text: "Automatizamos nuestras reservas con IA y el cambio fue increíble. Ya no perdemos ninguna cita y podemos enfocarnos en lo que realmente importa: nuestros clientes.",
        },
        {
          name: "Miguel Torres",
          company: "Digital Ventures",
          role: "CEO",
          text: "El equipo de MayLink AI transformó nuestra atención al cliente. El chatbot responde con precisión y la integración fue perfecta. Totalmente recomendable.",
        },
        {
          name: "Ana Martínez",
          company: "Consultora Horizonte",
          role: "Directora de Operaciones",
          text: "Profesionales de primer nivel. Entendieron perfectamente nuestras necesidades y crearon una solución que superó nuestras expectativas.",
        },
        {
          name: "David Sánchez",
          company: "TechStart",
          role: "CTO",
          text: "La automatización que implementaron nos ha ahorrado más de 20 horas semanales. La inversión se pagó sola en menos de dos meses.",
        },
      ],
    },
    faq: {
      title: "Preguntas ",
      titleHighlight: "frecuentes",
      subtitle: "Resolvemos tus dudas más comunes sobre nuestros servicios",
      moreQuestions: "¿Tienes más preguntas?",
      contactUs: "Contáctanos y te responderemos enseguida",
      contactButton: "Ir a contacto",
      questions: [
        {
          question: "¿Qué tipo de automatizaciones pueden crear?",
          answer: "Creamos automatizaciones personalizadas con IA para una amplia variedad de procesos: chatbots inteligentes, automatización de atención al cliente, análisis de datos, procesamiento de documentos, integración de sistemas, y mucho más. Cada solución se adapta específicamente a las necesidades de tu negocio."
        },
        {
          question: "¿Cuánto tiempo tarda en implementarse una solución?",
          answer: "El tiempo varía según la complejidad del proyecto. Proyectos simples pueden estar listos en 1-2 semanas, mientras que soluciones más complejas pueden tomar 4-8 semanas. Siempre ofrecemos un cronograma detallado después de la consulta inicial."
        },
        {
          question: "¿Necesito conocimientos técnicos para usar las automatizaciones?",
          answer: "No. Diseñamos todas nuestras soluciones para que sean intuitivas y fáciles de usar. Además, proporcionamos capacitación completa a tu equipo y documentación detallada. Nuestro soporte está disponible siempre que lo necesites."
        },
        {
          question: "¿Cómo funciona el proceso de trabajo?",
          answer: "Comenzamos con una consulta gratuita para entender tus necesidades. Luego creamos una propuesta personalizada con presupuesto y cronograma. Una vez aprobado, desarrollamos la solución en sprints iterativos con tu feedback continuo. Finalmente, implementamos, capacitamos y ofrecemos soporte continuo."
        },
        {
          question: "¿Qué tipo de soporte ofrecen después de la implementación?",
          answer: "Ofrecemos soporte continuo con respuesta garantizada. Esto incluye mantenimiento, actualizaciones, resolución de problemas y mejoras incrementales. También proporcionamos informes mensuales de rendimiento y análisis de métricas."
        },
        {
          question: "¿Cuál es el coste aproximado de una automatización?",
          answer: "Cada proyecto es único y adaptamos nuestros precios según tus necesidades específicas. Ofrecemos presupuestos personalizados sin compromiso después de una consulta inicial donde entendemos el alcance y complejidad de tu proyecto."
        },
        {
          question: "¿Las soluciones se integran con mis sistemas actuales?",
          answer: "Sí, diseñamos nuestras automatizaciones para integrarse perfectamente con tus sistemas existentes: CRM, ERP, bases de datos, APIs, aplicaciones web y móviles. Trabajamos con las tecnologías más populares y podemos adaptarnos a infraestructuras personalizadas."
        }
      ],
    },
    contact: {
      title: "Hablemos de tu ",
      titleHighlight: "proyecto",
      subtitle: "¿Tienes un proyecto en mente? Cuéntanos sobre tu idea y te responderemos en menos de 24 horas",
      infoTitle: "Información de contacto",
      infoDescription: "Estamos aquí para ayudarte a transformar tu negocio con IA. Contáctanos y descubre cómo podemos impulsar tu crecimiento.",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      locationValue: "Madrid, España",
      guaranteeTitle: "Respuesta garantizada",
      guaranteeDescription: "Nos comprometemos a responderte en menos de 24 horas laborables",
      formName: "Nombre completo",
      formEmail: "Email",
      formMessage: "Mensaje",
      formNamePlaceholder: "Juan Pérez",
      formEmailPlaceholder: "tu@email.com",
      formMessagePlaceholder: "Cuéntanos sobre tu proyecto...",
      formSubmit: "Agendar demo gratuita",
      formSubmitting: "Enviando...",
      formPrivacy: "Al enviar este formulario, aceptas nuestra política de privacidad",
      errorTitle: "Error",
      errorFields: "Por favor, completa todos los campos",
      errorEmail: "Por favor, introduce un email válido",
      successTitle: "¡Mensaje enviado!",
      successDescription: "Te responderemos en menos de 24 horas",
      bookingTitle: "Agenda tu sesión de estrategia",
      bookingDescription: "Elige el mejor horario para ti y hablemos de tu proyecto",
      scheduleButton: "Reserva tu demo gratuita ahora",
    },
    footer: {
      description: "Conectando posibilidades infinitas. Automatizaciones con inteligencia artificial que impulsan tu negocio hacia el futuro.",
      quickLinks: "Enlaces rápidos",
      legal: "Legal",
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      legalNotice: "Aviso legal",
      cookies: "Cookies",
      copyright: "Todos los derechos reservados",
      madeWith: "Hecho con",
      madeIn: "en España",
    },
    aboutUs: {
      title: "Sobre ",
      titleHighlight: "Nosotros",
      subtitle: "Transformando el futuro con inteligencia artificial",
      visionTitle: "Nuestra Visión",
      visionText: "Ser líderes en innovación tecnológica, creando soluciones de automatización con IA que revolucionen la forma en que las empresas operan y crecen en el mundo digital.",
      missionTitle: "Nuestra Misión",
      missionText: "Proporcionar automatizaciones inteligentes y personalizadas que simplifiquen procesos complejos, optimicen recursos y permitan a nuestros clientes enfocarse en lo que realmente importa: hacer crecer su negocio.",
      valuesTitle: "Nuestros Valores",
      values: [
        {
          name: "Innovación",
          description: "Estamos siempre a la vanguardia de la tecnología"
        },
        {
          name: "Excelencia",
          description: "Cada proyecto es una oportunidad para superar expectativas"
        },
        {
          name: "Compromiso",
          description: "Tu éxito es nuestro éxito, estamos contigo en cada paso"
        }
      ]
    },
    blog: {
      title: "Últimos Artículos",
      subtitle: "Descubre insights, casos de éxito y tendencias en IA y automatización",
      pageTitle: "Blog",
      pageDescription: "Artículos sobre inteligencia artificial, automatización empresarial y transformación digital",
      readMore: "Leer más",
      viewAll: "Ver todos los artículos",
      minRead: "min lectura",
      locale: "es-ES",
      noPosts: "No hay artículos disponibles",
      noPostsDesc: "Vuelve pronto para ver nuestros próximos artículos",
      backHome: "Volver al inicio",
      postNotFound: "Artículo no encontrado",
      postNotFoundDesc: "El artículo que buscas no existe o ha sido eliminado",
      backToBlog: "Volver al blog",
      ctaTitle: "¿Quieres implementar esto en tu negocio?",
      ctaDescription: "Agenda una sesión estratégica gratuita y descubre cómo la IA puede transformar tu empresa",
      ctaButton: "Agenda tu demo gratuita",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      servicios: "Services",
      porQueElegirnos: "Why Choose Us",
      resenas: "Reviews",
      faq: "FAQ",
      contacto: "Contact Us",
    },
    hero: {
      badge: "Innovation in Automation",
      title: "Connecting ",
      titlePart2: "infinite ",
      titlePart3: "possibilities",
      description: "We create AI-powered automations that drive your business into the future. Customized solutions that transform ideas into reality.",
      cta1: "Discover our services",
      cta2: "Book your free demo",
      stats: {
        projectsValue: "50+",
        projects: "Completed projects",
        satisfactionValue: "98%",
        satisfaction: "Customer satisfaction",
        supportValue: "24/7",
        support: "Support available",
        responseValue: "3 days",
        response: "Guaranteed response",
      }
    },
    whyChooseUs: {
      title: "Why choose ",
      titleHighlight: "MayLink AI?",
      subtitle: "AI solutions designed for your business success",
      readMore: "Read more",
      readLess: "Read less",
      cards: [
        {
          title: "Continuous Innovation",
          description: "We apply the most advanced AI to keep your business at the technological forefront.",
          detail: "Our team is constantly researching and applying the latest artificial intelligence technologies. We work with state-of-the-art language models, computer vision, and machine learning to ensure your business is always one step ahead.",
        },
        {
          title: "Personalized Solutions",
          description: "We adapt technology to your specific goals, not the other way around.",
          detail: "Every business is unique. That's why we design tailored solutions that integrate perfectly with your existing processes. We don't offer generic templates, but personalized development that solves your specific challenges.",
        },
        {
          title: "Close Attention",
          description: "Direct and human communication. We are with you every step of the way.",
          detail: "We believe in long-term relationships. You'll have a dedicated team that knows your business and responds quickly to your needs. We offer continuous support, personalized training, and regular updates.",
        },
        {
          title: "Measurable Results",
          description: "Real impact with data. We transform your investment into tangible growth.",
          detail: "We implement analysis and metrics systems from the start. You'll receive detailed reports on the performance of your automations: time saved, improved conversions, customer satisfaction, and clear ROI.",
        },
      ],
      stats: {
        projectsValue: "50+",
        projectsLabel: "Projects completed",
        satisfactionValue: "98%",
        satisfactionLabel: "Client satisfaction",
        supportValue: "24/7",
        supportLabel: "Support available",
        responseValue: "3 days",
        responseLabel: "Guaranteed response",
      },
    },
    services: {
      title: "Our ",
      titleHighlight: "Services",
      subtitle: "Choose the perfect package to boost your digital transformation",
      requestInfo: "Book your free demo",
      price: "Consult",
      packs: [
        {
          title: "Web and App Development",
          description: "Professional websites and applications with hosting and maintenance included to ensure your digital presence.",
          features: [
            "Responsive and modern design",
            "Secure and optimized hosting",
            "Continuous maintenance",
            "Advanced SEO optimization",
          ],
        },
        {
          title: "Custom Software",
          description: "Any application, system, or programmed solution that meets your specific needs. From CRMs and management to completely custom tools.",
          features: [
            "Custom applications",
            "Comprehensive management systems",
            "CRMs and business tools",
            "Solutions for any need",
          ],
        },
        {
          title: "Conversational AI",
          description: "Intelligent agents, chatbots and voice assistants that revolutionize your customer service 24/7.",
          features: [
            "Advanced AI agents",
            "Multichannel chatbots",
            "Intelligent voice assistants",
            "RAG for contextual responses",
          ],
        },
        {
          title: "Process Automation",
          description: "Optimize your operations by automating repetitive tasks and complex workflows.",
          features: [
            "Platform integration",
            "Workflow automation",
            "Manual task reduction",
            "Continuous analysis and optimization",
          ],
        },
        {
          title: "Branding and Digital Strategy",
          description: "Build your brand identity with professional logos, SEO and comprehensive digital strategy.",
          features: [
            "Logo and branding design",
            "Complete SEO strategy",
            "Digital marketing",
            "Corporate identity design",
          ],
        },
      ],
    },
    testimonials: {
      title: "What our ",
      titleHighlight: "customers say",
      subtitle: "Real results from companies that trusted us",
      items: [
        {
          name: "Carlos Méndez",
          company: "PymeTech Solutions",
          role: "CEO",
          text: "Thanks to MayLink AI, our website now automatically responds to customers. Efficiency has increased by 300% and our customers are delighted.",
        },
        {
          name: "Laura Ríos",
          company: "EstudioNova",
          role: "Founder",
          text: "We automated our bookings with AI and the change was incredible. We no longer miss any appointments and can focus on what really matters: our customers.",
        },
        {
          name: "Miguel Torres",
          company: "Digital Ventures",
          role: "CTO",
          text: "The MayLink AI team transformed our customer service. The chatbot responds accurately and the integration was perfect. Totally recommended.",
        },
        {
          name: "Ana Martínez",
          company: "Consultora Horizonte",
          role: "Operations Director",
          text: "Top-level professionals. They perfectly understood our needs and created a solution that exceeded our expectations.",
        },
        {
          name: "David Sánchez",
          company: "TechStart",
          role: "CTO",
          text: "The automation they implemented has saved us more than 20 hours per week. The investment paid for itself in less than two months.",
        },
      ],
    },
    faq: {
      title: "Frequently ",
      titleHighlight: "asked questions",
      subtitle: "We answer your most common questions about our services",
      moreQuestions: "Have more questions?",
      contactUs: "Contact us and we'll answer you right away",
      contactButton: "Go to contact",
      questions: [
        {
          question: "What type of automations can you create?",
          answer: "We create custom AI automations for a wide variety of processes: intelligent chatbots, customer service automation, data analysis, document processing, system integration, and much more. Each solution is specifically adapted to your business needs."
        },
        {
          question: "How long does it take to implement a solution?",
          answer: "Time varies depending on project complexity. Simple projects can be ready in 1-2 weeks, while more complex solutions may take 4-8 weeks. We always offer a detailed timeline after the initial consultation."
        },
        {
          question: "Do I need technical knowledge to use the automations?",
          answer: "No. We design all our solutions to be intuitive and easy to use. In addition, we provide complete training to your team and detailed documentation. Our support is available whenever you need it."
        },
        {
          question: "How does the work process work?",
          answer: "We start with a free consultation to understand your needs. Then we create a personalized proposal with budget and timeline. Once approved, we develop the solution in iterative sprints with your continuous feedback. Finally, we implement, train and offer continuous support."
        },
        {
          question: "What type of support do you offer after implementation?",
          answer: "We offer continuous support with guaranteed response. This includes maintenance, updates, troubleshooting and incremental improvements. We also provide monthly performance reports and metrics analysis."
        },
        {
          question: "What is the approximate cost of an automation?",
          answer: "Each project is unique and we adapt our prices according to your specific needs. We offer personalized quotes without commitment after an initial consultation where we understand the scope and complexity of your project."
        },
        {
          question: "Do the solutions integrate with my current systems?",
          answer: "Yes, we design our automations to integrate seamlessly with your existing systems: CRM, ERP, databases, APIs, web and mobile applications. We work with the most popular technologies and can adapt to custom infrastructures."
        }
      ],
    },
    contact: {
      title: "Let's talk about your ",
      titleHighlight: "project",
      subtitle: "Have a project in mind? Tell us about your idea and we'll respond within 24 hours",
      infoTitle: "Contact information",
      infoDescription: "We're here to help you transform your business with AI. Contact us and discover how we can boost your growth.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationValue: "Madrid, Spain",
      guaranteeTitle: "Guaranteed response",
      guaranteeDescription: "We commit to respond within 24 business hours",
      formName: "Full name",
      formEmail: "Email",
      formMessage: "Message",
      formNamePlaceholder: "John Doe",
      formEmailPlaceholder: "your@email.com",
      formMessagePlaceholder: "Tell us about your project...",
      formSubmit: "Send message",
      formSubmitting: "Sending...",
      formPrivacy: "By submitting this form, you accept our privacy policy",
      errorTitle: "Error",
      errorFields: "Please fill in all fields",
      errorEmail: "Please enter a valid email",
      successTitle: "Message sent!",
      successDescription: "We'll respond within 24 hours",
      bookingTitle: "Schedule your strategy session",
      bookingDescription: "Choose the best time for you and let's talk about your project",
      scheduleButton: "Schedule Meeting",
    },
    footer: {
      description: "Connecting infinite possibilities. AI-powered automations that drive your business into the future.",
      quickLinks: "Quick links",
      legal: "Legal",
      privacy: "Privacy policy",
      terms: "Terms and conditions",
      legalNotice: "Legal notice",
      cookies: "Cookies",
      copyright: "All rights reserved",
      madeWith: "Made with",
      madeIn: "in Spain",
    },
    aboutUs: {
      title: "About ",
      titleHighlight: "Us",
      subtitle: "Transforming the future with artificial intelligence",
      visionTitle: "Our Vision",
      visionText: "To be leaders in technological innovation, creating AI automation solutions that revolutionize the way companies operate and grow in the digital world.",
      missionTitle: "Our Mission",
      missionText: "Provide intelligent and personalized automations that simplify complex processes, optimize resources and allow our clients to focus on what really matters: growing their business.",
      valuesTitle: "Our Values",
      values: [
        {
          name: "Innovation",
          description: "We are always at the forefront of technology"
        },
        {
          name: "Excellence",
          description: "Every project is an opportunity to exceed expectations"
        },
        {
          name: "Commitment",
          description: "Your success is our success, we are with you every step"
        }
      ]
    },
    blog: {
      title: "Latest Articles",
      subtitle: "Discover insights, success stories and trends in AI and automation",
      pageTitle: "Blog",
      pageDescription: "Articles about artificial intelligence, business automation and digital transformation",
      readMore: "Read more",
      viewAll: "View all articles",
      minRead: "min read",
      locale: "en-US",
      noPosts: "No articles available",
      noPostsDesc: "Come back soon to see our upcoming articles",
      backHome: "Back home",
      postNotFound: "Article not found",
      postNotFoundDesc: "The article you're looking for doesn't exist or has been removed",
      backToBlog: "Back to blog",
      ctaTitle: "Want to implement this in your business?",
      ctaDescription: "Schedule a free strategy session and discover how AI can transform your company",
      ctaButton: "Schedule your free demo",
    },
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
