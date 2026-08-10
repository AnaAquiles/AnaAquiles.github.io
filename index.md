---
layout: home
title: Home
---

## Hi, 



- 📄 [CV](/cv/)
- 📚 [Publications](/papers/)
- ✍️ [Blog](/blog/)
- ✉️ [Contact](/contact/)

**Find me elsewhere:**
[GitHub](https://github.com/yourusername) ·
[LinkedIn](https://linkedin.com/in/yourusername) ·
[Google Scholar](https://scholar.google.com/citations?user=XXXXXXX) ·
[ORCID](https://orcid.org/0000-0000-0000-0000) ·
[ResearchGate](https://www.researchgate.net/profile/yourprofile) ·
[Twitter/X](https://twitter.com/yourhandle)

---

### Latest posts
{% for post in site.posts limit:3 %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%b %-d, %Y" }}
{% endfor %}

[See all posts →](/blog/)
