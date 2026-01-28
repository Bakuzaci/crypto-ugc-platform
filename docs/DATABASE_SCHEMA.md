# 🗄 Database Schema

## Overview

PostgreSQL database hosted on Supabase with Row Level Security (RLS) enabled on all tables.

---

## Entity Relationship Diagram

```
┌──────────────────┐
│      users       │
│  (Supabase Auth) │
└────────┬─────────┘
         │
         │ 1:1
         ▼
┌──────────────────┐       ┌──────────────────┐
│     brands       │       │    creators      │
│                  │       │                  │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         │ 1:N                      │ 1:N
         ▼                          │
┌──────────────────┐                │
│    campaigns     │                │
│                  │◀───────────────┤
└────────┬─────────┘                │
         │                          │
         │ 1:N                      │
         ▼                          │
┌──────────────────┐                │
│campaign_templates│                │
└────────┬─────────┘                │
         │                          │
         │                          │
         ▼                          │
┌──────────────────┐                │
│campaign_creators │◀───────────────┤
│   (junction)     │                │
└────────┬─────────┘                │
         │                          │
         │                          │
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐
│   submissions    │──────▶│   view_counts    │
│                  │       │                  │
└────────┬─────────┘       └──────────────────┘
         │
         │
         ▼
┌──────────────────┐
│  transactions    │
│                  │
└──────────────────┘
```

---

## Table Definitions

### users (Supabase Auth)

Managed by Supabase Auth - extended with profiles table.

```sql
-- This is the auth.users table managed by Supabase
-- We extend it with a profiles table

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('brand', 'creator', 'admin')),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'creator'); -- default role
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### brands

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Company Info
  company_name TEXT NOT NULL,
  company_website TEXT,
  company_logo_url TEXT,
  company_description TEXT,
  
  -- Contact
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  
  -- Billing
  stripe_customer_id TEXT,
  balance_cents INTEGER DEFAULT 0, -- Prepaid balance in cents
  
  -- Verification
  kyb_status TEXT DEFAULT 'pending' CHECK (kyb_status IN ('pending', 'verified', 'rejected')),
  kyb_verified_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id)
);

CREATE INDEX idx_brands_user_id ON brands(user_id);
CREATE INDEX idx_brands_stripe_customer_id ON brands(stripe_customer_id);
```

### creators

```sql
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Profile
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_photo_url TEXT,
  location_country TEXT,
  location_city TEXT,
  
  -- Niches/Categories
  niches TEXT[], -- ['crypto', 'defi', 'nft', 'gaming']
  
  -- Social Accounts (stored as JSONB for flexibility)
  social_accounts JSONB DEFAULT '[]',
  -- Example: [
  --   {"platform": "tiktok", "username": "@user", "followers": 10000, "verified": true},
  --   {"platform": "twitter", "username": "@user", "followers": 5000, "verified": true}
  -- ]
  
  -- Payout Info
  payout_method TEXT CHECK (payout_method IN ('bank', 'paypal', 'usdc_ethereum', 'usdc_solana')),
  payout_details JSONB, -- Encrypted or reference to secure storage
  stripe_connect_id TEXT,
  
  -- Earnings
  balance_cents INTEGER DEFAULT 0, -- Available balance
  total_earned_cents INTEGER DEFAULT 0, -- Lifetime earnings
  pending_cents INTEGER DEFAULT 0, -- Pending verification
  
  -- Verification
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  kyc_verified_at TIMESTAMPTZ,
  
  -- Stats
  total_views BIGINT DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  approval_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  tier TEXT DEFAULT 'standard' CHECK (tier IN ('standard', 'verified', 'elite')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id)
);

CREATE INDEX idx_creators_user_id ON creators(user_id);
CREATE INDEX idx_creators_status ON creators(status);
CREATE INDEX idx_creators_niches ON creators USING GIN(niches);
```

### campaigns

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT, -- For campaign cards
  
  -- Content Type
  content_type TEXT NOT NULL CHECK (content_type IN (
    'testimonial', 'demo', 'slideshow', 'talking_head', 
    'text_over_video', 'hook_demo', 'screen_recording', 
    'voiceover', 'faceless', 'custom'
  )),
  
  -- Target Platforms
  target_platforms TEXT[] NOT NULL, -- ['tiktok', 'youtube', 'instagram', 'twitter']
  
  -- Requirements
  requirements JSONB DEFAULT '{}',
  -- Example: {
  --   "min_duration_seconds": 15,
  --   "max_duration_seconds": 60,
  --   "required_hashtags": ["#ad", "#sponsored"],
  --   "required_mentions": ["@brandhandle"],
  --   "talking_points": ["Feature 1", "Feature 2"],
  --   "min_followers": 0
  -- }
  
  -- Assets
  assets JSONB DEFAULT '[]',
  -- Example: [
  --   {"type": "logo", "url": "...", "name": "Brand Logo"},
  --   {"type": "video", "url": "...", "name": "Example Video"}
  -- ]
  
  -- Pricing
  rate_per_1k_views_cents INTEGER NOT NULL, -- e.g., 100 = $1 per 1000 views
  conversion_bonus_cents INTEGER DEFAULT 0, -- Bonus per conversion
  
  -- Budget
  total_budget_cents INTEGER NOT NULL, -- Total campaign budget
  daily_budget_cents INTEGER, -- Optional daily cap
  spent_cents INTEGER DEFAULT 0, -- Amount spent so far
  
  -- Timeline
  start_date DATE,
  end_date DATE,
  
  -- Approval Settings
  auto_approve_creators BOOLEAN DEFAULT TRUE,
  requires_content_approval BOOLEAN DEFAULT FALSE,
  
  -- Categories
  categories TEXT[], -- ['crypto', 'defi', 'exchange']
  
  -- Stats (denormalized for performance)
  total_views BIGINT DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  active_creators INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'active', 'paused', 'completed', 'cancelled')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_brand_id ON campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_categories ON campaigns USING GIN(categories);
CREATE INDEX idx_campaigns_target_platforms ON campaigns USING GIN(target_platforms);
```

### campaign_templates

```sql
CREATE TABLE campaign_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  
  -- Template Info
  name TEXT NOT NULL,
  description TEXT,
  
  -- Template Content
  hook_text TEXT, -- Opening hook
  body_text TEXT, -- Main content points
  cta_text TEXT, -- Call to action
  
  -- Example Content
  example_video_url TEXT,
  example_thumbnail_url TEXT,
  
  -- Template Assets
  assets JSONB DEFAULT '[]',
  
  -- Order
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaign_templates_campaign_id ON campaign_templates(campaign_id);
```

### campaign_creators (Junction Table)

```sql
CREATE TABLE campaign_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'left')),
  
  -- Creator's unique tracking code for this campaign
  tracking_code TEXT NOT NULL,
  
  -- Stats for this creator in this campaign
  total_submissions INTEGER DEFAULT 0,
  total_views BIGINT DEFAULT 0,
  total_earned_cents INTEGER DEFAULT 0,
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  
  UNIQUE(campaign_id, creator_id),
  UNIQUE(tracking_code)
);

CREATE INDEX idx_campaign_creators_campaign_id ON campaign_creators(campaign_id);
CREATE INDEX idx_campaign_creators_creator_id ON campaign_creators(creator_id);
CREATE INDEX idx_campaign_creators_tracking_code ON campaign_creators(tracking_code);
```

### submissions

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  campaign_creator_id UUID NOT NULL REFERENCES campaign_creators(id) ON DELETE CASCADE,
  
  -- Content Info
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram', 'twitter', 'other')),
  social_post_url TEXT NOT NULL,
  social_post_id TEXT, -- Platform's ID for the post
  
  -- Proof
  screenshot_url TEXT,
  
  -- Tracking
  tracking_code TEXT NOT NULL,
  tracking_link TEXT, -- Full tracking URL
  
  -- View Tracking
  view_count BIGINT DEFAULT 0,
  view_count_verified BIGINT DEFAULT 0, -- Verified views (after fraud check)
  last_view_check_at TIMESTAMPTZ,
  
  -- Engagement (optional)
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  -- Conversions
  conversion_count INTEGER DEFAULT 0,
  
  -- Earnings
  earnings_cents INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'pending_review' CHECK (status IN (
    'pending_review', 'approved', 'rejected', 'flagged', 'verified'
  )),
  rejection_reason TEXT,
  
  -- Verification
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_campaign_id ON submissions(campaign_id);
CREATE INDEX idx_submissions_creator_id ON submissions(creator_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_platform ON submissions(platform);
CREATE INDEX idx_submissions_tracking_code ON submissions(tracking_code);
```

### view_counts (Historical tracking)

```sql
CREATE TABLE view_counts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  
  view_count BIGINT NOT NULL,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Delta from last check
  views_added BIGINT DEFAULT 0,
  
  -- Source of data
  source TEXT DEFAULT 'api' CHECK (source IN ('api', 'manual', 'scrape'))
);

CREATE INDEX idx_view_counts_submission_id ON view_counts(submission_id);
CREATE INDEX idx_view_counts_checked_at ON view_counts(checked_at);
```

### transactions

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who
  user_id UUID NOT NULL REFERENCES profiles(id),
  brand_id UUID REFERENCES brands(id),
  creator_id UUID REFERENCES creators(id),
  
  -- Type
  type TEXT NOT NULL CHECK (type IN (
    'deposit', 'campaign_spend', 'creator_earning', 
    'withdrawal', 'refund', 'platform_fee', 'adjustment'
  )),
  
  -- Amount
  amount_cents INTEGER NOT NULL, -- Positive for credits, negative for debits
  
  -- Reference
  reference_type TEXT, -- 'submission', 'campaign', 'withdrawal', etc.
  reference_id UUID,
  
  -- Payment Details
  payment_method TEXT,
  payment_provider TEXT, -- 'stripe', 'circle', 'manual'
  external_id TEXT, -- Stripe payment intent ID, etc.
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  
  -- Metadata
  description TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_brand_id ON transactions(brand_id);
CREATE INDEX idx_transactions_creator_id ON transactions(creator_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
```

### withdrawals

```sql
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  
  -- Amount
  amount_cents INTEGER NOT NULL,
  fee_cents INTEGER DEFAULT 0,
  net_amount_cents INTEGER NOT NULL,
  
  -- Payout Details
  payout_method TEXT NOT NULL,
  payout_details JSONB, -- Masked account details
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'processing', 'completed', 'failed', 'cancelled'
  )),
  
  -- Processing
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- External Reference
  external_id TEXT, -- Stripe payout ID, etc.
  failure_reason TEXT,
  
  -- Transaction Link
  transaction_id UUID REFERENCES transactions(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_withdrawals_creator_id ON withdrawals(creator_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
```

### notifications

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Content
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  
  -- Action
  action_url TEXT,
  
  -- Status
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
```

---

## Row Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE TO authenticated
USING (auth.uid() = id);

-- Brands: Users can CRUD their own brand
CREATE POLICY "Users can view own brand"
ON brands FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create brand"
ON brands FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own brand"
ON brands FOR UPDATE TO authenticated
USING (user_id = auth.uid());

-- Creators: Users can CRUD their own creator profile
CREATE POLICY "Users can view own creator"
ON creators FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Creators viewable in campaigns"
ON creators FOR SELECT TO authenticated
USING (
  id IN (
    SELECT creator_id FROM campaign_creators cc
    JOIN campaigns c ON cc.campaign_id = c.id
    JOIN brands b ON c.brand_id = b.id
    WHERE b.user_id = auth.uid()
  )
);

-- Campaigns: Brands see own, Creators see active
CREATE POLICY "Brands can view own campaigns"
ON campaigns FOR SELECT TO authenticated
USING (
  brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid())
);

CREATE POLICY "Creators can view active campaigns"
ON campaigns FOR SELECT TO authenticated
USING (
  status = 'active' AND
  EXISTS (SELECT 1 FROM creators WHERE user_id = auth.uid())
);

CREATE POLICY "Brands can create campaigns"
ON campaigns FOR INSERT TO authenticated
WITH CHECK (
  brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid())
);

CREATE POLICY "Brands can update own campaigns"
ON campaigns FOR UPDATE TO authenticated
USING (
  brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid())
);

-- Submissions: Creators see own, Brands see campaign submissions
CREATE POLICY "Creators can view own submissions"
ON submissions FOR SELECT TO authenticated
USING (
  creator_id IN (SELECT id FROM creators WHERE user_id = auth.uid())
);

CREATE POLICY "Brands can view campaign submissions"
ON submissions FOR SELECT TO authenticated
USING (
  campaign_id IN (
    SELECT c.id FROM campaigns c
    JOIN brands b ON c.brand_id = b.id
    WHERE b.user_id = auth.uid()
  )
);

CREATE POLICY "Creators can create submissions"
ON submissions FOR INSERT TO authenticated
WITH CHECK (
  creator_id IN (SELECT id FROM creators WHERE user_id = auth.uid())
);

-- Transactions: Users see own
CREATE POLICY "Users can view own transactions"
ON transactions FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Notifications: Users see own
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE TO authenticated
USING (user_id = auth.uid());
```

---

## Useful Functions

```sql
-- Generate unique tracking code
CREATE OR REPLACE FUNCTION generate_tracking_code()
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql;

-- Calculate creator earnings from views
CREATE OR REPLACE FUNCTION calculate_earnings(
  p_view_count BIGINT,
  p_rate_per_1k_cents INTEGER
)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(p_view_count / 1000.0 * p_rate_per_1k_cents)::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- Update campaign stats (call via trigger or cron)
CREATE OR REPLACE FUNCTION update_campaign_stats(p_campaign_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE campaigns SET
    total_views = (
      SELECT COALESCE(SUM(view_count_verified), 0)
      FROM submissions WHERE campaign_id = p_campaign_id
    ),
    total_submissions = (
      SELECT COUNT(*) FROM submissions WHERE campaign_id = p_campaign_id
    ),
    active_creators = (
      SELECT COUNT(*) FROM campaign_creators
      WHERE campaign_id = p_campaign_id AND status = 'approved'
    ),
    updated_at = NOW()
  WHERE id = p_campaign_id;
END;
$$ LANGUAGE plpgsql;
```

---

## Migration Order

1. `001_profiles.sql` - Profiles table and auth trigger
2. `002_brands.sql` - Brands table
3. `003_creators.sql` - Creators table
4. `004_campaigns.sql` - Campaigns and templates
5. `005_campaign_creators.sql` - Junction table
6. `006_submissions.sql` - Submissions and view counts
7. `007_transactions.sql` - Transactions and withdrawals
8. `008_notifications.sql` - Notifications
9. `009_rls_policies.sql` - All RLS policies
10. `010_functions.sql` - Helper functions
11. `011_indexes.sql` - Additional indexes
