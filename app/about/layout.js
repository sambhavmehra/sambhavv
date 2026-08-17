export const metadata = {
  title: "About Sambhav Mehra | Cybersecurity Background & Skills",
  description:
    "Learn about Sambhav Mehra's cybersecurity journey — CEH certified ethical hacker, SOC analyst aspirant, and B.Tech CSE (Cyber Security) student with expertise in SIEM, penetration testing, and vulnerability assessment.",
  keywords: [
    "Sambhav Mehra About",
    "Cybersecurity Student",
    "CEH Certified",
    "Ethical Hacker Background",
    "SOC Analyst Skills",
    "Penetration Testing Skills",
    "SIEM Expert",
    "Cybersecurity Portfolio About",
  ],
  openGraph: {
    title: "About Sambhav Mehra | Cybersecurity Background & Skills",
    description:
      "Discover the cybersecurity journey of Sambhav Mehra — CEH certified, B.Tech CSE student specializing in SIEM, threat detection, and penetration testing.",
    url: "https://sambhavmehra.me/about",
    type: "profile",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sambhav Mehra — About Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sambhav Mehra | Cybersecurity Background & Skills",
    description:
      "CEH certified ethical hacker and B.Tech CSE student specializing in SIEM, vulnerability assessment, and SOC operations.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://sambhavmehra.me/about",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
