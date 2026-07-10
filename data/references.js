const REFERENCES = [
  // HTML5
  { id: "w3c-html",       category: "html5", title: "W3C HTML Spec",     url: "https://html.spec.whatwg.org/" },
  { id: "mdn-semantic",   category: "html5", title: "MDN Semantic HTML", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" },
  { id: "mdn-seo",        category: "html5", title: "MDN SEO",           url: "https://developer.mozilla.org/en-US/docs/Glossary/SEO" },
  { id: "schema-org",     category: "html5", title: "Schema.org",        url: "https://schema.org/" },
  { id: "wcag",           category: "html5", title: "WCAG 2.2",          url: "https://www.w3.org/TR/WCAG22/" },
  { id: "mdn-aria",       category: "html5", title: "MDN ARIA",          url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" },
  { id: "mdn-performance",category: "html5", title: "MDN Performance",   url: "https://developer.mozilla.org/en-US/docs/Web/Performance" },
  { id: "w3c-wai",        category: "html5", title: "W3C WAI",           url: "https://www.w3.org/WAI/" },
  { id: "web-dev-cwv",    category: "html5", title: "Core Web Vitals",   url: "https://web.dev/articles/vitals" },

  // CSS3
  { id: "mdn-flexbox",    category: "css3",  title: "MDN Flexbox",       url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout" },
  { id: "mdn-grid",       category: "css3",  title: "MDN Grid",          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" },
  { id: "css-tricks",     category: "css3",  title: "CSS-Tricks Guides", url: "https://css-tricks.com/guides/" },
  { id: "web-dev-animate",category: "css3",  title: "Web Animations",    url: "https://web.dev/articles/animations" },
  { id: "web-dev-responsive",category: "css3",title: "Responsive Design",url: "https://web.dev/articles/responsive-web-design-basics" },
  { id: "mdn-animations", category: "css3",  title: "MDN Animations",    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations" },
  { id: "mdn-responsive", category: "css3",  title: "MDN Responsive",    url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" },
  { id: "material-3",     category: "css3",  title: "Material 3",       url: "https://m3.material.io/" },
  { id: "apple-hig",      category: "css3",  title: "Apple HIG",         url: "https://developer.apple.com/design/human-interface-guidelines/" },

  // JavaScript
  { id: "mdn-js",         category: "javascript", title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { id: "google-js-style",category: "javascript", title: "Google JS Style Guide", url: "https://google.github.io/styleguide/jsguide.html" },
  { id: "web-dev-js-perf",category: "javascript", title: "JS Performance", url: "https://web.dev/articles/optimizing-content-efficiency-javascript" },
  { id: "owasp-xss",      category: "javascript", title: "OWASP XSS",     url: "https://owasp.org/www-community/attacks/xss/" },
  { id: "mdn-csp",        category: "javascript", title: "MDN CSP",        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" },
  { id: "csp-evaluator",  category: "javascript", title: "CSP Evaluator",  url: "https://csp-evaluator.withgoogle.com/" },

  // UX
  { id: "nngroup",        category: "ux",    title: "NN Group",          url: "https://www.nngroup.com/articles/" },
  { id: "nngroup-flow",   category: "ux",    title: "NN Group UX Flows", url: "https://www.nngroup.com/topic/user-flows/" },
  { id: "nngroup-ia",     category: "ux",    title: "NN Group IA",       url: "https://www.nngroup.com/topic/information-architecture/" },
  { id: "interaction-design",category: "ux", title: "Interaction Design Foundation", url: "https://www.interaction-design.org/" },
  { id: "baymard",        category: "ux",    title: "Baymard Institute", url: "https://baymard.com/" },

  // UI
  { id: "radix-ui",       category: "ui",    title: "Radix UI Primitives",  url: "https://www.radix-ui.com/" },
  { id: "headless-ui",    category: "ui",    title: "Headless UI",          url: "https://headlessui.com/" },
  { id: "design-tokens",  category: "ui",    title: "Design Tokens W3C",    url: "https://www.w3.org/community/design-tokens/" },
  { id: "w3c-dtcg",       category: "ui",    title: "Design Tokens CG",     url: "https://www.w3.org/groups/cg/design-tokens/" },

  // Accessibility
  { id: "w3c-wai-aria",   category: "accessibility", title: "W3C ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/" },
  { id: "w3c-keyboard",   category: "accessibility", title: "Keyboard Navigation", url: "https://www.w3.org/WAI/test-evaluate/preliminary/#keyboard" },
  { id: "web-dev-keyboard",category: "accessibility", title: "Web Keyboard Dev", url: "https://web.dev/articles/keyboard-access" },

  // Performance
  { id: "web-dev-images", category: "performance", title: "Web Dev Images", url: "https://web.dev/articles/image-optimization" },
  { id: "mdn-image",      category: "performance", title: "MDN Image Perf", url: "https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia" },
  { id: "web-dev-fonts",  category: "performance", title: "Web Dev Fonts",  url: "https://web.dev/articles/optimizing-content-efficiency-webfonts" },
  { id: "mdn-font-face",  category: "performance", title: "MDN @font-face", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face" },

  // Security
  { id: "owasp-top10",        category: "security", title: "OWASP Top 10 2025", url: "https://owasp.org/www-project-top-ten/" },
  { id: "owasp-cheatsheet",   category: "security", title: "OWASP Cheat Sheet", url: "https://cheatsheetseries.owasp.org/" },
  { id: "owasp-secrets",      category: "security", title: "OWASP Secrets",     url: "https://owasp.org/www-project-secret-management/" },
  { id: "github-secret-scanning",category: "security", title: "GitHub Secret Scanning", url: "https://docs.github.com/code-security/secret-scanning" },

  // Repository
  { id: "make-readme",        category: "repository", title: "Make a README",     url: "https://www.makeareadme.com/" },
  { id: "github-docs",        category: "repository", title: "GitHub Docs",       url: "https://docs.github.com/" },
  { id: "github-community",   category: "repository", title: "GitHub Community",  url: "https://docs.github.com/communities" },
  { id: "semver",             category: "repository", title: "Semantic Versioning",url: "https://semver.org/" },
  { id: "choose-license",     category: "repository", title: "Choose a License",  url: "https://choosealicense.com/" },
  { id: "fsf-license",        category: "repository", title: "FSF Licenses",      url: "https://www.gnu.org/licenses/licenses.html" },

  // SEO
  { id: "google-seo",         category: "seo",    title: "Google SEO Starter",    url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { id: "google-seo-content", category: "seo",    title: "Google SEO Content",    url: "https://developers.google.com/search/docs/appearance/site-appearance" },
  { id: "google-structured",  category: "seo",    title: "Google Structured Data",url: "https://developers.google.com/search/docs/appearance/structured-data" },
  { id: "moz-beginners",      category: "seo",    title: "Moz SEO Beginners",     url: "https://moz.com/beginners-guide-to-seo" },

  // Production
  { id: "github-actions",     category: "production", title: "GitHub Actions Docs", url: "https://docs.github.com/actions" },
  { id: "12factor",           category: "production", title: "12 Factor App",       url: "https://12factor.net/" },
  { id: "google-devops",      category: "production", title: "Google DevOps",       url: "https://www.devops-resources.com" },
  { id: "o11y",               category: "production", title: "Observability Guide", url: "https://www.honeycomb.io/observability-guide" },
  { id: "google-sre",         category: "production", title: "Google SRE",          url: "https://sre.google/" },
  { id: "pagerduty-irc",      category: "production", title: "PagerDuty IR",        url: "https://www.pagerduty.com/incident-response/" },

  // SwiftUI
  { id: "apple-swiftui-layout",category: "swiftui", title: "Apple SwiftUI Layout", url: "https://developer.apple.com/documentation/swiftui/view-layout" },
  { id: "hws-swiftui",        category: "swiftui", title: "HWS SwiftUI",           url: "https://www.hackingwithswift.com/swiftui" },
  { id: "apple-swiftui-state",category: "swiftui", title: "Apple SwiftUI State",   url: "https://developer.apple.com/documentation/swiftui/state" },
  { id: "hws-state",          category: "swiftui", title: "HWS State Management",  url: "https://www.hackingwithswift.com/books/ios-swiftui/managing-state" }
];
