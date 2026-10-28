/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhySolar } from './components/WhySolar';
import { ProjectGallery } from './components/ProjectGallery';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Banner Notice for Portfolio Context (Unobtrusive) */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
        <span>
          Independent Portfolio Concept Redesign · Created for design &amp; engineering demonstration
        </span>
      </div>

      {/* Navigation Bar */}
      <Navbar onRequestQuote={() => handleOpenQuote()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onRequestQuote={() => handleOpenQuote()} />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services onSelectServiceForQuote={(title) => handleOpenQuote(title)} />

        {/* Why Choose Solar Section */}
        <WhySolar />

        {/* Project Gallery Concept Section */}
        <ProjectGallery onRequestQuote={() => handleOpenQuote()} />

        {/* Call-to-action Section */}
        <CTASection onRequestQuote={() => handleOpenQuote()} />

        {/* Contact Section */}
        <ContactSection initialService={selectedService} />
      </main>

      {/* Footer */}
      <Footer onSelectService={(title) => handleOpenQuote(title)} />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        preselectedService={selectedService}
      />
    </div>
  );
}
