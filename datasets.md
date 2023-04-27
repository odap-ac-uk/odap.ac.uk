---
layout: page_wide
title: 'Datasets'
subtitle: Available data
opener: The overlapping datasets available within the ODAP are shown here
permalink: /datasets 
---

<h3>Data availability and linkage within ODAP</h3>
<p>The network diagram below shows the data available within ODAP, divided between the National Safe Haven and the Flexible Compute Space. All sizes are relative, using an inverse exponential scale to aid visibility of smaller datasets. Nodes are proprotionally sized by area based on the number of subjects in each dataset; edges are sized by width based on the number of subjects common to a pair of datasets.</p>
<p>Common groupings of data are shown as containers, with individual <em>atomic datasets</em> shown as circles. Clicking on a container will expand the datasets within the container; clicking on a dataset will highlight it in and expand the label, showing the number of subjects within that dataset.</p>
<p>Where subjects are present in more than one dataset, an edge is shown in the diagram indicating the datasets between which subjects are shared. <strong>Please note that linkage of datasets is subject to data access procedures: the presence of an overlap of data does not imply inherent permission to link those datasets</strong>.</p>
{% include networks/fcs_network.html %}
