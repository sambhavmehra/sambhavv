"use client";

import { motion } from "framer-motion";
import { experiences, certifications, achievements } from "../data/experience";
import { Briefcase, Award, Trophy, Calendar, MapPin } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Experience() {
    return (
        <div className="relative min-h-screen bg-background pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Unique Header - Bracket Style */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[var(--matrix-green)] text-3xl sm:text-6xl md:text-7xl font-mono"></span>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground">
                            Experience
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl text-foreground/60 ml-10 sm:ml-16">
                        My professional journey and achievements
                    </p>
                </motion.div>

                {/* Work Experience */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-[var(--matrix-green)]/10 border border-[var(--matrix-green)]/30">
                            <Briefcase className="text-[var(--matrix-green)]" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">Work Experience</h2>
                    </div>

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[var(--matrix-green)]/50 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">{exp.title}</h3>
                                        <p className="text-lg text-[var(--matrix-green)] font-semibold mb-2">{exp.company}</p>
                                    </div>
                                    <div className="flex flex-col md:items-end gap-2">
                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <Calendar size={16} />
                                            <span className="text-sm">{exp.period}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <MapPin size={16} />
                                            <span className="text-sm">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx} className="text-foreground/70 flex items-start gap-2">
                                            <span className="text-[var(--matrix-green)] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                    {exp.technologies.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-[var(--cyber-blue)]/10 border border-[var(--cyber-blue)]/30">
                            <Award className="text-[var(--cyber-blue)]" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--cyber-blue)]/50 transition-all"
                            >
                                <h3 className="text-lg font-bold text-foreground mb-2">{cert.title}</h3>
                                <p className="text-sm text-foreground/60 mb-1">{cert.issuer}</p>
                                <p className="text-xs text-[var(--cyber-blue)]">{cert.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-[var(--terminal-amber)]/10 border border-[var(--terminal-amber)]/30">
                            <Trophy className="text-[var(--terminal-amber)]" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">Achievements</h2>
                    </div>

                    <div className="space-y-6">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[var(--terminal-amber)]/50 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-foreground">{achievement.title}</h3>
                                    <span className="text-sm text-[var(--terminal-amber)] font-semibold">{achievement.year}</span>
                                </div>
                                <p className="text-sm text-foreground/60 mb-2">{achievement.organization}</p>
                                <p className="text-foreground/70">{achievement.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
