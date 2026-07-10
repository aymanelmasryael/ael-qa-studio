const STANDARDS = [
  {
    id: "st-html-semantic-landmarks",
    category: "html5",
    title: "Semantic Landmarks",
    standard: "Every page must use <header>, <nav>, <main>, and <footer> landmarks exactly once. Use <section> and <article> for grouped content. Do not nest <main> inside <section>. Each landmark should have a label if there are multiple of the same type.",
    severity: "error"
  },
  {
    id: "st-html-alt-required",
    category: "html5",
    title: "Alt Attributes on All Images",
    standard: "Every <img> element must have an alt attribute. Decorative images use alt=\"\". Informative images use descriptive alt text. Do not use \"image of\" or \"picture of\" as prefixes. SVG icons must have role=\"img\" with aria-label or be hidden with aria-hidden=\"true\".",
    severity: "error"
  },
  {
    id: "st-css-no-important",
    category: "css3",
    title: "No !important",
    standard: "Do not use !important in production CSS. Use specificity and cascade properly. If !important is required temporarily, document with a comment and plan a refactor. The only exception is utility classes for debugging.",
    severity: "warning"
  },
  {
    id: "st-css-responsive-breakpoints",
    category: "css3",
    title: "Standard Breakpoints",
    standard: "Use these breakpoints: mobile: 320–480px, tablet: 768–1024px, desktop: 1024–1440px, wide: >1440px. Use min-width (mobile-first) for media queries. Do not target specific devices — target viewport ranges.",
    severity: "info"
  },
  {
    id: "st-js-strict-mode",
    category: "javascript",
    title: "Always Use Strict Mode",
    standard: "All JavaScript modules should run in strict mode (implied in ES modules via type=\"module\"). Strict mode catches common bugs: silent assignment errors, NaN, mutable __proto__, duplicate parameter names, and more. In scripts, declare 'use strict'; at the top.",
    severity: "error"
  },
  {
    id: "st-js-no-eval",
    category: "javascript",
    title: "Never Use eval()",
    standard: "eval() is forbidden. It executes arbitrary code in the caller's scope, creates performance issues (prevents JIT optimization), and opens XSS vectors. Alternatives: JSON.parse() for JSON, Function constructor only with CSP nonces if absolutely necessary.",
    severity: "error"
  },
  {
    id: "st-ux-confirmation-destructive",
    category: "ux",
    title: "Confirm Destructive Actions",
    standard: "Any action that cannot be undone (delete, archive, remove, clear) must show a confirmation dialog with the action name and affected item. Include a cancel option. For bulk operations, show the count of affected items.",
    severity: "error"
  },
  {
    id: "st-ui-color-contrast",
    category: "ui",
    title: "Color Contrast Compliance",
    standard: "All text and interactive elements must meet WCAG AA contrast: 4.5:1 for body text, 3:1 for large text (≥18px bold or ≥24px regular). Focus indicators must have 3:1 contrast against adjacent colors. Use semantic color tokens, not hardcoded hex values.",
    severity: "error"
  },
  {
    id: "st-a11y-keyboard-accessible",
    category: "accessibility",
    title: "Full Keyboard Accessibility",
    standard: "All functionality must be operable via keyboard alone. Tab order follows visual layout. Interactive elements receive visible focus. No keyboard traps. Custom widgets follow ARIA Authoring Practices for expected keyboard behavior. Skip link provided at top of page.",
    severity: "error"
  },
  {
    id: "st-a11y-aria-no-redundant",
    category: "accessibility",
    title: "No Redundant ARIA",
    standard: "Do not add ARIA roles that duplicate native semantics. E.g., role=\"button\" on a <button>, role=\"heading\" on an <h1>, role=\"link\" on an <a>. Redundant ARIA causes confusion in some screen readers and adds maintenance burden without benefit.",
    severity: "warning"
  },
  {
    id: "st-perf-lcp-optimize",
    category: "performance",
    title: "Optimize LCP Element",
    standard: "The LCP element (usually hero image, heading, or video poster) must be identified and optimized. Preload the LCP image with <link rel=\"preload\">. Ensure it is not lazy-loaded. Serve in modern formats (WebP/AVIF). Compress to <100KB where possible.",
    severity: "error"
  },
  {
    id: "st-perf-no-render-blocking",
    category: "performance",
    title: "Eliminate Render-Blocking Resources",
    standard: "All CSS must be either inlined (critical path) or loaded asynchronously. All render-blocking CSS is eliminated. JavaScript uses async or defer. Third-party scripts load asynchronously and do not block rendering.",
    severity: "error"
  },
  {
    id: "st-sec-csp-deploy",
    category: "security",
    title: "Content Security Policy Required",
    standard: "Every production deployment must include a Content Security Policy header. Start with report-only mode, then enforce. Use strict-dynamic for scripts. Block eval. Use nonces or hashes, not 'unsafe-inline'. Include upgrade-insecure-requests.",
    severity: "error"
  },
  {
    id: "st-sec-no-secrets",
    category: "security",
    title: "No Secrets in Source Code",
    standard: "API keys, tokens, passwords, certificates, and other secrets must never be committed. Use environment variables. Add .env to .gitignore. Use secret scanning (pre-commit hooks, CI). Rotate secrets immediately if exposed.",
    severity: "error"
  },
  {
    id: "st-repo-license-required",
    category: "repository",
    title: "LICENSE File Required",
    standard: "Every public repository must include a LICENSE file. Choose an OSI-approved license. MIT is recommended for most projects. Apache-2.0 if patent protection is needed. GPL for copyleft. Private repos may omit but should document usage terms.",
    severity: "error"
  },
  {
    id: "st-seo-canonical",
    category: "seo",
    title: "Canonical URL Every Page",
    standard: "Every page must have a self-referencing canonical URL in the <head>. For duplicate content (e.g., pagination, print versions), canonical to the primary URL. Use absolute URLs. Ensure consistent www vs non-www, http vs https.",
    severity: "error"
  },
  {
    id: "st-prod-health-check",
    category: "production",
    title: "Health Check Endpoint",
    standard: "Every service must expose a /health or /healthz endpoint returning 200 OK with status. It should verify connectivity to critical dependencies (database, cache, external APIs). Liveness vs readiness probes should be separate if used in orchestration.",
    severity: "error"
  },
  {
    id: "st-swiftui-navigationstack",
    category: "swiftui",
    title: "Use NavigationStack (iOS 16+)",
    standard: "Use NavigationStack instead of NavigationView for iOS 16+ targets. NavigationStack provides path-based navigation state management, better deep linking support, and programmatic navigation control. NavigationView is deprecated.",
    severity: "warning"
  }
];
