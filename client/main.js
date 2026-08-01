/* =====================================================================
   TECH SOURCE — data + app logic
   ===================================================================== */

/* ---------- helpers to build tree nodes quickly ---------- */
function leaf(title) {
  return { title };
}
function group(icon, title, children) {
  return { icon, title, children };
}
function leafGroup(icon, title, items) {
  return { icon, title, children: items.map(leaf) };
}

/* ---------- LEARNING PATH TREE ---------- */
const LEARN_TREE = [
  leafGroup("🧠", "Agile", [
    "Scrum",
    "Sprint Planning",
    "Daily Standup",
    "Sprint Review",
    "Sprint Retrospective",
    "User Stories",
    "Story Points",
    "Estimation Techniques",
    "Definition of Done",
    "Definition of Ready",
    "Product Backlog",
    "Sprint Backlog",
    "Burn Down Chart",
  ]),
  leafGroup("🎟️", "JIRA", [
    "Dashboard",
    "Boards",
    "Issue Types",
    "Workflow",
    "Sprint Management",
    "Reports",
    "Filters",
    "JQL",
    "Components",
    "Versions",
    "Automation Rules",
  ]),
  leafGroup("👨‍🎓", "ISTQB", [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Brushing Up",
    "Agile Testing",
    "Mock Tests",
    "Interview Questions",
  ]),
  group("☕", "JAVA — Updated", [
    leafGroup("📄", "Core Java", [
      "OOPS Basics",
      "Data Types",
      "Scanner",
      "Variables",
      "Operators",
      "Static Keyword",
      "Memory Allocation",
      "String",
      "Wrapper Classes",
      "Access Modifiers",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
      "Encapsulation",
      "Interfaces",
      "Exception Handling",
      "Collections Framework",
      "Generics",
      "Enums",
      "File Handling",
      "Java 8 Features",
      "Lambda Expressions",
      "Stream API",
      "Functional Interface",
      "Date & Time API",
      "Multithreading",
      "Synchronization",
      "Executor Framework",
    ]),
    leafGroup("📄", "Programming", [
      "Conditional Statements",
      "Looping Statements",
      "Arrays",
      "Methods",
      "Constructors",
      "Recursion",
      "Searching Algorithms",
      "Sorting Algorithms",
    ]),
    leafGroup("💼", "Interview Programs", [
      "Java Interview Programs – Level 1",
      "Java Interview Programs – Level 2",
      "Java Interview Programs – Advanced",
    ]),
    leafGroup("📦", "POJO", [
      "POJO Class",
      "Builder Pattern",
      "Immutable Objects",
    ]),
    leafGroup("📖", "Java Theory", [
      "JVM",
      "JDK vs JRE",
      "Garbage Collection",
      "Memory Management",
      "Class Loader",
    ]),
  ]),
  group("🌐", "Selenium", [
    leafGroup("📄", "Basics", [
      "Selenium Architecture",
      "Selenium Components",
      "Browser Drivers",
    ]),
    leafGroup("🎯", "WebDriver Methods", [
      "Browser Commands",
      "Navigation Commands",
      "Wait Commands",
      "Switch Commands",
    ]),
    leafGroup("🔶", "WebElement Methods", [
      "Click",
      "SendKeys",
      "Clear",
      "Submit",
      "Attribute Methods",
    ]),
    leafGroup("📍", "Locators", [
      "ID",
      "Name",
      "Class Name",
      "Tag Name",
      "Link Text",
      "Partial Link Text",
    ]),
    leafGroup("❌", "XPath", [
      "Absolute XPath",
      "Relative XPath",
      "Axes",
      "Functions",
    ]),
    leafGroup("🎨", "CSS Selector", ["Basic CSS", "Advanced CSS"]),
    leaf("☑️ CheckBox & Radio Button"),
    leafGroup("📋", "Select Class", [
      "Select By Visible Text",
      "Select By Value",
      "Select By Index",
    ]),
    leafGroup("💪", "Actions Class", [
      "Drag & Drop",
      "Hover",
      "Right Click",
      "Double Click",
    ]),
    leaf("🚨 Alerts"),
    leaf("🖼️ Frames"),
    leaf("🪟 Window Handling"),
    leafGroup("⏰", "Waits", ["Implicit Wait", "Explicit Wait", "Fluent Wait"]),
    leafGroup("📜", "JavaScript Executor", [
      "Scroll",
      "Click",
      "Highlight Element",
    ]),
    leaf("📊 Web Tables"),
    leaf("📸 Screenshots"),
    leaf("📂 File Upload & Download"),
    leaf("🧩 Selectable & Sortable"),
    leaf("⚠️ Selenium Exceptions"),
    leaf("📄 Page Object Model"),
    leaf("🌑 Shadow DOM"),
    leaf("🍪 Cookies"),
    leaf("📱 Mobile Emulation"),
    leaf("🔍 Browser Logs"),
  ]),
  group("🌍", "API Testing", [
    leafGroup("🔥", "REST Assured", [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "Authentication",
      "Serialization",
      "Deserialization",
      "JSON Schema Validation",
    ]),
  ]),
  leafGroup("🗄️", "SQL", [
    "CRUD",
    "Joins",
    "Group By",
    "Having",
    "Stored Procedures",
  ]),
  leaf("📄 JDBC"),
  leaf("❌ Fillo"),
  leafGroup("🤖", "Gen AI", [
    "ChatGPT",
    "Copilot",
    "Gemini",
    "Claude",
    "AI for Test Automation",
    "Prompt Engineering",
  ]),
  group("🛠️", "Automation Tools", [
    leafGroup("📦", "Maven", [
      "POM.xml",
      "Dependencies",
      "Plugins",
      "Profiles",
    ]),
    leafGroup("🌿", "Git", [
      "Repository",
      "Branch",
      "Merge",
      "Rebase",
      "Cherry Pick",
      "Stash",
      "GitHub Flow",
    ]),
    leafGroup("🚀", "CI/CD", [
      "Jenkins",
      "GitHub Actions",
      "Azure DevOps",
      "GitLab CI",
    ]),
    leafGroup("📈", "Reporting", [
      "Extent Reports",
      "Allure Reports",
      "HTML Reports",
    ]),
  ]),
  group("🏗️", "Frameworks", [
    leafGroup("🧪", "TestNG", [
      "Annotations",
      "Assertions",
      "Groups",
      "Listeners",
      "Retry Analyzer",
      "Parallel Execution",
      "DataProvider",
      "Parameters",
    ]),
    leafGroup("🥒", "Cucumber", [
      "Gherkin",
      "Feature Files",
      "Step Definitions",
      "Hooks",
      "Tags",
      "Scenario Outline",
    ]),
    leaf("📊 Data Driven Framework"),
    leaf("🔥 Hybrid Framework"),
    leaf("🧩 Keyword Driven Framework"),
    leaf("🧪 JUnit"),
  ]),
  leafGroup("▶️", "Playwright", [
    "Page Methods",
    "Locator Methods",
    "Advanced Locators",
    "Dropdown",
    "Actions",
    "Alerts",
    "Frames",
    "Window Handling",
    "File Upload & Download",
    "Assertions",
    "Keyboard Actions",
    "Mouse Actions",
    "Browser Context",
    "Trace Viewer",
    "Screenshots",
    "Auto Waiting",
    "Code Generator",
    "Cookies",
    "Mobile Testing",
    "Shadow DOM",
    "API Testing with Playwright",
  ]),
  leaf("📋 Scenario-Based Interview"),
  leaf("💬 Tell Me About Yourself"),
];

/* ---------- INTERVIEW & SCENARIOS LIST ---------- */
const PREP_TREE = [
  leaf("📁 Project"),
  leaf("🧪 Testing Concepts"),
  leaf("🏗️ Framework"),
  leaf("🤖 Automation"),
  leaf("📈 Agile Sprint"),
  leaf("🌿 GitHub"),
  leaf("🚀 CI/CD"),
  leaf("📊 Data Driven Framework"),
  leaf("🐞 Defect Management"),
  leaf("🌐 API Testing"),
  leaf("☁️ Cloud Testing"),
  leaf("📱 Mobile Testing"),
  leaf("⚡ Performance Testing"),
  leaf("🔐 Security Testing"),
  leaf("🤝 Team Collaboration"),
  leaf("🎯 Client Communication"),
  leaf("🧠 Debugging Scenarios"),
  leaf("🔥 Real-Time Selenium Scenarios"),
  leaf("🎭 Playwright Scenarios"),
  leaf("📦 API Scenarios"),
  leaf("💼 HR Interview"),
];

/* ---------- EXTERNAL RESOURCE LINKS ---------- */
const EXTERNAL_LINKS = [
  {
    icon: "✨",
    name: "Claude",
    desc: "Draft, debug and reason through tricky test scenarios.",
    url: "https://claude.ai/new",
  },
  {
    icon: "💬",
    name: "ChatGPT",
    desc: "A second opinion on test cases, code or concepts.",
    url: "https://chatgpt.com/",
  },
  {
    icon: "📘",
    name: "W3Schools",
    desc: "Quick syntax reference for Java, SQL, HTML & more.",
    url: "https://www.w3schools.com/",
  },
  {
    icon: "⚙️",
    name: "OneCompiler",
    desc: "Run Java snippets straight from the browser.",
    url: "https://onecompiler.com/java",
  },
  {
    icon: "🥷",
    name: "Selfmade Ninja",
    desc: "Structured QA & automation coursework.",
    url: "https://academy.selfmade.ninja/login",
  },
  {
    icon: "🎓",
    name: "Udemy",
    desc: "Deep-dive video courses on Selenium, Java & Playwright.",
    url: "https://www.udemy.com/",
  },
];

/* =====================================================================
   State
   ===================================================================== */
const state = {
  tab: "learn",
  flatLearn: [],
  flatPrep: [],
  activePath: null, // array of node titles from root to current leaf
  activeFlatIndex: -1,
  activeTree: "learn",
  done: new Set(), // in-memory "reviewed" tracker (session only)
};

/* =====================================================================
   Flatten trees (for prev/next + search + progress denominators)
   ===================================================================== */
function flatten(nodes, trail, out) {
  nodes.forEach((node) => {
    const path = [...trail, node];
    if (node.children && node.children.length) {
      flatten(node.children, path, out);
    } else {
      out.push(path);
    }
  });
}
flatten(LEARN_TREE, [], state.flatLearn);
flatten(PREP_TREE, [], state.flatPrep);

/* =====================================================================
   Render sidebar tree
   ===================================================================== */
const treeLearnEl = document.getElementById("treeLearn");
const treePrepEl = document.getElementById("treePrep");

function buildAllTrees() {
  const fragL = document.createDocumentFragment();
  renderInto(fragL, LEARN_TREE, [], 1);
  treeLearnEl.innerHTML = "";
  treeLearnEl.appendChild(fragL);

  const fragP = document.createDocumentFragment();
  renderInto(fragP, PREP_TREE, [], 1);
  treePrepEl.innerHTML = "";
  treePrepEl.appendChild(fragP);
}

/* simpler recursive builder that appends directly into a fragment/container */
function renderInto(container, nodes, trail, depth) {
  nodes.forEach((node) => {
    const isBranch = !!(node.children && node.children.length);
    const wrap = document.createElement("div");
    wrap.className = "node";
    wrap.dataset.depth = depth;
    wrap.dataset.path = JSON.stringify([...trail, node.title]);

    const row = document.createElement("div");
    row.className = "node-row" + (isBranch ? "" : " leaf");
    row.tabIndex = 0;

    const icon = document.createElement("span");
    icon.className = "n-icon";
    icon.textContent = node.icon || (isBranch ? "📁" : "▫️");
    row.appendChild(icon);

    const label = document.createElement("span");
    label.className = "n-label";
    label.textContent = node.title;
    row.appendChild(label);

    if (isBranch) {
      const caret = document.createElement("span");
      caret.className = "n-caret";
      caret.textContent = "▸";
      row.appendChild(caret);
      row.addEventListener("click", () => wrap.classList.toggle("open"));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          wrap.classList.toggle("open");
        }
      });
      wrap.appendChild(row);

      const childBox = document.createElement("div");
      childBox.className = "children";
      renderInto(childBox, node.children, [...trail, node.title], depth + 1);
      wrap.appendChild(childBox);
    } else {
      const fullPath = [...trail, node.title];
      row.addEventListener("click", () =>
        selectLeaf(fullPath, container.closest("#treePrep") ? "prep" : "learn"),
      );
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectLeaf(
            fullPath,
            container.closest("#treePrep") ? "prep" : "learn",
          );
        }
      });
      wrap.appendChild(row);
    }
    container.appendChild(wrap);
  });
}

buildAllTrees();

/* =====================================================================
   Topbar quick links
   ===================================================================== */
const topLinksEl = document.getElementById("topLinks");
EXTERNAL_LINKS.forEach((l) => {
  const a = document.createElement("a");
  a.href = l.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.title = l.name;
  a.textContent = l.icon;
  topLinksEl.appendChild(a);
});

const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode",
    );
    themeToggle.title =
      theme === "light" ? "Switch to dark mode" : "Switch to light mode";
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  }
}

const savedTheme = localStorage.getItem("techsource-theme");
const initialTheme = savedTheme === "light" ? "light" : "dark";
applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";
  localStorage.setItem("techsource-theme", nextTheme);
  applyTheme(nextTheme);
});

const quickGridEl = document.getElementById("quickGrid");
EXTERNAL_LINKS.forEach((l) => {
  const a = document.createElement("a");
  a.className = "quick-card";
  a.href = l.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.innerHTML = `
    <span class="qc-icon">${l.icon}</span>
    <span class="qc-name">${l.name}</span>
    <span class="qc-desc">${l.desc}</span>
    <span class="qc-go">Open ↗</span>`;
  quickGridEl.appendChild(a);
});

/* "Jump back in" stat cards */
const statRowEl = document.getElementById("statRow");
const STAT_ENTRIES = [
  {
    icon: "🌐",
    title: "Selenium Locators",
    sub: "ID · XPath · CSS Selector",
    path: ["🌐 Selenium", "📍 Locators", "ID"],
  },
  {
    icon: "☕",
    title: "Core Java",
    sub: "OOPS to Multithreading",
    path: ["☕ JAVA — Updated", "📄 Core Java", "OOPS Basics"],
  },
  {
    icon: "🔥",
    title: "REST Assured",
    sub: "GET · POST · Auth",
    path: ["🌍 API Testing", "🔥 REST Assured", "GET"],
  },
  {
    icon: "💼",
    title: "HR Interview",
    sub: "Tell Me About Yourself",
    path: ["💬 Tell Me About Yourself"],
  },
];
STAT_ENTRIES.forEach((s) => {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `<span class="sc-icon">${s.icon}</span><div class="sc-title">${s.title}</div><div class="sc-sub">${s.sub}</div>`;
  card.addEventListener("click", () => selectLeaf(s.path, "learn"));
  statRowEl.appendChild(card);
});

/* =====================================================================
   Views / selection logic
   ===================================================================== */
const homeView = document.getElementById("homeView");
const topicView = document.getElementById("topicView");
const crumbEl = document.getElementById("crumb");
const topicIcon = document.getElementById("topicIcon");
const topicPath = document.getElementById("topicPath");
const topicTitle = document.getElementById("topicTitle");
const topicBody = document.getElementById("topicBody");
const markBtn = document.getElementById("markBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const CATEGORY_HINTS = {
  agile: {
    blurb:
      "the working rhythm agile teams use to plan, size and ship in short cycles",
    tool: EXTERNAL_LINKS[0],
  },
  jira: {
    blurb: "how work items are tracked, filtered and reported on inside JIRA",
    tool: EXTERNAL_LINKS[0],
  },
  istqb: {
    blurb: "core testing theory as examined by the ISTQB syllabus",
    tool: EXTERNAL_LINKS[2],
  },
  java: {
    blurb: "a foundational Java concept used throughout automation code",
    tool: EXTERNAL_LINKS[3],
  },
  programming: {
    blurb: "a core programming building block used across languages",
    tool: EXTERNAL_LINKS[3],
  },
  pojo: {
    blurb: "a plain-object design pattern used in Java automation frameworks",
    tool: EXTERNAL_LINKS[2],
  },
  selenium: {
    blurb: "a piece of browser automation with Selenium WebDriver",
    tool: EXTERNAL_LINKS[2],
  },
  api: {
    blurb: "a request/response concept for testing services and APIs",
    tool: EXTERNAL_LINKS[2],
  },
  sql: {
    blurb: "a database concept testers rely on for backend validation",
    tool: EXTERNAL_LINKS[2],
  },
  "gen ai": {
    blurb: "how generative AI tools plug into a modern QA workflow",
    tool: EXTERNAL_LINKS[1],
  },
  automation: {
    blurb: "tooling that keeps automated test suites reliable and repeatable",
    tool: EXTERNAL_LINKS[4],
  },
  framework: {
    blurb: "a structural piece of a test automation framework",
    tool: EXTERNAL_LINKS[4],
  },
  playwright: {
    blurb: "a modern end-to-end testing capability in Playwright",
    tool: EXTERNAL_LINKS[2],
  },
  interview: {
    blurb: "a scenario commonly raised in QA interview rounds",
    tool: EXTERNAL_LINKS[0],
  },
  jdbc: {
    blurb: "how Java code talks directly to a database",
    tool: EXTERNAL_LINKS[2],
  },
  fillo: {
    blurb: "a lightweight way to drive tests from Excel data",
    tool: EXTERNAL_LINKS[2],
  },
};

function hintFor(path) {
  const joined = path.join(" ").toLowerCase();
  for (const k of Object.keys(CATEGORY_HINTS)) {
    if (joined.includes(k)) return CATEGORY_HINTS[k];
  }
  return {
    blurb: "a topic on your QA and automation learning map",
    tool: EXTERNAL_LINKS[5],
  };
}

function stripEmoji(s) {
  return s.replace(/^[^\w(]+\s*/u, "").trim() || s;
}

function findSiblings(path, tree) {
  // walk tree to locate the node's parent children list
  let nodes = tree,
    parentTitle = null;
  for (let i = 0; i < path.length - 1; i++) {
    const found = nodes.find((n) => n.title === path[i]);
    if (!found) return { siblings: [], parentTitle: null };
    parentTitle = found.title;
    nodes = found.children || [];
  }
  return {
    siblings: nodes
      .map((n) => n.title)
      .filter((t) => t !== path[path.length - 1]),
    parentTitle,
  };
}

function renderTopicBody(path, treeKey) {
  const title = path[path.length - 1];
  const clean = stripEmoji(title);
  const hint = hintFor(path);
  const tree = treeKey === "prep" ? PREP_TREE : LEARN_TREE;
  const { siblings, parentTitle } = findSiblings(path, tree);

  let html = `<span class="tb-tag">${treeKey === "prep" ? "Interview & Scenarios" : "Learning Path"}</span>`;
  html += `<p>This node covers <strong>${clean}</strong> — ${hint.blurb}. Use it as a placeholder outline: attach your own notes, code samples or a worked example here, and this hub carries the structure for you.</p>`;

  if (siblings.length) {
    html += `<p>Other topics alongside it under <strong>${stripEmoji(parentTitle || "")}</strong>:</p>`;
    html += `<ul>${siblings
      .slice(0, 10)
      .map((s) => `<li>${stripEmoji(s)}</li>`)
      .join("")}</ul>`;
  }

  html += `<p>Need a hand fleshing this out? <a href="${hint.tool.url}" target="_blank" rel="noopener noreferrer" style="color:var(--blue-2)">${hint.tool.name} ↗</a> is a solid place to start.</p>`;

  topicBody.innerHTML = html;
}

function selectLeaf(path, treeKey) {
  state.activePath = path;
  state.activeTree = treeKey;

  const flat = treeKey === "prep" ? state.flatPrep : state.flatLearn;
  state.activeFlatIndex = flat.findIndex((p) => p.join("›") === path.join("›"));

  // breadcrumb
  crumbEl.innerHTML = "";
  const homeCrumb = document.createElement("span");
  homeCrumb.className = "crumb-item";
  homeCrumb.textContent =
    treeKey === "prep" ? "Interview & Scenarios" : "Learning Path";
  crumbEl.appendChild(homeCrumb);
  path.forEach((p) => {
    const sep = document.createElement("span");
    sep.className = "sep";
    sep.textContent = "/";
    crumbEl.appendChild(sep);
    const item = document.createElement("span");
    item.className = "crumb-item current";
    item.textContent = stripEmoji(p);
    crumbEl.appendChild(item);
  });

  const title = path[path.length - 1];
  const iconMatch = title.match(
    /^\p{Emoji_Presentation}|\p{Extended_Pictographic}/u,
  );
  topicIcon.textContent = iconMatch ? iconMatch[0] : "📄";
  topicPath.textContent =
    path.slice(0, -1).map(stripEmoji).join("  ›  ") ||
    (treeKey === "prep" ? "Interview & Scenarios" : "Learning Path");
  topicTitle.textContent = stripEmoji(title);

  renderTopicBody(path, treeKey);

  const key = path.join("›");
  markBtn.classList.toggle("done", state.done.has(key));
  markBtn.textContent = state.done.has(key) ? "✓ Reviewed" : "Mark as reviewed";

  prevBtn.disabled = state.activeFlatIndex <= 0;
  nextBtn.disabled =
    state.activeFlatIndex === -1 || state.activeFlatIndex >= flat.length - 1;

  homeView.hidden = true;
  topicView.hidden = false;
  const chatViewElx = document.getElementById("chatView");
  if (chatViewElx) chatViewElx.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });

  highlightActiveInTree(key);
  closeMobileSidebar();
}

function highlightActiveInTree(key) {
  document
    .querySelectorAll(".node-row.leaf.active")
    .forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".node").forEach((nodeEl) => {
    try {
      const p = JSON.parse(nodeEl.dataset.path || "[]");
      if (p.join("›") === key) {
        const row = nodeEl.querySelector(":scope > .node-row");
        row.classList.add("active");
        row.classList.toggle("done", state.done.has(key));
        // expand ancestors
        let ancestor = nodeEl.parentElement;
        while (ancestor && ancestor !== document.body) {
          if (ancestor.classList && ancestor.classList.contains("node"))
            ancestor.classList.add("open");
          ancestor = ancestor.parentElement;
        }
      }
    } catch (e) {
      /* not a leaf-path node */
    }
  });
}

/* mark as reviewed */
markBtn.addEventListener("click", () => {
  if (!state.activePath) return;
  const key = state.activePath.join("›");
  if (state.done.has(key)) state.done.delete(key);
  else state.done.add(key);
  markBtn.classList.toggle("done", state.done.has(key));
  markBtn.textContent = state.done.has(key) ? "✓ Reviewed" : "Mark as reviewed";
  highlightActiveInTree(key);
  updateProgress();
});

/* prev / next */
prevBtn.addEventListener("click", () => {
  const flat = state.activeTree === "prep" ? state.flatPrep : state.flatLearn;
  if (state.activeFlatIndex > 0)
    selectLeaf(flat[state.activeFlatIndex - 1], state.activeTree);
});
nextBtn.addEventListener("click", () => {
  const flat = state.activeTree === "prep" ? state.flatPrep : state.flatLearn;
  if (state.activeFlatIndex < flat.length - 1)
    selectLeaf(flat[state.activeFlatIndex + 1], state.activeTree);
});

/* progress */
function updateProgress() {
  const total = state.flatLearn.length + state.flatPrep.length;
  const done = state.done.size;
  document.getElementById("progressCount").textContent = `${done} / ${total}`;
  document.getElementById("progressFill").style.width = total
    ? `${(done / total) * 100}%`
    : "0%";
}
updateProgress();

/* =====================================================================
   Tabs
   ===================================================================== */
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    state.tab = btn.dataset.tab;
    treeLearnEl.hidden = state.tab !== "learn";
    treePrepEl.hidden = state.tab !== "prep";
    const chatTopicsEl = document.getElementById("chatTopics");
    if (chatTopicsEl) chatTopicsEl.hidden = state.tab !== "chat";
    if (state.tab === "chat") openChatView();
  });
});

/* =====================================================================
   Search
   ===================================================================== */
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applySearch(q) {
  searchClear.classList.toggle("show", !!q);
  const query = q.trim().toLowerCase();
  const activeTreeEl = state.tab === "prep" ? treePrepEl : treeLearnEl;
  const otherTreeEl = state.tab === "prep" ? treeLearnEl : treePrepEl;
  [activeTreeEl, otherTreeEl].forEach((root) => {
    const nodes = root.querySelectorAll(".node");
    if (!query) {
      nodes.forEach((n) => {
        n.style.display = "";
        n.classList.remove("open");
        const l = n.querySelector(":scope>.node-row .n-label");
        if (l) l.innerHTML = l.textContent;
      });
      const existingMsg = root.querySelector(".no-results");
      if (existingMsg) existingMsg.remove();
      return;
    }
    let anyMatch = false;
    nodes.forEach((n) => {
      const labelEl = n.querySelector(":scope > .node-row .n-label");
      if (!labelEl) return;
      const text = labelEl.textContent;
      const match = text.toLowerCase().includes(query);
      if (match) {
        anyMatch = true;
        labelEl.innerHTML = text.replace(
          new RegExp("(" + escapeReg(q) + ")", "ig"),
          "<mark>$1</mark>",
        );
      } else {
        labelEl.innerHTML = text;
      }
    });
    nodes.forEach((n) => {
      const label = n
        .querySelector(":scope > .node-row .n-label")
        .textContent.toLowerCase();
      const selfMatch = label.includes(query);
      const descMatch =
        n.querySelector(".n-label") &&
        Array.from(n.querySelectorAll(".n-label")).some((l) =>
          l.textContent.toLowerCase().includes(query),
        );
      const show = selfMatch || descMatch;
      n.style.display = show ? "" : "none";
      if (show && descMatch) n.classList.add("open");
    });
    const existingMsg = root.querySelector(".no-results");
    if (existingMsg) existingMsg.remove();
    if (!anyMatch) {
      const msg = document.createElement("div");
      msg.className = "no-results";
      msg.textContent = `No topics match "${q}"`;
      root.appendChild(msg);
    }
  });
}

searchInput.addEventListener("input", (e) => applySearch(e.target.value));
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  applySearch("");
  searchInput.focus();
});

/* =====================================================================
   Mobile sidebar toggle
   ===================================================================== */
const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("sidebarScrim");
document.getElementById("menuBtn").addEventListener("click", () => {
  sidebar.classList.add("open");
  scrim.classList.add("show");
});
document
  .getElementById("sidebarClose")
  .addEventListener("click", closeMobileSidebar);
scrim.addEventListener("click", closeMobileSidebar);
function closeMobileSidebar() {
  sidebar.classList.remove("open");
  scrim.classList.remove("show");
}

/* =====================================================================
   Home link (breadcrumb "Home"/logo click returns to hero)
   ===================================================================== */
document.querySelector(".brand").addEventListener("click", () => {
  topicView.hidden = true;
  homeView.hidden = false;
  const chatViewEl = document.getElementById("chatView");
  if (chatViewEl) chatViewEl.hidden = true;
  crumbEl.innerHTML = '<span class="crumb-item">Home</span>';
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================================================
   LIVE CLOCK — sidebar pill + topbar
   ===================================================================== */
const clockTimeEl = document.getElementById("clockTime");
const clockDateEl = document.getElementById("clockDate");
const topbarTimeEl = document.getElementById("topbarTime");
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad2(n) {
  return n < 10 ? "0" + n : "" + n;
}

function tickClock() {
  const now = new Date();
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  const timeStr = `${hh}:${mm}:${ss}`;
  const dateStr = `${WEEKDAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  if (clockTimeEl) clockTimeEl.textContent = timeStr;
  if (clockDateEl) clockDateEl.textContent = dateStr;
  if (topbarTimeEl) topbarTimeEl.textContent = timeStr;
}
tickClock();
setInterval(tickClock, 1000);

/* =====================================================================
   PARTICLE CANVAS — animated ambient circuit-dust background
   ===================================================================== */
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];
  const COUNT = window.innerWidth < 720 ? 34 : 70;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.22;
    this.vy = (Math.random() - 0.5) * 0.22;
    this.r = Math.random() * 1.6 + 0.6;
  }
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function step() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(41,182,246,0.55)";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(41,182,246,0.10)";
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(step);
  }
})();

/* =====================================================================
   HOME — "many buttons with learning topics"
   Build a button grid from the top-level LEARN_TREE categories.
   ===================================================================== */
function countLeaves(node) {
  if (!node.children || !node.children.length) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}
function firstLeafPath(node, trail) {
  const path = [...trail, node.title];
  if (!node.children || !node.children.length) return path;
  return firstLeafPath(node.children[0], path);
}

const topicBtnGridEl = document.getElementById("topicBtnGrid");
if (topicBtnGridEl) {
  LEARN_TREE.forEach((node) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "topic-btn";
    const total = countLeaves(node);
    btn.innerHTML = `
      <span class="tb-icon">${node.icon || "📄"}</span>
      <span class="tb-name">${stripEmoji(node.title)}</span>
      <span class="tb-count">${total} topic${total === 1 ? "" : "s"}</span>`;
    btn.addEventListener("click", () => {
      const path = firstLeafPath(node, []);
      selectLeaf(path, "learn");
    });
    topicBtnGridEl.appendChild(btn);
  });
}

/* =====================================================================
   AI CHAT ASSISTANT
   ===================================================================== */
const TOPIC_CONTENT = {
  agile: [
    "Agile is an iterative approach to software delivery that breaks work into short cycles called sprints, usually one to four weeks long, so teams can inspect progress and adapt quickly.",
    "Instead of trying to plan an entire release upfront, an agile team plans just enough to start the next sprint, then re-plans as real feedback comes in from stakeholders and users.",
    "Core ceremonies — sprint planning, daily standup, sprint review and retrospective — keep the team aligned on what is being built, what is done, and what should change next time.",
  ],
  jira: [
    "JIRA is a work-tracking tool most agile teams use to manage backlogs, sprints, and issues such as stories, bugs, and tasks.",
    "Boards give a visual view of work moving through a workflow (To Do → In Progress → Done), while JQL (JIRA Query Language) lets you filter and report on issues precisely.",
    "For QA, JIRA is usually where bugs are logged, linked to the story that introduced them, and tracked through triage to resolution.",
  ],
  istqb: [
    "ISTQB (International Software Testing Qualifications Board) defines a syllabus of core testing theory: test levels, test types, static vs dynamic testing, and test design techniques.",
    "The Foundation Level certification is the most common entry point and covers fundamentals like the test process, defect lifecycle, and black-box/white-box techniques such as equivalence partitioning and boundary value analysis.",
    "Many interviewers use ISTQB terminology as a shared vocabulary, so it is worth being fluent in it even outside the exam.",
  ],
  java: [
    "Java is the most common language for building Selenium and REST Assured based automation frameworks because of its strong typing, mature ecosystem, and huge community support.",
    "Foundational concepts to be solid on include OOP (inheritance, polymorphism, encapsulation, abstraction), collections, exception handling, and Java 8 features like lambdas and streams.",
    "A framework typically leans on interfaces and the Page Object Model to keep test code readable and maintainable as the suite grows.",
  ],
  selenium: [
    "Selenium WebDriver automates real browser interactions — clicking, typing, navigating — by sending commands to a browser driver that mimics a human user.",
    "Locator strategy matters a lot: ID and CSS selectors tend to be fastest and most stable, while XPath is more flexible for complex, dynamic pages.",
    "Waits (implicit, explicit, fluent) are essential for reliability, since modern web apps render content asynchronously and a script that runs too fast will fail against elements that are not ready yet.",
  ],
  api: [
    "API testing validates a service directly at the HTTP layer — checking status codes, response bodies, headers, and timing — without needing a UI.",
    "REST Assured is a popular Java library for this: you build a request, send it, and assert on the response using a fluent given/when/then syntax.",
    "Good API tests also check negative cases (bad input, missing auth, rate limits) and validate response structure with JSON schema validation.",
  ],
  sql: [
    "SQL is essential for testers who need to verify what actually landed in the database after an action in the UI or API.",
    "CRUD operations (Create, Read, Update, Delete), JOINs across tables, and GROUP BY/HAVING for aggregation are the bread-and-butter queries used in backend validation.",
    "Stored procedures are also common in enterprise systems, and testers are often asked to validate their output against expected business rules.",
  ],
  playwright: [
    "Playwright is a modern browser automation library (from Microsoft) that supports Chromium, Firefox and WebKit from a single API, with built-in auto-waiting.",
    "It ships with strong tooling out of the box: a trace viewer for debugging failed runs, a codegen tool that records actions into a script, and first-class support for API testing.",
    "Because it auto-waits for elements to be actionable, Playwright scripts tend to be less flaky than traditional Selenium scripts that rely on manual wait strategies.",
  ],
  cicd: [
    "CI/CD (Continuous Integration / Continuous Delivery) automatically builds, tests, and often deploys code every time it changes, catching regressions early.",
    "Jenkins, GitHub Actions, GitLab CI and Azure DevOps are common pipeline tools that can trigger your automated test suite on every pull request or merge.",
    "A healthy pipeline fails fast, reports clearly (often via Extent or Allure reports), and keeps the feedback loop short enough that developers actually act on it.",
  ],
  framework: [
    "A test automation framework is the set of conventions, libraries, and structure that make automated tests reliable, reusable, and easy to maintain.",
    "Common styles include data-driven (tests driven by external data sets), keyword-driven (tests built from reusable action keywords), and hybrid frameworks that combine both.",
    "TestNG or JUnit typically provide the test runner, annotations, and assertions, while Page Object Model keeps locators and page logic out of the test methods themselves.",
  ],
  interview: [
    'QA interviews usually mix theory (testing types, SDLC/STLC, defect lifecycle) with practical coding (write a locator, debug a flaky test) and scenario questions ("how would you test X").',
    "Be ready to walk through a project you actually worked on: the framework, the tools, the CI setup, and a hard bug you found.",
    "For behavioral rounds, structure answers with a brief situation, the action you took, and the measurable result — it keeps answers tight and easy to follow.",
  ],
  genai: [
    "Generative AI tools like ChatGPT, Claude, Copilot and Gemini are increasingly used in QA to draft test cases, explain unfamiliar code, and speed up boilerplate automation scripting.",
    "Prompt engineering — being specific about the framework, language, and constraints — makes a big difference in how usable the generated output is.",
    "These tools are best treated as a fast first draft: still review generated test logic and assertions carefully before trusting them in a suite.",
  ],
};

const CHAT_TOPIC_BUTTONS = [
  { key: "agile", icon: "🧠", label: "Agile" },
  { key: "jira", icon: "🎟️", label: "JIRA" },
  { key: "istqb", icon: "👨‍🎓", label: "ISTQB" },
  { key: "java", icon: "☕", label: "Core Java" },
  { key: "selenium", icon: "🌐", label: "Selenium" },
  { key: "api", icon: "🌍", label: "API Testing" },
  { key: "sql", icon: "🗄️", label: "SQL" },
  { key: "playwright", icon: "▶️", label: "Playwright" },
  { key: "cicd", icon: "🚀", label: "CI/CD" },
  { key: "framework", icon: "🏗️", label: "Frameworks" },
  { key: "interview", icon: "💼", label: "Interview Tips" },
  { key: "genai", icon: "🤖", label: "Gen AI for QA" },
];

const chatMessagesEl = document.getElementById("chatMessages");
const chatFormEl = document.getElementById("chatForm");
const chatInputEl = document.getElementById("chatInput");
const chatTypingEl = document.getElementById("chatTyping");
const chatClearBtn = document.getElementById("chatClearBtn");
const chatBtnGridEl = document.getElementById("chatBtnGrid");
const chatViewEl = document.getElementById("chatView");

let chatOpened = false;

if (chatBtnGridEl) {
  CHAT_TOPIC_BUTTONS.forEach((t) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chat-topic-btn";
    b.innerHTML = `<span class="ct-icon">${t.icon}</span><span>${t.label}</span>`;
    b.addEventListener("click", () => {
      document.querySelector('.tab[data-tab="chat"]').click();
      askChat(`Tell me about ${t.label}`, t.key);
    });
    chatBtnGridEl.appendChild(b);
  });
}

function nowTime() {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function addChatMessage(role, paragraphs) {
  const wrap = document.createElement("div");
  wrap.className = "chat-msg " + role;

  const avatar = document.createElement("span");
  avatar.className = "chat-avatar " + role;
  avatar.textContent = role === "user" ? "YOU" : "TS";

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  paragraphs.forEach((txt) => {
    const p = document.createElement("p");
    p.textContent = txt;
    bubble.appendChild(p);
  });
  const time = document.createElement("span");
  time.className = "cb-time";
  time.textContent = nowTime();
  bubble.appendChild(time);

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatMessagesEl.appendChild(wrap);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function findTopicKey(text) {
  const q = text.toLowerCase();
  if (/(jira)/.test(q)) return "jira";
  if (/(istqb)/.test(q)) return "istqb";
  if (/(agile|scrum|sprint)/.test(q)) return "agile";
  if (/(selenium|webdriver|xpath|locator)/.test(q)) return "selenium";
  if (/(playwright)/.test(q)) return "playwright";
  if (/(rest assured|api testing|\bapi\b)/.test(q)) return "api";
  if (/(\bsql\b|database|query|join)/.test(q)) return "sql";
  if (/(java\b|oop|collections)/.test(q)) return "java";
  if (/(ci\/cd|jenkins|pipeline|github actions)/.test(q)) return "cicd";
  if (/(framework|testng|cucumber|pom\b|page object)/.test(q))
    return "framework";
  if (/(interview|hr round|tell me about yourself)/.test(q)) return "interview";
  if (/(gen ai|chatgpt|claude|copilot|gemini|prompt)/.test(q)) return "genai";
  return null;
}

function askChat(userText, forcedKey) {
  addChatMessage("user", [userText]);
  chatInputEl.value = "";
  chatTypingEl.hidden = false;
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;

  const key = forcedKey || findTopicKey(userText);
  const delay = 550 + Math.random() * 500;

  setTimeout(() => {
    chatTypingEl.hidden = true;
    if (key && TOPIC_CONTENT[key]) {
      addChatMessage("bot", TOPIC_CONTENT[key]);
    } else {
      addChatMessage("bot", [
        `I don't have a canned answer for "${userText}" yet, but here is a starting point.`,
        "Try asking about Agile, JIRA, ISTQB, Core Java, Selenium, API Testing, SQL, Playwright, CI/CD, Frameworks, Interview Tips, or Gen AI — or tap one of the topic buttons in the sidebar.",
      ]);
    }
  }, delay);
}

function openChatView() {
  homeView.hidden = true;
  topicView.hidden = true;
  chatViewEl.hidden = false;
  crumbEl.innerHTML = '<span class="crumb-item">AI Chat Assistant</span>';
  if (!chatOpened) {
    chatOpened = true;
    addChatMessage("bot", [
      "Hi, I am the Tech Source assistant. Ask me about Agile, JIRA, ISTQB, Java, Selenium, API testing, SQL, Playwright, CI/CD, frameworks, or interview prep.",
      "Tap a topic button in the sidebar, or just type a question below.",
    ]);
  }
  chatInputEl.focus();
}

if (chatFormEl) {
  chatFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInputEl.value.trim();
    if (!text) return;
    askChat(text);
  });
}

if (chatClearBtn) {
  chatClearBtn.addEventListener("click", () => {
    chatMessagesEl.innerHTML = "";
    chatOpened = false;
    openChatView();
  });
}
