# Marsha Botanica — Brand Site

**marshabotanica.com** | Pre-launch mode by default.

## Stack
- Static HTML/CSS/JS → deployed via **Vercel**
- Shopify store → proxied at `/shop`
- Launch switch → single env variable

---

## 🚀 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import `sv05285/marsha-botanica` from GitHub
3. Framework: **Other** (static site)
4. Root directory: leave as `/`
5. Click **Deploy**

Then connect your domain:
- Vercel dashboard → **Domains** → Add `marshabotanica.com`
- Point your DNS: add a **CNAME** record `@` → `cname.vercel-dns.com`

---

## 🔴 Pre-Launch Mode (default)

All product images show **TOP SECRET** redaction stamps.
Shop links are hidden. Waitlist form is visible.

The `<meta name="launch-mode" content="pre"/>` tag in each HTML file controls this.

---

## ✅ Going Live — The Switch

When you're ready to launch (product in hand, competitors blindsided):

**Option A — Vercel env var (recommended):**
1. Go to Vercel dashboard → Project Settings → **Environment Variables**
2. Add `LAUNCH_MODE` = `live`
3. Redeploy (takes ~30 seconds)

> ⚠️ Note: Since this is a static site, you'll also need to update the meta tag manually OR set up a build script. See Option B.

**Option B — Direct edit (instant, no build needed):**
In every HTML file, find:
```html
<meta name="launch-mode" content="pre"/>
```
Change to:
```html
<meta name="launch-mode" content="live"/>
```
Push to GitHub → Vercel auto-deploys in ~20 seconds. Done.

---

## 🛍 Shopify Setup

1. Create your Shopify store
2. Set your Shopify store URL in `.env.example` → update `vercel.json` destination
3. In `vercel.json`, the `/shop` rewrite proxies to your Shopify store:
```json
{
  "source": "/shop/:path*",
  "destination": "https://marshabotanica.myshopify.com/:path*"
}
```
4. Update `marshabotanica.myshopify.com` to your actual Shopify URL

---

## 📁 File Structure

```
marsha-botanica/
├── index.html                  ← Homepage
├── vercel.json                 ← Vercel config + /shop rewrite
├── .env.example                ← Env var reference
├── products/
│   ├── halo-msm-bar.html       ← SeaGlow Kit
│   ├── neroli-msm-bar.html     ← Renewal Kit
│   └── rhassoul-msm-bar.html   ← GoodLook Kit
└── assets/
    ├── css/style.css
    ├── js/launch.js            ← Launch mode controller
    └── img/
        ├── logo.jpeg
        ├── halo-msm-bar.png
        ├── neroli-msm-bar.png
        ├── rhassoul-msm-bar.png
        └── top-secret.svg
```

---

## Adding the Private Label Products

When ready, add pages for:
- Barrier Veil (Renewal Kit)
- Reset Serum (Renewal Kit)
- Calming Mist (GoodLook Kit)
- Clarifying Serum (GoodLook Kit)
- Kelp Coat (SeaGlow Kit)
- Elixir Azure (SeaGlow Kit)

Same pattern as the soap pages, same launch switch mechanic.
