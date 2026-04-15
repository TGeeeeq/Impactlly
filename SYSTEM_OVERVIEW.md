# Good Deeds Network - System Overview

## 🎯 Mission

Motivate people to improve their environment by earning verified digital rewards for real-world environmental and community impact.

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        GOOD DEEDS NETWORK PLATFORM                      │
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACES                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │  Web Browser     │  │   iOS Safari     │  │  Android Chrome  │       │
│  │  (Desktop)       │  │  (Mobile App)    │  │  (Mobile App)    │       │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘       │
│           │                     │                     │                   │
│           └─────────────────────┼─────────────────────┘                   │
│                                 │                                         │
│                      ┌──────────▼──────────┐                             │
│                      │   Next.js 16       │                              │
│                      │   React 19 + TS    │                              │
│                      │   Tailwind CSS v4  │                              │
│                      └────────────────────┘                              │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND ROUTING                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────┬──────────┬─────────┬────────┬────────┬──────────────┐  │
│  │  /         │  /map    │ /tasks  │/submit │/profile│/leaderboard  │  │
│  │  Welcome   │  Impact  │ Task    │ Upload │ User   │ Rankings     │  │
│  │  Landing   │ Map      │Discovery│ Before │ Stats  │ Badges       │  │
│  └────────────┴──────────┴─────────┴────────┴────────┴──────────────┘  │
│                                                                            │
│  ┌─────────────┬──────────┬────────────┬──────────────┬─────────────┐   │
│  │ /auth       │/org      │ /sponsor   │/challenges  │/badges      │   │
│  │ Login       │ Org      │ Sponsor    │ Community   │Achievements │   │
│  │ Sign-up     │Dashboard │Dashboard   │ Campaigns   │ System      │   │
│  └─────────────┴──────────┴────────────┴──────────────┴─────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                            API LAYER (REST)                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Authentication             Task Management         Verification          │
│  ┌──────────────┐           ┌──────────────┐       ┌──────────────┐     │
│  │ POST /auth   │           │ GET /tasks   │       │ POST /verify │     │
│  │ Sign-up/Login│           │ POST /tasks  │       │ AI Analysis  │     │
│  └──────────────┘           │ GET /tasks/id│       └──────────────┘     │
│                             └──────────────┘                              │
│  Storage                    Submissions             Gamification          │
│  ┌──────────────┐           ┌──────────────┐       ┌──────────────┐     │
│  │ POST /upload │           │ POST /submit │       │GET /leaderbd │     │
│  │ Image Upload │           │ GET /submit  │       │GET /badges   │     │
│  │ Blob Storage │           │ Task Proof   │       │POST /badges  │     │
│  └──────────────┘           └──────────────┘       └──────────────┘     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVICES                                   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Supabase PostgreSQL          OpenAI Vision         Vercel Blob          │
│  ┌──────────────────┐         ┌──────────────┐      ┌──────────────┐    │
│  │ • Profiles       │         │ Before/After │      │ • Private    │    │
│  │ • Tasks          │◄─────┤ │ Comparison   │      │ • Encrypted  │    │
│  │ • Submissions    │         │ Trash Count  │      │ • Signed     │    │
│  │ • Badges         │         │ Manipulation │      │   URLs       │    │
│  │ • Challenges     │         │   Detection  │      └──────────────┘    │
│  │ • Leaderboards   │         └──────────────┘                          │
│  │ • Row Security   │                                                    │
│  │ • Triggers       │                                                    │
│  │ • Indexes        │                                                    │
│  └──────────────────┘                                                    │
│           │                                                               │
│           ├─ Real-time subscriptions                                      │
│           ├─ Full text search                                             │
│           ├─ Geospatial queries (lat/lng)                                │
│           └─ Auto-backups                                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                          DATA FLOW EXAMPLES                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  USER TASK SUBMISSION FLOW:                                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  User Opens Task                                                │   │
│  │  ↓                                                               │   │
│  │  Captures GPS Location                                          │   │
│  │  ↓                                                               │   │
│  │  Takes "Before Photo" (React Camera API)                        │   │
│  │  ↓                                                               │   │
│  │  Uploads to Vercel Blob (Private)                               │   │
│  │  ↓                                                               │   │
│  │  Completes Task in Real World                                   │   │
│  │  ↓                                                               │   │
│  │  Takes "After Photo" (React Camera API)                         │   │
│  │  ↓                                                               │   │
│  │  Uploads to Vercel Blob (Private)                               │   │
│  │  ↓                                                               │   │
│  │  Submits to API /api/submissions                                │   │
│  │  ├─ Store in task_submissions table                             │   │
│  │  ├─ Trigger /api/verify (OpenAI Vision)                         │   │
│  │  ├─ Analyze before/after images                                 │   │
│  │  ├─ Calculate confidence score                                  │   │
│  │  ├─ Validate GPS location                                       │   │
│  │  └─ Check for manipulation                                      │   │
│  │  ↓                                                               │   │
│  │  If Approved (Confidence > 0.85):                               │   │
│  │  ├─ Award tokens to user                                        │   │
│  │  ├─ Update impact_score                                         │   │
│  │  ├─ Update level if threshold reached                           │   │
│  │  ├─ Award badges if conditions met                              │   │
│  │  └─ Update leaderboard                                          │   │
│  │  ↓                                                               │   │
│  │  User Sees Confirmation with Rewards                            │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  LEADERBOARD RANKING FLOW:                                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  GET /api/leaderboard?type=global&metric=impact_score           │   │
│  │  ↓                                                               │   │
│  │  Query profiles table WHERE tasks_completed > 0                 │   │
│  │  ↓                                                               │   │
│  │  ORDER BY impact_score DESC LIMIT 100                           │   │
│  │  ↓                                                               │   │
│  │  Add rank number to each result                                 │   │
│  │  ↓                                                               │   │
│  │  Return ranked array with user stats                            │   │
│  │  ↓                                                               │   │
│  │  Cache for 60 seconds (SWR)                                     │   │
│  │  ↓                                                               │   │
│  │  Display Global Rankings to User                                │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  AI VERIFICATION WORKFLOW:                                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  POST /api/verify                                               │   │
│  │  {                                                              │   │
│  │    submission_id: "uuid"                                        │   │
│  │    before_photo_url: "blob://..."                               │   │
│  │    after_photo_url: "blob://..."                                │   │
│  │  }                                                              │   │
│  │  ↓                                                               │   │
│  │  OpenAI GPT-4o Vision API Call:                                 │   │
│  │  ├─ Compare image pair                                          │   │
│  │  ├─ Detect trash objects (count, estimate kg)                   │   │
│  │  ├─ Validate scene similarity (same location)                   │   │
│  │  ├─ Check for manipulation (artifacts, deepfake)                │   │
│  │  └─ Generate confidence score (0.0-1.0)                         │   │
│  │  ↓                                                               │   │
│  │  Fraud Checks:                                                  │   │
│  │  ├─ GPS validation (before/after within 100m)                   │   │
│  │  ├─ EXIF metadata check                                         │   │
│  │  ├─ Timestamp validation                                        │   │
│  │  ├─ Rate limiting (5 submissions/day)                           │   │
│  │  └─ Anomaly detection                                           │   │
│  │  ↓                                                               │   │
│  │  Determine Status:                                              │   │
│  │  ├─ Confidence > 0.85 → "approved" (auto-reward)               │   │
│  │  ├─ 0.5 < Confidence ≤ 0.85 → "manual_review"                  │   │
│  │  └─ Confidence ≤ 0.5 → "rejected" (explain why)                │   │
│  │  ↓                                                               │   │
│  │  Update task_submissions record with:                           │   │
│  │  ├─ ai_confidence_score                                         │   │
│  │  ├─ ai_analysis (JSON blob)                                     │   │
│  │  ├─ ai_trash_detected_before/after                              │   │
│  │  ├─ ai_estimated_kg_removed                                     │   │
│  │  ├─ status (approved/manual_review/rejected)                    │   │
│  │  ├─ tokens_awarded                                              │   │
│  │  └─ impact_awarded                                              │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE & DEPLOYMENT                         │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  GitHub Repository                                                        │
│  ↓ (git push)                                                             │
│  ┌──────────────────────────────────────────────────┐                   │
│  │            Vercel CI/CD Pipeline                 │                   │
│  ├──────────────────────────────────────────────────┤                   │
│  │ 1. Clone repo                                   │                   │
│  │ 2. Install dependencies (pnpm)                  │                   │
│  │ 3. Run type check (tsc --noEmit)                │                   │
│  │ 4. Build Next.js (turbopack)                    │                   │
│  │ 5. Deploy to edge network                       │                   │
│  │ 6. Warm up caches                               │                   │
│  └──────────────────────────────────────────────────┘                   │
│  ↓                                                                        │
│  ┌──────────────────────────────────────────────────┐                   │
│  │    Production Environment (Vercel Edge)          │                   │
│  ├──────────────────────────────────────────────────┤                   │
│  │ • Region-based deployment                       │                   │
│  │ • Instant auto-scaling                          │                   │
│  │ • Automatic SSL                                 │                   │
│  │ • DDoS protection                               │                   │
│  │ • Real-time analytics                           │                   │
│  └──────────────────────────────────────────────────┘                   │
│  ↓ (API calls)                                                            │
│  ┌──────────────────────────────────────────────────┐                   │
│  │     External Services (Integrated)               │                   │
│  ├──────────────────────────────────────────────────┤                   │
│  │ ┌──────────────┐  ┌──────────────┐              │                   │
│  │ │  Supabase    │  │ Vercel Blob  │              │                   │
│  │ │  PostgreSQL  │  │ File Storage │              │                   │
│  │ ├──────────────┤  └──────────────┘              │                   │
│  │ │ • Database   │  ┌──────────────┐              │                   │
│  │ │ • Auth       │  │  OpenAI API  │              │                   │
│  │ │ • RLS        │  │  Vision/GPT  │              │                   │
│  │ │ • Real-time  │  │  Image Anal. │              │                   │
│  │ │ • Backups    │  └──────────────┘              │                   │
│  │ └──────────────┘                                │                   │
│  └──────────────────────────────────────────────────┘                   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 User Journey Map

```
VOLUNTEER USER JOURNEY:

Discover App
    │
    ├─→ [New User] Sign Up (email/OAuth)
    │   └─→ Profile auto-created (trigger)
    │   └─→ Email confirmation
    │   └─→ Redirect to tasks
    │
    ├─→ [Returning User] Login
    │   └─→ Session restored from cookie
    │   └─→ Redirect to home/map
    │
Browse Tasks
    │
    ├─→ View Impact Map
    │   ├─ See task markers (green/blue/gray)
    │   ├─ Filter by category (6 types)
    │   ├─ Filter by difficulty
    │   └─ Filter by distance/radius
    │
    └─→ View Tasks List
        ├─ Sort by distance
        ├─ Sort by reward
        └─ Sort by difficulty

Select Task
    │
    ├─→ Tap task on map
    │   └─→ Show task detail popup
    │
    └─→ Click task in list
        └─→ Open task detail page
            ├─ Full description
            ├─ Complete instructions
            ├─ Estimated duration
            ├─ Reward info
            └─ [START TASK] button

Complete Task
    │
    ├─→ Click [START TASK]
    │   └─→ Enter submit flow
    │   └─→ Record start time
    │
    ├─→ Take BEFORE photo
    │   ├─ Open camera
    │   ├─ Capture GPS location
    │   ├─ Record timestamp
    │   └─ Review/retake
    │
    ├─→ See instructions overlay
    │   └─ Helps user understand task
    │
    ├─→ Take AFTER photo
    │   ├─ Open camera
    │   ├─ Capture GPS location
    │   ├─ Record timestamp
    │   └─ Review/retake
    │
    ├─→ [OPTIONAL] Record video
    │   └─ Upload additional proof
    │
    └─→ Fill task form
        ├─ Challenges faced
        ├─ Team members involved
        └─ [SUBMIT] button

Verification
    │
    ├─→ Submit task
    │   └─→ Show "pending" status
    │   └─→ Trigger AI verification
    │
    ├─→ OpenAI Vision analyzes images
    │   ├─ Compare before/after
    │   ├─ Count trash objects
    │   ├─ Estimate kg removed
    │   ├─ Check scene match
    │   └─ Detect manipulation
    │
    └─→ Result determination
        ├─ High confidence (>0.85)
        │   └─→ Auto-approve (2 seconds)
        │   └─→ Award tokens immediately
        │
        ├─ Medium confidence (0.5-0.85)
        │   └─→ Queue for human review
        │   └─→ Notify user of pending status
        │   └─→ Review typically < 1 hour
        │
        └─ Low confidence (<0.5)
            └─→ Reject with explanation
            └─→ User can resubmit

Rewards
    │
    ├─→ Tokens awarded
    │   ├─ Base reward (10-40 tokens)
    │   ├─ Challenge bonus (+50%)
    │   └─ Level-up bonus (if applicable)
    │
    ├─→ Impact points awarded
    │   ├─ Based on kg removed
    │   ├─ 1kg = 5 points
    │   └─ Increase impact score
    │
    ├─→ Level up [if threshold reached]
    │   ├─ 50 points → Level 2
    │   ├─ 200 points → Level 3
    │   ├─ 500 points → Level 4
    │   └─ 1000+ points → Level 5
    │
    └─→ Badges earned [if criteria met]
        ├─ First Step (1st task)
        ├─ Category badges (5 tasks)
        └─ Impact badges (certain scores)

Engage & Compete
    │
    ├─→ View Profile
    │   ├─ Impact score
    │   ├─ Current level
    │   ├─ Tokens earned
    │   ├─ Tasks completed
    │   └─ Badges earned
    │
    ├─→ Check Leaderboards
    │   ├─ Global rankings
    │   ├─ Country rankings
    │   ├─ City rankings
    │   └─ See progress toward top 10
    │
    └─→ Join Challenges
        ├─ View active challenges
        ├─ See community progress
        ├─ Earn bonus tokens
        └─ Get special badges


ORGANIZATION WORKFLOW:

Setup Organization
    │
    ├─→ Sign up with org role
    │   └─→ Enter organization details
    │   └─→ Get organization ID
    │
    ├─→ Create organization profile
    │   ├─ Name, description
    │   ├─ Logo, website
    │   └─ Location
    │
    └─→ Access Org Dashboard
        └─ Post tasks
        └─ View analytics

Post Tasks
    │
    ├─→ [NEW TASK] button
    │   ├─ Title & description
    │   ├─ Category (6 options)
    │   ├─ Difficulty level
    │   ├─ Location (map picker)
    │   ├─ Token reward
    │   ├─ Duration estimate
    │   └─ [CREATE] button
    │
    └─→ Task appears on map
        └─ Volunteers can discover & complete

Monitor Impact
    │
    ├─→ View task analytics
    │   ├─ Total completions
    │   ├─ Pending verifications
    │   ├─ Completed tasks
    │   └─ Rejected tasks
    │
    └─→ Track impact generated
        ├─ Total kg removed
        ├─ Impact points
        └─ Volunteer engagement


SPONSOR WORKFLOW:

Setup Sponsor
    │
    ├─→ Sign up with sponsor role
    │   └─→ Enter sponsor details
    │
    ├─→ Create sponsor profile
    │   ├─ Company name
    │   ├─ Logo, website
    │   └─ Contact info
    │
    └─→ Access Sponsor Dashboard
        └─ Launch campaigns
        └─ Track ROI

Launch Campaign
    │
    ├─→ [NEW CHALLENGE] button
    │   ├─ Title & description
    │   ├─ Target (kg or tasks)
    │   ├─ Duration
    │   ├─ Reward allocation
    │   └─ [LAUNCH] button
    │
    └─→ Campaign live
        └─ Volunteers join
        └─ Work toward goal
        └─ Earn bonus rewards

Track ROI
    │
    ├─→ Campaign analytics
    │   ├─ Total participants
    │   ├─ Progress toward goal
    │   ├─ Tokens distributed
    │   └─ Impact generated
    │
    └─→ Measure success
        ├─ kg of trash removed
        ├─ volunteers engaged
        └─ social impact
```

## 📈 Scaling Path

```
MVP (10k DAU)
├─ Single PostgreSQL instance
├─ Vercel edge deployment
├─ SWR client-side caching
└─ Public OpenStreetMap tiles

Phase 1 (100k DAU)
├─ Add Redis for leaderboard cache
├─ Implement geospatial indexing
├─ Pre-compute rankings hourly
├─ Image thumbnail generation
└─ API rate limiting

Phase 2 (1M DAU)
├─ Regional database replicas
├─ GraphQL layer with caching
├─ Dedicated AI worker pool
├─ Real-time leaderboard updates
└─ Multi-region edge functions

Phase 3 (10M DAU)
├─ Multi-region PostgreSQL (Neon)
├─ Distributed file system
├─ Microservices architecture
├─ Custom ML verification
└─ Blockchain token integration
```

## 🔐 Security Layers

```
┌─ Client Layer
│  ├─ HTTPS/TLS encryption
│  ├─ Content Security Policy
│  ├─ XSS protection (React)
│  ├─ CORS headers
│  └─ httpOnly secure cookies

├─ API Layer
│  ├─ JWT token validation
│  ├─ Rate limiting
│  ├─ Input validation (Zod)
│  ├─ SQL injection prevention
│  └─ Error message sanitization

├─ Database Layer
│  ├─ Row Level Security (RLS)
│  ├─ Encrypted connections
│  ├─ Parameterized queries
│  ├─ Backup encryption
│  └─ Access audit logging

└─ Storage Layer
   ├─ Private blob storage
   ├─ Signed URLs (time-limited)
   ├─ CORS validation
   ├─ File type checking
   └─ Size limits
```

## 📊 Key Metrics

```
PERFORMANCE
├─ First Contentful Paint: < 1.2s
├─ Largest Contentful Paint: < 2.5s
├─ Cumulative Layout Shift: < 0.1
├─ Time to Interactive: < 3.8s
└─ API Response Time: < 500ms

QUALITY
├─ Lighthouse Score: 85+
├─ Accessibility (WCAG): AAA
├─ Test Coverage: 80%+
├─ Type Coverage: 100%
└─ Error Rate: < 0.1%

ADOPTION
├─ Sign-up completion rate: > 90%
├─ Task discovery: > 80% of users
├─ Task completion: > 60% start to finish
├─ Return rate: > 40% (day 7)
└─ Referral rate: > 20% from existing users

IMPACT
├─ Tasks completed: Linear with time
├─ Kg of trash removed: Tracked per submission
├─ Volunteers engaged: Growing daily
├─ Global impact: Measured in real-world change
└─ Community challenges: Multiple concurrent campaigns
```

---

## Next Steps to Launch

1. ✅ Set environment variables in Vercel Settings
2. ✅ Connect GitHub repository to Vercel
3. ✅ Trigger first deployment (auto-runs migrations)
4. ✅ Test critical user flows on production
5. ✅ Monitor error tracking for 24 hours
6. ✅ Announce to early beta users
7. ✅ Gather feedback and iterate
8. ✅ Scale infrastructure as needed

**Status**: Ready for production deployment! 🚀

---

*Last Updated: April 2026*  
*System designed for global scale and environmental impact*
