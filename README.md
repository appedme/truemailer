# 📧 Truemailer

Truemailer is a fast, lightweight **Email Validation API** built with [Hono](https://hono.dev) and deployed on **Cloudflare Workers**.
It helps developers and businesses verify emails in real time, detect disposable/temporary addresses, and filter out spammy emails before they enter your system.

---

## 🚀 Features

* ✅ **Syntax Validation** — RFC-compliant email format check.
* ✅ **Domain & MX Check** — verifies if the domain exists and has mail servers.
* ✅ **Disposable Email Detection** — blocks temp mail services (10minutemail, yopmail, etc.).
* ✅ **Spam Score Detection** — heuristic scoring based on domain, randomness, and trust signals.
* ✅ **Fast & Edge Ready** — powered by Hono + Cloudflare Workers.
* ✅ **Public API** — no authentication required for basic usage.

---

## 📦 API Usage

### Base URL

```
https://api.truemailer.io
```

### Validate an Email

**Endpoint:**

```
GET /validate?email=<email>
```

**Example:**

```bash
curl "https://api.truemailer.io/validate?email=test@gmail.com"
```

**Response:**

```json
{
  "email": "test@gmail.com",
  "valid_syntax": true,
  "domain_exists": true,
  "is_disposable": false,
  "spam_score": 5,
  "verdict": "good"
}
```

---

## 📊 Spam Score Guide

* **0 – 20** → ✅ Good
* **21 – 60** → ⚠️ Suspicious
**61+** → 🚫 Likely Spam

---

## 🛠 Tech Stack

* [Hono](https://hono.dev) — lightweight web framework
* [Cloudflare Workers](https://workers.cloudflare.com) — edge-native deployment
* [Bun](https://bun.sh) — local development runtime
* [DNS Lookups](https://nodejs.org/api/dns.html) — MX record validation
* Custom **disposable email blocklist**

---

## 📂 Project Structure

```
truemailer/
│── src/
│   ├── index.ts        # Main Hono app
│   ├── utils/
│   │   ├── validate.ts # Syntax & MX checks
│   │   ├── spam.ts     # Spam scoring heuristics
│   │   └── disposable.ts # Disposable domain list
│── package.json
│── wrangler.toml       # Cloudflare Workers config
│── README.md
```

---

## ⚡️ Local Development

```bash
# Clone the repo
git clone https://github.com/appedme/truemailer.git
cd truemailer

# Backend (Email Validation API)
cd backend
# Install dependencies
bun install   # or npm install

# Start local dev server
bun run dev

# Frontend (Next.js app)
cd ../frontend
# Install dependencies
bun install   # or npm install

# Start local dev server
bun run dev
```

---

## 🌍 Deployment

Truemailer is designed for **Cloudflare Workers**.
To deploy:

```bash
# Backend
cd backend
wrangler publish

# Frontend
cd ../frontend
wrangler publish
```

---

## 🤝 Contributing

Pull requests are welcome!
If you’d like to add more disposable domains, improve spam heuristics, or extend API functionality, feel free to fork and contribute.

---

## 📜 License

MIT License © 2025 [Shaswat Raj](https://sh20raj.github.io)

