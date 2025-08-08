# Vibe Coding Course

This repository contains a small, **stack‑agnostic** starter kit for the "Vibe Coding" approach. It is designed to be hosted as a static site (e.g. via GitHub Pages) and run locally in a browser. No server is required.

## What’s inside?

- `index.html` – the entry point for the course. Loads the navigation, course content, assistant wizard and task capsule builder.
- `style.css` – minimal styling for a clean, modern look. You can customise colours and spacing.
- `main.js` – client‑side logic that renders modules, tracks progress in `localStorage`, generates role‑specific prompts and builds task capsules as JSON.
- `README.md` – this file.

### Modules

The course is split into eight modules covering topics such as mindset, subagents, single source of truth, TDD, merge request flows, safety, labs and cheat‑sheets. You can extend the `modules` array in `main.js` to add your own lessons.

### Assistant Wizard

Use the form in the sidebar to select a role (PM/Analyst, Developer, Test‑Runner or Vibe‑Coach) and describe your task. The wizard will output a simple prompt you can use when working with large language models or as guidance for your own thinking.

### Task Capsule Builder

Enter details like ID, title, goal and acceptance criteria to generate a *task capsule* – a concise, structured JSON object that encapsulates all necessary information for a feature or bug. This helps you communicate tasks clearly to yourself or collaborators.

## Running the course locally

Open `index.html` in a modern web browser. Progress is stored in `localStorage` so if you leave and return on the same device, visited sections will remain marked.

## Deploying to GitHub Pages

1. Create a new repository on your GitHub account (for example, `vibe‑coding‑course`).
2. Copy or upload the files in this folder (`index.html`, `style.css`, `main.js`, `README.md`) to the root of that repository.
3. Commit and push the changes.
4. In the repository settings, enable **GitHub Pages** and select the `main` branch as the source. The site will be available at `https://<username>.github.io/<repository>/` after a few minutes.

You can also host it on any static file hosting service (Netlify, Vercel, GitLab Pages, etc.).

## Customising

- **Content:** Edit the `modules` array in `main.js` to change or extend the lessons.
- **Styles:** Modify `style.css` to change colours, spacing or layout.
- **Wizard prompts:** Adjust the `promptTemplates` object in `main.js` for more detailed or nuanced prompts.

Feel free to adapt this kit to your own workflow and share improvements!
