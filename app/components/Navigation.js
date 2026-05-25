'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { personalInfo } from '../data/personal';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Tools', path: '/tools' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show/hide nav based on scroll direction
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNav(false);
          } else {
            setShowNav(true);
          }

          // Add background when scrolled
          setScrolled(currentScrollY > 50);

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${(scrolled || isOpen) ? 'bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--matrix-green)] to-[var(--cyber-blue)] p-[2px]">
                <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                  <span className="text-[var(--matrix-green)] font-bold text-lg font-mono">SM</span>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-[var(--matrix-green)] to-[var(--cyber-blue)] rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            </div>
            <span className="hidden sm:block text-lg font-bold font-mono">
              <span className="text-foreground">Sambhav</span>
              <span className="text-[var(--matrix-green)]">.</span>
              <span className="text-foreground/70">me</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative group ${isActive
                    ? 'text-[var(--matrix-green)]'
                    : 'text-foreground/70 hover:text-foreground'
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--matrix-green)] rounded-full"></span>
                  )}
                  <span className="absolute inset-0 rounded-lg bg-[var(--matrix-green)]/0 group-hover:bg-[var(--matrix-green)]/5 transition-colors"></span>
                </Link>
              );
            })}
          </div>

          {/* Resume Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={personalInfo.resume}
              download="Sambhav_Mehra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-5 py-2.5 rounded-lg font-medium text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative flex items-center gap-2 text-black font-semibold">
                <FileText size={16} />
                <span>Resume</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-white/10">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                    ? 'text-[var(--matrix-green)] bg-[var(--matrix-green)]/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <a
              href={personalInfo.resume}
              download="Sambhav_Mehra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-center bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-blue)] text-black mt-2"
            >
              View Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
