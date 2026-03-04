# Marsha Botanica — Brand Site

**marshabotanica.com** | Pre-launch mode by default.

## Stack
- Static HTML/CSS/JS deployed on **Vercel**
- Shopify storefront proxied at `/shop`
- Launch mode controlled by a simple meta tag in each page

---

## Deploy to Vercel

1. Create a new Vercel project
2. Upload this folder (or import the repo)
3. Framework preset: **Other**
4. Root directory: `/`
5. Deploy

Then add your custom domain in the Vercel dashboard.

---

## Launch Mode

This site ships in **pre-launch** mode.

Each page includes:
```html
<meta name="launch-mode" content="pre"/>
```

To go live, change that tag to:
```html
<meta name="launch-mode" content="live"/>
```

Update the homepage and all product pages, then redeploy.

### Preview without editing files
You can preview either mode in the browser:
- `?launch=pre`
- `?launch=live`

Example:
- `/index.html?launch=live`

That preview does not permanently change the site.

---

## Waitlist Form

The homepage form supports two modes:

1. **No endpoint configured (default):**
   - opens the visitor's email app with a prefilled waitlist message to `hello@marshabotanica.com`

2. **Endpoint configured:**
   - add your form endpoint in the homepage form:
   ```html
   <form class="waitlist-form" data-endpoint="https://your-endpoint.example.com">
   ```
   - the site will POST JSON in this shape:
   ```json
   { "email": "visitor@example.com", "source": "website-waitlist" }
   ```

---

## Shopify Setup

Update the Shopify domain inside `vercel.json`:
```json
{
  "source": "/shop/:path*",
  "destination": "https://marshabotanica.myshopify.com/:path*"
}
```

Replace `marshabotanica.myshopify.com` with your real Shopify subdomain.

---

## File Structure

```
marsha-botanica/
├── index.html
├── vercel.json
├── .env.example
├── products/
│   ├── halo-msm-bar.html
│   ├── neroli-msm-bar.html
│   └── rhassoul-msm-bar.html
└── assets/
    ├── css/style.css
    ├── js/launch.js
    └── img/
        ├── logo.jpeg
        ├── halo-msm-bar.webp
        ├── neroli-msm-bar.webp
        └── rhassoul-msm-bar.webp
```


## Inventory Lock

This bundle is hard-locked to pre-launch mode. Shopping is disabled until you intentionally remove the lock in the site scripts and routing.
