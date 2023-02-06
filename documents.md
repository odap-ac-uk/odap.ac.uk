---
layout: page_wide
title: Documents
subtitle: Core ODAP documentation
opener: ""
permalink: /documents 
---


<ul>

{% assign manual_stem = '/manual/auto-generated/' %}
{% for file in site.static_files %}
    {% if file.path contains manual_stem %}
    	{% if file.path contains '.pdf' %}
			{% assign filename = file.path | replace: manual_stem, "" %}
			{% if filename contains '/' %}
    		{% else %}
        		<li><a href="{{ site.baseurl }}{{ file.path }}" alt="pdf">{{ filename }} </a></li>
    		{% endif %}
    	{% endif %}
    {% endif %}
{% endfor %}
</ul>



