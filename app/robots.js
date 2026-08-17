export default function robots() {
  const allowAllRule = {
    allow: ['/', '/llms.txt', '/llms-full.txt', '/sitemap.xml'],
    disallow: ['/api/', '/private/'],
  };

  return {
    rules: [
      {
        userAgent: '*',
        ...allowAllRule,
      },
      // Google Crawlers & Search AI
      {
        userAgent: 'Googlebot',
        ...allowAllRule,
      },
      {
        userAgent: 'Google-Extended',
        ...allowAllRule,
      },
      // OpenAI / ChatGPT Bots
      {
        userAgent: 'GPTBot',
        ...allowAllRule,
      },
      {
        userAgent: 'ChatGPT-User',
        ...allowAllRule,
      },
      // Anthropic / Claude Crawlers
      {
        userAgent: 'ClaudeBot',
        ...allowAllRule,
      },
      {
        userAgent: 'Claude-Web',
        ...allowAllRule,
      },
      // Perplexity AI Search Crawler
      {
        userAgent: 'PerplexityBot',
        ...allowAllRule,
      },
      // Apple AI / Applebot
      {
        userAgent: 'Applebot-Extended',
        ...allowAllRule,
      },
      // Common Crawl & ByteDance AI
      {
        userAgent: 'CCBot',
        ...allowAllRule,
      },
      {
        userAgent: 'ByteSpider',
        ...allowAllRule,
      },
    ],
    sitemap: 'https://sambhavmehra.me/sitemap.xml',
    host: 'https://sambhavmehra.me',
  };
}
