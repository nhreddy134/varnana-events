import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/gallery')({
  head: () => ({
    meta: [
      { title: 'Gallery Management - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminGallery,
});

function AdminGallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    eventType: 'Weddings' as any,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate({ to: '/admin/login' });
      return;
    }
    fetchImages();
  }, [navigate]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await trpc.gallery.getAll.query();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await trpc.gallery.create.mutate({
        ...formData,
        imageKey: `gallery-${Date.now()}`,
        displayOrder: images.length,
      });
      
      toast.success('Image added to gallery');
      setFormData({ title: '', description: '', imageUrl: '', eventType: 'Weddings' });
      setShowUploadForm(false);
      fetchImages();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to add image');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await trpc.gallery.delete.mutate({ id });
      toast.success('Image deleted');
      fetchImages();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await trpc.gallery.update.mutate({ id, isPublished });
      toast.success(isPublished ? 'Image published' : 'Image hidden');
      fetchImages();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update image');
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
            <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition"
          >
            <Upload size={18} />
            {showUploadForm ? 'Cancel' : 'Add Image'}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Form */}
        {showUploadForm && (
          <motion.form
            onSubmit={handleUpload}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 mb-8 border border-gray-100"
          >
            <h2 className="text-lg font-semibold mb-4 text-burgundy">Add New Gallery Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Elegant Summer Wedding"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
                >
                  <option>Weddings</option>
                  <option>Corporate Events</option>
                  <option>Birthdays</option>
                  <option>Anniversaries</option>
                  <option>Social Events</option>
                  <option>Cultural Events</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Briefly describe the event or the shot..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
                  rows={2}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-gray-700">Image URL (Unsplash or direct link)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                type="submit" 
                disabled={submitting}
                className="px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? 'Adding...' : 'Add to Gallery'}
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {/* Images Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-burgundy mb-4" />
            <p className="text-gray-500">Loading your gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No images yet</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Start building your portfolio by uploading your first event image.
            </p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="mt-6 text-burgundy font-semibold hover:underline"
            >
              Upload your first image →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-md transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      image.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {image.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{image.title}</h3>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium">
                      {image.eventType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 h-10">
                    {image.description || 'No description provided.'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePublish(image.id, !image.isPublished)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium border border-gray-200"
                    >
                      {image.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                      {image.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition border border-red-100"
                    >
                      <Trash2 size={16} />
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
