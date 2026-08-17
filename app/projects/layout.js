export const metadata = {
  title: "Security Projects & Research | Sambhav Mehra",
  description:
    "Explore Sambhav Mehra's cybersecurity projects — SIEM/IDS pipeline with Wazuh & Suricata, AI-powered vulnerability assessment tools, blockchain-based evidence integrity systems, and SOC automation platforms.",
  keywords: [
    "Cybersecurity Projects",
    "SIEM IDS Project",
    "Wazuh Suricata Pipeline",
    "AI Vulnerability Scanner",
    "Blockchain Security",
    "SOC Automation",
    "Penetration Testing Tools",
    "Security Research Portfolio",
    "Sambhav Mehra Projects",
  ],
  openGraph: {
    title: "Security Projects & Research | Sambhav Mehra",
    description:
      "Cybersecurity projects featuring SIEM/IDS pipelines, AI vulnerability assessment, blockchain evidence integrity, and SOC automation by Sambhav Mehra.",
    url: "https://sambhavmehra.me/projects",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sambhav Mehra — Security Projects & Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Projects & Research | Sambhav Mehra",
    description:
      "SIEM/IDS pipelines, AI vulnerability scanners, blockchain integrity systems, and SOC automation — explore cybersecurity projects by Sambhav Mehra.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://sambhavmehra.me/projects",
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
