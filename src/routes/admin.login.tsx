import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Lock, User, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/login')({
  head: () => ({
    meta: [
      { title: 'Admin Login - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulated production auth check
      // Default credentials: admin@varnana.com / varnana2026
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (email === 'admin@varnana.com' && password === 'varnana2026') {
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_token', 'simulated_jwt_token');
        localStorage.setItem('user', JSON.stringify({ name: 'Admin', email: 'admin@varnana.com' }));
        
        toast.success('Welcome back to the Studio');
        navigate({ to: '/admin/dashboard' });
      } else {
        throw new Error('Invalid credentials. Please verify your email and password.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C4A882]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6B1A1A]/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 bg-[#6B1A1A] rounded-full flex items-center justify-center shadow-2xl shadow-[#6B1A1A]/20">
              <span className="text-2xl font-serif text-white italic">V</span>
            </div>
          </motion.div>
          <h1 className="font-serif text-4xl text-[#6B1A1A] italic mb-4">Studio Admin</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#9B8878] font-medium">
            Secure Access Required
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-10 rounded-2xl shadow-sm border border-[#6B1A1A]/5 space-y-8"
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs leading-relaxed"
            >
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9B8878]/40" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#6B1A1A]/10 py-4 pl-8 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/20"
                    placeholder="admin@varnana.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9B8878]/40" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-[#6B1A1A]/10 py-4 pl-8 focus:border-[#6B1A1A] outline-none transition-colors text-[#4A3728] placeholder:text-[#9B8878]/20"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.3em] text-[10px] uppercase hover:bg-[#C4A882] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-[#6B1A1A]/10"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Enter Dashboard'
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-[#FDFCFB] text-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#9B8878] hover:text-[#6B1A1A] transition-colors"
            >
              <ArrowLeft size={12} /> Return to Website
            </a>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-[9px] uppercase tracking-[0.2em] text-[#9B8878]/60 leading-relaxed"
        >
          Authorized access only. All activities are logged.<br />
          © 2026 Varnana Events Studio
        </motion.p>
      </motion.div>
    </div>
  );
}
