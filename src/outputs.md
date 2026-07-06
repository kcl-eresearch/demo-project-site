---
layout: layouts/base.liquid
title: Outputs
---

# Research outputs

Our project produces a range of research outputs including peer-reviewed publications, datasets, and software tools. Below you will find our outputs grouped by type, each linking to the full resource.

{% include "components/output-list.liquid" %}

{% assign industry = outputs | where: "type", "industry" %}
<section class="output-group">
  <h2>Industry outputs</h2>
  {%- if industry.size %}
  <ul class="output-list">
    {%- for item in industry %}
    <li>
      <p class="output-list__title"><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></p>
      {%- if item.authors %}<p class="output-list__meta">{{ item.authors }}{% if item.year %} ({{ item.year }}){% endif %}</p>{%- endif %}
      <p class="output-list__description">{{ item.description }}</p>
    </li>
    {%- endfor %}
  </ul>
  {%- else %}
  <p class="output-empty">No industry outputs listed yet.</p>
  {%- endif %}
</section>
