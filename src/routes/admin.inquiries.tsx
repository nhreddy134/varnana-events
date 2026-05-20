import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Archive,
  ArrowLeft,
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/inquiries')({
  head: () => ({
    meta: [
      { title: 'Inquiry Management - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminInquiries,
});

function AdminInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate({ to: '/admin/login' });
      return;
    }
    fetchInquiries();
  }, [navigate]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await trpc.inquiries.getAll.query();
      setInquiries(data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: any) => {
    try {
      await trpc.inquiries.updateStatus.mutate({ id, status });
      toast.success(`Status updated to ${status}`);
      fetchInquiries();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.eventType.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contacted': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'converted': return 'bg-green-100 text-green-700 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
              {filteredInquiries.length} Total
            </span>
            <button 
              onClick={fetchInquiries}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"
            >
              <Clock size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or event type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'new', 'contacted', 'converted', 'archived'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition whitespace-nowrap ${
                  filter === f 
                    ? 'bg-burgundy text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-burgundy/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-burgundy mb-4" />
            <p className="text-gray-500">Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <MessageSquare className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900">No inquiries found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredInquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                          <User className="text-gray-400" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Mail size={14} /> {inquiry.email}</span>
                            {inquiry.phone && <span className="flex items-center gap-1"><Phone size={14} /> {inquiry.phone}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          Submitted {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-50">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Event Type</p>
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Filter size={14} className="text-burgundy" /> {inquiry.eventType}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Event Date</p>
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Calendar size={14} className="text-burgundy" /> 
                          {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'TBD'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guests</p>
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Users size={14} className="text-burgundy" /> {inquiry.guestCount || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Budget</p>
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <DollarSign size={14} className="text-burgundy" /> {inquiry.budget || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    {inquiry.message && (
                      <div className="mt-6">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</p>
                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                          "{inquiry.message}"
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, 'contacted')}
                        disabled={inquiry.status === 'contacted'}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition text-sm font-bold disabled:opacity-50"
                      >
                        <Clock size={16} /> Mark Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, 'converted')}
                        disabled={inquiry.status === 'converted'}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-bold disabled:opacity-50"
                      >
                        <CheckCircle size={16} /> Mark Converted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, 'archived')}
                        disabled={inquiry.status === 'archived'}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition text-sm font-bold disabled:opacity-50"
                      >
                        <Archive size={16} /> Archive
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
