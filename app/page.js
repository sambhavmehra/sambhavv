"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, Code2, Shield, Lock, Server, Database, Zap, Terminal, Github, Linkedin, Mail, ExternalLink, Wifi, Bug, Eye, Fingerprint, FileText, Download } from "lucide-react";
import { personalInfo } from "./data/personal";
import { projects } from "./data/projects";
import Image from "next/image";
import { toast } from "react-toastify";

/* ============================================ */
/* ANIMATION VARIANTS */
/* ============================================ */
const fadeIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const letterAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: "easeOut" }
  })
};

/* ============================================ */
/* TYPING EFFECT COMPONENT */
/* ============================================ */
function TypingEffect({ texts, className }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTarget = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && displayText === currentTarget) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentTarget.substring(0, displayText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentTarget.substring(0, displayText.length + 1));
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[3px] h-[1.1em] bg-[var(--matrix-green)] ml-1 align-middle animate-pulse" />
    </span>
  );
}

/* ============================================ */
/* ANIMATED COUNTER COMPONENT */
/* ============================================ */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericValue = parseFloat(value);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const isDecimal = value.includes(".");

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;

      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ============================================ */
/* FLOATING PARTICLES */
/* ============================================ */
function FloatingParticles() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? 'var(--matrix-green)' : p.id % 3 === 1 ? 'var(--cyber-blue)' : 'var(--terminal-amber)',
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================ */
/* MATRIX GRID BACKGROUND */
/* ============================================ */
function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(var(--matrix-green) 1px, transparent 1px),
          linear-gradient(90deg, var(--matrix-green) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}

/* ============================================ */
/* HOME PAGE COMPONENT */
/* ============================================ */
export default function Home() {
  const typingTexts = ["SOC Analyst L1", "Incident Coordinator", "SIEM & Threat Detection Specialist", "Security Automator"];

  const downloadJSON = () => {
    const data = {
      name: "Sambhav Mehra",
      role: "SOC Analyst L1",
      focus: "SIEM & Threat Detection",
      status: "Open to Work",
      skills: {
        security: ['Ethical Hacking', 'Penetration Testing', 'Vulnerability Assessment', 'SIEM Monitoring', 'OWASP Top 10', 'IDS/IPS'],
        tools: ['Nmap', 'Metasploit', 'BurpSuite', 'Wireshark', 'Kali Linux', 'Sentinel', 'Wazuh'],
        languages: ['Python', 'C++', 'C', 'JavaScript', 'SQL', 'HTML', 'CSS']
      },
      education: {
        degree: "B.Tech in CSE - Cyber Security",
        college: "Sagar Institute of Science & Technology",
        period: "2022 - Present",
        cgpa: 7.13
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sambhav_mehra_profile.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("profile.json downloaded successfully!");
  };

  const handleMitigate = (logId) => {
    toast.success("Incident mitigated and firewall updated!");
    setSocLogs(prev => prev.map(log => {
      if (log.id === logId) {
        return {
          ...log,
          level: "SUCCESS",
          msg: "Threat mitigated: Attacker IP banned",
          color: "text-emerald-400",
          mitigated: true
        };
      }
      return log;
    }));
  };

  const [socLogs, setSocLogs] = useState([
    { id: 1, time: "22:54:02", level: "INFO", msg: "Wazuh agent active on DB-Server", color: "text-[var(--matrix-green)]" },
    { id: 2, time: "22:54:15", level: "SUCCESS", msg: "Suricata IDS: Ingesting syslog", color: "text-[var(--cyber-blue)]" },
    { id: 3, time: "22:54:38", level: "ALERT", msg: "DDoS T1498 detected & mitigated", color: "text-red-500" },
  ]);

  useEffect(() => {
    const templates = [
      { level: "INFO", msg: "Log ingestion active: 412 EPS", color: "text-[var(--matrix-green)]" },
      { level: "ALERT", msg: "Brute-force T1110: IP blocked", color: "text-red-500" },
      { level: "WARNING", msg: "HTTP anomalies on port 443", color: "text-[var(--terminal-amber)]" },
      { level: "INFO", msg: "SOAR: Incident created in JIRA", color: "text-[var(--cyber-blue)]" },
      { level: "SUCCESS", msg: "IOC lookup completed on VirusTotal", color: "text-emerald-400" },
      { level: "ALERT", msg: "Suspicious API activity flagged", color: "text-red-400" }
    ];

    const interval = setInterval(() => {
      setSocLogs(prev => {
        const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const newLog = {
          id: nextId,
          time: timeStr,
          level: template.level,
          msg: template.msg,
          color: template.color
        };
        return [...prev.slice(1), newLog];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        <FloatingParticles />
        <CyberGrid />

        {/* Hero Gradient Orbs — Green Only */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--matrix-green)]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--matrix-green)]/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--matrix-green)]/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

            {/* Left Column - Text Content (60%) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 sm:space-y-8 lg:col-span-3 text-center lg:text-left"
            >
              {/* Status Badge */}
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--matrix-green)]/30 bg-[var(--matrix-green)]/5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--matrix-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--matrix-green)]"></span>
                </span>
                <span className="text-xs font-medium text-[var(--matrix-green)]">Open to Work</span>
              </motion.div>

              {/* Name with Letter Animation */}
              <motion.div variants={fadeIn}>
                <h1 className="hero-title text-5xl sm:text-6xl md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] font-extrabold leading-[1.05] mb-4 sm:mb-6 tracking-tight">
                  <motion.span
                    className="block mb-2 text-foreground/80"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    I'm
                  </motion.span>
                  <span className="block bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-blue)] to-[var(--terminal-amber)] bg-clip-text text-transparent animate-gradient bg-[length:190%_auto]">
                    {"Sambhav Mehra".split(" ").map((word, wIndex) => (
                      <span key={wIndex} className="block mb-1 sm:mb-2 lg:mb-4">
                        {word.split("").map((char, i) => (
                          <motion.span
                            key={i}
                            custom={i + (wIndex * 10)}
                            initial="hidden"
                            animate="visible"
                            variants={letterAnim}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </span>
                </h1>

                {/* Typing Effect Subtitle */}
                <div className="space-y-2 text-lg sm:text-xl md:text-2xl text-foreground/70">
                  <p className="flex items-center gap-3 justify-center lg:justify-start">
                    <Shield className="text-[var(--matrix-green)] flex-shrink-0" size={22} />
                    <span>Cybersecurity Enthusiast</span>
                  </p>
                  <p className="flex items-center gap-3 justify-center lg:justify-start">
                    <Terminal className="text-[var(--cyber-blue)] flex-shrink-0" size={22} />
                    <TypingEffect
                      texts={typingTexts}
                      className="text-[var(--cyber-blue)]"
                    />
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeIn} className="text-base sm:text-lg text-foreground/60 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Actively seeking cybersecurity internships, trainee positions, SOC analyst roles, vulnerability assessment roles, and entry-level penetration testing opportunities to help protect critical infrastructure.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold overflow-hidden bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] hover:shadow-lg hover:shadow-[var(--matrix-green)]/25 transition-all duration-300 hover:scale-[1.03]"
                >
                  <span className="relative flex items-center justify-center gap-2 text-black">
                    Connect with Me
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>

                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold border-2 border-white/20 text-foreground hover:bg-white/5 hover:border-[var(--matrix-green)]/50 transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.03]"
                >
                  <FileText size={20} />
                  View Resume
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeIn} className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                {[
                  { href: personalInfo.social.github.url, icon: Github, hoverColor: "hover:border-[var(--matrix-green)]/60 hover:text-[var(--matrix-green)]", label: "GitHub" },
                  { href: personalInfo.social.linkedin.url, icon: Linkedin, hoverColor: "hover:border-[var(--cyber-blue)]/60 hover:text-[var(--cyber-blue)]", label: "LinkedIn" },
                  { href: `mailto:${personalInfo.email}`, icon: Mail, hoverColor: "hover:border-[var(--terminal-amber)]/60 hover:text-[var(--terminal-amber)]", label: "Email" },
                ].map(({ href, icon: Icon, hoverColor, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className={`p-3 rounded-xl border border-white/10 bg-white/[0.02] ${hoverColor} hover:bg-white/5 transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Premium Cyber Terminal (40%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative hidden lg:flex lg:col-span-2 justify-center items-center perspective-1000 mt-8 lg:mt-0"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg group lg:pl-4">

                {/* Green Glowing Backdrop */}
                <motion.div
                  className="absolute -inset-1 bg-[var(--matrix-green)] rounded-3xl blur-[30px] sm:blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Main Terminal Card */}
                <div className="relative w-full rounded-2xl bg-[#030303]/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group-hover:border-[var(--matrix-green)]/40 transition-all duration-700"
                  style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-2deg) rotateX(2deg)' }}>

                  {/* Decorative Scanline */}
                  <div className="absolute inset-0 scan-lines opacity-30 mix-blend-overlay pointer-events-none" />

                  {/* Glassmorphism Header */}
                  <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white/5 border-b border-white/10 relative z-10 backdrop-blur-md">
                    <div className="flex gap-1.5 sm:gap-2.5">
                      <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_#FF5F56] cursor-pointer" />
                      <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_#FFBD2E] cursor-pointer" />
                      <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_#27C93F] cursor-pointer" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] text-foreground/50 font-mono tracking-widest uppercase">sys_root@sambhav</span>
                    <Lock size={12} className="text-foreground/30 sm:w-[14px] sm:h-[14px]" />
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 sm:p-7 relative z-10 font-mono space-y-4 sm:space-y-6">
                    {/* Command Prompt */}
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <div className="text-[10px] sm:text-sm">
                        <span className="text-[var(--matrix-green)] font-bold">┌──(</span>
                        <span className="text-[var(--cyber-blue)] font-bold">sambhav㉿kali</span>
                        <span className="text-[var(--matrix-green)] font-bold">)-[~/profile]</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[var(--matrix-green)] font-bold text-[10px] sm:text-[14px]">└─$</span>
                        <TypingEffect texts={["cat profile.json"]} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold text-xs sm:text-[15px]" />
                      </div>
                    </div>

                    {/* JSON Output Container */}
                    <motion.div
                      className="relative bg-black/50 rounded-xl p-3 sm:p-5 border border-white/5 mt-2 shadow-inner group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                    >
                      {/* Download JSON Button */}
                      <button
                        onClick={downloadJSON}
                        title="Download profile.json"
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg border border-white/10 bg-white/5 text-foreground/50 hover:text-[var(--matrix-green)] hover:border-[var(--matrix-green)]/30 hover:bg-[var(--matrix-green)]/5 transition-all cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                      >
                        <Download size={14} />
                      </button>

                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--matrix-green)] to-[var(--cyber-blue)] rounded-l-xl opacity-80" />

                      <div className="text-foreground/40 text-xs sm:text-[15px]">{'{\n'}</div>
                      <div className="pl-3 sm:pl-6 space-y-1.5 sm:space-y-2 text-xs sm:text-[15px] my-1">
                        {[
                          { key: 'name', value: '"Sambhav Mehra"', valColor: 'text-[var(--matrix-green)]' },
                          { key: 'role', value: '"SOC Analyst L1"', valColor: 'text-[var(--cyber-blue)]' },
                          { key: 'focus', value: '"SIEM & Threat Detection"', valColor: 'text-[var(--neon-purple)]' },
                          { key: 'status', value: '"Open to Work"', valColor: 'text-[var(--terminal-amber)]' }
                        ].map((item, idx) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.8 + (idx * 0.2) }}
                            className="flex items-start sm:items-center"
                          >
                            <span className="text-[#FF79C6] font-semibold tracking-wide">"{item.key}"</span>
                            <span className="text-foreground/40 mx-1 sm:mx-2">:</span>
                            <span className={`${item.valColor} font-semibold drop-shadow-[0_0_8px_currentColor] break-words flex-1`}>{item.value}</span>
                            {idx < 3 && <span className="text-foreground/40 ml-1">,</span>}
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-foreground/40 text-xs sm:text-[15px]">{'}'}</div>
                    </motion.div>

                    {/* High-Tech Divider */}
                    <div className="relative py-2 sm:py-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10 border-dashed" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-[#030303] px-2 sm:px-3 font-bold text-[8px] sm:text-[10px] uppercase text-[var(--cyber-blue)] tracking-[0.3em] backdrop-blur-md rounded-full border border-white/5">Metrics_</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                      className="grid grid-cols-2 gap-3 sm:gap-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.5 }}
                    >
                      {[
                        { value: '3', suffix: '+', label: 'Years Study', color: 'var(--matrix-green)' },
                        { value: '5', suffix: '+', label: 'Projects', color: 'var(--cyber-blue)' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4 flex flex-col items-center justify-center group/stat hover:border-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover/stat:opacity-20 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to top, ${stat.color}, transparent)` }} />
                          <div className="text-2xl sm:text-4xl font-black mb-1 sm:mb-1.5 transition-all duration-300 group-hover/stat:drop-shadow-[0_0_15px_currentColor]" style={{ color: stat.color }}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                          </div>
                          <div className="text-[9px] sm:text-[11px] text-foreground/50 uppercase font-bold tracking-widest text-center">{stat.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[var(--matrix-green)]/50 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-[var(--matrix-green)]/20 shadow-xl flex items-center gap-1.5 sm:gap-2.5 z-20"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="text-[var(--matrix-green)] drop-shadow-[0_0_5px_currentColor] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[var(--matrix-green)] font-extrabold text-xs sm:text-sm tracking-widest">CEH</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:-left-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[var(--cyber-blue)]/50 px-3 sm:px-5 py-1.5 sm:py-2.5 flex items-center gap-1.5 sm:gap-2.5 rounded-xl sm:rounded-2xl shadow-[var(--cyber-blue)]/20 shadow-xl z-20"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Wifi className="text-[var(--cyber-blue)] drop-shadow-[0_0_5px_currentColor] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[var(--cyber-blue)] text-xs sm:text-sm font-extrabold tracking-widest">CCNA</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs text-foreground/30 uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-foreground/20 flex justify-center pt-1.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-[var(--matrix-green)]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* What I Do Section - Bento Grid Layout */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <CyberGrid />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 sm:mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[var(--matrix-green)]"></div>
              <span className="text-[var(--matrix-green)] text-xs sm:text-sm font-mono uppercase tracking-wider">Expertise</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[var(--matrix-green)]"></div>
            </div>
            <h2 className="section-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-foreground">What I </span>
              <span className="bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-blue)] to-[var(--terminal-amber)] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Specialize In
              </span>
            </h2>
            <p className="text-base sm:text-xl text-foreground/60 max-w-2xl mx-auto px-4">
              Securing systems, finding vulnerabilities, and building robust defenses
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
            {/* Large Card - SOC Operations & Threat Detection */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
              className="col-span-1 sm:col-span-2 md:col-span-4 md:row-span-2 group relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-[var(--matrix-green)]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--matrix-green)]/8 rounded-full blur-3xl group-hover:bg-[var(--matrix-green)]/15 transition-all duration-700"></div>
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--cyber-blue)]/5 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left side info */}
                <div className="lg:col-span-7 space-y-4">
                  <motion.div
                    className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--matrix-green)] to-[var(--cyber-blue)] p-[2px]"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <Shield size={28} className="text-[var(--matrix-green)]" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-[var(--matrix-green)] transition-colors duration-300">
                    SOC Operations & Threat Detection
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/60 leading-relaxed">
                    Proficient in log ingestion, alert triage, incident investigation, and threat hunting. Experience engineering custom IDS/SIEM pipelines using Wazuh, Sentinel, and Suricata, with all alerts mapped to the MITRE ATT&CK framework.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Microsoft Sentinel', 'Wazuh', 'Splunk', 'IDS/IPS', 'Suricata', 'MITRE ATT&CK', 'Log Analysis', 'Incident Response'].map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm hover:border-[var(--matrix-green)]/40 hover:bg-[var(--matrix-green)]/5 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right side live monitoring console panel */}
                <div className="lg:col-span-5 w-full">
                  <div className="w-full bg-[#050505]/95 border border-[var(--matrix-green)]/30 rounded-2xl p-4 font-mono text-xs relative overflow-hidden group-hover:border-[var(--matrix-green)]/60 transition-colors duration-500 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--matrix-green)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--matrix-green)]"></span>
                        </span>
                        <span className="text-[var(--matrix-green)] font-bold tracking-wider text-[10px] uppercase">SOC Monitor [Live]</span>
                      </div>
                      <span className="text-[9px] text-foreground/40">SYS_ID: 8940-SOC</span>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-[10px] border-b border-white/5 pb-2.5">
                      <div className="text-center p-1 bg-white/5 rounded border border-white/5">
                        <div className="text-foreground/40 uppercase text-[8px] font-bold">EPS Ingest</div>
                        <div className="text-[var(--matrix-green)] font-black text-xs mt-0.5">380+</div>
                      </div>
                      <div className="text-center p-1 bg-white/5 rounded border border-white/5">
                        <div className="text-foreground/40 uppercase text-[8px] font-bold">Alerts (24h)</div>
                        <div className="text-[var(--cyber-blue)] font-black text-xs mt-0.5">14</div>
                      </div>
                      <div className="text-center p-1 bg-white/5 rounded border border-white/5">
                        <div className="text-foreground/40 uppercase text-[8px] font-bold">SOAR Auto</div>
                        <div className="text-[var(--terminal-amber)] font-black text-xs mt-0.5">100%</div>
                      </div>
                    </div>

                    {/* Live logs */}
                    <div className="space-y-2 h-[120px] overflow-hidden flex flex-col justify-end">
                      {socLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -10, y: 5 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          className="flex items-start gap-1.5 leading-relaxed text-[11px]"
                        >
                          <span className="text-foreground/30 font-semibold">{log.time}</span>
                          <span className={`font-bold ${log.color} text-[10px] border border-current/25 px-1 rounded scale-[0.9] origin-left uppercase`}>
                            {log.level}
                          </span>
                          <div className="text-foreground/70 break-words flex-1 flex justify-between items-center gap-2">
                            <span>{log.msg}</span>
                            {(log.level === 'ALERT' || log.level === 'WARNING') && !log.mitigated && (
                              <button 
                                onClick={() => handleMitigate(log.id)}
                                className="text-[9px] font-mono font-bold text-red-400 hover:text-emerald-400 border border-red-500/30 hover:border-emerald-500/50 px-1.5 py-0.5 rounded bg-red-500/15 hover:bg-emerald-500/15 cursor-pointer transition-all uppercase shrink-0"
                              >
                                Mitigate
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Medium Card - Network Security */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 group relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-[var(--cyber-blue)]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--cyber-blue)]/8 rounded-full blur-3xl group-hover:bg-[var(--cyber-blue)]/15 transition-all duration-700"></div>

              <div className="relative z-10">
                <motion.div
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br from-[var(--cyber-blue)] to-[var(--terminal-amber)] p-[2px] mb-3 sm:mb-4"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <Lock size={24} className="text-[var(--cyber-blue)]" />
                  </div>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-[var(--cyber-blue)] transition-colors duration-300">
                  Network Security
                </h3>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                  CCNA certified with strong knowledge of TCP/IP, DNS, DHCP, firewall rules, and packet analysis using Wireshark and Nmap.
                </p>
              </div>
            </motion.div>

            {/* Medium Card - Incident Response & SOAR */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              transition={{ delay: 0.2 }}
              className="col-span-1 md:col-span-2 group relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-[var(--terminal-amber)]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--terminal-amber)]/8 rounded-full blur-3xl group-hover:bg-[var(--terminal-amber)]/15 transition-all duration-700"></div>

              <div className="relative z-10">
                <motion.div
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br from-[var(--terminal-amber)] to-[var(--matrix-green)] p-[2px] mb-3 sm:mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <Zap size={24} className="text-[var(--terminal-amber)]" />
                  </div>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-[var(--terminal-amber)] transition-colors duration-300">
                  Incident Response & SOAR
                </h3>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                  Building automated playbooks with n8n, integrating cases in TheHive, managing incidents in JIRA, and enriching threats using VirusTotal.
                </p>
              </div>
            </motion.div>

            {/* Wide Card - Ethical Hacking & Pentesting */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="col-span-1 md:col-span-3 group relative p-5 sm:p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-[var(--matrix-green)]/50 transition-all duration-500 cyber-scan-line"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--matrix-green)] to-[var(--cyber-blue)] p-[2px] flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <Bug size={22} className="text-[var(--matrix-green)]" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-[var(--matrix-green)] transition-colors duration-300">Ethical Hacking & Pentesting</h3>
                  <p className="text-xs sm:text-sm text-foreground/60">Metasploit, Burp Suite, OWASP ZAP, Nmap, OSINT, Vulnerability Analysis</p>
                </div>
              </div>
            </motion.div>

            {/* Wide Card - Programming & Automation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="col-span-1 md:col-span-3 group relative p-5 sm:p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-[var(--cyber-blue)]/50 transition-all duration-500 cyber-scan-line"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--cyber-blue)] to-[var(--terminal-amber)] p-[2px] flex-shrink-0"
                  whileHover={{ rotate: -360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <Code2 size={22} className="text-[var(--cyber-blue)]" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-[var(--cyber-blue)] transition-colors duration-300">Programming & Automation</h3>
                  <p className="text-xs sm:text-sm text-foreground/60">Python, Bash scripting, C++, SQL, Git, Docker, n8n</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Card Grid */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16"
          >
            <div className="text-center sm:text-left w-full sm:w-auto">
              <motion.div
                className="flex items-center gap-3 mb-4 justify-center sm:justify-start"
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                viewport={{ once: true }}
              >
                <div className="h-px w-8 bg-gradient-to-r from-[var(--matrix-green)] to-transparent hidden sm:block" />
                <span className="text-[var(--matrix-green)] text-xs font-mono uppercase tracking-wider">Portfolio</span>
              </motion.div>
              <h2 className="section-title text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4">
                Featured Work
              </h2>
              <p className="text-base sm:text-xl text-foreground/60">
                Projects that showcase security and innovation
              </p>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-2 text-[var(--matrix-green)] hover:gap-3 transition-all group">
              View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.filter(p => p.featured).slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeIn}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="group h-full flex flex-col justify-between relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[var(--matrix-green)]/50 transition-all duration-500 backdrop-blur-sm"
              >
                <div>
                  {/* Image */}
                  {project.image && (
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-black/50 border-b border-white/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[var(--matrix-green)] transition-colors duration-300">
                      <Link href="/projects">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/60 mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-xs text-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Links */}
                <div className="p-5 sm:p-6 pt-0 flex gap-4 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg border border-white/10 hover:border-[var(--matrix-green)]/40 hover:bg-[var(--matrix-green)]/[0.02] text-foreground font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                  <Link
                    href="/projects"
                    className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[var(--matrix-green)]/10 to-[var(--cyber-blue)]/10 hover:from-[var(--matrix-green)]/20 hover:to-[var(--cyber-blue)]/20 text-[var(--matrix-green)] border border-[var(--matrix-green)]/20 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
                  >
                    <span>Analyze</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile View All */}
          <motion.div
            className="sm:hidden mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-[var(--matrix-green)]/30 text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/5 transition-all"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - New */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-green)]/5 via-transparent to-[var(--cyber-blue)]/5" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--matrix-green)]/20 bg-[var(--matrix-green)]/5 text-[var(--matrix-green)] text-sm font-mono">
                <Zap size={14} />
                Open to Work
              </span>
            </motion.div>

            <motion.h2 variants={fadeIn} className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Looking for{" "}
              <span className="bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] bg-clip-text text-transparent">
                Cybersecurity Opportunities
              </span>
            </motion.h2>

            <motion.p variants={fadeIn} className="text-base sm:text-lg text-foreground/60 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              I am actively seeking cybersecurity internships, trainee roles, SOC analyst roles, vulnerability assessment roles, and entry-level penetration testing opportunities.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] text-black hover:shadow-lg hover:shadow-[var(--matrix-green)]/25 transition-all duration-300 hover:scale-[1.03] inline-flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Contact Me
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
