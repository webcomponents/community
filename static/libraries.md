# Why use a web component library?

Web Components can be hard to write from scratch. There’s a lot to think about, and writing a component can require a lot of boilerplate code. Fortunately, there are some great libraries that can make creating custom elements more straightforward, and save you a lot of time and effort.

It’s important to note that you don’t need to use a library to build and share a custom element! Raw custom elements are great if your task is limited to one or a few elements, allowing a more streamlined implementation and preventing library lock-in.

However, if you’re writing lots and lots of custom elements, using a library can make your code simpler and cleaner, and your workflow more efficient.


# What should you look for in a web component library?

When choosing a web component library, make sure it has a large enough featureset to cover all of your use cases. Interoperability is also important - does the library leak implementation details? A good web component library should produce a web component that “just works” like any other HTML element. You should also be aware of browser compatibility, and any polyfills that will be needed to support features you use or the library uses. Good libraries also have a high value-to-payload ratio - that is, they provide a lot of value for their download size.


# Existing web component libraries

 * [Polymer](https://www.polymer-project.org/) is a web component library built by Google, with a simple element creation API. Polymer offers one- and two-way data binding into element templates, and provides shims for better cross-browser performance.

 * [Skate.js](http://skate.js.org/) is a library built on top of the W3C web component specs that enables you to write functional and performant web components with a very small footprint. Skate is Inherently cross-framework compatible. For example, it works seamlessly with - and complements - React and other frameworks.

 * [X-Tag](http://x-tag.github.io/) is a Microsoft supported, open source, JavaScript library that wraps the W3C standard Web Components family of APIs to provide a compact, feature-rich interface for rapid component development. While X-Tag offers feature hooks for all Web Component APIs (Custom Elements, Shadow DOM, Templates, and HTML Imports), it only requires Custom Element support to operate. In the absence of native Custom Element support, X-Tag uses a set of polyfills shared with Google's Polymer framework.
