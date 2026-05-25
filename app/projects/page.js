"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import Image from "next/image";
import { ExternalLink, Github, Shield, Cpu, Network, Lock, ArrowRight, Layers, X, ArrowUpRight } from "lucide-react";

// Accent configs mapping project IDs to their styling colors & icons
const getProjectConfig = (id) => {
  switch (id) {
    case 1:
      return {
        icon: <Shield size={20} className="text-[#00FF41]" />,
        color: "#00FF41",
        borderColor: "hover:border-[#00FF41]/40",
        shadowColor: "rgba(0, 255, 65, 0.15)",
        tagBg: "bg-[#00FF41]/5 text-[#00FF41] border-[#00FF41]/20",
        category: "Vulnerability Assessment"
      };
    case 2:
      return {
        icon: <Network size={20} className="text-[#00D9FF]" />,
        color: "#00D9FF",
        borderColor: "hover:border-[#00D9FF]/40",
        shadowColor: "rgba(0, 217, 255, 0.15)",
        tagBg: "bg-[#00D9FF]/5 text-[#00D9FF] border-[#00D9FF]/20",
        category: "Network Security"
      };
    case 3:
      return {
        icon: <Cpu size={20} className="text-[#FFA500]" />,
        color: "#FFA500",
        borderColor: "hover:border-[#FFA500]/40",
        shadowColor: "rgba(255, 165, 0, 0.15)",
        tagBg: "bg-[#FFA500]/5 text-[#FFA500] border-[#FFA500]/20",
        category: "AI Security"
      };
    case 4:
      return {
        icon: <Layers size={20} className="text-[#B026FF]" />,
        color: "#B026FF",
        borderColor: "hover:border-[#B026FF]/40",
        shadowColor: "rgba(176, 38, 255, 0.15)",
        tagBg: "bg-[#B026FF]/5 text-[#B026FF] border-[#B026FF]/20",
        category: "SOAR SOC"
      };
    case 5:
      return {
        icon: <Lock size={20} className="text-[#FF0055]" />,
        color: "#FF0055",
        borderColor: "hover:border-[#FF0055]/40",
        shadowColor: "rgba(255, 0, 85, 0.15)",
        tagBg: "bg-[#FF0055]/5 text-[#FF0055] border-[#FF0055]/20",
        category: "Blockchain Ledger"
      };
    default:
      return {
        icon: <Shield size={20} className="text-[#00FF41]" />,
        color: "#00FF41",
        borderColor: "hover:border-[#00FF41]/40",
        shadowColor: "rgba(0, 255, 65, 0.15)",
        tagBg: "bg-[#00FF41]/5 text-[#00FF41] border-[#00FF41]/20",
        category: "Security Tool"
      };
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const cardStagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};

function ProjectCard({ project, onClick }) {
  const config = getProjectConfig(project.id);

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`group relative flex flex-col justify-between rounded-[24px] border border-white/5 bg-[#070b13]/85 backdrop-blur-md p-6 hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all duration-300 cursor-pointer h-full ${config.borderColor}`}
      style={{
        "--accent-glow": config.shadowColor
      }}
    >
      <div>
        {/* Top bar with Icon and EXPLORE link */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex-shrink-0">
            {config.icon}
          </div>
          <span className="text-[10px] font-bold font-mono tracking-widest text-foreground/30 group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
            EXPLORE <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground leading-snug group-hover:text-foreground transition-colors mb-3">
          {project.title}
        </h2>

        {/* Short Description */}
        <p className="text-foreground/60 text-sm leading-relaxed line-clamp-4 font-sans mb-4">
          {project.description}
        </p>
      </div>

      {/* Tech Tags and Category Badge */}
      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
        <div className="flex flex-wrap gap-1">
          {project.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] font-mono text-foreground/40">
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono text-foreground/30">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono tracking-wider">
          <span className="text-foreground/30">NODE ID: #0{project.id}</span>
          <span className="text-foreground/45 uppercase">{config.category}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectFullscreenDetails({ project, onClose }) {
  if (!project) return null;
  const config = getProjectConfig(project.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      {/* Immersive Details Box */}
      <motion.div
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative bg-[#070b13]/90 border border-white/10 rounded-[32px] max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.02] border border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/5 hover:border-white/20 transition-all z-30 cursor-pointer flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* Large Header Section */}
        <div className="p-6 sm:p-10 pb-4 flex items-start gap-4 pr-16 sm:pr-20">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex-shrink-0 shadow-lg shadow-[var(--accent-glow)]" style={{ "--accent-glow": config.shadowColor }}>
            {config.icon}
          </div>
          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-foreground/45 uppercase block mb-1">
              SYSTEM RESOURCE / NODE 0{project.id}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 sm:mx-10 border-t border-white/10"></div>

        {/* Details Grid Content */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Description, Media & Action Links */}
            <div className="lg:col-span-5 space-y-6">
              {/* Optional Tech Image */}
              {project.image && (
                <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-transparent to-transparent"></div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold font-mono tracking-widest text-foreground/40 uppercase block">OVERVIEW</span>
                <p className="text-foreground/80 text-sm leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] font-bold font-mono tracking-widest text-foreground/40 uppercase block">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-foreground/60 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Capabilities / Tech Specs */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[9px] font-bold font-mono tracking-widest text-foreground/40 uppercase block">CORE CAPABILITIES & SYSTEM ARCHITECTURE</span>
              
              {project.details && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-colors flex items-start gap-3"
                    >
                      {/* Glowing color-coded dot */}
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-lg"
                        style={{
                          backgroundColor: config.color,
                          boxShadow: `0 0 10px ${config.color}`
                        }}
                      />
                      <span className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-10 pt-0 border-t border-white/5 bg-[#060a12]/40 flex gap-4 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-foreground font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <Github size={16} />
              <span>Source Code</span>
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#00FF41] text-black hover:opacity-90 transition-all font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3.5 rounded-xl border border-white/5 bg-white/[0.01] text-foreground/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <span>Demo Unavailable</span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "AI Security", "Network & Systems"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : selectedCategory === "AI Security"
      ? projects.filter(p => p.tags.includes("AI") || p.tags.includes("Agentic AI") || p.tags.includes("Chatbot") || p.tags.includes("Vulnerability Assessment"))
      : projects.filter(p => p.tags.includes("Network Security") || p.tags.includes("Blockchain") || p.tags.includes("IDS") || p.tags.includes("SIEM"));

  return (
    <div className="relative min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cybersecurity subtle grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--matrix-green) 1px, transparent 1px),
            linear-gradient(90deg, var(--matrix-green) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--matrix-green)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--cyber-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--matrix-green)]"></div>
            <span className="text-[var(--matrix-green)] text-xs font-mono uppercase tracking-wider">PROJECTS RESOURCE HUB</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--matrix-green)]"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
            Security{" "}
            <span className="bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-blue)] to-[var(--terminal-amber)] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Research & Tools
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto font-sans">
            Practical demonstrations, threat analysis platforms, SIEM integrations, and AI security tools built to solve modern cybersecurity challenges.
          </p>
        </motion.div>

        {/* Filter Categories Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-center gap-2 mb-12 flex-wrap animate-fade-in"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 font-mono border cursor-pointer ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[var(--matrix-green)]/15 to-[var(--cyber-blue)]/15 text-[var(--matrix-green)] border-[var(--matrix-green)]/50 shadow-md shadow-[var(--matrix-green)]/10"
                  : "bg-white/[0.02] text-foreground/60 border-white/5 hover:border-white/20 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          variants={cardStagger}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expandable Project Details Fullscreen Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectFullscreenDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

