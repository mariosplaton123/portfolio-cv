# Marios Platon — original purple portfolio, improved

## Upload to InfinityFree
1. Back up your existing htdocs first. Remove WordPress files from public hosting **only after confirming you no longer need them**.
2. Upload the **contents** of this folder into htdocs (including `.htaccess`, `el`, `projects`, and `assets`). Do not upload the archive itself.
3. Confirm `/style.css`, `/projects/notepad.html`, `/el/index.html`, `/assets/cv.pdf` load over HTTPS.
4. Confirm your hosting accepts `.htaccess` directives. A 500 error may mean a directive is unsupported; remove the offending rule and test again. Headers are best-effort, not guaranteed on InfinityFree.
5. Test HTTPS redirect using InfinityFree control panel / SSL settings; no unconditional redirect was added because proxy configuration can cause redirect loops.

## REQUIRED edits before publishing
- Verify `contact@mariosplaton.gr` is your actual working mailbox in contact.html and el/contact.html. Mailto opens the visitor's email app; it is not an embedded server-side contact form.
- Replace GitHub and LinkedIn homepage URLs in both contact pages with your real profiles; currently they are clearly labeled placeholders.
- For SEO, replace relative `og:image` with your full https:// domain URL (relative images are not consistently recognized by social crawlers). Add canonical and hreflang absolute URLs once your domain is known.
- Run `python generate_sitemap.py https://YOUR-REAL-DOMAIN` locally, upload resulting sitemap.xml, and append its URL to robots.txt. The script is a build helper; **do not upload the Python file** to hosting.
- Check the CV for sensitive information before making it public.
- Project descriptions only use facts from the existing portfolio. Replace illustrative images with verified screenshots and add real source/repository links if desired.

## Security notes
- Static pages do not require WordPress, PHP, a database, or plugins. This package includes none of those.
- `.htaccess` blocks common sensitive paths and backup extensions, disables directory listing, and sets defensive headers where Apache supports them. This does not clean up existing files on your hosting; remove them separately.
- CSP is intentionally strict and permits only local images, scripts, styles and fonts. No third-party analytics or external embeds.
- Never put passwords or API keys in frontend JavaScript.
- Do not upload this README, generate_sitemap.py, or development ZIP to htdocs.
- Live security headers, SSL, accessibility, and performance have not been verified without the live URL/browser tests.
