const EXAMPLES = [
  // HTML5
  { id: "ex-html-semantic", category: "html5", title: "Semantic HTML Template",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Site Name</title>
</head>
<body>
  <header role="banner">
    <a href="#main" class="skip-link">Skip to content</a>
    <nav aria-label="Main">...</nav>
  </header>
  <main id="main">
    <article>
      <header><h1>Article Title</h1></header>
      <section>...</section>
    </article>
  </main>
  <footer role="contentinfo">...</footer>
</body>
</html>` },
  { id: "ex-html-og", category: "html5", title: "Open Graph & Twitter Cards",
    code: `<!-- Open Graph -->
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="A concise description of the page content.">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Your Site Name">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="A concise description.">
<meta name="twitter:image" content="https://example.com/image.jpg">` },

  // CSS3
  { id: "ex-css-grid", category: "css3", title: "CSS Grid Layout",
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  padding: var(--space-md);
}

.item {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}` },
  { id: "ex-css-fluid", category: "css3", title: "Fluid Typography with clamp()",
    code: `:root {
  --text-sm: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2.5rem);
  --text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
}

body { font-size: var(--text-base); }
h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }` },

  // JavaScript
  { id: "ex-js-fetch", category: "javascript", title: "Fetch with Error Handling",
    code: `async function fetchData(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}` },
  { id: "ex-js-debounce", category: "javascript", title: "Debounce Utility",
    code: `function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
}

function throttle(fn, limit = 100) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}` },

  // SwiftUI
  { id: "ex-swiftui-vm", category: "swiftui", title: "SwiftUI ViewModel Pattern",
    code: `import SwiftUI
import Observation

@Observable
final class TaskListViewModel {
  var tasks: [Task] = []
  var isLoading = false
  var error: Error?

  func loadTasks() async {
    isLoading = true
    error = nil
    do {
      tasks = try await api.fetchTasks()
    } catch {
      self.error = error
    }
    isLoading = false
  }
}

struct TaskListView: View {
  @State private var viewModel = TaskListViewModel()

  var body: some View {
    List(viewModel.tasks) { task in
      TaskRow(task: task)
    }
    .task { await viewModel.loadTasks() }
    .overlay {
      if viewModel.isLoading { ProgressView() }
    }
  }
}` },

  // Security
  { id: "ex-sec-csp", category: "security", title: "Strict CSP Header",
    code: `// Recommended CSP header
Content-Security-Policy: default-src 'self';
  script-src 'strict-dynamic' 'nonce-{random}' 'unsafe-inline' https: http:;
  style-src 'self' 'nonce-{random}';
  img-src 'self' https: data:;
  font-src 'self' https: data:;
  object-src 'none';
  base-uri 'none';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  block-all-mixed-content;` },

  // Accessibility
  { id: "ex-a11y-modal", category: "accessibility", title: "Accessible Modal Dialog",
    code: `<!-- Accessible Modal Structure -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  class="modal-backdrop"
>
  <div class="modal-content">
    <h2 id="modal-title">Confirm Action</h2>
    <p id="modal-desc">This action cannot be undone.</p>
    <button class="btn-primary" autofocus>Confirm</button>
    <button class="btn-secondary" data-dismiss>Cancel</button>
  </div>
</div>

<script>
// Focus management
const modal = document.querySelector('[role="dialog"]');
const focusable = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
const firstFocusable = focusable[0];
const lastFocusable = focusable[focusable.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
});
</script>` }
];
