---
layout: page
title: Left-out parts 
permalink: /blog/
---
**Find me elsewhere:**
[GoodReads](https://goodreads.com/aaquiles) 🧐 

What a restless mind gathers at odd hours _on research_, on tools, on ideas that refuse to sleep, set down here, and now, shared with you.


<ul class="index-list index-list--thumbs">
{% for post in site.posts %}
<li class="index-list__item">
<a href="{{ post.url | relative_url }}">
{% if post.header_image %}
<img class="index-list__thumb" src="{{ post.header_image | relative_url }}" alt="">
{% endif %}
<span class="index-list__body">
<span class="index-list__date">{{ post.date | date: "%b %-d, %Y" }}</span>
<span class="index-list__title">{{ post.title }}</span>
{% if post.excerpt %}<span class="index-list__excerpt">{{ post.excerpt | strip_html | truncatewords: 24 }}</span>{% endif %}
</span>
</a>
</li>
{% endfor %}
</ul>
