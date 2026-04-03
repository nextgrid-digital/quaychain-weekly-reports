# QuayChain Weekly Report Site

This is a content-driven Next.js site for QuayChain's weekly logistics infrastructure intelligence reports.

## Publishing model

- Each report is stored as an immutable JSON file in `content/reports/`.
- The site renders:
  - `/` as the latest report landing page
  - `/archive` as the report archive
  - `/reports/[slug]` as each permanent report URL
- Weekly automation should only add a new report file and push a commit.
- Vercel should be connected to the GitHub repo and set to auto-deploy on pushes to `main`.

## Local development

```bash
npm install
npm run dev
```

## Validate reports

```bash
npm run validate:reports
```

## Publish a new report file

```bash
npm run publish:report -- ./tmp/2026-04-10.json
```

The script validates the report structure, rejects duplicate slugs, and writes the report into `content/reports/`.

After that:

```bash
git add .
git commit -m "Add weekly report for 2026-04-10"
git push origin main
```
