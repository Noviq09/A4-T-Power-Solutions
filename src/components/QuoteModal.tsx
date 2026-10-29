import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICES } from '../data/solarData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || SERVICES[0].title,
    buildingType: 'Residential',
    briefNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required.';
    }
    return errs;
  };

  const handleClose = () => {
    setSubmitted(false);
    setSubmitError(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('access_key', '747f4dac-4ae0-4052-b8b8-83f9aa7d3f1a');
      data.append('subject', `Solar Quote Request: ${formData.service} (${formData.buildingType})`);
      data.append('from_name', 'A4&T Power Solutions Portal');
      data.append('form_name', 'Request a Solar & Power Quote Modal');
      data.append('name', formData.name.trim());
      data.append('phone', formData.phone.trim());
      data.append('email', formData.email.trim());
      data.append('service', formData.service);
      data.append('buildingType', formData.buildingType);
      data.append('briefNotes', formData.briefNotes.trim() || 'No additional notes provided.');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      const resData = await response.json().catch(() => null);

      if (response.ok && resData && resData.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        const errorMsg =
          (resData && typeof resData.message === 'string' && resData.message)
            ? resData.message
            : 'Failed to submit quote request. Please check your details and try again.';
        setIsSubmitting(false);
        setSubmitError(errorMsg);
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError('Unable to connect to the quotation service. Please check your internet connection or use WhatsApp.');
    }
  };

  const handleWhatsAppQuickSend = () => {
    const text = encodeURIComponent(
      `Hello A4&T Power Solutions,\n\nI would like to request a quote for: ${formData.service} (${formData.buildingType}).\nName: ${formData.name || 'Visitor'}\nPhone: ${formData.phone || 'N/A'}\nNotes: ${formData.briefNotes || 'Requesting consultation.'}`
    );
    window.open(`https://wa.me/2347079340080?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              System Quotation
            </span>
            <h3 className="text-lg font-bold text-white">
              Request a Solar &amp; Power Quote
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Quote Request Received
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto mb-5 leading-relaxed">
                Thank you, {formData.name}. Your quote request for {formData.service} has been received. Our team will review your energy requirements and reach out to you shortly.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-left max-w-xs mx-auto mb-6 text-slate-700 space-y-1">
                <div><span className="text-slate-500 font-medium">Service:</span> {formData.service}</div>
                <div><span className="text-slate-500 font-medium">Property:</span> {formData.buildingType}</div>
                <div><span className="text-slate-500 font-medium">Contact Phone:</span> {formData.phone}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppQuickSend}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chukwuma Obi"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 802 000 0000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.buildingType}
                    onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Residential">Residential Home / Villa</option>
                    <option value="Commercial">Office / Commercial Facility</option>
                    <option value="Industrial">Industrial / Factory</option>
                    <option value="Healthcare/School">Clinic, Hospital or School</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Energy Requirement
                </label>
                <textarea
                  rows={2}
                  value={formData.briefNotes}
                  onChange={(e) => setFormData({ ...formData, briefNotes: e.target.value })}
                  placeholder="Key appliances (e.g. 2 ACs, fridge, lighting) or existing inverter capacity."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Submission Failed</p>
                    <p className="mt-0.5 text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleWhatsAppQuickSend}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp instead</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
