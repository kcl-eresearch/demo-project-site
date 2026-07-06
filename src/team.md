---
layout: layouts/base.liquid
title: The Team
---

# The Team

Our research team brings together expertise in electron microscopy, materials science, and machine learning to advance the understanding of surface defects in engineering components.

<div class="team-grid">
{%- for member in team %}
  {%- include "components/team-card.liquid" %}
{%- endfor -%}
</div>
