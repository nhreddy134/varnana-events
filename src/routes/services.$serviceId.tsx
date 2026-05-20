import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/services/$serviceId')({
  head: ({ params }) => ({
    meta: [
      { title: `${params.serviceId.charAt(0).toUpperCase() + params.serviceId.slice(1)} - Varnana Events` },
      { name: 'description', content: `Explore our ${params.serviceId} event planning services` },
    ],
  }),
  component: ServiceDetail,
});

const serviceDetails: Record<string, any> = {
  weddings: {
    title: 'Wedding Planning',
    emoji: '💍',
    description: 'Your wedding day is one of the most important moments of your life. We handle every detail with precision and care.',
    color: 'from-rose-500 to-pink-600',
    highlights: [
      'Full-day coordination and planning',
      'Vendor selection and negotiation',
      'Ceremony and reception design',
      'Timeline management',
      'Day-of coordination',
      'Guest experience optimization',
    ],
    process: [
      { step: 1, title: 'Initial Consultation', description: 'We meet to understand your vision, style, and requirements' },
      { step: 2, title: 'Planning & Design', description: 'We create a detailed plan and design concept for your wedding' },
      { step: 3, title: 'Vendor Coordination', description: 'We select and coordinate with the best vendors for your event' },
      { step: 4, title: 'Execution', description: 'We bring your vision to life on your special day' },
    ],
    pricing: 'Custom pricing based on guest count and services',
  },
  corporate: {
    title: 'Corporate Event Planning',
    emoji: '🏢',
    description: 'Professional events that leave lasting impressions on your clients, partners, and team members.',
    color: 'from-blue-500 to-cyan-600',
    highlights: [
      'Conference and seminar planning',
      'Product launch coordination',
      'Team building events',
      'Awards ceremonies',
      'Corporate retreats',
      'Networking events',
    ],
    process: [
      { step: 1, title: 'Objectives Meeting', description: 'We understand your corporate goals and target audience' },
      { step: 2, title: 'Proposal Development', description: 'We create a comprehensive proposal with timeline and budget' },
      { step: 3, title: 'Logistics Planning', description: 'We handle all logistics, AV, catering, and venue coordination' },
      { step: 4, title: 'Event Execution', description: 'We ensure flawless execution of your corporate event' },
    ],
    pricing: 'Custom pricing based on event scope and complexity',
  },
  birthdays: {
    title: 'Birthday Celebrations',
    emoji: '🎂',
    description: 'From milestone birthdays to intimate gatherings, we create celebrations that capture the joy of the moment.',
    color: 'from-yellow-500 to-orange-600',
    highlights: [
      'Theme design and decoration',
      'Entertainment coordination',
      'Catering and menu planning',
      'Photography and videography',
      'Cake and dessert selection',
      'Guest activity planning',
    ],
    process: [
      { step: 1, title: 'Vision Discussion', description: 'We discuss your birthday vision and preferences' },
      { step: 2, title: 'Theme Development', description: 'We create a cohesive theme and design concept' },
      { step: 3, title: 'Vendor Coordination', description: 'We coordinate entertainment, catering, and other services' },
      { step: 4, title: 'Celebration Day', description: 'We ensure a memorable and joyful celebration' },
    ],
    pricing: 'Packages starting from $2,000',
  },
  anniversaries: {
    title: 'Anniversary Celebrations',
    emoji: '💝',
    description: 'Celebrate your love story with an intimate and romantic event designed just for you.',
    color: 'from-purple-500 to-pink-600',
    highlights: [
      'Romantic venue selection',
      'Special dining experiences',
      'Entertainment and music',
      'Memory displays and tributes',
      'Photography and videography',
      'Personalized touches',
    ],
    process: [
      { step: 1, title: 'Love Story Consultation', description: 'We learn about your unique love story' },
      { step: 2, title: 'Romantic Design', description: 'We create a romantic and intimate atmosphere' },
      { step: 3, title: 'Experience Curation', description: 'We curate special moments and experiences' },
      { step: 4, title: 'Celebration', description: 'We celebrate your love with a memorable event' },
    ],
    pricing: 'Custom pricing based on preferences',
  },
  social: {
    title: 'Social Events',
    emoji: '🎉',
    description: 'Unforgettable gatherings for friends and family with personalized touches and attention to detail.',
    color: 'from-green-500 to-emerald-600',
    highlights: [
      'Venue selection and booking',
      'Decor and design',
      'Entertainment coordination',
      'Catering and bar service',
      'Guest management',
      'Timeline coordination',
    ],
    process: [
      { step: 1, title: 'Event Planning', description: 'We discuss your event goals and guest list' },
      { step: 2, title: 'Design Concept', description: 'We create a design concept that reflects your style' },
      { step: 3, title: 'Vendor Coordination', description: 'We coordinate all vendors and services' },
      { step: 4, title: 'Event Day', description: 'We manage the event to ensure it runs smoothly' },
    ],
    pricing: 'Custom pricing based on guest count',
  },
  cultural: {
    title: 'Cultural Events',
    emoji: '🎭',
    description: 'Celebrations that honor traditions and create meaningful connections with your community.',
    color: 'from-indigo-500 to-purple-600',
    highlights: [
      'Cultural design and aesthetics',
      'Traditional element integration',
      'Music and dance coordination',
      'Catering with cultural cuisine',
      'Ceremony coordination',
      'Community engagement',
    ],
    process: [
      { step: 1, title: 'Cultural Consultation', description: 'We understand your cultural traditions and preferences' },
      { step: 2, title: 'Design Development', description: 'We create a design that honors your culture' },
      { step: 3, title: 'Vendor Selection', description: 'We select vendors experienced in cultural events' },
      { step: 4, title: 'Celebration', description: 'We create a meaningful cultural celebration' },
    ],
    pricing: 'Custom pricing based on event scope',
  },
};

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = Route.useParams();
  const service = serviceDetails[serviceId] || serviceDetails.weddings;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate({ to: '/' })}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-burgundy hover:text-burgundy/80 font-semibold"
          >
            <ArrowLeft size={20} />
            Back
          </motion.button>
          <h1 className="text-2xl font-display text-burgundy">{service.title}</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className={`bg-gradient-to-br ${service.color} py-20 px-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="text-8xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {service.emoji}
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-display text-white mb-4">{service.title}</h2>
          <p className="text-xl text-white/90">{service.description}</p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Highlights */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display text-burgundy mb-8">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CheckCircle className="text-gold flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display text-burgundy mb-8">Our Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.process.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Connector line */}
                {index < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-gold to-transparent" />
                )}

                {/* Step card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-burgundy rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-burgundy mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section
          className="bg-white rounded-lg shadow-lg p-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display text-burgundy mb-4">Pricing</h3>
          <p className="text-lg text-gray-700 mb-6">{service.pricing}</p>
          <motion.button
            onClick={() => navigate({ to: '/contact', search: { service: serviceId } })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 bg-gradient-to-r ${service.color} text-white rounded-lg font-semibold hover:shadow-lg transition`}
          >
            Request a Quote
          </motion.button>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display text-burgundy mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-gray-600 mb-8">Let's discuss how we can make your event unforgettable.</p>
          <motion.button
            onClick={() => navigate({ to: '/contact', search: { service: serviceId } })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-burgundy text-ivory rounded-lg font-semibold hover:bg-burgundy/90 transition"
          >
            Get in Touch
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
