# Environment Setup

## Server Environment Variables

Create a `.env` file in `apps/server/` with the following variables:

```
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_DATABASE_ID=your_cloudflare_database_id
CLOUDFLARE_D1_TOKEN=your_cloudflare_d1_token
CORS_ORIGIN=http://localhost:3001
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

## Web Environment Variables

Create a `.env` file in `apps/web/` with the following variables:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Getting Values

### Cloudflare Credentials
1. Login to Cloudflare dashboard
2. Get your Account ID from the sidebar
3. Create a D1 database and get its ID
4. Generate an API token with D1 edit permissions

### Auth Secret
Generate a random secret string for `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### URLs
- `CORS_ORIGIN`: The URL of your frontend application
- `BETTER_AUTH_URL`: The URL of your backend server
- `NEXT_PUBLIC_SERVER_URL`: The URL of your backend server