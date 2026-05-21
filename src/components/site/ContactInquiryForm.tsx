import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useLocation } from '@tanstack/react-router';
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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  guestCount?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.eventType) {
    errors.eventType = 'Please select an event type';
  }

  if (data.guestCount && (isNaN(Number(data.guestCount)) || Number(data.guestCount) < 1)) {
    errors.guestCount = 'Please enter a valid guest count';
  }

  return errors;
};

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

    // Real-time validation
    if (touched[name]) {
      const newErrors = validateForm({ ...formData, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const newErrors = validateForm(formData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
      toast.success('Thank you! We\'ll be in touch within 2 working days.');
      
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
      setTouched({});
      setErrors({});

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit form. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.eventType;

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
                onBlur={handleBlur}
                placeholder="Your name"
                className={`w-full bg-transparent border-b py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 ${
                  errors.name && touched.name ? 'border-red-500' : 'border-[#6B1A1A]/20'
                }`}
                required
              />
              {errors.name && touched.name && (
                <motion.p className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.name}
                </motion.p>
              )}
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
                onBlur={handleBlur}
                placeholder="your@email.com"
                className={`w-full bg-transparent border-b py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 ${
                  errors.email && touched.email ? 'border-red-500' : 'border-[#6B1A1A]/20'
                }`}
                required
              />
              {errors.email && touched.email && (
                <motion.p className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.email}
                </motion.p>
              )}
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
                onBlur={handleBlur}
                placeholder="+1 (555) 000-0000"
                className={`w-full bg-transparent border-b py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 ${
                  errors.phone && touched.phone ? 'border-red-500' : 'border-[#6B1A1A]/20'
                }`}
              />
              {errors.phone && touched.phone && (
                <motion.p className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.phone}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                Event Type *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] appearance-none cursor-pointer ${
                  errors.eventType && touched.eventType ? 'border-red-500' : 'border-[#6B1A1A]/20'
                }`}
                required
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.eventType && touched.eventType && (
                <motion.p className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.eventType}
                </motion.p>
              )}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                placeholder="Estimated guests"
                className={`w-full bg-transparent border-b py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 ${
                  errors.guestCount && touched.guestCount ? 'border-red-500' : 'border-[#6B1A1A]/20'
                }`}
              />
              {errors.guestCount && touched.guestCount && (
                <motion.p className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.guestCount}
                </motion.p>
              )}
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
              onBlur={handleBlur}
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
            onBlur={handleBlur}
            placeholder="Share details about your style, preferences, or any special requests..."
            rows={4}
            maxLength={1000}
            className="w-full bg-transparent border-b border-[#6B1A1A]/20 py-4 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/40 resize-none"
          />
          <p className="text-[9px] text-[#9B8878]/60 mt-2">{formData.message.length}/1000 characters</p>
        </div>
      </div>

      <div className="pt-12 text-center">
        <motion.button
          type="submit"
          disabled={loading || !isFormValid}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
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
