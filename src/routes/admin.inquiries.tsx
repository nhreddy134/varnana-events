import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye } from 'lucide-react';

export const Route = createFileRoute('/admin/inquiries')({
  head: () => ({
    meta: [
      { title: 'Inquiries Management - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminInquiries,
});

function AdminInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

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
      // TODO: Call tRPC inquiries.getAll endpoint
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      // TODO: Call tRPC inquiries.updateStatus endpoint
      fetchInquiries();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    converted: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate({ to: '/admin/dashboard' })}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Event Inquiries</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No inquiries yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inquiries List */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {inquiries.map((inquiry, index) => (
                  <motion.button
                    key={inquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      selectedInquiry?.id === inquiry.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                        <p className="text-sm text-gray-500">{inquiry.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[inquiry.status] || statusColors.new
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{inquiry.eventType}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Inquiry Details */}
            {selectedInquiry && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6 sticky top-24"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Details</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.phone || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Event Type</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.eventType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Event Date</p>
                    <p className="font-medium text-gray-900">
                      {selectedInquiry.eventDate
                        ? new Date(selectedInquiry.eventDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Guest Count</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.guestCount || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium text-gray-900">{selectedInquiry.budget || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Message</p>
                    <p className="text-gray-700 text-sm mt-1">{selectedInquiry.message || 'No message'}</p>
                  </div>

                  {/* Status Update */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Status</p>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Contact Button */}
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center font-medium"
                  >
                    Send Email
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
