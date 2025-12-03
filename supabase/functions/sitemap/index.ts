import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { rateLimit, getRateLimitHeaders } from '../_shared/rateLimit.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Rate limiting - 30 requests per minute per IP
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const rateLimitResult = rateLimit(clientIp, { maxRequests: 30, windowMs: 60000 });
  
  if (!rateLimitResult.allowed) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        ...corsHeaders,
        ...getRateLimitHeaders(rateLimitResult.remaining, rateLimitResult.resetTime),
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    const baseUrl = 'https://maylinkai.lovable.app'
    
    // Static pages
    const staticUrls = [
      {
        loc: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        loc: `${baseUrl}/blog`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
      }
    ]

    // Dynamic blog post URLs
    const blogUrls = posts?.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updated_at.split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    })) || []

    // Combine all URLs
    const allUrls = [...staticUrls, ...blogUrls]

    // Generate XML sitemap
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${url.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url.loc}" />
  </url>`).join('\n')}
</urlset>`

    console.log(`Generated sitemap with ${allUrls.length} URLs (${posts?.length || 0} blog posts)`)

    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        ...getRateLimitHeaders(rateLimitResult.remaining, rateLimitResult.resetTime),
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
