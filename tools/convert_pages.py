"""Convert the old hand-written tutorial pages into Jekyll pages.

For each page in the folders given on the command line, this script:
  - keeps only the content inside <main class="page"> ... </main>
  - removes the "eyebrow" link at the top of sub-pages (breadcrumbs replace it)
  - removes the "On this page" list from section pages (the theme generates one)
  - points links to Markdown files in src/ and exercises/ at github.com,
    because those files are not published on the site
  - adds front matter (title, parent, nav_order) for the Just the Docs sidebar

The file is written back to the same path, so URLs don't change.

Usage, from the repo root:
    python tools/convert_pages.py notes/slides/13-ball-bounce notes/slides/game-01-ship

Run it on a folder only once: a converted page has no <main class="page"> left,
so a second run stops with an error instead of damaging the page.
"""

import html
import posixpath
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
GITHUB_BLOB_URL = "https://github.com/john-dempsey/intro-to-programming/blob/main/"
GAME_GROUP_TITLE = "Developing a game"

MAIN_PATTERN = re.compile(r'<main class="page">\s*(.*?)\s*</main>', re.DOTALL)
H1_PATTERN = re.compile(r"<h1>(.*?)</h1>", re.DOTALL)
EYEBROW_PATTERN = re.compile(r'<p class="eyebrow">.*?</p>\s*', re.DOTALL)
TOC_PATTERN = re.compile(r'<h2>On this page</h2>\s*<ul class="toc">.*?</ul>\s*', re.DOTALL)
MD_LINK_PATTERN = re.compile(r'href="([^"#:]+\.md)"')


def read_main_content(page_path):
    """Return the HTML between <main class="page"> and </main>."""
    text = page_path.read_text(encoding="utf-8")
    match = MAIN_PATTERN.search(text)
    if match is None:
        raise ValueError(f'{page_path}: no <main class="page"> found (already converted?)')
    content = match.group(1)
    if "{{" in content or "{%" in content:
        raise ValueError(f"{page_path}: contains {{{{ or {{%, wrap it in raw tags by hand")
    return content


def read_title(content, page_path):
    """Return the plain-text title from the page's <h1>, e.g. 'Explore & modify'."""
    match = H1_PATTERN.search(content)
    if match is None:
        raise ValueError(f"{page_path}: no <h1> found")
    title_without_tags = re.sub(r"<[^>]+>", "", match.group(1))
    return html.unescape(title_without_tags).strip()


def leading_number(name):
    """Return the number at the start of a name: '06-projects' -> 6, 'game-01-ship' -> 1."""
    match = re.match(r"(?:game-)?(\d+)", name)
    if match is None:
        raise ValueError(f"{name}: name does not start with a number")
    return int(match.group(1))


def link_md_files_to_github(content, page_path):
    """Point links to .md files at github.com, where they are shown formatted."""

    def replace_link(match):
        page_folder = page_path.parent.relative_to(REPO_ROOT).as_posix()
        repo_path = posixpath.normpath(posixpath.join(page_folder, match.group(1)))
        return f'href="{GITHUB_BLOB_URL}{repo_path}"'

    return MD_LINK_PATTERN.sub(replace_link, content)


def quoted(value):
    """Return a value as a double-quoted YAML string."""
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def build_front_matter(fields):
    """Turn a list of (name, value) pairs into a front matter block."""
    lines = ["---"]
    for name, value in fields:
        if isinstance(value, str):
            value = quoted(value)
        elif isinstance(value, bool):
            value = "true" if value else "false"
        lines.append(f"{name}: {value}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def convert_folder(folder):
    """Convert a section's index.html and all of its numbered sub-pages."""
    is_game = folder.name.startswith("game-")
    section_number = leading_number(folder.name)

    # The section page first: its title is the parent of every sub-page.
    index_path = folder / "index.html"
    index_content = read_main_content(index_path)
    section_title = read_title(index_content, index_path)
    index_content = TOC_PATTERN.sub("", index_content)
    index_content = link_md_files_to_github(index_content, index_path)

    # nav_order 0 is the home page, so sketch 00 is 1 and sketch 13 is 14.
    index_fields = [("title", section_title)]
    if is_game:
        index_fields.append(("parent", GAME_GROUP_TITLE))
    index_fields.append(("nav_order", section_number + 1))
    index_fields.append(("has_children", True))
    write_page(index_path, index_fields, index_content)

    sub_pages = sorted(path for path in folder.glob("*.html") if path.name != "index.html")
    for sub_page_path in sub_pages:
        content = read_main_content(sub_page_path)
        content = EYEBROW_PATTERN.sub("", content, count=1)
        content = link_md_files_to_github(content, sub_page_path)
        fields = [
            ("title", read_title(content, sub_page_path)),
            ("parent", section_title),
        ]
        if is_game:
            fields.append(("grand_parent", GAME_GROUP_TITLE))
        fields.append(("nav_order", leading_number(sub_page_path.name)))
        write_page(sub_page_path, fields, content)

    print(f"{folder.name}: converted index.html and {len(sub_pages)} sub-pages")


def write_page(page_path, fields, content):
    """Write front matter and content back to the page, with LF line endings."""
    page_text = build_front_matter(fields) + "\n" + content + "\n"
    page_path.write_text(page_text, encoding="utf-8", newline="\n")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    for folder_name in sys.argv[1:]:
        folder = (REPO_ROOT / folder_name).resolve()
        try:
            convert_folder(folder)
        except (ValueError, OSError) as error:
            print(f"Stopped: {error}")
            sys.exit(1)


if __name__ == "__main__":
    main()
