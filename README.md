# My Academic / Professional Site

Built with Jekyll, hosted for free on GitHub Pages.

## Structure
- `index.md` — homepage / about
- `cv.md` — CV page (put your CV PDF in `assets/cv.pdf`)
- `papers.md` + `_data/publications.yml` — publications list (edit the YAML, not the page)
- `blog.md` + `_posts/` — blog index and posts (add new posts as `_posts/YYYY-MM-DD-title.md`)
- `contact.md` — contact info
- `_config.yml` — site title, nav, theme settings
- `assets/css/style.scss` — small style overrides on top of the `minima` theme

## Writing a new blog post
Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "Your Title"
date: 2026-08-10
tags: [research, notes]
---

Your content here, in Markdown.
```

## Local preview (optional)
GitHub builds the site for you automatically on push — you don't need this.
But if you want to preview locally before pushing:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## Deploying
Push to GitHub, then in the repo: **Settings → Pages → Source → Deploy from branch → main → / (root)**.
Your site will be live at `https://yourusername.github.io` (if the repo is named `yourusername.github.io`)
or `https://yourusername.github.io/repo-name` otherwise (in that case set `baseurl: "/repo-name"` in `_config.yml`).
# AnaAquiles.github.io
