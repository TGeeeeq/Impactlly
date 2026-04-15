# Good Deeds Network - MVP Architecture

## System Overview

Good Deeds Network is a mobile-first Progressive Web App (PWA) that verifies real-world environmental and community impact using AI-powered image analysis. Users complete tasks, earn Impact Tokens, and climb leaderboards while contributing to measurable global change.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context + Supabase Real-time
- **Data Fetching**: SWR for client-side caching
- **Maps**: Leaflet with OpenStreetMap (public tiles)
- **Camera/Media**: HTML5 Media API

### Backend
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth (Email, OAuth providers)
- **File Storage**: Vercel Blob (private storage for user uploads)
- **AI/Vision**: OpenAI GPT-4o Vision for image analysis
- **API**: Next.js Route Handlers (REST)
- **Real-time**: Supabase Real-time subscriptions

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Database**: Supabase (PostgreSQL in AWS)
- **Blob Storage**: Vercel Blob (AWS S3 backed)

## Database Schema

### Core Tables
1. **profiles** - User accounts with roles (volunteer, organization, sponsor, admin)
2. **organizations** - Environmental NGOs, municipalities, community centers
3. **sponsors** - Companies/foundations funding impact campaigns
4. **tasks** - Specific cleanup/help actions with location and rewards
5. **task_submissions** - User task completions with before/after proof
6. **badges** - Achievement system with unlock criteria
7. **user_badges** - Tracks earned badges per user
8. **challenges** - Time-limited campaigns (e.g., "Clean the River Month")
9. **challenge_participants** - User participation in challenges
10. **token_transactions** - Audit trail for Impact Token rewards
11. **global_stats** - Real-time impact metrics dashboard

### Key Features
- **Row Level Security (RLS)**: All tables protected with policies
- **Auto-triggers**: Profile creation on signup, stats update on task approval
- **Geospatial**: Latitude/longitude fields on tasks for map discovery
- **Soft relationships**: Foreign keys with cascading deletes for data integrity

## API Design

### Authentication Endpoints
- `POST /auth/sign-up` - User registration
- `POST /auth/login` - Email authentication
- `POST /auth/sign-out` - Clear session

### Task Endpoints
- `GET /api/tasks` - List tasks with filters (category, difficulty, radius)
- `POST /api/tasks` - Create new task (org/sponsor only)
- `GET /api/tasks/[id]` - Task details

### Submission Endpoints
- `POST /api/submissions` - Submit task completion with photos
- `GET /api/submissions` - User's submission history
- `GET /api/submissions/[id]` - Submission details with AI analysis

### Verification Endpoints
- `POST /api/verify` - AI-powered image verification (before/after comparison)

### Gamification Endpoints
- `GET /api/leaderboard` - Ranked users (global/country/city)
- `GET /api/badges` - Available badges and user progress
- `POST /api/badges` - Award badge to user

### Stats Endpoints
- `GET /api/stats/global` - Total impact metrics
- `GET /api/stats/user` - Personal impact stats

## AI Verification System

### Workflow
1. User uploads before/after photos with GPS metadata
2. System validates GPS location consistency
3. OpenAI Vision analyzes image pairs for:
   - Trash detection (object counting)
   - Scene similarity (same location validation)
   - Manipulation detection (image artifacts)
   - Estimated waste volume (visual estimation)
4. Confidence score generated:
   - High (>0.85) → Approve automatically, award tokens
   - Medium (0.5-0.85) → Queue for human review
   - Low (<0.5) → Reject with explanation
5. On approval: Update user stats, award badges, log transaction

### Fraud Prevention
- GPS validation: Before/after coordinates must match task location
- EXIF analysis: Check photo timestamps and device data
- Image hashing: Detect duplicate submissions
- Metadata verification: Ensure photos were taken within task time window
- Rate limiting: Max 5 submissions per user per day
- Anomaly detection: Flag unusual patterns (suspiciously fast completions, etc.)

## Impact Scoring System

### Token Economy (Simulated)
- Base: 10-40 tokens per task depending on difficulty/impact
- Bonuses:
  - Challenge completion: +50% bonus
  - Leaderboard milestone: +20% bonus
  - Badge achievement: +10 tokens
- Cap: 100 tasks/month per user to prevent farming
- Never devalued: Historical transactions immutable

### Impact Points
- Based on estimated waste removed/work completed
- Conversion: 1kg trash = 5 impact points
- Used for: Leveling (1→5), badge progression, leaderboard ranking

### Levels
- Level 1 (Novice): 0-49 points
- Level 2 (Volunteer): 50-199 points
- Level 3 (Hero): 200-499 points
- Level 4 (Champion): 500-999 points
- Level 5 (Legend): 1000+ points

## User Flows

### Volunteer Journey
1. Sign up (email/OAuth) → Profile created via trigger
2. Browse Impact Map or Task List (filtered by distance/category)
3. Select task → View details (description, rewards, difficulty)
4. "Start Task" → Session created with timestamp
5. Complete task in real world
6. Submit proof: Take before photo → Complete task → Take after photo
7. AI verification within 5-10 seconds
8. If approved: Tokens awarded, impact score updated, stats refreshed
9. Check badges page for newly unlocked achievements

### Organization Workflow
1. Sign up with role="organization"
2. Create Organization profile
3. Create tasks (set location, rewards, category, instructions)
4. View task analytics (completions, verified submissions)
5. Monitor impact generated

### Sponsor Workflow
1. Sign up with role="sponsor"
2. Create Sponsor profile
3. Launch challenges or fund specific tasks
4. View ROI dashboard (tokens spent, impact generated)

## Mobile-First Design Principles

### Navigation
- **Bottom Tab Bar** (sticky): Home, Map, Submit, Profile, More
- **Swipeable**: Tasks list, leaderboards (mobile)
- **Gesture Support**: Swipe to share, pull-to-refresh

### Photo Capture UX
- Full-screen camera preview with overlay
- Auto-location (GPS + permissions)
- Photo preview + edit before submit
- Fallback: Upload from gallery

### Performance
- Lazy loading: Images use `next/image` with blur placeholders
- Code splitting: Route-based (Next.js automatic)
- Service Worker: Offline fallback for read-only pages
- Cache strategy: Network-first for dynamic, cache-first for assets

## Security Model

### Authentication
- Supabase Auth handles credential storage (bcrypt hashing)
- JWT tokens in httpOnly cookies
- Session refresh via proxy (middleware.ts)
- OAuth providers: Google, Apple (optional: Wallet auth)

### Data Access (RLS Policies)
- Users can only read their own submissions and token transactions
- Task creators can review submissions for their tasks
- Leaderboard/badge data is public (privacy design choice)
- Organizations can only modify their own tasks/stats

### Input Validation
- Zod schemas on all forms
- Server-side re-validation on API routes
- SQL injection prevention: Parameterized queries via Supabase client
- XSS prevention: React sanitizes all user-generated content

### Image Security
- Private blob storage for user uploads
- CORS validation on image URLs
- File type validation (.jpg, .png only)
- Size limits (max 10MB per image)
- Virus scanning: Vercel Blob + backend checks

## Scalability Strategy

### Current Capacity
- MVP: ~10k daily active users, ~100k monthly
- PostgreSQL: Supabase's managed infrastructure handles auto-scaling
- Blob storage: Vercel Blob unlimited
- API: Vercel serverless scales to 10k concurrent requests

### Bottlenecks & Solutions
1. **AI Verification QPS**: Use queue system (Bull/RabbitMQ) for batch processing
2. **Geospatial Queries**: Add GiST index on location, implement caching layer
3. **Leaderboard Queries**: Pre-compute rankings hourly, cache in Redis
4. **Image Processing**: Add thumbnail generation, optimize for CDN
5. **Global Scale**: Edge caching (Vercel Edge), regional databases (future)

### Future Upgrades
- Migrate to PostgreSQL native partitioning by region
- Add Redis (Upstash) for session/leaderboard caching
- Implement job queue for async verification
- Add CDN image optimization (Cloudinary/Imgix)

## Deployment

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
BLOB_READ_WRITE_TOKEN=
OPENAI_API_KEY=
```

### Vercel Deployment
```bash
# Connected via GitHub
# Auto-deploys on push to main
# Preview environments for PRs
# Environment variables managed in Vercel dashboard
```

## Future Features (Post-MVP)

### Phase 2: Enhanced Verification
- Satellite imagery integration (before/after from space)
- Real-time collaboration (group cleanup tracking)
- AI trash detection from live camera feed
- 3D visualization of impact zones

### Phase 3: Economic System
- Blockchain token migration (Polygon)
- Marketplace: Redeem tokens for discounts
- Carbon credit integration
- Corporate partnership programs

### Phase 4: Global Scale
- Native mobile apps (React Native)
- Offline-first sync
- Municipal integration (government APIs)
- Carbon offset verification

## Monitoring & Analytics

### Key Metrics
- DAU/MAU, task completion rate
- Avg submission verification time
- AI accuracy (human review rate)
- User retention by segment
- Geographic impact distribution

### Tools
- Vercel Analytics (page performance)
- Supabase monitoring (database health)
- Sentry (error tracking)
- LogRocket (session replay for UX issues)

## Testing Strategy

### Manual Testing
- Task flow: Create → Submit → Verify
- Edge cases: Poor internet, image quality issues
- Mobile: iPhone 12/14, Android Pixel 6+
- Accessibility: Screen readers, keyboard navigation

### Automated (Post-MVP)
- E2E: Playwright tests for critical flows
- API: Jest tests for verification logic
- Component: Vitest for React components
- Load: k6 tests for scale validation

## Getting Started

### Development
```bash
pnpm install
pnpm dev  # http://localhost:3000
```

### Database Setup
```bash
# Migrations auto-apply via Supabase
# Seed data loads from scripts/004_seed_data.sql
```

### Deployment
```bash
git push origin main  # Auto-deploys to Vercel
```

---

**Last Updated**: April 2026  
**Version**: 1.0.0-MVP  
**Status**: In Development
