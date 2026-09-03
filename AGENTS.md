# Project Protocols

> [!IMPORTANT]
> Inherits [AGENTS.core.md](AGENTS.core.md). This defines project-specific rules and workflows.

## 0. Architecture

- **Pug Templates (`sources/html/`)**: `_layout/` (base, resources, setup), `_components/` (reusable UI), `_data/` (dynamic content).
- **CSS (`sources/css/`)**: `core/` (base/typography/reset), `components/` (specific to Pug components).
- **Static Assets (`public/`)**: Copied to `dist/` root during build.
- **Design System**: See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## 1. Web Quality Checklist

- **SEO**: Update `public/sitemap.xml` `<lastmod>` on release. Point `public/robots.txt` to sitemap. Maintain `sources/html/_layout/resources/metadata.pug` (OG/Twitter, unique `<title>`). Enforce exactly one `<h1>` per page.
- **A11y**: Maintain skip-link in `base.pug`. Enforce `alt`/`aria-label` on all interactive controls and images.
- **Performance**: Use `preconnect` hints in `styles.pug`. Append `&display=swap` to Google Fonts. Minify HTML/CSS in Vite pipeline.
- **Security**: Maintain standard security headers (CSP, X-Frame-Options, HSTS).
- **Maintenance**: Automated copyright year in `sources/html/_components/footer.pug` renders dynamically.

## 2. Development Workflow

- **Paths**: ALWAYS use the `path` object from `sources/html/_layout/setup/path.pug` (e.g., `path.images`, `path.css`). NO hardcoded relative paths in templates.
- **Build**: Do NOT modify `vite.config.js` if it breaks the "flat" `dist/` structure required for hosting.
- **Browser Subagent**: NEVER execute or launch the `browser_subagent` tool unless the user explicitly instructs to do so.
