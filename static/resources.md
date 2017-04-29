The WebComponents.org Resources section is a place to showcase useful tools and boilerplates to easily start hacking on your own custom elements.

# 1. Learn

Web Components is a set of specs that introduce powerful new capabilities to the web platform. Before getting started with your first custom element, it will be helpful to understand the scope of these new features. The [Introduction](/introduction) section contains an overview of these APIs. The [Community](/community) section is also a great way to catch up on the latest goings-on in the Web Components world. We’d also recommend starting out by reading the Getting Started sections of:
 * [Polymer's documentation;](https://www.polymer-project.org/)
 * [Slim.js's documentation.](http://slim.js.org/)
 * [X-Tag's documentation.](http://x-tag.github.io/docs)

These will give you an idea on how these libraries for building web components work and what might be best for you.

# 2. Create

Once you’ve learned about Web Components, it's time to create your own element! There are a number of different jumping-off points for getting started using a Web Component library, or just using the vanilla Web Component APIs directly:
 * [Polymer Boilerplate](https://github.com/webcomponents/polymer-boilerplate)
 * [X-Tag Boilerplate](https://github.com/webcomponents/xtag-boilerplate);
 * [VanillaJS Boilerplate.](https://github.com/webcomponents/element-boilerplate)

In these boilerplates, we solve the same problem using different libraries (Polymer/X-Tag) or no library at all (VanillaJS), with the same tools and directory structure.

We encourage a series of best practices like setting up a live demo, documenting your API, maintaining a changelog for release purposes, and sharing your component on Bower. The boilerplates form small, opinionated starter-kits with all you need included, from polyfills to automated tasks.

You’ll still need to make some manual changes after forking each boilerplate, like changing an element's name in different files. In order to automate this process, we created a [Yeoman](http://yeoman.io/) Generator and a [Slush](http://slushjs.github.io/#/) Generator that can scaffold a web component using the command-line:
 * [Element Generator for Yeoman.](https://github.com/webcomponents/generator-element)
 * [Element Generator for Slush.](https://github.com/webcomponents/slush-element)

The generators help ensure an even more seamless start, helping with tasks like validating your element's name according to W3C's spec rules and checking if there's a similarly-named project on Bower.

The Polymer Project also has a command-line tool to help automate the scaffolding of Polymer-based web components and applications:
 * [Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli)

# 3. Share

Now that you’ve finished your element it's time to share it with the world! The web component ecosystem is growing quickly, and there are thousands of other developers out there who may benefit from your work.

The best way to share a component is by making it available for use with one of the current JavaScript package managers. Currently most web component libraries have great support for [Bower](https://bower.io/), and are working on improving support for [npm](https://www.npmjs.com/).

And make sure to publish your element to webcomponents.org! Check out the [Publish page](https://beta.webcomponents.org/publish) to learn how to publish your element.

