// main.js — dynamic behaviour for the Vibe Coding Course

// Define the course modules and their sections. In a real course you might fetch this
// from a server or external JSON, but for this starter kit we embed it directly.
const modules = [
  {
    id: 'mod1',
    title: 'Orientation: What is Vibe Coding?',
    sections: [
      {
        title: 'Mindset',
        content: `Vibe coding is more than just writing code. It’s a mindset that values clarity over cleverness, tiny steps over giant leaps and a continuous loop of feedback. In this module you’ll learn why “tidy first” makes changes safer and why starting with small refactorings eases the path for new features.`
      },
      {
        title: 'TDD cycles',
        content: `Test‑driven development (TDD) uses a simple cycle: **Red → Green → Refactor**. First, write a failing test that expresses intent (red). Then, implement the smallest code to make it pass (green). Finally, tidy the code without changing behaviour (refactor). Repeat often — this keeps complexity in check.`
      },
      {
        title: 'Tidy‑first',
        content: `Before adding a new feature, invest in small clean‑ups: extract a function, clarify a name, split a module. Kent Beck calls this “Tidy First?”. These micro‑refactorings pave the way for new code and reduce friction later.`
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Subagents & Separation of Concerns',
    sections: [
      {
        title: 'Three roles',
        content: `Separate responsibilities into clear roles: **PM/Analyst** prepares tasks and clarifies acceptance criteria; **Developer** implements by TDD and opens merge requests; **Test‑Runner** executes tests and surfaces feedback. Each agent has its own context and limited tools, improving focus and predictability.`
      },
      {
        title: 'Why separation matters',
        content: `By isolating concerns you prevent context overload. A developer doesn’t waste tokens on issue trackers; a test‑runner doesn’t pollute the developer’s conversation with logs. Each subagent becomes a specialised tool in your workflow.`
      }
    ]
  },
  {
    id: 'mod3',
    title: 'Single Source of Truth & Task Capsules',
    sections: [
      {
        title: 'Source of truth',
        content: `Always decide where information lives. A task tracker (e.g. Linear, Jira) should own statuses and metadata. Developers and testers read from it but do not update it directly — instead, the PM/Analyst controls transitions to maintain predictability.`
      },
      {
        title: 'Task capsule',
        content: `Pass tasks to developers via a compact “capsule”: a structured object with id, title, goal, acceptance criteria, repo, branch naming and dependencies. This ensures developers have all they need without direct access to the tracker.`
      }
    ]
  },
  {
    id: 'mod4',
    title: 'TDD: Red → Green → Refactor',
    sections: [
      {
        title: 'Start with a failing test',
        content: `Express the desired behaviour as a test first. The test should be minimal yet sufficient to describe the feature. A failing test drives your design and serves as a specification.`
      },
      {
        title: 'Implement the minimum',
        content: `Make the test pass by writing the simplest possible code. Avoid over‑engineering; lean on tests to guide you. This encourages incremental design and reduces waste.`
      },
      {
        title: 'Refactor mercilessly',
        content: `Once tests are green, clean up. Remove duplication, rename variables, extract functions, reorder code. Refactoring with a green suite keeps you safe and allows continuous evolution.`
      }
    ]
  },
  {
    id: 'mod5',
    title: 'PR/MR‑centric Flow & CI Gates',
    sections: [
      {
        title: 'Small merge requests',
        content: `Keep changes small and purposeful. One feature or fix per branch makes reviews quick and defects easier to isolate. Use descriptive branch names linked to tasks.`
      },
      {
        title: 'Continuous Integration gates',
        content: `Automated pipelines enforce quality: formatters (e.g. ruff), unit tests, coverage thresholds, security scans. Configure merge rules so that code cannot merge unless all checks pass. This guarantees consistent quality and predictability.`
      }
    ]
  },
  {
    id: 'mod6',
    title: 'Safety, Secrets & Policies',
    sections: [
      {
        title: 'Minimal permissions',
        content: `Each agent should only have the tools it needs. Deny access to sensitive files by default; use hooks to block risky actions. Keeping a small blast radius reduces inadvertent leaks and mistakes.`
      },
      {
        title: 'Secrets hygiene',
        content: `Never embed secrets in code or prompts. Use environment variables or secret managers. Encourage regular rotation of tokens and review of permissions.`
      },
      {
        title: 'Policies and hooks',
        content: `Use project settings to enforce policies: branch protection, required reviews, commit message patterns. In Claude Code, write pre‑tool hooks to validate file paths or deny writes outside allowed directories.`
      }
    ]
  },
  {
    id: 'mod7',
    title: 'Hands‑On Labs',
    sections: [
      {
        title: 'Hello Flow',
        content: `Create a minimal API endpoint in your language of choice. Write a test that fails, implement the endpoint and see the test pass. Open a merge request and observe how CI gates enforce quality.`
      },
      {
        title: 'Task Capsule',
        content: `Practise writing a capsule for a feature: identify its goal, acceptance criteria and dependencies. Use the builder in this course to generate the JSON.`
      },
      {
        title: 'Incident Drill',
        content: `Simulate a production incident: write a failing test that reproduces the bug, fix it and refactor. Use the subagent pattern to separate triage from implementation.`
      }
    ]
  },
  {
    id: 'mod8',
    title: 'Vibe Playbook & Cheat‑Sheets',
    sections: [
      {
        title: 'Playbook overview',
        content: `Summarise the core rules: tidy first, TDD cycles, separate concerns, small MRs and strong CI gates. Share this playbook with teammates to align on expectations.`
      },
      {
        title: 'Cheat‑sheets',
        content: `Maintain short lists of commands and patterns: e.g. how to run tests, how to check coverage, how to update dependencies. These cheat‑sheets reduce cognitive load.`
      },
      {
        title: 'Further exploration',
        content: `Consider adding your own modules: security reviews, end‑to‑end testing, performance monitoring or DevOps tooling. The vibe mindset adapts to many domains.`
      }
    ]
  }
];

// Retrieve progress from localStorage. Returns a Set of visited section ids.
function loadProgress() {
  try {
    const raw = localStorage.getItem('vibeCourseProgress');
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(arr);
  } catch (err) {
    return new Set();
  }
}

// Save progress to localStorage.
function saveProgress(set) {
  try {
    localStorage.setItem('vibeCourseProgress', JSON.stringify(Array.from(set)));
  } catch (err) {
    // ignore
  }
}

// Current module index. Default to first.
let currentIndex = 0;
const progress = loadProgress();

const navEl = document.getElementById('nav');
const contentEl = document.getElementById('content');

function renderNav() {
  // Clear existing nav
  navEl.innerHTML = '';
  modules.forEach((mod, idx) => {
    const btn = document.createElement('button');
    btn.textContent = `${idx + 1}. ${mod.title}`;
    btn.setAttribute('data-index', idx);
    btn.setAttribute('type', 'button');
    if (idx === currentIndex) {
      btn.setAttribute('aria-current', 'true');
    }
    // compute whether module is completed
    const totalSections = mod.sections.length;
    let visited = 0;
    mod.sections.forEach((sec, secIdx) => {
      const secId = `${mod.id}-${secIdx}`;
      if (progress.has(secId)) visited++;
    });
    if (visited === totalSections) {
      btn.title = 'Completed';
    } else if (visited > 0) {
      btn.title = `Progress: ${visited}/${totalSections}`;
    }
    btn.addEventListener('click', () => {
      currentIndex = idx;
      renderNav();
      renderModule();
    });
    navEl.appendChild(btn);
  });
}

function renderModule() {
  const mod = modules[currentIndex];
  contentEl.innerHTML = '';
  const wrapper = document.createElement('section');
  const h2 = document.createElement('h2');
  h2.textContent = mod.title;
  wrapper.appendChild(h2);
  mod.sections.forEach((sec, secIdx) => {
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    h3.textContent = sec.title;
    const p = document.createElement('p');
    p.innerHTML = sec.content;
    article.appendChild(h3);
    article.appendChild(p);
    article.addEventListener('mouseenter', () => {
      // mark as visited
      const secId = `${mod.id}-${secIdx}`;
      if (!progress.has(secId)) {
        progress.add(secId);
        saveProgress(progress);
        renderNav();
      }
    });
    wrapper.appendChild(article);
  });
  contentEl.appendChild(wrapper);
}

// Assistant Wizard logic
const promptTemplates = {
  'pm-analyst': 'You are a PM/Analyst. Clarify requirements, define acceptance criteria and maintain the Definition of Ready/Done. Task: {task}',
  'developer': 'You are a developer. Follow TDD: write a failing test, implement minimal code, then refactor. Task: {task}',
  'test-runner': 'You are a test‑runner. Run tests, summarise failures and suggest next steps without editing production code. Task: {task}',
  'vibe-coach': 'You are a vibe coach. Encourage tidy-first refactorings and micro‑iterations. Task: {task}'
};

const wizardForm = document.getElementById('wizard-form');
const wizardOutput = document.getElementById('wizard-output');

wizardForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const role = document.getElementById('wizard-role').value;
  const task = document.getElementById('wizard-task').value.trim();
  if (!task) {
    wizardOutput.textContent = 'Please describe your task.';
    return;
  }
  const tmpl = promptTemplates[role] || '{task}';
  const prompt = tmpl.replace('{task}', task);
  wizardOutput.textContent = prompt;
});

// Task Capsule builder logic
const capsuleForm = document.getElementById('capsule-form');
const capsuleOutput = document.getElementById('capsule-output');

capsuleForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const id = document.getElementById('capsule-id').value.trim();
  const title = document.getElementById('capsule-title').value.trim();
  const goal = document.getElementById('capsule-goal').value.trim();
  const ac = document.getElementById('capsule-ac').value.trim();
  const repo = document.getElementById('capsule-repo').value.trim();
  const branch = document.getElementById('capsule-branch').value.trim();
  const depsRaw = document.getElementById('capsule-deps').value.trim();
  const capsule = {};
  if (id) capsule.id = id;
  if (title) capsule.title = title;
  if (goal) capsule.goal = goal;
  if (ac) {
    // split by newline. If only one line but contains commas, keep as single string.
    const lines = ac.split(/\n+/).map(l => l.trim()).filter(Boolean);
    capsule.acceptance_criteria = lines;
  }
  if (repo) capsule.repo = repo;
  if (branch) capsule.branch_naming = branch;
  if (depsRaw) {
    // split by comma or newline
    const parts = depsRaw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    capsule.dependencies = parts;
  }
  capsuleOutput.textContent = JSON.stringify(capsule, null, 2);
});

// Initial render
renderNav();
renderModule();
