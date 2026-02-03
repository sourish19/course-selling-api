# Course Selling API

A RESTful API for an online course marketplace built with Node.js, Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js with Bun
- **Framework:** Express 5
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** JWT and Argon2
- **Validation:** Zod

## Getting Started

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/db_name
JWT_SECRET=your_jwt_secret
JWT_EXP=7d
```

### Database Setup

```bash
bunx prisma migrate dev
bunx prisma generate
```

### Running the App

```bash
# Development
bun run dev

# Production
bun run build
bun run start
```

### Testing

This project uses bun:test as the test runner. Tests are located in the `tests` directory and cover all major routes including authentication, courses, lessons, and purchases.

Ensure the server is running on port 3000, then run:

```bash
bun test
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user profile

### Courses
- `GET /courses` - List all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create course (Instructor only)
- `PATCH /courses/:id` - Update course (Instructor only)
- `DELETE /courses/:id` - Delete course (Instructor only)

### Lessons
- `POST /lessons` - Create lesson (Instructor only)
- `GET /courses/:courseId/lessons` - Get lessons for a specific course

### Purchases
- `POST /purchases` - Purchase a course
- `GET /users/:id/purchases` - Get purchase history for a user

## Author

Sourish Dey
