/* ============================================================
   AEL QA Studio — Application Logic
   AEL Digital Studio · Audit · Review · Excel
   ============================================================ */

/* ── 1. State ─────────────────────────────────────────────── */

const state = {
  currentView: 'dashboard',
  currentCategory: null,
  currentTab: 'prompts',
  searchQuery: '',
  theme: localStorage.getItem('ael-qa-theme') || 'light',
  recentActivity: JSON.parse(localStorage.getItem('ael-qa-recent') || '[]'),
  stats: {
    categories: CATEGORIES.length,
    prompts: PROMPTS.length,
    checklists: CHECKLISTS.length,
    standards: STANDARDS.length
  }
};

/* ── 2. DOM References ────────────────────────────────────── */

const dom = {
  themeToggle: document.getElementById('theme-toggle'),
  categoryNav: document.getElementById('category-nav'),
  dashboardView: document.getElementById('dashboard-view'),
  categoryView: document.getElementById('category-view'),
  searchView: document.getElementById('search-view'),
  categoryIcon: document.getElementById('category-icon'),
  categoryName: document.getElementById('category-name'),
  categoryDesc: document.getElementById('category-desc'),
  categoryTabs: document.getElementById('category-tabs'),
  categoryContent: document.getElementById('category-content'),
  statsGrid: document.getElementById('stats-grid'),
  recentList: document.getElementById('recent-list'),
  searchInput: document.getElementById('search-input'),
  searchResults: document.getElementById('search-results')
};

/* ── 3. Utilities ─────────────────────────────────────────── */

function escapeHtml(str) {
  if (!str) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, function (ch) { return map[ch]; });
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(context, args); }, delay);
  };
}

function getCategoryById(id) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === id) return CATEGORIES[i];
  }
  return null;
}

function getCategoryNameById(id) {
  var cat = getCategoryById(id);
  return cat ? cat.name : id;
}

function getPromptsForCategory(catId) {
  return PROMPTS.filter(function (p) { return p.category === catId; });
}

function getChecklistsForCategory(catId) {
  return CHECKLISTS.filter(function (c) { return c.category === catId; });
}

function getStandardsForCategory(catId) {
  return STANDARDS.filter(function (s) { return s.category === catId; });
}

function getKnowledgeForCategory(catId) {
  return KNOWLEDGE_BASE.filter(function (k) { return k.category === catId; });
}

function getExamplesForCategory(catId) {
  return EXAMPLES.filter(function (e) { return e.category === catId; });
}

function getReferencesForCategory(catId) {
  return REFERENCES.filter(function (r) { return r.category === catId; });
}

function getReferencesByIds(ids) {
  if (!ids || !ids.length) return [];
  return REFERENCES.filter(function (r) { return ids.indexOf(r.id) !== -1; });
}

function findCategoryObject(name) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].name === name) return CATEGORIES[i];
  }
  return null;
}

/* ── 4. View Helpers ──────────────────────────────────────── */

function hideAllViews() {
  dom.dashboardView.hidden = true;
  dom.categoryView.hidden = true;
  dom.searchView.hidden = true;
}

function showView(name) {
  hideAllViews();
  state.currentView = name;
  switch (name) {
    case 'dashboard':
      dom.dashboardView.hidden = false;
      break;
    case 'category':
      dom.categoryView.hidden = false;
      break;
    case 'search':
      dom.searchView.hidden = false;
      break;
  }
}

function deactivateAllNavTabs() {
  var tabs = dom.categoryNav.querySelectorAll('.nav-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    tabs[i].setAttribute('aria-selected', 'false');
  }
}

function activateNavTab(catId) {
  deactivateAllNavTabs();
  var tab = dom.categoryNav.querySelector('.nav-tab[data-cat-id="' + catId + '"]');
  if (tab) {
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

/* ── 5. Render: Category Nav ──────────────────────────────── */

function renderCategoryNav() {
  var html = '';
  for (var i = 0; i < CATEGORIES.length; i++) {
    var cat = CATEGORIES[i];
    html += '<button class="nav-tab" data-cat-id="' + escapeHtml(cat.id) + '" role="tab" aria-selected="false" title="' + escapeHtml(cat.desc) + '">';
    html += '<span class="nav-tab__icon">' + cat.icon + '</span>';
    html += '<span class="nav-tab__label">' + escapeHtml(cat.name) + '</span>';
    html += '</button>';
  }
  html += '<button class="nav-tab nav-tab__search" data-action="search" role="tab" aria-selected="false" title="Search">';
  html += '<span class="nav-tab__icon">&#128269;</span>';
  html += '<span class="nav-tab__label">Search</span>';
  html += '</button>';
  dom.categoryNav.innerHTML = html;
}

/* ── 6. Render: Category Sub-tabs ─────────────────────────── */

function renderCategoryTabs() {
  var tabs = [
    { id: 'prompts',     label: 'Prompts' },
    { id: 'checklists',  label: 'Checklists' },
    { id: 'standards',   label: 'Standards' },
    { id: 'knowledge',   label: 'Knowledge' },
    { id: 'examples',    label: 'Examples' },
    { id: 'references',  label: 'References' }
  ];
  var html = '';
  for (var i = 0; i < tabs.length; i++) {
    var t = tabs[i];
    var activeClass = t.id === state.currentTab ? ' active' : '';
    html += '<button class="cat-tab' + activeClass + '" data-tab="' + t.id + '" role="tab" aria-selected="' + (t.id === state.currentTab) + '">';
    html += escapeHtml(t.label);
    html += '</button>';
  }
  dom.categoryTabs.innerHTML = html;
}

/* ── 7. Render: Dashboard ─────────────────────────────────── */

function renderDashboard() {
  showView('dashboard');
  deactivateAllNavTabs();
  renderStats();
  renderRecentActivity();
}

function renderStats() {
  state.stats.categories = CATEGORIES.length;
  state.stats.prompts = PROMPTS.length;
  state.stats.checklists = CHECKLISTS.length;
  state.stats.standards = STANDARDS.length;

  var countEls = dom.statsGrid.querySelectorAll('.stat-card__value[data-count]');
  for (var i = 0; i < countEls.length; i++) {
    var key = countEls[i].getAttribute('data-count');
    if (state.stats[key] !== undefined) {
      countEls[i].textContent = state.stats[key];
    }
  }
}

function updateStats() {
  renderStats();
}

/* ── 8. Render: Recent Activity ───────────────────────────── */

function renderRecentActivity() {
  var items = state.recentActivity;
  if (!items.length) {
    dom.recentList.innerHTML = '<li class="recent-item"><span class="recent-item__text" style="color:var(--color-text-secondary);">No recent activity</span></li>';
    return;
  }
  var html = '';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    html += '<li class="recent-item">';
    html += '<span class="recent-item__icon">' + (item.icon || '&#128196;') + '</span>';
    html += '<span class="recent-item__text">' + escapeHtml(item.text) + '</span>';
    html += '</li>';
  }
  dom.recentList.innerHTML = html;
}

function addRecentActivity(text, icon) {
  state.recentActivity.unshift({ text: text, icon: icon || '&#128196;', time: Date.now() });
  if (state.recentActivity.length > 10) {
    state.recentActivity = state.recentActivity.slice(0, 10);
  }
  try {
    localStorage.setItem('ael-qa-recent', JSON.stringify(state.recentActivity));
  } catch (e) { /* quota exceeded — ignore */ }
  if (state.currentView === 'dashboard') {
    renderRecentActivity();
  }
}

/* ── 9. Render: Category Content (Tab Switching) ──────────── */

function renderCategoryContent(catId) {
  switch (state.currentTab) {
    case 'prompts':    renderPrompts(catId);    break;
    case 'checklists': renderChecklists(catId); break;
    case 'standards':  renderStandards(catId);  break;
    case 'knowledge':  renderKnowledge(catId);  break;
    case 'examples':   renderExamples(catId);   break;
    case 'references': renderReferences(catId); break;
    default:           renderPrompts(catId);    break;
  }
}

/* ── 10. Render: Prompts ──────────────────────────────────── */

function renderPrompts(catId) {
  var prompts = getPromptsForCategory(catId);
  if (!prompts.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No prompts available for this category.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < prompts.length; i++) {
    var p = prompts[i];
    var excerpt = p.prompt.length > 150 ? p.prompt.substring(0, 150) + '...' : p.prompt;
    var refs = getReferencesByIds(p.references);

    html += '<div class="prompt-card" style="animation-delay:' + (i * 40) + 'ms;" data-prompt-id="' + escapeHtml(p.id) + '">';
    html += '<h4 class="prompt-card__title">' + escapeHtml(p.title) + '</h4>';
    html += '<p class="prompt-card__excerpt">' + escapeHtml(excerpt) + '</p>';

    // Full prompt (hidden initially)
    html += '<div class="prompt-card__full" style="display:none;">';
    html += '<p style="font-size:var(--text-sm);color:var(--color-text);line-height:var(--leading-normal);margin-bottom:var(--space-lg);white-space:pre-wrap;">' + escapeHtml(p.prompt) + '</p>';
    html += '</div>';

    // References
    if (refs.length) {
      html += '<div class="prompt-card__refs">';
      for (var r = 0; r < refs.length; r++) {
        html += '<a class="reference-link" href="' + escapeHtml(refs[r].url) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(refs[r].title) + '">';
        html += '<span class="reference-link__icon">&#128279;</span> ';
        html += escapeHtml(refs[r].title);
        html += '</a>';
      }
      html += '</div>';
    }

    // Actions
    html += '<div class="prompt-card__actions">';
    html += '<button class="btn btn-ghost btn-sm prompt-toggle" data-prompt-id="' + escapeHtml(p.id) + '">View Full Prompt</button>';
    html += '<button class="btn-copy" data-copy-text="' + escapeHtml(p.prompt).replace(/"/g, '&quot;') + '">';
    html += '&#128203; Copy';
    html += '</button>';
    html += '<button class="btn btn-ghost btn-sm btn-export" data-export-type="reviewReport" data-export-cat="' + escapeHtml(catId) + '" data-export-title="' + escapeHtml(p.title) + '">';
    html += '&#128230; Export';
    html += '</button>';
    html += '</div>';

    html += '</div>';
  }
  dom.categoryContent.innerHTML = html;
}

/* ── 11. Render: Checklists ───────────────────────────────── */

function renderChecklists(catId) {
  var checklists = getChecklistsForCategory(catId);
  if (!checklists.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No checklists available for this category.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < checklists.length; i++) {
    var cl = checklists[i];
    var totalItems = cl.items.length;
    var safeId = escapeHtml(cl.id);

    html += '<div class="prompt-card" style="animation-delay:' + (i * 40) + 'ms;">';
    html += '<h4 class="prompt-card__title">' + escapeHtml(cl.title) + '</h4>';
    html += '<p class="prompt-card__excerpt" data-progress-for="' + safeId + '" style="margin-bottom:var(--space-md);">0 / ' + totalItems + ' items checked</p>';
    html += '<div class="checklist-group" data-checklist-id="' + safeId + '">';

    for (var j = 0; j < cl.items.length; j++) {
      var itemId = safeId + '-item-' + j;
      html += '<div class="checklist-item">';
      html += '<input type="checkbox" class="checklist-item__checkbox" id="' + itemId + '" data-checklist="' + safeId + '">';
      html += '<label class="checklist-item__label" for="' + itemId + '">' + escapeHtml(cl.items[j]) + '</label>';
      html += '</div>';
    }

    html += '</div>';
    html += '</div>';
  }
  dom.categoryContent.innerHTML = html;
}

/* ── 12. Render: Standards ────────────────────────────────── */

function renderStandards(catId) {
  var standards = getStandardsForCategory(catId);
  if (!standards.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No standards available for this category.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < standards.length; i++) {
    var s = standards[i];
    var sevClass = 'standard-item__severity--' + escapeHtml(s.severity);

    html += '<div class="standard-item" style="animation-delay:' + (i * 40) + 'ms;">';
    html += '<span class="standard-item__severity ' + sevClass + '">' + escapeHtml(s.severity) + '</span>';
    html += '<div class="standard-item__body">';
    html += '<h5 class="standard-item__title">' + escapeHtml(s.title) + '</h5>';
    html += '<p class="standard-item__desc">' + escapeHtml(s.standard) + '</p>';
    html += '</div>';
    html += '</div>';
  }
  dom.categoryContent.innerHTML = html;
}

/* ── 13. Render: Knowledge ────────────────────────────────── */

function renderKnowledge(catId) {
  var knowledge = getKnowledgeForCategory(catId);
  if (!knowledge.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No knowledge entries available for this category.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < knowledge.length; i++) {
    var k = knowledge[i];
    html += '<div class="knowledge-card" style="animation-delay:' + (i * 40) + 'ms;">';
    html += '<h4 class="knowledge-card__title">' + escapeHtml(k.title) + '</h4>';
    if (k.tags && k.tags.length) {
      html += '<div class="knowledge-card__tags">';
      for (var t = 0; t < k.tags.length; t++) {
        html += '<span class="knowledge-card__tag">' + escapeHtml(k.tags[t]) + '</span>';
      }
      html += '</div>';
    }
    html += '<p class="knowledge-card__body">' + escapeHtml(k.body) + '</p>';
    html += '</div>';
  }
  dom.categoryContent.innerHTML = html;
}

/* ── 14. Render: Examples ─────────────────────────────────── */

function renderExamples(catId) {
  var examples = getExamplesForCategory(catId);
  if (!examples.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No examples available for this category.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < examples.length; i++) {
    var ex = examples[i];
    html += '<div class="example-card" style="animation-delay:' + (i * 40) + 'ms;">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);">';
    html += '<h4 class="example-card__title" style="margin-bottom:0;">' + escapeHtml(ex.title) + '</h4>';
    html += '<button class="btn-copy" data-copy-text="' + escapeHtml(ex.code).replace(/"/g, '&quot;') + '">';
    html += '&#128203; Copy';
    html += '</button>';
    html += '</div>';
    html += '<pre class="code-block"><code>' + escapeHtml(ex.code) + '</code></pre>';
    html += '</div>';
  }
  dom.categoryContent.innerHTML = html;
}

/* ── 15. Render: References ───────────────────────────────── */

function renderReferences(catId) {
  var refs = getReferencesForCategory(catId);
  if (!refs.length) {
    dom.categoryContent.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-xl) 0;">No references available for this category.</p>';
    return;
  }
  var html = '<div style="display:flex;flex-wrap:wrap;gap:var(--space-sm);">';
  for (var i = 0; i < refs.length; i++) {
    var ref = refs[i];
    html += '<a class="reference-link" href="' + escapeHtml(ref.url) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(ref.title) + '" style="font-size:var(--text-sm);padding:var(--space-sm) var(--space-md);">';
    html += '<span class="reference-link__icon">&#128279;</span> ';
    html += escapeHtml(ref.title);
    html += ' <span style="font-size:0.7em;opacity:0.5;">&#8599;</span>';
    html += '</a>';
  }
  html += '</div>';
  dom.categoryContent.innerHTML = html;
}

/* ── 16. Navigation: Switch Category ──────────────────────── */

function switchCategory(catId) {
  var cat = getCategoryById(catId);
  if (!cat) return;

  state.currentCategory = catId;
  state.currentTab = 'prompts';

  showView('category');

  // Update header
  dom.categoryIcon.textContent = cat.icon;
  dom.categoryName.textContent = cat.name;
  dom.categoryDesc.textContent = cat.desc;

  // Activate nav tab
  activateNavTab(catId);

  // Render sub-tabs
  renderCategoryTabs();

  // Render content
  renderCategoryContent(catId);

  // URL hash
  window.location.hash = 'category/' + catId;

  // Activity
  addRecentActivity('Viewed ' + cat.name + ' category', cat.icon);
}

/* ── 17. Navigation: Switch Tab ───────────────────────────── */

function switchCategoryTab(tabName) {
  state.currentTab = tabName;
  renderCategoryTabs();
  if (state.currentCategory) {
    renderCategoryContent(state.currentCategory);
  }
}

/* ── 18. Search ───────────────────────────────────────────── */

var handleSearchDebounced = debounce(function (query) {
  handleSearch(query);
}, 300);

function handleSearch(query) {
  state.searchQuery = query;

  if (!query || !query.trim()) {
    dom.searchResults.innerHTML = '<p style="color:var(--color-text-secondary);padding:var(--space-2xl) 0;text-align:center;">Start typing to search across all prompts and knowledge base entries...</p>';
    return;
  }

  var q = query.toLowerCase().trim();
  var promptResults = [];
  var knowledgeResults = [];

  // Search prompts
  for (var i = 0; i < PROMPTS.length; i++) {
    var p = PROMPTS[i];
    if (p.title.toLowerCase().indexOf(q) !== -1 || p.prompt.toLowerCase().indexOf(q) !== -1) {
      promptResults.push(p);
    }
  }

  // Search knowledge base
  for (var j = 0; j < KNOWLEDGE_BASE.length; j++) {
    var k = KNOWLEDGE_BASE[j];
    if (k.title.toLowerCase().indexOf(q) !== -1 || k.body.toLowerCase().indexOf(q) !== -1) {
      knowledgeResults.push(k);
    }
  }

  var html = '';

  if (promptResults.length) {
    html += '<div class="search-group">';
    html += '<h3 style="margin-bottom:var(--space-lg);font-size:var(--text-xl);">Prompts <span style="font-size:var(--text-sm);color:var(--color-text-secondary);font-weight:normal;">(' + promptResults.length + ')</span></h3>';
    for (var pi = 0; pi < promptResults.length; pi++) {
      var pr = promptResults[pi];
      var cat = getCategoryById(pr.category);
      var excerpt = pr.prompt.length > 200 ? pr.prompt.substring(0, 200) + '...' : pr.prompt;
      html += '<div class="prompt-card" style="animation-delay:' + (pi * 30) + 'ms;">';
      html += '<div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm);">';
      if (cat) {
        html += '<span style="font-size:var(--text-lg);">' + cat.icon + '</span>';
        html += '<span style="font-size:var(--text-xs);color:var(--color-text-secondary);font-weight:var(--weight-medium);">' + escapeHtml(cat.name) + '</span>';
      }
      html += '</div>';
      html += '<h4 class="prompt-card__title">' + escapeHtml(pr.title) + '</h4>';
      html += '<p class="prompt-card__excerpt">' + escapeHtml(excerpt) + '</p>';
      html += '<button class="btn btn-ghost btn-sm" onclick="appNavigateToPrompt(\'' + escapeHtml(pr.category) + '\',\'' + escapeHtml(pr.id) + '\')">View in Category &#8594;</button>';
      html += '</div>';
    }
    html += '</div>';
  }

  if (knowledgeResults.length) {
    html += '<div class="search-group">';
    html += '<h3 style="margin-bottom:var(--space-lg);font-size:var(--text-xl);">Knowledge <span style="font-size:var(--text-sm);color:var(--color-text-secondary);font-weight:normal;">(' + knowledgeResults.length + ')</span></h3>';
    for (var ki = 0; ki < knowledgeResults.length; ki++) {
      var kb = knowledgeResults[ki];
      var catK = getCategoryById(kb.category);
      html += '<div class="knowledge-card" style="animation-delay:' + (ki * 30) + 'ms;">';
      html += '<div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm);">';
      if (catK) {
        html += '<span style="font-size:var(--text-lg);">' + catK.icon + '</span>';
        html += '<span style="font-size:var(--text-xs);color:var(--color-text-secondary);font-weight:var(--weight-medium);">' + escapeHtml(catK.name) + '</span>';
      }
      html += '</div>';
      html += '<h4 class="knowledge-card__title">' + escapeHtml(kb.title) + '</h4>';
      if (kb.tags && kb.tags.length) {
        html += '<div class="knowledge-card__tags">';
        for (var ti = 0; ti < kb.tags.length; ti++) {
          html += '<span class="knowledge-card__tag">' + escapeHtml(kb.tags[ti]) + '</span>';
        }
        html += '</div>';
      }
      html += '<p class="knowledge-card__body">' + escapeHtml(kb.body) + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  if (!promptResults.length && !knowledgeResults.length) {
    html = '<p style="color:var(--color-text-secondary);padding:var(--space-2xl) 0;text-align:center;">No results found for "<strong>' + escapeHtml(query) + '</strong>". Try a different search term.</p>';
  }

  dom.searchResults.innerHTML = html;
}

// Global helper for search result navigation
function appNavigateToPrompt(catId, promptId) {
  state.currentTab = 'prompts';
  switchCategory(catId);
}

/* ── 19. Copy to Clipboard ────────────────────────────────── */

function copyToClipboard(text, buttonEl) {
  if (!text) return;

  var originalHTML = buttonEl.innerHTML;

  function showFeedback() {
    buttonEl.innerHTML = '&#10003; Copied!';
    buttonEl.classList.add('copied');
    setTimeout(function () {
      buttonEl.innerHTML = originalHTML;
      buttonEl.classList.remove('copied');
    }, 2000);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showFeedback).catch(function () {
      fallbackCopy(text, buttonEl, originalHTML, showFeedback);
    });
  } else {
    fallbackCopy(text, buttonEl, originalHTML, showFeedback);
  }
}

function fallbackCopy(text, buttonEl, originalHTML, showFeedback) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    showFeedback();
  } catch (e) {
    buttonEl.innerHTML = '&#10007; Failed';
    setTimeout(function () {
      buttonEl.innerHTML = originalHTML;
    }, 2000);
  }
  document.body.removeChild(textarea);
}

/* ── 20. Export Report ────────────────────────────────────── */

function exportReport(type, data) {
  var template = TEMPLATES[type];
  if (!template) return;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'export-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', template.title);

  var html = '<div class="export-modal">';
  html += '<div class="export-modal__header">';
  html += '<h3>' + escapeHtml(template.title) + '</h3>';
  html += '<button class="btn-icon export-close" aria-label="Close">&#10005;</button>';
  html += '</div>';
  html += '<form class="export-form" id="export-form">';

  for (var i = 0; i < template.fields.length; i++) {
    var field = template.fields[i];
    var val = '';

    // Pre-fill known values
    if (field.key === 'category' && state.currentCategory) {
      var catObj = getCategoryById(state.currentCategory);
      val = catObj ? catObj.name : '';
    }
    if (field.key === 'date') {
      val = new Date().toISOString().split('T')[0];
    }
    if (data && data[field.key]) {
      val = data[field.key];
    }

    html += '<div class="export-field">';
    html += '<label class="export-field__label" for="export-' + field.key + '">' + escapeHtml(field.label) + '</label>';

    if (field.type === 'textarea') {
      html += '<textarea class="export-field__input" id="export-' + field.key + '" name="' + field.key + '" rows="3">' + escapeHtml(val) + '</textarea>';
    } else if (field.type === 'select') {
      html += '<select class="export-field__input" id="export-' + field.key + '" name="' + field.key + '">';
      html += '<option value="">— Select —</option>';
      for (var o = 0; o < field.options.length; o++) {
        var selected = field.options[o] === val ? ' selected' : '';
        html += '<option value="' + escapeHtml(field.options[o]) + '"' + selected + '>' + escapeHtml(field.options[o]) + '</option>';
      }
      html += '</select>';
    } else {
      html += '<input class="export-field__input" type="' + escapeHtml(field.type) + '" id="export-' + field.key + '" name="' + field.key + '" value="' + escapeHtml(val) + '">';
    }

    html += '</div>';
  }

  html += '<div class="export-actions">';
  html += '<button type="button" class="btn btn-ghost export-close">Cancel</button>';
  html += '<button type="submit" class="btn btn-primary">Generate Report</button>';
  html += '</div>';
  html += '</form>';
  html += '</div>';

  overlay.innerHTML = html;

  // Styles for overlay
  overlay.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);animation:fadeIn 200ms ease-out;';

  var modal = overlay.querySelector('.export-modal');
  modal.style.cssText = 'background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl);width:90%;max-width:560px;max-height:85vh;overflow-y:auto;padding:var(--space-2xl);box-shadow:var(--shadow-xl);animation:slideUp 250ms ease-out;';

  var modalHeader = overlay.querySelector('.export-modal__header');
  modalHeader.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-xl);';
  modalHeader.querySelector('h3').style.cssText = 'font-size:var(--text-xl);';

  var fields = overlay.querySelectorAll('.export-field');
  for (var f = 0; f < fields.length; f++) {
    fields[f].style.cssText = 'margin-bottom:var(--space-lg);';
  }
  var labels = overlay.querySelectorAll('.export-field__label');
  for (var l = 0; l < labels.length; l++) {
    labels[l].style.cssText = 'display:block;font-size:var(--text-sm);font-weight:var(--weight-medium);margin-bottom:var(--space-xs);color:var(--color-text);';
  }
  var inputs = overlay.querySelectorAll('.export-field__input');
  for (var inp = 0; inp < inputs.length; inp++) {
    inputs[inp].style.cssText = 'width:100%;padding:var(--space-sm) var(--space-md);font-size:var(--text-sm);background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);color:var(--color-text);outline:none;transition:border-color var(--transition-fast);font-family:inherit;resize:vertical;';
  }

  var actions = overlay.querySelector('.export-actions');
  actions.style.cssText = 'display:flex;justify-content:flex-end;gap:var(--space-sm);margin-top:var(--space-xl);padding-top:var(--space-lg);border-top:1px solid var(--color-border);';

  document.body.appendChild(overlay);

  // Event listeners
  function closeOverlay() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 150ms ease-out';
    setTimeout(function () {
      if (overlay.parentNode) document.body.removeChild(overlay);
    }, 150);
  }

  var closeButtons = overlay.querySelectorAll('.export-close');
  for (var c = 0; c < closeButtons.length; c++) {
    closeButtons[c].addEventListener('click', closeOverlay);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });

  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
  });

  // Focus trap
  var focusableEls = overlay.querySelectorAll('input, select, textarea, button');
  if (focusableEls.length) focusableEls[0].focus();

  // Form submit
  var form = overlay.querySelector('#export-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(form);

    var md = '# ' + template.title + '\n\n';
    md += '> Generated by AEL QA Studio on ' + new Date().toLocaleDateString() + '\n\n';
    md += '---\n\n';

    for (var fd = 0; fd < template.fields.length; fd++) {
      var fData = template.fields[fd];
      var val = formData.get(fData.key) || '';
      md += '## ' + fData.label + '\n\n';
      md += val + '\n\n';
    }

    md += '---\n*Report generated by AEL QA Studio — Audit · Review · Excel*\n';

    // Download
    var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    var slug = template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    a.download = slug + '-' + new Date().toISOString().split('T')[0] + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    closeOverlay();
    addRecentActivity('Exported ' + template.title, '&#128230;');
  });
}

/* ── 21. Theme Toggle ─────────────────────────────────────── */

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  try {
    localStorage.setItem('ael-qa-theme', state.theme);
  } catch (e) { /* ignore */ }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  state.theme = theme;
}

/* ── 22. Hash Navigation ──────────────────────────────────── */

function handleHashChange() {
  var hash = window.location.hash;

  if (!hash || hash === '#') {
    renderDashboard();
    return;
  }

  // #category/{id}
  var catMatch = hash.match(/^#category\/(.+)$/);
  if (catMatch) {
    var catId = catMatch[1];
    state.currentTab = 'prompts';
    switchCategory(catId);
    return;
  }

  // #search?q={query}
  var searchMatch = hash.match(/^#search\?q=(.+)$/);
  if (searchMatch) {
    var query = decodeURIComponent(searchMatch[1]);
    state.searchQuery = query;
    showView('search');
    deactivateAllNavTabs();
    var searchTab = dom.categoryNav.querySelector('[data-action="search"]');
    if (searchTab) {
      searchTab.classList.add('active');
      searchTab.setAttribute('aria-selected', 'true');
    }
    if (dom.searchInput) {
      dom.searchInput.value = query;
      dom.searchInput.focus();
    }
    handleSearch(query);
    return;
  }

  renderDashboard();
}

/* ── 23. Checklist Progress ───────────────────────────────── */

function updateChecklistProgress(checkbox) {
  var checklistId = checkbox.getAttribute('data-checklist');
  if (!checklistId) return;

  var group = dom.categoryContent.querySelector('[data-checklist-id="' + checklistId + '"]');
  if (!group) return;

  var checkboxes = group.querySelectorAll('.checklist-item__checkbox');
  var total = checkboxes.length;
  var checked = 0;

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) checked++;
  }

  // Update progress text
  var progressEl = dom.categoryContent.querySelector('[data-progress-for="' + checklistId + '"]');
  if (progressEl) {
    progressEl.textContent = checked + ' / ' + total + ' items checked';
  }

  // Update label styling
  var label = checkbox.nextElementSibling;
  if (label && label.classList.contains('checklist-item__label')) {
    if (checkbox.checked) {
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
  }
}

/* ── 24. Event Listeners ──────────────────────────────────── */

function bindEventListeners() {
  // Theme toggle
  dom.themeToggle.addEventListener('click', toggleTheme);

  // Search input
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', function () {
      var query = this.value;
      handleSearchDebounced(query);
    });
  }

  // Window hashchange
  window.addEventListener('hashchange', handleHashChange);

  // Document click delegation
  document.addEventListener('click', function (e) {
    var target = e.target;

    // Nav tab clicks
    var navTab = target.closest('.nav-tab');
    if (navTab) {
      var action = navTab.getAttribute('data-action');
      var catId = navTab.getAttribute('data-cat-id');
      if (action === 'search') {
        showView('search');
        deactivateAllNavTabs();
        navTab.classList.add('active');
        navTab.setAttribute('aria-selected', 'true');
        state.currentView = 'search';
        window.location.hash = 'search';
        if (dom.searchInput) {
          dom.searchInput.focus();
          if (state.searchQuery) {
            dom.searchInput.value = state.searchQuery;
          }
        }
      } else if (catId) {
        switchCategory(catId);
      }
      return;
    }

    // Category sub-tab clicks
    var catTab = target.closest('.cat-tab');
    if (catTab) {
      var tabName = catTab.getAttribute('data-tab');
      if (tabName) switchCategoryTab(tabName);
      return;
    }

    // Copy button clicks
    var copyBtn = target.closest('.btn-copy');
    if (copyBtn) {
      var text = copyBtn.getAttribute('data-copy-text');
      if (text) copyToClipboard(text, copyBtn);
      return;
    }

    // Export button clicks
    var exportBtn = target.closest('.btn-export');
    if (exportBtn) {
      var exportType = exportBtn.getAttribute('data-export-type');
      var exportCat = exportBtn.getAttribute('data-export-cat');
      var exportTitle = exportBtn.getAttribute('data-export-title');
      var exportData = {};
      if (exportCat) {
        var catObj = getCategoryById(exportCat);
        if (catObj) exportData.category = catObj.name;
      }
      if (exportTitle) exportData.project = exportTitle;
      exportReport(exportType, exportData);
      return;
    }

    // Prompt toggle clicks
    var toggleBtn = target.closest('.prompt-toggle');
    if (toggleBtn) {
      var promptCard = toggleBtn.closest('.prompt-card');
      if (promptCard) {
        var fullSection = promptCard.querySelector('.prompt-card__full');
        if (fullSection) {
          var isHidden = fullSection.style.display === 'none' || !fullSection.style.display;
          fullSection.style.display = isHidden ? 'block' : 'none';
          toggleBtn.textContent = isHidden ? 'Hide Prompt' : 'View Full Prompt';

          // Animate
          if (isHidden) {
            fullSection.style.opacity = '0';
            fullSection.style.transform = 'translateY(-8px)';
            fullSection.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
            requestAnimationFrame(function () {
              fullSection.style.opacity = '1';
              fullSection.style.transform = 'translateY(0)';
            });
          }
        }
      }
      return;
    }

    // Navigate to prompt from search results
    if (target.hasAttribute('onclick')) return;

    // Checklist checkbox (handled via change below, but close label clicks)
    var checklistLabel = target.closest('.checklist-item__label');
    if (checklistLabel) {
      var checkbox = checklistLabel.previousElementSibling;
      if (checkbox && checkbox.classList.contains('checklist-item__checkbox')) {
        checkbox.checked = !checkbox.checked;
        updateChecklistProgress(checkbox);
        e.preventDefault();
      }
      return;
    }
  });

  // Checklist checkbox change
  dom.categoryContent.addEventListener('change', function (e) {
    if (e.target.classList.contains('checklist-item__checkbox')) {
      updateChecklistProgress(e.target);
    }
  });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlay = document.querySelector('.export-overlay');
      if (overlay) {
        overlay.click();
      }
    }
  });
}

/* ── 25. Init ─────────────────────────────────────────────── */

function init() {
  // Apply saved theme
  applyTheme(state.theme);

  // Render nav
  renderCategoryNav();

  // Render dashboard
  renderDashboard();

  // Render category tabs (empty until a category is selected)
  renderCategoryTabs();

  // Update stats
  updateStats();

  // Bind events
  bindEventListeners();

  // Deep linking
  handleHashChange();
}

/* ── 26. Bootstrap ────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', init);
