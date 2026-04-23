# Sigma vs Elastic Showoff Site

Static public showcase for the DKSec Sigma detection rules vs Elastic detection rules experiment.

This site is the public portfolio artifact. It is separate from the internal Streamlit dashboard and must not connect to Elastic, Kibana, Sliver, or private lab infrastructure.

## Local Development

```powershell
npm install
npm run dev
```

## Verification

```powershell
npm test
npm run build
```

## Deployment Target

Working slug/subdomain: `sigma-vs-elastic`.

Preferred deployment is Cloudflare Pages. The production build output is `dist/`.

### Cloudflare Pages Settings

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `showoff_site`
- Production domain target: `sigma-vs-elastic.kaspergissel.dk`

### Static Hosting Files

- `public/_headers`: security headers and CSP for the static site.
- `public/_redirects`: SPA fallback so deep links resolve to `index.html`.
- `public/robots.txt` and `public/sitemap.xml`: crawler metadata for the subdomain.

## Data Safety Rules

- Use sanitized static data only.
- Do not publish credentials, tokens, internal hostnames, private IP addresses, or raw payloads.
- Label sample data as sample data until real experiment snapshots are exported.
- Keep the internal Streamlit dashboard for live Elastic and lab operations.
