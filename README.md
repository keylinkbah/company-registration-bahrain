# Company Registration in Bahrain – Keylink (static site)
Plain HTML, CSS and JavaScript. No build step.

## Publish on GitHub Pages (website, no software needed)
1. Sign in at github.com → "+" (top right) → New repository. Name it e.g. `company-registration-bahrain`, set Public, Create.
2. Click "uploading an existing file". Unzip this folder on your computer and drag ALL files and folders in (index.html must be at the top level). Commit changes.
3. Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
4. After 1–2 minutes your site is live at https://YOUR-USERNAME.github.io/company-registration-bahrain/

## Before going live: set your real address
Find and replace `https://bahrain-company-compass.lovable.app/` with your final address (keep the trailing slash) in:
`index.html`, `sitemap.xml`, `robots.txt`.

## Custom domain (optional)
Settings → Pages → Custom domain → enter your domain, Save, tick "Enforce HTTPS".
At your domain provider add: 4 A records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME `www` → YOUR-USERNAME.github.io.

## After going live
Add the site in Google Search Console and submit `sitemap.xml`.

## Enquiry form
GitHub Pages cannot receive form messages. Use the WhatsApp buttons, or connect the form to a form service (e.g. Formspree).
