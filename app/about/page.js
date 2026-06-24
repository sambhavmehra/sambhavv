"use client";

import { motion, useInView } from "framer-motion";
import { personalInfo } from "../data/personal";
import { stats, skills, timeline } from "../data/about";
import { MapPin, Briefcase, Heart, GraduationCap, Shield, Terminal, Code2, Wifi, Award, ChevronRight, Fingerprint, Bug, Lock, Eye, Zap, Target } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

/* ============================================ */
/* ANIMATION VARIANTS */
/* ============================================ */
const fadeIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

/* ============================================ */
/* ANIMATED COUNTER */
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
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numericValue, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ============================================ */
/* SKILL CATEGORY COMPONENT */
/* ============================================ */
function SkillCategory({ title, icon: Icon, skills: skillList, color, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      transition={{ delay }}
      className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} style={{ background: color, opacity: 0.1 }} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl border border-white/10" style={{ background: `${color}15` }}>
            <Icon size={20} style={{ color }} />
          </div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skillList.map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + idx * 0.03 }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 cursor-default"
              style={{ '--hover-color': color }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================ */
/* TIMELINE ITEM COMPONENT */
/* ============================================ */
const iconMap = {
  Briefcase,
  GraduationCap,
};

const colorMap = {
  blue: "var(--cyber-blue)",
  purple: "var(--neon-purple)",
  green: "var(--matrix-green)",
  orange: "var(--terminal-amber)",
};

function TimelineItem({ item, index, isLast }) {
  const color = colorMap[item.iconColor] || "var(--matrix-green)";
  const Icon = iconMap[item.icon] || Briefcase;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-4 sm:gap-6 group"
    >
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-all duration-300"
          style={{ borderColor: color }}
          whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${color}40` }}
        >
          <Icon size={18} style={{ color }} />
        </motion.div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[40px]" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 sm:pb-10 flex-1 min-w-0">
        <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground">{item.title}</h3>
            <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/5 text-foreground/50 flex-shrink-0 self-start sm:self-auto">{item.period}</span>
          </div>
          <p className="text-sm font-semibold mb-2" style={{ color }}>{item.organization}</p>
          <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================ */
/* ABOUT PAGE COMPONENT */
/* ============================================ */
export default function About() {
  return (
    <div className="relative min-h-screen bg-background pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--matrix-green)]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--cyber-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ======== HEADER ======== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12 sm:mb-20 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--matrix-green)]/20 bg-[var(--matrix-green)]/5 mb-6">
            <Fingerprint size={14} className="text-[var(--matrix-green)]" />
            <span className="text-xs font-mono text-[var(--matrix-green)] uppercase tracking-wider">Who I Am</span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-blue)] to-[var(--terminal-amber)] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Me
            </span>
          </motion.h1>

          <motion.div variants={fadeIn} className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-blue)] to-transparent rounded-full mb-4" />

          <motion.p variants={fadeIn} className="text-base sm:text-xl text-foreground/60 max-w-2xl mx-auto">
            Securing digital landscapes with precision, passion, and relentless curiosity
          </motion.p>
        </motion.div>

        {/* ======== BIO SECTION ======== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center mb-16 sm:mb-24"
        >
          {/* Photo */}
          <motion.div variants={scaleIn} className="lg:col-span-2 flex justify-center">
            <div className="relative group">
              {/* Rotating border ring */}
              <motion.div
                className="absolute -inset-3 rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, var(--matrix-green), var(--cyber-blue), var(--terminal-amber), var(--neon-purple), var(--matrix-green))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo container */}
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full p-1 bg-background z-10">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                  <Image
                    src="/sambhav.jpg"
                    alt="Sambhav Mehra"
                    fill
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--matrix-green)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Floating status badges */}
              <motion.div
                className="absolute -top-2 -right-2 sm:top-2 sm:right-0 px-3 py-1.5 rounded-full bg-[var(--matrix-green)]/10 border border-[var(--matrix-green)]/30 text-[var(--matrix-green)] text-[10px] sm:text-xs font-bold backdrop-blur-sm z-20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield size={10} className="inline mr-1" />
                CEH Certified
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-0 px-3 py-1.5 rounded-full bg-[var(--cyber-blue)]/10 border border-[var(--cyber-blue)]/30 text-[var(--cyber-blue)] text-[10px] sm:text-xs font-bold backdrop-blur-sm z-20"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Terminal size={10} className="inline mr-1" />
                Ethical Hacker
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div variants={fadeInRight} className="lg:col-span-3 space-y-4 sm:space-y-5 text-center lg:text-left">
            {personalInfo.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeIn}
                className="text-base sm:text-lg text-foreground/70 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quick info pills */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 pt-4 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-foreground/70">
                <MapPin size={14} className="text-[var(--cyber-blue)]" />
                {personalInfo.location.city}, {personalInfo.location.country}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-foreground/70">
                <Briefcase size={14} className="text-[var(--matrix-green)]" />
                {personalInfo.workingAt}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ======== STATS SECTION ======== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24"
        >
          {stats.map((stat, index) => {
            const statColors = [
              "var(--matrix-green)",
              "var(--cyber-blue)",
              "var(--terminal-amber)",
              "var(--neon-purple)"
            ];
            const statIcons = [Target, Bug, Award, Shield];
            const StatIcon = statIcons[index] || Shield;
            const color = statColors[index];

            return (
              <motion.div
                key={stat.id}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: color + '20' }} />

                <div className="relative z-10">
                  <StatIcon size={20} className="mx-auto mb-3 opacity-40 group-hover:opacity-80 transition-opacity" style={{ color }} />
                  <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color }}>
                    <AnimatedCounter value={stat.value.replace("+", "")} suffix={stat.value.includes("+") ? "+" : ""} />
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/50 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ======== SKILLS SECTION ======== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-16 sm:mb-24"
        >
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[var(--matrix-green)]" />
              <span className="text-[var(--matrix-green)] text-xs sm:text-sm font-mono uppercase tracking-wider">Arsenal</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[var(--matrix-green)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              Technical{" "}
              <span className="bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/50 max-w-lg mx-auto">
              Tools, technologies, and techniques in my cybersecurity toolkit
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <SkillCategory
              title="Security & Hacking"
              icon={Shield}
              skills={skills.security}
              color="var(--matrix-green)"
              delay={0}
            />
            <SkillCategory
              title="Security Tools"
              icon={Bug}
              skills={skills.tools}
              color="var(--cyber-blue)"
              delay={0.1}
            />
            <SkillCategory
              title="Programming"
              icon={Code2}
              skills={skills.languages}
              color="var(--terminal-amber)"
              delay={0.2}
            />
            <SkillCategory
              title="Networking"
              icon={Wifi}
              skills={skills.networking}
              color="var(--neon-purple)"
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* ======== TIMELINE ======== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="mb-16 sm:mb-24"
        >
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[var(--cyber-blue)]" />
              <span className="text-[var(--cyber-blue)] text-xs sm:text-sm font-mono uppercase tracking-wider">Path</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[var(--cyber-blue)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              My{" "}
              <span className="bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--terminal-amber)] bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/50 max-w-lg mx-auto">
              Education and experience that shaped my cybersecurity career
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* ======== WHAT DRIVES ME ======== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="relative"
        >
          <div className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02] overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--terminal-amber)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--matrix-green)]/5 rounded-full blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 rounded-2xl bg-[var(--terminal-amber)]/10 border border-[var(--terminal-amber)]/30"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Heart className="text-[var(--terminal-amber)]" size={28} />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Drives Me</h2>
                    <p className="text-sm text-foreground/40 mt-1">The passion behind the work</p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-6">
                  {personalInfo.summary}
                </p>

                {/* Passion points */}
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { icon: Shield, text: "Digital Protection", color: "var(--matrix-green)" },
                    { icon: Eye, text: "Threat Analysis", color: "var(--cyber-blue)" },
                    { icon: Zap, text: "Continuous Learning", color: "var(--terminal-amber)" },
                  ].map(({ icon: PIcon, text, color }, i) => (
                    <motion.div
                      key={text}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      whileHover={{ scale: 1.03, borderColor: color + '40' }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <PIcon size={18} style={{ color }} />
                      <span className="text-sm text-foreground/70 font-medium">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Blazer Photo */}
              <div className="lg:col-span-4 flex justify-center mt-6 lg:mt-0">
                <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl group/image">
                  {/* Glow border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] rounded-2xl blur opacity-25 group-hover/image:opacity-50 transition duration-1000 group-hover/image:duration-200" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-background">
                    <Image
                      src="/file_0000000087a47207b312bc53a66d3504.png"
                      alt="Sambhav Mehra - Professional Look"
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
