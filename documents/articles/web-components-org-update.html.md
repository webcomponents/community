---
title: A webcomponents.org update
authors: [sam_li]
date: 2017-03-23
original_date: 2017-03-23
image: introducing-the-element-registry.png
category: articles
---

<!-- Excerpt -->

## Specifying demo files
Not using Polymer and want full-sized demos? You can now specify a list of demos in your `bower.json` file. Just ensure all necessary dependencies are specified in your `bower.json`.

Sample change:
```json
{
  ...
  "demos": {
    "My simple demo": "path/simple-demo.html",
    "A complex demo": "my-complex-demo.html" 
  },
  ...
}
```
