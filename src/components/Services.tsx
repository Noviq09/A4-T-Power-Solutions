import React from 'react';
import { Sun, BatteryCharging, Home, Building2, Wrench, Zap, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/solarData';
import { ServiceItem } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const getIcon = (iconName: ServiceItem['iconName']) => {
    const iconClass = "w-6 h-6 text-amber-500 transition-transform duration-200 group-hover:scale-110";
    switch (iconName) {
      case 'Sun': return <Sun className={iconClass} />;
      case 'BatteryCharging': return <BatteryCharging className={iconClass} />;
      case 'Home': return <Home className={iconClass} />;
      case 'Building2': return <Building2 className={iconClass} />;
      case 'Wrench': return <Wrench className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      default: return <Sun className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
            Service Capabilities Concept
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
            Complete solar and backup power engineering for homes and enterprises.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Proposed service offerings for end-to-end solar power solutions—from initial load calculations and component sourcing to system commissioning and preventative maintenance across Nigeria.
          </p>
        </ScrollReveal>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delayMs={(index % 3) * 120}
              className="h-full"
            >
              <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out p-8 flex flex-col justify-between h-full">
                <div>
                  {/* Header with Icon and Editorial Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center transition-colors duration-200 group-hover:bg-amber-100/70">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with single-line action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 truncate max-w-[170px]" title={service.idealFor}>
                    {service.idealFor}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors duration-200 shrink-0 group/btn cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Informative note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-600">
            Note: All system configurations are custom-dimensioned based on verified appliance wattage and daytime/nighttime storage requirements.
          </p>
        </div>
      </div>
    </section>
  );
};
