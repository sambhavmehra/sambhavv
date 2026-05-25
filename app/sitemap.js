import { supabase } from '../lib/supabase';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = "https://sambhavmehra.me";

  // Define the base static routes
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/tools",
    "/experience",
    "/contact"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isSupabaseConfigured = supabaseUrl && supabaseServiceKey;

  if (isSupabaseConfigured) {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, created_at')
        .order('published_date', { ascending: false });

      if (!error && posts && posts.length > 0) {
        const blogRoutes = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.created_at ? new Date(post.created_at) : new Date(),
        }));
        return [...routes, ...blogRoutes];
      }
    } catch (e) {
      console.error("Failed to generate dynamic sitemap routes from Supabase:", e);
    }
  }

  // Graceful fallback to static routes + mock post paths during local testing or builds
  const mockBlogRoutes = [
    "daily-cyber-digest-zero-days-and-edge-exploits",
    "daily-cyber-digest-microsoft-patches-and-cisa-alerts",
    "daily-cyber-digest-supply-chain-flaws-and-database-breaches"
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...mockBlogRoutes];
}