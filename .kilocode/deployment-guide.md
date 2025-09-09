# Truemailer Deployment Guide

## Cloudflare Workers Deployment

The Truemailer application is already configured for deployment to Cloudflare Workers. Here's how to deploy:

### Prerequisites
1. Cloudflare account
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Bun runtime installed

### Server Deployment

1. Navigate to the server directory:
```bash
cd apps/server
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Create a D1 database:
```bash
wrangler d1 create truemailer-db
```

4. Update `wrangler.jsonc` with your database information:
```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "truemailer-db",
      "database_id": "YOUR_DATABASE_ID",
      "preview_database_id": "local-test-db",
      "migrations_dir": "./src/db/migrations"
    }
  ]
}
```

5. Set up environment variables:
```bash
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put CORS_ORIGIN
wrangler secret put BETTER_AUTH_URL
```

6. Deploy the server:
```bash
bun deploy
```

### Web Deployment

For deploying the Next.js frontend, you have several options:

1. **Vercel** (recommended):
   - Connect your repository to Vercel
   - Set environment variables:
     - `NEXT_PUBLIC_SERVER_URL` (your Cloudflare Worker URL)

2. **Cloudflare Pages**:
   - Build command: `bun run build`
   - Build directory: `apps/web/.next`
   - Set environment variables in the Cloudflare Pages dashboard

## Local Development

### Running the Server
```bash
cd apps/server
bun dev
```

### Running the Web App
```bash
cd apps/web
bun dev
```

The applications will be available at:
- Web: http://localhost:3001
- Server: http://localhost:3000