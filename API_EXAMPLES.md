# Good Deeds Network - API Examples

This guide shows how to use the Good Deeds Network API endpoints with example requests and responses.

## Authentication

### Sign Up
```bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "email": "volunteer@example.com",
    "password": "SecurePassword123!",
    "fullName": "Jane Doe",
    "role": "volunteer"
  }'
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "volunteer@example.com",
    "user_metadata": {
      "full_name": "Jane Doe",
      "role": "volunteer"
    }
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiI...",
    "token_type": "bearer"
  }
}
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "volunteer@example.com",
    "password": "SecurePassword123!"
  }'
```

### Logout
```bash
curl -X POST http://localhost:3000/auth/sign-out \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Tasks API

### List Tasks with Filters
```bash
# Get available tasks within 50km of user location
curl -X GET "http://localhost:3000/api/tasks?lat=40.7128&lng=-74.0060&radius=50&category=park_cleanup&difficulty=easy" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `lat` (optional): User latitude
- `lng` (optional): User longitude  
- `radius` (optional): Search radius in km (default: 50)
- `category` (optional): Task category
  - `park_cleanup`
  - `forest_cleanup`
  - `river_cleanup`
  - `community_help`
  - `environmental_building`
  - `wildlife_support`
- `difficulty` (optional): Task difficulty
  - `easy`
  - `medium`
  - `hard`
  - `expert`

**Response:**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Central Park Cleanup",
      "description": "Help clean up litter around the Great Lawn area",
      "category": "park_cleanup",
      "difficulty": "easy",
      "latitude": 40.7829,
      "longitude": -73.9654,
      "location_name": "Central Park",
      "token_reward": 15,
      "impact_points": 10,
      "estimated_trash_kg": 5.0,
      "estimated_duration_minutes": 60,
      "status": "available",
      "created_at": "2026-04-12T10:00:00Z"
    }
  ]
}
```

### Get Task Details
```bash
curl -X GET "http://localhost:3000/api/tasks/task-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Central Park Cleanup",
  "description": "Help clean up litter around the Great Lawn area",
  "instructions": "Bring gloves and bags. Focus on plastic bottles and wrappers.",
  "category": "park_cleanup",
  "difficulty": "easy",
  "latitude": 40.7829,
  "longitude": -73.9654,
  "location_name": "Central Park",
  "location_address": "New York, NY, USA",
  "token_reward": 15,
  "impact_points": 10,
  "estimated_trash_kg": 5.0,
  "estimated_duration_minutes": 60,
  "max_participants": 1,
  "current_participants": 0,
  "times_completed": 12,
  "status": "available",
  "created_by": "uuid",
  "created_at": "2026-04-12T10:00:00Z",
  "updated_at": "2026-04-12T10:00:00Z"
}
```

### Create Task (Organization Only)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "River Cleanup Day",
    "description": "Help remove plastic from the local river",
    "instructions": "Meet at the south bridge entrance. Bring water and gloves.",
    "category": "river_cleanup",
    "difficulty": "medium",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "location_name": "Hudson River",
    "location_address": "New York, NY, USA",
    "token_reward": 25,
    "impact_points": 20,
    "estimated_trash_kg": 10.0,
    "estimated_duration_minutes": 90,
    "organization_id": "org-uuid"
  }'
```

**Response:** Returns created task object with UUID

## Submissions API

### Submit Task Completion
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "task_id": "task-uuid",
    "before_photo_url": "https://blob.vercel-storage.com/...",
    "after_photo_url": "https://blob.vercel-storage.com/...",
    "video_url": "https://blob.vercel-storage.com/...",
    "before_latitude": 40.7829,
    "before_longitude": -73.9654,
    "after_latitude": 40.7829,
    "after_longitude": -73.9654
  }'
```

**Response:**
```json
{
  "id": "submission-uuid",
  "task_id": "task-uuid",
  "user_id": "user-uuid",
  "status": "pending",
  "before_photo_url": "https://blob.vercel-storage.com/...",
  "after_photo_url": "https://blob.vercel-storage.com/...",
  "before_latitude": 40.7829,
  "before_longitude": -73.9654,
  "after_latitude": 40.7829,
  "after_longitude": -73.9654,
  "started_at": "2026-04-12T14:00:00Z",
  "completed_at": "2026-04-12T14:45:00Z",
  "created_at": "2026-04-12T14:45:30Z"
}
```

### Get User Submissions
```bash
curl -X GET http://localhost:3000/api/submissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "submissions": [
    {
      "id": "submission-uuid",
      "task_id": "task-uuid",
      "status": "approved",
      "tokens_awarded": 15,
      "impact_awarded": 10,
      "ai_confidence_score": 0.92,
      "ai_trash_detected_before": 47,
      "ai_trash_detected_after": 5,
      "ai_estimated_kg_removed": 5.2,
      "completed_at": "2026-04-12T14:45:30Z",
      "created_at": "2026-04-12T14:45:30Z"
    }
  ]
}
```

### Get Submission Details
```bash
curl -X GET "http://localhost:3000/api/submissions/submission-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:** Full submission object with AI analysis

## Upload API

### Upload Image to Blob Storage
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

**Response:**
```json
{
  "url": "https://blob.vercel-storage.com/abc123.jpg?token=xyz789",
  "pathname": "photos/submission-uuid-before.jpg"
}
```

## Verification API

### Trigger AI Verification (Internal)
```bash
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SERVICE_KEY" \
  -d '{
    "submission_id": "submission-uuid",
    "before_photo_url": "https://blob.vercel-storage.com/...",
    "after_photo_url": "https://blob.vercel-storage.com/..."
  }'
```

**Response:**
```json
{
  "submission_id": "submission-uuid",
  "status": "approved",
  "confidence_score": 0.92,
  "analysis": {
    "trash_detected_before": 47,
    "trash_detected_after": 5,
    "estimated_kg_removed": 5.2,
    "scene_match_score": 0.95,
    "manipulation_detected": false,
    "gps_validated": true
  },
  "tokens_awarded": 15,
  "impact_awarded": 10
}
```

## Leaderboard API

### Get Global Leaderboard
```bash
curl -X GET "http://localhost:3000/api/leaderboard?type=global&metric=impact_score" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `type` (optional): Leaderboard scope
  - `global` (default)
  - `country` (requires `country` param)
  - `city` (requires `city` param)
- `country` (optional): Country name for country leaderboard
- `city` (optional): City name for city leaderboard
- `metric` (optional): Ranking metric
  - `impact_score` (default)
  - `tasks_completed`
  - `total_tokens`

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "id": "user-uuid",
      "username": "jane_volunteer",
      "full_name": "Jane Doe",
      "avatar_url": "https://...",
      "impact_score": 1250,
      "tasks_completed": 45,
      "total_tokens": 450,
      "level": 5,
      "location_city": "New York",
      "location_country": "USA"
    },
    {
      "rank": 2,
      "id": "user-uuid-2",
      "username": "john_hero",
      "full_name": "John Smith",
      "impact_score": 980,
      "tasks_completed": 38,
      "total_tokens": 380,
      "level": 4,
      "location_city": "New York",
      "location_country": "USA"
    }
  ]
}
```

### Get Country Leaderboard
```bash
curl -X GET "http://localhost:3000/api/leaderboard?type=country&country=USA&metric=tasks_completed"
```

### Get City Leaderboard
```bash
curl -X GET "http://localhost:3000/api/leaderboard?type=city&city=New%20York&country=USA"
```

## Badges API

### Get Badges
```bash
curl -X GET http://localhost:3000/api/badges \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "badges": [
    {
      "id": "badge-uuid",
      "name": "First Step",
      "description": "Complete your first task",
      "icon_url": "/badges/first-step.svg",
      "category": "milestone",
      "requirement_type": "tasks_completed",
      "requirement_value": 1,
      "earned": true,
      "created_at": "2026-04-12T00:00:00Z"
    },
    {
      "id": "badge-uuid-2",
      "name": "River Guardian",
      "description": "Complete 5 river cleanup tasks",
      "icon_url": "/badges/river-guardian.svg",
      "category": "category",
      "requirement_type": "river_cleanup",
      "requirement_value": 5,
      "earned": false,
      "created_at": "2026-04-12T00:00:00Z"
    }
  ]
}
```

### Award Badge (System Only)
```bash
curl -X POST http://localhost:3000/api/badges \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SERVICE_KEY" \
  -d '{
    "badge_id": "badge-uuid",
    "user_id": "user-uuid"
  }'
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid authentication token"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "task_id is required"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Task with id 'xyz' does not exist"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "Failed to process request"
}
```

## Rate Limiting

- **Global**: 100 requests per minute per IP
- **Per User**: 5 task submissions per day
- **API**: 1000 requests per hour per authenticated user

Rate limit headers in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1681234567
```

## Authentication Headers

All authenticated endpoints require:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

JWT tokens are automatically set in httpOnly cookies and included with requests.

## Pagination

Endpoints returning lists support pagination:
```bash
curl -X GET "http://localhost:3000/api/tasks?limit=20&offset=0"
```

**Parameters:**
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Offset for pagination (default: 0)

**Response includes:**
```json
{
  "data": [...],
  "total": 245,
  "limit": 20,
  "offset": 0
}
```

## Webhooks (Post-MVP)

Future webhook events for external integrations:
- `task.created` - New task posted
- `task.completed` - Task marked as complete
- `submission.verified` - Submission verified by AI
- `user.leveled_up` - User reached new level
- `badge.earned` - User earned new badge
- `challenge.completed` - Challenge goal reached

---

**Last Updated**: April 2026  
**API Version**: 1.0.0-MVP
