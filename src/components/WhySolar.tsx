import React from 'react';
import { WHY_SOLAR_REASONS } from '../data/solarData';
import { CheckCircle, Sliders, BatteryMedium, Sparkles } from 'lucide-react';

export const WhySolar: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Why Transition to Solar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
            Dependable power continuity in an uncertain grid environment.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Solar and battery backup technology offers a practical, modern alternative to frequent public grid disruptions and the mounting costs and noise of fossil fuel generators.
          </p>
        </div>

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {WHY_SOLAR_REASONS.map((reason) => (
            <div
              key={reason.number}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-amber-400 font-mono text-sm font-bold">
                  {reason.number}
                </span>
                <span className="w-8 h-px bg-slate-800" />
                <h3 className="text-xl font-bold text-white">
                  {reason.title}
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Practical Comparison Strip */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-1">
                Engineering Assessment
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every building has distinct power loads. We tailor system designs to match daytime work cycles and nighttime reserve requirements.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <BatteryMedium className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Storage Sizing</span>
                </div>
                <p className="text-xs text-slate-300">
                  Calibrated battery capacity based on essential night-time hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Sliders className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Inverter Inrush</span>
                </div>
                <p className="text-xs text-slate-300">
                  Surge ratings sized to start air conditioners and pumps smoothly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Clean Output</span>
                </div>
                <p className="text-xs text-slate-300">
                  Pure sine wave protects delicate computing &amp; medical devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
