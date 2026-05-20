import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Image, Mail, Megaphone, MessageSquare } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate({ to: '/admin/login' });
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate({ to: '/admin/login' });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const menuItems = [
    { icon: Image, label: 'Gallery', href: '/admin/gallery', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, label: 'Contact Info', href: '/admin/contact', color: 'from-purple-500 to-purple-600' },
    { icon: Megaphone, label: 'Announcements', href: '/admin/announcements', color: 'from-pink-500 to-pink-600' },
    { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-burgundy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Varnana Admin</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.name || user?.email}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition`}
                >
                  <Icon size={32} className="mb-4" />
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                  <p className="text-white/80 text-sm mt-2">Manage {item.label.toLowerCase()}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Gallery Images</p>
                <p className="text-2xl font-bold text-blue-600">--</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">New Inquiries</p>
                <p className="text-2xl font-bold text-purple-600">--</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Active Announcements</p>
                <p className="text-2xl font-bold text-pink-600">--</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Inquiries</p>
                <p className="text-2xl font-bold text-green-600">--</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
