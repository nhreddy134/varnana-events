import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { Heart, Users, Briefcase, Cake, Gift, Music, ArrowUpRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Timeless celebrations of love with meticulous attention to detail',
    icon: <Heart className="w-12 h-12" />,
    color: 'from-rose-500 to-pink-600',
    features: ['Ceremony Planning', 'Reception Design', 'Vendor Coordination', 'Day-of Coordination'],
    image: '💍',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Professional gatherings that inspire and engage your team',
    icon: <Briefcase className="w-12 h-12" />,
    color: 'from-blue-500 to-cyan-600',
    features: ['Conference Planning', 'Product Launches', 'Team Building', 'Awards Ceremonies'],
    image: '🏢',
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    description: 'Personalized celebrations that capture the essence of the moment',
    icon: <Cake className="w-12 h-12" />,
    color: 'from-yellow-500 to-orange-600',
    features: ['Theme Design', 'Entertainment', 'Catering', 'Photography'],
    image: '🎂',
  },
  {
    id: 'anniversaries',
    title: 'Anniversaries',
    description: 'Romantic moments to celebrate milestones and cherished memories',
    icon: <Gift className="w-12 h-12" />,
    color: 'from-purple-500 to-pink-600',
    features: ['Romantic Setup', 'Special Dining', 'Entertainment', 'Memory Displays'],
    image: '💝',
  },
  {
    id: 'social',
    title: 'Social Events',
    description: 'Unforgettable gatherings for friends and family',
    icon: <Users className="w-12 h-12" />,
    color: 'from-green-500 to-emerald-600',
    features: ['Venue Selection', 'Decor & Design', 'Entertainment', 'Catering'],
    image: '🎉',
  },
  {
    id: 'cultural',
    title: 'Cultural Events',
    description: 'Celebrations that honor traditions and create new memories',
    icon: <Music className="w-12 h-12" />,
    color: 'from-indigo-500 to-purple-600',
    features: ['Cultural Design', 'Traditional Elements', 'Music & Dance', 'Catering'],
    image: '🎭',
  },
];

export const ServicesEnhanced = () => {
  const navigate = useNavigate();

  const handleLearnMore = (serviceId: string) => {
    navigate({ to: `/services/${serviceId}` });
  };

  const handleInquiry = (serviceId: string) => {
    navigate({ to: '/contact', search: { service: serviceId } });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-ivory to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display text-burgundy mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we craft experiences tailored to your vision
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Image/Icon Section */}
                <div className={`bg-gradient-to-br ${service.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white to-transparent" />
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="text-white relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="text-6xl">{service.image}</div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-burgundy mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">What We Offer:</p>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-gray-600 flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto">
                    <motion.button
                      onClick={() => handleLearnMore(service.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group/btn relative flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-ivory rounded-full font-display tracking-[0.2em] text-[11px] uppercase overflow-hidden transition-all duration-500"
                    >
                      <span className="relative z-10">Explore {service.title}</span>
                      <ArrowUpRight size={14} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                      <motion.div 
                        className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Don't see what you're looking for? We customize every event to your unique vision.
          </p>
          <motion.button
            onClick={() => navigate({ to: '/contact' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-burgundy text-ivory rounded-lg font-semibold hover:bg-burgundy/90 transition"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
