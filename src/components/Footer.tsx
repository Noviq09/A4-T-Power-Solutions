import React from 'react';
import { SERVICES } from '../data/solarData';

interface FooterProps {
  onSelectService: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-xs inline-block"></span>
              <span className="text-xl font-extrabold text-white tracking-tight">A4&amp;T Power Solutions</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Independent concept redesign demonstrating high-performance digital presence for solar energy and power solutions in Nigeria.
            </p>
            <div className="text-xs text-slate-500">
              Focus areas: Monocrystalline Solar PV, Hybrid Inverters, Lithium Battery Banks, and Commercial Microgrids.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">Project Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact &amp; Enquiry</a>
              </li>
            </ul>
          </div>

          {/* Proposed Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Services Portfolio Concept
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => onSelectService(s.title)}
                    className="hover:text-amber-400 transition-colors block py-0.5"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mandatory Tasteful Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} A4&amp;T Power Solutions (Concept Redesign). All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-lg text-slate-400 font-light">
            Independent concept redesign for portfolio demonstration. Not affiliated with or endorsed by A4&amp;T Power Solutions.
          </div>
        </div>
      </div>
    </footer>
  );
};
