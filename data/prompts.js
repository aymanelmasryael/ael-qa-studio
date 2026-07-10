const PROMPTS = [
  // ── HTML5 ──────────────────────────────────────────────
  { id: "html-semantic",   category: "html5",  title: "Semantic HTML Review",
    prompt: "Review the following HTML for semantic correctness. Identify non-semantic elements (div, span) that should be replaced with semantic alternatives (header, nav, main, section, article, aside, footer). Check heading hierarchy (h1-h6), landmark roles, and ensure the document outline makes sense without CSS.",
    references: ["w3c-html", "mdn-semantic"] },
  { id: "html-seo",        category: "html5",  title: "HTML SEO Audit",
    prompt: "Audit this HTML for SEO best practices. Check: title tag (unique, 50-60 chars), meta description (130-160 chars), canonical URL, Open Graph tags (og:title, og:desc, og:image, og:url), Twitter Card tags, heading hierarchy, image alt attributes, structured data (JSON-LD), sitemap link, robots meta tag.",
    references: ["mdn-seo", "schema-org"] },
  { id: "html-access",     category: "html5",  title: "HTML Accessibility Review",
    prompt: "Review this HTML for accessibility issues. Check: proper form labels, ARIA attributes (role, aria-label, aria-expanded, aria-controls), focus management, skip navigation link, color contrast on text, image alt text, keyboard navigability, screen reader announcements, error message association.",
    references: ["wcag", "mdn-aria"] },
  { id: "html-performance",category: "html5",  title: "HTML Structure Audit",
    prompt: "Audit the HTML document structure for performance. Check: CSS and JS loading order (render-blocking resources), async/defer attributes, preload/preconnect hints, critical CSS inline, lazy loading for images (loading='lazy'), font display swap, minimal DOM depth, viewport meta tag correctness.",
    references: ["mdn-performance", "w3c-html"] },

  // ── CSS3 ───────────────────────────────────────────────
  { id: "css-layout",      category: "css3",   title: "CSS Layout Review",
    prompt: "Review the CSS layout approach. Evaluate: Flexbox vs Grid usage, responsive breakpoints, container queries, positioning (relative, absolute, fixed, sticky), z-index stacking context, overflow handling, min-height/max-width patterns, box-sizing consistency, alignment methods (margin auto, gap, justify/align properties).",
    references: ["mdn-flexbox", "mdn-grid", "css-tricks"] },
  { id: "css-animations",  category: "css3",   title: "CSS Animation Audit",
    prompt: "Review CSS animations and transitions for performance and UX. Check: use transform/opacity-only animations (GPU-accelerated), will-change hints, animation timing functions, reduced-motion media query, framerate-friendly properties, transition duration consistency, animation loading states, prefers-reduced-motion support.",
    references: ["mdn-animations", "web-dev-animate"] },
  { id: "css-responsive",  category: "css3",   title: "Responsive Design Review",
    prompt: "Review responsive implementation. Check: mobile-first vs desktop-first approach, breakpoint coverage (mobile 320-480, tablet 768-1024, desktop 1024+), fluid typography (clamp()), flexible images (max-width:100%), viewport meta, touch target sizes (min 44px), orientation support, print stylesheet.",
    references: ["mdn-responsive", "web-dev-responsive"] },

  // ── JavaScript ─────────────────────────────────────────
  { id: "js-quality",      category: "javascript", title: "JavaScript Code Review",
    prompt: "Review JavaScript code for quality and maintainability. Check: naming conventions (camelCase, PascalCase), function purity, side effects, error handling (try/catch, error boundaries), async/await patterns, Promise handling, null/undefined checks, type coercion awareness, strict mode, JSDoc comments, module pattern (import/export), dead code removal.",
    references: ["mdn-js", "google-js-style"] },
  { id: "js-performance",  category: "javascript", title: "JavaScript Performance Audit",
    prompt: "Audit JavaScript performance. Check: DOM manipulation batching, event delegation, debounce/throttle for scroll/resize, requestAnimationFrame for animations, Web Worker for heavy computation, lazy loading modules, bundle size analysis, tree shaking, code splitting, memory leak detection (timers, listeners, closures), long task splitting.",
    references: ["mdn-performance", "web-dev-js-perf"] },
  { id: "js-security",     category: "javascript", title: "JavaScript Security Review",
    prompt: "Review JavaScript for security vulnerabilities. Check: XSS prevention (innerHTML vs textContent), Content Security Policy headers, DOM clobbering, prototype pollution, eval/Function usage (avoid), third-party dependency audit, sensitive data exposure, localStorage/sessionStorage for non-sensitive data only, input sanitization, postMessage origin validation.",
    references: ["owasp-xss", "mdn-csp"] },

  // ── UX ─────────────────────────────────────────────────
  { id: "ux-research",     category: "ux",     title: "UX Research Review",
    prompt: "Review UX research methodology. Check: user persona quality, problem statement clarity, research method selection (interviews, surveys, usability testing, analytics), sample size adequacy, bias mitigation, data synthesis approach (affinity mapping, journey mapping), findings documentation, actionable recommendations, impact/effort prioritization.",
    references: ["nngroup", "interaction-design"] },
  { id: "ux-flow",         category: "ux",     title: "User Flow Audit",
    prompt: "Audit user flows for friction points. Check: task completion paths, number of steps per task, error recovery paths, empty states, loading states, confirmation dialogs, undo/redo support, progressive disclosure, cognitive load per screen, back/forward navigation consistency, onboarding flow completeness.",
    references: ["nngroup-flow", "baymard"] },
  { id: "ux-information",  category: "ux",     title: "Information Architecture Review",
    prompt: "Review information architecture. Check: navigation structure depth vs breadth, labeling clarity, search functionality, categorization logic, content hierarchy, breadcrumb trails, sitemap completeness, findability of key features, cross-linking, content inventory completeness, IA scalability for future content.",
    references: ["nngroup-ia", "interaction-design"] },

  // ── UI ─────────────────────────────────────────────────
  { id: "ui-visual",       category: "ui",     title: "Visual Design Review",
    prompt: "Review visual design implementation. Check: color palette adherence (primary, secondary, accent, neutral, semantic), typography scale (typeface, weight, size, line-height), spacing system (4px/8px grid), border radius consistency, shadow depth hierarchy, icon style uniformity, brand alignment, visual hierarchy effectiveness.",
    references: ["material-3", "apple-hig"] },
  { id: "ui-components",   category: "ui",     title: "UI Component Audit",
    prompt: "Audit UI component library. Check: component completeness (buttons, inputs, modals, toggles, dropdowns, tables, cards, tabs, accordions), state coverage (default, hover, active, focus, disabled, loading, error), prop API consistency, composition pattern, responsive behavior, theme token integration, accessibility props, documentation quality.",
    references: ["radix-ui", "headless-ui"] },
  { id: "ui-design-tokens",category: "ui",     title: "Design Token Review",
    prompt: "Review design token system. Check: token naming convention (category-concept-variant), color token coverage (bg, text, border, interactive, semantic), spacing scale (4pt base), typography tokens (desktop, mobile), shadow/elevation tokens, animation timing tokens, breakpoint tokens, dark mode token overrides, token documentation, tool integration (style-dictionary).",
    references: ["design-tokens", "w3c-dtcg"] },

  // ── Accessibility ──────────────────────────────────────
  { id: "a11y-wcag",       category: "accessibility", title: "WCAG Compliance Audit",
    prompt: "Audit for WCAG 2.2 compliance at Level AA. Check: color contrast (4.5:1 normal, 3:1 large text), keyboard navigation (visible focus, logical tab order), screen reader announcements (live regions, aria-live), form error identification and suggestions, touch target size (min 44x44px), motion/animation respect (prefers-reduced-motion), caption/media alternatives, consistent navigation.",
    references: ["wcag", "w3c-wai"] },
  { id: "a11y-aria",       category: "accessibility", title: "ARIA Implementation Review",
    prompt: "Review ARIA implementation correctness. Check: ARIA roles match semantic HTML (no redundant roles), aria-label/aria-labelledby usage, aria-expanded/aria-controls for accordions/tabs, aria-live regions for dynamic content, role='alert' for errors, aria-hidden on decorative icons, focus trapping in modals, aria-selected for listbox/tab, accessible name computation.",
    references: ["mdn-aria", "w3c-wai-aria"] },
  { id: "a11y-keyboard",   category: "accessibility", title: "Keyboard Navigation Audit",
    prompt: "Audit keyboard navigation. Focus order must follow visual order (DOM order). All interactive elements reachable via Tab. Use Arrow keys for lists/tabs/grids. Escape closes modals/dropdowns. Enter/Space activates buttons/links. Visible focus indicator (min 2px offset). No keyboard traps. Skip to content link present and functional.",
    references: ["w3c-keyboard", "web-dev-keyboard"] },

  // ── Performance ────────────────────────────────────────
  { id: "perf-cwv",        category: "performance", title: "Core Web Vitals Audit",
    prompt: "Audit Core Web Vitals: LCP < 2.5s (largest contentful paint — optimize images, preload key resources, eliminate render-blocking), FID/INP < 200ms (first input delay / interaction to next paint — break up long tasks, use web workers), CLS < 0.1 (cumulative layout shift — set explicit dimensions for images/ads, avoid inserting content above fold).",
    references: ["web-dev-cwv", "mdn-performance"] },
  { id: "perf-images",     category: "performance", title: "Image Optimization Audit",
    prompt: "Audit image optimization. Check: modern formats (WebP, AVIF), responsive images (srcset + sizes), lazy loading (loading='lazy'), proper dimensions (no layout shift), CDN delivery, compression level, image CDN usage, placeholder/blur-up technique, sprite/icons optimization (SVG sprite vs icon font), caching strategy, preload hero images.",
    references: ["web-dev-images", "mdn-image"] },
  { id: "perf-fonts",      category: "performance", title: "Font Loading Audit",
    prompt: "Audit font loading strategy. Check: font-display: swap (or optional), preconnect to font CDN, preload critical fonts, subset fonts for Latin-only, variable fonts to reduce file count, font size in KB (ideally < 100KB per weight), self-hosted vs CDN, FOIT/FOUT behavior, icon font vs SVG icons (prefer SVG), unicode-range subsetting.",
    references: ["web-dev-fonts", "mdn-font-face"] },

  // ── Security ───────────────────────────────────────────
  { id: "sec-owasp",       category: "security", title: "OWASP Top 10 Audit",
    prompt: "Audit application against OWASP Top 10 2025. Check: A01 Broken Access Control (authorization checks, role enforcement), A02 Cryptographic Failures (HTTPS, hashed passwords, encrypted secrets), A03 Injection (SQL, NoSQL, XSS, command injection — use parameterized queries/escaping), A04 Insecure Design (rate limiting, input validation on server), A05 Security Misconfiguration (default credentials, unnecessary features, verbose errors), A06 Vulnerable Components (dependency audit, CVE checking), A07 Auth Failures (MFA, session management, brute force protection), A08 Data Integrity Failures (CSP, SRI, signed JWTs), A09 Logging Failures (audit trail, monitoring, alerting), A10 SSRF (URL validation, network segmentation).",
    references: ["owasp-top10", "owasp-cheatsheet"] },
  { id: "sec-csp",         category: "security", title: "Content Security Policy Review",
    prompt: "Review Content Security Policy headers. Check: script-src (strict-dynamic, nonces vs hashes, avoid 'unsafe-inline'), style-src, img-src, connect-src, frame-src, object-src (restrict to 'none'), base-uri, form-action, report-uri/report-to, CSP level 3 features, upgrade-insecure-requests, blocking vs report-only mode, violation monitoring setup.",
    references: ["mdn-csp", "csp-evaluator"] },
  { id: "sec-secrets",     category: "security", title: "Secrets & Credentials Audit",
    prompt: "Audit for secrets exposure. Check: no hardcoded API keys, tokens, or passwords in source code, .env files in .gitignore, secret scanning (GitHub secret scanning, trufflehog, git-secrets), environment variable usage, secret rotation policy, build-time vs runtime secrets, least-privilege access for tokens, secret vault usage (HashiCorp, AWS Secrets), pre-commit hooks for secret detection.",
    references: ["owasp-secrets", "github-secret-scanning"] },

  // ── Repository ─────────────────────────────────────────
  { id: "repo-readme",     category: "repository", title: "README Quality Review",
    prompt: "Review README.md quality. Check: project title and description, installation instructions, usage examples, API documentation, configuration guide, contributing guidelines, license information, badges (CI status, coverage, version, license), table of contents for long READMEs, screenshots/demo GIFs, troubleshooting section, link to full documentation, consistent tone, spelling/grammar.",
    references: ["make-readme", "github-docs"] },
  { id: "repo-structure",  category: "repository", title: "Repository Structure Audit",
    prompt: "Audit repository structure and practices. Check: .gitignore completeness, CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, CHANGELOG.md (Keep a Changelog format), LICENSE file, ISSUE_TEMPLATE and PULL_REQUEST_TEMPLATE, CI/CD workflow (GitHub Actions or similar), branch protection rules, semantic versioning, conventional commits, Dependabot/enovate config, CODEOWNERS file.",
    references: ["github-community", "semver"] },
  { id: "repo-license",    category: "repository", title: "License Compliance Review",
    prompt: "Review license compliance. Check: LICENSE file present and correctly named, license type matches project goals (MIT for permissive, GPL for copyleft, Apache for patent protection), copyright holder and year accurate, third-party dependency licenses compatibility, license header in source files (where required), dual licensing considerations, trademark protection.",
    references: ["choose-license", "fsf-license"] },

  // ── SEO ────────────────────────────────────────────────
  { id: "seo-technical",   category: "seo",     title: "Technical SEO Audit",
    prompt: "Audit technical SEO foundations. Check: XML sitemap presence and freshness, robots.txt correctness (allow/disallow, sitemap reference), canonical URLs (self-referencing, cross-domain), hreflang tags for multilingual sites, meta robots tags (index/noindex, follow/nofollow), pagination (rel=prev/next), 301 redirects (no 302 for permanent moves), 404 handling, HTTPS enforcement, www vs non-www consistency.",
    references: ["google-seo", "mdn-seo"] },
  { id: "seo-structured",  category: "seo",     title: "Structured Data Audit",
    prompt: "Audit structured data implementation. Check: JSON-LD format (preferred over microdata), relevant schema types (Organization, WebSite, Article, Product, FAQ, BreadcrumbList, LocalBusiness), required fields per schema type, valid values (no placeholder text), schema.org validator passing, Google Rich Results test passing, multiple entities properly connected (@id references), breadcrumb structured data, site name structured data.",
    references: ["schema-org", "google-structured"] },
  { id: "seo-content",     category: "seo",     title: "Content SEO Review",
    prompt: "Review content for SEO optimization. Check: keyword research integration, title tag optimization (primary keyword near start), H1-H2-H3 hierarchy with keyword themes, content length vs topic depth, internal linking strategy, external link quality, image alt text optimization, video schema, FAQ schema for question pages, content freshness/updates, competitor content gap analysis.",
    references: ["google-seo-content", "moz-beginners"] },

  // ── Production ─────────────────────────────────────────
  { id: "prod-deploy",     category: "production", title: "Deployment Pipeline Review",
    prompt: "Review deployment pipeline. Check: CI/CD workflow completeness (lint, test, build, deploy stages), environment separation (dev, staging, production), deployment strategy (blue-green, canary, rolling), rollback procedure (automated, tested), database migration handling, feature flags for gradual rollout, health checks post-deployment, monitoring/alerting integration, deployment notifications, SLA/SLO targets.",
    references: ["github-actions", "12factor"] },
  { id: "prod-monitoring", category: "production", title: "Monitoring & Observability Audit",
    prompt: "Audit monitoring and observability setup. Check: API endpoint monitoring (uptime, latency, error rate), browser monitoring (Core Web Vitals, JS errors), log aggregation and search, structured logging (JSON format), alert thresholds and escalation, dashboard coverage (business, technical, user), distributed tracing (if microservices), synthetic monitoring, error tracking (Sentry, Rollbar), user session replay, real user monitoring (RUM).",
    references: ["google-devops", "o11y"] },
  { id: "prod-incident",   category: "production", title: "Incident Response Review",
    prompt: "Review incident response readiness. Check: incident response plan documentation, severity classification matrix (P0-P4), response team contact list (on-call rotation), communication templates (status page, stakeholder updates), runbook quality and freshness, post-mortem process (blameless, action-oriented), incident metrics (MTTD, MTTR, MTBF), training/drills frequency, tool readiness (PagerDuty, Opsgenie).",
    references: ["google-sre", "pagerduty-irc"] },

  // ── SwiftUI ────────────────────────────────────────────
  { id: "swiftui-layout",  category: "swiftui", title: "SwiftUI Layout Review",
    prompt: "Review SwiftUI layout implementation. Check: VStack/HStack/ZStack usage, alignment guides, GeometryReader minimal usage, SwiftUI layout priority, fixed vs flexible sizing, List/Form vs ScrollView choice, lazy stacks (LazyVStack, LazyHStack) for long content, safe area handling, dynamic type support, accessibility modifiers, navigationStack vs NavigationView.",
    references: ["apple-swiftui-layout", "hws-swiftui"] },
  { id: "swiftui-state",   category: "swiftui", title: "SwiftUI State Management Review",
    prompt: "Review SwiftUI state management. Check: @State vs @Binding vs @StateObject vs @ObservedObject vs @EnvironmentObject, proper ObservableObject conformance, @Published property usage, MVVM architecture, dependency injection, side effects handling (onAppear, task), Combine integration, async/await support, persistence (@AppStorage, CoreData, SwiftData), preview providers with mock data.",
    references: ["apple-swiftui-state", "hws-state"] }
];

// Helper: get prompts by category
function getPromptsByCategory(catId) {
  return PROMPTS.filter(p => p.category === catId);
}
// Helper: search prompts
function searchPrompts(query) {
  const q = query.toLowerCase();
  return PROMPTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.prompt.toLowerCase().includes(q)
  );
}
