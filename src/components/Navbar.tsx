import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg'
            : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-2"
          >
            <span className="w-2.5 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-xs inline-block"></span>
            <span className="text-white">A4&amp;T</span>
            <span className="text-slate-300 font-light text-lg hidden sm:inline">Power Solutions</span>
          </a>

          {/* Zone 2: Navigation Links (Clean single line typography with hover states) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onRequestQuote}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md hover:shadow-amber-500/20 whitespace-nowrap shrink-0 shadow-sm shadow-amber-950/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-slate-950/80 backdrop-blur-md pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-100 hover:text-amber-400 py-3 border-b border-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-center text-slate-400">
              Solar Energy &amp; Power Infrastructure Solutions
            </p>
          </div>
        </div>
      )}
    </>
  );
};
