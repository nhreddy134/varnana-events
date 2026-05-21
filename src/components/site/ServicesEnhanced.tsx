import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Timeless celebrations of love with meticulous attention to detail and editorial care.',
    features: ['Ceremony Planning', 'Reception Design', 'Vendor Coordination', 'Day-of Coordination'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Professional gatherings that inspire, engage, and elevate your brand identity.',
    features: ['Conference Planning', 'Product Launches', 'Team Building', 'Awards Ceremonies'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    description: 'Personalized celebrations that capture the essence of the moment with style.',
    features: ['Theme Design', 'Entertainment', 'Catering', 'Photography'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'anniversaries',
    title: 'Anniversaries',
    description: 'Romantic moments to celebrate milestones and cherished memories in intimate settings.',
    features: ['Romantic Setup', 'Special Dining', 'Entertainment', 'Memory Displays'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'social',
    title: 'Social Events',
    description: 'Unforgettable gatherings for friends and family with a focus on atmosphere.',
    features: ['Venue Selection', 'Decor & Design', 'Entertainment', 'Catering'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cultural',
    title: 'Cultural Events',
    description: 'Celebrations that honor traditions and create new memories with vibrant elegance.',
    features: ['Cultural Design', 'Traditional Elements', 'Music & Dance', 'Catering'],
    image: 'https://images.unsplash.com/photo-1540575861501-7c00117f4894?auto=format&fit=crop&q=80&w=800',
  },
];

export const ServicesEnhanced = () => {
  const navigate = useNavigate();

  const handleLearnMore = (serviceId: string) => {
    // Fix: Use the correct routing pattern for TanStack Router with params
    navigate({ 
      to: '/services/$serviceId',
      params: { serviceId }
    });
  };

  return (
    <section className="py-28 px-4 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-[#6B1A1A] mb-6">Our Services</h2>
          <p className="text-lg text-[#4A3728] max-w-2xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we craft experiences tailored to your vision with editorial precision.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Card */}
              <div className="bg-[#F0EDE8] rounded-xl shadow-[0_4px_20px_rgba(107,26,26,0.08)] hover:shadow-[0_8px_30px_rgba(107,26,26,0.12)] transition-all duration-500 overflow-hidden h-full flex flex-col border border-[#6B1A1A]/5">
                {/* Image Section */}
                <div className="h-[200px] w-full overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-[#6B1A1A] mb-3">{service.title}</h3>
                  <p className="text-[#4A3728] mb-6 flex-grow leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="mb-8">
                    <p className="text-[12px] font-semibold text-[#C4A882] uppercase tracking-[0.1em] mb-4">What We Offer:</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-[#9B8878] flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="w-1.5 h-1.5 bg-[#C4A882] rounded-full opacity-60" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <motion.button
                      onClick={() => handleLearnMore(service.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group/btn relative flex items-center justify-center gap-2 px-6 py-4 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.2em] text-[11px] uppercase overflow-hidden transition-all duration-500 hover:bg-[#C4A882]"
                    >
                      <span className="relative z-10">Explore {service.title}</span>
                      <ArrowUpRight size={14} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-[#4A3728] mb-8">
            Don't see what you're looking for? We customize every event to your unique vision.
          </p>
          <motion.button
            onClick={() => navigate({ to: '/contact' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#6B1A1A] text-white rounded-full font-sans tracking-[0.2em] text-[12px] uppercase hover:bg-[#C4A882] transition-all duration-500 shadow-lg"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
