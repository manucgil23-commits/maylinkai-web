import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const BASE_URL = "https://maylinkai.com";

const Blog = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t.blog.pageTitle}
        description={t.blog.pageDescription}
        keywords={[
          "blog IA",
          "inteligencia artificial",
          "automatización",
          "tecnología",
          "transformación digital",
          "chatbots",
          "desarrollo web",
        ]}
        canonicalUrl={`${BASE_URL}/blog`}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Inicio", url: `${BASE_URL}/` },
          { name: "Blog", url: `${BASE_URL}/blog` },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            >
              {t.blog.pageTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {t.blog.pageDescription}
            </motion.p>
          </div>
        </section>

        {/* Blog Posts */}
        <BlogList />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
