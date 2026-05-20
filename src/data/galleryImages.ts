export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  eventType: string;
  displayOrder: number;
}

export const productionGalleryImages: GalleryImage[] = [
  // Weddings
  {
    id: 1,
    title: 'Elegant Wedding Reception',
    description: 'A luxurious wedding reception with elegant table settings and ambient lighting',
    imageUrl: 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Romantic Wedding Ceremony',
    description: 'Beautiful outdoor wedding ceremony with floral arch and romantic ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'Wedding Reception Hall',
    description: 'Grand wedding reception hall with elegant chandeliers and sophisticated decor',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-dc8997617b93?w=1200&q=80',
    eventType: 'Weddings',
    displayOrder: 3,
  },

  // Corporate Events
  {
    id: 4,
    title: 'Corporate Gala Evening',
    description: 'Professional corporate gala with elegant table arrangements and ambient lighting',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    eventType: 'Corporate Events',
    displayOrder: 4,
  },
  {
    id: 5,
    title: 'Business Conference Setup',
    description: 'Professional conference setup with modern staging and AV equipment',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    eventType: 'Corporate Events',
    displayOrder: 5,
  },
  {
    id: 6,
    title: 'Executive Networking Event',
    description: 'Upscale networking event with premium catering and sophisticated ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80',
    eventType: 'Corporate Events',
    displayOrder: 6,
  },

  // Birthdays
  {
    id: 7,
    title: 'Colorful Birthday Celebration',
    description: 'Vibrant birthday party with colorful balloon decorations and festive setup',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80',
    eventType: 'Birthdays',
    displayOrder: 7,
  },
  {
    id: 8,
    title: 'Birthday Party Decor',
    description: 'Creative birthday party with themed decorations and entertainment setup',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    eventType: 'Birthdays',
    displayOrder: 8,
  },
  {
    id: 9,
    title: 'Milestone Birthday Celebration',
    description: 'Special milestone birthday celebration with elegant decorations and cake display',
    imageUrl: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200&q=80',
    eventType: 'Birthdays',
    displayOrder: 9,
  },

  // Anniversaries
  {
    id: 10,
    title: 'Romantic Anniversary Dinner',
    description: 'Intimate anniversary celebration with romantic table setting and candlelight',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1200&q=80',
    eventType: 'Anniversaries',
    displayOrder: 10,
  },
  {
    id: 11,
    title: 'Anniversary Celebration Setup',
    description: 'Elegant anniversary celebration with rose petals and romantic ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-dc8997617b93?w=1200&q=80',
    eventType: 'Anniversaries',
    displayOrder: 11,
  },
  {
    id: 12,
    title: 'Golden Anniversary Party',
    description: 'Special golden anniversary celebration with elegant gold and white decor',
    imageUrl: 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80',
    eventType: 'Anniversaries',
    displayOrder: 12,
  },

  // Social Events
  {
    id: 13,
    title: 'Family Gathering',
    description: 'Warm family gathering with outdoor setup and casual elegance',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    eventType: 'Social Events',
    displayOrder: 13,
  },
  {
    id: 14,
    title: 'Friends Celebration',
    description: 'Joyful friends gathering with festive decorations and entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    eventType: 'Social Events',
    displayOrder: 14,
  },
  {
    id: 15,
    title: 'Social Dinner Party',
    description: 'Elegant social dinner party with refined table settings and ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80',
    eventType: 'Social Events',
    displayOrder: 15,
  },

  // Cultural Events
  {
    id: 16,
    title: 'Traditional Festival Celebration',
    description: 'Vibrant traditional festival with cultural decorations and authentic setup',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80',
    eventType: 'Cultural Events',
    displayOrder: 16,
  },
  {
    id: 17,
    title: 'Cultural Ceremony',
    description: 'Beautiful cultural ceremony with traditional elements and decorations',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    eventType: 'Cultural Events',
    displayOrder: 17,
  },
  {
    id: 18,
    title: 'Heritage Celebration',
    description: 'Heritage celebration honoring traditions with cultural aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    eventType: 'Cultural Events',
    displayOrder: 18,
  },
];
