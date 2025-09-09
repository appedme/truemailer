# Truemailer Project Overview

## Technology Stack
- **Frontend**: Next.js with TypeScript
- **Backend**: Hono.js with TRPC
- **Authentication**: Better-Auth
- **Database**: Drizzle ORM with SQLite/Turso
- **Deployment**: Cloudflare Workers
- **Styling**: TailwindCSS with shadcn/ui components
- **Monorepo**: Turborepo

## Project Structure
```
truemailer/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Hono, TRPC)
├── .kilocode/       # Kilo Code documentation (this folder)
```

## Key Features
1. **Authentication**: Email/password authentication with Better-Auth
2. **Type Safety**: End-to-end type safety with TRPC
3. **Database**: SQLite database with Drizzle ORM
4. **Deployment**: Cloudflare Workers deployment ready