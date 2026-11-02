# Intro to Programming — p5.js tutorial site

Course notes for a first-year programming module (IADT, 2026-27), to be published on
GitHub Pages as a Jekyll site using the **Just the Docs** theme.

This folder was copied from `../Prog-Template` on 2026-11-02 (working files only, no git
history). `Prog-Template` stays as it was; all new work happens here.

## Why we are converting

The notes are 154 hand-written HTML pages. Each page repeats the same `<head>`, nav bar
and script tags, and the Previous / Next links are typed by hand, so inserting or
reordering a page means editing its neighbours. Students also find it hard to tell where
they are in the tutorial.

Goals:
1. Students can always see where they are: a sidebar with the current page highlighted,
   breadcrumbs, and Previous / Next buttons.
2. Navigation is generated from one place and never edited by hand.
3. Adding a new page means writing content only, plus a few lines of front matter.
4. The site builds on GitHub Pages with no local tooling required (local preview optional).

## Current layout

```
notes/slides/            the tutorial (what gets converted)
  index.html             home page with the contents list
  css/tutorial.css       site styles (272 lines)
  images/                33 images used by the notes
  00-getting-started/    11 pages + index.html
  01..13-*/              one folder per numbered sketch, 5–6 pages + index.html each
  game-00..game-11-*/    the game track, 4 pages + index.html each
src/                     runnable p5 sketches (index.html + sketch.js + style.css)
  01..13-*/, extras/, game/00..15-*/, libraries/ (p5.min.js, p5.sound.min.js)
exercises/               student starter files and READMEs (house, cars-frogger,
                         create, game-00..game-15, one folder per numbered sketch)
```

Things about the existing pages worth knowing:
- Every page has the shape `<nav class="nav">…</nav><main class="page">CONTENT</main>`.
  Only CONTENT needs to survive the conversion.
- Most sub-pages start with `<p class="eyebrow"><a href="index.html">13 — Ball Bounce</a></p>`.
  Breadcrumbs replace this, so it can be removed.
- Each sketch `index.html` has an "On this page" `<ul class="toc">` list. The sidebar
  replaces this; keep or remove it (decide in Phase 1).
- Code blocks are `<pre class="highlight"><code class="language-js">`, highlighted in the
  browser by highlight.js 11.9.0 from jsDelivr.
- Pages link out of the notes to running sketches, e.g.
  `../../../src/13-ball-bounce/index.html` and `../../../src/game/01-ship/PLAN.md`.
  These links only work if the **whole repo** is published, not just `notes/`.
- No page contains `{{` or `{%`, so Liquid will not mangle any content as it stands.
- Slides exist for game-00 to game-11 only; `exercises/` and `src/game/` go up to 15.

## Target structure

```
_config.yml              theme, title, baseurl, exclude list
_includes/               prev-next.html (Just the Docs has no prev/next of its own)
_layouts/                only if we need to extend the theme's default layout
_sass/custom/            custom.scss: carry over the useful parts of tutorial.css
Gemfile                  for local preview only (GitHub ignores it with remote_theme)
index.html               site home (contents + intro, moved from notes/slides/index.html;
                         the old address redirects here via jekyll-redirect-from)
notes/slides/...         same folders and file names as now, so existing URLs keep working
src/, exercises/         unchanged, served as static files
```

Keep file names and folder names unchanged so that any links already shared with
students keep working. Page content can stay as HTML: Jekyll accepts `.html` files with
front matter, so there is no need to rewrite pages as Markdown. New pages can be written
in Markdown.

Front matter per page (Just the Docs navigation):

```yaml
# a sketch landing page, e.g. notes/slides/13-ball-bounce/index.html
---
title: "13 — Ball Bounce"
nav_order: 14
has_children: true
---

# a sub-page, e.g. notes/slides/13-ball-bounce/06-projects.html
---
title: Projects
parent: "13 — Ball Bounce"
nav_order: 6
---
```

The game track is grouped under one parent page, `notes/slides/developing-a-game.html`
(title "Developing a game", nav_order 15). Game sections use
`parent: "Developing a game"` and `nav_order` = game number + 1; their sub-pages add
`grand_parent: "Developing a game"`.

## Plan

Work in phases. **Stop at the end of each phase so the lecturer can check the result
in a browser before continuing.**

### Phase 0 — set up (done 2026-11-02)
- [x] `git init`, first commit of the copied files as they are (baseline).
- [x] Ask the lecturer for the GitHub repo name/org (the old one was
      `IADT-Y1-Prog/Prog-Template`). This sets `baseurl` in `_config.yml`.
      Answered in Phase 1: `john-dempsey/intro-to-programming`, so the site is
      `https://john-dempsey.github.io/intro-to-programming/`.
- [x] Add `_config.yml` with `remote_theme: just-the-docs/just-the-docs`, the
      `jekyll-remote-theme` plugin, title, `search_enabled: true`, and an `exclude:` list
      (see Gotchas).
- [x] Add a `Gemfile` for optional local preview (`bundle exec jekyll serve`).
- [x] Add a `README.md` for the repo itself, saying how to preview and how to add a page.

Phase 0 decisions and findings:
- **Markdown in `src/` and `exercises/` is excluded** from the site. The 4 links in the
  notes to `src/game/*/PLAN.md` must be changed to
  `https://github.com/john-dempsey/intro-to-programming/blob/main/src/game/…/PLAN.md`.
  `tools/convert_pages.py` does this; none of the Phase 1 sample folders has one.
- The theme is pinned: `just-the-docs/just-the-docs@v0.10.1`.
- Local preview uses plain Jekyll 4.4, not the `github-pages` gem, because github-pages
  needs Ruby < 4.0 and this machine has Ruby 4.0.7. GitHub itself still builds with
  Jekyll 3.10.
- On this machine the remote theme download fails with `certificate verify failed`
  unless `SSL_CERT_FILE` points at `C:/Ruby40-x64/lib/ruby/4.0.0/etc/ssl/cert.pem`
  (the bundled `openssl` gem doesn't find Ruby's certificates by itself).
- Jekyll 4's `**` in `exclude:` doesn't match files at the top of a folder, so the list
  has both `src/*.md` and `src/**/*.md` (same for `exercises/`).
- Gems install into `vendor/bundle` (git-ignored, excluded from the site).

### Phase 1 — sample conversion (3 folders) (done 2026-11-02, pushed)
- [x] Convert `index.html` (home), `00-getting-started/`, `13-ball-bounce/` and
      `game-01-ship/` by hand, or with the script from Phase 2 run on just these folders.
- [x] Add `_includes/prev-next.html`: Previous / Next buttons built from the sidebar
      order, so they follow the same order as the old hand-written links
      (…`13-ball-bounce/06-projects` → `game-00-plan/index`…).
- [x] Load highlight.js the way the pages do now, through the theme's head include
      (`_includes/head_custom.html`), and switch off Jekyll/Rouge highlighting so the two
      don't conflict over the `highlight` class.
- [x] Bring over styles from `tutorial.css` that the content needs (`.sketch-list`,
      `.sketch-desc`, `.tagline`, code block look) into `_sass/custom/custom.scss`.
- [x] Decide: keep or drop the "On this page" lists, and flat or grouped game track.
- [x] Push and enable Pages (Settings → Pages → Deploy from branch → `main` / root).
      **Checkpoint: the lecturer reviews the sample online.**

Phase 1 decisions and findings:
- "On this page" lists are **removed**; the theme's generated "Table of contents" list
  at the bottom of each section page replaces them.
- The game track is **grouped** under "Developing a game" (see Target structure). So the
  order runs `13-ball-bounce/06-projects` → `developing-a-game` → `game-00-plan/index`.
- The home page is `index.html` at the root, not `index.md`: its content is HTML and
  stays HTML. Its links gained a `notes/slides/` prefix because the page moved.
- Previous / Next (`_includes/prev-next.html`, shown via `footer_custom.html`) reads the
  links out of the theme's cached sidebar HTML, so it can never disagree with the
  sidebar. The buttons are at the bottom of the page only.
- `_config.yml` must list `jekyll-include-cache` and `jekyll-seo-tag` (the theme needs
  them) and `jekyll-redirect-from`. GitHub Pages only runs listed plugins; the local
  build hides this because the Gemfile loads them anyway.
- The script was run on the sample folders already. Running it again on a converted
  folder stops with an error (no `<main class="page">` left), so in Phase 2 run it on
  the remaining folders only.
- The home page sentence about the Next button "in the bar at the top" was reworded
  (separate content commit) to say the button is at the bottom of each page.

### Phase 2 — convert everything (done 2026-11-02)
- [x] Write a small conversion script, kept in `tools/` and excluded from the site,
      that for each page:
      takes the content inside `<main class="page">`, removes the eyebrow line, takes the
      title from `<h1>`, works out `parent` and `nav_order` from the folder and file
      name, and writes front matter + content back to the same path.
      Done in Phase 1: `tools/convert_pages.py`.
- [x] Run it, then check the diff on a few pages per track.
- [x] Check links: run a link checker (e.g. `htmlproofer` or `lychee`) against the
      built `_site/`, especially the `../../../src/...` links.
- [x] Delete `notes/slides/css/tutorial.css` once nothing references it.
      **Checkpoint.**

Phase 2 findings:
- All 26 section folders are converted (153 pages). A script compared every page with
  the baseline commit: the content is unchanged apart from the eyebrow line, the
  "On this page" list and the 4 `PLAN.md` links.
- The Next chain runs through all 155 pages (153 + home + "Developing a game") in the
  same order as the old hand-written Next links.
- Links were checked with a short Python script against `_site/` (htmlproofer and
  lychee aren't installed): 0 broken internal links, all external links return 200.
  Links inside `<pre>` code examples are skipped, since they aren't real links.
- `notes/slides/css/` is now empty and gone; `notes/slides/images/` is still used.

### Phase 3 — polish
- [ ] Add "Sketch 13 of 27"–style position text, or a progress bar, if the sidebar
      isn't enough.
- [ ] Add a "Run this sketch" button style for the links into `src/`.
- [ ] Check the site on a phone; check colour contrast and alt text on all images.
- [ ] Optional: a GitHub Action that runs the link checker on every push.

## Gotchas
- **Markdown files get converted.** GitHub Pages turns `.md` files into `.html` even
  without front matter. That breaks links to `src/game/*/PLAN.md` and turns the
  `exercises/**/README.md` files into site pages. Either link to the `.html` version, or
  add them to `exclude:` and link to them on github.com instead. Decide in Phase 0.
- Jekyll ignores files and folders whose names start with `_` or `.`. No existing
  files do this, but avoid the pattern in `src/` and `exercises/`.
- Every internal link must work under `baseurl` (the site lives at
  `https://<org>.github.io/<repo>/`). Relative links like the existing ones are fine;
  in layouts and includes use `{{ '/path' | relative_url }}`.
- If future code examples contain `{{` or `{%`, wrap them in `{% raw %}…{% endraw %}`.
- `.gitattributes` forces LF line endings. Keep it.
- Use `"` quotes around titles that contain `—` or `:` in front matter.

## Conventions
- Audience: first-year students of mixed ability. Page text and code examples follow
  the lecturer's global guidelines: clear names, simple code, no unexplained jargon.
- Don't change the **content** of the notes during the conversion. Conversion commits
  and content edits stay separate, so the diffs are easy to review.
- Commit at the end of each phase with a clear message. Don't push without asking.
