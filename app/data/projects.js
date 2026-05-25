export const projects = [
  {
    id: 2,
    title: 'SIEM-IDS Integration',
    description: 'Engineered a custom Intrusion Detection System detecting DDoS, brute-force, and HTTP anomalies, and replicated a full SOC pipeline end-to-end (log ingestion, Wazuh detection, alert triage, dashboard).',
    image: '/images/siem.jpeg',
    tags: ['Python', 'Wazuh', 'Suricata', 'Machine Learning', 'MITRE ATT&CK', 'SIEM', 'IDS'],
    featured: true,
    details: [
      'Engineered a custom Intrusion Detection System detecting DDoS (T1498), brute-force (T1110), and HTTP anomalies, all mapped to MITRE ATT&CK',
      'Correlated rules flagging 10+ failed logins within 60 seconds with zero false negatives in testing',
      'Replicated a full SOC pipeline end-to-end: log ingestion, custom Wazuh detection rules, and alert triage',
      'Built a real-time continuous monitoring dashboard for complete threat detection and response lifecycle'
    ],
    github: 'https://github.com/sambhavmehra/siem-ids-integration',
    demo: null
  },
  {
    id: 4,
    title: 'Phishing Triage Automation',
    description: 'Architected an n8n playbook-driven automation workflow that ingests phishing emails, extracts headers/URLs, queries threat intelligence APIs, and auto-creates cases in TheHive and JIRA.',
    image: '/images/soar.png',
    tags: ['n8n', 'TheHive', 'JIRA', 'VirusTotal API', 'AbuseIPDB', 'Security Automation', 'SOC'],
    featured: true,
    details: [
      'Architected an n8n playbook-driven automation workflow ingesting phishing emails, extracting headers, URLs, and attachments',
      'Queries VirusTotal, AbuseIPDB, and URLscan.io for IOC enrichment including malicious document sandbox analysis',
      'Implemented automated severity classification per alert and threat level tracking',
      'Auto-created TheHive cases with pre-tagged observables and JIRA tickets on confirmed threats, reducing triage time by ~70%'
    ],
    github: 'https://github.com/sambhavmehra/soar-soc-assistant',
    demo: null
  },
  {
    id: 3,
    title: 'AERIS: AI-Powered Cybersecurity Assistant',
    description: 'Developed a Linux-based AI-powered security assistant capable of OSINT-based intelligence gathering, network reconnaissance, log analysis, and automated SOC operations through natural language.',
    image: '/images/sharva.png',
    tags: ['Python', 'Groq API', 'AI', 'Automation', 'OSINT', 'Linux', 'Security Assistant'],
    featured: true,
    details: [
      'Developed an AI-powered security assistant for OSINT-based intelligence gathering and network reconnaissance',
      'Automated SOC operations through natural language interaction within Linux environments',
      'Integrated AI-driven workflows for threat investigation and suspicious activity monitoring',
      'Executed real-time commands to accelerate incident response operations'
    ],
    github: 'https://github.com/sambhavmehra/sharva-chatbot',
    demo: null
  },
  {
    id: 1,
    title: 'VulnSage: AI-Powered Vulnerability Scanner',
    description: 'Developed an AI-assisted vulnerability assessment tool that scans web applications to identify weaknesses such as SQL Injection, XSS, and misconfigurations, generating detailed severity reports.',
    image: '/images/vulnsage.jpeg',
    tags: ['Python', 'AI', 'Vulnerability Assessment', 'Web Security', 'OWASP ZAP', 'Burp Suite'],
    featured: true,
    details: [
      'Automated scanning of web applications for security vulnerabilities',
      'Detection of common OWASP Top 10 vulnerabilities such as SQL Injection and XSS',
      'AI-assisted analysis for identifying potential security risks and vulnerabilities',
      'Detailed vulnerability reports with severity classification and mitigation instructions'
    ],
    github: 'https://github.com/sambhavmehra/vulnsage',
    demo: null
  },
  {
    id: 5,
    title: 'Secure Electronic Health Records (SEHR)',
    description: 'A blockchain-based system that allows patients to securely upload, store, manage, and share their medical records with full privacy and integrity through decentralized ledger technology.',
    image: '/images/sehr.jpeg',
    tags: ['Python', 'Blockchain', 'MetaMask', 'Ganache', 'Data Protection', 'Privacy'],
    featured: true,
    details: [
      'Blockchain-based secure storage with patient-controlled access management',
      'Decentralized ledger for data integrity and privacy-preserving record sharing',
      'MetaMask integration for identity authentication',
      'Presented as research: "Enhancing Security in Electronic Health Records: A Multi-Layered Approach to Data Protection and Privacy"'
    ],
    github: 'https://github.com/sambhavmehra/secure-ehr',
    demo: null
  }
];

