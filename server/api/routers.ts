import { z } from 'zod';
import { router, publicProcedure, protectedProcedure, adminProcedure } from './trpc';
import { galleryImages, inquiries, announcements, contactInfo, users } from '../db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { generateToken, hashPassword, comparePassword } from '../middleware/auth';

// ============= GALLERY ROUTES =============
const galleryRouter = router({
  getPublished: publicProcedure.query(async ({ ctx }) => {
    const images = await ctx.db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isPublished, true))
      .orderBy(galleryImages.displayOrder);
    return images;
  }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const images = await ctx.db
      .select()
      .from(galleryImages)
      .orderBy(galleryImages.displayOrder);
    return images;
  }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().url(),
        imageKey: z.string(),
        eventType: z.enum(['Weddings', 'Corporate Events', 'Birthdays', 'Anniversaries', 'Social Events', 'Cultural Events']),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db.insert(galleryImages).values(input);
      return result;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        eventType: z.enum(['Weddings', 'Corporate Events', 'Birthdays', 'Anniversaries', 'Social Events', 'Cultural Events']).optional(),
        displayOrder: z.number().optional(),
        isPublished: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      await ctx.db.update(galleryImages).set(updateData).where(eq(galleryImages.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(galleryImages).where(eq(galleryImages.id, input.id));
      return { success: true };
    }),
});

// ============= INQUIRIES ROUTES =============
const inquiriesRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        eventType: z.enum(['Weddings', 'Corporate Events', 'Birthdays', 'Anniversaries', 'Social Events', 'Cultural Events']),
        eventDate: z.date().optional(),
        guestCount: z.number().optional(),
        budget: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db.insert(inquiries).values({
        ...input,
        status: 'new',
      });
      // TODO: Send email notification to admin
      return result;
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const allInquiries = await ctx.db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt));
    return allInquiries;
  }),

  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(['new', 'contacted', 'converted', 'archived']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(inquiries).set({ status: input.status }).where(eq(inquiries.id, input.id));
      return { success: true };
    }),
});

// ============= ANNOUNCEMENTS ROUTES =============
const announcementsRouter = router({
  getPublished: publicProcedure.query(async ({ ctx }) => {
    const announcements_data = await ctx.db
      .select()
      .from(announcements)
      .where(eq(announcements.isPublished, true))
      .orderBy(desc(announcements.publishedAt));
    return announcements_data;
  }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const announcements_data = await ctx.db
      .select()
      .from(announcements)
      .orderBy(desc(announcements.createdAt));
    return announcements_data;
  }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        isPublished: z.boolean().default(false),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db.insert(announcements).values(input);
      return result;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        isPublished: z.boolean().optional(),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      await ctx.db.update(announcements).set(updateData).where(eq(announcements.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(announcements).where(eq(announcements.id, input.id));
      return { success: true };
    }),
});

// ============= CONTACT INFO ROUTES =============
const contactRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const contact = await ctx.db.select().from(contactInfo).limit(1);
    return contact[0] || null;
  }),

  update: adminProcedure
    .input(
      z.object({
        businessName: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        socialLinks: z.record(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.select().from(contactInfo).limit(1);
      if (existing.length > 0) {
        await ctx.db.update(contactInfo).set(input).where(eq(contactInfo.id, existing[0].id));
      } else {
        await ctx.db.insert(contactInfo).values({
          businessName: input.businessName || 'Varnana Events',
          ...input,
        });
      }
      return { success: true };
    }),
});

// ============= AUTH ROUTES =============
const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.select().from(users).where(eq(users.email, input.email));
      if (existing.length > 0) {
        throw new Error('Email already registered');
      }

      const passwordHash = await hashPassword(input.password);
      const [result] = await ctx.db.insert(users).values({
        email: input.email,
        passwordHash,
        name: input.name,
        role: 'user',
      });

      const token = generateToken({
        id: result.insertId as number,
        email: input.email,
        role: 'user',
      });

      return { token, user: { email: input.email, name: input.name } };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.select().from(users).where(eq(users.email, input.email));
      if (user.length === 0) {
        throw new Error('Invalid credentials');
      }

      const passwordMatch = await comparePassword(input.password, user[0].passwordHash);
      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });

      return { token, user: { id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role } };
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    const user = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id));
    return user[0] || null;
  }),
});

// ============= MAIN ROUTER =============
export const appRouter = router({
  gallery: galleryRouter,
  inquiries: inquiriesRouter,
  announcements: announcementsRouter,
  contact: contactRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
