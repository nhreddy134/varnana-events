import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Users, 
  TrendingUp, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

export const Route = createFileRoute('/admin/dashboard')({
  head: () => ({
    meta: [
      { title: 'Admin Dashboard - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    images: 0,
    inquiries: 0,
    announcements: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate({ to: '/admin/login' });
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const [images, inquiries, announcements] = await Promise.all([
        trpc.gallery.getAll.query(),
        trpc.inquiries.getAll.query(),
        trpc.announcements.getAll.query(),
      ]);
      
      setStats({
        images: images.length,
        inquiries: inquiries.length,
        announcements: announcements.length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate({ to: '/admin/login' });
  };

  const navCards = [
    {
      title: 'Gallery',
      desc: 'Manage portfolio images and event types',
      icon: <ImageIcon className="text-blue-500" size={24} />,
      link: '/admin/gallery',
      count: stats.images,
      color: 'blue'
    },
    {
      title: 'Inquiries',
      desc: 'View and manage client event requests',
      icon: <MessageSquare className="text-green-500" size={24} />,
      link: '/admin/inquiries',
      count: stats.inquiries,
      color: 'green'
    },
    {
      title: 'Announcements',
      desc: 'Update site-wide news and alerts',
      icon: <Bell className="text-amber-500" size={24} />,
      link: '/admin/announcements',
      count: stats.announcements,
      color: 'amber'
    },
    {
      title: 'Contact Info',
      desc: 'Update business address and social links',
      icon: <Settings className="text-purple-500" size={24} />,
      link: '/admin/contact',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-burgundy text-white hidden md:flex flex-col">
        <div className="p-8">
          <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-burgundy">V</span>
          </div>
          <h2 className="text-xl font-display font-bold">Varnana</h2>
          <p className="text-xs text-ivory/60 uppercase tracking-widest mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-sm font-medium">
            <TrendingUp size={18} /> Dashboard
          </Link>
          <Link to="/admin/gallery" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition">
            <ImageIcon size={18} /> Gallery
          </Link>
          <Link to="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition">
            <MessageSquare size={18} /> Inquiries
          </Link>
          <Link to="/admin/announcements" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition">
            <Bell size={18} /> Announcements
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-500/20 rounded-lg text-sm font-medium text-red-200 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Welcome back, {user?.name || 'Admin'}</h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="flex items-center gap-2 text-sm text-gray-500 hover:text-burgundy transition">
              View Site <ExternalLink size={14} />
            </a>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
              <Users size={20} className="text-gray-400" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ImageIcon size={20} />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Images</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.images}</span>
                <span className="text-xs text-green-500 font-medium mb-1">+0 this week</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <MessageSquare size={20} />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Inquiries</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.inquiries}</span>
                <span className="text-xs text-green-500 font-medium mb-1">+0 today</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Bell size={20} />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Announcements</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.announcements}</span>
                <span className="text-xs text-gray-400 font-medium mb-1">Active</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {navCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                >
                  <Link to={card.link as any} className="p-6 block">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      {card.count !== undefined && (
                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                          {card.count} items
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800">Recent Inquiries</h3>
                <Link to="/admin/inquiries" className="text-xs font-bold text-burgundy hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
                  <p>No recent inquiries to show.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800">Upcoming Events</h3>
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  <Calendar size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
                  <p>No scheduled events found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
