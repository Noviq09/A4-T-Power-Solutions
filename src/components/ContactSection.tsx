import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, AlertCircle, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { SERVICES } from '../data/solarData';
import { ScrollReveal } from './ScrollReveal';

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
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Official WhatsApp destination number (07079340080 converted to international format)
  const whatsappNumber = '2347079340080';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('form_name', 'Main Contact & Feasibility Form');
      data.append('name', formData.fullName.trim());
      data.append('fullName', formData.fullName.trim());
      data.append('phone', formData.phone.trim());
      data.append('email', formData.email.trim());
      data.append('serviceRequired', formData.serviceRequired);
      data.append('locationState', formData.locationState.trim() || 'Not specified');
      data.append('message', formData.message.trim());

      const response = await fetch('https://formspree.io/f/xdeedvez', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        let errorMsg = 'Failed to submit enquiry. Please check your details and try again.';
        if (data && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMsg = data.errors
            .map((err: { field?: string; message?: string }) =>
              err.field ? `${err.field}: ${err.message}` : err.message
            )
            .filter(Boolean)
            .join(', ') || errorMsg;
        } else if (data && typeof data.error === 'string') {
          errorMsg = data.error;
        }
        setIsSubmitting(false);
        setSubmitError(errorMsg);
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError('Unable to connect to the form service. Please check your internet connection or use WhatsApp to reach out.');
    }
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
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  // Open WhatsApp Chat link with exact pre-filled message (https://wa.me/2347079340080?text=...)
  const prefilledWhatsAppMessage =
    'Hello A4&T Power Solutions, I’m interested in your solar power solutions. Please provide me with more information about your products and services.';
  const openWhatsAppChatUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledWhatsAppMessage)}`;

  // Forward submitted details to WhatsApp if clicked from the confirmation screen
  const getSuccessWhatsAppLink = () => {
    const text = `Hello A4&T Power Solutions,\n\nI submitted an enquiry on your website.\nName: ${formData.fullName}\nService: ${formData.serviceRequired}\nPhone: ${formData.phone}\nLocation: ${formData.locationState || 'Not specified'}\nDetails: ${formData.message}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Consultation Info & WhatsApp Card */}
          <ScrollReveal className="lg:col-span-5 flex flex-col justify-between">
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

              {/* Solar Consultation Note */}
              <div className="bg-slate-100/90 border border-slate-200/90 rounded-xl p-5 mb-8 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Direct Consultation &amp; System Assessment</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Submit your facility load details for an estimated solar system sizing and quotation. Our team is available for both residential and commercial deployments across Nigeria.
                </p>
              </div>

              {/* Direct Reach Out Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Service Coverage</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Nationwide deployments across Nigeria (Residential &amp; Commercial)</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Instant WhatsApp Enquiry</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 mb-2">
                      Send your power specifications directly via WhatsApp.
                    </p>
                    <a
                      href={openWhatsAppChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Lead Capture Form */}
          <ScrollReveal delayMs={150} className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your enquiry for <strong className="text-slate-900">{formData.serviceRequired}</strong> has been received. Our team will review your power requirements and contact you shortly.
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
                      href={getSuccessWhatsAppLink()}
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

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-800">Submission Failed</p>
                        <p className="mt-0.5 text-red-700 leading-relaxed">{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Sending to Formspree...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Feasibility Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Your enquiry will be securely transmitted directly to our team via Formspree.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
