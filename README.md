# Marios Platon — portfolio

Static bilingual portfolio hosted on GitHub Pages at https://cv.mariosplaton.gr.

## Deploy

Push to `main` after reviewing a pull request. GitHub Pages serves the site from the repository root. The `CNAME` file configures the custom domain; Cloudflare DNS should have a DNS-only CNAME for `cv` pointing to `mariosplaton123.github.io`.

## Content

- English homepage: `index.html`; Greek homepage: `el/index.html`.
- Project pages: `projects/` and `el/projects/`.
- Images and CV: `assets/`.
- Confirm the contact mailbox works before sharing the site widely.
- Replace illustrative project images with authentic screenshots when available.
- The static site has no backend contact form. `mailto:` opens the visitor's email app.

## SEO

Keep `sitemap.xml`, `robots.txt`, canonical URLs, and language alternates in sync when adding pages. Social previews use the absolute URL `https://cv.mariosplaton.gr/assets/social-preview.jpg`.

## Checks

Run `python generate_sitemap.py https://cv.mariosplaton.gr` after adding a page, then `python tests/check_site.py` to check local links, fragments, language pairs, sitemap coverage and PDF signatures. No third-party packages are required.

For browser verification, check English and Greek pages at desktop and mobile widths. Test the mobile menu (including Escape), home-lab language links, CV language links, and terminal commands. With `he` entered, Tab should complete `help`; the next Tab must move to Run. Shift+Tab must always move backward.

## Security

GitHub Pages ignores `.htaccess`. Never commit credentials, secrets, or private documents. Review `assets/cv.pdf` for sensitive personal information before publishing.
