Some browsers are still in the process of updating to support the standards for Web Components. In the mean time, polyfills simulate the missing browser capabilities as closely as possible.

You can feature-detect for the necessary browser features before loading the polyfills. This means that as more and more browsers implement the Web Components standards, the payload to run your apps and elements will decrease. 

The polyfills are available on GitHub: https://github.com/WebComponents/webcomponentsjs 

To install the polyfills, run this command:
```
bower install --save webcomponents/webcomponentsjs
```

To feature detect:
```js
(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();
```

# Shadow DOM polyfill
The shadow DOM polyfill provides shadow DOM v0 functionality in browsers that don't support it natively. See the Compatibility table for more information.

The shadow DOM polyfill, though very powerful, is also fairly intrusive and can add significant performance overhead. For this reason, many Web Components-based libraries like Polymer work around having to use this polyfill, and provide a lighter-weight alternative. These libraries don’t require loading the full Web Components polyfill, but instead use a “lite” version of the polyfill with shadow DOM removed:

```
webcomponents/webcomponents-lite.min.js
```

## Wrappers
The polyfill is implemented using wrappers. A wrapper wraps the native DOM node in a wrapper node. The wrapper node looks and behaves identically to the native node (minus bugs and known limitations). For example:

```js
var div = document.createElement('div');
div.innerHTML = '<b>Hello world</b>';
assert(div.firstChild instanceof HTMLElement);
```

But `div` is actually a wrapper of the element that the browser normally gives you. This wrapper just happens to have the same interface as the browser provided element.

It has an `innerHTML` setter that works just like the native `innerHTML` but instead of working on the composed tree it works on the local DOM. When you change the logical DOM tree like this it might cause the composed tree to need to be re-rendered. This does not happen immediately, but it is scheduled to happen later as needed.

The wrapper node also has a `firstChild` getter which once again works on the logical DOM.
`instanceof` still works because we have replaced the global `HTMLElementconstructor` with our custom one.

### More Logical DOM
The `wrappers.Node` object keeps track of the logical (light as well as shadow, but not composed) DOM. Internally it has has the 5 fundamental Node pointers: `parentNode`, `firstChild`, `lastChild`, `nextSibling` and `previousSibling`. When the DOM tree is manipulated, these pointers are updated to always represent the logical tree. When the shadow DOM renderer needs to render the visual tree, these internal pointers are updated as needed.

### Wrap all the objects!
The intent is to wrap all the DOM objects that interact with the DOM tree. For this polyfill to be completely transparent we need to wrap a lot of APIs. Any method, accessor or constructor that takes or returns a Node or an object that indirectly touches a node needs to be wrapped. As you can imagine there are a lot of these. At the moment we have done the most common ones but there are sure to be missing ones as soon as you try to use this with your code.

## Wrap and Unwrap
There are bound to be cases where we haven't done the wrapping for you. In those cases you can use wrap to create a wrapper of a native object, or `unwrap` to get the underlying native object from a wrapper. These two functions are available on the `ShadowDOMPolyfill` object. For example:
```js
wrap(document.body)
// or get body of the wrapped document
wrap(document).body

unwrap(div).firstChild instanceof HTMLElement
```

If you plan to work with elements that need to be wrapped over and over, try passing a wrapped version of the element into an immediately-invoked function expression.
```js
(function(document) {
  // Now a library like jQuery can add
  // listeners to the wrapped document
  $(document).on('click', function(e) {
    console.log('Clicked on', e.target);
  });
})(wrap(document));
```

## Event Retargeting
An important aspect of the shadow DOM is that events are retargeted to never expose the shadow DOM to the light DOM. For example:
```
var div = document.createElement('div');
div.innerHTML = 'Click me';
var shadow = div.createShadowRoot();
shadow.innerHTML = '<b><content></content></b>';
```

If the user clicks on the div the real target of the click event is the `<b>` element. But that element is not visible in the light DOM so the target is therefore retargeted to the div element itself. However, if there is an event listener on the `<content>`, `<b>` or the shadow root, the target should be visible to the event listener.

Similar issues occur with `relatedTarget` in `mouseover` and `mouseoutevents`.

To support this kind of behavior the event dispatching in the browser has to be reimplemented by the polyfill.

## Known limitations
 * CSS encapsulation is limited.
 * `Object.prototype.toString` does not return the same string as for native objects.
 * No live `NodeLists`. All node lists are snapshotted upon read.
 * `document`, window`, document.body`, document.head` and others are non configurable and cannot be overridden. We are trying to make these work as seamlessly as possible but there will doubtlessly be cases where there will be problems; for those cases you can use wrapand unwrap to get unblocked.
 * Cross window/frame access is not implemented.
 * CSS `:host()` rules can only have (at most) one level of nested parentheses in their argument selectors. For example, `:host(.zot)` and `:host(.zot:not(.bar)` both work, but `:host(.zot:not(.bar:nth-child(2)))` does not.

# Custom Elements polyfill
The Custom Elements polyfill provides support for v0 of the Custom Elements spec. A polyfill for v1 is in progress at https://github.com/webcomponents/custom-elements. 

Custom elements polyfill handles element upgrades asynchronously. The polyfill defers upgrading elements until DOMContentsLoaded time. It does this as a performance optimization. Subsequent to the initial upgrade pass, Mutation Observers are used to discover new elements.

To know when the polyfill has finished all of its start up tasks, listen to the `WebComponentsReady` event on document or window. For example:

```html
<script>
  // hide body to prevent FOUC
  document.body.style.opacity = 0;
  window.addEventListener('WebComponentsReady', function() {
    // show body now that everything is ready
    document.body.style.opacity = 1;
  });
</script>
```

The Custom Elements specification is still under discussion. The polyfill implements certain features in advance of the specification. In particular, the lifecycle callback methods that get called if implemented on the element prototype:

 * `createdCallback()` is called when a custom element is created.
 * `attachedCallback()` is called when a custom element is inserted into a DOM subtree.
 * `detachedCallback()` is called when a custom element is removed from a DOM subtree.
 * `attributeChangedCallback(attributeName)` is called when a custom element's attribute value has changed

`createdCallback` is invoked synchronously with element instantiation, the other callbacks are called asynchronously. The asynchronous callbacks generally use the `MutationObserver` timing model, which means they are called before layouts, paints, or other triggered events, so the developer need not worry about flashing content or other bad things happening before the callback has a chance to react to changes.

# HTML Imports Polyfill

In imported documents, `href` and `src` attributes in HTML, and `urlproperties` in CSS files, are relative to the location of the imported document, not the main document.

The HTML Imports polyfill begins processing link tags when the `DOMContentLoaded` event fires. To know when loading is complete, listen for the `HTMLImportsLoaded` event on document or window. For example:

```html
<script>
window.addEventListener('HTMLImportsLoaded', function(e) {
  // all imports loaded
});
</script>
```

The polyfill loads linked stylesheets, external scripts, and nested HTML imports, but does not parse any data in the loaded resources. For parsing imports, combine HTML Imports with Custom Elements. As long as the HTML Imports is loaded first, the Custom Elements polyfill will detect it, and process all imports when `HTMLImportsLoaded` event fires.

## The WebComponentsReady event

Under native imports, `<script>` tags in the main document block the loading of imports. This is to ensure the imports have loaded and any registered elements in them have been upgraded. 

This native behavior is difficult to polyfill so the HTML Imports polyfill doesn't try. Instead the `WebComponentsReady` event is a stand in for this behavior:

```html
<script>
  window.addEventListener('WebComponentsReady', function(e) {
    // imports are loaded and elements have been registered
  });
</script>
```

In native HTML Imports, `document.currentScript.ownerDocument` references the import document itself. In the polyfill, use `document._currentScript.ownerDocument` (note the underscore).
