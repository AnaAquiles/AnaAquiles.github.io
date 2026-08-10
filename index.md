---
layout: home
title: Home
---

## Hello there,

Beyond the titles a CV likes to collect, this is where the rest of me lives, the part that first fell for science not for the credentials, but for the wonder of it. The questions that keep me up. The strange, stubborn curiosity that still, after everything, is the fuel!

Here you'll find both halves of that: the academic — 📚 [Publications](/papers/), projects, the record of what I've built and studied (📄 [CV](/cv/)) — and the wandering one, where I write essays on science, philosophy, and whatever else refuses to stay in its lane, comming soon: [Blog](/blog/). Written whenever time allows itself to be caught.

Have a look around. And if something here sparks a thought worth sharing, don't hesitate to reach out.

*Cheers,*
*Ana*

**Find me elsewhere:**
[GitHub](https://github.com/AnaAquiles) ·
[LinkedIn](https://linkedin.com/in/aaquiles) · I don't use it a lot (shame of me)
[Google Scholar](https://scholar.google.com/citations?user=Mis-1eAAAAAJ&hl=en) ·
[ORCID](https://orcid.org/0000-0001-8475-0308) ·
[ResearchGate](https://www.researchgate.net/profile/Ana-Aquiles?ev=hdr_xprf) ·
[Twitter/X](https://twitter.com/mexaquiless) ·
[GoodReads](goodreads.com/aaquiles) 🧐

---

### Latest posts
{% for post in site.posts limit:3 %}
- **[{{ post.title }}]({{ post.url | relative_url }})** — {{ post.date | date: "%b %-d, %Y" }}
{% endfor %}

[See all posts →](/blog/)
