import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { trpc } from '@/lib/trpc';
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

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await trpc.auth.login.mutate({ email, password });
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      toast.success('Welcome back, ' + response.user.name);
      navigate({ to: '/admin/dashboard' });
    } catch (err: any) {
      console.error('Login failed:', err);
      toast.error(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-burgundy-deep flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-burgundy/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-gold/20 border-4 border-ivory/10">
              <span className="text-4xl font-display text-burgundy-deep">V</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-display text-ivory mb-2 tracking-tight">Varnana Events</h1>
          <p className="text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">Administrative Portal</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-ivory/10"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@varnana-events.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-burgundy outline-none transition bg-gray-50/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-burgundy outline-none transition bg-gray-50/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-deep hover:bg-burgundy text-ivory font-bold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-burgundy/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-burgundy text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Return to Website
            </a>
          </div>
        </motion.div>

        {/* Demo Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-ivory/30 text-[10px] uppercase tracking-widest leading-relaxed">
            Authorized access only. All activities are logged.<br />
            © 2026 Varnana Events Studio
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
