"""Check that every link in the built site leads somewhere.

Build the site first, then run this from the repo root:
    bundle exec jekyll build
    python tools/check_links.py

Add --external to also check links to other websites (slower, needs internet):
    python tools/check_links.py --external

The script prints each broken link with the page it is on, and exits with
code 1 if any are broken, so the GitHub Action can mark the commit as failed.
Links inside <pre> code examples are skipped: they are example code, not links.
"""

import argparse
import html
import posixpath
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

LINK_PATTERN = re.compile(r'(?:href|src)="([^"]*)"')
CODE_BLOCK_PATTERN = re.compile(r"<pre.*?</pre>", re.DOTALL)
SKIPPED_PREFIXES = ("mailto:", "data:", "javascript:", "#")


def find_links(page_path):
    """Return every href and src value on a page, ignoring code examples."""
    text = page_path.read_text(encoding="utf-8")
    text = CODE_BLOCK_PATTERN.sub("", text)
    links = []
    for raw_link in LINK_PATTERN.findall(text):
        link = html.unescape(raw_link).split("#")[0].split("?")[0]
        if link and not link.startswith(SKIPPED_PREFIXES):
            links.append(link)
    return links


def internal_target(site_folder, page_path, link, baseurl):
    """Return the file in the built site that a link points to, or None if it is external."""
    if link.startswith(("http:", "https:", "//")):
        return None

    if link.startswith("/"):
        if not link.startswith(baseurl + "/"):
            # A link to the server root would skip the repo name and break on GitHub Pages.
            return site_folder / "__outside_baseurl__" / link.lstrip("/")
        path_in_site = link[len(baseurl) + 1:]
    else:
        page_folder = page_path.parent.relative_to(site_folder).as_posix()
        path_in_site = posixpath.normpath(posixpath.join(page_folder, link))

    target = site_folder / path_in_site
    if link.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target


def external_link_works(url):
    """Return True if a web address answers with a success code."""
    request = urllib.request.Request(url, headers={"User-Agent": "link-checker"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return response.status < 400
    except (urllib.error.URLError, TimeoutError, ValueError):
        return False


def main():
    parser = argparse.ArgumentParser(description="Check links in the built site.")
    parser.add_argument("--site", default="_site", help="folder of the built site (default: _site)")
    parser.add_argument("--baseurl", default="/intro-to-programming", help="baseurl from _config.yml")
    parser.add_argument("--external", action="store_true", help="also check links to other websites")
    options = parser.parse_args()

    site_folder = Path(options.site)
    if not site_folder.is_dir():
        print(f"No folder '{site_folder}'. Build the site first: bundle exec jekyll build")
        sys.exit(1)

    pages = sorted(site_folder.rglob("*.html"))
    broken_links = []
    external_links = {}
    internal_count = 0

    for page_path in pages:
        for link in find_links(page_path):
            target = internal_target(site_folder, page_path, link, options.baseurl)
            if target is None:
                external_links.setdefault(link, page_path)
                continue
            internal_count += 1
            if not target.exists():
                broken_links.append((page_path, link))

    print(f"Checked {internal_count} links inside the site on {len(pages)} pages.")

    if options.external:
        # The site's own address only works once it is published, so skip it.
        own_site = "https://john-dempsey.github.io" + options.baseurl
        to_check = {url: page for url, page in external_links.items() if not url.startswith(own_site)}
        print(f"Checking {len(to_check)} links to other websites...")
        for url, page_path in sorted(to_check.items()):
            if not external_link_works(url):
                broken_links.append((page_path, url))

    if broken_links:
        print(f"\n{len(broken_links)} broken link(s):")
        for page_path, link in broken_links:
            print(f"  {page_path.relative_to(site_folder).as_posix()}: {link}")
        sys.exit(1)

    print("No broken links.")


if __name__ == "__main__":
    main()
