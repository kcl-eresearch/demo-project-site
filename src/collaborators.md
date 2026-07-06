---
layout: layouts/base.liquid
title: Collaborators
---

# Collaborators and partners

The project is strengthened by partnerships with industry, research organisations, and academic institutions. Each collaborator brings complementary expertise and facilities to our research programme.

<div class="collaborator-grid">
{%- for collaborator in collaborators %}
  {%- include "components/collaborator-card.liquid" %}
{%- endfor -%}
</div>

## Collaborate with us

If your organisation is interested in partnering with the group, please visit our [Work with Us](/work-with-us/) page for details of the services we offer.
