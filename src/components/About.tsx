import React from 'react';
import { CheckCircle2, ShieldCheck, Compass, Gauge } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Positioning */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
              About A4&amp;T Power Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 text-balance">
              Dedicated to accelerating dependable solar infrastructure across Nigeria.
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                A4&amp;T Power Solutions is a Nigerian renewable energy and power solutions provider focused on delivering dependable solar photovoltaic installations, advanced inverter storage systems, and resilient electrical backup networks.
              </p>
              <p>
                In an operating environment characterized by frequent grid interruptions and rising fuel expenditure, we design clean energy systems that help homeowners, commercial facilities, and institutions achieve stable day-and-night electrical continuity.
              </p>
              <p>
                Every solution begins with comprehensive load profile assessments, ensuring equipment is correctly matched to real operational requirements—avoiding underpowered cutoffs and costly over-specifications.
              </p>
            </div>

            {/* Core Operational Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Custom Load Analysis</h4>
                  <p className="text-xs text-slate-500 mt-1">Accurate auditing of appliances and peak surge loads.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Component Quality</h4>
                  <p className="text-xs text-slate-500 mt-1">Tier-1 solar modules and verified pure sine wave equipment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Safety Compliance</h4>
                  <p className="text-xs text-slate-500 mt-1">DC circuit breakers, earthing rods, and surge suppression.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Ongoing Support</h4>
                  <p className="text-xs text-slate-500 mt-1">Preventative maintenance and post-installation monitoring.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card Highlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-8 sm:p-10 shadow-xl">
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="text-amber-400 font-semibold text-xs tracking-wider uppercase mb-2">
                  Engineering Focus
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Energy Systems Engineered for Tropical Climates
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Solar installations in Nigeria face high ambient temperatures, dust exposure during dry harmattan seasons, and heavy rainstorms. Our engineering approach prioritizes proper heat dissipation, corrosion-resistant racking, and dust-resistant inverter enclosures.
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Primary Geography</span>
                    <span className="font-medium text-white">Nigeria</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Primary Technologies</span>
                    <span className="font-medium text-white">Solar PV · LiFePO4 · Hybrid Inverters</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-400">Application Sectors</span>
                    <span className="font-medium text-white">Residential, Commercial &amp; Mini-Grids</span>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <p className="text-xs text-slate-300 leading-normal">
                    <strong className="text-amber-400 font-semibold">Portfolio Concept Note:</strong> This site is an independent digital concept showcasing a modern interface design for A4&amp;T Power Solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
