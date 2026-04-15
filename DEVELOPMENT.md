# Good Deeds Network - Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ with pnpm
- Supabase account (connected integration)
- Vercel Blob storage (connected integration)
- OpenAI API key

### Setup
```bash
# Install dependencies
pnpm install

# Environment variables automatically set from integrations
# Add OPENAI_API_KEY to Vercel Settings → Vars

# Start dev server
pnpm dev

# Open http://localhost:3000
```

## Project Structure

```
app/                      # Next.js App Router
├── (app)/               # Authenticated routes (bottom nav)
│   ├── map/            # Impact map page
│   ├── tasks/          # Task discovery + detail
│   ├── submit/         # Task completion flow
│   ├── profile/        # User profile & stats
│   ├── leaderboard/    # Rankings
│   ├── badges/         # Achievement system
│   ├── challenges/     # Community challenges
│   ├── organization/   # Org dashboard
│   └── sponsor/        # Sponsor dashboard
├── auth/                # Authentication pages
│   ├── login/
│   ├── sign-up/
│   └── sign-up-success/
└── api/                 # API routes
    ├── upload/         # File uploads to Blob
    ├── verify/         # AI image verification
    ├── tasks/          # Task CRUD
    ├── submissions/    # Task completions
    ├── leaderboard/    # Rankings
    └── badges/         # Badge logic

components/
├── auth-provider.tsx          # Auth context + RLS handling
├── bottom-nav.tsx            # Mobile tab navigation
├── app-header.tsx            # Header component
├── impact-map.tsx            # Leaflet map visualization
├── map-filters.tsx           # Task filtering UI
├── global-stats.tsx          # Real-time impact stats
├── task-card.tsx             # Task list item
├── start-task-button.tsx     # Task initiation
├── profile-header.tsx        # User profile card
└── sign-out-button.tsx       # Auth logout

lib/
├── supabase/
│   ├── client.ts            # Client-side Supabase
│   ├── server.ts            # Server-side Supabase
│   └── proxy.ts             # Session management
├── types.ts                 # TypeScript definitions
└── utils/
    └── calculations.ts      # Impact calculations

public/
├── manifest.json            # PWA metadata
└── icons/                   # App icons

scripts/
├── 001_create_schema.sql    # Database creation
├── 002_create_rls_policies.sql
├── 003_create_triggers.sql
└── 004_seed_data.sql
```

## Key Workflows

### Adding a New Task Type
1. Update `lib/types.ts` → Add to `TaskCategory` type
2. Update database → Add check constraint
3. Update UI → Add icon in `lib/utils/calculations.ts`
4. Update tasks API filters

### Creating a Badge
1. Add to `004_seed_data.sql` with requirements
2. Create badge endpoint POST logic
3. Add badge UI card with progress indicator
4. Trigger award after submission approval

### Extending AI Verification
1. Edit `/app/api/verify/route.ts`
2. Modify OpenAI prompt for new checks
3. Update fraud detection thresholds
4. Add new fields to `ai_analysis` JSONB

## Authentication Flow

```
User → Sign Up
    ↓
Auth.users row created (Supabase Auth)
    ↓
Trigger: handle_new_user()
    ↓
Profile created (public.profiles)
    ↓
JWT token issued
    ↓
Cookie set via proxy (middleware.ts)
    ↓
RLS policies: Access user's own data
```

## Image Upload & Verification

```
Client: Take/select photo
    ↓
POST /api/upload (FormData)
    ↓
Vercel Blob: Store in private bucket
    ↓
Return blob pathname
    ↓
POST /api/submissions (with before/after URLs)
    ↓
POST /api/verify (async)
    ↓
OpenAI Vision: Compare images
    ↓
Update submission.status + ai_analysis
    ↓
If approved: Award tokens, update stats
```

## Real-Time Updates

### Leaderboard Live Update
```tsx
// In component:
const { data } = useSWR(
  '/api/leaderboard?type=global',
  fetcher,
  { refreshInterval: 30000 } // Poll every 30s
)
```

### Profile Stats Live Update
- On task approval: Database trigger updates profiles
- Frontend refetches profile after submission approval
- No websockets in MVP (polling sufficient for 10k DAU)

## Testing Locally

### Test Account
```
Email: test@example.com
Password: TestPassword123!
```

### Test Task Submission
1. Go to task detail page
2. Click "Start Task"
3. "Upload before photo" → Can use any image
4. Complete the form
5. "Upload after photo" → Same image works for testing
6. Submit
7. Watch verification API call in Network tab
8. Refresh profile to see tokens awarded (if approved)

### Test Map
- Zoom in/out around seeded tasks
- Click markers to view task details
- Filter by category or difficulty

## Common Issues

### "RLS policy denies access"
- Check: User authenticated? (`auth.uid()` returns value)
- Check: User_id matches row owner in RLS policy
- Check: INSERT includes auth.uid() in where clause

### "Image verification fails"
- Check: `OPENAI_API_KEY` set in Vercel Settings
- Check: Image URLs are publicly accessible
- Check: Images in JPEG or PNG format
- Check: Image size < 20MB

### Map not loading
- Check: Leaflet CSS imported in component
- Check: Coordinates are valid lat/lng
- Check: No CORS errors in console
- Check: OpenStreetMap tiles accessible

### Blob upload errors
- Check: `BLOB_READ_WRITE_TOKEN` set
- Check: `access: 'private'` in put() call
- Check: File size < 50MB
- Check: File type is image

## Performance Tips

### Optimize Images
```tsx
// Use next/image for automatic optimization
<Image
  src={photo}
  alt="task proof"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="..." // Low-res placeholder
/>
```

### Lazy Load Components
```tsx
// Code-split heavy components
const ImpactMap = dynamic(() => import('@/components/impact-map'), {
  loading: () => <div>Loading map...</div>,
  ssr: false, // Don't render on server
})
```

### Cache API Calls
```tsx
// SWR automatically deduplicates + caches
const { data } = useSWR('/api/tasks', fetcher)
// Refetch every 60 seconds
const { data } = useSWR('/api/leaderboard', fetcher, { 
  refreshInterval: 60000 
})
```

## Debugging

### Enable Debug Logging
```ts
// In Supabase client
const supabase = createClient()
supabase.auth.onAuthStateChange((event, session) => {
  console.log('[v0] Auth:', event, session?.user?.email)
})
```

### Check Database
```sql
-- In Supabase SQL Editor
SELECT * FROM public.profiles LIMIT 5;
SELECT * FROM public.tasks WHERE status = 'available';
SELECT * FROM public.task_submissions WHERE status = 'pending';
```

### Verify AI Responses
```ts
// In /app/api/verify/route.ts
console.log('[v0] AI Response:', {
  confidence: result.confidence_score,
  analysis: result.analysis,
})
```

## Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations run (verify in Supabase)
- [ ] Seed data loaded (check global_stats)
- [ ] Blob storage working (test file upload)
- [ ] OpenAI API key valid (test verification)
- [ ] OAuth providers configured (if using)
- [ ] PWA manifest.json correct
- [ ] Images optimized for mobile
- [ ] Error pages created (500.tsx, not-found.tsx)

## Contact & Support

For questions or issues:
1. Check ARCHITECTURE.md for system design
2. Review examples in reference files
3. Test in local environment first
4. Check Vercel logs for deployment errors
5. Review Supabase database logs for data issues

---

**Happy Building!** 🌱
