import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  ArrowLeft, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Instagram, 
  Facebook, 
  Twitter 
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Management - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminContact,
});

function AdminContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
      website: '',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate({ to: '/admin/login' });
      return;
    }
    fetchContact();
  }, [navigate]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const data = await trpc.contact.get.query();
      if (data) {
        setFormData({
          businessName: data.businessName || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          socialLinks: (data.socialLinks as any) || {
            instagram: '',
            facebook: '',
            twitter: '',
            website: '',
          },
        });
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      toast.error('Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await trpc.contact.update.mutate(formData);
      toast.success('Contact information updated');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update information');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [key]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-burgundy mb-4" />
        <p className="text-gray-500">Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate({ to: '/admin/dashboard' })}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            form="contact-form"
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition shadow-md disabled:opacity-50"
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="text-burgundy" size={20} /> Basic Business Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                  placeholder="Varnana Events"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Public Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="hello@varnana-events.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Office Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="123 Event Street, NY"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="text-burgundy" size={20} /> Social Media & Web
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Instagram URL</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Facebook URL</label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Twitter URL</label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Main Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="url"
                    value={formData.socialLinks.website}
                    onChange={(e) => handleSocialChange('website', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    placeholder="https://varnana-events.com"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center py-6">
            <p className="text-xs text-gray-400 font-medium italic">
              * Changes made here will be reflected across the website's footer and contact pages.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
