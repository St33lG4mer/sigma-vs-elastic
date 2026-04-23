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

## Data Safety Rules

- Use sanitized static data only.
- Do not publish credentials, tokens, internal hostnames, private IP addresses, or raw payloads.
- Label sample data as sample data until real experiment snapshots are exported.
- Keep the internal Streamlit dashboard for live Elastic and lab operations.
