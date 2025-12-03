import { motion } from "framer-motion";
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useTracking } from "@/hooks/useTracking";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { trackCTA } = useTracking();
  const BASE_URL = "https://maylinkai.com";
  const fullUrl = `${BASE_URL}${url}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  };

  const handleCopyLink = async () => {
    trackCTA('socialshare_copylink');
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace se ha copiado al portapapeles",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    trackCTA(`socialshare_${platform}`);
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-brand-purple/50 hover:bg-brand-purple/10 hover:border-brand-purple"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Compartir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-2 cursor-pointer">
          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-2 cursor-pointer">
          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('facebook')} className="gap-2 cursor-pointer">
          <Facebook className="w-4 h-4 text-[#1877F2]" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span>Copiar enlace</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
