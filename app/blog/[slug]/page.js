import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, ExternalLink, Activity, Info, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPostBySlug(slug) {

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Supabase query exception:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const displayTitle = getDisplayTitle(post);

  return {
    title: `${displayTitle} | Cyber Digest`,
    description: post.excerpt,
    alternates: {
      canonical: `https://sambhavmehra.me/blog/${slug}`,
    },
  };
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { structured_content = {}, source_links = [] } = post;
  const { overview = '', news_items = [], takeaway = '' } = structured_content;

  return (
    <div className="min-h-screen bg-background py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Back Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/50 hover:text-[var(--matrix-green)] transition-colors font-mono mb-8"
        >
          <ArrowLeft size={14} />
          <span>BACK TO BRIEFINGS</span>
        </Link>
 
        {/* Article Header */}
        <header className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[var(--matrix-green)]/10 text-[var(--matrix-green)] border border-[var(--matrix-green)]/20 font-mono">
              {post.category || 'Daily Digest'}
            </span>
            <span className="text-xs text-foreground/50 font-mono">
              PUBLISHED: {formatDate(post.published_date)}
            </span>
          </div>
          <h1 className="text-3xl font-bold font-mono text-foreground sm:text-4xl leading-tight">
            {getDisplayTitle(post)}
          </h1>
        </header>

        {/* Article Content */}
        <div className="space-y-10">
          
          {/* Section: Overview */}
          {overview && (
            <section className="bg-white/[0.02] border border-white/5 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-[var(--matrix-green)] font-mono text-sm mb-3">
                <Info size={16} />
                <span>EXECUTIVE OVERVIEW</span>
              </div>
              <p className="text-foreground/80 leading-relaxed text-base">
                {overview}
              </p>
            </section>
          )}

          {/* Section: Dynamic News Items */}
          {news_items && news_items.length > 0 && (
            <section>
              <div className="flex items-center gap-2 text-[var(--cyber-blue)] font-mono text-sm mb-4 border-b border-white/5 pb-2">
                <Activity size={16} />
                <span>INTELLIGENCE BRIEFINGS</span>
              </div>
              <div className="space-y-6">
                {news_items.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[var(--cyber-blue)]/50 pl-4 py-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold font-mono text-foreground leading-tight">
                        {item.title}
                      </h3>
                      {item.type && (
                        <span className="self-start sm:self-auto font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-foreground/70 shrink-0">
                          {item.type}
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Takeaways */}
          {takeaway && (
            <section className="bg-[rgba(0,255,65,0.02)] border border-[var(--matrix-green)]/10 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-[var(--matrix-green)] font-mono text-sm mb-3">
                <AlertTriangle size={16} />
                <span>PRACTICAL TAKEAWAY & ACTIONS</span>
              </div>
              <p className="text-foreground/85 text-sm leading-relaxed font-mono">
                {takeaway}
              </p>
            </section>
          )}

          {/* Section: Sources */}
          {source_links && source_links.length > 0 && (
            <section className="border-t border-white/10 pt-8">
              <span className="block font-mono text-xs text-foreground/40 mb-3">
                INTELLIGENCE SOURCES
              </span>
              <ul className="space-y-2">
                {source_links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--matrix-green)] hover:text-[var(--cyber-blue)] transition-colors hover:underline"
                    >
                      <span>{link.title}</span>
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

      </div>
    </div>
  );
}


