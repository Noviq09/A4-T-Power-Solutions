import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { SERVICES } from '../data/solarData';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: initialService || SERVICES[0].title,
    locationState: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurable WhatsApp placeholder
  const [whatsappNumber, setWhatsappNumber] = useState('2340000000000');
  const isPlaceholderNumber = whatsappNumber === '2340000000000';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.serviceRequired) {
      errs.serviceRequired = 'Please select a service.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please describe your solar energy requirement.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please include a bit more detail (at least 10 characters).';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate static demo processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceRequired: SERVICES[0].title,
      locationState: '',
      message: '',
    });
    setSubmitted(false);
  };

  // WhatsApp prefilled link generator
  const getWhatsAppLink = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const prefilledText = encodeURIComponent(
      `Hello A4&T Power Solutions team,\n\nI would like to inquire about: ${formData.serviceRequired || 'Solar Energy Solutions'}.\nName: ${formData.fullName || '[Your Name]'}\nLocation: ${formData.locationState || '[Your State/City]'}\nDetails: ${formData.message || 'Please provide information on sizing and quote estimates.'}`
    );
    return `https://wa.me/${cleanNumber}?text=${prefilledText}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Consultation Info & WhatsApp Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
                Connect With Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
                Request a comprehensive solar feasibility proposal.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                Whether you need complete off-grid solar for a private villa, backup power for a commercial business, or routine maintenance on an existing solar installation, our team is ready to evaluate your requirements.
              </p>

              {/* Verified vs Concept Notice */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 mb-8 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Portfolio Concept Demo Notice</span>
                </div>
                <p className="text-amber-900/90 leading-relaxed">
                  This website is an independent portfolio redesign. Form submissions are validated in the browser for demonstration purposes. To connect directly, use the configured WhatsApp bridge below.
                </p>
              </div>

              {/* Direct Reach Out Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Service Coverage</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Nationwide deployments across Nigeria (Residential &amp; Commercial)</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Instant WhatsApp Enquiry</h4>
                      {isPlaceholderNumber && (
                        <span className="text-[10px] text-slate-600 font-mono">Placeholder</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 mb-2">
                      Send your power specifications directly via WhatsApp.
                    </p>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurable Number Settings (Transparency feature) */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500">
              <label htmlFor="wa-config" className="block font-medium text-slate-700 mb-1">
                WhatsApp Destination Number (Configurable for Review):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="wa-config"
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 2348012345678"
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono text-slate-800 w-full max-w-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Default placeholder: +234 000 000 0000. Replace with official company number when provided.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Enquiry Details Validated
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your enquiry for <strong className="text-slate-900">{formData.serviceRequired}</strong> was processed in this portfolio demonstration.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto mb-6 text-slate-700 space-y-1.5">
                    <div><span className="text-slate-600">Client:</span> {formData.fullName}</div>
                    <div><span className="text-slate-600">Email:</span> {formData.email}</div>
                    <div><span className="text-slate-600">Phone:</span> {formData.phone}</div>
                    <div><span className="text-slate-600">Selected Service:</span> {formData.serviceRequired}</div>
                    {formData.locationState && <div><span className="text-slate-600">Location:</span> {formData.locationState}</div>}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Forward to WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      Enquiry &amp; System Quotation Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete this form to receive a tailored solar system breakdown.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="e.g. Babatunde Adeleke"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none transition-colors ${
                          errors.fullName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:ring-1 focus:ring-amber-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="e.g. +234 803 123 4567"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:ring-1 focus:ring-amber-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none transition-colors ${
                          errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:ring-1 focus:ring-amber-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="locationState" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Installation Location / State
                      </label>
                      <input
                        id="locationState"
                        type="text"
                        value={formData.locationState}
                        onChange={(e) => setFormData({ ...formData, locationState: e.target.value })}
                        placeholder="e.g. Lagos, Abuja, Ibadan, Port Harcourt"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Required Dropdown */}
                  <div>
                    <label htmlFor="serviceRequired" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Service Required <span className="text-amber-600">*</span>
                    </label>
                    <select
                      id="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Power Needs &amp; Appliance Details <span className="text-amber-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Please mention your key electrical loads (e.g., number of ACs, water pumps, refrigerators, lighting) and required backup duration."
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none transition-colors ${
                        errors.message ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:ring-1 focus:ring-amber-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-60 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Validating Details...</span>
                      ) : (
                        <>
                          <span>Submit Feasibility Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Client-side interactive demo. No third-party tracking or automated server emails are fired.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
