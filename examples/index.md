# Example Components

This directory contains production-ready example components for building CryptoNoise.

## Available Components

### UI Components (`/components`)

- **StatsCard.tsx** - Animated stats display with trending indicators
- **CampaignCard.tsx** - Campaign discovery card with brand info and stats
- **HeroSection.tsx** - Landing page hero with animations

### Campaign Builder (`/campaign-builder`)

- **CampaignWizard.tsx** - 5-step multi-step campaign creation form

## Component Previews

### StatsCard

Displays key metrics with:
- Animated counters
- Trend indicators (up/down arrows)
- Multiple formats: currency, percentage, compact numbers
- Customizable icons and colors

### CampaignCard

Campaign discovery card featuring:
- Brand logo and name
- Rate per 1K views
- Total views and active creators
- Platform tags (TikTok, YouTube, etc.)
- Content type badges
- Call-to-action buttons

### CampaignWizard

Multi-step form with:
1. Campaign basics (name, description)
2. Content type selection
3. Platform selection
4. Budget and rate configuration
5. Review and publish

## Tech Stack

All components are built with:
- React 18 + TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide React for icons
