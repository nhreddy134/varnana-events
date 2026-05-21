import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocation } from '@tanstack/react-router';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: any;
  eventDate: string;
  guestCount: string;
  budget: string;
  message: string;
}

export const ContactInquiryForm = () => {
  const location = useLocation();
  const serviceParam = new URLSearchParams(location.search).get('service');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: serviceParam || 'Weddings',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventTypes = [
    'Weddings',
    'Corporate Events',
    'Birthdays',
    'Anniversaries',
    'Social Events',
    'Cultural Events',
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.eventType) {
        throw new Error('Please fill in all required fields');
      }

      const submissionData = {
        ...formData,
        guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      };

      await trpc.inquiries.create.mutate(submissionData);

      setSubmitted(true);
      toast.success('Inquiry sent successfully!');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: serviceParam || 'Weddings',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit form';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="text-gold" size={48} />
        </div>
        <h3 className="text-4xl font-serif text-[#6B1A1A] mb-6 italic">Thank You</h3>
        <p className="text-xl text-[#4A3728] max-w-md mx-auto leading-relaxed italic mb-12">
          We've received your inquiry and will be in touch within two working days to discuss your vision.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-[#6B1A1A] font-sans text-[11px] uppercase tracking-[0.3em] hover:text-gold transition-colors"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-12">
      {error && (
        <motion.div
          className="flex items-start gap-3 p-6 bg-red-50 border border-red-100 rounded-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="space-y-12">
        {/* Personal Details Section */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Event Type *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] appearance-none cursor-pointer"
                required
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Guest Count
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Estimated guests"
                className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] appearance-none cursor-pointer"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Section */}
        <div className="space-y-2">
          <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
            Your Vision
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share details about your style, preferences, or any special requests..."
            rows={4}
            className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 resize-none"
          />
        </div>
      </div>

      <div className="pt-12 text-center">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-16 py-6 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.3em] text-[11px] uppercase hover:bg-[#C4A882] transition-all duration-500 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 mx-auto"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Send Inquiry
              <Send size={14} />
            </>
          )}
        </motion.button>
        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#9B8878]">
          We respond within two working days.
        </p>
      </div>
    </form>
  );
};
