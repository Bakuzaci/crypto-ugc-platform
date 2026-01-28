---
title: API Specification
description: RESTful API documentation for CryptoNoise platform
outline: deep
---

# API Specification

## Overview

RESTful API built with Next.js API routes + Supabase Edge Functions. All endpoints require authentication unless marked as public.

::: info Related Documentation
- [Database Schema](/docs/DATABASE_SCHEMA) - Database tables and relationships
- [Technical Spec](/docs/TECHNICAL_SPEC) - Architecture and authentication flow
- [Features](/docs/FEATURES) - Feature requirements for each endpoint
:::

---

## Authentication

All authenticated requests require a Bearer token in the Authorization header:

```
Authorization: Bearer <supabase_access_token>
```

Tokens are obtained via Supabase Auth and refresh automatically.

---

## Base URL

```
Production: https://cryptonoise.vercel.app/api
Development: http://localhost:3000/api
```

::: tip
The production URL will be customized once a domain is configured. During development, use the Vercel preview URL or localhost.
:::

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

## Endpoints

### Auth

#### POST /api/auth/signup
Create a new account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "creator" | "brand"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "creator"
    },
    "session": {
      "access_token": "...",
      "refresh_token": "..."
    }
  }
}
```

#### POST /api/auth/login
Authenticate user.

#### POST /api/auth/logout
End session.

#### POST /api/auth/refresh
Refresh access token.

---

### Brands

#### GET /api/brands/me
Get current brand profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "company_name": "Crypto Exchange",
    "company_logo_url": "https://...",
    "balance_cents": 50000,
    "kyb_status": "verified"
  }
}
```

#### PUT /api/brands/me
Update brand profile.

**Request:**
```json
{
  "company_name": "Updated Name",
  "company_website": "https://example.com",
  "company_description": "Description..."
}
```

---

### Campaigns

#### GET /api/campaigns
List campaigns.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | Filter by status (draft, active, etc.) |
| page | number | Page number (default: 1) |
| per_page | number | Items per page (default: 20, max: 100) |

**Response (Brand):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Promote Our Exchange",
      "status": "active",
      "content_type": "testimonial",
      "rate_per_1k_views_cents": 150,
      "total_budget_cents": 100000,
      "spent_cents": 25000,
      "total_views": 500000,
      "active_creators": 45
    }
  ],
  "pagination": { ... }
}
```

**Response (Creator):**
Returns only active campaigns available to join.

#### POST /api/campaigns
Create a new campaign (Brand only).

**Request:**
```json
{
  "title": "Promote Our DeFi Protocol",
  "description": "Full description...",
  "short_description": "Short tagline",
  "content_type": "testimonial",
  "target_platforms": ["tiktok", "youtube", "twitter"],
  "requirements": {
    "min_duration_seconds": 15,
    "max_duration_seconds": 60,
    "required_hashtags": ["#ad", "#crypto"],
    "talking_points": ["Point 1", "Point 2"]
  },
  "rate_per_1k_views_cents": 150,
  "total_budget_cents": 100000,
  "start_date": "2024-01-15",
  "end_date": "2024-02-15",
  "categories": ["defi", "exchange"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Promote Our DeFi Protocol",
    "status": "draft",
    ...
  }
}
```

#### GET /api/campaigns/:id
Get campaign details.

#### PUT /api/campaigns/:id
Update campaign (Brand only).

#### DELETE /api/campaigns/:id
Delete draft campaign (Brand only).

#### POST /api/campaigns/:id/publish
Publish draft campaign (Brand only).

#### POST /api/campaigns/:id/pause
Pause active campaign (Brand only).

#### POST /api/campaigns/:id/resume
Resume paused campaign (Brand only).

---

### Campaign Templates

#### GET /api/campaigns/:id/templates
List templates for a campaign.

#### POST /api/campaigns/:id/templates
Create a template.

**Request:**
```json
{
  "name": "Hook + Demo Template",
  "description": "Start with a problem, show the solution",
  "hook_text": "Tired of high gas fees?",
  "body_text": "Show how our L2 solves this...",
  "cta_text": "Link in bio for 10% off fees!",
  "example_video_url": "https://..."
}
```

#### PUT /api/campaigns/:campaign_id/templates/:id
Update template.

#### DELETE /api/campaigns/:campaign_id/templates/:id
Delete template.

---

### Campaign Creators

#### POST /api/campaigns/:id/join
Join a campaign (Creator only).

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign_creator_id": "uuid",
    "tracking_code": "ABC12345",
    "tracking_link": "https://cryptonoise.io/r/ABC12345",
    "status": "approved"
  }
}
```

#### POST /api/campaigns/:id/leave
Leave a campaign (Creator only).

#### GET /api/campaigns/:id/creators
List creators in campaign (Brand only).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "creator": {
        "id": "uuid",
        "display_name": "CryptoCreator",
        "profile_photo_url": "https://...",
        "total_views": 5000000
      },
      "status": "approved",
      "total_submissions": 5,
      "total_views": 125000,
      "total_earned_cents": 18750
    }
  ]
}
```

#### PUT /api/campaigns/:campaign_id/creators/:id
Update creator status (approve/reject) (Brand only).

**Request:**
```json
{
  "status": "approved" | "rejected"
}
```

---

### Submissions

#### GET /api/submissions
List submissions.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| campaign_id | uuid | Filter by campaign |
| status | string | Filter by status |
| page | number | Page number |
| per_page | number | Items per page |

**Response (Creator):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "campaign": {
        "id": "uuid",
        "title": "Campaign Name",
        "brand": {
          "company_name": "Brand Name",
          "company_logo_url": "https://..."
        }
      },
      "platform": "tiktok",
      "social_post_url": "https://tiktok.com/@user/video/123",
      "view_count": 50000,
      "earnings_cents": 7500,
      "status": "verified",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### POST /api/submissions
Create a submission (Creator only).

**Request:**
```json
{
  "campaign_id": "uuid",
  "platform": "tiktok",
  "social_post_url": "https://tiktok.com/@user/video/123",
  "screenshot_url": "https://storage.../screenshot.png"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "tracking_code": "ABC12345",
    "status": "pending_review"
  }
}
```

#### GET /api/submissions/:id
Get submission details.

#### PUT /api/submissions/:id/verify
Verify submission (Admin only).

**Request:**
```json
{
  "status": "approved" | "rejected",
  "view_count_verified": 50000,
  "rejection_reason": "Optional reason if rejected"
}
```

---

### Creators

#### GET /api/creators/me
Get current creator profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "display_name": "CryptoCreator",
    "bio": "Content creator focused on DeFi...",
    "profile_photo_url": "https://...",
    "social_accounts": [
      {
        "platform": "tiktok",
        "username": "@cryptocreator",
        "followers": 50000,
        "verified": true
      }
    ],
    "balance_cents": 125000,
    "pending_cents": 15000,
    "total_earned_cents": 500000,
    "kyc_status": "verified"
  }
}
```

#### PUT /api/creators/me
Update creator profile.

#### POST /api/creators/me/social-accounts
Link a social account.

**Request:**
```json
{
  "platform": "tiktok",
  "username": "@cryptocreator"
}
```

#### DELETE /api/creators/me/social-accounts/:platform
Unlink a social account.

---

### Earnings & Withdrawals

#### GET /api/earnings
Get earnings breakdown (Creator only).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| period | string | 7d, 30d, 90d, all |
| campaign_id | uuid | Filter by campaign |

**Response:**
```json
{
  "success": true,
  "data": {
    "balance_cents": 125000,
    "pending_cents": 15000,
    "total_earned_cents": 500000,
    "by_campaign": [
      {
        "campaign_id": "uuid",
        "campaign_title": "Campaign Name",
        "earned_cents": 75000,
        "views": 500000
      }
    ],
    "by_day": [
      { "date": "2024-01-15", "earned_cents": 5000 },
      { "date": "2024-01-14", "earned_cents": 7500 }
    ]
  }
}
```

#### GET /api/withdrawals
List withdrawal history (Creator only).

#### POST /api/withdrawals
Request withdrawal (Creator only).

**Request:**
```json
{
  "amount_cents": 50000,
  "payout_method": "usdc_ethereum",
  "payout_address": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "amount_cents": 50000,
    "fee_cents": 0,
    "net_amount_cents": 50000,
    "status": "pending"
  }
}
```

---

### Billing (Brands)

#### GET /api/billing/balance
Get current balance.

**Response:**
```json
{
  "success": true,
  "data": {
    "balance_cents": 50000,
    "pending_charges_cents": 5000
  }
}
```

#### POST /api/billing/deposit
Add funds.

**Request:**
```json
{
  "amount_cents": 100000,
  "payment_method_id": "pm_..."
}
```

#### GET /api/billing/transactions
List billing transactions.

#### GET /api/billing/invoices
List invoices.

---

### Analytics

#### GET /api/analytics/brand
Get brand analytics.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| campaign_id | uuid | Filter by campaign |
| period | string | 7d, 30d, 90d |

**Response:**
```json
{
  "success": true,
  "data": {
    "total_views": 5000000,
    "total_conversions": 50000,
    "total_spent_cents": 750000,
    "avg_cpa_cents": 150,
    "top_campaigns": [...],
    "top_creators": [...],
    "views_by_day": [...]
  }
}
```

#### GET /api/analytics/creator
Get creator analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_views": 2500000,
    "total_earnings_cents": 375000,
    "earnings_per_1k_views_cents": 150,
    "top_submissions": [...],
    "earnings_by_day": [...],
    "platform_breakdown": [...]
  }
}
```

---

### Notifications

#### GET /api/notifications
List notifications.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| unread_only | boolean | Only unread notifications |

#### PUT /api/notifications/:id/read
Mark notification as read.

#### PUT /api/notifications/read-all
Mark all notifications as read.

---

### Upload

#### POST /api/upload
Upload a file (images, videos, etc.).

**Request:**
```
Content-Type: multipart/form-data
file: <binary>
type: "brand_asset" | "submission_proof" | "profile_photo"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.supabase.co/...",
    "filename": "image.png",
    "size": 125000
  }
}
```

---

### Webhooks

#### POST /api/webhooks/stripe
Stripe webhook endpoint.

Events handled:
- `payment_intent.succeeded` - Deposit completed
- `payout.paid` - Creator payout completed
- `payout.failed` - Creator payout failed

#### POST /api/webhooks/social
Social platform webhook (if available).

Events:
- View count updates
- Post deletion notifications

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Auth endpoints | 10/minute |
| Read endpoints | 100/minute |
| Write endpoints | 30/minute |
| Upload | 10/minute |

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| INSUFFICIENT_BALANCE | 400 | Not enough funds |
| CAMPAIGN_FULL | 400 | Campaign at capacity |
| DUPLICATE_SUBMISSION | 400 | Already submitted this URL |
| INTERNAL_ERROR | 500 | Server error |

---

## SDKs

### JavaScript/TypeScript
```typescript
import { CryptoNoiseClient } from '@cryptonoise/sdk';

const client = new CryptoNoiseClient({
  apiKey: 'your_api_key'
});

// List campaigns
const campaigns = await client.campaigns.list({ status: 'active' });

// Join campaign
await client.campaigns.join('campaign_id');

// Submit content
await client.submissions.create({
  campaign_id: 'uuid',
  platform: 'tiktok',
  social_post_url: 'https://...'
});
```

### Python
```python
from cryptonoise import CryptoNoiseClient

client = CryptoNoiseClient(api_key='your_api_key')

# List campaigns
campaigns = client.campaigns.list(status='active')

# Join campaign
client.campaigns.join('campaign_id')
```
