# 🎨 UI Reference Guide

## Design Analysis of Noise (platform.getnoise.com)

This document captures the design patterns, UI components, and visual language used by Noise to guide our crypto adaptation.

---

## Overall Design Philosophy

### Noise's Approach
- **Dark theme** with vibrant accent colors
- **Video-forward** - content showcases prominently
- **Stats-driven** - big numbers front and center
- **Social proof** - brand logos and creator success stories
- **Clean and modern** - minimal clutter, clear hierarchy

### Adapting for Crypto
- Keep dark theme (fits crypto aesthetic)
- Add subtle "crypto" visual cues (gradients, glows)
- Emphasize metrics that crypto projects care about
- Include Web3-native elements (wallet icons, chain logos)

---

## Color Palette

### Noise Colors (Observed)
```css
/* Background */
--bg-primary: #0a0a0a;      /* Near black */
--bg-secondary: #111111;    /* Dark gray cards */
--bg-tertiary: #1a1a1a;     /* Hover states */

/* Text */
--text-primary: #ffffff;    /* White */
--text-secondary: #a0a0a0;  /* Gray */
--text-muted: #666666;      /* Darker gray */

/* Accent */
--accent-primary: #ff6b35;   /* Orange (their brand) */
--accent-secondary: #00d4aa; /* Teal/green for success */

/* Borders */
--border-color: #2a2a2a;    /* Subtle borders */
```

### Crypto Adaptation
```css
/* Keep dark base */
--bg-primary: #09090b;      /* Zinc-950 */
--bg-secondary: #18181b;    /* Zinc-900 */
--bg-tertiary: #27272a;     /* Zinc-800 */

/* Crypto-inspired accents */
--accent-primary: #3b82f6;   /* Blue (trust, tech) */
--accent-secondary: #10b981; /* Green (money, success) */
--accent-tertiary: #8b5cf6;  /* Purple (Web3 vibes) */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #3b82f6, #8b5cf6);
--gradient-success: linear-gradient(135deg, #10b981, #3b82f6);
```

---

## Typography

### Noise Typography
- **Headlines**: Bold, clean sans-serif
- **Body**: Regular weight, good line height
- **Numbers/Stats**: Extra bold, often larger

### Recommended Fonts
```css
/* Primary - Clean and modern */
font-family: 'Inter', -apple-system, sans-serif;

/* Alternative - More techy feel */
font-family: 'Space Grotesk', sans-serif;

/* Monospace for numbers/stats */
font-family: 'JetBrains Mono', monospace;
```

### Scale (Tailwind)
```
text-xs: 12px   - Labels, captions
text-sm: 14px   - Secondary text
text-base: 16px - Body text
text-lg: 18px   - Card titles
text-xl: 20px   - Section headers
text-2xl: 24px  - Page titles
text-4xl: 36px  - Hero stats
text-6xl: 60px  - Big numbers
```

---

## Landing Page Components

### 1. Hero Section

**Noise Pattern:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│    [Logo]                    [Nav Links]    [Login] [CTA]  │
│                                                            │
│         Make your brand go                                 │
│              mega viral                                    │
│                                                            │
│    Achieve explosive growth with an army of                │
│         pay-as-you-go UGC creators!                        │
│                                                            │
│         [Get Started]  [Contact Us]                        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Bold headline with gradient or highlight effect
- Subheadline explaining value prop
- Two CTAs (primary + secondary)
- No background image (dark solid)

### 2. Stats Bar

**Noise Pattern:**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   2.5B       │    30M       │   $200M      │   $0.60      │
│   views      │  conversions │  LTV unlocked│  avg CPA     │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Implementation:**
```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  <StatCard value="2.5B" label="views and counting" />
  <StatCard value="30M" label="conversions driven" />
  <StatCard value="$200M" label="in LTV unlocked" />
  <StatCard value="$0.60" label="average CPA" />
</div>
```

### 3. Video Showcase Carousel

**Noise Pattern:**
- Horizontal scrolling carousel
- Video cards with brand logo overlay
- View count badge
- Auto-play on hover

```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│  Video  │ │  Video  │ │  Video  │ │  Video  │
│   📱    │ │   📱    │ │   📱    │ │   📱    │
│ [Logo]  │ │ [Logo]  │ │ [Logo]  │ │ [Logo]  │
│ 6.1M    │ │ 50.1M   │ │ 1.7M    │ │ 2.6M    │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
    ←──────────────────────────────────→
```

### 4. Feature Grid

**Noise Pattern:**
```
┌─────────────────┬─────────────────┬─────────────────┐
│    [Icon]       │    [Icon]       │    [Icon]       │
│  Testimonials   │ Text over video │  Hook + Demo    │
│  description    │  description    │  description    │
├─────────────────┼─────────────────┼─────────────────┤
│    [Icon]       │    [Icon]       │                 │
│  Slideshows     │ ...anything     │                 │
│  description    │  else!          │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

### 5. Brand Logos Marquee

**Noise Pattern:**
- Infinite horizontal scroll
- Grayscale logos (white on dark)
- "You're in good company..." header

```jsx
<div className="overflow-hidden">
  <div className="flex animate-marquee">
    {brands.map(brand => (
      <img src={brand.logo} className="h-8 mx-8 opacity-60" />
    ))}
  </div>
</div>
```

### 6. Two-Column Feature Sections

**Noise Pattern:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CREATE                                                    │
│   ──────                                                    │
│   High quality content                                      │
│   with no excuses.                   ┌─────────────────┐   │
│                                      │                 │   │
│   • 100% US/UK/CA/AU creators       │   [Animation/   │   │
│   • Realtime analytics              │    Video]       │   │
│   • View verification               │                 │   │
│                                      └─────────────────┘   │
│   [Get Started]                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7. FAQ Accordion

**Noise Pattern:**
- Simple accordion with + / - icons
- Clean borders between items
- Smooth expand/collapse animation

---

## Dashboard Components

### Brand Dashboard

**Navigation:**
```
┌────────────────────────────────────────────────────────────┐
│ [Logo]                                      [User] [Logout]│
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📊 Dashboard                                              │
│  📢 Campaigns                                              │
│  📈 Analytics                                              │
│  💰 Billing                                                │
│  ⚙️  Settings                                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Campaign Card:**
```
┌────────────────────────────────────────────────────────────┐
│  [Brand Logo]                                              │
│                                                            │
│  Campaign Title                           [Status: Active] │
│  Short description here...                                 │
│                                                            │
│  ┌─────────┬─────────┬─────────┬─────────┐               │
│  │ 1.2M    │ 15K     │ $1,234  │ 45      │               │
│  │ views   │ convs   │ spent   │ creators│               │
│  └─────────┴─────────┴─────────┴─────────┘               │
│                                                            │
│  [View Details]                      [Pause] [Edit]       │
└────────────────────────────────────────────────────────────┘
```

### Creator Dashboard

**Earnings Card:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│     💰 Your Earnings                                       │
│                                                            │
│        $1,234.56                                          │
│        Available Balance                                   │
│                                                            │
│     ┌────────────────┐  ┌────────────────┐               │
│     │    $567.89     │  │   $4,321.00    │               │
│     │    Pending     │  │   Total Earned │               │
│     └────────────────┘  └────────────────┘               │
│                                                            │
│                              [Withdraw]                    │
└────────────────────────────────────────────────────────────┘
```

**Campaign Browse Card:**
```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────┐                                             │
│  │  Brand   │  Brand Name                                 │
│  │   Logo   │  Campaign Title                             │
│  └──────────┘                                             │
│                                                            │
│  💵 $2.00 per 1K views                                    │
│  📱 TikTok, YouTube, Instagram                            │
│  🎬 Testimonial                                           │
│                                                            │
│  [View Campaign]                          [Join Campaign] │
└────────────────────────────────────────────────────────────┘
```

---

## Component Library (shadcn/ui customizations)

### Button Variants

```jsx
// Primary - Gradient background
<Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
  Get Started
</Button>

// Secondary - Outline
<Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
  Contact Us
</Button>

// Ghost - No background
<Button variant="ghost" className="hover:bg-zinc-800">
  Learn More
</Button>

// Success - Green
<Button className="bg-emerald-500 hover:bg-emerald-600">
  Withdraw Funds
</Button>
```

### Card Styles

```jsx
// Standard card
<Card className="bg-zinc-900 border-zinc-800">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Highlight card (for important stats)
<Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700">
  ...
</Card>

// Interactive card (campaigns, etc.)
<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer">
  ...
</Card>
```

### Input Styles

```jsx
<Input 
  className="bg-zinc-900 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
  placeholder="Search campaigns..."
/>

<Select>
  <SelectTrigger className="bg-zinc-900 border-zinc-700">
    <SelectValue placeholder="Select platform" />
  </SelectTrigger>
  <SelectContent className="bg-zinc-900 border-zinc-700">
    <SelectItem value="tiktok">TikTok</SelectItem>
    <SelectItem value="youtube">YouTube</SelectItem>
  </SelectContent>
</Select>
```

### Badge Variants

```jsx
// Status badges
<Badge className="bg-emerald-500/10 text-emerald-400">Active</Badge>
<Badge className="bg-yellow-500/10 text-yellow-400">Pending</Badge>
<Badge className="bg-red-500/10 text-red-400">Rejected</Badge>
<Badge className="bg-zinc-500/10 text-zinc-400">Draft</Badge>

// Platform badges
<Badge className="bg-black text-white">TikTok</Badge>
<Badge className="bg-red-600 text-white">YouTube</Badge>
<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Instagram</Badge>
<Badge className="bg-sky-500 text-white">Twitter</Badge>
```

---

## Animation Patterns

### Page Transitions
```jsx
// Framer Motion page wrapper
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### Card Hover Effects
```jsx
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <Card>...</Card>
</motion.div>
```

### Number Counting Animation
```jsx
// Use react-countup or framer-motion
import { useSpring, animated } from '@react-spring/web';

function AnimatedNumber({ value }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  
  return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>;
}
```

### Marquee Animation
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

---

## Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Layout Patterns

```jsx
// Stats grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  
// Campaign grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Dashboard layout
<div className="flex">
  <aside className="hidden md:block w-64">...</aside>
  <main className="flex-1">...</main>
</div>
```

---

## Icons (Lucide React)

```jsx
import { 
  Play, Pause, Eye, DollarSign, Users, TrendingUp,
  Video, Image, MessageSquare, Zap, Award, Shield,
  Wallet, CreditCard, Bell, Settings, LogOut,
  ChevronRight, Plus, Search, Filter, Download
} from 'lucide-react';
```

---

## Dark Mode CSS Variables (Tailwind)

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... etc
      },
    },
  },
}
```

```css
/* globals.css */
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 0 0% 98%;
  /* ... etc */
}
```
