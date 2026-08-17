import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import Chatbot from "./components/Chatbot";

/* ================= FONT ================= */

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
display: "swap",
});

/* ================= SEO METADATA ================= */

export const metadata = {
  metadataBase: new URL("https://sambhavmehra.me"),

  title: {
    default: "Sambhav Mehra | Cybersecurity Portfolio & SOC Specialist",
    template: "%s | Sambhav Mehra",
  },

  description:
    "Sambhav Mehra is a cybersecurity specialist and ethical hacker actively seeking internships, trainee positions, SOC analyst roles, vulnerability assessment roles, and entry-level penetration testing opportunities.",

  keywords: [
    "Sambhav Mehra",
    "Cybersecurity Portfolio",
    "Ethical Hacker Portfolio",
    "Penetration Tester",
    "Vulnerability Assessment",
    "Cybersecurity Projects",
    "SIEM IDS Project",
    "SOC Analyst",
    "Security Researcher",
    "OWASP Top 10",
    "Cybersecurity Bhopal",
    "CEH Certified",
    "Wazuh SIEM",
    "Suricata IDS",
  ],

  authors: [
    {
      name: "Sambhav Mehra",
      url: "https://sambhavmehra.me",
    },
  ],

  creator: "Sambhav Mehra",
  publisher: "Sambhav Mehra",

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },

  openGraph: {
    title: "Sambhav Mehra | Cybersecurity Portfolio & SOC Specialist",
    description:
      "Explore the cybersecurity portfolio of Sambhav Mehra, showcasing threat analysis, penetration testing, SIEM operations, and vulnerability assessment. Open to work.",
    url: "https://sambhavmehra.me",
    siteName: "Sambhav Mehra Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sambhav Mehra Cybersecurity Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sambhav Mehra | Cybersecurity Portfolio & SOC Specialist",
    description:
      "Cybersecurity enthusiast & ethical hacker seeking internships, SOC analyst roles, and entry-level penetration testing opportunities.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://sambhavmehra.me",
  },

  category: "technology",
};

/* ================= VIEWPORT ================= */

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  viewportFit: "cover",
};

/* ================= ROOT LAYOUT ================= */

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://sambhavmehra.me/#person",
        name: "Sambhav Mehra",
        url: "https://sambhavmehra.me",
        jobTitle: "Cybersecurity Analyst & Ethical Hacker",
        almaMater: "Sagar Institute of Science & Technology",
        sameAs: [
          "https://github.com/sambhavmehra",
          "https://www.linkedin.com/in/sambhav-mehra-484427359",
        ],
        knowsAbout: [
          "Cybersecurity",
          "Ethical Hacking",
          "Penetration Testing",
          "SIEM & IDS",
          "Network Security",
          "Vulnerability Assessment",
          "SOC Operations",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://sambhavmehra.me/#website",
        url: "https://sambhavmehra.me",
        name: "Sambhav Mehra Portfolio",
        description: "Official Cybersecurity Portfolio of Sambhav Mehra",
        publisher: {
          "@id": "https://sambhavmehra.me/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Font Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />

    {/* Structured Data */}
    <Script
      id="schema-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  </head>

  <body
    suppressHydrationWarning
    className={`${geistMono.variable} antialiased bg-background text-foreground`}
  >
    <Navigation />

    <main className="pt-16">{children}</main>

    <Footer />
    <ScrollToTop />

    {/* Toast Notifications */}
    <ToastContainer position="top-right" autoClose={3000} theme="dark" />

    <Chatbot />

    {/* Google Analytics */}
    <Script
      strategy="afterInteractive"
      src="https://www.googletagmanager.com/gtag/js?id=G-N11LJW7FL"
    />

    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N11LJW7FL', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </body>
</html>

);
}
