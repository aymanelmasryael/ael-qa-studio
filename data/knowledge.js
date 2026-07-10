const KNOWLEDGE_BASE = [
  {
    id: "k-html5-doctype",
    category: "html5",
    title: "Always use `<!DOCTYPE html>`",
    body: "The HTML5 doctype is required for standards mode rendering. Without it, browsers fall back to quirks mode, causing inconsistent layout and rendering behavior across browsers.",
    tags: ["doctype", "quirks-mode", "standards-mode"]
  },
  {
    id: "k-css-specificity",
    category: "css3",
    title: "CSS Specificity Scoring",
    body: "Specificity is calculated as (inline styles, IDs, classes/pseudo-classes, elements/pseudo-elements). Avoid using !important — it breaks the natural cascade and makes overrides impossible. Use BEM or similar naming to keep specificity flat.",
    tags: ["cascade", "bem", "important"]
  },
  {
    id: "k-js-event-loop",
    category: "javascript",
    title: "JavaScript Event Loop",
    body: "JavaScript runs on a single thread. Async operations (fetch, setTimeout, Promises) use the event loop. Microtasks (Promise.then) execute before macrotasks (setTimeout, DOM events). Understanding this order prevents timing bugs.",
    tags: ["async", "microtask", "macrotask", "promise"]
  },
  {
    id: "k-ux-hicks-law",
    category: "ux",
    title: "Hick's Law & Choice Overload",
    body: "Decision time increases logarithmically with the number of choices. For UI, limit options to 5-7 per screen. Use progressive disclosure for advanced options. This applies to menus, forms, and feature lists.",
    tags: ["decision", "complexity", "progressive-disclosure"]
  },
  {
    id: "k-ui-8px-grid",
    category: "ui",
    title: "8px Grid System",
    body: "Use multiples of 8px for margins, paddings, and element dimensions (4px for fine-grained spacing). This ensures visual rhythm and alignment. Major UI frameworks (Material, Bootstrap) follow this convention.",
    tags: ["spacing", "rhythm", "consistency"]
  },
  {
    id: "k-a11y-contrast",
    category: "accessibility",
    title: "WCAG Color Contrast Ratios",
    body: "Normal text needs 4.5:1 contrast ratio against its background. Large text (≥18px bold or ≥24px regular) needs 3:1. UI components and graphical objects need 3:1. Use tools like WebAIM Contrast Checker to verify.",
    tags: ["contrast", "wcag", "color"]
  },
  {
    id: "k-perf-cwv-targets",
    category: "performance",
    title: "Core Web Vitals Targets",
    body: "LCP (Largest Contentful Paint): < 2.5s. FID (First Input Delay): < 100ms. CLS (Cumulative Layout Shift): < 0.1. These are Google ranking signals. Measure using Lighthouse, PageSpeed Insights, or Chrome UX Report.",
    tags: ["lcp", "fid", "cls", "seo"]
  },
  {
    id: "k-sec-xss-types",
    category: "security",
    title: "Three Types of XSS",
    body: "1) Stored XSS: malicious script saved to server. 2) Reflected XSS: script in URL/request reflected in response. 3) DOM-based XSS: client-side script writes user input to DOM unsafely. Prevent with CSP, output encoding, and safe DOM APIs.",
    tags: ["xss", "injection", "csp"]
  },
  {
    id: "k-repo-readme-importance",
    category: "repository",
    title: "README is Your Project's Resume",
    body: "A README is often the first thing people see. It should answer: What is this? Why use it? How do I start? Badges show health (CI, coverage, version). Clear installation steps reduce friction. Well-documented APIs onboard contributors faster.",
    tags: ["documentation", "onboarding", "community"]
  },
  {
    id: "k-seo-structured-data-benefits",
    category: "seo",
    title: "Structured Data Enables Rich Results",
    body: "JSON-LD structured data helps search engines understand content. It enables rich results: FAQ snippets, recipe cards, review stars, breadcrumbs, product info, events. Implement with Schema.org types and validate with Google Rich Results Test.",
    tags: ["json-ld", "schema.org", "rich-snippets"]
  },
  {
    id: "k-prod-12factor",
    category: "production",
    title: "The Twelve-Factor App",
    body: "Methodology for building SaaS apps: 1) Codebase — one repo per app. 2) Dependencies — explicit declaration. 3) Config — stored in env vars. 4) Backing services — treated as attached resources. 5) Build/release/run — strict separation. 6) Processes — stateless. 7) Port binding — self-contained. 8) Concurrency — scale via processes. 9) Disposability — fast startup/graceful shutdown. 10) Dev/prod parity — keep environments similar. 11) Logs — treat as event streams. 12) Admin processes — run as one-off tasks.",
    tags: ["methodology", "saas", "best-practices"]
  },
  {
    id: "k-swiftui-obs",
    category: "swiftui",
    title: "ObservableObject vs @State vs @Binding",
    body: "@State: local value type state in a single view. @Binding: read/write access to @State from child views. ObservableObject: reference type for shared state across multiple views, published via @Published. Use @StateObject for ownership, @ObservedObject for passing in, @EnvironmentObject for shared context.",
    tags: ["state", "data-flow", "property-wrappers"]
  }
];
