# 🏗 Technical Specification

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENTS                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Brand Dashboard    │   Creator Portal    │   Admin Panel           │
│  (Next.js)          │   (Next.js/RN)      │   (Next.js)             │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API LAYER                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Next.js API Routes + Supabase Edge Functions                       │
│  - REST endpoints for CRUD operations                               │
│  - Webhooks for payment processing                                  │
│  - Background jobs for view verification                            │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SUPABASE BACKEND                               │
├─────────────────────────────────────────────────────────────────────┤
│  Auth          │  Database      │  Storage       │  Edge Functions  │
│  - Email/Pass  │  - PostgreSQL  │  - Brand assets│  - Cron jobs     │
│  - OAuth       │  - Row Level   │  - Submission  │  - Webhooks      │
│  - JWT         │    Security    │    proofs      │  - Background    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                               │
├─────────────────────────────────────────────────────────────────────┤
│  Stripe      │  Social APIs    │  Analytics   │  Email            │
│  - Payments  │  - TikTok       │  - PostHog   │  - Resend         │
│  - Payouts   │  - YouTube      │  - Mixpanel  │  - SendGrid       │
│  - Connect   │  - Twitter      │              │                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Details

### Frontend

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | Server components, streaming |
| Language | TypeScript | Strict mode enabled |
| Styling | Tailwind CSS | Dark theme primary |
| Components | shadcn/ui | Customized for crypto aesthetic |
| Forms | React Hook Form + Zod | Type-safe validation |
| State | Zustand | Client-side state management |
| Data Fetching | TanStack Query | Server state, caching |
| Animations | Framer Motion | Smooth transitions |
| Charts | Recharts | Analytics dashboards |
| File Upload | react-dropzone | Drag & drop uploads |
| Rich Text | Tiptap | Content templates |

### Backend

| Layer | Technology | Notes |
|-------|------------|-------|
| Database | PostgreSQL (Supabase) | Managed, with RLS |
| Auth | Supabase Auth | JWT tokens |
| Storage | Supabase Storage | S3-compatible |
| Edge Functions | Supabase Edge Functions | Deno runtime |
| Background Jobs | pg_cron + Edge Functions | View verification |
| Real-time | Supabase Realtime | Live updates |
| Search | PostgreSQL Full Text | Campaign search |

### Infrastructure

| Service | Provider | Purpose |
|---------|----------|---------|
| Hosting | Vercel | Frontend deployment |
| Database | Supabase | Backend services |
| CDN | Vercel Edge Network | Asset delivery |
| Monitoring | Sentry | Error tracking |
| Analytics | PostHog | Product analytics |
| Logging | Axiom | Log aggregation |

### External APIs

| Service | Purpose | Priority |
|---------|---------|----------|
| Stripe | Brand payments, creator payouts | P0 |
| TikTok API | View count verification | P1 |
| YouTube Data API | View count verification | P1 |
| Twitter API v2 | View/engagement verification | P1 |
| Instagram Graph API | View verification (limited) | P2 |
| Resend | Transactional email | P0 |
| Veriff/Persona | KYC verification | P2 |

---

## Project Structure

```
cryptonoise/
├── apps/
│   ├── web/                      # Main web app (brand + creator)
│   │   ├── app/
│   │   │   ├── (auth)/           # Auth routes
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   └── onboarding/
│   │   │   ├── (brand)/          # Brand dashboard routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   ├── (creator)/        # Creator portal routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── discover/
│   │   │   │   ├── earnings/
│   │   │   │   └── settings/
│   │   │   ├── (admin)/          # Admin panel routes
│   │   │   │   ├── users/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── payouts/
│   │   │   │   └── verification/
│   │   │   ├── api/              # API routes
│   │   │   │   ├── campaigns/
│   │   │   │   ├── submissions/
│   │   │   │   ├── webhooks/
│   │   │   │   └── ...
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── brand/            # Brand-specific components
│   │   │   ├── creator/          # Creator-specific components
│   │   │   ├── shared/           # Shared components
│   │   │   └── ui/               # shadcn components
│   │   ├── lib/
│   │   │   ├── supabase/         # Supabase client
│   │   │   ├── stripe/           # Stripe utilities
│   │   │   ├── utils/            # Helper functions
│   │   │   └── validators/       # Zod schemas
│   │   ├── hooks/                # Custom React hooks
│   │   ├── stores/               # Zustand stores
│   │   └── types/                # TypeScript types
│   │
│   └── mobile/                   # React Native creator app (Phase 2)
│
├── packages/
│   ├── database/                 # Database types & client
│   │   ├── src/
│   │   │   ├── client.ts         # Supabase client
│   │   │   └── types.ts          # Generated types
│   │   └── package.json
│   │
│   ├── ui/                       # Shared UI components
│   │   ├── src/
│   │   │   └── components/
│   │   └── package.json
│   │
│   └── utils/                    # Shared utilities
│       ├── src/
│       │   ├── format.ts
│       │   └── validation.ts
│       └── package.json
│
├── supabase/
│   ├── migrations/               # SQL migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── ...
│   ├── functions/                # Edge functions
│   │   ├── verify-views/
│   │   ├── process-payouts/
│   │   └── ...
│   └── config.toml
│
├── docs/                         # Documentation
├── turbo.json                    # Turborepo config
├── package.json
└── pnpm-workspace.yaml
```

---

## Authentication Flow

### Sign Up Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sign Up   │────▶│ Select Role │────▶│  Onboarding │────▶│  Dashboard  │
│   Form      │     │ Brand/Creator│     │   Flow      │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Brand Onboarding Steps
1. Company Information (name, logo, website)
2. Payment Method (Stripe card setup)
3. First Campaign (optional quick start)

### Creator Onboarding Steps
1. Profile Setup (name, bio, photo)
2. Social Account Linking (at least one required)
3. Payout Method (bank or crypto wallet)
4. Browse Campaigns

---

## Campaign Lifecycle

```
┌────────────────────────────────────────────────────────────────────┐
│                      CAMPAIGN LIFECYCLE                             │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────────┐    │
│   │  DRAFT  │───▶│ ACTIVE  │───▶│ PAUSED  │───▶│  COMPLETED  │    │
│   └─────────┘    └─────────┘    └─────────┘    └─────────────┘    │
│        │              │              │                             │
│        │              ▼              │                             │
│        │       ┌───────────┐         │                             │
│        │       │ Creators  │         │                             │
│        │       │   Join    │         │                             │
│        │       └───────────┘         │                             │
│        │              │              │                             │
│        │              ▼              │                             │
│        │       ┌───────────┐         │                             │
│        │       │  Content  │         │                             │
│        │       │ Submitted │         │                             │
│        │       └───────────┘         │                             │
│        │              │              │                             │
│        │              ▼              │                             │
│        │       ┌───────────┐         │                             │
│        │       │  Views    │         │                             │
│        │       │ Tracked   │         │                             │
│        │       └───────────┘         │                             │
│        │              │              │                             │
│        │              ▼              │                             │
│        │       ┌───────────┐         │                             │
│        │       │ Earnings  │         │                             │
│        │       │ Calculated│         │                             │
│        │       └───────────┘         │                             │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## View Verification System

### Verification Flow

```
1. Creator submits content with social link
2. Submission goes to "pending_verification" status
3. Background job runs every 15 minutes:
   a. Fetch view count from social API
   b. Update view_counts table
   c. Calculate earnings
   d. Update submission status
4. Manual verification fallback for edge cases
```

### Verification Strategies by Platform

| Platform | Primary Method | Fallback |
|----------|----------------|----------|
| TikTok | TikTok API (limited) | Manual screenshot review |
| YouTube | YouTube Data API | Public view count scraping |
| Twitter/X | Twitter API v2 | Public engagement metrics |
| Instagram | Creator provides screenshot | Manual review |

### Fraud Detection

| Signal | Action |
|--------|--------|
| Sudden view spike | Flag for manual review |
| Views from suspicious geos | Apply view discount |
| Same IP multiple accounts | Account suspension |
| Bot-like engagement patterns | Reject and investigate |
| View count manipulation | Permanent ban |

---

## Payment System

### Brand Payment Flow

```
1. Brand adds funds via Stripe
2. Funds credited to brand balance
3. When views verified, deduct from balance
4. Platform takes 25% fee
5. 75% credited to creator
```

### Creator Payout Flow

```
1. Earnings accumulate from verified views
2. Creator requests withdrawal (min $20)
3. Admin reviews and approves
4. Payout via Stripe Connect or crypto
5. Transaction recorded
```

### Fee Structure

| Entity | Percentage | Description |
|--------|------------|-------------|
| Platform | 25% | Platform fee on all transactions |
| Creator | 75% | Net earnings to creator |
| Payment Processor | ~3% | Stripe/crypto network fees (from brand) |

### Financial Calculations

```typescript
// Example calculation
const brandPaysPerView = 0.001; // $1 per 1000 views
const viewCount = 50000;
const platformFee = 0.25;

const grossPayout = viewCount * brandPaysPerView; // $50
const platformRevenue = grossPayout * platformFee; // $12.50
const creatorEarnings = grossPayout - platformRevenue; // $37.50
```

---

## Real-time Features

### What Updates in Real-time

| Feature | User | Technology |
|---------|------|------------|
| View counts | Creator | Supabase Realtime |
| Earnings | Creator | Supabase Realtime |
| New submissions | Brand | Supabase Realtime |
| Notifications | All | Supabase Realtime |
| Campaign status | All | Supabase Realtime |

### Implementation

```typescript
// Subscribe to view count updates
const subscription = supabase
  .channel('view-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'submissions',
      filter: `creator_id=eq.${userId}`
    },
    (payload) => {
      updateViewCount(payload.new.view_count);
    }
  )
  .subscribe();
```

---

## Security Measures

### Authentication

- JWT tokens with 1-hour expiry
- Refresh tokens with 7-day expiry
- Secure HTTP-only cookies
- CSRF protection

### Authorization

- Row Level Security (RLS) on all tables
- Role-based access control (brand/creator/admin)
- API rate limiting per user

### Data Protection

- Encryption at rest (Supabase default)
- TLS for all connections
- PII handling compliant with GDPR
- Regular security audits

### RLS Policy Examples

```sql
-- Brands can only see their own campaigns
CREATE POLICY "Brands can view own campaigns"
ON campaigns FOR SELECT
TO authenticated
USING (
  brand_id IN (
    SELECT id FROM brands WHERE user_id = auth.uid()
  )
);

-- Creators can only see their own submissions
CREATE POLICY "Creators can view own submissions"
ON submissions FOR SELECT
TO authenticated
USING (
  creator_id IN (
    SELECT id FROM creators WHERE user_id = auth.uid()
  )
);
```

---

## Performance Considerations

### Database Indexes

```sql
-- Essential indexes for performance
CREATE INDEX idx_campaigns_brand_id ON campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_submissions_campaign_id ON submissions(campaign_id);
CREATE INDEX idx_submissions_creator_id ON submissions(creator_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_view_counts_submission_id ON view_counts(submission_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
```

### Caching Strategy

| Data | Cache Duration | Technology |
|------|----------------|------------|
| Campaign list | 5 minutes | React Query |
| User profile | 30 minutes | React Query |
| Analytics | 15 minutes | React Query |
| Static content | 24 hours | Vercel Edge |

### Background Jobs Schedule

| Job | Frequency | Purpose |
|-----|-----------|---------|
| View verification | Every 15 min | Update view counts |
| Earnings calculation | Every 15 min | Calculate creator earnings |
| Payout processing | Daily at 00:00 UTC | Process pending payouts |
| Analytics rollup | Hourly | Aggregate analytics data |
| Fraud detection | Every 6 hours | Scan for suspicious activity |

---

## Deployment Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Feature    │────▶│    Pull      │────▶│   Preview    │
│   Branch     │     │   Request    │     │   Deploy     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Production  │◀────│   Staging    │◀────│    Merge     │
│   Deploy     │     │   Deploy     │     │   to Main    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Social APIs
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
YOUTUBE_API_KEY=
TWITTER_BEARER_TOKEN=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=

# Email
RESEND_API_KEY=
```

---

## Monitoring & Observability

### Error Tracking (Sentry)

```typescript
// Initialize in _app.tsx or layout.tsx
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

### Analytics Events

| Event | Properties | When |
|-------|------------|------|
| `campaign_created` | campaign_id, budget | Brand creates campaign |
| `campaign_joined` | campaign_id, creator_id | Creator joins campaign |
| `submission_created` | submission_id, platform | Creator submits content |
| `withdrawal_requested` | amount, method | Creator requests payout |
| `payment_completed` | amount, user_id | Stripe payment success |

### Health Checks

- `/api/health` - API health
- Supabase dashboard for database health
- Vercel analytics for frontend performance
