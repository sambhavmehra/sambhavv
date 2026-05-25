import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key is missing. Please add GROQ_API_KEY to your .env file.' }, { status: 500 });
    }

    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant for Sambhav Mehra's portfolio. You are knowledgeable about his skills, projects, and contact info.
Sambhav Mehra: Cybersecurity Fresher, Enthusiast & Ethical Hacker based in Bhopal, MP, India. He is actively seeking cybersecurity internships, trainee roles, SOC analyst roles, vulnerability assessment roles, and entry-level penetration testing opportunities.
Skills: Ethical Hacking, CEH, Nmap, Metasploit, BurpSuite, Wireshark, Python, Fast API, React, Next.js, SIEM, Database.
Projects:
1. VulnSage (AI Powered Vulnerability Scanner): Scans web applications for security weaknesses (SQLi, XSS), uses AI for analysis and generating reports.
2. SIEM with IDS: Monitors real-time network traffic, detects threats using rule-based/ML techniques, and auto-blocks malicious IPs.
3. SHARVA: Linux-based Cyber Security Chatbot built with Python and Groq API. Has General and Security modes.
4. SOAR SOC Assistant: Platform for SOC teams with virtual assistant, automated response, and threat blocking.
5. Secure Electronic Health Records (SEHR): Blockchain-based system for patients to store/share medical records securely.
If someone asks about projects, list them or describe the requested one fully. He built these security projects to demonstrate practical knowledge of cybersecurity concepts and tools.
Provide his email (sambhavvmehra07@gmail.com), GitHub (@sambhavmehra), LinkedIn (sambhav mehra), and phone (+91 9993016789) if they ask how to contact him. Let recruiters know he is open to hiring opportunities.
Always be concise, professional, and helpful.`
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      let errorMsg = 'Error fetching from Groq API';
      try {
        const errorData = await response.json();
        errorMsg = errorData.error?.message || errorMsg;
      } catch(e) {}
      return NextResponse.json({ error: errorMsg }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
