import { supabase } from '../lib/supabase';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = "https://sambhavmehra.me";

  // Base static routes with SEO priorities & change frequencies
  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/experience`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/llms.txt`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${baseUrl}/llms-full.txt`, priority: 0.7, changeFrequency: 'weekly' },
  ].map((route) => ({
    ...route,
    lastModified: new Date().toISOString(),
  }));

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isSupabaseConfigured = supabaseUrl && supabaseServiceKey;

  if (isSupabaseConfigured) {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, created_at, published_date')
        .order('published_date', { ascending: false });

      if (!error && posts && posts.length > 0) {
        const blogRoutes = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: (post.published_date || post.created_at)
            ? new Date(post.published_date || post.created_at).toISOString()
            : new Date().toISOString(),
          priority: 0.7,
          changeFrequency: 'weekly',
        }));
        return [...staticRoutes, ...blogRoutes];
      }
    } catch (e) {
      console.error("Failed to generate dynamic sitemap routes from Supabase:", e);
    }
  }

  // Fallback mock post paths for local build / preview environment
  const mockBlogRoutes = [
    "daily-cyber-digest-zero-days-and-edge-exploits",
    "daily-cyber-digest-microsoft-patches-and-cisa-alerts",
    "daily-cyber-digest-supply-chain-flaws-and-database-breaches"
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.7,
    changeFrequency: 'weekly',
  }));

  return [...staticRoutes, ...mockBlogRoutes];
}