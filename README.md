# TrueMailer

**TrueMailer** is a powerful SaaS platform designed to validate emails and detect temporary, disposable, or invalid email addresses. Built for developers, marketers, and platforms that rely on high-quality user data.

- https://truemailer.unstory.app

---

Sources :-

blocklist :-
https://github.com/FGRibreau/mailchecker/blob/master/list.txt

allowed list :-
https://github.com/disposable-email-domains/disposable-email-domains/blob/main/allowlist.conf
---
## 🧠 Product Overview

**Mission:** Provide a lightweight, fast, and developer-friendly API & dashboard for comprehensive email verification and temporary mail detection.

**Target Users:** Developers, SaaS founders, marketers, e-commerce sites, fintech companies, education portals, and community platforms.

---

## 🚀 Key Features

### 🔍 Core API Capabilities

* ✅ **Email Syntax Validation**
* 🛡️ **Temporary Email Detection** (via domain database)
* 📫 **Mailbox Existence Check** (via MX & SMTP)
* 🧠 **Domain Reputation Score**
* 🧾 **Catch-All Domain Detection**
* 🌐 **Disposable Provider Blacklist Integration** (e.g., temp-mail, mailinator, guerrillamail)

### ⚙️ Developer API Suite

* Fast REST API (with key-based auth)
* SDKs for JavaScript, Python, PHP
* Bulk validation endpoint
* Webhook for real-time validation
* Postman collection for testing

### 📊 Web Dashboard

* Usage analytics & API usage tracking
* Bulk upload CSV for validation
* Logs of past validations
* API key management
* Subscription & billing

### 🧩 Integration & Plugins

* Zapier / Make (Integromat) plugin
* WordPress / Shopify plugin (optional)
* Webhook triggers to clean mailing lists automatically

### 📦 Pricing Plans

* **Free Tier:** 100 API calls/day
* **Pro Tier:** 10K–100K/month
* **Enterprise:** Custom pricing, high throughput, SLA

---

## 🔄 Workflow (API & SaaS Flow)

### 🧑‍💻 For Developers (API)

1. **User registers** → Gets API Key
2. **Integrate** → Use `/validate-email` endpoint
3. **Send email** → Get structured JSON response:

   ```json
   {
     "email": "shaswat@mailinator.com",
     "valid_syntax": true,
     "is_temp": true,
     "mx_records_found": true,
     "smtp_check": false,
     "domain_reputation": "low"
   }
   ```
4. **Use result** to:

   * Block registration
   * Flag risky signups
   * Clean newsletter lists

### 🧑‍💼 For Marketers/Non-tech

1. Upload CSV of emails on dashboard
2. Click "Validate"
3. Get detailed report:

   * Valid emails
   * Temporary emails
   * Inactive domains
   * Download cleaned list

---

## 💡 Why This Will Work

* **Massive use case:** Email is the backbone of signups and spam prevention.
* **Marketers hate bounce rates** and **temp emails in newsletters**.
* **SaaS founders want clean userbases.**
* **API-first + dashboard = developer & business friendly**
* Lightweight, niche but essential utility.

---

## 📣 Bonus Add-ons (optional for roadmap)

* **Verify phone numbers (via carrier & carrier-type check)**
* **Fake name detector (via AI trained on common spam patterns)**
* **Email enrichment:** Show email provider (e.g. Gmail, Outlook), country, type of user (business or personal)