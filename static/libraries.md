# Why use a web component library?

Web Components can be hard to write from scratch. There’s a lot to think about, and writing a component can require a lot of boilerplate code. Fortunately, there are some great libraries that can make creating custom elements more straightforward, and save you a lot of time and effort.

It’s important to note that you don’t need to use a library to build and share a custom element! Raw custom elements are great if your task is limited to one or a few elements, allowing a more streamlined implementation and preventing library lock-in.

However, if you’re writing lots and lots of custom elements, using a library can make your code simpler and cleaner, and your workflow more efficient.


# What should you look for in a web component library?

When choosing a web component library, make sure it has a large enough featureset to cover all of your use cases. Interoperability is also important - does the library leak implementation details? A good web component library should produce a web component that “just works” like any other HTML element. Good libraries also have a high value-to-payload ratio - that is, they provide a lot of value for their download size. Libraries which support ES modules, Custom Element, Shadow DOM and Template are listed below.

# Some web component libraries

This list has been compiled by the community and can be modified [via pull request under the community repository](https://github.com/webcomponents/community/edit/master/static/libraries.md) for this website. Projects are listed alphabetically and are known to support all four aspects of the web components specification.

* [FAST](https://fast.design) is a web component library built by Microsoft, which offers several packages to leverage depending on your project needs. [Fast Element](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-element) is a lightweight means to easily build performant, memory-efficient, standards-compliant Web Components. [Fast Foundation](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-foundation) is a library of Web Component classes, templates, and other utilities built on fast-element intended to be composed into registered Web Components.

 * [Hybrids](https://github.com/hybridsjs/hybrids) is a UI library for creating web components with simple and functional API. The library uses plain objects and pure functions for defining custom elements, which allow very flexible composition. It provides built-in cache mechanism, template engine based on tagged template literals, and integration with developer tools. 

 * [LitElement](https://github.com/Polymer/lit-element) uses [lit-html](https://github.com/Polymer/lit-html) to render into the element's Shadow DOM and adds API to help manage element properties and attributes. LitElement reacts to changes in properties and renders declaratively using lit-html.
 
 * [Polymer](https://www.polymer-project.org/) is a web component library built by Google, with a simple element creation API. Polymer offers one- and two-way data binding into element templates, and provides shims for better cross-browser performance.
 
 * [ShadowQuery](https://github.com/schrotie/shadow-query) is a non-intrusive micro-library that makes writing high performance vanilla web components straightforward, simple, and concise without compromising your template syntax or your control over any implementation detail.

 * [Skate.js](https://skatejs.gitbooks.io/skatejs/content/) is a library built on top of the W3C web component specs that enables you to write functional and performant web components with a very small footprint. Skate is inherently cross-framework compatible. For example, it works seamlessly with - and complements - React and other frameworks.
 
 * [Slim.js](http://slimjs.com) Slim.js is a lightweight web component library that provides extended capabilities for components, such as data binding, using es6 native class inheritance. This library is focused for providing the developer the ability to write robust and native web components without the hassle of dependencies and an overhead of a framework.
 
 * [Stencil](https://stenciljs.com/) is an opensource compiler that generates standards-compliant web components.
