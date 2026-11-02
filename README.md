# Intro to Programming

Course notes for the first-year programming module at IADT (2026-27).
The notes teach p5.js step by step, from drawing a circle to a complete game.

The site is built by GitHub Pages with Jekyll and the
[Just the Docs](https://just-the-docs.com/) theme. Every push to `main` rebuilds it.

## What's in the repo

| Folder | What it holds |
| --- | --- |
| `index.html` | The home page, with the list of sketches |
| `notes/slides/` | The tutorial pages, one folder per sketch |
| `src/` | Runnable p5.js sketches that the notes link to |
| `exercises/` | Starter files and instructions for students |
| `_config.yml` | Site settings: title, theme, files to leave out |
| `_includes/`, `_sass/custom/` | Additions to the theme (Previous / Next buttons, styles) |
| `tools/` | The script that converted the old pages (not part of the site) |

## Add a page

1. Create the file in the right folder, as `.md` or `.html`.
   Name it with a number so it sorts in order, e.g. `07-extra.html`.
2. Put front matter at the top. For a page inside a sketch:

   ```yaml
   ---
   title: Extra Challenges
   parent: "13 — Ball Bounce"
   nav_order: 7
   ---
   ```

   - `parent` must match the `title` of the sketch's `index.html` exactly.
   - For a page inside a game stage, also add `grand_parent: "Developing a game"`.
   - `nav_order` sets its place in the sidebar.
   - Put quotes around any title that contains `—` or `:`.
3. Write the content below the front matter. That's all: the sidebar,
   breadcrumbs and Previous / Next buttons update themselves.

If a code example contains `{{` or `{%`, wrap it in `{% raw %}` … `{% endraw %}`,
otherwise Jekyll will try to run it as a template.

## Preview on your own computer (optional)

You don't need this to publish: GitHub builds the site for you.
To see changes before pushing:

1. Install Ruby (on Windows, use [RubyInstaller](https://rubyinstaller.org/) with the DevKit).
2. In this folder, run once:

   ```sh
   bundle install
   ```

3. Then each time you want to preview:

   ```sh
   bundle exec jekyll serve
   ```

4. Open the address it prints, e.g. `http://127.0.0.1:4000/intro-to-programming/`.

If the build stops with `certificate verify failed` while downloading the theme,
tell Ruby where its certificate file is, then run `jekyll serve` again.
In PowerShell (adjust the path to match your Ruby version):

```powershell
$env:SSL_CERT_FILE = "C:\Ruby40-x64\lib\ruby\4.0.0\etc\ssl\cert.pem"
```

The local preview uses Jekyll 4, while GitHub Pages uses Jekyll 3.10.
The differences don't affect this site, but if something looks different
online, trust the live site.

## Publish

In the repo on GitHub: **Settings → Pages → Build and deployment →
Deploy from a branch**, branch `main`, folder `/ (root)`.

If the repo name changes, update `baseurl` in `_config.yml` to match.
