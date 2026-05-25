"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { contactInfo, socialLinks } from "../data/contact";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const iconMap = {
    Mail,
    MapPin,
    Phone,
    Github,
    Linkedin,
    Instagram
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
        window.location.href = `mailto:sambhavvmehra07@gmail.com?subject=${subject}&body=${body}`;
        
        // Optional: clear the form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="relative min-h-screen bg-background pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Unique Header - Inline Style */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="mb-20"
                >
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-[var(--matrix-green)] text-2xl font-mono">04.</span>
                        <h1 className="text-6xl md:text-7xl font-bold text-foreground">
                            Get in Touch
                        </h1>
                    </div>
                    <p className="text-xl text-foreground/60 max-w-2xl ml-16">
                        Available for cybersecurity internships, trainee roles, SOC analyst roles, and entry-level penetration testing opportunities.
                    </p>
                </motion.div>

                {/* Single Column Layout with Side-by-Side Cards */}
                <div className="space-y-12">

                    {/* Contact Methods - Horizontal Cards */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6">Contact Methods</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {contactInfo.map((info) => {
                                const Icon = iconMap[info.icon];
                                return (
                                    <div key={info.id} className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-[var(--matrix-green)]/10">
                                                <Icon className="text-[var(--matrix-green)]" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-foreground/60 mb-1">{info.title}</h3>
                                                {info.href ? (
                                                    <a href={info.href} className="text-foreground hover:text-[var(--matrix-green)] transition-colors font-medium">
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-foreground font-medium whitespace-pre-line">{info.value}</p>
                                                )}
                                            </div>
                                            {info.href && (
                                                <ArrowUpRight size={20} className="text-foreground/40 group-hover:text-[var(--matrix-green)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Social Links - Compact Grid */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6">Connect Online</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {socialLinks.map((social) => {
                                const Icon = iconMap[social.icon];
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--matrix-green)]/50 hover:bg-white/10 transition-all text-center"
                                    >
                                        <Icon size={28} className="mx-auto mb-3 text-foreground/70 group-hover:text-[var(--matrix-green)] transition-colors" />
                                        <h3 className="font-semibold text-foreground mb-1">{social.name}</h3>
                                        <p className="text-xs text-foreground/60">{social.username}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Contact Form - Full Width */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:border-[var(--matrix-green)]/50 focus:outline-none transition-all"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:border-[var(--matrix-green)]/50 focus:outline-none transition-all"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:border-[var(--matrix-green)]/50 focus:outline-none transition-all resize-none"
                                    placeholder="Tell me about the role or opportunity..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] text-black hover:opacity-90 transition-all inline-flex items-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
