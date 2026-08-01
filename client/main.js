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

  showPage("topic");

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
document.getElementById("brandHome").addEventListener("click", () => {
  showPage("home");
  crumbEl.innerHTML = '<span class="crumb-item">Home</span>';
});
document.getElementById("brandHome").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    document.getElementById("brandHome").click();
  }
});

/* =====================================================================
   PAGE ROUTER (Home / Topic / Quiz / Manual Admin / Auto Admin / Resources)
   ===================================================================== */
const pageEls = {
  home: document.getElementById("homeView"),
  topic: document.getElementById("topicView"),
  quiz: document.getElementById("quizView"),
  manualAdmin: document.getElementById("manualAdminView"),
  autoAdmin: document.getElementById("autoAdminView"),
  resources: document.getElementById("resourcesView"),
};

function showPage(name) {
  Object.entries(pageEls).forEach(([k, el]) => {
    if (el) el.hidden = k !== name;
  });
  const navKey = name === "topic" ? "home" : name;
  document
    .querySelectorAll(".pn-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === navKey));
  window.scrollTo({ top: 0, behavior: "smooth" });
  closeMobileSidebar();
}

document.querySelectorAll("[data-page]").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

/* =====================================================================
   THEME TOGGLE (persisted)
   ===================================================================== */
const htmlEl = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("ts-theme");
if (savedTheme) htmlEl.setAttribute("data-theme", savedTheme);
else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
)
  htmlEl.setAttribute("data-theme", "light");

themeToggle.addEventListener("click", () => {
  const next = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("ts-theme", next);
});

/* =====================================================================
   Live hub pulse (animated counters on Home)
   ===================================================================== */
function animateCount(el, target, suffix) {
  let cur = 0;
  const step = Math.max(1, Math.round(target / 40));
  const id = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(id);
    }
    el.textContent = cur + (suffix || "");
  }, 18);
}
const pulseRowEl = document.getElementById("pulseRow");
const pulseData = [
  {
    label: "Learning topics mapped",
    value: state.flatLearn.length,
    suffix: "",
  },
  {
    label: "Interview & scenario prompts",
    value: state.flatPrep.length,
    suffix: "",
  },
  { label: "MCQs to practice", value: 0, suffix: "", id: "pulseMcq" },
  {
    label: "External learning tools",
    value: EXTERNAL_LINKS.length,
    suffix: "",
  },
];
pulseData.forEach((p) => {
  const card = document.createElement("div");
  card.className = "pulse-card";
  card.innerHTML = `<span class="pulse-num" ${p.id ? `id="${p.id}"` : ""}>0</span><span class="pulse-label">${p.label}</span>`;
  pulseRowEl.appendChild(card);
});
function renderPulseNumbers() {
  document
    .querySelectorAll(".pulse-num")
    .forEach((el, i) =>
      animateCount(el, pulseData[i].value, pulseData[i].suffix),
    );
}

/* =====================================================================
   Resources page grid (mirrors quick-grid)
   ===================================================================== */
const resourceGridEl = document.getElementById("resourceGrid");
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
  resourceGridEl.appendChild(a);
});

/* =====================================================================
   MCQ QUIZ — objective questions & answers built from the content map
   ===================================================================== */
const QUIZ_BANK = {
  agile: {
    icon: "🧠",
    name: "Agile & Scrum",
    questions: [
      {
        q: "Who is responsible for maximizing the value of the product in Scrum?",
        options: [
          "Scrum Master",
          "Product Owner",
          "Development Team",
          "Project Manager",
        ],
        correct: 1,
        explain:
          "The Product Owner owns and prioritizes the Product Backlog to maximize value.",
      },
      {
        q: "What is the recommended maximum length of a Sprint?",
        options: ["1 week", "2 weeks", "1 month", "2 months"],
        correct: 2,
        explain: "The Scrum Guide caps a Sprint at one calendar month.",
      },
      {
        q: "Which artifact represents the work planned for a Sprint?",
        options: [
          "Product Backlog",
          "Sprint Backlog",
          "Burn Down Chart",
          "Definition of Done",
        ],
        correct: 1,
        explain:
          "The Sprint Backlog is the Sprint Goal plus the items selected for that Sprint.",
      },
      {
        q: "What is the purpose of the Daily Standup?",
        options: [
          "Assign blame for missed tasks",
          "Sync the team and surface blockers in ~15 minutes",
          "Report status to management",
          "Estimate story points",
        ],
        correct: 1,
        explain:
          "It is a short inspect-and-adapt event for the Development Team.",
      },
      {
        q: "Which technique commonly estimates relative story size?",
        options: [
          "Gantt chart",
          "Planning Poker",
          "Critical path method",
          "PERT chart",
        ],
        correct: 1,
        explain:
          "Planning Poker uses relative sizing (often Fibonacci-like numbers) for story points.",
      },
      {
        q: "The Sprint Retrospective is held to…",
        options: [
          "Demo the increment to stakeholders",
          "Inspect how the last Sprint went and plan process improvements",
          "Refine the backlog",
          "Sign off releases",
        ],
        correct: 1,
        explain:
          "Retrospective = team reflects on people, process and tools to improve next Sprint.",
      },
    ],
  },
  jira: {
    icon: "🎟️",
    name: "JIRA",
    questions: [
      {
        q: "What does JQL stand for?",
        options: [
          "JIRA Quick Language",
          "JIRA Query Language",
          "Java Query Logic",
          "JIRA Queue List",
        ],
        correct: 1,
        explain:
          "JQL (JIRA Query Language) is used to search and filter issues.",
      },
      {
        q: "Which JIRA feature lets you visualize a team\u2019s workflow as columns?",
        options: ["Board", "Component", "Version", "Filter"],
        correct: 0,
        explain:
          "Scrum/Kanban Boards visualize issues moving through workflow statuses.",
      },
      {
        q: 'A "Bug" in JIRA is an example of an…',
        options: ["Issue Type", "Sprint", "Epic Link", "Workflow Scheme"],
        correct: 0,
        explain: "Story, Task, Bug and Epic are common default Issue Types.",
      },
      {
        q: "What is used to group related issues released together?",
        options: ["Component", "Version/Release", "Label", "Filter"],
        correct: 1,
        explain:
          "Versions represent a release; issues can be tagged as Fix Version.",
      },
      {
        q: "Which JIRA feature auto-transitions issues based on triggers/conditions?",
        options: ["Automation Rules", "Dashboards", "Reports", "Backlog"],
        correct: 0,
        explain:
          "Automation Rules run trigger → condition → action logic on issues.",
      },
    ],
  },
  istqb: {
    icon: "👨‍🎓",
    name: "ISTQB Foundations",
    questions: [
      {
        q: 'Which testing principle states "testing shows presence of defects, not their absence"?',
        options: [
          "Pesticide Paradox",
          "Exhaustive testing is impossible",
          "Defect Clustering",
          "Testing shows presence of defects",
        ],
        correct: 3,
        explain: "One of the seven ISTQB testing principles.",
      },
      {
        q: "Repeating the same tests until they stop finding new bugs is known as…",
        options: [
          "Regression Testing",
          "Pesticide Paradox",
          "Early Testing",
          "Defect Clustering",
        ],
        correct: 1,
        explain:
          "The Pesticide Paradox: the same tests eventually stop finding new defects.",
      },
      {
        q: "Which level of testing is typically performed first?",
        options: [
          "System Testing",
          "Acceptance Testing",
          "Unit Testing",
          "Integration Testing",
        ],
        correct: 2,
        explain: "Unit Testing validates individual components first.",
      },
      {
        q: "Black-box testing techniques design test cases based on…",
        options: [
          "Internal code structure",
          "Requirements/specifications without seeing code",
          "Compiler output",
          "Database schema only",
        ],
        correct: 1,
        explain:
          "Black-box testing is specification-based, not implementation-based.",
      },
      {
        q: 'What does the "V-Model" pair each development phase with?',
        options: [
          "A code review",
          "A corresponding testing phase",
          "A retrospective",
          "A sprint",
        ],
        correct: 1,
        explain:
          "Each development stage in the V-Model has a matching test level.",
      },
    ],
  },
  java: {
    icon: "☕",
    name: "Core Java",
    questions: [
      {
        q: "Which keyword prevents a class from being subclassed?",
        options: ["static", "final", "private", "abstract"],
        correct: 1,
        explain: "A final class cannot be extended.",
      },
      {
        q: "Which collection does NOT allow duplicate elements?",
        options: ["List", "Set", "Map values", "Array"],
        correct: 1,
        explain: "Set enforces uniqueness of elements.",
      },
      {
        q: "What does the JVM do with unused objects?",
        options: [
          "Manual free()",
          "Garbage Collection",
          "Nothing, memory leaks",
          "Compiler removes them",
        ],
        correct: 1,
        explain:
          "The Garbage Collector automatically reclaims unreachable objects.",
      },
      {
        q: "Which feature lets a class implement multiple contracts in Java?",
        options: [
          "Multiple inheritance of classes",
          "Interfaces",
          "Abstract classes only",
          "Static methods",
        ],
        correct: 1,
        explain:
          "Java supports multiple interface implementation, not multiple class inheritance.",
      },
      {
        q: 'What does the "static" keyword mean for a variable?',
        options: [
          "Belongs to the instance",
          "Belongs to the class, shared across instances",
          "Cannot be changed",
          "Runs only once at compile time",
        ],
        correct: 1,
        explain:
          "Static members belong to the class rather than any single object.",
      },
      {
        q: "Which Java 8 feature enables functional-style operations on collections?",
        options: ["Stream API", "Applet API", "Reflection API", "Servlet API"],
        correct: 0,
        explain: "Stream API supports map/filter/reduce style pipelines.",
      },
    ],
  },
  selenium: {
    icon: "🌐",
    name: "Selenium WebDriver",
    questions: [
      {
        q: "Which locator is generally the most stable when an element has a unique attribute?",
        options: ["XPath using text()", "ID", "Absolute XPath", "Class Name"],
        correct: 1,
        explain:
          "ID is fast and stable when unique; prefer it over fragile XPath/text.",
      },
      {
        q: "Which wait keeps polling until a condition is true, up to a timeout?",
        options: [
          "Implicit Wait",
          "Explicit Wait (WebDriverWait)",
          "Thread.sleep",
          "Page Load Timeout",
        ],
        correct: 1,
        explain:
          "Explicit waits use ExpectedConditions to poll until a state is reached.",
      },
      {
        q: "Which class handles mouse hover, drag-and-drop and right-click?",
        options: [
          "Select class",
          "Actions class",
          "JavascriptExecutor",
          "Alert interface",
        ],
        correct: 1,
        explain: "The Actions class builds complex user gesture sequences.",
      },
      {
        q: "Which design pattern separates page structure from test logic?",
        options: [
          "Singleton Pattern",
          "Page Object Model",
          "Factory Pattern",
          "Observer Pattern",
        ],
        correct: 1,
        explain:
          "POM keeps locators/actions in page classes, tests stay clean.",
      },
      {
        q: "Which interface is used to select options from a dropdown?",
        options: ["Actions", "Select", "Alert", "WebElement"],
        correct: 1,
        explain:
          "The Select class wraps <select> dropdowns (by value/index/visible text).",
      },
      {
        q: "What handles unexpected native browser popups like alerts?",
        options: [
          "Alert interface",
          "Select class",
          "Frame switch",
          "Cookie handling",
        ],
        correct: 0,
        explain:
          "driver.switchTo().alert() returns the Alert interface to accept/dismiss/read text.",
      },
    ],
  },
  api: {
    icon: "🌍",
    name: "API Testing",
    questions: [
      {
        q: "Which HTTP method is used to fully replace a resource?",
        options: ["GET", "PATCH", "PUT", "DELETE"],
        correct: 2,
        explain:
          "PUT typically replaces the whole resource; PATCH updates it partially.",
      },
      {
        q: "Which HTTP status code indicates a successful resource creation?",
        options: ["200 OK", "201 Created", "301 Moved", "404 Not Found"],
        correct: 1,
        explain:
          "201 Created is returned after a successful POST that creates a resource.",
      },
      {
        q: "In REST Assured, which method starts building a request?",
        options: ["given()", "when()", "then()", "assertThat()"],
        correct: 0,
        explain:
          "given() sets up preconditions like headers/body before when()/then().",
      },
      {
        q: "What does JSON Schema Validation check?",
        options: [
          "Response time only",
          "That the JSON response matches an expected structure/types",
          "HTTP status text",
          "SSL certificate",
        ],
        correct: 1,
        explain:
          "It validates structure, required fields and data types of a JSON payload.",
      },
      {
        q: "Which HTTP status range generally indicates a client error?",
        options: ["1xx", "2xx", "3xx", "4xx"],
        correct: 3,
        explain: "4xx = client errors (e.g. 400 Bad Request, 404 Not Found).",
      },
    ],
  },
  sql: {
    icon: "🗄️",
    name: "SQL",
    questions: [
      {
        q: "Which clause filters rows after grouping (on aggregated values)?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correct: 1,
        explain:
          "HAVING filters groups; WHERE filters rows before aggregation.",
      },
      {
        q: "Which JOIN returns only matching rows from both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
        correct: 2,
        explain: "INNER JOIN returns rows with matches in both tables.",
      },
      {
        q: "Which SQL command removes all rows but keeps the table structure fastest?",
        options: ["DELETE", "DROP", "TRUNCATE", "ALTER"],
        correct: 2,
        explain:
          "TRUNCATE quickly removes all rows and resets identity, keeping the schema.",
      },
      {
        q: "Which keyword is used to sort query results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
        correct: 1,
        explain: "ORDER BY sorts the result set ascending/descending.",
      },
      {
        q: "What does CRUD stand for in database operations?",
        options: [
          "Create, Read, Update, Delete",
          "Control, Retrieve, Undo, Drop",
          "Copy, Read, Use, Delete",
          "Create, Run, Undo, Debug",
        ],
        correct: 0,
        explain:
          "CRUD = Create, Read, Update, Delete — the four basic data operations.",
      },
    ],
  },
  automation: {
    icon: "🛠️",
    name: "Automation Tools & CI/CD",
    questions: [
      {
        q: "Which file defines dependencies and build config in a Maven project?",
        options: [
          "build.gradle",
          "pom.xml",
          "package.json",
          "requirements.txt",
        ],
        correct: 1,
        explain:
          "pom.xml (Project Object Model) configures Maven dependencies and plugins.",
      },
      {
        q: 'What does "git rebase" primarily do?',
        options: [
          "Deletes a branch",
          "Replays commits on top of another base commit",
          "Creates a pull request",
          "Compresses the repo",
        ],
        correct: 1,
        explain:
          "Rebase re-applies commits onto a new base for a linear history.",
      },
      {
        q: "Which tool is commonly used to build CI/CD pipelines from a Jenkinsfile?",
        options: ["Jenkins", "Selenium", "TestNG", "Maven"],
        correct: 0,
        explain: "Jenkins pipelines are typically defined in a Jenkinsfile.",
      },
      {
        q: "Which reporting library produces rich HTML test reports for Java frameworks?",
        options: ["Extent Reports", "JDBC", "Fillo", "JQL"],
        correct: 0,
        explain:
          "Extent Reports (and Allure) generate detailed HTML test execution reports.",
      },
      {
        q: 'What is "git stash" used for?',
        options: [
          "Permanently deleting changes",
          "Temporarily shelving uncommitted changes",
          "Merging two branches",
          "Tagging a release",
        ],
        correct: 1,
        explain:
          "Stash saves working-directory changes so you can switch context and reapply later.",
      },
    ],
  },
  frameworks: {
    icon: "🏗️",
    name: "Test Frameworks",
    questions: [
      {
        q: "Which TestNG annotation runs once before all tests in a class?",
        options: [
          "@BeforeMethod",
          "@BeforeClass",
          "@BeforeTest",
          "@BeforeSuite",
        ],
        correct: 1,
        explain:
          "@BeforeClass runs once before the first test method in that class.",
      },
      {
        q: "In Cucumber, where are Given/When/Then steps written?",
        options: [
          "Feature file (Gherkin)",
          "pom.xml",
          "TestNG.xml",
          "Step Definitions only",
        ],
        correct: 0,
        explain: "Gherkin syntax (Given/When/Then) lives in .feature files.",
      },
      {
        q: "Which framework style reads test data from an external source like Excel/CSV?",
        options: [
          "Data Driven Framework",
          "Keyword Driven Framework",
          "Linear Scripting",
          "BDD only",
        ],
        correct: 0,
        explain: "Data Driven Framework separates test data from test logic.",
      },
      {
        q: "Which TestNG feature reruns failed tests automatically?",
        options: ["Listener", "Retry Analyzer", "DataProvider", "Parameters"],
        correct: 1,
        explain:
          "IRetryAnalyzer implementation retries failed tests a set number of times.",
      },
      {
        q: "What connects Gherkin steps to executable Java code in Cucumber?",
        options: ["Hooks", "Step Definitions", "Tags", "Scenario Outline"],
        correct: 1,
        explain: "Step Definitions map Gherkin text to automation code.",
      },
    ],
  },
  playwright: {
    icon: "▶️",
    name: "Playwright",
    questions: [
      {
        q: "Which Playwright feature automatically waits for elements to be actionable?",
        options: [
          "Manual Thread.sleep",
          "Auto-Waiting",
          "Explicit polling only",
          "JavaScript Executor",
        ],
        correct: 1,
        explain:
          "Playwright auto-waits for elements to be visible/stable/enabled before acting.",
      },
      {
        q: "What does the Playwright Trace Viewer help with?",
        options: [
          "Writing SQL queries",
          "Debugging test runs with timeline, DOM & network snapshots",
          "Managing JIRA boards",
          "Compiling Java code",
        ],
        correct: 1,
        explain:
          "Trace Viewer visualizes actions, screenshots, console and network per test.",
      },
      {
        q: "Which command generates Playwright test code by recording browser actions?",
        options: [
          "Code Generator (codegen)",
          "Trace Viewer",
          "Fixtures",
          "Locator API",
        ],
        correct: 0,
        explain:
          "`playwright codegen` records interactions and emits test code.",
      },
      {
        q: "What isolates cookies/storage between tests in Playwright?",
        options: ["Browser Context", "Page object", "Frame", "Locator"],
        correct: 0,
        explain:
          "A Browser Context is an isolated session, like an incognito profile.",
      },
      {
        q: "Which API is preferred for interacting with elements in modern Playwright?",
        options: ["Locator API", "findElement", "WebElement", "Select class"],
        correct: 0,
        explain:
          "Locators are lazy and auto-retrying, replacing older element-handle patterns.",
      },
    ],
  },
};

let quizState = { catKey: null, order: [], idx: 0, score: 0, answered: false };

const quizCatGrid = document.getElementById("quizCatGrid");
const quizSetup = document.getElementById("quizSetup");
const quizRunner = document.getElementById("quizRunner");
const quizResult = document.getElementById("quizResult");
const quizCatLabel = document.getElementById("quizCatLabel");
const quizScoreEl = document.getElementById("quizScore");
const quizProgressLabel = document.getElementById("quizProgressLabel");
const quizProgressFill = document.getElementById("quizProgressFill");
const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizFeedbackEl = document.getElementById("quizFeedback");
const quizNextBtn = document.getElementById("quizNext");
const quizQuitBtn = document.getElementById("quizQuit");

let totalMcqCount = 0;
Object.entries(QUIZ_BANK).forEach(([key, cat]) => {
  totalMcqCount += cat.questions.length;
  const card = document.createElement("button");
  card.className = "quiz-cat-card";
  card.innerHTML = `<span class="qcc-icon">${cat.icon}</span><span class="qcc-name">${cat.name}</span><span class="qcc-count">${cat.questions.length} questions</span>`;
  card.addEventListener("click", () => startQuiz(key));
  quizCatGrid.appendChild(card);
});
pulseData[2].value = totalMcqCount;
renderPulseNumbers();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(key) {
  const cat = QUIZ_BANK[key];
  quizState = {
    catKey: key,
    order: shuffle(cat.questions),
    idx: 0,
    score: 0,
    answered: false,
  };
  quizSetup.hidden = true;
  quizResult.hidden = true;
  quizRunner.hidden = false;
  quizCatLabel.textContent = `${cat.icon} ${cat.name}`;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const cat = QUIZ_BANK[quizState.catKey];
  const q = quizState.order[quizState.idx];
  quizState.answered = false;
  quizQuestionEl.textContent = q.q;
  quizFeedbackEl.hidden = true;
  quizNextBtn.disabled = true;
  quizNextBtn.textContent =
    quizState.idx === quizState.order.length - 1
      ? "See results →"
      : "Next question →";
  quizScoreEl.textContent = `Score: ${quizState.score}`;
  quizProgressLabel.textContent = `Q ${quizState.idx + 1} / ${quizState.order.length}`;
  quizProgressFill.style.width = `${(quizState.idx / quizState.order.length) * 100}%`;

  quizOptionsEl.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => answerQuiz(i, q, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function answerQuiz(i, q, btnEl) {
  if (quizState.answered) return;
  quizState.answered = true;
  const correct = i === q.correct;
  if (correct) quizState.score++;
  [...quizOptionsEl.children].forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correct) b.classList.add("correct");
    else if (idx === i) b.classList.add("wrong");
  });
  quizFeedbackEl.hidden = false;
  quizFeedbackEl.innerHTML = `${correct ? "✅ Correct." : "❌ Not quite."} ${q.explain}`;
  quizScoreEl.textContent = `Score: ${quizState.score}`;
  quizNextBtn.disabled = false;
}

quizNextBtn.addEventListener("click", () => {
  if (quizState.idx < quizState.order.length - 1) {
    quizState.idx++;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
});

quizQuitBtn.addEventListener("click", () => {
  quizRunner.hidden = true;
  quizResult.hidden = true;
  quizSetup.hidden = false;
});

function finishQuiz() {
  quizRunner.hidden = true;
  quizResult.hidden = false;
  const total = quizState.order.length;
  const pct = Math.round((quizState.score / total) * 100);
  document.getElementById("resultRing").style.setProperty("--pct", pct);
  document.getElementById("resultRing").innerHTML = `<span>${pct}%</span>`;
  const cat = QUIZ_BANK[quizState.catKey];
  document.getElementById("resultHeading").textContent =
    pct >= 70 ? "🎉 Nicely done!" : "Keep going!";
  document.getElementById("resultSub").textContent =
    `You scored ${quizState.score} / ${total} on ${cat.name}.`;
}

document
  .getElementById("quizRetry")
  .addEventListener("click", () => startQuiz(quizState.catKey));
document.getElementById("quizBackCats").addEventListener("click", () => {
  quizResult.hidden = true;
  quizSetup.hidden = false;
});

/* =====================================================================
   ADMIN BOARDS — Manual Testing & Automation Testing (localStorage CRUD)
   ===================================================================== */
const modalScrim = document.getElementById("modalScrim");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalSave = document.getElementById("modalSave");
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalCancel").addEventListener("click", closeModal);
modalScrim.addEventListener("click", (e) => {
  if (e.target === modalScrim) closeModal();
});
function openModal() {
  modalScrim.classList.add("show");
}
function closeModal() {
  modalScrim.classList.remove("show");
  modalBody.innerHTML = "";
  modalSave.onclick = null;
}

function seedIfEmpty(key, seed) {
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify(seed));
}
function loadRows(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}
function saveRows(key, rows) {
  localStorage.setItem(key, JSON.stringify(rows));
}

function badgeClass(val) {
  return val.toLowerCase().replace(/\s+/g, "");
}

/* ---------- MANUAL TESTING BOARD ---------- */
const MANUAL_KEY = "ts-manual-cases";
seedIfEmpty(MANUAL_KEY, [
  {
    id: "MT-101",
    title: "Verify login with valid credentials",
    module: "Authentication",
    priority: "High",
    status: "Pass",
    tester: "A. Rao",
    steps:
      "1. Open login page\n2. Enter valid username/password\n3. Click Login",
    expected: "User is redirected to dashboard",
  },
  {
    id: "MT-102",
    title: "Verify error on invalid password",
    module: "Authentication",
    priority: "High",
    status: "Fail",
    tester: "A. Rao",
    steps:
      "1. Open login page\n2. Enter valid username, wrong password\n3. Click Login",
    expected: 'Inline error: "Invalid credentials"',
  },
  {
    id: "MT-103",
    title: "Verify JIRA board drag-and-drop between columns",
    module: "JIRA Board",
    priority: "Medium",
    status: "Pending",
    tester: "S. Iyer",
    steps: "1. Open board\n2. Drag a card from To Do to In Progress",
    expected: "Card status updates and persists",
  },
  {
    id: "MT-104",
    title: "Verify SQL search filter returns exact matches",
    module: "Search",
    priority: "Low",
    status: "Blocked",
    tester: "M. Khan",
    steps: "1. Enter search term\n2. Apply filter",
    expected: "Only exact matches are displayed",
  },
]);
function manualStats(rows) {
  return {
    total: rows.length,
    pass: rows.filter((r) => r.status === "Pass").length,
    fail: rows.filter((r) => r.status === "Fail").length,
    pending: rows.filter(
      (r) => r.status === "Pending" || r.status === "Blocked",
    ).length,
  };
}
function renderManualStats() {
  const rows = loadRows(MANUAL_KEY);
  const s = manualStats(rows);
  document.getElementById("manualStats").innerHTML = `
    <div class="stat-card"><span class="sc-num">${s.total}</span><span class="sc-sub">Total test cases</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#38c172">${s.pass}</span><span class="sc-sub">Passed</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#f0555a">${s.fail}</span><span class="sc-sub">Failed</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#e0a72d">${s.pending}</span><span class="sc-sub">Pending / Blocked</span></div>`;
}
function renderManualTable() {
  const rows = loadRows(MANUAL_KEY);
  const q = document.getElementById("manualSearch").value.trim().toLowerCase();
  const filterStatus = document.getElementById("manualFilter").value;
  const tbody = document.getElementById("manualTbody");
  const filtered = rows.filter((r) => {
    const matchesQ =
      !q ||
      [r.title, r.module, r.tester, r.id].join(" ").toLowerCase().includes(q);
    const matchesF = filterStatus === "all" || r.status === filterStatus;
    return matchesQ && matchesF;
  });
  tbody.innerHTML = filtered
    .map(
      (r) => `
    <tr>
      <td class="row-id">${r.id}</td>
      <td>${r.title}</td>
      <td>${r.module}</td>
      <td><span class="badge ${badgeClass(r.priority)}">${r.priority}</span></td>
      <td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td>
      <td>${r.tester}</td>
      <td><div class="row-actions">
        <button class="edit" title="Edit" data-id="${r.id}">✎</button>
        <button class="del" title="Delete" data-id="${r.id}">🗑</button>
      </div></td>
    </tr>`,
    )
    .join("");
  document.getElementById("manualEmpty").hidden = filtered.length !== 0;
  tbody
    .querySelectorAll(".edit")
    .forEach((b) =>
      b.addEventListener("click", () => openManualModal(b.dataset.id)),
    );
  tbody.querySelectorAll(".del").forEach((b) =>
    b.addEventListener("click", () => {
      if (!confirm("Delete this test case?")) return;
      saveRows(
        MANUAL_KEY,
        loadRows(MANUAL_KEY).filter((r) => r.id !== b.dataset.id),
      );
      renderManualStats();
      renderManualTable();
    }),
  );
  renderManualStats();
}
function openManualModal(id) {
  const rows = loadRows(MANUAL_KEY);
  const row = rows.find((r) => r.id === id) || {
    id: "MT-" + Math.floor(100 + Math.random() * 900),
    title: "",
    module: "",
    priority: "Medium",
    status: "Pending",
    tester: "",
    steps: "",
    expected: "",
  };
  modalTitle.textContent = id ? `Edit ${id}` : "New Manual Test Case";
  modalBody.innerHTML = `
    <label>Test case ID<input id="f_id" value="${row.id}" ${id ? "readonly" : ""}></label>
    <label>Title<input id="f_title" value="${row.title}" placeholder="Verify…"></label>
    <label>Module<input id="f_module" value="${row.module}" placeholder="e.g. Authentication"></label>
    <label>Priority
      <select id="f_priority">
        ${["High", "Medium", "Low"].map((p) => `<option ${row.priority === p ? "selected" : ""}>${p}</option>`).join("")}
      </select>
    </label>
    <label>Status
      <select id="f_status">
        ${["Pass", "Fail", "Blocked", "Pending"].map((s) => `<option ${row.status === s ? "selected" : ""}>${s}</option>`).join("")}
      </select>
    </label>
    <label>Tester<input id="f_tester" value="${row.tester}" placeholder="Owner name"></label>
    <label>Steps<textarea id="f_steps" rows="3">${row.steps || ""}</textarea></label>
    <label>Expected result<textarea id="f_expected" rows="2">${row.expected || ""}</textarea></label>`;
  modalSave.onclick = () => {
    const updated = {
      id: document.getElementById("f_id").value.trim() || row.id,
      title: document.getElementById("f_title").value.trim() || "Untitled case",
      module: document.getElementById("f_module").value.trim() || "General",
      priority: document.getElementById("f_priority").value,
      status: document.getElementById("f_status").value,
      tester: document.getElementById("f_tester").value.trim() || "Unassigned",
      steps: document.getElementById("f_steps").value,
      expected: document.getElementById("f_expected").value,
    };
    let all = loadRows(MANUAL_KEY);
    const idx = all.findIndex((r) => r.id === id);
    if (idx > -1) all[idx] = updated;
    else all.push(updated);
    saveRows(MANUAL_KEY, all);
    closeModal();
    renderManualTable();
  };
  openModal();
}
document
  .getElementById("manualAddBtn")
  .addEventListener("click", () => openManualModal(null));
document
  .getElementById("manualSearch")
  .addEventListener("input", renderManualTable);
document
  .getElementById("manualFilter")
  .addEventListener("change", renderManualTable);

/* ---------- AUTOMATION TESTING BOARD ---------- */
const AUTO_KEY = "ts-auto-scripts";
seedIfEmpty(AUTO_KEY, [
  {
    id: "AT-201",
    name: "Login_ValidCredentials_Test",
    framework: "Selenium + TestNG",
    suite: "Regression",
    status: "Passed",
    lastRun: "2026-07-30",
  },
  {
    id: "AT-202",
    name: "API_CreateUser_StatusCode201",
    framework: "REST Assured",
    suite: "API Smoke",
    status: "Passed",
    lastRun: "2026-07-30",
  },
  {
    id: "AT-203",
    name: "Checkout_AddToCart_E2E",
    framework: "Playwright",
    suite: "E2E",
    status: "Failed",
    lastRun: "2026-07-29",
  },
  {
    id: "AT-204",
    name: "JIRA_BoardDragDrop_Scenario",
    framework: "Playwright + Cucumber",
    suite: "BDD Regression",
    status: "Not Run",
    lastRun: "—",
  },
]);
function autoStats(rows) {
  return {
    total: rows.length,
    passed: rows.filter((r) => r.status === "Passed").length,
    failed: rows.filter((r) => r.status === "Failed").length,
    other: rows.filter((r) => r.status === "Skipped" || r.status === "Not Run")
      .length,
  };
}
function renderAutoStats() {
  const rows = loadRows(AUTO_KEY);
  const s = autoStats(rows);
  document.getElementById("autoStats").innerHTML = `
    <div class="stat-card"><span class="sc-num">${s.total}</span><span class="sc-sub">Total scripts</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#38c172">${s.passed}</span><span class="sc-sub">Passed</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#f0555a">${s.failed}</span><span class="sc-sub">Failed</span></div>
    <div class="stat-card"><span class="sc-num" style="color:#e0a72d">${s.other}</span><span class="sc-sub">Skipped / Not run</span></div>`;
}
function renderAutoTable() {
  const rows = loadRows(AUTO_KEY);
  const q = document.getElementById("autoSearch").value.trim().toLowerCase();
  const filterStatus = document.getElementById("autoFilter").value;
  const tbody = document.getElementById("autoTbody");
  const filtered = rows.filter((r) => {
    const matchesQ =
      !q ||
      [r.name, r.framework, r.suite, r.id].join(" ").toLowerCase().includes(q);
    const matchesF = filterStatus === "all" || r.status === filterStatus;
    return matchesQ && matchesF;
  });
  tbody.innerHTML = filtered
    .map(
      (r) => `
    <tr>
      <td class="row-id">${r.id}</td>
      <td>${r.name}</td>
      <td>${r.framework}</td>
      <td>${r.suite}</td>
      <td><span class="badge ${badgeClass(r.status)}">${r.status}</span></td>
      <td>${r.lastRun}</td>
      <td><div class="row-actions">
        <button class="edit" title="Edit" data-id="${r.id}">✎</button>
        <button class="del" title="Delete" data-id="${r.id}">🗑</button>
      </div></td>
    </tr>`,
    )
    .join("");
  document.getElementById("autoEmpty").hidden = filtered.length !== 0;
  tbody
    .querySelectorAll(".edit")
    .forEach((b) =>
      b.addEventListener("click", () => openAutoModal(b.dataset.id)),
    );
  tbody.querySelectorAll(".del").forEach((b) =>
    b.addEventListener("click", () => {
      if (!confirm("Delete this script?")) return;
      saveRows(
        AUTO_KEY,
        loadRows(AUTO_KEY).filter((r) => r.id !== b.dataset.id),
      );
      renderAutoStats();
      renderAutoTable();
    }),
  );
  renderAutoStats();
}
function openAutoModal(id) {
  const rows = loadRows(AUTO_KEY);
  const row = rows.find((r) => r.id === id) || {
    id: "AT-" + Math.floor(200 + Math.random() * 300),
    name: "",
    framework: "Selenium + TestNG",
    suite: "Regression",
    status: "Not Run",
    lastRun: new Date().toISOString().slice(0, 10),
  };
  modalTitle.textContent = id ? `Edit ${id}` : "New Automation Script";
  modalBody.innerHTML = `
    <label>Script ID<input id="f_id" value="${row.id}" ${id ? "readonly" : ""}></label>
    <label>Test / script name<input id="f_name" value="${row.name}" placeholder="e.g. Login_ValidCredentials_Test"></label>
    <label>Framework
      <select id="f_framework">
        ${["Selenium + TestNG", "Selenium + JUnit", "Playwright", "Playwright + Cucumber", "REST Assured", "Cucumber + TestNG"].map((f) => `<option ${row.framework === f ? "selected" : ""}>${f}</option>`).join("")}
      </select>
    </label>
    <label>Suite<input id="f_suite" value="${row.suite}" placeholder="e.g. Regression, Smoke"></label>
    <label>Status
      <select id="f_status">
        ${["Passed", "Failed", "Skipped", "Not Run"].map((s) => `<option ${row.status === s ? "selected" : ""}>${s}</option>`).join("")}
      </select>
    </label>
    <label>Last run date<input id="f_lastrun" type="date" value="${row.lastRun && row.lastRun !== "—" ? row.lastRun : ""}"></label>`;
  modalSave.onclick = () => {
    const updated = {
      id: document.getElementById("f_id").value.trim() || row.id,
      name: document.getElementById("f_name").value.trim() || "Untitled_Script",
      framework: document.getElementById("f_framework").value,
      suite: document.getElementById("f_suite").value.trim() || "General",
      status: document.getElementById("f_status").value,
      lastRun: document.getElementById("f_lastrun").value || "—",
    };
    let all = loadRows(AUTO_KEY);
    const idx = all.findIndex((r) => r.id === id);
    if (idx > -1) all[idx] = updated;
    else all.push(updated);
    saveRows(AUTO_KEY, all);
    closeModal();
    renderAutoTable();
  };
  openModal();
}
document
  .getElementById("autoAddBtn")
  .addEventListener("click", () => openAutoModal(null));
document
  .getElementById("autoSearch")
  .addEventListener("input", renderAutoTable);
document
  .getElementById("autoFilter")
  .addEventListener("change", renderAutoTable);

renderManualTable();
renderAutoTable();

/* =====================================================================
   CHAT WIDGET — quick-link launcher + simple keyword assistant
   ===================================================================== */
const chatFab = document.getElementById("chatFab");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatQuicklinks = document.getElementById("chatQuicklinks");

EXTERNAL_LINKS.forEach((l) => {
  const b = document.createElement("button");
  b.textContent = `${l.icon} ${l.name}`;
  b.addEventListener("click", () => window.open(l.url, "_blank", "noopener"));
  chatQuicklinks.appendChild(b);
});

function addMsg(text, who) {
  const m = document.createElement("div");
  m.className = `msg ${who}`;
  m.innerHTML = text;
  chatBody.appendChild(m);
  chatBody.scrollTop = chatBody.scrollHeight;
  return m;
}

let chatOpened = false;
function openChat() {
  chatPanel.hidden = false;
  chatFab.setAttribute("aria-expanded", "true");
  if (!chatOpened) {
    chatOpened = true;
    addMsg(
      `Hi! I'm the <strong>Tech Source</strong> assistant — <em>Creativity at it's peak!</em> 👋<br>Ask me about a topic (Selenium, SQL, JIRA, Agile…) or tap a tool below to jump straight to it.`,
      "bot",
    );
  }
}
function closeChat() {
  chatPanel.hidden = true;
  chatFab.setAttribute("aria-expanded", "false");
}
chatFab.addEventListener("click", () =>
  chatPanel.hidden ? openChat() : closeChat(),
);
chatClose.addEventListener("click", closeChat);

function findTopicMatch(query) {
  const q = query.toLowerCase();
  let best = null;
  state.flatLearn.concat(state.flatPrep).forEach((path) => {
    const label = stripEmoji(path[path.length - 1]).toLowerCase();
    if (q.includes(label) || label.includes(q)) best = path;
  });
  return best;
}

function botReply(query) {
  const q = query.toLowerCase().trim();
  if (!q) return "Type a topic name, or tap one of the tools below 👇";

  if (/quiz|mcq|question/.test(q)) {
    return `We've got ${totalMcqCount}+ objective questions across Agile, JIRA, ISTQB, Java, Selenium, API Testing, SQL, Frameworks &amp; Playwright. Open the <strong>📝 MCQ Quiz</strong> tab up top to practice.`;
  }
  if (/manual/.test(q)) {
    return `Head to the <strong>🧪 Manual Testing Admin</strong> board to log and track manual test cases with Pass/Fail/Blocked/Pending status.`;
  }
  if (/automation admin|automation board|script/.test(q)) {
    return `Check the <strong>🤖 Automation Admin</strong> board to track Selenium/Playwright/REST Assured scripts and their last run status.`;
  }
  if (/dark|light|theme/.test(q)) {
    return `Use the ☀️/🌙 toggle in the top bar to switch between light and dark mode — your choice is remembered.`;
  }

  const match = findTopicMatch(q);
  if (match) {
    const hint = hintFor(match);
    return `<strong>${stripEmoji(match[match.length - 1])}</strong> is on the Learning Path — ${hint.blurb}. I've got it queued in the sidebar; search "<strong>${stripEmoji(match[match.length - 1])}</strong>" there, or dig deeper on <a href="${hint.tool.url}" target="_blank" rel="noopener">${hint.tool.name} ↗</a>.`;
  }

  const hint = hintFor([q]);
  return `I don't have that topic mapped exactly, but try the sidebar search, or explore it further on <a href="${hint.tool.url}" target="_blank" rel="noopener">${hint.tool.name} ↗</a>. You can also ask about Selenium, SQL, JIRA, Agile, Java or API Testing.`;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = chatInput.value.trim();
  if (!val) return;
  addMsg(val, "user");
  chatInput.value = "";
  const typing = addMsg(
    "<span></span><span></span><span></span>",
    "bot typing",
  );
  setTimeout(
    () => {
      typing.remove();
      addMsg(botReply(val), "bot");
    },
    500 + Math.random() * 400,
  );
});
