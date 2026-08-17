export const metadata = {
  title: "Free Security Tools | Password Checker, Hash Generator, JWT Decoder",
  description:
    "Use free browser-based cybersecurity tools by Sambhav Mehra — password strength checker with entropy analysis, MD5/SHA hash generator, JWT decoder, Base64 encoder/decoder, URL encoder/decoder, and common ports reference.",
  keywords: [
    "Free Security Tools",
    "Password Strength Checker",
    "Hash Generator Online",
    "JWT Decoder Online",
    "Base64 Encoder Decoder",
    "URL Encoder Decoder",
    "Common Network Ports",
    "Cybersecurity Utilities",
    "Browser Security Tools",
    "Sambhav Mehra Tools",
  ],
  openGraph: {
    title: "Free Security Tools | Password Checker, Hash Generator, JWT Decoder",
    description:
      "Browser-based cybersecurity toolkit — password strength evaluator, MD5/SHA hash generator, JWT token decoder, Base64 & URL coder, and common ports reference. 100% local, no data leaves your browser.",
    url: "https://sambhavmehra.me/tools",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sambhav Mehra — Free Browser-Based Security Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Security Tools | Password Checker, Hash Generator, JWT Decoder",
    description:
      "Free cybersecurity utilities running 100% locally in your browser. Password analyzer, hash generator, JWT decoder, and more.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://sambhavmehra.me/tools",
  },
};

export default function ToolsLayout({ children }) {
  return children;
}
