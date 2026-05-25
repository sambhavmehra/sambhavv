import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { Calendar, Shield, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Daily Cyber Digest | Cybersecurity Resource Hub',
  description: 'Stay updated with automated daily cybersecurity digests summarizing key vulnerabilities, active threats, and critical security alerts from trusted official sources.',
};

// Fetch digests from Supabase
async function getBlogPosts() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase env keys not configured. No data to show.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category, published_date, source_links, structured_content')
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Supabase query failed:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.error('Failed to retrieve blog posts:', err);
    return [];
  }
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

function getDisplayTitle(post) {
  if (post.title && post.title.includes("Daily Cyber Digest") && post.structured_content && post.structured_content.news_items && post.structured_content.news_items.length > 0) {
    return post.structured_content.news_items[0].title;
  }
  return post.title;
}

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-background py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 text-[var(--matrix-green)] font-mono text-sm mb-3">
            <Shield size={16} />
            <span>CYBERSECURITY INTELLIGENCE FEED</span>
          </div>
          <h1 className="text-4xl font-bold font-mono tracking-tight text-foreground sm:text-5xl mb-4">
            Daily Cyber <span className="text-[var(--matrix-green)]">Digest</span>
          </h1>
          <p className="text-foreground/70 max-w-3xl text-base leading-relaxed">
            Stay informed with our automated daily security briefings. We curate, summarize, and link to critical security feeds, CVE alerts, and threat updates from trusted publications (CISA, BleepingComputer, The Hacker News) to keep you ahead of adversaries.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
            <p className="text-foreground/50 font-mono">No security briefings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group relative flex flex-col justify-between p-6 rounded-lg bg-[rgba(10,10,10,0.4)] border border-white/10 hover:border-[var(--matrix-green)]/40 hover:bg-white/5 transition-all duration-300"
              >
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[var(--matrix-green)]/10 text-[var(--matrix-green)] border border-[var(--matrix-green)]/20 font-mono">
                      {post.category || 'Daily Digest'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-mono">
                      <Calendar size={12} />
                      <span>{formatDate(post.published_date)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold font-mono text-foreground group-hover:text-[var(--matrix-green)] transition-colors mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {getDisplayTitle(post)}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-foreground/75 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Sources Preview */}
                  {post.source_links && post.source_links.length > 0 && (
                    <div className="mb-6 space-y-1.5">
                      <span className="text-[10px] text-foreground/40 font-mono tracking-wider">SOURCES:</span>
                      <div className="flex flex-wrap gap-2">
                        {post.source_links.slice(0, 2).map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--matrix-green)] hover:underline truncate max-w-full font-mono flex items-center gap-1 bg-[var(--matrix-green)]/5 px-2 py-1 rounded border border-[var(--matrix-green)]/10"
                            title={link.title}
                          >
                            {link.title.substring(0, 30)}{link.title.length > 30 ? '...' : ''}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Read Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--matrix-green)] group-hover:text-[var(--cyber-blue)] transition-colors font-mono"
                  >
                    <span>ANALYZE REPORT</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}


