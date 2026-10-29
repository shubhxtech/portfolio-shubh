# portfolio-shubh

Personal site of Shubh Sahu. Next.js (App Router, static export), TypeScript and Tailwind CSS, with no other runtime dependencies.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

`out/` can be served from the root of any static host (Vercel, Netlify, Cloudflare Pages). Serving from a subpath, such as a GitHub Pages project site, needs `basePath` in `next.config.ts`.

## Editing content

Everything on the page comes from `src/content/`:

| File | What it holds |
|---|---|
| `site.ts` | Name, email, profile links, résumé path, the "at a glance" list, nav. Set `url` once the site has a domain. |
| `projects.ts` | Case studies: summary, problem, approach, decisions, trade-offs, optional `next`, and which figures to show. |
| `experience.ts` | Roles, newest first. Add a new object to the top of the list. |
| `beyond.ts` | Competitive programming profiles, hackathons and teaching, interests. |

The résumé is served from `public/Shubh_Sahu_Resume.pdf`; replace the file to update it.

## Figures

`src/components/figures/` holds the project diagrams. `HashRing` reproduces the KV store's
`ConsistentHashRouter` in the browser (MD5 of `node-id#i`, 150 virtual nodes per node,
first live virtual node clockwise), using the MD5 implementation in `src/lib/md5.ts`.
