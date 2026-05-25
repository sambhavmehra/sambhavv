import { supabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handleCronRequest(request);
}

export async function POST(request) {
  return handleCronRequest(request);
}

async function handleCronRequest(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get('secret');

    const expectedSecret = process.env.CRON_SECRET;
    
    // Protect the cron route with CRON_SECRET
    // Bypassed in development mode only if CRON_SECRET is not configured yet
    const isAuthorized =
      (authHeader && authHeader === `Bearer ${expectedSecret}`) ||
      (querySecret && querySecret === expectedSecret) ||
      (!expectedSecret && process.env.NODE_ENV === 'development');

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current date string for slug matching (e.g. 2026-05-25)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const slug = `daily-cyber-digest-${dateString}`;

    // 1. Prevent duplicate posts for the same day
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const isSupabaseConfigured = supabaseUrl && supabaseServiceKey;

    if (isSupabaseConfigured) {
      const { data: existingPost, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (checkError) {
        console.error('Supabase query error:', checkError);
      }

      if (existingPost) {
        return new Response(
          JSON.stringify({
            success: true,
            status: 'skipped',
            message: `Digest for ${dateString} already exists in database.`,
            slug: slug
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      console.warn('Supabase not configured. Proceeding with dry-run/preview.');
    }

    // 2. Fetch latest cybersecurity updates using Tavily API
    const tavilyApiKey = process.env.TAVILY_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;

    let digest;
    let usedMockData = false;

    if (!tavilyApiKey || !groqApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Tavily or Groq API keys are not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      let searchResults = [];
      try {
        const response = await fetch('https://api.tavily.com/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: tavilyApiKey,
            query: `cybersecurity AI security trending vulnerabilities CVE breaches alerts news ${dateString}`,
            search_depth: 'advanced',
            include_domains: [
              'cisa.gov',
              'bleepingcomputer.com',
              'thehackernews.com',
              'darkreading.com',
              'securityweek.com'
            ],
            max_results: 10
          })
        });

        if (response.ok) {
          const data = await response.json();
          searchResults = data.results || [];
        } else {
          console.error('Tavily Search API error:', await response.text());
        }
      } catch (err) {
        console.error('Error fetching security updates from Tavily:', err);
      }

      // Try general search if domain-restricted search failed/returned empty
      if (searchResults.length === 0) {
        try {
          const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              api_key: tavilyApiKey,
              query: `cybersecurity AI security trending news vulnerabilities CVE alert ${dateString}`,
              search_depth: 'basic',
              max_results: 10
            })
          });
          if (response.ok) {
            const data = await response.json();
            searchResults = data.results || [];
          }
        } catch (err) {
          console.error('Fallback Tavily search error:', err);
        }
      }

      if (searchResults.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'No search results returned from Tavily.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        // 3. Summarize and format the digest using Groq API
        try {
          const systemPrompt = `You are an expert cybersecurity analyst.
Generate a structured Daily Cyber Digest for the date ${dateString} based on the provided search results.
You must output a single JSON object. Do not include any markdown styling (like \`\`\`json) or extra text outside the JSON.

JSON schema:
{
  "title": "A catchy, headline-style title summarizing the main security event/news of the day (e.g. 'Active Directory Zero-Day Exploited in the Wild' or 'Critical Ransomware Attack Disrupts Healthcare')",
  "excerpt": "A concise one-sentence summary of today's major cybersecurity updates.",
  "category": "Daily Digest",
  "structured_content": {
    "overview": "A high-level 2-3 sentence overview of today's cybersecurity landscape.",
    "news_items": [
      {
        "title": "Clear headline of the security incident or alert",
        "content": "A 2-4 sentence summary of what happened, who is affected, and the impact.",
        "type": "Breach | Vulnerability | Ransomware | AI Threat | Trending",
        "source_url": "The EXACT url from the search results that this story is based on",
        "source_domain": "The domain name of the source (e.g. bleepingcomputer.com)"
      }
    ],
    "takeaway": "Actionable defense-in-depth takeaways and practical recommendations."
  }
}

Only use information from the provided search results. Summarize stories dynamically without copying full articles. Structure the output based on whatever news is available today. Include 3 to 4 of the most important trending news items, making sure to include AI security (like AI-powered attacks, deepfakes, or AI model vulnerabilities) if it is trending today.`;

          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqApiKey}`
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Search results for ${dateString}:\n\n${JSON.stringify(searchResults, null, 2)}` }
              ],
              response_format: { type: 'json_object' },
              temperature: 0.2
            })
          });

          if (response.ok) {
            const resultData = await response.json();
            const contentText = resultData.choices[0].message.content;
            digest = JSON.parse(contentText);
            
            // Build accurate source links from the exact items the AI chose to summarize
            const uniqueUrls = new Set();
            digest.source_links = [];
            
            if (digest.structured_content && digest.structured_content.news_items) {
              digest.structured_content.news_items.forEach(item => {
                if (item.source_url && !uniqueUrls.has(item.source_url)) {
                  uniqueUrls.add(item.source_url);
                  digest.source_links.push({
                    title: item.source_domain || item.source_url.split('/')[2],
                    url: item.source_url
                  });
                }
              });
            }
          } else {
            console.error('Groq API error:', await response.text());
            return new Response(
              JSON.stringify({ success: false, error: 'Groq API request failed.' }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
          }
        } catch (err) {
          console.error('Error generating digest with Groq:', err);
          return new Response(
            JSON.stringify({ success: false, error: 'Error processing digest with AI.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // 4. Save the final digest into Supabase (if configured)
    let savedToSupabase = false;
    let dbErrorMsg = null;

    if (isSupabaseConfigured) {
      try {
        // Delete all older digests to keep only the latest one
        const { error: deleteError } = await supabase
          .from('blog_posts')
          .delete()
          .neq('slug', slug);

        if (deleteError) {
          console.error('Failed to delete old posts:', deleteError);
        }

        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([
            {
              title: digest.title || `Daily Cyber Digest: ${dateString}`,
              slug: slug,
              excerpt: digest.excerpt || 'Daily cybersecurity digest update.',
              category: digest.category || 'Daily Digest',
              published_date: dateString,
              structured_content: digest.structured_content,
              source_links: digest.source_links || []
            }
          ]);

        if (insertError) {
          console.error('Failed to insert post into Supabase:', insertError);
          dbErrorMsg = insertError.message;
        } else {
          savedToSupabase = true;
        }
      } catch (err) {
        console.error('Database connection error:', err);
        dbErrorMsg = err.message;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: 'created',
        slug: slug,
        used_mock_data: usedMockData,
        saved_to_db: savedToSupabase,
        db_error: dbErrorMsg,
        data: digest
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Unhandled cron endpoint error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


