import React from 'react';
import { ArrowDown, ArrowUpRight, Zap, Shield, SunMedium } from 'lucide-react';
import heroSolarArray from '../assets/images/hero_solar_array_1793228976979.jpg';

interface HeroProps {
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestQuote }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-24 pb-16"
    >
      {/* Background Image with Fallback and Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <img
          src={heroSolarArray}
          alt="Modern solar panel array on contemporary building under bright sun"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/90 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle natural eyebrow text with unboxed separators */}
          <div className="animate-hero-fade-up-1 flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-4">
            <span>Renewable Energy</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Power Continuity</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Nigeria</span>
          </div>

          <h1 className="animate-hero-fade-up-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 text-balance">
            Reliable solar energy and power solutions engineered for modern Nigerian demand.
          </h1>

          <p className="animate-hero-fade-up-3 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
            Turnkey photovoltaic installations, high-capacity inverter storage systems, and energy management solutions built to provide consistent, silent, and resilient power for homes and enterprises.
          </p>

          {/* Action CTAs */}
          <div className="animate-hero-fade-up-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:border-slate-600 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
            >
              <span>Explore Our Services</span>
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Key Value Strip (clean unboxed metrics/highlights) */}
          <div className="animate-hero-fade-up-5 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            <div className="flex items-start gap-3 group">
              <SunMedium className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <h4 className="text-sm font-semibold text-white">Tier-1 Solar PV</h4>
                <p className="text-xs text-slate-400 leading-normal mt-0.5">High-efficiency monocrystalline cell arrays</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <h4 className="text-sm font-semibold text-white">Instant Switchover</h4>
                <p className="text-xs text-slate-400 leading-normal mt-0.5">Seamless transition during national grid downtime</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <h4 className="text-sm font-semibold text-white">Engineering Quality</h4>
                <p className="text-xs text-slate-400 leading-normal mt-0.5">Surge protection and thermal safety compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
