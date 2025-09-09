# Truemailer Project Summary

## Project Overview
Truemailer is a modern web application built with the Better-T-Stack, which combines:
- Next.js for the frontend
- Hono.js for the backend server
- TRPC for type-safe APIs
- Better-Auth for authentication
- Drizzle ORM with SQLite/Turso for database
- Cloudflare Workers for deployment

## Key Components

### Frontend (apps/web)
- Next.js 14+ with App Router
- TypeScript for type safety
- TailwindCSS for styling
- shadcn/ui components
- React Query for server state management
- Better-Auth client for authentication

### Backend (apps/server)
- Hono.js web framework
- TRPC for type-safe APIs
- Better-Auth for authentication
- Drizzle ORM with SQLite
- Cloudflare Workers deployment target

### Database
- SQLite database
- Drizzle ORM for database operations
- Schema defined in `apps/server/src/db/schema/`

### Authentication
- Better-Auth with email/password
- Session management
- Protected routes and procedures
- Drizzle adapter for database integration

## Deployment
- Server: Cloudflare Workers
- Database: Cloudflare D1 (SQLite)
- Frontend: Vercel or Cloudflare Pages

## Development
- Monorepo structure with Turborepo
- Bun as package manager and runtime
- Local development with Wrangler

## Key Files
- `apps/server/src/index.ts` - Server entry point
- `apps/server/src/routers/index.ts` - TRPC routers
- `apps/server/src/lib/auth.ts` - Authentication setup
- `apps/web/src/app/page.tsx` - Main frontend page
- `apps/web/src/utils/trpc.ts` - TRPC client configuration