# Truemailer Architecture

## Authentication System

The application uses Better-Auth for authentication, which provides a complete authentication solution with:

### Features
- Email/password authentication
- Session management
- User management
- Database integration with Drizzle ORM

### Implementation Details

**Server Side** (`apps/server/src/lib/auth.ts`):
- Uses Drizzle adapter for SQLite database
- Configured with secure cookie settings
- Supports email/password authentication

**Client Side** (`apps/web/src/lib/auth-client.ts`):
- Uses `createAuthClient` from better-auth/react
- Connects to the server API
- Provides React hooks for session management

### Database Schema

The authentication system uses the following tables:
- `user`: Stores user information
- `session`: Manages user sessions
- `account`: Links accounts to users
- `verification`: Handles email verification

## TRPC Implementation

### Server Side
- Uses `@hono/trpc-server` adapter
- Defines public and protected procedures
- Integrates with Better-Auth for protected procedures

### Client Side
- Uses `@trpc/client` and `@trpc/tanstack-react-query`
- Provides type-safe API calls
- Integrated with React Query for caching and state management

## Data Flow

1. User authenticates through the web app
2. Authentication tokens are stored in secure cookies
3. TRPC calls include authentication context
4. Protected procedures verify user session
5. Database operations use Drizzle ORM