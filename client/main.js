/* =========================================================
   Tech Source — Learning App Script
   ========================================================= */

/* ---------- LIVE CLOCK ---------- */
function updateClock() {
  const now = new Date();
  const el = document.getElementById("clock");
  if (el) {
    el.textContent =
      now.toLocaleDateString(undefined, { day: "2-digit", month: "short" }) +
      "  " +
      now.toLocaleTimeString();
  }
}
updateClock();
setInterval(updateClock, 1000);
document.getElementById("year").textContent = new Date().getFullYear();

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

function selectTopic(targetId, btnEl) {
  contentPanes.forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.add("active");
    const heading = target.querySelector("h3");
    activeBadge.textContent = heading ? heading.textContent : targetId;
  }
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  // scroll content panel into view on small screens
  document
    .querySelector(".content-panel")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".nav-btn:not(.parent-btn)").forEach((btn) => {
  btn.addEventListener("click", () => selectTopic(btn.dataset.target, btn));
});

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
   QUIZ ENGINE
   ========================================================= */
const quizData = [
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
    q: "Which JIRA item type is used to track a small, specific piece of work within a larger feature?",
    options: ["Epic", "Sub-task", "Sprint", "Board"],
    answer: 1,
    explanation:
      "A Sub-task breaks a Story or Task into smaller units of work; an Epic is a larger body of work made up of multiple Stories.",
  },
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
    q: "In Java, which keyword is used to inherit a class?",
    options: ["implements", "extends", "inherits", "super"],
    answer: 1,
    explanation:
      "'extends' is used for class inheritance in Java, while 'implements' is used for interfaces.",
  },
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
    q: "In SQL, which clause is used to filter grouped results (used after GROUP BY)?",
    options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
    answer: 1,
    explanation:
      "HAVING filters aggregated/grouped rows, while WHERE filters rows before grouping happens.",
  },
  {
    q: "In REST API testing, which HTTP method is typically used to update an existing resource fully?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: 2,
    explanation:
      "PUT is used to replace/update an existing resource entirely; PATCH is used for partial updates, POST typically creates new resources.",
  },
  {
    q: "In Cucumber (BDD), which file format is used to write feature scenarios in plain English?",
    options: [".feature (Gherkin)", ".xml", ".properties", ".json"],
    answer: 0,
    explanation:
      "Cucumber uses Gherkin syntax written in .feature files with Given/When/Then steps that are both human-readable and executable.",
  },
];

const quizContainer = document.getElementById("quizContainer");
const quizResult = document.getElementById("quizResult");

function renderQuiz() {
  quizContainer.innerHTML = "";
  quizData.forEach((item, qi) => {
    const wrap = document.createElement("div");
    wrap.className = "quiz-question";
    wrap.dataset.index = qi;

    const qText = document.createElement("p");
    qText.className = "q-text";
    qText.textContent = `${qi + 1}. ${item.q}`;
    wrap.appendChild(qText);

    const optWrap = document.createElement("div");
    optWrap.className = "quiz-options";

    item.options.forEach((opt, oi) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${qi}" value="${oi}"> ${opt}`;
      optWrap.appendChild(label);
    });
    wrap.appendChild(optWrap);

    const expl = document.createElement("div");
    expl.className = "explanation";
    expl.textContent = `Correct answer: "${item.options[item.answer]}" — ${item.explanation}`;
    wrap.appendChild(expl);

    quizContainer.appendChild(wrap);
  });
}
renderQuiz();

document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  quizData.forEach((item, qi) => {
    const wrap = quizContainer.querySelector(
      `.quiz-question[data-index="${qi}"]`,
    );
    const selected = wrap.querySelector(`input[name="q${qi}"]:checked`);
    const expl = wrap.querySelector(".explanation");
    wrap.classList.remove("correct", "incorrect");

    if (selected) {
      const chosen = parseInt(selected.value, 10);
      if (chosen === item.answer) {
        wrap.classList.add("correct");
        score++;
      } else {
        wrap.classList.add("incorrect");
      }
    } else {
      wrap.classList.add("incorrect");
    }
    expl.classList.add("show");
  });

  quizResult.textContent = `You scored ${score} out of ${quizData.length}. Review the highlighted explanations above for details.`;
  quizResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("resetQuiz").addEventListener("click", () => {
  quizResult.textContent = "";
  renderQuiz();
});

/* =========================================================
   CHAT BOX (rule-based demo assistant)
   ========================================================= */
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatToggle.addEventListener("click", () => chatBox.classList.toggle("open"));
chatClose.addEventListener("click", () => chatBox.classList.remove("open"));

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const botReplies = [
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
      "Scroll down to the Quick Quiz section, select your answers, then click 'Submit Answers' to see your score and explanations.",
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
  { keys: ["thank"], reply: "You're welcome! Happy learning. 🚀" },
];

function getBotReply(userText) {
  const lower = userText.toLowerCase();
  for (const entry of botReplies) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return entry.reply;
    }
  }
  return "I'm a simple demo assistant. Try asking about 'Java', 'Selenium', 'Agile', 'JIRA', 'quiz', or 'theme'.";
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  setTimeout(() => {
    addMessage(getBotReply(text), "bot");
  }, 400);
});
