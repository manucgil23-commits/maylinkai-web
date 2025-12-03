import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

const BASE_URL = "https://maylinkai.com";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  useEffect(() => {
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": `${BASE_URL}/`
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.label,
          ...(item.href && { "item": `${BASE_URL}${item.href}` })
        }))
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbList);
    script.id = 'breadcrumb-schema';
    
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById('breadcrumb-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [items]);

  return (
    <Breadcrumb className="bg-secondary/30 rounded-lg px-4 py-3">
      <BreadcrumbList>
        {/* Primer item: Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" aria-label="Inicio">
              <Home className="w-4 h-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separador después de Home */}
        <BreadcrumbSeparator>
          <ChevronRight className="w-4 h-4" />
        </BreadcrumbSeparator>

        {/* Items dinámicos */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href || "/"}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {/* Separador después de cada item excepto el último */}
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;