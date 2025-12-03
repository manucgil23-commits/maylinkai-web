import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  type: "organization";
}

interface ArticleSchemaProps {
  type: "article";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  keywords?: string[];
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface FAQSchemaProps {
  type: "faq";
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface ServiceSchemaProps {
  type: "service";
  services: Array<{
    name: string;
    description: string;
  }>;
}

type StructuredDataProps =
  | OrganizationSchemaProps
  | ArticleSchemaProps
  | BreadcrumbSchemaProps
  | FAQSchemaProps
  | ServiceSchemaProps;

const StructuredData = (props: StructuredDataProps) => {
  const getSchema = () => {
    const baseUrl = window.location.origin;

    if (props.type === "organization") {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MayLink AI",
        url: baseUrl,
        logo: `${baseUrl}/favicon.ico`,
        description:
          "Creamos automatizaciones con inteligencia artificial que impulsan tu negocio. Páginas web, chatbots inteligentes y soluciones a medida.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+34-617-029-088",
          contactType: "Customer Service",
          email: "maylinkai00@gmail.com",
          availableLanguage: ["Spanish", "English"],
        },
        sameAs: [
          "https://twitter.com/maylinkai",
        ],
      };
    }

    if (props.type === "article") {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: props.headline,
        description: props.description,
        image: props.image,
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        author: {
          "@type": "Person",
          name: props.author,
        },
        publisher: {
          "@type": "Organization",
          name: "MayLink AI",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/favicon.ico`,
          },
        },
        keywords: props.keywords?.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": window.location.href,
        },
      };
    }

    if (props.type === "breadcrumb") {
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
    }

    if (props.type === "faq") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: props.questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      };
    }

    if (props.type === "service") {
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: props.services.map((service, index) => ({
          "@type": "Service",
          position: index + 1,
          name: service.name,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: "MayLink AI",
            url: baseUrl,
          },
        })),
      };
    }
  };

  const schema = getSchema();

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default StructuredData;
