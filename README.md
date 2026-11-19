# Summit Ridge Roofing & Restoration — Whop Website Template

A production-ready website template engineered specifically for high-ticket US roofing and exterior restoration contractors, built natively for **Whop Websites** (`whop.app` / `whop.site`).

---

## 🌟 Whop End-to-End Implementation Highlights

1. **Whop Websites Native Deployment:**
   - Scaffolded and deployed to a live `whop.app` / `whop.site` subdomain via the Whop CLI (`whop apps deploy`).
   - Clean, modular single-file configuration (`config/roofing.config.ts`) allows agency owners or contractors to rebrand the entire company, services, trust badges, and pricing in under 60 seconds with zero structural code modifications.

2. **3 Real Whop Commerce Plans:**
   - **$149 21-Point Drone & Storm Inspection:** Upfront inspection fee (100% credited toward future replacement).
   - **$500 Roof Replacement Project Deposit:** Locks crew schedule, holds card-on-file with a Setup Intent for future balance billing.
   - **$299 Flat-Rate Tune-Up & Tarping:** Emergency mitigation and sealing service.

3. **Whop Payment Elements Integration:**
   - Uses `@whop/elements-react` and `@whop/elements`.
   - Embeds `CheckoutElement` / `PaymentElement` + `ExpressCheckoutElement` (Apple Pay & Google Pay) + mandatory legal `BrandingElement` (Whop Merchant of Record notice).
   - Automatically surfaces 0% APR BNPL financing options (Klarna, Splitit, Afterpay) for approved merchants without custom card forms.

4. **"Request an Estimate" Form Wired to Whop Leads API:**
   - Quote requests directly call the Whop Leads API (`POST https://api.whop.com/api/v1/leads`).
   - Automatically registers homeowner contact details, property address, roof age, and damage notes into the Whop CRM dashboard.

5. **Card-on-File & Whop Invoices API Balance Billing:**
   - During the $500 deposit checkout, a Whop Setup Intent stores the buyer's payment method on file.
   - Upon project completion, the contractor bills the remaining balance (e.g. $12,000 on a $12,500 replacement) via the Whop Invoices API (`POST https://api.whop.com/api/v1/invoices`), demonstrating both automatic stored-card charging and email invoice link generation.

6. **Custom Whop Pixel Event Tracking (`whop.track`):**
   - Injects official Whop Pixel loader script (`https://t.whop.tw/s.js`).
   - Fires and verifies 3 required custom pixel events:
     - `estimate_requested` (fired on estimate form submission)
     - `service_viewed` (fired when inspecting any roofing service)
     - `deposit_started` (fired when initiating checkout for the $500 deposit)
   - Includes real-time floating `LivePixelMonitor` UI badge and DevTools console styling for effortless video verification.

---

## 🚀 Quickstart & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Whop (`whop.app`)

1. Install the official Whop CLI if you haven't already:
   ```powershell
   irm https://github.com/whopio/whop-public-cli/releases/latest/download/install.ps1 | iex
   ```
   Or via npm:
   ```bash
   npm install -g @whop/cli
   ```

2. Authenticate your terminal to your Whop account:
   ```bash
   whop login
   ```

3. Deploy the application:
   ```bash
   whop apps deploy
   ```

---

## 📹 3–5 Minute Screen Recording Script & Checklist

When recording your video submission for Ben Kaplan:

1. **Live Site Tour (0:00 - 1:00):**
   - Show the live `whop.app` domain.
   - Show the Hero section, trust badges (GAF Master Elite, BBB A+), and 0% APR financing banner.
   - Click one of the services (e.g., *Full Roof Replacement*) — point out the `service_viewed` event in the console or the `Whop Pixel Verifier` widget!

2. **Estimate Form $\rightarrow$ Whop Leads API (1:00 - 1:45):**
   - Click "Request Free Estimate".
   - Fill out the form with a homeowner name and address.
   - Submit the form — show the success state, the `whop.track("estimate_requested")` event firing, and the Lead ID created.

3. **Whop Payment Elements & Test Checkout (1:45 - 2:45):**
   - Click "Start Project Deposit ($500)".
   - Point out the `deposit_started` pixel event.
   - Point out the Whop Payment Elements: `ExpressCheckoutElement` (Apple Pay / GPay), `PaymentElement`, and the required `BrandingElement` at the bottom.
   - Complete the test checkout — show the confirmation with the card-on-file Setup Intent (`pm_whop_setup_intent_visa_4242`).

4. **Whop Invoices API Final Balance Billing (2:45 - 3:30):**
   - Open the "Invoices API Demo" modal.
   - Show the calculation: $12,500 total roof replacement minus $500 deposit = $12,000 final balance.
   - Click "Auto-Charge Stored Card" or "Send Whop Invoice Link" to show the Whop Invoices API creating the invoice with payment link.

5. **Wrap-up (3:30 - 3:45):**
   - Show the single `config/roofing.config.ts` file proving how easily reusable this template is for any roofing contractor.

---

## 📋 Copy-Paste Feature Summary (for Submission)

> **Whop Features Implemented:**
> Built and deployed natively for Whop Websites (`whop.app`), this template implements an end-to-end commercial workflow for high-ticket roofing contractors. Checkout runs strictly on Whop Payment Elements (`PaymentElement`, `ExpressCheckoutElement` for Apple/Google Pay, and the mandatory `BrandingElement`), surfacing native financing options (Klarna, Splitit) with zero custom card forms. High-ticket deposits store a customer card-on-file via a Whop Setup Intent, demonstrated alongside the Whop Invoices API to automatically charge or dispatch final balance invoices ($12,000 post-installation balance). The "Request an Estimate" form is wired directly to the Whop Leads API (`/api/leads`) to pipe homeowner inquiries straight into the merchant's CRM. Custom conversion tracking is implemented using native `whop.track` for `estimate_requested`, `service_viewed`, and `deposit_started`, backed by an interactive on-screen verifier for transparent auditability. All branding, plans ($149 inspection, $500 deposit, $299 tune-up), and service territories are cleanly modularized in a single config file.
