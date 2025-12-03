import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  canonicalUrl?: string;
  noindex?: boolean;
}

const BASE_URL = "https://maylinkai.com";

const SEO = ({
  title,
  description,
  keywords = [],
  ogImage = `${BASE_URL}/src/assets/robot-cityscape.webp`,
  ogType = "website",
  article,
  canonicalUrl,
  noindex = false,
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  const fullTitle = `${title} | MayLink AI`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="author" content="MayLink AI" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="MayLink AI" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Article specific tags */}
      {ogType === "article" && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@maylinkai" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Language alternatives */}
      <link rel="alternate" hrefLang="es" href={`${siteUrl}${window.location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${window.location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${window.location.pathname}`} />
    </Helmet>
  );
};

export default SEO;
