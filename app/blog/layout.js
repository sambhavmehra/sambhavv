export const metadata = {
  title: "Daily Cyber Digest | Cybersecurity Threat Intelligence",
  description:
    "Stay informed with Sambhav Mehra's daily automated cybersecurity briefings. CISA alerts, zero-day vulnerabilities, threat feeds, and security intelligence summarized daily.",
  keywords: [
    "Daily Cyber Digest",
    "Cybersecurity News",
    "Threat Intelligence Feed",
    "CISA Alerts Today",
    "Zero-Day Exploits",
    "CVE Summary",
    "Vulnerability Briefings",
    "Sambhav Mehra Blog",
  ],
  openGraph: {
    title: "Daily Cyber Digest | Cybersecurity Threat Intelligence",
    description:
      "Daily automated cybersecurity briefings summarizing CISA warnings, vulnerability alerts, and critical security research.",
    url: "https://sambhavmehra.me/blog",
    type: "website",
    siteName: "Sambhav Mehra Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Daily Cyber Digest — Cybersecurity Intelligence Feed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Cyber Digest | Cybersecurity Threat Intelligence",
    description:
      "Automated security intelligence briefings curated from CISA, BleepingComputer, and top security sources.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://sambhavmehra.me/blog",
  },
};

export default function BlogLayout({ children }) {
  return children;
}
