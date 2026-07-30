/* ============================================================
   TECH SOURCE — script.js (single-page build)
   Router + nav + reveal + circuit canvas + quiz engine + counters
   + chatbot widget, all in one file.
   ============================================================ */

/* ---------- SPA hash router ---------- */
const TS_PAGES = [
  "home",
  "java",
  "selenium",
  "frameworks",
  "api-db",
  "devops",
  "practice",
  "resources",
];

function tsShowPage(key, anchor) {
  if (!TS_PAGES.includes(key)) key = "home";
  TS_PAGES.forEach((k) => {
    const el = document.getElementById("page-" + k);
    if (el) el.style.display = k === key ? "block" : "none";
  });
  document.querySelectorAll("[data-page-link]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === "#" + key);
  });
  // reveal elements on the now-visible page immediately
  const page = document.getElementById("page-" + key);
  if (page)
    page.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));

  if (anchor) {
    setTimeout(() => {
      const target = document.getElementById(anchor);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });
  }
}

function tsRouteFromHash() {
  const key = (location.hash || "#home").replace("#", "") || "home";
  tsShowPage(key);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-page-link]");
  if (!a) return;
  const key = (a.getAttribute("href") || "#home").replace("#", "");
  const anchor = a.getAttribute("data-anchor");
  tsShowPage(key, anchor);
  document
    .querySelectorAll(".nav-links")
    .forEach((nl) => nl.classList.remove("open"));
});

window.addEventListener("hashchange", tsRouteFromHash);
document.addEventListener("DOMContentLoaded", tsRouteFromHash);

/* ---------- Mobile nav toggle ---------- */
(function navToggle() {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    links.classList.toggle("open");
    btn.setAttribute("aria-expanded", links.classList.contains("open"));
  });
})();

/* ---------- Scroll reveal (for elements revealed by scrolling within a page) ---------- */
(function scrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Ambient circuit background canvas ---------- */
(function circuitBg() {
  const canvas = document.getElementById("circuit-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w,
    h,
    nodes = [],
    reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  function buildNodes() {
    const count = Math.min(
      46,
      Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 26000)
    );
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: (Math.random() * 1.6 + 1) * devicePixelRatio,
    }));
  }
  function step() {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const dx = a.x - b.x,
          dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160 * devicePixelRatio;
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(41,182,255,${0.16 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(127,227,255,.55)";
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(step);
  }
  resize();
  buildNodes();
  step();
  window.addEventListener("resize", () => {
    resize();
    buildNodes();
  });
})();

/* ---------- Quiz engine ---------- */
(function quizEngine() {
  document.querySelectorAll("[data-quiz]").forEach((card) => {
    let data;
    try {
      data = JSON.parse(card.getAttribute("data-quiz"));
    } catch (e) {
      return;
    }
    let idx = 0,
      score = 0,
      answered = false;

    const qEl = document.createElement("div");
    qEl.className = "quiz-q";
    const optsEl = document.createElement("div");
    optsEl.className = "quiz-opts";
    const footEl = document.createElement("div");
    footEl.className = "quiz-foot";
    const scoreEl = document.createElement("span");
    scoreEl.className = "quiz-score";
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary btn-sm";
    nextBtn.textContent = "Next question";

    footEl.append(scoreEl, nextBtn);
    card.append(qEl, optsEl, footEl);

    function render() {
      answered = false;
      const item = data[idx];
      qEl.textContent = `Q${idx + 1}. ${item.q}`;
      optsEl.innerHTML = "";
      item.options.forEach((opt, i) => {
        const b = document.createElement("button");
        b.className = "quiz-opt";
        b.textContent = opt;
        b.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const correctIdx = item.answer;
          [...optsEl.children].forEach((c, ci) => {
            if (ci === correctIdx) c.classList.add("correct");
            else if (ci === i) c.classList.add("wrong");
          });
          if (i === correctIdx) score++;
          scoreEl.textContent = `Score: ${score} / ${data.length}`;
        });
        optsEl.appendChild(b);
      });
      scoreEl.textContent = `Score: ${score} / ${data.length}`;
      nextBtn.textContent =
        idx === data.length - 1 ? "Restart quiz" : "Next question";
    }
    nextBtn.addEventListener("click", () => {
      if (idx === data.length - 1) {
        idx = 0;
        score = 0;
      } else idx++;
      render();
    });
    render();
  });
})();

/* ---------- Animated stat counters ---------- */
(function counters() {
  const stats = document.querySelectorAll("[data-count]");
  if (!stats.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const target = parseInt(e.target.getAttribute("data-count"), 10);
        const suffix = e.target.getAttribute("data-suffix") || "";
        let cur = 0;
        const dur = 900,
          start = performance.now();
        function tick(t) {
          const p = Math.min(1, (t - start) / dur);
          cur = Math.floor(target * (1 - Math.pow(1 - p, 3)));
          e.target.textContent = cur + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((s) => io.observe(s));
})();

/* ============================================================
   Chatbot widget — rule-based, works fully offline
   ============================================================ */
(function () {
  const KB = [
    {
      keys: ["java", "oop", "collection", "stream", "lambda"],
      reply:
        'Java fundamentals through OOP, collections, streams and lambdas live on the <a href="#java" data-page-link>Java Track</a>. For extra syntax reference, try <a href="https://www.w3schools.com/java/" target="_blank" rel="noopener">W3Schools Java</a>.',
    },
    {
      keys: ["selenium", "webdriver", "locator", "xpath"],
      reply:
        'Selenium WebDriver — locators, waits, POM and Grid — is covered on the <a href="#selenium" data-page-link>Selenium module</a>. Deeper labs are on the <a href="https://academy.selfmade.ninja/login" target="_blank" rel="noopener">Selfmade Ninja Academy</a>.',
    },
    {
      keys: ["playwright"],
      reply:
        'Playwright (auto-waiting, API testing, trace viewer, parallel runs) is on the <a href="#selenium" data-anchor="playwright" data-page-link>Playwright section</a> of the Selenium & Playwright page.',
    },
    {
      keys: [
        "testng",
        "junit",
        "cucumber",
        "bdd",
        "framework",
        "pom",
        "page object",
      ],
      reply:
        'TestNG, JUnit, Cucumber BDD and the Page Object Model framework notes are on the <a href="#frameworks" data-page-link>Frameworks page</a>.',
    },
    {
      keys: ["api", "rest", "postman", "jdbc", "sql", "database", "db"],
      reply:
        'REST API testing plus SQL & JDBC for backend validation are on the <a href="#api-db" data-page-link>API & Database page</a>.',
    },
    {
      keys: [
        "git",
        "jira",
        "agile",
        "scrum",
        "cicd",
        "ci/cd",
        "jenkins",
        "maven",
        "devops",
      ],
      reply:
        'Git, Jira, Agile ceremonies, Maven and CI/CD pipelines are grouped on the <a href="#devops" data-page-link>Tools & DevOps page</a>.',
    },
    {
      keys: ["istqb", "ctfl", "syllabus", "manual testing", "software testing"],
      reply:
        'ISTQB CTFL syllabus topics and core manual-testing theory are on the <a href="#devops" data-anchor="istqb" data-page-link>Testing Foundations section</a> of the DevOps page.',
    },
    {
      keys: ["genai", "ai", "prompt"],
      reply:
        'Generative AI for testers and prompt-writing tips are on the <a href="#devops" data-anchor="genai" data-page-link>GenAI for QA section</a>.',
    },
    {
      keys: ["practice", "compiler", "run code", "ide", "playground"],
      reply:
        'Head to the <a href="#practice" data-page-link>Practice Lab</a> — it embeds the OneCompiler Java IDE and has self-check quizzes for every module.',
    },
    {
      keys: ["compiler online", "onecompiler"],
      reply:
        'You can compile Java right in the browser at <a href="https://onecompiler.com/java" target="_blank" rel="noopener">OneCompiler</a>, also embedded on the <a href="#practice" data-page-link>Practice Lab</a>.',
    },
    {
      keys: ["resource", "link", "w3schools", "notes", "reference"],
      reply:
        'All referral links (W3Schools, OneCompiler, Selfmade Ninja Academy) are collected on the <a href="#resources" data-page-link>Resources page</a>.',
    },
    {
      keys: ["quiz", "test me", "question"],
      reply:
        'Every module page has a short self-check quiz near the bottom, and the <a href="#practice" data-page-link>Practice Lab</a> has a mixed-topic quiz too.',
    },
    {
      keys: ["hello", "hi", "hey"],
      reply:
        'Hey! I\'m the Tech Source guide. Ask me about Java, Selenium, Playwright, Frameworks, API/SQL, DevOps tools, or say "practice" to jump into the coding lab.',
    },
    { keys: ["thank"], reply: "You're welcome! Happy testing 🚀" },
    {
      keys: ["who are you", "what are you"],
      reply:
        "I'm a lightweight on-page guide — keyword-based, not a live AI service — here to help you navigate the Tech Source learning path.",
    },
  ];

  const FALLBACK =
    'I can help you find modules on Java, Selenium, Playwright, Frameworks (TestNG/JUnit/Cucumber), API & SQL, or DevOps tools (Git/Jira/Agile/CI-CD) — or say "practice" for the coding lab. Try one of the quick chips below 👇';

  function findReply(text) {
    const t = text.toLowerCase();
    for (const item of KB) {
      if (item.keys.some((k) => t.includes(k))) return item.reply;
    }
    return FALLBACK;
  }

  const MARK_SVG = `<svg viewBox="0 0 640 600" class="mark"><defs><linearGradient id="cbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3fd0ff"/><stop offset="55%" stop-color="#1f8fe0"/><stop offset="100%" stop-color="#0a4d94"/></linearGradient><linearGradient id="csg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#c7d3dd"/><stop offset="100%" stop-color="#8a99a8"/></linearGradient></defs><path d="M180,230 H400 L360,290 H320 V520 L270,570 V290 H220 Z" fill="url(#cbg)"/><path d="M330,300 H470 Q510,300 510,345 Q510,380 470,385 H400 Q420,385 420,410 Q420,435 445,435 H520 V495 H400 Q345,495 345,440 Q345,405 385,400 H445 Q425,400 425,378 Q425,355 400,355 H330 Z" fill="url(#csg)"/></svg>`;

  function buildWidget() {
    const launcher = document.createElement("button");
    launcher.id = "ts-chat-launcher";
    launcher.setAttribute("aria-label", "Open Tech Source assistant");
    launcher.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="ping"></span>`;

    const panel = document.createElement("div");
    panel.id = "ts-chat-panel";
    panel.innerHTML = `
      <div class="chat-head">
        ${MARK_SVG}
        <div>
          <b>Tech Source Guide</b>
          <span>Online · rule-based</span>
        </div>
        <button class="chat-close" aria-label="Close chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
      <div class="chat-body" id="ts-chat-body">
        <div class="msg bot">Hi 👋 I'm your Tech Source guide. Ask about Java, Selenium, Playwright, Frameworks, API/SQL, DevOps, or the Practice Lab.</div>
      </div>
      <div class="chat-suggest">
        <button class="chip" data-q="Java">Java</button>
        <button class="chip" data-q="Selenium">Selenium</button>
        <button class="chip" data-q="Playwright">Playwright</button>
        <button class="chip" data-q="Practice">Practice</button>
        <button class="chip" data-q="Resources">Resources</button>
      </div>
      <form class="chat-input" id="ts-chat-form">
        <input type="text" id="ts-chat-input" placeholder="Type a topic…" autocomplete="off" />
        <button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/></svg></button>
      </form>
    `;

    document.body.append(launcher, panel);

    const body = panel.querySelector("#ts-chat-body");
    const form = panel.querySelector("#ts-chat-form");
    const input = panel.querySelector("#ts-chat-input");

    function addMsg(text, who) {
      const m = document.createElement("div");
      m.className = "msg " + who;
      m.innerHTML = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function ask(text) {
      if (!text.trim()) return;
      addMsg(text.replace(/</g, "&lt;"), "user");
      setTimeout(() => addMsg(findReply(text), "bot"), 380);
    }

    launcher.addEventListener("click", () => panel.classList.toggle("open"));
    panel
      .querySelector(".chat-close")
      .addEventListener("click", () => panel.classList.remove("open"));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      ask(input.value);
      input.value = "";
    });
    panel.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => ask(chip.getAttribute("data-q")));
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", buildWidget);
  else buildWidget();
})();
