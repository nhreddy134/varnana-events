# Varnana Events - Scroll Animations Implementation

## Overview

This document describes the cinematic scroll-driven animation system implemented for the Varnana Events website. The system includes a full-screen pinned scroll section, global scroll effects, and a rebuilt splash screen.

## Components

### 1. StoryUnfolds (Desktop)
**File:** `src/components/site/StoryUnfolds.tsx`

A cinematic scroll-driven narrative section that pins to the viewport while the user scrolls through 5 narrative moments. Each moment is driven purely by scroll position using Framer Motion's `useScroll` and `useTransform`.

#### Technical Implementation:
- **Height:** 500vh (500% of viewport height)
- **Position:** Sticky with full-screen viewport pinning
- **Scroll Mapping:** Divides scroll progress into 5 equal segments (0–0.2, 0.2–0.4, etc.)
- **Animation Driver:** `useScroll` + `useTransform` for scroll-linked animations

#### The 5 Narrative Moments:

**Moment 1 (0–20% scroll):**
- Deep burgundy (#3D0F0F) background
- Tulip SVG draws itself using `pathLength` animation
- Text fades in: "Every event begins with a single thought."
- Particles drift upward

**Moment 2 (20–40% scroll):**
- Background transitions from burgundy → ivory
- Tulip petals scale outward (bloom effect)
- Text morphs: "A feeling you can't quite name yet."
- Gold horizontal line draws left to right

**Moment 3 (40–60% scroll):**
- Ivory background
- 3×3 grid of cards assembles from random positions
- Cards snap into place as scroll progresses
- Text: "We find it. We shape it. We make it real."

**Moment 4 (60–80% scroll):**
- Cards collapse and single large card expands
- Varnana "V" logo centered with glow effect
- Background pulses between burgundy and black
- Text: "Then we build something that lasts forever."

**Moment 5 (80–100% scroll):**
- Fades to ivory
- Headline reveals word by word: "This is what we do."
- CTAs animate in with spring physics
- Smooth transition to next section

### 2. StoryUnfoldsMobile (Mobile)
**File:** `src/components/site/StoryUnfoldsMobile.tsx`

Simplified version of StoryUnfolds optimized for mobile devices. Reduces animation complexity and uses a shorter scroll height (350vh instead of 500vh) for better performance on smaller screens.

#### Optimizations:
- Fewer particles and visual effects
- Simplified grid (2×2 instead of 3×3)
- Reduced card count
- Smaller text sizes
- Shorter scroll container height

### 3. StoryUnfoldsResponsive
**File:** `src/components/site/StoryUnfoldsResponsive.tsx`

Wrapper component that automatically switches between desktop and mobile versions based on viewport width (breakpoint: 768px).

### 4. ScrollEffects
**File:** `src/components/site/ScrollEffects.tsx`

Collection of reusable scroll-driven animation utilities:

#### ParallaxSection
Creates parallax effect on backgrounds. Elements move at 0.5x scroll speed.

```tsx
<ParallaxSection className="bg-ivory py-20">
  {/* Content moves slower than scroll */}
</ParallaxSection>
```

#### HorizontalMarquee
Horizontally scrolling text marquee that moves as user scrolls vertically. Features large Cormorant Garamond italic text in burgundy on ivory background.

```tsx
<HorizontalMarquee />
```

#### TextReveal
Word-by-word text reveal animation as section enters viewport. Words slide up into view with staggered timing.

```tsx
<TextReveal 
  text="Your headline text here"
  className="font-display text-4xl"
/>
```

#### ScaleOnScroll
Image or element gently scales from 1.0 to 1.06 as it passes through viewport center, then back to 1.0.

```tsx
<ScaleOnScroll className="rounded-lg overflow-hidden">
  <img src="..." />
</ScaleOnScroll>
```

#### ProgressIndicator
Thin vertical burgundy line on right edge of screen that grows from top to bottom as user scrolls. Gold dot travels along it.

```tsx
<ProgressIndicator />
```

### 5. Rebuilt SplashScreen
**File:** `src/components/site/SplashScreen.tsx`

Complete redesign of the splash screen with enhanced animations and session storage.

#### Timeline:
- **0–0.4s:** Blank ivory screen
- **0.4–1.2s:** Gold circle draws itself + "V" appears with spring animation
- **1.2–2.2s:** Circle expands and dissolves outward
- **1.2–2.2s:** "VARNANA" letters drop from above (staggered 0.07s)
- **1.2–2.2s:** "EVENTS" letters rise from below (staggered 0.05s)
- **2.2–3.0s:** Botanical SVG details (leaves, tulips) grow outward
- **3.0–3.6s:** Logo breathes (scale 1→1.03→1)
- **3.6–5.0s:** Fade out while homepage cross-fades in
- **Total:** ~5 seconds

#### Features:
- Session storage: Only plays once per session
- SVG stroke animation for circle drawing
- Spring physics for letter animations
- Botanical details with scale animations
- Breathing pulse effect on logo

## Integration

### Adding to Homepage
The StoryUnfolds component is already integrated into the homepage (`src/routes/index.tsx`):

```tsx
<Hero />
<StoryUnfoldsResponsive />
<CategoriesStrip />
```

### Adding ProgressIndicator
The progress indicator is added to the root layout (`src/routes/__root.tsx`):

```tsx
<ProgressIndicator />
<Navbar />
<main>
  <Outlet />
</main>
```

## Performance Considerations

### Desktop Optimization:
- Uses `useScroll` with `offset` prop for efficient scroll tracking
- `useTransform` creates derived motion values without re-renders
- SVG animations use `pathLength` for efficient drawing
- Lazy loading of 3D components with Suspense

### Mobile Optimization:
- Simplified component tree
- Fewer particles and visual effects
- Reduced animation complexity
- Shorter scroll container height (350vh vs 500vh)
- Automatic responsive switching at 768px breakpoint

### Best Practices:
1. All scroll animations use `useTransform` (not `useMotionTemplate`)
2. No expensive DOM mutations during scroll
3. CSS transforms used for animations (GPU-accelerated)
4. Lazy loading of heavy components
5. Session storage prevents splash screen on repeat visits

## Customization

### Colors
All brand colors are defined in `src/styles.css`:
- Burgundy: `#6B1A1A` (oklch(0.34 0.12 25))
- Deep Burgundy: `#3D0F0F` (oklch(0.22 0.09 25))
- Gold: `#C4A882` (oklch(0.74 0.06 75))
- Ivory: `#F0EDE8` (oklch(0.95 0.012 80))

### Fonts
- Display: Cormorant Garamond (serif)
- Body: Manrope (sans-serif)

### Timing
Adjust scroll segment boundaries in `StoryUnfolds.tsx`:
```tsx
const moment1Progress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
// Change [0, 0.2] to adjust segment size
```

### Text Content
Update moment text in each Moment component function.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Simplified version with reduced complexity

## Dependencies

- `framer-motion`: ^12.38.0 (scroll animations)
- `react`: ^19.2.0
- `tailwindcss`: ^4.2.1 (styling)

## Files Modified/Created

### New Files:
- `src/components/site/StoryUnfolds.tsx`
- `src/components/site/StoryUnfoldsMobile.tsx`
- `src/components/site/StoryUnfoldsResponsive.tsx`
- `src/components/site/ScrollEffects.tsx`

### Modified Files:
- `src/components/site/SplashScreen.tsx` (rebuilt)
- `src/routes/index.tsx` (integrated components)
- `src/routes/__root.tsx` (added ProgressIndicator)

## Testing Checklist

- [ ] Scroll through entire page on desktop
- [ ] Verify StoryUnfolds section animates correctly
- [ ] Check ProgressIndicator moves with scroll
- [ ] Test HorizontalMarquee scrolls horizontally
- [ ] Verify TextReveal animates on section entry
- [ ] Test ScaleOnScroll on images
- [ ] View splash screen on first visit
- [ ] Verify splash screen doesn't show on refresh
- [ ] Test on mobile (iPad, iPhone)
- [ ] Test on various screen sizes
- [ ] Check performance in DevTools
- [ ] Verify all animations are smooth (60fps)

## Troubleshooting

### Animations not triggering:
- Ensure component is within viewport
- Check `offset` prop in `useScroll`
- Verify `useTransform` input/output ranges

### Performance issues:
- Reduce particle count in Moment1
- Disable animations on mobile if needed
- Check for layout thrashing in DevTools

### Splash screen not showing:
- Clear sessionStorage: `sessionStorage.removeItem('varnana_splash_seen')`
- Check browser console for errors
- Verify `mounted` state is true

## Future Enhancements

- [ ] Add sound effects to scroll moments
- [ ] Implement canvas-based particle system for better performance
- [ ] Add gesture support for touch devices
- [ ] Create alternative animation themes
- [ ] Add analytics tracking for user engagement
- [ ] Implement scroll-jacking prevention
