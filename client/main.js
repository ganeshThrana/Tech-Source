/* ============================================================
   TECH SOURCE — Learning Hub
   Single-page app: router + theme + search + reveal + toasts
   Modern vanilla JS: classes, modules-style organisation,
   IntersectionObserver, matchMedia, debounced input, History API.
   ============================================================ */
"use strict";

/* ============================================================
   1. ICON SET (inline SVG, stroke = currentColor)
   ============================================================ */
const ICONS = {
  java: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13c-3 1.2-3 3.6 0 4.8 3.3 1.4 8.7 1.4 12 0 3-1.2 3-3.6 0-4.8"/><path d="M9 3c-1.6 2-1.6 4 0 6-1.6 2-1.6 4 0 6"/><path d="M14 3c1.4 1.8 1.4 3.6 0 5.4"/><path d="M6 20.5c3.6 1 8.4 1 12 0"/></svg>`,
  selenium: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 9l3 2-3 2M13 13h4"/></svg>`,
  playwright: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4"/><rect x="6" y="7" width="12" height="10" rx="2"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5V12c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5"/><path d="M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12"/></svg>`,
  frameworks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/></svg>`,
  tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.6 2.6-2-2z"/></svg>`,
  git: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="17" cy="12" r="2.2"/><path d="M6 8.2V15.8M8.2 12H14.8M6 8.2c0 3 3 3.8 8 3.8"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5z"/><path d="M20 5.5C20 4.7 19.3 4 18.5 4H12v16h6.5c.8 0 1.5-.7 1.5-1.5z"/></svg>`,
  agile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 11-3.5-7.1"/><path d="M21 3v5h-5"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 2.9V3z"/><path d="M15 3a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 2.9V3z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>`,
  bulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/></svg>`,
  pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3L4 14h6l-1 7 9-11h-6z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
};

/* ============================================================
   2. RESOURCE CATALOGUE
   ============================================================ */
const CATEGORIES = [
  {
    id: "java",
    title: "Java Programming",
    icon: "java",
    desc: "Core language fundamentals through OOP, collections and advanced topics — the full 22-part series.",
    folder: "pdfs/",
    files: [
      "Java0.pdf",
      "Java1.pdf",
      "Java2.pdf",
      "Java3.pdf",
      "Java4.pdf",
      "java5.pdf",
      "java6.pdf",
      "java7.pdf",
      "Java8.pdf",
      "Java9.pdf",
      "Java10.pdf",
      "Java11.pdf",
      "Java12.pdf",
      "Java13.pdf",
      "Java14.pdf",
      "Java15.pdf",
      "Java16.pdf",
      "Java17.pdf",
      "Java18.pdf",
      "Java19.pdf",
      "Java20.pdf",
      "Java21.pdf",
      "Pojo.pdf",
    ],
  },
  {
    id: "selenium",
    title: "Selenium WebDriver",
    icon: "selenium",
    desc: "Browser automation from locators to advanced waits, actions and design patterns.",
    folder: "client/",
    files: [
      "Selenium.pdf",
      "Selenium1.pdf",
      "Selenium2.pdf",
      "Selenium03.pdf",
      "Selenium4.pdf",
      "Selenium5.pdf",
      "Selenium6.pdf",
      "Selenium7.pdf",
      "Selenium9.pdf",
      "Selenium10.pdf",
      "Selenium11.pdf",
      "Selenium12.pdf",
      "Selenium13.pdf",
      "Selenium14.pdf",
      "Selenium15.pdf",
      "Selenium16.pdf",
      "Selenium17.pdf",
      "Selenium18.pdf",
      "Selenium19.pdf",
      "Selenium20.pdf",
      "Selenium21.pdf",
    ],
  },
  {
    id: "playwright",
    title: "Playwright",
    icon: "playwright",
    desc: "Modern end-to-end testing: setup, selectors, network mocking and CI-ready patterns.",
    folder: "pdfs/",
    files: [
      "Playwright.pdf",
      "Playwright01.pdf",
      "Playwright02.pdf",
      "Playwright03.pdf",
      "04.pdf",
      "Playwright05.pdf",
      "Playwright06.pdf",
      "Playwright07.pdf",
      "Playwright08.pdf",
      "Playwright09.pdf",
      "Playwright10.pdf",
      "Playwright11.pdf",
      "Playwright12.pdf",
      "Playwright13.pdf",
      "Playwright14.pdf",
      "Playwright15.pdf",
      "Playwright16.pdf",
      "Playwright17.pdf",
    ],
  },
  {
    id: "api",
    title: "API Testing",
    icon: "api",
    desc: "REST fundamentals and hands-on request/response validation for test automation.",
    folder: "pdfs/",
    files: ["API.pdf", "API1.pdf"],
  },
  {
    id: "database",
    title: "SQL & JDBC",
    icon: "database",
    desc: "Query writing and connecting Java code to databases for data-driven testing.",
    folder: "pdfs/",
    files: ["SQL.pdf", "JDBC.pdf"],
  },
  {
    id: "frameworks",
    title: "Test Frameworks",
    icon: "frameworks",
    desc: "TestNG, JUnit, Cucumber BDD and data-driven design, side by side.",
    folder: "pdfs/",
    files: [
      "Frameworks.pdf",
      "Frameworks Test NG.pdf",
      "Frameworks Cucumber.pdf",
      "Frameworks Data driven.pdf",
      "Frameworks Junit.pdf",
    ],
  },
  {
    id: "tools",
    title: "Automation Tooling",
    icon: "tools",
    desc: "Build tooling and dependency management for real automation projects.",
    folder: "pdfs/",
    files: ["Automation Tool.pdf", "Automation Tool Maven.pdf"],
  },
  {
    id: "git",
    title: "Git & CI/CD",
    icon: "git",
    desc: "Version control workflows and shipping automated test runs through a pipeline.",
    folder: "pdfs/",
    files: ["GIT.pdf", "CICD.pdf"],
  },
  {
    id: "fundamentals",
    title: "Testing Fundamentals",
    icon: "book",
    desc: "ISTQB syllabus, core software-testing theory and the FILO reference sheet.",
    folder: "pdfs/",
    files: [
      "software testing.pdf",
      "ISTQB_CTFL_Syllabus_v4.0.1.pdf",
      "FILO.pdf",
    ],
  },
  {
    id: "agile",
    title: "Agile & Jira",
    icon: "agile",
    desc: "Sprint ceremonies, agile theory and day-to-day issue tracking in Jira.",
    folder: "pdfs/",
    files: ["Agile.pdf", "Jira.pdf"],
  },
  {
    id: "genai",
    title: "GenAI & Prompting",
    icon: "ai",
    desc: "Using generative AI and prompt design to speed up the testing workflow.",
    folder: "pdfs/",
    files: ["GenAI.pdf", "Prompt.pdf"],
  },
  {
    id: "reports",
    title: "Reporting",
    icon: "chart",
    desc: "Building clear, shareable automation test reports.",
    folder: "pdfs/",
    files: ["Reports.pdf"],
  },
  {
    id: "hints",
    title: "Interview Hints",
    icon: "bulb",
    desc: "A quick-reference sheet of the most important interview pointers.",
    folder: "pdfs/",
    files: ["Very important hints.pdf"],
  },
];

const TOOLS = [
  {
    id: "onecompiler",
    name: "OneCompiler — Java",
    initials: "{ }",
    gradient: "linear-gradient(135deg,#f89820,#c05a1a)",
    desc: "A free, instant Java compiler right in your browser. Write a class, hit run, and see the output immediately — perfect for testing the syntax from the Java PDFs.",
    tags: ["No install", "Runs Java", "Free"],
    url: "https://onecompiler.com/java",
  },
  {
    id: "w3schools",
    name: "W3Schools",
    initials: "W3",
    gradient: "linear-gradient(135deg,#2f9c3a,#1c6e26)",
    desc: "The go-to reference for HTML, CSS, JavaScript, SQL and more — with try-it-yourself editors for nearly every topic.",
    tags: ["Reference", "Try-it editors", "Free"],
    url: "https://www.w3schools.com/",
  },
  {
    id: "selfmadeninja",
    name: "Selfmade Ninja Academy",
    initials: "SN",
    gradient: "linear-gradient(135deg,#6a3bff,#0072ff)",
    desc: "Sign in to continue your structured lessons and track your progress on the Selfmade Ninja Academy platform.",
    tags: ["Login required", "Structured course"],
    url: "https://academy.selfmade.ninja/login",
  },
];

/* ============================================================
   3. HELPERS — label prettifier, natural sort, debounce
   ============================================================ */
const ACRONYMS = {
  api: "API",
  sql: "SQL",
  jdbc: "JDBC",
  git: "GIT",
  cicd: "CI/CD",
  pojo: "POJO",
  istqb: "ISTQB",
  ctfl: "CTFL",
  ng: "NG",
  filo: "FILO",
  genai: "GenAI",
};

const LABEL_OVERRIDES = {
  "04.pdf": "Playwright 04",
  "ISTQB_CTFL_Syllabus_v4.0.1.pdf": "ISTQB CTFL Syllabus (v4.0.1)",
};

function prettifyName(filename) {
  if (LABEL_OVERRIDES[filename]) return LABEL_OVERRIDES[filename];
  let base = filename.replace(/\.pdf$/i, "").replace(/_/g, " ");
  base = base
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2");
  return base
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      const lw = w.toLowerCase();
      if (ACRONYMS[lw]) return ACRONYMS[lw];
      if (/^v?\d+(\.\d+)*$/i.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function naturalSort(a, b) {
  const re = /(\d+)|(\D+)/g;
  const ax = a.match(re) || [],
    bx = b.match(re) || [];
  const len = Math.max(ax.length, bx.length);
  for (let i = 0; i < len; i++) {
    const av = ax[i] || "",
      bv = bx[i] || "";
    const an = parseInt(av, 10),
      bn = parseInt(bv, 10);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) {
      if (an !== bn) return an - bn;
    } else if (av !== bv) {
      return av < bv ? -1 : 1;
    }
  }
  return 0;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function totalFileCount() {
  return CATEGORIES.reduce((sum, c) => sum + c.files.length, 0);
}

function findCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function allEntries() {
  return CATEGORIES.flatMap((c) =>
    [...c.files].sort(naturalSort).map((f) => ({
      file: f,
      folder: c.folder,
      catId: c.id,
      catTitle: c.title,
      label: prettifyName(f),
    })),
  );
}

/* ============================================================
   4. THEME MANAGER — light / night mode, persisted + synced
   ============================================================ */
class ThemeManager {
  static KEY = "ts-theme";

  static init() {
    const saved = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.apply(saved || (prefersDark ? "dark" : "light"), { silent: true });

    // Follow system changes only if the user hasn't chosen explicitly.
    window
      .matchMedia?.("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(this.KEY + "-explicit")) {
          this.apply(e.matches ? "dark" : "light", { silent: true });
        }
      });
  }

  static apply(mode, { silent = false } = {}) {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem(this.KEY, mode);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-checked", mode === "dark" ? "true" : "false");
      const knob = btn.querySelector(".knob");
      if (knob) knob.textContent = mode === "dark" ? "☾" : "☀";
    });
    if (!silent)
      Toast.show(mode === "dark" ? "Night mode on" : "Bright mode on");
  }

  static toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem(this.KEY + "-explicit", "1");
    this.apply(isDark ? "light" : "dark");
  }
}

/* ============================================================
   5. TOAST — small non-blocking notifications
   ============================================================ */
class Toast {
  static show(message) {
    const stack = document.getElementById("toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add("leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, 2400);
  }
}

/* ============================================================
   6. REVEAL — IntersectionObserver-driven fade/slide-in
   ============================================================ */
class Reveal {
  static observer = null;

  static ensureObserver() {
    if (this.observer) return this.observer;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    return this.observer;
  }

  static watch(container) {
    const obs = this.ensureObserver();
    container
      .querySelectorAll(".reveal-group .card")
      .forEach((card) => obs.observe(card));
  }
}

/* ============================================================
   7. ANIMATED COUNTERS
   ============================================================ */
function animateCount(el, target, duration = 900) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = target;
    return;
  }
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   8. RECENTLY VIEWED — persisted in localStorage
   ============================================================ */
class RecentStore {
  static KEY = "ts-recent";
  static MAX = 4;

  static get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  }

  static add(entry) {
    const list = this.get().filter((e) => e.file !== entry.file);
    list.unshift(entry);
    localStorage.setItem(this.KEY, JSON.stringify(list.slice(0, this.MAX)));
  }
}

/* ============================================================
   9. RENDERERS — build DOM for each view
   ============================================================ */
const Render = {
  home() {
    document.getElementById("statTopics").closest(".stat");
    animateCount(document.getElementById("statFiles"), totalFileCount());
    animateCount(document.getElementById("statTopics"), CATEGORIES.length);
    document.querySelectorAll("#statsRow .stat b[data-count]").forEach((b) => {
      const n = Number(b.dataset.count);
      if (b.id !== "statFiles" && b.id !== "statTopics")
        animateCount(b, n, 700);
    });

    const grid = document.getElementById("homeCatGrid");
    grid.innerHTML = CATEGORIES.map(
      (c) => `
      <a class="card cat-card" href="#/courses/${c.id}" data-link>
        <span class="icon-chip">${ICONS[c.icon] || ICONS.book}</span>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="meta"><span>View resources</span><span class="count-pill">${c.files.length}</span></div>
      </a>
    `,
    ).join("");

    document.getElementById("homeToolsGrid").innerHTML = Render.toolCards(
      TOOLS.slice(0, 3),
      { compact: true },
    );

    Render.recent();
    Reveal.watch(document.getElementById("view-home"));
  },

  recent() {
    const list = RecentStore.get();
    const section = document.getElementById("recentSection");
    const grid = document.getElementById("recentGrid");
    if (!list.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    grid.innerHTML = list
      .map(
        (e) => `
      <a class="card cat-card" href="${encodeURI(e.folder + e.file)}" target="_blank" rel="noopener noreferrer" data-recent-open="${encodeURIComponent(JSON.stringify(e))}">
        <span class="icon-chip">${ICONS.clock}</span>
        <h3 style="font-size:15px;">${e.label}</h3>
        <p style="min-height:0;">${e.catTitle}</p>
        <div class="meta"><span>Open again</span><span class="count-pill">PDF</span></div>
      </a>
    `,
      )
      .join("");
  },

  toolCards(tools, { compact = false } = {}) {
    return tools
      .map(
        (t) => `
      <div class="card tool-card">
        <div class="tool-top">
          <span class="tool-logo" style="background:${t.gradient}">${t.initials}</span>
          <div><h3 style="margin:0;font-size:${compact ? 16 : 17}px;">${t.name}</h3></div>
        </div>
        <p class="desc">${t.desc}</p>
        <div class="tool-tags">${t.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <a class="btn btn-primary ${compact ? "btn-sm" : ""}" href="${t.url}" target="_blank" rel="noopener noreferrer" data-tool="${t.id}">
          Open ${t.name.split(" — ")[0]} ↗
        </a>
      </div>
    `,
      )
      .join("");
  },

  compiler() {
    document.getElementById("toolsGrid").innerHTML = Render.toolCards(TOOLS);
    Reveal.watch(document.getElementById("view-compiler"));
  },

  courses(catId = "all", query = "") {
    const catList = document.getElementById("catList");
    const fileGrid = document.getElementById("fileGrid");
    const resTitle = document.getElementById("resTitle");
    const resCount = document.getElementById("resCount");
    const emptyState = document.getElementById("emptyState");

    // Sidebar
    catList.innerHTML = `
      <li><button data-id="all" class="${catId === "all" ? "active" : ""}">
        <span class="ic">${ICONS.bolt}</span> All Topics <span class="n">${totalFileCount()}</span>
      </button></li>
      ${CATEGORIES.map(
        (c) => `
        <li><button data-id="${c.id}" class="${catId === c.id ? "active" : ""}">
          <span class="ic">${ICONS[c.icon] || ICONS.book}</span> ${c.title} <span class="n">${c.files.length}</span>
        </button></li>
      `,
      ).join("")}
    `;

    // Entries
    let entries =
      catId === "all"
        ? allEntries()
        : allEntries().filter((e) => e.catId === catId);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      entries = entries.filter(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          e.catTitle.toLowerCase().includes(q),
      );
    }

    resTitle.textContent =
      catId === "all"
        ? "All Topics"
        : findCategory(catId)?.title || "All Topics";
    resCount.textContent = `${entries.length} ${entries.length === 1 ? "file" : "files"}`;

    if (!entries.length) {
      fileGrid.style.display = "none";
      emptyState.hidden = false;
    } else {
      fileGrid.style.display = "grid";
      emptyState.hidden = true;
      fileGrid.innerHTML = entries
        .map((e) => {
          const href = encodeURI(e.folder + e.file);
          const payload = encodeURIComponent(JSON.stringify(e));
          return `
        <div class="file-card">
          <div class="file-top">
            <span class="file-ic">${ICONS.pdf}</span>
            <div>
              <h5>${e.label}</h5>
              ${catId === "all" ? `<span class="tag" style="margin-top:6px;display:inline-block;">${e.catTitle}</span>` : ""}
            </div>
          </div>
          <div class="file-actions">
            <a class="open" href="${href}" target="_blank" rel="noopener noreferrer" data-file-open="${payload}">Open PDF</a>
            <a href="${href}" download data-file-open="${payload}">Download</a>
          </div>
        </div>`;
        })
        .join("");
    }

    Reveal.watch(document.getElementById("view-courses"));
  },
};

/* ============================================================
   10. ROUTER — hash-based, no reloads
   ============================================================ */
class Router {
  constructor(routes) {
    this.routes = routes;
    this.current = null;
    window.addEventListener("hashchange", () => this.resolve());
  }

  start() {
    this.resolve();
  }

  navigate(hash) {
    if (window.location.hash === hash) {
      this.resolve();
      return;
    }
    window.location.hash = hash;
  }

  resolve() {
    const raw = window.location.hash.replace(/^#\/?/, "") || "home";
    const [name, ...rest] = raw.split("/");
    const routeName = this.routes[name] ? name : "home";
    this.current = routeName;

    document
      .querySelectorAll(".view")
      .forEach((v) => v.classList.remove("is-active"));
    const view = document.getElementById(`view-${routeName}`);
    if (view) view.classList.add("is-active");

    document.querySelectorAll(".navlinks a[data-route]").forEach((a) => {
      const active = a.dataset.route === routeName;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    this.routes[routeName](rest);
    window.scrollTo({
      top: 0,
      behavior:
        "instant" in document.documentElement.style ? "instant" : "auto",
    });

    const navLinks = document.getElementById("navlinks");
    navLinks?.classList.remove("open");
  }
}

/* ============================================================
   11. APP BOOTSTRAP
   ============================================================ */
class App {
  constructor() {
    this.router = new Router({
      home: () => Render.home(),
      courses: (rest) => {
        const catId = rest[0] || "all";
        this.coursesState = { catId, query: this.coursesState?.query || "" };
        Render.courses(catId, this.coursesState.query);
        const input = document.getElementById("searchInput");
        if (input) input.value = this.coursesState.query;
      },
      compiler: () => Render.compiler(),
    });
    this.coursesState = { catId: "all", query: "" };
  }

  init() {
    ThemeManager.init();
    this.bindGlobalUI();
    this.bindDelegatedEvents();
    this.router.start();
  }

  bindGlobalUI() {
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => ThemeManager.toggle());
    });

    const navToggleBtn = document.querySelector(".nav-toggle-btn");
    const navLinks = document.getElementById("navlinks");
    navToggleBtn?.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggleBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false",
      );
    });

    // Keyboard shortcut: "/" focuses search (jumping to Courses if needed)
    document.addEventListener("keydown", (e) => {
      if (e.key !== "/") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      if (this.router.current !== "courses") {
        this.router.navigate("#/courses");
        requestAnimationFrame(() =>
          document.getElementById("searchInput")?.focus(),
        );
      } else {
        document.getElementById("searchInput")?.focus();
      }
    });
  }

  bindDelegatedEvents() {
    // Debounced live search inside Courses view
    document.addEventListener(
      "input",
      debounce((e) => {
        if (e.target?.id !== "searchInput") return;
        this.coursesState.query = e.target.value;
        Render.courses(this.coursesState.catId, this.coursesState.query);
      }, 180),
    );

    // Category sidebar clicks (event delegation, works after re-renders)
    document.addEventListener("click", (e) => {
      const catBtn = e.target.closest("#catList button[data-id]");
      if (catBtn) {
        const id = catBtn.dataset.id;
        this.coursesState = { catId: id, query: this.coursesState.query };
        this.router.navigate(id === "all" ? "#/courses" : `#/courses/${id}`);
        return;
      }

      // Track "recently viewed" whenever a PDF is opened or downloaded
      const fileLink = e.target.closest("[data-file-open], [data-recent-open]");
      if (fileLink) {
        const raw = fileLink.dataset.fileOpen || fileLink.dataset.recentOpen;
        try {
          const entry = JSON.parse(decodeURIComponent(raw));
          RecentStore.add(entry);
          Toast.show(`Opening “${entry.label}”…`);
        } catch {
          /* ignore malformed payload */
        }
        return;
      }

      // Practice tool clicks -> toast confirmation
      const toolLink = e.target.closest("[data-tool]");
      if (toolLink) {
        const tool = TOOLS.find((t) => t.id === toolLink.dataset.tool);
        if (tool) Toast.show(`Opening ${tool.name} in a new tab…`);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App().init();
});
