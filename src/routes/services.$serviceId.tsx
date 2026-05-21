import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Hammer, Clock, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/services/$serviceId')({
  head: ({ params }) => ({
    meta: [
      { title: `${params.serviceId.charAt(0).toUpperCase() + params.serviceId.slice(1)} - Varnana Events` },
      { name: 'description', content: `Explore our ${params.serviceId} event planning services` },
    ],
  }),
  component: ServiceDetail,
});

const serviceTitles: Record<string, string> = {
  weddings: 'Weddings',
  corporate: 'Corporate Events',
  birthdays: 'Birthdays',
  anniversaries: 'Anniversaries',
  social: 'Social Events',
  cultural: 'Cultural Events',
};

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = Route.useParams();
  const title = serviceTitles[serviceId] || 'Our Services';

  return (
    <div className="min-h-screen bg-[#F0EDE8] flex flex-col">
      {/* Navigation */}
      <nav className="p-6 md:p-10">
        <motion.button
          onClick={() => navigate({ to: '/' })}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-[#6B1A1A] group"
        >
          <div className="w-10 h-10 rounded-full border border-[#6B1A1A]/20 flex items-center justify-center group-hover:bg-[#6B1A1A] group-hover:text-white transition-all duration-500">
            <ArrowLeft size={18} />
          </div>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-medium">Back to Home</span>
        </motion.button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 relative inline-block"
          >
            <div className="absolute -inset-4 bg-gold/10 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-gold/30 flex items-center justify-center bg-white/50 backdrop-blur-sm mx-auto">
              <Sparkles className="text-gold w-10 h-10 md:w-14 md:h-14 animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-[#6B1A1A] mb-6 italic">
              {title}
            </h1>
            <div className="h-px w-24 bg-gold/50 mx-auto mb-8" />
            
            <div className="space-y-6 max-w-xl mx-auto">
              <p className="text-xl md:text-2xl font-serif text-[#4A3728] italic leading-relaxed">
                We are currently curating the portfolio for this experience.
              </p>
              <p className="text-[#9B8878] font-sans text-sm tracking-wide leading-loose uppercase">
                Varnana is a studio of quiet intention. <br />
                This narrative is being composed with the care it deserves.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <div className="flex items-center gap-3 text-[#C4A882]">
              <Clock size={18} />
              <span className="text-[10px] uppercase tracking-[0.3em]">Coming Summer 2026</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gold/30" />
            <div className="flex items-center gap-3 text-[#C4A882]">
              <Hammer size={18} />
              <span className="text-[10px] uppercase tracking-[0.3em]">Work in Progress</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20"
          >
            <button
              onClick={() => navigate({ to: '/contact' })}
              className="px-12 py-5 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.2em] text-[11px] uppercase hover:bg-[#C4A882] transition-all duration-500 shadow-xl"
            >
              Inquire for {title}
            </button>
          </motion.div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
      <div className="fixed top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
    </div>
  );
}
