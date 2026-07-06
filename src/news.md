---
layout: layouts/base.liquid
title: News
---

# News and updates

Keep up to date with the latest developments in the research project, including new publications, partnerships, and events.

{% for item in news reversed %}
  {% include "components/news-list.liquid" %}
{% endfor %}
