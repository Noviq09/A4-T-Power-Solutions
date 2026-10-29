import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/solarData';
import { GalleryProject } from '../types';
import { Maximize2, X, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ProjectGalleryProps {
  onRequestQuote: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onRequestQuote }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Examples' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'residential', label: 'Residential' },
    { id: 'storage', label: 'Battery Storage' },
    { id: 'maintenance', label: 'Maintenance' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
              Project Gallery Concept
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 text-balance">
              Example Installations &amp; System Archetypes
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Conceptual reference designs showing diverse installation typologies—from commercial rooftop arrays to modern home power integration and dedicated battery storage rooms.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented functional buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            {filterOptions.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delayMs={index * 120} className="h-full">
              <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full">
              {/* Image Frame with Overlay */}
              <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge: Category in quiet text */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-semibold tracking-wide text-white/90 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Inspect Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-lg bg-white/90 text-slate-900 flex items-center justify-center hover:bg-white transition-all shadow-md group-hover:scale-110"
                  aria-label={`View details of ${project.title}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-600 font-medium mb-1">
                    {project.featureTag}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    {project.systemProfile}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors whitespace-nowrap ml-2"
                  >
                    View Layout Details
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>

        {/* Gallery Disclaimer */}
        <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
          <span>
            <strong>Concept Note:</strong> Imagery and project cards shown above illustrate proposed installation standards and equipment types. They are concept examples for website demonstration.
          </span>
          <button
            onClick={onRequestQuote}
            className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
          >
            <span>Discuss your facility's system design</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox / Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative aspect-16/10 bg-slate-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                {selectedProject.categoryLabel} · Concept Archetype
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-2 text-xs text-slate-700">
                <div className="font-semibold text-slate-900">Engineering Typology:</div>
                <p>{selectedProject.systemProfile}</p>
                <div className="text-slate-500 pt-1">
                  Applicable for projects requiring clean power integration, battery failover, or scheduled preventative diagnostic service.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onRequestQuote();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Request System Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
