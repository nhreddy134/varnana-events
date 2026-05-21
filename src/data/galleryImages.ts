export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  eventType: string;
  displayOrder: number;
}

export const productionGalleryImages: GalleryImage[] = [
  // Weddings (Indian Vibe in America)
  {
    id: 1,
    title: 'Modern Mandap in NYC',
    description: 'A fusion of traditional Indian mandap design with a sleek Manhattan skyline backdrop.',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'The Grand Baraat',
    description: 'A vibrant Baraat procession through the streets of downtown Chicago.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'Editorial Henna Night',
    description: 'An intimate Mehendi celebration in a California vineyard, blending rustic and royal.',
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 3,
  },

  // Corporate Events
  {
    id: 4,
    title: 'Global Tech Gala',
    description: 'A high-end corporate gala for a Silicon Valley tech giant with subtle Indian accents.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    eventType: 'Corporate Events',
    displayOrder: 4,
  },
  {
    id: 5,
    title: 'Executive Diwali Dinner',
    description: 'A sophisticated Diwali dinner for executives in a luxury DC hotel.',
    imageUrl: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1200&q=80',
    eventType: 'Corporate Events',
    displayOrder: 5,
  },

  // Birthdays
  {
    id: 7,
    title: 'Royal First Birthday',
    description: 'A prince-themed first birthday celebration with a touch of Jaipur royalty.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    eventType: 'Birthdays',
    displayOrder: 7,
  },
  {
    id: 8,
    title: 'Sweet Sixteen Soiree',
    description: 'A modern, chic Sweet Sixteen with vibrant colors and editorial styling.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    eventType: 'Birthdays',
    displayOrder: 8,
  },

  // Cultural Events
  {
    id: 16,
    title: 'Holi in the Hamptons',
    description: 'A luxury Holi celebration blending traditional colors with a coastal aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80',
    eventType: 'Cultural Events',
    displayOrder: 16,
  },
  {
    id: 17,
    title: 'Ganesh Chaturthi Gala',
    description: 'A community celebration in a grand Texas ballroom with traditional decor.',
    imageUrl: 'https://images.unsplash.com/photo-1567591974574-e85263d493ad?w=1200&q=80',
    eventType: 'Cultural Events',
    displayOrder: 17,
  },
];
