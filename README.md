# jFullPageScroller – A full-featured full page scroller plugin for jQuery.

jFullPageScroller is a full-featured full page scroller plugin for jQuery. This plugin converts sections of an ordinary web page into a full page with scrolling animation.

## Features
- Customizable animation delay.
- Customizable animation speed.
- Navigate in a section in different ways: "Mouse Scroll" or "Key Press".
- Works with or without navigation menu.
- Can add different callback scripts for every section being navigated.
- More features to be implemented and improved to provide you with better functionality.

## License
This software is distributed under the [MIT](https://opensource.org/licenses/MIT) license. Please read [LICENSE](https://github.com/kevinkarl22/jFullPageScroller/blob/main/LICENSE) for information on the software availability and distribution.

## Installation
You can [download jFullPageScroller as a zip file](https://github.com/kevinkarl22/jFullPageScroller/archive/main.zip), then copy the contents of the jFullPageScroller folder into your web application's folder:

In your `<head>` tag, add the following:
```html
<link href="/dist/jFullPageScroller.min.css" rel="stylesheet">
```

In your `<body>` tag, add the following:
```html
<script src="/dist/jFullPageScroller.min.js"></script>
```

Note: You need to change the `dist` folder path depending on where you have placed the jFullPageScroller plugin.

## Usage

You must add the `jfps-section` attribute in a div or section tag or whatever html container tag you preferred, then also add `jfps-section-id=1` attribute on the same tag where you added the `jfps-section` attribute. This will be it's identifier.

You can add as many as section as you want as long as you change the value of the `jfps-section-id` attribute. You can set any value of the `jfps-section-id` attribute, a number or a name, as long as it has the same value in the navigation menu, if navigation menu is enabled.

Don't forget to add `jfps-section-direction` attribute to the parent container of the `jfps-section` attribute containers. You have two options: `vertical` or `horizontal`. Change this value if you want a vertical or horizontal scrolling animation.

For example:
```html
<!-- Vertical Scrolling -->
<main jfps-section-direction="vertical" id="demo-content">
  <section jfps-section jfps-section-id="section-1" style="background-color: cyan;">
    <div>
      <h1>jFullPageScroller</h1>
      <p>By Kevin Karl Leaño</p>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-2" style="background-color: lightgreen;">
    <div>
      <h1>Section #2</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-3" style="background-color: orange;">
    <div>
      <h1>Section #3</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-4" style="background-color: maroon;">
    <div>
      <h1>Section #4</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-5" style="background-color: gray;">
    <div>
      <h1>Section #5</h1>
    </div>
  </section>
</main>


<!-- Horizontal Scrolling -->
<main jfps-section-direction="horizontal" id="demo-content">
  <section jfps-section jfps-section-id="section-1" style="background-color: cyan;">
    <div>
      <h1>jFullPageScroller</h1>
      <p>By Kevin Karl Leaño</p>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-2" style="background-color: lightgreen;">
    <div>
      <h1>Section #2</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-3" style="background-color: orange;">
    <div>
      <h1>Section #3</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-4" style="background-color: maroon;">
    <div>
      <h1>Section #4</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-5" style="background-color: gray;">
    <div>
      <h1>Section #5</h1>
    </div>
  </section>
</main>
```

Then to initialize, add the following script:

```javascript
// Default settings.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: false,
});
```

```javascript
// Default settings with callback actions.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: false,
}, function() {
  // Section #1 Callback
}, function() {
  // Section #2 Callback
});
```

The code above will activate the jFullPageScroller without a navigation menu needed.

Now, if you need a navigation menu, you must create a html navigation menu then add the following attributes on each navigation, `jfps-nav` and `jfps-target-section=1` attributes. The value of `jfps-target-section` attribute must be the same with the `jfps-section-id` attribute. Also, your navigation menu must have the same count as the number of your section.

For example:
```html
<nav>
  <a jfps-nav jfps-target-section="section-1" href="#section-1">Section #1</a>
  <a jfps-nav jfps-target-section="section-2" href="#section-2">Section #2</a>
  <a jfps-nav jfps-target-section="section-3" href="#section-3">Section #3</a>
  <a jfps-nav jfps-target-section="section-4" href="#section-4">Section #4</a>
  <a jfps-nav jfps-target-section="section-5" href="#section-5">Section #5</a>
</nav>
```

Then use this script instead:

```javascript
// Default settings.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: true,
});
```

```javascript
// Default settings with callback actions.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: true,
}, function() {
  // Section #1 Callback
}, function() {
  // Section #2 Callback
});
```

## Options
`animationDelay` - How long before the animation will start in milliseconds. `Default: 0`

`animationSpeed` - How long the animation will last. `Default: 1000`

`enableKeyPressScroll` - Allow the use of keyboard to navigate each section. `Default: true`

`withNavigation` - Enable or disable the navigation menu.

`callbackActions` - Optionally assigned a callback script on each section.

You can try the demo [demo](https://github.com/kevinkarl22/jFullPageScroller/tree/main/demo) folder, which contains all the functionality of the plugin.

## Contributing
Please submit bug reports, vulnerabilities, suggestions and send it to <a href="mailto:kevinkarl.leano@gmail.com">kevinkarl.leano@gmail.com</a>.

## Changelog
See [changelog](https://github.com/kevinkarl22/jFullPageScroller/blob/main/CHANGELOG.md).
