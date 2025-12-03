import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkeletonBlogGrid } from "@/components/SkeletonCard";
import ConnectedParticles from "@/components/ConnectedParticles";

interface BlogGridProps {
  limit?: number;
}

const BlogGrid = ({ limit = 3 }: BlogGridProps) => {
  const { data: posts, isLoading } = useBlogPosts(limit);
  const { t } = useLanguage();

  if (isLoading) {
    return <SkeletonBlogGrid count={limit} />;
  }

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="blog">
      {/* Background with particles */}
      <div className="absolute inset-0 bg-background">
        <ConnectedParticles />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-purple bg-clip-text text-transparent">
            {t.blog.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full bg-card border border-border rounded-lg overflow-hidden hover:border-brand-purple transition-all duration-300 hover:shadow-purple hover-lift hover-glow focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={`${post.title} - Artículo sobre ${post.category}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="240"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-purple text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          t.blog.locale,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {post.reading_time} {t.blog.minRead}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-purple transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-brand-purple font-medium group-hover:gap-3 transition-all">
                    <span>{t.blog.readMore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-light font-medium text-lg group"
            >
              {t.blog.viewAll}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
