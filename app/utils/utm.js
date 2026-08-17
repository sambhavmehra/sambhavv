/**
 * Utility functions for UTM tracking and URL canonicalization
 */

export const DEFAULT_UTM = {
  utm_source: 'portfolio',
  utm_medium: 'referral',
  utm_campaign: 'sambhav_portfolio',
};

/**
 * Appends UTM tracking parameters to any external or internal link.
 * @param {string} url - Target URL
 * @param {Object} customParams - Custom UTM key-values (source, medium, campaign, content, term)
 * @returns {string} - Full URL with UTM parameters appended
 */
export function addUtmParams(url, customParams = {}) {
  if (!url || typeof url !== 'string') return url || '';

  // Don't add UTM parameters to mailto, tel, or internal anchor links
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
    return url;
  }

  try {
    const params = { ...DEFAULT_UTM, ...customParams };
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    const baseUrl = isAbsolute ? url : `https://sambhavmehra.me${url.startsWith('/') ? '' : '/'}${url}`;
    const urlObj = new URL(baseUrl);

    Object.entries(params).forEach(([key, val]) => {
      if (val && !urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, val);
      }
    });

    return isAbsolute ? urlObj.toString() : `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  } catch (e) {
    return url;
  }
}

/**
 * Generates clean canonical URL without UTM tracking parameters.
 * @param {string} path - Route path (e.g., /about, /projects)
 * @returns {string} - Absolute canonical URL
 */
export function getCanonicalUrl(path = '') {
  const cleanPath = path.split('?')[0].split('#')[0];
  const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `https://sambhavmehra.me${formattedPath === '/' ? '' : formattedPath}`;
}

/**
 * Generates social share URLs pre-populated with UTM parameters.
 * @param {string} pageUrl - The URL of the page being shared
 * @param {string} title - The title of the content
 */
export function getSocialShareLinks(pageUrl, title = 'Sambhav Mehra Cybersecurity Portfolio') {
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(
      addUtmParams(pageUrl, { utm_source: 'twitter', utm_medium: 'social_share', utm_campaign: 'user_share' })
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      addUtmParams(pageUrl, { utm_source: 'linkedin', utm_medium: 'social_share', utm_campaign: 'user_share' })
    )}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodeURIComponent(
      addUtmParams(pageUrl, { utm_source: 'whatsapp', utm_medium: 'social_share', utm_campaign: 'user_share' })
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      addUtmParams(pageUrl, { utm_source: 'telegram', utm_medium: 'social_share', utm_campaign: 'user_share' })
    )}&text=${encodedTitle}`,
  };
}
