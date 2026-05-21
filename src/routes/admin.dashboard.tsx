import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Inbox, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Download,
  Mail,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/dashboard')({
  head: () => ({
    meta: [
      { title: 'Admin Dashboard - Varnana Events' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminDashboard,
});

// Simulated Data
const INITIAL_INQUIRIES = [
  { id: '1', name: 'Elena Gilbert', email: 'elena@mystic.com', phone: '+1 555-0123', eventType: 'Weddings', eventDate: '2026-06-15', guestCount: 150, budget: '$50,000+', status: 'new', created_at: '2026-05-20T10:30:00Z' },
  { id: '2', name: 'Stefan Salvatore', email: 'stefan@salvatore.com', phone: '+1 555-0124', eventType: 'Corporate Events', eventDate: '2026-08-22', guestCount: 300, budget: '$25,000 - $50,000', status: 'contacted', created_at: '2026-05-19T14:20:00Z' },
  { id: '3', name: 'Caroline Forbes', email: 'caroline@forbes.com', phone: '+1 555-0125', eventType: 'Social Events', eventDate: '2026-12-10', guestCount: 80, budget: '$10,000 - $25,000', status: 'converted', created_at: '2026-05-18T09:15:00Z' },
  { id: '4', name: 'Bonnie Bennett', email: 'bonnie@bennett.com', phone: '+1 555-0126', eventType: 'Cultural Events', eventDate: '2026-07-04', guestCount: 200, budget: '$50,000+', status: 'new', created_at: '2026-05-21T11:45:00Z' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'analytics' | 'settings'>('overview');
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      navigate({ to: '/admin/login' });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate({ to: '/admin/login' });
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         inquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setInquiries(prev => prev.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv));
    toast.success(`Status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[#6B1A1A]/5 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-8 border-b border-[#6B1A1A]/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#6B1A1A] rounded-full flex items-center justify-center">
              <span className="text-white font-serif italic text-sm">V</span>
            </div>
            <span className="font-serif text-xl text-[#6B1A1A] italic">Varnana Admin</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-medium">Studio Management</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<Inbox size={18} />} 
            label="Inquiries" 
            active={activeTab === 'inquiries'} 
            onClick={() => setActiveTab('inquiries')} 
            count={inquiries.filter(i => i.status === 'new').length}
          />
          <SidebarItem 
            icon={<BarChart3 size={18} />} 
            label="Analytics" 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="p-6 border-t border-[#6B1A1A]/5 space-y-4">
          <a 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 text-[#9B8878] hover:text-[#6B1A1A] transition-colors text-[10px] uppercase tracking-[0.2em] w-full"
          >
            <ExternalLink size={16} />
            View Website
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-[#9B8878] hover:text-red-600 transition-colors text-[10px] uppercase tracking-[0.2em] w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl text-[#6B1A1A] italic mb-2">
              {activeTab === 'overview' && 'Welcome back, Admin'}
              {activeTab === 'inquiries' && 'Event Inquiries'}
              {activeTab === 'analytics' && 'Studio Analytics'}
              {activeTab === 'settings' && 'System Settings'}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9B8878]">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {activeTab === 'inquiries' && (
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#6B1A1A]/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#6B1A1A] hover:bg-[#FDFCFB] transition-colors">
              <Download size={14} />
              Export CSV
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard label="Total Inquiries" value={inquiries.length.toString()} icon={<Inbox className="text-[#C4A882]" />} />
                <StatCard label="New Today" value="2" icon={<Clock className="text-[#C4A882]" />} />
                <StatCard label="Conversion Rate" value="24%" icon={<BarChart3 className="text-[#C4A882]" />} />
                <StatCard label="Est. Revenue" value="$142k" icon={<DollarSign className="text-[#C4A882]" />} />
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white rounded-2xl border border-[#6B1A1A]/5 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#6B1A1A]/5 flex justify-between items-center">
                  <h3 className="font-serif text-xl text-[#6B1A1A] italic">Recent Activity</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-[9px] uppercase tracking-[0.2em] text-[#9B8878] hover:text-[#6B1A1A]">View All</button>
                </div>
                <div className="divide-y divide-[#6B1A1A]/5">
                  {inquiries.slice(0, 3).map(inquiry => (
                    <div key={inquiry.id} className="p-6 flex items-center justify-between hover:bg-[#FDFCFB] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#FDFCFB] rounded-full flex items-center justify-center text-[#6B1A1A] font-serif italic border border-[#6B1A1A]/5">
                          {inquiry.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#4A3728]">{inquiry.name}</p>
                          <p className="text-[10px] text-[#9B8878] uppercase tracking-wider">{inquiry.eventType} • {inquiry.eventDate}</p>
                        </div>
                      </div>
                      <StatusBadge status={inquiry.status} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inquiries' && (
            <motion.div 
              key="inquiries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-6 rounded-2xl border border-[#6B1A1A]/5 shadow-sm">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B8878]/40" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FDFCFB] border-none rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:ring-1 focus:ring-[#6B1A1A]/10 text-[#4A3728]"
                  />
                </div>
                <div className="flex gap-4">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-[#6B1A1A]/10 rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#6B1A1A] outline-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-white rounded-2xl border border-[#6B1A1A]/5 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FDFCFB] border-b border-[#6B1A1A]/5">
                      <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">Client</th>
                      <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">Event Details</th>
                      <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">Budget</th>
                      <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">Status</th>
                      <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#6B1A1A]/5">
                    {filteredInquiries.map(inquiry => (
                      <tr key={inquiry.id} className="hover:bg-[#FDFCFB]/50 transition-colors">
                        <td className="p-6">
                          <p className="text-sm font-medium text-[#4A3728]">{inquiry.name}</p>
                          <p className="text-xs text-[#9B8878]">{inquiry.email}</p>
                        </td>
                        <td className="p-6">
                          <p className="text-xs text-[#4A3728] font-medium">{inquiry.eventType}</p>
                          <p className="text-[10px] text-[#9B8878] uppercase tracking-wider">{inquiry.eventDate} • {inquiry.guestCount} guests</p>
                        </td>
                        <td className="p-6">
                          <span className="text-xs text-[#4A3728]">{inquiry.budget}</span>
                        </td>
                        <td className="p-6">
                          <StatusBadge status={inquiry.status} />
                        </td>
                        <td className="p-6">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => updateStatus(inquiry.id, 'contacted')}
                              className="p-2 hover:bg-[#6B1A1A]/5 rounded-lg text-[#9B8878] hover:text-[#6B1A1A] transition-colors"
                              title="Mark as Contacted"
                            >
                              <Mail size={16} />
                            </button>
                            <button 
                              onClick={() => updateStatus(inquiry.id, 'converted')}
                              className="p-2 hover:bg-[#6B1A1A]/5 rounded-lg text-[#9B8878] hover:text-green-600 transition-colors"
                              title="Mark as Converted"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredInquiries.length === 0 && (
                  <div className="p-20 text-center">
                    <p className="text-[#9B8878] italic">No inquiries found matching your criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="bg-white p-8 rounded-2xl border border-[#6B1A1A]/5 shadow-sm">
                <h3 className="font-serif text-xl text-[#6B1A1A] italic mb-8">Inquiries by Event Type</h3>
                <div className="space-y-6">
                  <AnalyticsBar label="Weddings" percentage={45} color="#6B1A1A" />
                  <AnalyticsBar label="Corporate" percentage={25} color="#C4A882" />
                  <AnalyticsBar label="Social" percentage={15} color="#9B8878" />
                  <AnalyticsBar label="Cultural" percentage={15} color="#4A3728" />
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#6B1A1A]/5 shadow-sm">
                <h3 className="font-serif text-xl text-[#6B1A1A] italic mb-8">Monthly Growth</h3>
                <div className="h-64 flex items-end justify-between gap-4">
                  {[40, 65, 45, 80, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="w-full bg-[#6B1A1A]/10 rounded-t-lg relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#6B1A1A]">
                          {h}%
                        </div>
                      </motion.div>
                      <span className="text-[9px] uppercase tracking-widest text-[#9B8878]">M{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl space-y-12"
            >
              <div className="space-y-8">
                <h3 className="font-serif text-xl text-[#6B1A1A] italic">Notification Settings</h3>
                <div className="space-y-4">
                  <ToggleItem label="Email notifications for new inquiries" active={true} />
                  <ToggleItem label="Weekly analytics summary" active={false} />
                  <ToggleItem label="Auto-response to new clients" active={true} />
                </div>
              </div>
              <div className="space-y-8 pt-8 border-t border-[#6B1A1A]/5">
                <h3 className="font-serif text-xl text-[#6B1A1A] italic">Security</h3>
                <button className="px-8 py-4 bg-white border border-[#6B1A1A]/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#6B1A1A] hover:bg-[#6B1A1A] hover:text-white transition-all duration-500">
                  Change Admin Password
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Helper Components
function SidebarItem({ icon, label, active, onClick, count }: { icon: any, label: string, active: boolean, onClick: () => void, count?: number }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
        active ? 'bg-[#6B1A1A] text-white shadow-lg shadow-[#6B1A1A]/10' : 'text-[#9B8878] hover:bg-[#6B1A1A]/5 hover:text-[#6B1A1A]'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium">{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white text-[#6B1A1A]' : 'bg-[#6B1A1A] text-white'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#6B1A1A]/5 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#9B8878] font-bold">{label}</p>
        <div className="p-2 bg-[#FDFCFB] rounded-lg">{icon}</div>
      </div>
      <p className="text-3xl font-serif text-[#6B1A1A] italic">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    new: 'bg-[#C4A882]/10 text-[#C4A882] border-[#C4A882]/20',
    contacted: 'bg-blue-50 text-blue-600 border-blue-100',
    converted: 'bg-green-50 text-green-600 border-green-100',
    rejected: 'bg-red-50 text-red-600 border-red-100',
  }[status as keyof typeof styles] || 'bg-gray-50 text-gray-600 border-gray-100';

  return (
    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border ${styles}`}>
      {status}
    </span>
  );
}

function AnalyticsBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#9B8878]">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#FDFCFB] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ToggleItem({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#6B1A1A]/5">
      <span className="text-xs text-[#4A3728]">{label}</span>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#6B1A1A]' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
      </div>
    </div>
  );
}
