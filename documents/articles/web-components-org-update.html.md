---
title: What's new on webcomponents.org
authors: [sam_li]
date: 2017-05-11
original_date: 2017-05-11
category: articles
---

A roundup of what's new in the web components world in the short few months since webcomponents.org has launched.
<!-- Excerpt -->

In the short few months since webcomponents.org has launched, we have seen:
 * more than 850 elements have been added
 * reached an incredible milestone of 1 million page views each month
 * a new web components library, [slim.js](https://github.com/eavichay/slim.js)
 * [Safari 10.1 and iOS Safari 10.3](http://caniuse.com/#feat=custom-elementsv1) shipped Custom Elements v1

## webcomponents.org changes

### Vanilla custom element support
Vanilla custom elements using v1 class syntax now supported by documentation generation.

### Polymer 2.0 support
Polymer 2.0 elements now supported by documentation generation in the same fashion Polymer 1.0 was supported.

### Custom pages
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

### Specifying demo files
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

### ES2015 (ES6) automatic transpilation
All demos, including inline demos are now automatically transpiled for browsers that don't support ES2015 syntax.
