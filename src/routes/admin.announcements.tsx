import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader2, 
  Calendar
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/announcements')({
  head: () => ({
    meta: [
      { title: 'Announcement Management - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminAnnouncements,
});

function AdminAnnouncements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPublished: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate({ to: '/admin/login' });
      return;
    }
    fetchAnnouncements();
  }, [navigate]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await trpc.announcements.getAll.query();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await trpc.announcements.create.mutate({
        ...formData,
        publishedAt: formData.isPublished ? new Date() : undefined,
      });
      
      toast.success('Announcement created');
      setFormData({ title: '', content: '', isPublished: false });
      setShowForm(false);
      fetchAnnouncements();
    } catch (error) {
      console.error('Creation failed:', error);
      toast.error('Failed to create announcement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await trpc.announcements.delete.mutate({ id });
      toast.success('Announcement deleted');
      fetchAnnouncements();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete announcement');
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await trpc.announcements.update.mutate({ 
        id, 
        isPublished,
        publishedAt: isPublished ? new Date() : undefined
      });
      toast.success(isPublished ? 'Announcement published' : 'Announcement hidden');
      fetchAnnouncements();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update announcement');
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
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition shadow-md"
          >
            <Plus size={18} />
            {showForm ? 'Cancel' : 'New Announcement'}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-burgundy/10 overflow-hidden"
            >
              <h2 className="text-xl font-bold mb-6 text-burgundy">Create New Announcement</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Summer Wedding Season Bookings Open"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Content</label>
                  <textarea
                    placeholder="Describe the update or announcement in detail..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burgundy outline-none transition"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5 accent-burgundy rounded border-gray-300"
                  />
                  <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700">
                    Publish immediately to website
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-8 py-3 bg-burgundy text-white rounded-lg font-bold uppercase tracking-widest hover:bg-burgundy/90 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <Loader2 size={18} className="animate-spin" />}
                  {submitting ? 'Creating...' : 'Create Announcement'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-burgundy mb-4" />
            <p className="text-gray-500">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <Bell className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900">No announcements yet</h3>
            <p className="text-gray-500 mt-1">Keep your clients updated with site-wide news.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        item.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.content}</p>
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> Created {new Date(item.createdAt).toLocaleDateString()}</span>
                      {item.publishedAt && <span className="flex items-center gap-1.5"><Eye size={12} /> Published {new Date(item.publishedAt).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleTogglePublish(item.id, !item.isPublished)}
                      className={`p-2 rounded-lg transition ${
                        item.isPublished ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-green-600 bg-green-50 hover:bg-green-100'
                      }`}
                      title={item.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {item.isPublished ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
