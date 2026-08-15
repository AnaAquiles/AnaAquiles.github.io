---
layout: page
title: Papers
permalink: /papers/
---

Also see my [Google Scholar profile](https://scholar.google.com/citations?user=XXXXXXX) for the full, up-to-date list.

<ul class="pub-list">
{% for pub in site.data.publications %}
<li class="pub-item">
<div class="pub-item__title">{{ pub.title }}</div>
<div class="pub-item__meta">{{ pub.authors }} — {{ pub.venue }}</div>
{% if pub.abstract %}<div class="pub-item__abstract">{{ pub.abstract }}</div>{% endif %}
<div class="pub-item__links">
{% if pub.link and pub.link != "" %}<a href="{{ pub.link }}">Link</a>{% endif %}
{% if pub.pdf and pub.pdf != "" %}<a href="{{ pub.pdf }}">PDF</a>{% endif %}
</div>
</li>
{% endfor %}
</ul>
