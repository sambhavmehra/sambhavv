export const metadata = {
  title: "Experience & Certifications | Sambhav Mehra",
  description:
    "Explore Sambhav Mehra's professional experience, certifications (CEH, CCNA), and achievements in cybersecurity — including SOC operations, vulnerability assessment internships, and CTF competitions.",
  keywords: [
    "Sambhav Mehra Experience",
    "Cybersecurity Internship",
    "CEH Certification",
    "CCNA Certified",
    "SOC Analyst Experience",
    "Penetration Testing Internship",
    "Cybersecurity Achievements",
    "CTF Competitions",
  ],
  openGraph: {
    title: "Experience & Certifications | Sambhav Mehra",
    description:
      "Professional cybersecurity experience, certifications (CEH, CCNA), and achievements of Sambhav Mehra — SOC operations, vulnerability assessment, and CTF wins.",
    url: "https://sambhavmehra.me/experience",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sambhav Mehra — Experience & Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience & Certifications | Sambhav Mehra",
    description:
      "CEH & CCNA certified cybersecurity professional with internship experience in SOC operations, vulnerability assessment, and incident response.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://sambhavmehra.me/experience",
  },
};

export default function ExperienceLayout({ children }) {
  return children;
}
