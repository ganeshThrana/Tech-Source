/* =========================================================
   Tech Source — Learning App Script
   ========================================================= */

/* ---------- LIVE CLOCK ---------- */
function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;

  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const hours = now.getHours();
  const displayHours = hours % 12 || 12;
  const meridiem = hours >= 12 ? "PM" : "AM";
  const datePart = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = `${pad(displayHours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${meridiem}`;

  el.textContent = `${datePart} • ${timePart}`;
}

updateClock();
setInterval(updateClock, 1000);

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ---------- THEME TOGGLE ---------- */
const themeToggle = document.getElementById("themeToggle");
const toggleIcon = themeToggle.querySelector(".toggle-icon");
const toggleLabel = themeToggle.querySelector(".toggle-label");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    toggleIcon.textContent = "☀️";
    toggleLabel.textContent = "Light Mode";
  } else {
    toggleIcon.textContent = "🌙";
    toggleLabel.textContent = "Dark Mode";
  }
  try {
    localStorage.setItem("ts-theme", theme);
  } catch (e) {}
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("ts-theme") || "light";
} catch (e) {}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- CONTENT PANEL VIEW CONTROLS ---------- */
const contentPanel = document.querySelector(".content-panel");
const contentPanelButtons = document.querySelectorAll(".content-control-btn");
let contentViewMode = "normal";

function setContentViewMode(mode) {
  contentViewMode = mode;
  contentPanel.classList.remove("is-minimized", "is-maximized");

  if (mode === "minimized") {
    contentPanel.classList.add("is-minimized");
  } else if (mode === "maximized") {
    contentPanel.classList.add("is-maximized");
  }

  contentPanelButtons.forEach((btn) => {
    const isActive = btn.dataset.action === mode;
    btn.classList.toggle("active", isActive);
  });
}

contentPanelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (action === "quiz") {
      window.location.href = "quiz.html";
      return;
    }
    if (action === "minimize") {
      setContentViewMode("minimized");
    } else if (action === "maximize") {
      setContentViewMode("maximized");
    } else {
      setContentViewMode("normal");
    }
  });
});

document.querySelectorAll(".quick-quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".quick-quick-panel");
    if (!panel) return;
    const action = btn.dataset.action;
    if (action === "minimize-quick") {
      panel.classList.add("is-minimized");
    } else {
      panel.classList.remove("is-minimized");
    }
  });
});

document.querySelectorAll(".quiz-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".quiz-panel");
    if (!panel) return;
    const action = btn.dataset.action;
    if (action === "collapse-quiz") {
      panel.classList.add("is-collapsed");
    } else {
      panel.classList.remove("is-collapsed");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    contentPanel?.classList.contains("is-maximized")
  ) {
    setContentViewMode("normal");
  }
});

/* ---------- SIDEBAR NAV: parent accordion toggle ---------- */
document.querySelectorAll(".parent-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = btn.closest(".nav-item-parent");
    // toggle open state
    parent.classList.toggle("open");
    // also treat parent-btn click as a topic selection
    selectTopic(btn.dataset.target, btn);
  });
});

/* ---------- SIDEBAR NAV: topic selection ---------- */
const contentPanes = document.querySelectorAll(".content-pane");
const activeBadge = document.getElementById("activeTopicBadge");
const innerTopics = {};

function selectTopic(targetId, btnEl) {
  contentPanes.forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(targetId);
  let label = targetId;
  if (target) {
    target.classList.add("active");
    const heading = target.querySelector("h3");
    label = heading ? heading.textContent : targetId;
    if (activeBadge) activeBadge.textContent = label;
  }
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  // If this topic has a 3rd-level inner navigation (Java's Core Java/Programming/
  // Interview Programs, or Playwright), build it on first visit and show it.
  if (typeof buildInnerNav === "function" && innerTopics[targetId]) {
    buildInnerNav(targetId);
  }

  // Load the matching topic quiz (one question at a time) in the right-side panel
  if (typeof loadQuizForTopic === "function") {
    loadQuizForTopic(targetId, label);
  }

  // scroll content panel into view on small screens
  document.querySelector(".content-panel")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

document.querySelectorAll(".nav-btn:not(.parent-btn)").forEach((btn) => {
  btn.addEventListener("click", () => selectTopic(btn.dataset.target, btn));
});

/* =========================================================
   INNER TOPIC NAVIGATION — a 3rd level of buttons that lives
   INSIDE the middle content panel (not the left sidebar), so
   deep topic lists (Java's Core Java/Programming/Interview
   Programs, and Playwright) don't overcrowd the left nav.
   Each sub-topic gets its own paneready for long-form content;
   Prev/Next lets learners page through the whole list in order.
   ========================================================= */
function slugifyInner(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/*const innerTopics = {
  "java-core-java": [
    "OOPS",
    "Basics",
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
  ],
  "java-programming": [
    "Conditional Statements",
    "Looping Statements",
    "Arrays",
    "Methods",
    "Constructors",
    "Recursion",
    "Searching Algorithms",
    "Sorting Algorithms",
  ],
  "java-interview-programs": [
    "Java Interview Programs – Level 1",
    "Java Interview Programs – Level 2",
    "Java Interview Programs – Advanced",
  ],
  playwright: [
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
  ],
};*/

// Remembers which sub-topic index was last open for each parent (so re-visiting a
// parent from the sidebar doesn't always reset back to item 1).
const innerState = {};

function buildInnerNav(parentId) {
  const mount = document.querySelector(
    `.inner-nav-wrap[data-inner-parent="${parentId}"]`,
  );
  const topics = innerTopics[parentId];
  if (!mount || !topics || mount.dataset.built === "true") return;
  mount.dataset.built = "true";

  const navBar = document.createElement("div");
  navBar.className = "inner-nav-bar";

  const content = document.createElement("div");
  content.className = "inner-content";

  topics.forEach((label, i) => {
    const slug = `${parentId}__${slugifyInner(label)}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "inner-nav-btn";
    btn.textContent = label;
    btn.dataset.innerIndex = i;
    btn.addEventListener("click", () => showInnerPane(parentId, i));
    navBar.appendChild(btn);

    const pane = document.createElement("div");
    pane.className = "inner-pane";
    pane.id = slug;
    pane.innerHTML = `<span class="inner-pane-meta">JAVA – Updated &rsaquo; ${label}</span><h4>${label}</h4><p>will add</p>`;
    // fix meta label for non-java parents
    if (parentId === "playwright") {
      pane.querySelector(".inner-pane-meta").innerHTML =
        `Playwright &rsaquo; ${label}`;
    } else {
      const parentTitle =
        parentId === "java-core-java"
          ? "Core Java"
          : parentId === "java-programming"
            ? "Programming"
            : "Interview Programs";
      pane.querySelector(".inner-pane-meta").innerHTML =
        `JAVA – Updated &rsaquo; ${parentTitle} &rsaquo; ${label}`;
    }
    content.appendChild(pane);
  });

  const pageNav = document.createElement("div");
  pageNav.className = "inner-page-nav";
  pageNav.innerHTML = `
    <button type="button" class="btn-secondary inner-prev">◀ Previous Topic</button>
    <span class="inner-page-indicator">1 / ${topics.length}</span>
    <button type="button" class="btn-secondary inner-next">Next Topic ▶</button>
  `;

  mount.appendChild(navBar);
  mount.appendChild(content);
  mount.appendChild(pageNav);

  pageNav.querySelector(".inner-prev").addEventListener("click", () => {
    const cur = innerState[parentId] || 0;
    if (cur > 0) showInnerPane(parentId, cur - 1);
  });
  pageNav.querySelector(".inner-next").addEventListener("click", () => {
    const cur = innerState[parentId] || 0;
    if (cur < topics.length - 1) showInnerPane(parentId, cur + 1);
  });

  showInnerPane(parentId, innerState[parentId] || 0);
}

function showInnerPane(parentId, index) {
  const topics = innerTopics[parentId];
  const mount = document.querySelector(
    `.inner-nav-wrap[data-inner-parent="${parentId}"]`,
  );
  if (!mount || !topics) return;
  index = Math.max(0, Math.min(index, topics.length - 1));
  innerState[parentId] = index;

  mount.querySelectorAll(".inner-nav-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
  mount.querySelectorAll(".inner-pane").forEach((pane, i) => {
    pane.classList.toggle("active", i === index);
  });

  const indicator = mount.querySelector(".inner-page-indicator");
  if (indicator) indicator.textContent = `${index + 1} / ${topics.length}`;

  const prevBtn = mount.querySelector(".inner-prev");
  const nextBtn = mount.querySelector(".inner-next");
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.disabled = index === topics.length - 1;
}

/* ---------- SIDEBAR SEARCH FILTER ---------- */
const navSearch = document.getElementById("navSearch");
navSearch.addEventListener("input", () => {
  const q = navSearch.value.trim().toLowerCase();
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const text = btn.textContent.trim().toLowerCase();
    const matches = text.includes(q);
    btn.classList.toggle("hidden-by-search", q.length > 0 && !matches);
    // open parent group if a child matches
    if (matches && btn.classList.contains("sub-btn")) {
      const parent = btn.closest(".nav-item-parent");
      if (parent && q.length > 0) parent.classList.add("open");
    }
  });
});

/* =========================================================
   QUIZ ENGINE — one question at a time, per learning topic
   ========================================================= */

/* Quiz bank keyed by the same data-target ids used in the sidebar.
   Topics without a dedicated bank fall back to the "general" mix. */
const quizBank = {
  agile: [
    {
      q: "In Agile, what is a 'Sprint'?",
      options: [
        "A fixed time-boxed period to complete a set of work",
        "A type of bug severity level",
        "A JIRA plugin",
        "A Selenium wait strategy",
      ],
      answer: 0,
      explanation:
        "A Sprint is a fixed, time-boxed iteration (commonly 1-4 weeks) during which a Scrum team completes a defined set of work.",
    },
    {
      q: "Who is responsible for maximizing the value of the product in Scrum?",
      options: ["Scrum Master", "Product Owner", "QA Lead", "Project Manager"],
      answer: 1,
      explanation:
        "The Product Owner owns the product backlog and is responsible for maximizing the value delivered by the team.",
    },
    {
      q: "What is the purpose of a Daily Stand-up?",
      options: [
        "To assign blame for missed deadlines",
        "To give a quick status sync: what was done, what's next, and blockers",
        "To review the entire product backlog",
        "To sign off on the release",
      ],
      answer: 1,
      explanation:
        "The Daily Stand-up (Daily Scrum) is a short, time-boxed sync where the team shares progress and surfaces blockers.",
    },
  ],
  jira: [
    {
      q: "Which JIRA item type is used to track a small, specific piece of work within a larger feature?",
      options: ["Epic", "Sub-task", "Sprint", "Board"],
      answer: 1,
      explanation:
        "A Sub-task breaks a Story or Task into smaller units of work; an Epic is a larger body of work made up of multiple Stories.",
    },
    {
      q: "What is a JIRA 'Epic' used for?",
      options: [
        "A single line bug report",
        "A large body of work that can be broken down into several Stories",
        "A user's login credentials",
        "A test execution report",
      ],
      answer: 1,
      explanation:
        "An Epic groups related Stories/Tasks under one large initiative that usually spans multiple sprints.",
    },
  ],
  istqb: [
    {
      q: "According to ISTQB, what is the main purpose of 'Regression Testing'?",
      options: [
        "Testing new features only",
        "Verifying that recent changes have not adversely affected existing functionality",
        "Testing performance under load",
        "Testing the UI design",
      ],
      answer: 1,
      explanation:
        "Regression testing re-runs existing tests to confirm that a code change hasn't broken previously working functionality.",
    },
    {
      q: "Which test level checks if the whole system meets the specified requirements?",
      options: [
        "Unit Testing",
        "Integration Testing",
        "System Testing",
        "Component Testing",
      ],
      answer: 2,
      explanation:
        "System Testing evaluates the complete, integrated system against the specified requirements.",
    },
  ],
  java: [
    {
      q: "In Java, which keyword is used to inherit a class?",
      options: ["implements", "extends", "inherits", "super"],
      answer: 1,
      explanation:
        "'extends' is used for class inheritance in Java, while 'implements' is used for interfaces.",
    },
    {
      q: "Which keyword makes a variable belong to the class rather than an instance?",
      options: ["final", "static", "public", "abstract"],
      answer: 1,
      explanation:
        "'static' members belong to the class itself and are shared across all instances.",
    },
    {
      q: "Which Java 8 feature lets you write an anonymous function inline?",
      options: ["Stream API", "Lambda Expression", "Generics", "Enum"],
      answer: 1,
      explanation:
        "Lambda expressions provide a concise way to represent an anonymous function/functional interface implementation.",
    },
  ],
  selenium: [
    {
      q: "In Selenium, which locator strategy uses '//' at the start of the expression?",
      options: ["CSS Selector", "XPath", "ID", "Class Name"],
      answer: 1,
      explanation:
        "XPath expressions typically start with '//' to select nodes anywhere in the document that match the given path.",
    },
    {
      q: "Which Selenium wait pauses execution for a fixed amount of time regardless of condition?",
      options: [
        "Implicit Wait",
        "Explicit Wait",
        "Fluent Wait",
        "Thread.sleep()",
      ],
      answer: 3,
      explanation:
        "Thread.sleep() is a hard-coded wait that always pauses for the exact duration specified, unlike implicit/explicit/fluent waits which poll for a condition.",
    },
    {
      q: "Which design pattern is commonly used to make Selenium tests more maintainable?",
      options: ["Singleton", "Page Object Model", "Observer", "Factory"],
      answer: 1,
      explanation:
        "The Page Object Model (POM) separates page structure/locators from test logic, making tests easier to maintain.",
    },
  ],
  "git-github": [
    {
      q: "What does 'git pull' do?",
      options: [
        "Uploads local commits to remote",
        "Creates a new branch",
        "Fetches and merges changes from a remote repository",
        "Deletes local changes",
      ],
      answer: 2,
      explanation:
        "'git pull' is a combination of 'git fetch' + 'git merge' — it downloads and integrates changes from the remote branch into your current branch.",
    },
    {
      q: "Which command stages changes for the next commit?",
      options: ["git commit", "git add", "git push", "git status"],
      answer: 1,
      explanation:
        "'git add' moves changes from the working directory into the staging area, ready to be committed.",
    },
  ],
  sql: [
    {
      q: "In SQL, which clause is used to filter grouped results (used after GROUP BY)?",
      options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
      answer: 1,
      explanation:
        "HAVING filters aggregated/grouped rows, while WHERE filters rows before grouping happens.",
    },
    {
      q: "Which JOIN returns only matching rows from both tables?",
      options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
      answer: 2,
      explanation:
        "INNER JOIN returns only the rows that have matching values in both joined tables.",
    },
  ],
  "api-testing": [
    {
      q: "In REST API testing, which HTTP method is typically used to update an existing resource fully?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: 2,
      explanation:
        "PUT is used to replace/update an existing resource entirely; PATCH is used for partial updates, POST typically creates new resources.",
    },
    {
      q: "Which HTTP status code indicates a successful resource creation?",
      options: ["200", "201", "301", "404"],
      answer: 1,
      explanation:
        "201 Created indicates the request succeeded and a new resource was created as a result.",
    },
  ],
  playwright: [
    {
      q: "What is a key advantage of Playwright's auto-waiting?",
      options: [
        "It removes the need for locators",
        "It automatically waits for elements to be actionable before performing actions",
        "It skips network requests",
        "It disables JavaScript on the page",
      ],
      answer: 1,
      explanation:
        "Playwright automatically waits for elements to be visible, stable and actionable, reducing flaky tests.",
    },
  ],
  cucumber: [
    {
      q: "In Cucumber (BDD), which file format is used to write feature scenarios in plain English?",
      options: [".feature (Gherkin)", ".xml", ".properties", ".json"],
      answer: 0,
      explanation:
        "Cucumber uses Gherkin syntax written in .feature files with Given/When/Then steps that are both human-readable and executable.",
    },
  ],
};

/* A mixed "general" fallback pool for topics that don't yet have a dedicated bank */
quizBank.general = Object.keys(quizBank).reduce(
  (pool, key) => pool.concat(quizBank[key]),
  [],
);

const quizTopicBadge = document.getElementById("quizTopicBadge");
const quizProgress = document.getElementById("quizProgress");
const quizSingle = document.getElementById("quizSingle");
const quizDots = document.getElementById("quizDots");
const quizResult = document.getElementById("quizResult");
const prevQBtn = document.getElementById("prevQ");
const checkQBtn = document.getElementById("checkQ");
const nextQBtn = document.getElementById("nextQ");
const resetQuizBtn = document.getElementById("resetQuiz");

let activeQuiz = [];
let quizAnswers = []; // chosen option index per question, or null
let quizChecked = []; // whether the question has been checked
let quizIndex = 0;

function loadQuizForTopic(topicId, label) {
  activeQuiz =
    quizBank[topicId] && quizBank[topicId].length
      ? quizBank[topicId]
      : quizBank.general;
  quizAnswers = new Array(activeQuiz.length).fill(null);
  quizChecked = new Array(activeQuiz.length).fill(false);
  quizIndex = 0;
  quizTopicBadge.textContent =
    quizBank[topicId] && quizBank[topicId].length
      ? label || topicId
      : "General Mix";
  quizResult.textContent = "";
  renderDots();
  renderQuestion();
}

function renderDots() {
  quizDots.innerHTML = "";
  activeQuiz.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "quiz-dot";
    dot.textContent = i + 1;
    dot.addEventListener("click", () => {
      quizIndex = i;
      renderQuestion();
    });
    quizDots.appendChild(dot);
  });
  updateDotStates();
}

function updateDotStates() {
  const dots = quizDots.querySelectorAll(".quiz-dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("current", "answered-correct", "answered-incorrect");
    if (i === quizIndex) dot.classList.add("current");
    if (quizChecked[i]) {
      dot.classList.add(
        quizAnswers[i] === activeQuiz[i].answer
          ? "answered-correct"
          : "answered-incorrect",
      );
    }
  });
}

function renderQuestion() {
  const item = activeQuiz[quizIndex];
  quizProgress.textContent = `Question ${quizIndex + 1} of ${activeQuiz.length}`;

  const wrap = document.createElement("div");
  wrap.className = "quiz-question";

  const qText = document.createElement("p");
  qText.className = "q-text";
  qText.textContent = `${quizIndex + 1}. ${item.q}`;
  wrap.appendChild(qText);

  const optWrap = document.createElement("div");
  optWrap.className = "quiz-options";
  item.options.forEach((opt, oi) => {
    const label = document.createElement("label");
    const checkedAttr = quizAnswers[quizIndex] === oi ? "checked" : "";
    label.innerHTML = `<input type="radio" name="currentQ" value="${oi}" ${checkedAttr}> ${opt}`;
    optWrap.appendChild(label);
  });
  wrap.appendChild(optWrap);

  const expl = document.createElement("div");
  expl.className = "explanation";
  expl.textContent = `Correct answer: "${item.options[item.answer]}" — ${item.explanation}`;
  wrap.appendChild(expl);

  quizSingle.innerHTML = "";
  quizSingle.appendChild(wrap);

  optWrap.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("change", () => {
      quizAnswers[quizIndex] = parseInt(inp.value, 10);
      checkQBtn.disabled = false;
    });
  });

  // Reflect already-checked state for this question
  if (quizChecked[quizIndex]) {
    revealAnswer(wrap, optWrap, expl, item, false);
  }

  prevQBtn.disabled = quizIndex === 0;
  nextQBtn.textContent =
    quizIndex === activeQuiz.length - 1 ? "Finish ✔" : "Next ▶";
  checkQBtn.disabled =
    quizChecked[quizIndex] || quizAnswers[quizIndex] === null;

  updateDotStates();
}

function revealAnswer(wrap, optWrap, expl, item, animate) {
  wrap.classList.remove("correct", "incorrect");
  const chosen = quizAnswers[quizIndex];
  wrap.classList.add(chosen === item.answer ? "correct" : "incorrect");

  optWrap.querySelectorAll("label").forEach((label, oi) => {
    label.classList.remove("opt-correct", "opt-incorrect");
    if (oi === item.answer) label.classList.add("opt-correct");
    else if (oi === chosen) label.classList.add("opt-incorrect");
  });

  optWrap.querySelectorAll("input").forEach((inp) => {
    inp.disabled = true;
  });
  expl.classList.add("show");
  if (animate) expl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

checkQBtn.addEventListener("click", () => {
  if (quizAnswers[quizIndex] === null) return; // nothing selected yet
  quizChecked[quizIndex] = true;
  const wrap = quizSingle.querySelector(".quiz-question");
  const optWrap = quizSingle.querySelector(".quiz-options");
  const expl = quizSingle.querySelector(".explanation");
  revealAnswer(wrap, optWrap, expl, activeQuiz[quizIndex], true);
  updateDotStates();
});

prevQBtn.addEventListener("click", () => {
  if (quizIndex > 0) {
    quizIndex--;
    renderQuestion();
  }
});

nextQBtn.addEventListener("click", () => {
  if (quizIndex < activeQuiz.length - 1) {
    quizIndex++;
    renderQuestion();
  } else {
    // Finish: show summary
    let score = 0;
    activeQuiz.forEach((item, i) => {
      if (quizAnswers[i] === item.answer) score++;
    });
    const unanswered = quizAnswers.filter((a) => a === null).length;
    quizResult.textContent =
      `You scored ${score} out of ${activeQuiz.length}.` +
      (unanswered
        ? ` (${unanswered} question${unanswered > 1 ? "s" : ""} left unanswered.)`
        : "") +
      ` Use the numbered dots above to revisit any question and review its explanation.`;
    quizResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

resetQuizBtn.addEventListener("click", () => {
  quizAnswers = new Array(activeQuiz.length).fill(null);
  quizChecked = new Array(activeQuiz.length).fill(false);
  quizIndex = 0;
  quizResult.textContent = "";
  renderDots();
  renderQuestion();
});

// initial quiz load (general mix, shown before any topic is picked)
loadQuizForTopic("general", "General");

/* =========================================================
   CHAT BOX (group + single thread chat)
   ========================================================= */
const CHAT_STORAGE_KEY = "ts-chat-threads";
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chatTabs = document.querySelectorAll(".chat-tab");
const chatList = document.getElementById("chatList");
const createChatBtn = document.getElementById("createChatBtn");
const newChatName = document.getElementById("newChatName");

let activeChatType = "teams";
let activeChatId = "teams-shared";

function getDefaultChatThreads() {
  return [
    {
      id: "teams-shared",
      type: "teams",
      name: "TS Shared Channel",
      messages: [
        {
          who: "bot",
          text: "🔹 Welcome to TS Shared Channel. This is the team thread for any user of the app.",
        },
      ],
    },
    {
      id: "single-ts",
      type: "single",
      name: "TS Chat",
      messages: [
        {
          who: "bot",
          text: "🔹 Welcome to TS Chat. Use this private chat thread to ask quick questions.",
        },
      ],
    },
  ];
}

function loadChatThreads() {
  try {
    const stored = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
    if (Array.isArray(stored) && stored.length) {
      return stored;
    }
  } catch (e) {}
  return getDefaultChatThreads();
}

function saveChatThreads() {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatThreads));
  } catch (e) {}
}

let chatThreads = loadChatThreads();

function renderChatList() {
  chatList.innerHTML = "";
  const items = chatThreads.filter((thread) => thread.type === activeChatType);
  items.forEach((thread) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = thread.name;
    btn.className = thread.id === activeChatId ? "active" : "";
    btn.addEventListener("click", () => {
      activeChatId = thread.id;
      renderChatList();
      renderMessages();
    });
    chatList.appendChild(btn);
  });
}

function renderMessages() {
  const thread =
    chatThreads.find((t) => t.id === activeChatId) || chatThreads[0];
  if (!thread) return;
  chatMessages.innerHTML = "";
  thread.messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = `msg ${msg.who}`;
    div.textContent = msg.text;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, who, threadId = activeChatId) {
  const thread = chatThreads.find((t) => t.id === threadId);
  if (!thread) return;
  thread.messages.push({ who, text });
  saveChatThreads();
  if (thread.id === activeChatId) {
    const div = document.createElement("div");
    div.className = `msg ${who}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function getBotReply(userText, threadType) {
  const lower = userText.toLowerCase();
  if (threadType === "teams") {
    if (lower.includes("team") || lower.includes("group")) {
      return "This team thread is good for collaboration. Try asking about a shared topic or posting a quick update.";
    }
    return getBotReplySingle(userText);
  }
  return getBotReplySingle(userText);
}

function getBotReplySingle(userText) {
  const lower = userText.toLowerCase();
  const replies = [
    {
      keys: ["hello", "hi", "hey"],
      reply:
        "Hello! 👋 I'm the Tech Source assistant. Ask me about any topic in the menu, or the quiz.",
    },
    {
      keys: ["java"],
      reply:
        "Java topics are under 'JAVA – Updated' in the sidebar: Core Java, Programming, Interview Programs, POJO, and Java Theory.",
    },
    {
      keys: ["selenium"],
      reply:
        "Selenium has 19 sub-topics in the sidebar — from Basics and Locators to Waits, Frames, and TestNG.",
    },
    {
      keys: ["agile"],
      reply:
        "Agile covers sprints, ceremonies, and roles. Check the Agile button in Learning Topics, and 'Agile Sprint' under Interview Tips.",
    },
    {
      keys: ["jira"],
      reply:
        "JIRA is for tracking Epics, Stories, Tasks, and Bugs. Click JIRA in the sidebar to explore.",
    },
    {
      keys: ["quiz"],
      reply:
        "The Quick Quiz panel is on the right. Pick a topic on the left to load its quiz, answer one question at a time, and review your score.",
    },
    {
      keys: ["dark", "light", "theme"],
      reply:
        "Use the theme toggle button in the top bar to switch between dark and light mode. Your preference is remembered.",
    },
    {
      keys: ["link", "reference"],
      reply:
        "Check the 'Helpful References' section for ChatGPT, Claude AI, OneCompiler, W3Schools, and Selfmade Ninja Academy links.",
    },
    {
      keys: ["interview"],
      reply:
        "Interview Tips & Scenario buttons are at the bottom of the sidebar — covering Framework, Automation, CI/CD, HR Interview and more.",
    },
  ];
  for (const entry of replies) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return entry.reply;
    }
  }
  return "I'm a simple demo assistant. Try asking about 'Java', 'Selenium', 'Agile', 'JIRA', 'quiz', or 'theme'.";
}

chatToggle.addEventListener("click", () => chatBox.classList.toggle("open"));
chatClose.addEventListener("click", () => chatBox.classList.remove("open"));

chatTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    chatTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    activeChatType = tab.dataset.view;
    const selected = chatThreads.find((t) => t.type === activeChatType);
    if (selected) activeChatId = selected.id;
    renderChatList();
    renderMessages();
  });
});

createChatBtn.addEventListener("click", () => {
  const name = newChatName.value.trim();
  if (!name) return;
  const id = `${activeChatType}-${Date.now()}`;
  const newThread = {
    id,
    type: activeChatType,
    name,
    messages: [
      {
        who: "bot",
        text: `🔹 New ${activeChatType === "teams" ? "team" : "single"} chat created. Start the conversation!`,
      },
    ],
  };
  chatThreads.push(newThread);
  saveChatThreads();
  activeChatId = id;
  newChatName.value = "";
  renderChatList();
  renderMessages();
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  const thread = chatThreads.find((t) => t.id === activeChatId);
  setTimeout(() => {
    if (!thread) return;
    addMessage(getBotReply(text, thread.type), "bot");
  }, 450);
});

window.addEventListener("storage", (event) => {
  if (event.key === CHAT_STORAGE_KEY) {
    try {
      const updated = JSON.parse(event.newValue || "[]");
      if (Array.isArray(updated)) {
        chatThreads = updated;
        const selected = chatThreads.find((t) => t.id === activeChatId);
        if (!selected) {
          const first =
            chatThreads.find((t) => t.type === activeChatType) ||
            chatThreads[0];
          if (first) activeChatId = first.id;
        }
        renderChatList();
        renderMessages();
      }
    } catch (e) {}
  }
});

renderChatList();
renderMessages();
