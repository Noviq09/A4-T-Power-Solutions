import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface CTASectionProps {
  onRequestQuote: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onRequestQuote }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <ScrollReveal className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
          Energy Transition Partnership
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 text-balance">
          Ready to transition your facility or residence to dependable solar power?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Share your daily appliance loads or facility electricity requirements. We will prepare a customized proposal specifying panel capacity, hybrid inverter ratings, and lithium storage sizing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            <span>Request a Detailed Quote</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:border-slate-600 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Send Enquiry Message</span>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <span>Custom Energy Audits</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Transparent Component Specifications</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Residential &amp; Commercial Solutions</span>
        </div>
      </ScrollReveal>
    </section>
  );
};
