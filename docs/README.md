# AEL QA Studio

**Audit · Review · Excel**

A comprehensive quality audit workspace for modern web development. Browse categorized prompts, checklists, standards, knowledge base entries, code examples, and reference links across 13 quality assurance categories.

---

## Features

- **Dashboard** — Overview with statistics and recent activity tracking
- **13 Categories** — HTML5, CSS3, JavaScript, SwiftUI, GitHub, UX, UI, Accessibility, Performance, Security, SEO, Repository, Production
- **Prompts** — Detailed review prompts per category with copy and export
- **Checklists** — Interactive checklists with progress tracking
- **Standards** — Enforceable standards with severity levels (error, warning, info)
- **Knowledge Base** — Concise explanations of core concepts with tags
- **Examples** — Code examples with syntax highlighting and copy
- **References** — Curated links to official docs and best practices
- **Search** — Full-text search across all prompts and knowledge base
- **Export** — Generate Markdown reports from templates
- **Theme** — Light/dark mode with persistence
- **Deep Linking** — Shareable URLs to categories and search results

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/aymanelmasryael/ael-qa-studio.git
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

No build step required. The app runs entirely in the browser.

---

## Project Structure

```
ael-qa-studio/
├── index.html            # Entry point
├── styles.css            # Design system and layout
├── app.js                # Application logic
├── data/
│   ├── categories.js     # Category definitions
│   ├── prompts.js        # Review prompts
│   ├── checklists.js     # Checklist items
│   ├── references.js     # Reference links
│   ├── templates.js      # Report templates
│   ├── knowledge.js      # Knowledge base entries
│   ├── standards.js      # Enforceable standards
│   └── examples.js       # Code examples
├── assets/
│   └── icons/logo.svg    # App logo
└── docs/
    ├── README.md         # This file
    ├── CHANGELOG.md      # Version history
    └── ROADMAP.md        # Planned features
```

---

## Categories

| Category       | Focus Area                                 |
|----------------|--------------------------------------------|
| HTML5          | Semantic markup, SEO, accessibility        |
| CSS3           | Layout, animations, responsive design      |
| JavaScript     | Code quality, performance, security        |
| SwiftUI        | iOS/macOS UI, state management             |
| GitHub         | CI/CD, Actions, Pages, collaboration       |
| UX             | User research, flows, information architecture |
| UI             | Visual design, components, design tokens   |
| Accessibility  | WCAG, ARIA, keyboard navigation            |
| Performance    | Core Web Vitals, optimization, bundling    |
| Security       | OWASP, CSP, secrets management             |
| SEO            | Technical SEO, structured data, content    |
| Repository     | README, license, contributing guide        |
| Production     | Deployment, monitoring, incident response  |

---

## Development

The app uses vanilla JavaScript with no frameworks. To contribute:

1. Edit data files in `data/` to add or modify content
2. Edit `styles.css` for visual changes
3. Edit `app.js` for behavioral changes

---

## License

See [LICENSE](../LICENSE) file.

---

*Built by AEL Digital Studio — ayman@aelstudio.com*
