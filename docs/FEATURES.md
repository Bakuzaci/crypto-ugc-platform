# 📋 Features Specification

## Overview

This document details every feature needed for CryptoNoise, organized by user type and priority.

---

## 🏢 Brand Features

### 1. Onboarding & Account

| Feature | Description | Priority |
|---------|-------------|----------|
| Sign Up | Email/password + Google OAuth | P0 |
| Company Profile | Name, logo, website, description | P0 |
| KYB Verification | Business verification (can be manual initially) | P1 |
| Payment Method | Credit card via Stripe, crypto wallet later | P0 |
| Team Members | Invite team members (admin, viewer roles) | P2 |
| Billing History | View past invoices and payments | P1 |

### 2. Campaign Management

| Feature | Description | Priority |
|---------|-------------|----------|
| Campaign Creation Wizard | Step-by-step campaign setup | P0 |
| Content Type Selection | Testimonial, Demo, Slideshow, Custom | P0 |
| Template Builder | Create content templates with examples | P0 |
| Brand Asset Upload | Upload logos, images, videos for creators | P0 |
| Talking Points | Key messages creators should include | P0 |
| Example Content | Upload example videos for reference | P1 |
| Budget Settings | Total budget, daily cap, rate per 1K views | P0 |
| Campaign Duration | Start/end dates, or ongoing | P0 |
| Target Platforms | TikTok, YouTube, Instagram, Twitter, etc. | P0 |
| Creator Requirements | Min followers, location, niche | P1 |
| Approval Flow | Auto-approve or manual review of creators | P1 |
| Campaign Status | Draft, Active, Paused, Completed | P0 |
| Duplicate Campaign | Clone existing campaign | P2 |

### 3. Creator Management

| Feature | Description | Priority |
|---------|-------------|----------|
| View Applicants | See creators who joined campaign | P0 |
| Approve/Reject | Manual approval of creators | P1 |
| Creator Profiles | View creator stats and history | P1 |
| Block Creator | Prevent specific creators from campaigns | P2 |
| Favorite Creators | Save top performers for future campaigns | P2 |

### 4. Content Review

| Feature | Description | Priority |
|---------|-------------|----------|
| Submission Queue | View all pending submissions | P0 |
| Content Preview | View submitted content/links | P0 |
| Approve/Reject | Accept or reject submissions | P0 |
| Feedback | Send feedback on rejected content | P1 |
| Bulk Actions | Approve/reject multiple at once | P2 |

### 5. Analytics Dashboard

| Feature | Description | Priority |
|---------|-------------|----------|
| Overview Stats | Total views, conversions, spend | P0 |
| Campaign Performance | Per-campaign metrics | P0 |
| Creator Leaderboard | Top performing creators | P1 |
| Content Performance | Which content types work best | P1 |
| Platform Breakdown | Performance by social platform | P1 |
| Time Series Charts | Views/conversions over time | P1 |
| Export Data | Download CSV/Excel reports | P2 |
| Conversion Tracking | Track sign-ups via referral codes | P1 |

### 6. Billing & Payments

| Feature | Description | Priority |
|---------|-------------|----------|
| Add Funds | Prepay balance via Stripe | P0 |
| Auto-recharge | Automatic top-up when low | P2 |
| View Balance | Current available balance | P0 |
| Transaction History | All charges and payments | P1 |
| Invoices | Download invoices | P1 |
| Spending Alerts | Email when budget running low | P2 |

---

## 🎨 Creator Features

### 1. Onboarding & Profile

| Feature | Description | Priority |
|---------|-------------|----------|
| Sign Up | Email/password + Social OAuth | P0 |
| Profile Setup | Name, bio, profile photo | P0 |
| Social Account Linking | Connect TikTok, YouTube, Instagram, Twitter | P0 |
| Niche Selection | Categories they create content for | P1 |
| Portfolio | Upload sample work | P2 |
| Payout Setup | Bank account or crypto wallet | P0 |
| KYC Verification | Identity verification for payouts | P1 |
| Location | Country/region for campaign targeting | P1 |

### 2. Campaign Discovery

| Feature | Description | Priority |
|---------|-------------|----------|
| Campaign Feed | Browse available campaigns | P0 |
| Search | Search by keyword | P1 |
| Filters | By category, payout, platform, content type | P0 |
| Sort | By newest, highest paying, trending | P1 |
| Campaign Details | Full campaign info and requirements | P0 |
| Brand Profile | View brand info and past campaigns | P1 |
| Save Campaign | Bookmark for later | P2 |
| Campaign Recommendations | AI-suggested campaigns | P3 |

### 3. Campaign Participation

| Feature | Description | Priority |
|---------|-------------|----------|
| Join Campaign | Apply to participate | P0 |
| View Requirements | See what's needed | P0 |
| Download Assets | Get brand assets and templates | P0 |
| Get Tracking Link | Unique referral link/code | P0 |
| View Template | See content guidelines | P0 |
| My Campaigns | List of joined campaigns | P0 |
| Leave Campaign | Withdraw from campaign | P1 |

### 4. Content Submission

| Feature | Description | Priority |
|---------|-------------|----------|
| Submit Content | Upload proof of post | P0 |
| Social Link | Paste link to live post | P0 |
| Screenshot Upload | Upload screenshot as proof | P0 |
| Platform Selection | Which platform posted on | P0 |
| Multiple Submissions | Submit for multiple platforms | P1 |
| Submission Status | Pending, Approved, Rejected | P0 |
| Resubmit | Edit and resubmit rejected content | P1 |
| Submission History | View all past submissions | P0 |

### 5. Earnings & Payouts

| Feature | Description | Priority |
|---------|-------------|----------|
| Earnings Dashboard | Total earned, pending, paid | P0 |
| Earnings by Campaign | Breakdown per campaign | P0 |
| View Tracking | Real-time view count updates | P1 |
| Withdrawal Request | Request payout | P0 |
| Payout History | Past withdrawals | P0 |
| Payout Methods | Bank transfer, PayPal, USDC | P1 |
| Minimum Withdrawal | Set minimum payout threshold | P0 |
| Earnings Projections | Estimated future earnings | P3 |

### 6. Analytics

| Feature | Description | Priority |
|---------|-------------|----------|
| Performance Overview | Total views, earnings | P0 |
| Top Content | Best performing submissions | P1 |
| Platform Stats | Performance by platform | P1 |
| Growth Chart | Earnings over time | P2 |
| Tips & Insights | Suggestions to improve | P3 |

---

## 🔧 Admin Features

### 1. User Management

| Feature | Description | Priority |
|---------|-------------|----------|
| User List | View all users | P0 |
| User Details | View/edit user info | P0 |
| Suspend User | Temporarily disable account | P1 |
| Ban User | Permanently ban user | P1 |
| KYC Review | Review KYC submissions | P1 |
| KYB Review | Review business verifications | P1 |

### 2. Campaign Moderation

| Feature | Description | Priority |
|---------|-------------|----------|
| Campaign Review | Review new campaigns | P1 |
| Content Moderation | Flag inappropriate content | P1 |
| Dispute Resolution | Handle brand/creator disputes | P2 |

### 3. Verification & Fraud

| Feature | Description | Priority |
|---------|-------------|----------|
| View Verification Queue | Pending verifications | P0 |
| Manual Verification | Manually verify view counts | P0 |
| Fraud Detection | Flag suspicious activity | P1 |
| IP/Device Tracking | Detect duplicate accounts | P2 |

### 4. Financial Management

| Feature | Description | Priority |
|---------|-------------|----------|
| Payout Queue | Process pending payouts | P0 |
| Transaction Log | All platform transactions | P0 |
| Revenue Dashboard | Platform revenue metrics | P1 |
| Refund Management | Process refunds | P2 |

### 5. Platform Settings

| Feature | Description | Priority |
|---------|-------------|----------|
| Platform Fee | Set platform commission % | P0 |
| Payout Minimums | Set minimum withdrawal amounts | P0 |
| Content Categories | Manage campaign categories | P1 |
| Platform Announcements | Send announcements to users | P2 |

---

## 🌐 Platform-Wide Features

### 1. Notifications

| Feature | Description | Priority |
|---------|-------------|----------|
| Email Notifications | Transactional emails | P0 |
| In-App Notifications | Bell icon with updates | P1 |
| Push Notifications | Mobile push (later) | P2 |
| Notification Preferences | User controls what they receive | P1 |

### 2. Support

| Feature | Description | Priority |
|---------|-------------|----------|
| Help Center | FAQ and guides | P1 |
| Contact Form | Submit support requests | P0 |
| Live Chat | Intercom or similar | P2 |
| Documentation | API docs, guides | P2 |

### 3. Content Types Supported

| Type | Description | Example |
|------|-------------|---------|
| **Testimonial** | Creator talks about product | "I've been using X for 3 months..." |
| **Text Over Video** | Text overlay on background video | Trending TikTok style |
| **Hook + Demo** | Problem → Solution format | "Tired of X? Try Y!" |
| **Slideshow** | Image carousel with text | List-style content |
| **Talking Head** | Direct to camera | Classic review format |
| **Screen Recording** | App/product walkthrough | Tutorial style |
| **Voiceover** | Voice + B-roll | Documentary style |
| **Faceless** | No face shown | Anonymous creator content |

---

## 📱 Platform Support Matrix

### Content Platforms

| Platform | View Tracking | API Available | Priority |
|----------|--------------|---------------|----------|
| TikTok | ✅ | Limited | P0 |
| YouTube Shorts | ✅ | Yes | P0 |
| Instagram Reels | ⚠️ Manual | Limited | P0 |
| Twitter/X | ✅ | Yes | P0 |
| Discord | ⚠️ Manual | Limited | P2 |
| Telegram | ⚠️ Manual | Limited | P2 |
| Reddit | ⚠️ Manual | Yes | P2 |

### Payment Methods

| Method | For Brands | For Creators | Priority |
|--------|------------|--------------|----------|
| Credit Card | ✅ | ❌ | P0 |
| Bank Transfer | ✅ | ✅ | P0 |
| PayPal | ❌ | ✅ | P1 |
| USDC (Ethereum) | ✅ | ✅ | P1 |
| USDC (Solana) | ✅ | ✅ | P2 |
| USDT | ✅ | ✅ | P2 |

---

## 🔐 Security Features

| Feature | Description | Priority |
|---------|-------------|----------|
| 2FA | Two-factor authentication | P1 |
| Session Management | View/revoke sessions | P2 |
| API Keys | For brand integrations | P2 |
| Audit Log | Track account changes | P2 |
| Rate Limiting | Prevent abuse | P0 |
| CAPTCHA | On sign-up and sensitive actions | P1 |

---

## 📊 Metrics to Track

### Brand Metrics
- Total views generated
- Total conversions
- Cost per view (CPV)
- Cost per acquisition (CPA)
- Return on ad spend (ROAS)
- Active creators per campaign
- Content approval rate
- Average time to first submission

### Creator Metrics
- Total earnings
- Total views generated
- Earnings per 1K views
- Approval rate
- Active campaigns
- Average views per post
- Best performing content type
- Platform performance breakdown

### Platform Metrics
- Gross merchandise value (GMV)
- Net revenue
- Active brands
- Active creators
- Total campaigns
- Average campaign size
- Creator retention
- Brand retention
