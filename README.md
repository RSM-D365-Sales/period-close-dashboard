# Financial Close Dashboard

This repository contains a Vite + React dashboard app configured for GitHub Pages deployment with an optional custom domain.

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

## GitHub Repository Setup

1. Create an empty GitHub repository.
2. Add this project as the repository content.
3. Push the `main` branch.

## GitHub Pages + Custom Domain

This repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) which deploys on every push to `main`.

1. In GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
2. In GitHub, open **Settings > Secrets and variables > Actions > Variables** and add:
   - Name: `CUSTOM_DOMAIN`
   - Value: your domain (example: `dashboard.example.com`)
3. Configure DNS:
   - For apex domains, create `A`/`AAAA` records to GitHub Pages endpoints.
   - For subdomains, create a `CNAME` record to `<your-github-username>.github.io`.
4. In **Settings > Pages**, add the same custom domain and enable HTTPS.

After the workflow runs, the site is deployed and the `CNAME` file is added automatically during build when `CUSTOM_DOMAIN` is set.