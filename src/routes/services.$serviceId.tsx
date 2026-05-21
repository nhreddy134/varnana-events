import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/services/$serviceId')({
  head: ({ params }) => ({
    meta: [
      { title: `${params.serviceId.charAt(0).toUpperCase() + params.serviceId.slice(1)} - Varnana Events` },
      { name: 'description', content: `Explore our ${params.serviceId} event planning services` },
    ],
  }),
  component: ServiceDetail,
});

interface ServiceContent {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  offerings: string[];
  idealFor: string;
  image: string;
}

const serviceContent: Record<string, ServiceContent> = {
  weddings: {
    title: 'Weddings',
    subtitle: 'Timeless celebrations of love',
    description: 'We believe every wedding is a unique love story waiting to be told. From intimate ceremonies to grand celebrations, we craft editorial moments that blend tradition, elegance, and the quiet details only you remember.',
    highlights: [
      'Bespoke ceremony design',
      'Vendor curation & coordination',
      'Day-of coordination & execution',
      'Multi-day event management',
      'Cultural & traditional integration',
      'Photography & videography liaison',
    ],
    offerings: [
      'Pre-wedding consultations & vision development',
      'Venue selection & design concepts',
      'Catering & bar program curation',
      'Floral & décor design',
      'Entertainment & music coordination',
      'Guest experience design',
      'Timeline management & logistics',
      'Post-wedding coordination',
    ],
    idealFor: 'Couples seeking an editorial, intentional approach to their wedding day—where every detail reflects their story.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  },
  corporate: {
    title: 'Corporate Events',
    subtitle: 'Professional gatherings with impact',
    description: 'Corporate events demand precision, elegance, and strategic thinking. We design conferences, product launches, and brand experiences that inspire attendees and elevate your company\'s presence in the market.',
    highlights: [
      'Conference & summit planning',
      'Product launch experiences',
      'Executive retreats & offsites',
      'Awards ceremonies & galas',
      'Team building experiences',
      'Brand activation events',
      'Networking & VIP experiences',
    ],
    offerings: [
      'Event strategy & objectives alignment',
      'Venue & logistics management',
      'Audio/visual & technology integration',
      'Speaker coordination & management',
      'Catering & hospitality design',
      'Branding & signage implementation',
      'Guest registration & flow management',
      'Post-event analytics & reporting',
    ],
    idealFor: 'Corporations and brands that value precision, professionalism, and memorable experiences that strengthen company culture.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
  },
  birthdays: {
    title: 'Birthdays',
    subtitle: 'Personalized celebrations of milestones',
    description: 'Birthdays mark moments of joy and reflection. We create celebrations that capture the essence of the person being honored—whether intimate gatherings or grand soirées, each detail is designed to make the day unforgettable.',
    highlights: [
      'Theme conceptualization & design',
      'Age-appropriate entertainment',
      'Personalized décor & styling',
      'Catering & dessert curation',
      'Photography & memory capture',
      'Guest experience design',
      'Timeline & logistics management',
    ],
    offerings: [
      'Venue selection & styling',
      'Invitation design & distribution',
      'Entertainment & activities coordination',
      'Cake & dessert selection',
      'Floral & décor design',
      'Music & DJ coordination',
      'Games & interactive experiences',
      'Memory books & keepsakes',
    ],
    idealFor: 'Families and individuals celebrating milestones with style, personality, and editorial attention to detail.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
  },
  anniversaries: {
    title: 'Anniversaries',
    subtitle: 'Romantic moments celebrating milestones',
    description: 'Anniversaries are intimate celebrations of love and commitment. We design romantic, sophisticated experiences that honor your journey together and create new cherished memories.',
    highlights: [
      'Romantic venue selection',
      'Intimate dining experiences',
      'Special entertainment & music',
      'Memory displays & tributes',
      'Personalized décor & ambiance',
      'Photography & videography',
      'Surprise coordination',
    ],
    offerings: [
      'Venue & ambiance design',
      'Private dining arrangements',
      'Wine & beverage pairing',
      'Floral & décor styling',
      'Live music or DJ coordination',
      'Memory timeline displays',
      'Photography services',
      'Renewal of vows ceremonies',
    ],
    idealFor: 'Couples celebrating their love story with an intimate, romantic, and editorial approach.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
  },
  social: {
    title: 'Social Events',
    subtitle: 'Unforgettable gatherings for connections',
    description: 'Social events bring people together. We create atmospheres where genuine connections flourish—whether it\'s a dinner party, cocktail reception, or celebration with friends and family.',
    highlights: [
      'Intimate dinner parties',
      'Cocktail receptions',
      'Garden parties & outdoor events',
      'Holiday celebrations',
      'Milestone gatherings',
      'Networking events',
      'Seasonal celebrations',
    ],
    offerings: [
      'Venue selection & styling',
      'Menu & catering design',
      'Bar program & beverage selection',
      'Floral & décor arrangement',
      'Music & entertainment',
      'Lighting & ambiance design',
      'Guest flow & experience management',
      'Photography & documentation',
    ],
    idealFor: 'Hosts who value atmosphere, meaningful connections, and editorial details in their social gatherings.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
  },
  cultural: {
    title: 'Cultural Events',
    subtitle: 'Celebrations honoring traditions',
    description: 'Cultural events are celebrations of identity, heritage, and community. We honor traditions while creating modern, editorial experiences that bring families and communities together with vibrancy and elegance.',
    highlights: [
      'Traditional ceremony integration',
      'Cultural décor & styling',
      'Multi-day celebration planning',
      'Traditional music & entertainment',
      'Cultural cuisine curation',
      'Ritual coordination',
      'Community gathering design',
    ],
    offerings: [
      'Cultural consultation & planning',
      'Venue & space design',
      'Traditional & modern décor fusion',
      'Authentic cuisine curation',
      'Entertainment & performer coordination',
      'Ritual & ceremony facilitation',
      'Photography & videography',
      'Guest experience & hospitality',
    ],
    idealFor: 'Families celebrating cultural heritage with authenticity, elegance, and editorial precision.',
    image: 'https://images.unsplash.com/photo-1540575861501-7c00117f4894?auto=format&fit=crop&q=80&w=1200',
  },
};

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = Route.useParams();
  const service = serviceContent[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif text-[#6B1A1A] mb-4">Service Not Found</h1>
          <p className="text-[#9B8878] mb-8">We couldn't find the service you're looking for.</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-8 py-3 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.2em] text-[11px] uppercase hover:bg-[#C4A882] transition-all duration-500"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

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

      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] md:h-[400px] overflow-hidden"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-gold inline-block" />
              {service.subtitle}
            </p>
            <h1 className="text-6xl md:text-7xl font-serif text-[#6B1A1A] mb-6 italic">
              {service.title}
            </h1>
            <div className="h-px w-24 bg-gold/50 mb-8" />
            <p className="text-xl md:text-2xl text-[#4A3728] leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl font-serif text-[#6B1A1A] mb-8 flex items-center gap-3">
                <Sparkles size={24} className="text-gold" />
                Key Highlights
              </h2>
              <ul className="space-y-4">
                {service.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={20} className="text-gold mt-1 flex-shrink-0" />
                    <span className="text-[#4A3728]">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Ideal For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-serif text-[#6B1A1A] mb-8 flex items-center gap-3">
                <Heart size={24} className="text-gold" />
                Ideal For
              </h2>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 border border-gold/20">
                <p className="text-lg text-[#4A3728] leading-relaxed italic">
                  {service.idealFor}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Offerings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif text-[#6B1A1A] mb-8 flex items-center gap-3">
              <Users size={24} className="text-gold" />
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.offerings.map((offering, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                  className="bg-white/40 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300"
                >
                  <p className="text-[#4A3728] font-medium">{offering}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center py-16 border-t border-gold/20"
          >
            <p className="text-[#9B8878] text-sm uppercase tracking-[0.3em] mb-8">
              Ready to bring your vision to life?
            </p>
            <button
              onClick={() => navigate({ to: '/contact', search: { service: serviceId } })}
              className="px-12 py-5 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.2em] text-[11px] uppercase hover:bg-[#C4A882] transition-all duration-500 shadow-xl"
            >
              Inquire for {service.title}
            </button>
          </motion.div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
      <div className="fixed top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -mr-48" />
    </div>
  );
}
