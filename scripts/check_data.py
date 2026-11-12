"""Checks the reality data files and their Wikipedia poster sources.

Usage (from the project root):
    python scripts/check_data.py            # structure checks + poster lookups
    python scripts/check_data.py --offline  # structure checks only

Structure checks: unique ids, required fields, valid dates/phases, and that the
`chrono` list contains exactly the same ids as `titles`.
Poster check: each `wiki` article must resolve (via the Wikipedia REST summary
API) to a page that has an image.
"""
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "js" / "data"
REQUIRED = ("id", "title", "format", "released", "wiki", "summary")
API = "https://en.wikipedia.org/api/rest_v1/page/summary/"
# Posters used as page art (lobby covers) that are not titles in a data file yet.
EXTRA_ART = ["Spider-Man:_Into_the_Spider-Verse", "X-Men:_Days_of_Future_Past", "Blade_(1998_film)"]
POSTERS_FILE = ROOT / "js" / "posters.js"


def extract(source, field):
    """Pull simple string/bool/number fields out of the JS object literals."""
    match = re.search(rf'\b{field}:\s*("(?:[^"\\]|\\.)*"|true|false|\d+)', source)
    if not match:
        return None
    raw = match.group(1)
    return json.loads(raw) if raw.startswith('"') else raw


def parse_reality(path):
    text = path.read_text(encoding="utf-8")
    titles_block = text.split("titles: [", 1)[1].split("\n  ],", 1)[0]
    entries = ["{ id:" + chunk for chunk in titles_block.split("{ id:")[1:]]
    titles = [{f: extract(e, f) for f in REQUIRED + ("phase",)} for e in entries]
    chrono = []
    if "chrono: [" in text:
        chrono = re.findall(r'"([a-z0-9-]+)"', text.split("chrono: [", 1)[1].split("]", 1)[0])
    return titles, chrono


def check_structure(name, titles, chrono):
    problems = []
    ids = [t["id"] for t in titles]
    for dup in {i for i in ids if ids.count(i) > 1}:
        problems.append(f"duplicate id: {dup}")
    for t in titles:
        for field in REQUIRED:
            if not t.get(field):
                problems.append(f"{t.get('id')}: missing {field}")
        if t.get("released") and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", t["released"]):
            problems.append(f"{t['id']}: bad date {t['released']}")
    if chrono:
        missing = set(ids) - set(chrono)
        extra = set(chrono) - set(ids)
        if missing:
            problems.append(f"chrono is missing: {sorted(missing)}")
        if extra:
            problems.append(f"chrono has unknown ids: {sorted(extra)}")
    print(f"[{name}] {len(titles)} titles, {len(chrono)} in story order, {len(problems)} structure problem(s)")
    for p in problems:
        print("   -", p)
    return problems


def fetch_summary(wiki, attempts=5):
    """Fetch a page summary, backing off politely when rate-limited (HTTP 429)."""
    url = API + urllib.parse.quote(wiki, safe="")
    req = urllib.request.Request(url, headers={"User-Agent": "marvel-archive-data-check/1.0"})
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=20) as res:
                return json.load(res)
        except urllib.error.HTTPError as err:
            if err.code == 429 and attempt < attempts - 1:
                time.sleep(int(err.headers.get("Retry-After") or 0) or 5 * (attempt + 1))
                continue
            raise


def check_cross_reality(files):
    """Ids must be unique across every reality, and every `refs` entry must point at a real title."""
    problems = []
    all_ids = [t["id"] for titles, _ in files.values() for t in titles]
    for dup in sorted({i for i in all_ids if all_ids.count(i) > 1}):
        problems.append(f"id used in more than one reality: {dup}")
    for path in files:
        text = path.read_text(encoding="utf-8")
        if "refs: [" in text:
            block = text.split("refs: [", 1)[1].split("]", 1)[0]
            for ref in re.findall(r'id: "([a-z0-9-]+)"', block):
                if ref not in all_ids:
                    problems.append(f"{path.stem}: ref to unknown title {ref}")
    print(f"[all] {len(all_ids)} titles across {len(files)} realities, {len(problems)} cross-reality problem(s)")
    for p in problems:
        print("   -", p)
    return problems


def check_posters(name, titles, posters):
    """Resolve each title's poster URL into `posters` (wiki name -> image URL)."""
    failures = []
    for t in titles:
        wiki = t["wiki"]
        if wiki in posters:
            continue
        try:
            data = fetch_summary(wiki)
            image = data.get("originalimage") or data.get("thumbnail")
            if image:
                posters[wiki] = image["source"]
            else:
                failures.append(f"{t['id']}: '{wiki}' has no image")
        except urllib.error.HTTPError as err:
            failures.append(f"{t['id']}: '{wiki}' -> HTTP {err.code}")
        except Exception as err:  # network problems
            failures.append(f"{t['id']}: '{wiki}' -> {err}")
        time.sleep(1)  # stay well under the API rate limit
    print(f"[{name}] posters: {len(titles) - len(failures)}/{len(titles)} OK")
    for f in failures:
        print("   -", f)
    return failures


def load_existing_posters():
    """Reuse URLs already resolved in a previous run, so reruns only look up new titles."""
    if not POSTERS_FILE.exists():
        return {}
    text = POSTERS_FILE.read_text(encoding="utf-8")
    return json.loads(text.split("=", 1)[1].strip().rstrip(";"))


def write_posters(posters):
    out = POSTERS_FILE
    body = json.dumps(dict(sorted(posters.items())), indent=2, ensure_ascii=False)
    out.write_text(
        "/* Generated by scripts/check_data.py. Do not edit by hand.\n"
        "   Maps Wikipedia article names to poster image URLs, so visitors' browsers\n"
        "   load images directly instead of calling the Wikipedia API. */\n"
        f"window.ARCHIVE_POSTERS = {body};\n",
        encoding="utf-8",
    )
    print(f"wrote {out.relative_to(ROOT)} ({len(posters)} posters)")


def main():
    offline = "--offline" in sys.argv
    total = 0
    posters = load_existing_posters()
    files = {path: parse_reality(path) for path in sorted(DATA_DIR.glob("*.js"))}
    total += len(check_cross_reality(files))
    for path, (titles, chrono) in files.items():
        total += len(check_structure(path.stem, titles, chrono))
        if not offline:
            total += len(check_posters(path.stem, titles, posters))
    if not offline:
        art = [{"id": "page-art", "wiki": w} for w in EXTRA_ART]
        total += len(check_posters("page-art", art, posters))
        write_posters(posters)
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
