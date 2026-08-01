/* ============================================================
   QA Forge — script.js
   Navigation, theme, chat assistant, MCQ engine, animations
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- YEAR ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 500);
  });
  // fallback in case load already fired
  setTimeout(() => loader.classList.add("hide"), 2500);

  /* ============================================================
     THEME TOGGLE (Dark / Light) — persisted in localStorage
     ============================================================ */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const settingsThemeBtn = document.getElementById("settingsThemeBtn");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("qaforge-theme", theme);
    const icon = themeToggle.querySelector("i");
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  function toggleTheme() {
    const current =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
  }
  const savedTheme =
    localStorage.getItem("qaforge-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", toggleTheme);
  settingsThemeBtn.addEventListener("click", toggleTheme);

  /* ============================================================
     SIDEBAR TOGGLE
     ============================================================ */
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  sidebarToggle.addEventListener("click", () => {
    if (window.innerWidth <= 820) {
      sidebar.classList.toggle("open");
    } else {
      sidebar.classList.toggle("collapsed");
    }
  });

  /* ============================================================
     NOTIFICATION PANEL
     ============================================================ */
  const notifBtn = document.getElementById("notifBtn");
  const notifPanel = document.getElementById("notifPanel");
  notifBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!notifPanel.contains(e.target) && e.target !== notifBtn) {
      notifPanel.classList.remove("open");
    }
  });

  /* ============================================================
     PAGE NAVIGATION (SPA-style, all sections live in index.html)
     ============================================================ */
  const navBtns = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page");

  function goToPage(target) {
    pages.forEach((p) => p.classList.toggle("active", p.id === target));
    navBtns.forEach((b) =>
      b.classList.toggle("active", b.dataset.target === target),
    );
    document.getElementById("content").scrollTo({ top: 0, behavior: "smooth" });
    if (window.innerWidth <= 820) sidebar.classList.remove("open");
    runScrollReveal();
  }

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => goToPage(btn.dataset.target));
  });

  // any element with data-target (hero buttons etc.) also navigates
  document.querySelectorAll("[data-target]:not(.nav-btn)").forEach((el) => {
    el.addEventListener("click", () => goToPage(el.dataset.target));
  });

  /* ============================================================
     RIPPLE EFFECT
     ============================================================ */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".ripple");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    circle.className = "ripple-effect";
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });

  /* ============================================================
     TYPING ANIMATION — hero terminal
     ============================================================ */
  const typingCodeEl = document.getElementById("typingCode");
  const codeSample = `@Test
public void loginWithValidUser() {
  driver.get(baseUrl);
  loginPage.login("admin", "pass123");
  Assert.assertTrue(dashboard.isLoaded());
}`;
  let ti = 0;
  function typeCode() {
    if (ti <= codeSample.length) {
      typingCodeEl.textContent = codeSample.slice(0, ti);
      ti++;
      setTimeout(typeCode, 18);
    } else {
      setTimeout(() => {
        ti = 0;
        typeCode();
      }, 4000);
    }
  }
  typeCode();

  /* ============================================================
     ANIMATED STAT COUNTERS
     ============================================================ */
  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      if (el.dataset.done) return;
      el.dataset.done = "1";
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) {
          cur = target;
          clearInterval(t);
        }
        el.textContent = cur;
      }, 30);
    });
  }
  animateCounters();

  /* ============================================================
     SCROLL REVEAL (fade-in)
     ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 },
  );
  function runScrollReveal() {
    document
      .querySelectorAll(".fade-in")
      .forEach((el) => revealObserver.observe(el));
  }
  runScrollReveal();

  /* ============================================================
     BACK-TO-TOP FAB
     ============================================================ */
  const fabTop = document.getElementById("fabTop");
  const contentEl = document.getElementById("content");
  contentEl.addEventListener("scroll", () => {
    fabTop.classList.toggle("show", contentEl.scrollTop > 400);
  });
  fabTop.addEventListener("click", () =>
    contentEl.scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ============================================================
     COURSE CARDS (Dashboard)
     ============================================================ */
  const courseData = [
    {
      icon: "fa-clipboard-check",
      title: "Manual Testing",
      desc: "Foundations, SDLC/STLC, bug reports",
      target: "manual-testing",
    },
    {
      icon: "fa-robot",
      title: "Automation Testing",
      desc: "Frameworks, page objects, strategy",
      target: "automation-testing",
    },
    {
      icon: "fa-brands fa-java",
      title: "Java",
      desc: "OOP, collections, streams",
      target: "java",
    },
    {
      icon: "fa-circle-nodes",
      title: "Selenium",
      desc: "WebDriver, locators, waits",
      target: "selenium",
    },
    {
      icon: "fa-masks-theater",
      title: "Playwright",
      desc: "Auto-wait, trace viewer",
      target: "playwright",
    },
    {
      icon: "fa-tree",
      title: "Cypress",
      desc: "In-browser E2E testing",
      target: "cypress",
    },
    {
      icon: "fa-plug",
      title: "API Testing",
      desc: "REST, status codes, RestAssured",
      target: "api-testing",
    },
    {
      icon: "fa-database",
      title: "SQL",
      desc: "Joins, aggregates, data checks",
      target: "sql",
    },
    {
      icon: "fa-brands fa-git-alt",
      title: "Git",
      desc: "Branching, PRs, conflicts",
      target: "git",
    },
    {
      icon: "fa-brands fa-jenkins",
      title: "Jenkins",
      desc: "Pipelines, triggers, reports",
      target: "jenkins",
    },
    {
      icon: "fa-infinity",
      title: "CI/CD",
      desc: "Build, test, deploy pipeline",
      target: "cicd",
    },
    {
      icon: "fa-people-arrows",
      title: "Agile",
      desc: "Scrum roles &amp; ceremonies",
      target: "agile",
    },
    {
      icon: "fa-brands fa-jira",
      title: "Jira",
      desc: "Issues, workflow, JQL",
      target: "jira",
    },
    {
      icon: "fa-comments",
      title: "Interview Prep",
      desc: "40+ Q&amp;A, manual + automation",
      target: "interview-questions",
    },
  ];
  const courseCards = document.getElementById("courseCards");
  courseData.forEach((c) => {
    const card = document.createElement("div");
    card.className = "course-card fade-in";
    card.dataset.target = c.target;
    const iconClass = c.icon.startsWith("fa-brands")
      ? c.icon
      : `fa-solid ${c.icon}`;
    card.innerHTML = `<i class="${iconClass}"></i><h4>${c.title}</h4><p>${c.desc}</p>`;
    card.addEventListener("click", () => goToPage(c.target));
    courseCards.appendChild(card);
  });
  runScrollReveal();

  /* ============================================================
     FAQ / INTERVIEW QUESTIONS (Accordion)
     ============================================================ */
  const faqData = [
    {
      q: "What is the difference between Verification and Validation?",
      a: 'Verification checks "are we building the product right?" through reviews, walkthroughs and inspections without executing code. Validation checks "are we building the right product?" by actually executing the software against requirements.',
    },
    {
      q: "What is the difference between Smoke and Sanity testing?",
      a: "Smoke testing is a broad, shallow check that the build is stable enough to test further. Sanity testing is a narrow, focused check that a specific bug fix or feature works after a small change.",
    },
    {
      q: "What is Regression Testing?",
      a: "Re-running existing test cases to confirm that recent code changes have not broken previously working functionality.",
    },
    {
      q: "Explain the Automation Testing Pyramid.",
      a: "A strategy that recommends many fast unit tests at the base, a moderate number of API/service tests in the middle, and a small number of slow, expensive UI/end-to-end tests at the top.",
    },
    {
      q: "What is the difference between Selenium and Playwright?",
      a: "Selenium is a mature, widely-supported WebDriver-based tool needing explicit waits and separate drivers per browser. Playwright is newer, has built-in auto-waiting, a bundled test runner, trace viewer, and controls Chromium, Firefox and WebKit from a single API.",
    },
    {
      q: "What is the difference between Cypress and Playwright?",
      a: "Cypress runs inside the browser with great debugging/time-travel but limited multi-tab and cross-origin support. Playwright runs outside the browser via CDP/WebSocket, supports multiple tabs, origins and browsers natively.",
    },
    {
      q: "What is an explicit wait vs implicit wait in Selenium?",
      a: "Implicit wait applies a default polling timeout to every findElement call for the whole driver session. Explicit wait (WebDriverWait) waits for a specific condition on a specific element and is the recommended approach.",
    },
    {
      q: "What is a Page Object Model (POM)?",
      a: "A design pattern that represents each page (or component) as a class containing its locators and actions, keeping test code separate from UI interaction code for easier maintenance.",
    },
    {
      q: "What is the difference between GET and POST in API testing?",
      a: "GET retrieves a resource and should have no side effects (idempotent, cacheable). POST creates/submits a resource and typically changes server state.",
    },
    {
      q: "What does a 404 vs 500 status code mean?",
      a: "404 means the requested resource was not found on the server (client error). 500 means an unexpected error occurred on the server while processing a valid request (server error).",
    },
    {
      q: "What is the difference between INNER JOIN and LEFT JOIN?",
      a: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right table (NULLs where there is no match).",
    },
    {
      q: "What is a Test Plan?",
      a: 'A document describing scope, approach, resources, schedule and risks for a testing effort — the "what and how" of testing a release.',
    },
    {
      q: "What is Boundary Value Analysis?",
      a: "A test design technique that focuses on values at the edges of valid/invalid input ranges, since bugs commonly occur at boundaries.",
    },
    {
      q: "What is the difference between Severity and Priority?",
      a: "Severity measures the impact of a bug on the system (how bad it is). Priority measures how urgently it needs to be fixed (business order of work).",
    },
    {
      q: "What is Continuous Integration?",
      a: "A practice where developers merge code changes frequently into a shared repository, with automated builds and tests run on every change to catch issues early.",
    },
    {
      q: "What is the purpose of a Jenkinsfile?",
      a: "It defines a Jenkins pipeline as code, checked into source control, describing build/test/deploy stages so pipelines are versioned and repeatable.",
    },
    {
      q: "What are Agile ceremonies?",
      a: "Sprint Planning, Daily Standup, Sprint Review and Sprint Retrospective — the recurring meetings that structure work inside a Scrum sprint.",
    },
    {
      q: "What is the difference between a Story and a Bug in Jira?",
      a: "A Story represents new functionality or a user requirement to be built. A Bug represents a defect in existing functionality that needs fixing.",
    },
    {
      q: "What is Exploratory Testing?",
      a: "Simultaneous learning, test design and test execution — testers explore the application without predefined scripts to find unexpected issues.",
    },
    {
      q: "What is a Traceability Matrix?",
      a: "A document mapping requirements to their corresponding test cases, used to ensure full test coverage and track testing progress against requirements.",
    },
  ];
  const faqAccordion = document.getElementById("faqAccordion");
  faqData.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "accordion-item";
    div.innerHTML = `
      <button class="accordion-q">${item.q} <i class="fa-solid fa-chevron-down"></i></button>
      <div class="accordion-a"><div class="accordion-a-inner">${item.a}</div></div>
    `;
    const qBtn = div.querySelector(".accordion-q");
    const aDiv = div.querySelector(".accordion-a");
    qBtn.addEventListener("click", () => {
      const isOpen = div.classList.contains("open");
      document.querySelectorAll(".accordion-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".accordion-a").style.maxHeight = null;
      });
      if (!isOpen) {
        div.classList.add("open");
        aDiv.style.maxHeight = aDiv.scrollHeight + 40 + "px";
      }
    });
    faqAccordion.appendChild(div);
  });

  /* ============================================================
     MCQ PRACTICE ENGINE
     ============================================================ */
  const mcqData = [
    {
      q: "Which testing verifies individual methods?",
      options: [
        "System Testing",
        "Unit Testing",
        "Acceptance Testing",
        "Smoke Testing",
      ],
      correct: 1,
    },
    {
      q: "Selenium supports automation of?",
      options: ["Desktop Apps", "Web Applications", "Mobile Only", "Games"],
      correct: 1,
    },
    {
      q: "Which browser automation tool is developed by Microsoft?",
      options: ["Cypress", "Selenium", "Playwright", "Appium"],
      correct: 2,
    },
    {
      q: "Smoke Testing means?",
      options: [
        "Complete Testing",
        "Initial Build Verification",
        "Performance Testing",
        "Regression Testing",
      ],
      correct: 1,
    },
    {
      q: 'Which HTTP status code means "Not Found"?',
      options: ["200", "301", "404", "500"],
      correct: 2,
    },
    {
      q: "In Java, which keyword is used to inherit a class?",
      options: ["implements", "extends", "inherits", "super"],
      correct: 1,
    },
    {
      q: "Which SQL clause filters grouped rows?",
      options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
      correct: 2,
    },
    {
      q: "Which Git command uploads local commits to a remote?",
      options: ["git pull", "git fetch", "git push", "git clone"],
      correct: 2,
    },
    {
      q: "What does STLC stand for?",
      options: [
        "Software Test Life Cycle",
        "System Testing Life Cycle",
        "Software Type Life Cycle",
        "Structured Test Life Cycle",
      ],
      correct: 0,
    },
    {
      q: "Which wait type is recommended in Selenium best practice?",
      options: [
        "Thread.sleep",
        "Implicit Wait only",
        "Explicit Wait (WebDriverWait)",
        "No wait needed",
      ],
      correct: 2,
    },
    {
      q: "In Agile, who owns the product backlog?",
      options: ["Scrum Master", "Product Owner", "QA Lead", "Developer"],
      correct: 1,
    },
    {
      q: "Which HTTP method is idempotent and used to fetch data?",
      options: ["POST", "GET", "PATCH", "DELETE"],
      correct: 1,
    },
    {
      q: "Cypress tests are primarily written in?",
      options: ["Java", "Python", "JavaScript/TypeScript", "C#"],
      correct: 2,
    },
    {
      q: "Which Jira issue type represents a large body of work broken into stories?",
      options: ["Bug", "Epic", "Sub-task", "Task"],
      correct: 1,
    },
    {
      q: "What does CI/CD stand for?",
      options: [
        "Code Integration / Code Delivery",
        "Continuous Integration / Continuous Delivery",
        "Continuous Inspection / Continuous Debugging",
        "Central Integration / Central Deployment",
      ],
      correct: 1,
    },
    {
      q: "Which SQL join returns all rows from the left table regardless of a match?",
      options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "CROSS JOIN"],
      correct: 2,
    },
    {
      q: "What is the main purpose of a Page Object Model?",
      options: [
        "Speed up the network",
        "Separate UI locators from test logic",
        "Replace the test runner",
        "Generate test data",
      ],
      correct: 1,
    },
    {
      q: "Playwright locators like get_by_role are preferred because they are?",
      options: [
        "Faster to type",
        "Semantic and resilient to UI changes",
        "The only option available",
        "Only for mobile apps",
      ],
      correct: 1,
    },
    {
      q: "Which testing type is performed by end users before release?",
      options: [
        "Unit Testing",
        "UAT (User Acceptance Testing)",
        "Integration Testing",
        "Static Testing",
      ],
      correct: 1,
    },
    {
      q: "In a Jenkins pipeline, where should the pipeline definition ideally live?",
      options: [
        "Only in the Jenkins UI",
        "A Jenkinsfile in source control",
        "An email attachment",
        "A spreadsheet",
      ],
      correct: 1,
    },
  ];
  const mcqList = document.getElementById("mcqList");
  const mcqScoreLabel = document.getElementById("mcqScoreLabel");
  let mcqScore = 0,
    mcqAnswered = 0;

  function updateScore() {
    mcqScoreLabel.textContent = `Score: ${mcqScore} / ${mcqAnswered}`;
    localStorage.setItem(
      "qaforge-mcq-score",
      JSON.stringify({ score: mcqScore, answered: mcqAnswered }),
    );
    document.getElementById("practiceCompleted").textContent = mcqAnswered;
  }

  function renderMcq() {
    mcqList.innerHTML = "";
    mcqData.forEach((item, qi) => {
      const card = document.createElement("div");
      card.className = "mcq-card glass";
      card.innerHTML = `<p class="mcq-question">Q${qi + 1}. ${item.q}</p><div class="mcq-options"></div>`;
      const optWrap = card.querySelector(".mcq-options");
      item.options.forEach((opt, oi) => {
        const optBtn = document.createElement("button");
        optBtn.className = "mcq-option";
        optBtn.textContent = `${String.fromCharCode(65 + oi)}. ${opt}`;
        optBtn.addEventListener("click", () => {
          if (optWrap.dataset.locked) return;
          optWrap.dataset.locked = "1";
          const opts = optWrap.querySelectorAll(".mcq-option");
          opts.forEach((o) => o.classList.add("disabled"));
          if (oi === item.correct) {
            optBtn.classList.add("correct");
            mcqScore++;
          } else {
            optBtn.classList.add("wrong");
            opts[item.correct].classList.add("correct");
          }
          mcqAnswered++;
          updateScore();
        });
        optWrap.appendChild(optBtn);
      });
      mcqList.appendChild(card);
    });
  }
  renderMcq();

  const saved = localStorage.getItem("qaforge-mcq-score");
  if (saved) {
    const parsed = JSON.parse(saved);
    mcqScore = parsed.score;
    mcqAnswered = parsed.answered;
    updateScore();
  }

  document.getElementById("resetMcqBtn").addEventListener("click", () => {
    mcqScore = 0;
    mcqAnswered = 0;
    updateScore();
    renderMcq();
  });

  /* ============================================================
     PDF LIBRARY GRID (from Automation Testing zip contents)
     ============================================================ */
  const pdfTopics = [
    "Playwright Guide",
    "Automation Hints",
    "Prompt Engineering",
    "ISTQB CTFL Syllabus v4.0.1",
    "Java Fundamentals",
    "Jira Guide",
    "Agile Guide",
    "Software Testing Basics",
    "Java Collections & OOP",
    "Selenium WebDriver",
    "Selenium Locators & Waits",
    "API Testing (RestAssured)",
    "SQL & JDBC",
    "Git & Version Control",
    "Jenkins & CI/CD",
    "TestNG Framework",
    "Cucumber (BDD)",
    "Data-Driven Framework",
    "JUnit Framework",
    "GenAI for Testing",
  ];
  const pdfGrid = document.getElementById("pdfGrid");
  pdfTopics.forEach((name) => {
    const card = document.createElement("div");
    card.className = "pdf-card";
    card.innerHTML = `<i class="fa-solid fa-file-pdf"></i><div><h4>${name}</h4><p>Add file path in script.js → pdfTopics</p></div>`;
    pdfGrid.appendChild(card);
  });

  /* ============================================================
     DAILY NOTES
     ============================================================ */
  const notesArea = document.getElementById("notesArea");
  notesArea.value = localStorage.getItem("qaforge-notes") || "";
  document.getElementById("saveNoteBtn").addEventListener("click", () => {
    localStorage.setItem("qaforge-notes", notesArea.value);
    const btn = document.getElementById("saveNoteBtn");
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
    setTimeout(() => (btn.innerHTML = original), 1500);
  });
  document.getElementById("downloadNoteBtn").addEventListener("click", () => {
    const blob = new Blob([notesArea.value || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qaforge-notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  /* ============================================================
     SETTINGS — clear local data
     ============================================================ */
  document.getElementById("clearDataBtn").addEventListener("click", () => {
    if (confirm("Clear saved notes and MCQ progress from this browser?")) {
      localStorage.removeItem("qaforge-notes");
      localStorage.removeItem("qaforge-mcq-score");
      notesArea.value = "";
      mcqScore = 0;
      mcqAnswered = 0;
      updateScore();
      renderMcq();
    }
  });

  /* ============================================================
     GLOBAL SEARCH — filters nav buttons + course cards
     ============================================================ */
  const globalSearch = document.getElementById("globalSearch");
  globalSearch.addEventListener("input", () => {
    const term = globalSearch.value.trim().toLowerCase();
    navBtns.forEach((btn) => {
      const label = btn.textContent.toLowerCase();
      btn.style.display = !term || label.includes(term) ? "" : "none";
    });
    document.querySelectorAll(".course-card").forEach((card) => {
      const label = card.textContent.toLowerCase();
      card.style.display = !term || label.includes(term) ? "" : "none";
    });
  });

  /* ============================================================
     AI CHAT ASSISTANT (keyword-matched knowledge base)
     ============================================================ */
  const chatPanel = document.getElementById("chatPanel");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");

  function openChat() {
    chatPanel.classList.add("open");
    if (!chatBody.dataset.greeted) {
      chatBody.dataset.greeted = "1";
      addBotMessage(
        "Hi! I'm your QA study assistant. Ask me about manual testing, Selenium, Playwright, Cypress, API testing, SQL, Git, Jenkins, Agile or Jira. Try one of the suggestions below.",
      );
    }
  }
  function closeChat() {
    chatPanel.classList.remove("open");
  }

  document.getElementById("fabChat").addEventListener("click", () => {
    chatPanel.classList.contains("open") ? closeChat() : openChat();
  });
  document.getElementById("chatToggleTop").addEventListener("click", openChat);
  document.getElementById("closeChatBtn").addEventListener("click", closeChat);
  document
    .getElementById("openChatFromPage")
    .addEventListener("click", openChat);
  document.getElementById("clearChatBtn").addEventListener("click", () => {
    chatBody.innerHTML = "";
    chatBody.dataset.greeted = "";
    openChat();
  });

  function timestamp() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-user";
    div.innerHTML = `${escapeHtml(text)}<span class="msg-time">${timestamp()}</span>`;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-bot";
    div.innerHTML = `${text}<span class="msg-time">${timestamp()}</span>
      <button class="copy-btn" style="margin-top:6px;font-size:10px;color:var(--blue-500);background:none;border:none;cursor:pointer;display:block;">
        <i class="fa-regular fa-copy"></i> Copy
      </button>`;
    div.querySelector(".copy-btn").addEventListener("click", () => {
      navigator.clipboard?.writeText(text);
    });
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function escapeHtml(str) {
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  }

  // Knowledge base — reuses FAQ + MCQ content, plus extra keyword rules
  const knowledgeBase = [
    {
      keywords: ["selenium"],
      answer:
        "Selenium is an open-source browser automation framework using the WebDriver protocol. It supports Java, Python, C#, JS and works across Chrome, Firefox, Edge and Safari. Explore the Selenium section in the sidebar for locators, waits and code samples.",
    },
    {
      keywords: ["playwright"],
      answer:
        "Playwright is a modern automation tool from Microsoft with built-in auto-waiting, a bundled test runner, trace viewer, and support for Chromium, Firefox and WebKit from a single API. See the Playwright section for a sample test.",
    },
    {
      keywords: ["cypress"],
      answer:
        "Cypress runs directly inside the browser, giving real-time reload and time-travel debugging with automatic retry-ability on assertions. It's great for fast feedback on modern JS apps. Check the Cypress section for a sample test.",
    },
    {
      keywords: ["cypress", "playwright", "difference", "vs"],
      answer:
        "Cypress runs inside the browser (great debugging, limited multi-tab/cross-origin). Playwright runs outside the browser via CDP (multi-tab, multi-origin, multi-browser support built in).",
    },
    {
      keywords: ["smoke"],
      answer:
        "Smoke testing is a quick, broad check that a new build is stable enough for further testing — it verifies the critical paths work, not every detail.",
    },
    {
      keywords: ["sanity"],
      answer:
        "Sanity testing is a narrow, focused test to confirm a specific bug fix or small change works as expected, without running the full regression suite.",
    },
    {
      keywords: ["regression"],
      answer:
        "Regression testing re-runs existing test cases after a code change to make sure previously working functionality hasn't broken.",
    },
    {
      keywords: ["explicit", "implicit", "wait"],
      answer:
        "Implicit wait sets a default polling timeout for every element lookup on the driver. Explicit wait (WebDriverWait) waits for a specific condition on a specific element and is the recommended, more reliable approach.",
    },
    {
      keywords: ["api", "testing"],
      answer:
        "API testing verifies your service layer directly over HTTP — checking status codes, response bodies, headers and auth — without needing the UI. It's faster and more stable than UI tests. See the API Testing section for a RestAssured example.",
    },
    {
      keywords: ["sql", "join"],
      answer:
        "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matches from the right (NULL where there's no match). See the SQL section for a sample query.",
    },
    {
      keywords: ["git"],
      answer:
        'Git is a distributed version control system. Common flow: git checkout -b feature/x, git add ., git commit -m "message", git push origin feature/x, then open a pull request.',
    },
    {
      keywords: ["jenkins"],
      answer:
        "Jenkins is an automation server that runs your build and test pipeline on every commit. Modern pipelines are defined as code in a Jenkinsfile checked into source control.",
    },
    {
      keywords: ["agile", "scrum"],
      answer:
        "Agile/Scrum organizes work into sprints with ceremonies: Sprint Planning, Daily Standup, Sprint Review and Retrospective, led by a Product Owner and Scrum Master.",
    },
    {
      keywords: ["jira"],
      answer:
        "Jira tracks Epics, Stories, Tasks and Bugs through a workflow (To Do → In Progress → In Review → Done). Use JQL to build custom bug/story filters.",
    },
    {
      keywords: ["java"],
      answer:
        "Java is the most common language for Selenium/TestNG frameworks — key topics are OOP, collections, exception handling and Java 8 streams. Try the embedded OneCompiler link in the Java section to run code live.",
    },
    {
      keywords: ["pom", "page object"],
      answer:
        "The Page Object Model separates locators and page actions into their own classes, keeping test logic clean and making UI changes easier to maintain in one place.",
    },
    {
      keywords: ["severity", "priority"],
      answer:
        "Severity measures how badly a bug impacts the system. Priority measures how urgently it should be fixed. A low-severity bug can still be high priority if it blocks a demo, for example.",
    },
    {
      keywords: ["verification", "validation"],
      answer:
        "Verification asks 'are we building the product right?' (reviews, static checks). Validation asks 'are we building the right product?' (executing the software against requirements).",
    },
    {
      keywords: ["ci", "cd", "continuous"],
      answer:
        "CI (Continuous Integration) merges and tests code frequently. CD (Continuous Delivery/Deployment) automatically prepares or ships a release-ready build once tests pass.",
    },
    {
      keywords: ["hello", "hi", "hey"],
      answer:
        "Hello! Ask me about manual testing, Selenium, Playwright, Cypress, API testing, SQL, Git, Jenkins, Agile or Jira — or open the MCQ Practice page to test yourself.",
    },
  ];

  function findAnswer(question) {
    const q = question.toLowerCase();
    let best = null,
      bestScore = 0;
    knowledgeBase.forEach((entry) => {
      const score = entry.keywords.filter((k) => q.includes(k)).length;
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    if (best) return best.answer;
    return "I don't have a specific answer for that yet — try the Interview Questions or MCQ Practice pages, or open ChatGPT / Claude from the sidebar's Learning Tools for a deeper answer.";
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "typing-indicator";
    div.id = "typingIndicator";
    div.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() {
    document.getElementById("typingIndicator")?.remove();
  }

  function askQuestion(text) {
    if (!text.trim()) return;
    addUserMessage(text);
    chatInput.value = "";
    showTyping();
    setTimeout(
      () => {
        hideTyping();
        addBotMessage(findAnswer(text));
      },
      700 + Math.random() * 500,
    );
  }

  document
    .getElementById("sendChatBtn")
    .addEventListener("click", () => askQuestion(chatInput.value));
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") askQuestion(chatInput.value);
  });
  document.querySelectorAll(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", () => askQuestion(chip.textContent));
  });

  /* ============================================================
     ROTATING LOGO subtle interaction (pause on hover handled by CSS)
     ============================================================ */
}); // DOMContentLoaded
