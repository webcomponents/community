---
title: A webcomponents.org update
authors: [sam_li]
date: 2017-03-23
original_date: 2017-03-23
image: introducing-the-element-registry.png
category: articles
---

<!-- Excerpt -->

## Polymer 2.0 support
Polymer 2.0 elements now support documentation generation in the same fashion Polymer 1.0 was supported.

## Custom pages
In addition to your README & automatically generated documentation pages, you can now specify custom pages. You can use custom pages to provide usage guides, contribution guides or documentation. Specify custom pages under the `pages` attribute  in your `bower.json`. These pages are markdown pages inside your repository and support inline demos like the README.md.

Sample change:
```json
{
  "pages": {
    "Contributing guide": "contributing.md",
    "Usage with Angular": "folder/page.md"
  }
}
```

## Specifying demo files
Not using Polymer and want full-sized demos? You can now specify a list of demos in your `bower.json` file. Just ensure all necessary dependencies are specified in your `bower.json`.

Sample change:
```json
{
  "demos": {
    "My simple demo": "path/simple-demo.html",
    "A complex demo": "my-complex-demo.html" 
  }
}
```

## ES2015 demo automatic transpilation
All demos, including inline demos are now automatically transpiled for browsers that don't support ES2015 syntax.

