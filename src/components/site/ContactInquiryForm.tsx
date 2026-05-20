import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
      // Validate form
      if (!formData.name || !formData.email || !formData.eventType) {
        throw new Error('Please fill in all required fields');
      }

      // Convert guestCount to number if provided
      const submissionData = {
        ...formData,
        guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      };

      // Call tRPC inquiries.create endpoint
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

      // Reset success message after 10 seconds
      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit form';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-display text-burgundy mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-12">
              Ready to bring your event vision to life? Contact us today and let's start planning your perfect celebration.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Phone */}
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon - Fri, 9am - 6pm</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">hello@varnana-events.com</p>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Event Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center py-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-green-500" size={48} />
                </div>
                <h3 className="text-3xl font-display text-burgundy mb-4">Thank You!</h3>
                <p className="text-lg text-gray-600 mb-8">
                  We've received your inquiry and will be in touch within 24 hours to discuss your vision.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-burgundy font-semibold hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error message */}
                {error && (
                  <motion.div
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                    />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      placeholder="Estimated guests"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Your Vision
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about your style, preferences, or any special requests..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none transition bg-gray-50/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full px-6 py-4 bg-burgundy text-ivory rounded-lg font-bold uppercase tracking-widest hover:bg-burgundy-deep shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Inquiry
                    </>
                  )}
                </motion.button>

                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                  Personalized response within 24 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
