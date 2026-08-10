---
layout: page
title: Papers
permalink: /papers/
---

Also see my [Google Scholar profile](https://scholar.google.com/citations?user=XXXXXXX) for the full, up-to-date list.

<ul style="list-style:none; padding-left:0;" markdown="1">
{% for pub in site.data.publications %}
  <li style="margin-bottom: 1.5em;" markdown="1">
    <strong>{{ pub.title }}</strong><br>
    {{ pub.authors }}<br>
    <em>{{ pub.venue }}</em><br>
    {% if pub.link and pub.link != "" %}[Link]({{ pub.link }}){% endif %}
    {% if pub.pdf and pub.pdf != "" %} · [PDF]({{ pub.pdf }}){% endif %}
    <br>
    <small>{{ pub.abstract }}</small>
  </li>
{% endfor %}
</ul>
