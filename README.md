# Course Selling API

RESTful API for an online course marketplace built with Node.js, Express, TypeScript, and PostgreSQL.

## Tech Stack

- Node.js with Bun, Express 5, TypeScript
- PostgreSQL with Prisma ORM
- JWT authentication with Argon2 password hashing
- Zod validation, Winston logging

## Prerequisites

- Bun (latest)
- PostgreSQL 12+
- Node.js 18+ (if not using Bun)

## Quick Start

```bash
# Install dependencies
bun install

# Setup environment variables
cp .env.example .env  # Edit with your values

# Setup database
createdb course_selling_db
bunx prisma migrate dev
bunx prisma generate

# Run development server
bun run dev
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/course_selling_db
JWT_SECRET=your_secret_key_minimum_32_characters
JWT_EXP=7d
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register user
- `POST /auth/signin` - Login (returns JWT token in cookie and response)
- `GET /auth/me` - Get current user profile
- `POST /auth/logout` - Logout

### Courses
- `GET /courses` - List all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create course (Instructor only)
- `PATCH /courses/:id` - Update course (Instructor only)
- `DELETE /courses/:id` - Delete course (Instructor only)

### Lessons
- `POST /lessons` - Create lesson (Instructor only)
- `GET /courses/:courseId/lessons` - Get lessons for a course

### Purchases
- `POST /purchases` - Purchase a course
- `GET /users/:id/purchases` - Get user purchase history

## Authentication

- JWT tokens sent via HTTP-only cookies or `Authorization: Bearer <token>` header
- Roles: `STUDENT` (purchase courses) and `INSTRUCTOR` (manage courses/lessons)

## Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE",
  "error": []
}
```

Error codes: `BAD_REQUEST` (400), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `CONFLICT` (409), `VALIDATION_ERROR` (422), `INTERNAL_SERVER_ERROR` (500)

## Scripts

- `bun run dev` - Development server with hot-reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run test` - Run tests
- `bun run lint` - Lint code
- `bun run format` - Format code

## Testing

```bash
# Start server in one terminal
bun run dev

# Run tests in another terminal
bun test
```

## Database

Models: User, Course, Lesson, Purchase. See `prisma/schema.prisma` for schema definition.

**Migrations:**
```bash
bunx prisma migrate dev --name migration_name
bunx prisma migrate reset  # Warning: deletes all data
bunx prisma studio  # View database
```

## Logging

Winston logger with daily rotating files:
- `logs/YYYY-MM-DD-combined.log` (14 days retention)
- `logs/YYYY-MM-DD-error.log` (30 days retention)
- `logs/exceptions.log` and `logs/rejections.log`

## Author

Sourish Dey
