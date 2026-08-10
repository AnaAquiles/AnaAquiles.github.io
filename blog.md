---
layout: page
title: Blog
permalink: /blog/
---

What a restless mind gathers at odd hours _on research_, on tools, on ideas that refuse to sleep, set down here, and now, shared with you.
COMMING SOON !!

<ul style="list-style:none; padding-left:0;" markdown="1">
{% for post in site.posts %}
<li style="margin-bottom: 1.2em;" markdown="1">
**[{{ post.title }}]({{ post.url | relative_url }})**
<br><small>{{ post.date | date: "%B %-d, %Y" }}{% if post.tags %} · {{ post.tags | join: ", " }}{% endif %}</small>
{% if post.excerpt %}<br>{{ post.excerpt | strip_html | truncatewords: 30 }}{% endif %}
</li>
{% endfor %}
</ul>
