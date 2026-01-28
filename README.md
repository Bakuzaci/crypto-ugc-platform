# 🚀 CryptoNoise - Crypto UGC Creator Platform

## Overview

CryptoNoise is a two-sided marketplace connecting crypto/Web3 projects with UGC (User-Generated Content) creators. Brands create campaigns, creators make content, and everyone gets paid based on performance.

**Inspired by:** [Noise/GetNoise](https://platform.getnoise.com/) - a successful UGC platform for consumer apps.

---

## 📋 Claude Code Master Prompt

Copy and paste this prompt into Claude Code to begin building:

```
## Project: CryptoNoise - Crypto UGC Creator Platform

### What We're Building
A two-sided marketplace connecting crypto/Web3 projects (brands) with content creators. Think "Noise.com but for crypto" - brands create campaigns with templates, creators make short-form video content, post on social media, and earn based on views/conversions.

### Reference Platform
Original inspiration: https://platform.getnoise.com/
- See /docs/UI_REFERENCE.md for design patterns to follow
- See /docs/FEATURES.md for complete feature breakdown
- See /docs/TECHNICAL_SPEC.md for architecture details
- See /docs/DATABASE_SCHEMA.md for data model

### Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, PostgreSQL, Storage, Edge Functions)
- **Payments:** Stripe (fiat) + Circle/USDC (crypto) - start with Stripe
- **Analytics:** PostHog (self-hosted or cloud)
- **Deployment:** Vercel (frontend) + Supabase (backend)

### Project Structure
```
cryptonoise/
├── apps/
│   ├── web/                 # Next.js brand dashboard
│   └── creator/             # Next.js creator portal (or React Native later)
├── packages/
│   ├── ui/                  # Shared shadcn components
│   ├── db/                  # Supabase client + types
│   └── utils/               # Shared utilities
├── supabase/
│   ├── migrations/          # SQL migrations
│   └── functions/           # Edge functions
└── docs/                    # Documentation
```

### Core User Flows

**Brand Flow:**
1. Sign up → Complete KYB (business verification)
2. Create campaign → Set budget, rates, content templates
3. Monitor → View analytics, content submissions, spend
4. Payout → Platform handles creator payments

**Creator Flow:**
1. Sign up → Link social accounts (Twitter, TikTok, YouTube, Instagram)
2. Browse campaigns → Filter by niche, payout, requirements
3. Create content → Follow template, record/edit video
4. Submit → Upload proof of post with social link
5. Earn → Track views, get paid per 1K views or per conversion

### MVP Features (Phase 1)

1. **Auth & Onboarding**
   - Supabase Auth with email/password + OAuth (Google, Twitter)
   - Role selection: Brand or Creator
   - Brand: Company info, payment method
   - Creator: Social account linking, payout wallet/bank

2. **Campaign Management (Brand)**
   - Campaign creation wizard
   - Content type selection (testimonial, demo, slideshow, etc.)
   - Template builder (text prompts, example videos, brand assets)
   - Budget settings (total budget, rate per 1K views)
   - Campaign status (draft, active, paused, completed)

3. **Campaign Discovery (Creator)**
   - Browse active campaigns
   - Filter by: category, payout rate, content type
   - Campaign detail view with requirements
   - "Join Campaign" flow

4. **Content Submission**
   - Upload proof of post (screenshot + link)
   - Social platform selection
   - Unique tracking link/code generation
   - Submission status (pending review, approved, rejected)

5. **View Verification**
   - Manual verification initially (admin reviews)
   - Social API integration where possible
   - View count tracking over time
   - Fraud detection basics

6. **Payments**
   - Creator earnings dashboard
   - Withdrawal requests
   - Brand billing (prepaid balance or pay-as-you-go)
   - Platform fee deduction (20-30%)

7. **Analytics**
   - Brand: Views, conversions, spend, top creators
   - Creator: Earnings, performance by campaign

### Design Guidelines
- Dark theme primary (crypto aesthetic)
- Accent colors: Electric blue (#3B82F6), Neon green (#10B981)
- Clean, modern UI following shadcn patterns
- Mobile-first responsive design
- Smooth animations with Framer Motion

### Database Schema
See /docs/DATABASE_SCHEMA.md for complete schema, but key tables:
- users (with role: brand | creator | admin)
- brands (company details, billing)
- creators (social accounts, payout info)
- campaigns (brand's campaigns)
- campaign_templates (content templates)
- submissions (creator content submissions)
- view_counts (tracked views over time)
- transactions (payments, withdrawals)

### API Routes Needed
```
/api/auth/*              - Supabase handles
/api/campaigns           - CRUD campaigns
/api/campaigns/[id]/join - Creator joins campaign
/api/submissions         - Submit/list content
/api/submissions/[id]/verify - Admin verify submission
/api/analytics/brand     - Brand analytics
/api/analytics/creator   - Creator analytics
/api/payments/withdraw   - Creator withdrawal
/api/payments/deposit    - Brand deposit
```

### Getting Started
1. Initialize monorepo with Turborepo
2. Set up Supabase project + run migrations
3. Build auth flow with role selection
4. Create brand dashboard with campaign builder
5. Create creator portal with campaign browser
6. Add submission and verification flow
7. Implement payment system
8. Add analytics dashboards

### Key Considerations
- **Fraud Prevention:** Bot detection, view verification, creator vetting
- **Compliance:** Terms of service, content guidelines, crypto regulations
- **Scalability:** Start simple, optimize as needed
- **UX:** Make it dead simple for creators to participate

Let's start by initializing the project structure and setting up the basic auth flow.
```

---

## 📁 Documentation Structure

```
docs/
├── FEATURES.md          # Complete feature breakdown
├── TECHNICAL_SPEC.md    # Architecture & technical details
├── DATABASE_SCHEMA.md   # Full database schema
├── UI_REFERENCE.md      # Design patterns from Noise
├── API_SPEC.md          # API endpoints specification
└── ROADMAP.md           # Development phases

examples/
├── campaign-builder/    # Campaign builder component examples
├── creator-dashboard/   # Creator dashboard examples
└── components/          # Reusable UI components
```

---

## 🎯 Quick Start

1. **Read the docs** in order:
   - `docs/FEATURES.md` - Understand what we're building
   - `docs/UI_REFERENCE.md` - See how Noise designs their UI
   - `docs/TECHNICAL_SPEC.md` - Architecture decisions
   - `docs/DATABASE_SCHEMA.md` - Data model

2. **Copy the Claude Code prompt** above into a new Claude Code session

3. **Start building!**

---

## 🔗 Reference Links

- **Original Platform:** https://platform.getnoise.com/
- **Noise Creator App (iOS):** https://apps.apple.com/us/app/noise-creator-platform/id6736955388
- **Noise Creator App (Android):** https://play.google.com/store/apps/details?id=com.playbite.gemstreak

---

## 📊 Success Metrics (from Noise)

These are the metrics Noise showcases - good targets to aim for:

| Metric | Noise's Numbers |
|--------|-----------------|
| Total Views | 2.5B+ |
| Conversions Driven | 30M |
| LTV Unlocked | $200M |
| Average CPA | $0.60 |

---

## 💡 Crypto-Specific Adaptations

| Noise (Consumer Apps) | CryptoNoise (Web3) |
|----------------------|---------------------|
| App installs | Wallet connections, sign-ups |
| TikTok/Instagram | + Twitter/X, Discord, Telegram |
| Stripe payouts | USDC/USDT crypto payouts |
| Basic analytics | On-chain attribution option |
| No token | Optional platform token for rewards |

---

## 🛠 Development Phases

### Phase 1: MVP (8-12 weeks)
- Basic auth + onboarding
- Campaign CRUD
- Creator submission flow
- Manual verification
- Stripe payments

### Phase 2: Growth (4-8 weeks)
- Social API integrations
- Automated verification
- Creator tiers/scoring
- Advanced analytics
- Referral system

### Phase 3: Web3 Native (4-8 weeks)
- Wallet authentication
- USDC payouts
- On-chain attribution
- NFT badges for creators
- Optional platform token

---

## 📝 License

This documentation is provided for educational purposes. Build your own unique platform!
