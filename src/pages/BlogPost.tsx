import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import SocialShare from "@/components/SocialShare";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://maylinkai.com";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { t } = useLanguage();

  // Remove the old useEffect - SEO component will handle it now

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <article className="max-w-4xl mx-auto px-4 py-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full mb-8 rounded-lg" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
          </article>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">{t.blog.postNotFound}</h1>
            <p className="text-muted-foreground mb-8">
              {t.blog.postNotFoundDesc}
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.blog.backToBlog}
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.seo_keywords}
        ogImage={post.cover_image}
        ogType="article"
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at,
          author: post.author_name,
          tags: post.seo_keywords,
        }}
        canonicalUrl={`${BASE_URL}/blog/${post.slug}`}
      />
      <StructuredData
        type="article"
        headline={post.title}
        description={post.excerpt}
        image={post.cover_image}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        author={post.author_name}
        keywords={post.seo_keywords}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Inicio", url: `${BASE_URL}/` },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Breadcrumbs
              items={[
                { label: t.nav.inicio, href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </motion.div>

          {/* Back Button and Share */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-purple transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backToBlog}
            </Link>
            <SocialShare 
              url={`/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt}
            />
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category Badge */}
            <span className="inline-block bg-brand-purple text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-purple bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(post.published_at).toLocaleDateString(
                    t.blog.locale,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>
                  {post.reading_time} {t.blog.minRead}
                </span>
              </div>
              <div className="font-medium text-foreground">
                {post.author_name}
              </div>
            </div>
          </motion.header>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12 rounded-lg overflow-hidden"
          >
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="lazy"
              width="896"
              height="504"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-li:mb-2 max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-border pt-12 mt-12"
          >
            <div className="bg-gradient-card border border-border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-purple bg-clip-text text-transparent">
                {t.blog.ctaTitle}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t.blog.ctaDescription}
              </p>
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "https://cal.com/maylinkai/sesiondeestrategia",
                    "_blank"
                  )
                }
                variant="cta"
              >
                {t.blog.ctaButton}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Keywords */}
          {post.seo_keywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap gap-2">
                {post.seo_keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
