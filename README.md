# jFullPageScroller – A full-featured full page scroller plugin for jQuery.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S06JWZX)

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

`Note: If there are any misconfiguration in deploying the plugin, the plugin will not work and logs will be displayed on the browser's console.`.

You must add the `jfps` attribute in the `<html>` tag. In this tag you can also add the following optional attributes which would affect the behavior of the plugin:

`jfps-direction` - The direction of the scrollbar. `Options: "vertical" or "horizontal"`

`jfps-scrollbar` - Availability of the browser's scrollbar. `Options: "false" or "true"`

If you did not specify any of the above-mentioned optional attributes, then the following default attributes will be used instead:

`jfps-direction="vertical"` and `jfps-scrollbar="false"`

For example:
```html
<!-- With Optional Attributes -->
<!DOCTYPE html>
<html jfps jfps-direction="horizontal" jfps-scrollbar="true" lang="en">

<head>

<!-- Without Optional Attributes -->
<!DOCTYPE html>
<html jfps lang="en">

<head>
```

`Note: The next part is optional and only applicable if navigation menu is needed.`

Optionally, you can specify a navigation menu, this will be useful when users want to jump in different parts of the section.

First, create a html navigation menu parent container inside the `<body>` tag, you can use any html container tag you preferred. You must add a `jfps-nav-container` attribute in this tag.

Then inside the parent container you created, create a child navigation menu link then add the following attributes on each navigation link: `jfps-nav` and `jfps-target-section` attributes. Assign a value for each `jfps-target-section` attributes, a number or a string name.

For better user experience, you can add a `href` attribute which would have the same value as the `jfps-target-section`. This is to ensure that each page can still be navigated even if the plugin did not initialized.

`Note: You can customize the layout or look of the navigation menu as long as you retain the required attributes.`

For example:
```html
<nav jfps-nav-container id="demo-nav">
  <a jfps-nav jfps-target-section="section-1" href="#section-1">Section #1</a>
  <a jfps-nav jfps-target-section="section-2" href="#section-2">Section #2</a>
  <a jfps-nav jfps-target-section="section-3" href="#section-3">Section #3</a>
  <a jfps-nav jfps-target-section="section-4" href="#section-4">Section #4</a>
  <a jfps-nav jfps-target-section="section-5" href="#section-5">Section #5</a>
</nav>
```

`Note: The next part is not optional and must be set.`

Inside the `<body>` tag again, create a parent container, you can use any html container tag you preferred. You must add a `jfps-section-container` attribute in this tag.

For example:
```html
<main jfps-section-container id="demo-content">

</main>
```

Inside the parent container you created, create a child section container, you can use any html container tag you preferred. For each section container, add the `jfps-section` and `jfps-section-id` attributes.

You can add as many as section as you want as long as you change the value of the `jfps-section-id` attribute. You can set any value of the `jfps-section-id` attribute, a number or a string name. If navigation menu is enabled, then it should have the same value in the navigation menu mentioned above.

For better user experience, you can add a `id` attribute which would have the same value as the `jfps-section-id`. This is to ensure that each page can still be navigated even if the plugin did not initialized.

For example:
```html
<main jfps-section-container id="demo-content">
  <section jfps-section jfps-section-id="section-1" style="background-color: cyan;" id="section-1">
    <div>
      <h1>jFullPageScroller</h1>
      <p>By Kevin Karl Leaño</p>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-2" style="background-color: lightgreen;" id="section-2">
    <div>
      <h1>Section #2</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-3" style="background-color: orange;" id="section-3">
    <div>
      <h1>Section #3</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-4" style="background-color: maroon;" id="section-4">
    <div>
      <h1>Section #4</h1>
    </div>
  </section>
  <section jfps-section jfps-section-id="section-5" style="background-color: gray;" id="section-5">
    <div>
      <h1>Section #5</h1>
    </div>
  </section>
</main>
```

Now, if everything are set in the `<html>` part. Let's go to the `<script>` part.

To initialize, add the following script in your `<script>` tag:

```javascript
// Default settings.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: true, // If navigation menu is not set, then change this to "false".
});
```

Optionally, you can assign a callback script for each section you want.

To add a callback, create an object using the following the format:

```javascript
  'TARGET SECTION ID': {
    start: function() {
      // Script to be called when animation starts.
    },
    done: function() {
      // Script to be called when animation ends.
    }
  }
```

`Note: Your 'TARGET SECTION ID' must match the value of the 'jfps-section-id' assigned on each section.`

If your `TARGET SECTION ID` matches the value of a section's `jfps-section-id`, then it will initialize the callback script of that specific section.

You can utilize the jQuery's `animate()` options except for `duration` in your callbacks. Visit [jQuery's Animate](https://api.jquery.com/animate/) for API documentation.

```javascript
// Default settings with callback actions.
$.jFullPageScroller({
  animationDelay: 0,
  animationSpeed: 1000,
  enableKeyPressScroll: true,
  withNavigation: true, // If navigation menu is not set, then change this to "false".
}, {
  'section-5': {
    start: function() {
      // Script to be called when animation starts.
    },
    done: function() {
      // Script to be called when animation ends.
    }
  }
});
```

If everything are set and configured, then the jFullPageScroller will be initialized.

## Options
`animationDelay` - How long before the animation will start in milliseconds. `Default: 0`

`animationSpeed` - How long the animation will last in milliseconds. `Default: 1000`

`enableKeyPressScroll` - Allow the use of keyboard to navigate each section. `Default: true`

`withNavigation` - Enable or disable the navigation menu. `Default: true`

## Demo

You can try the [demo](https://github.com/kevinkarl22/jFullPageScroller/tree/main/demo) folder, which contains all the functionality of the plugin.

## Contributing
Please submit bug reports, vulnerabilities, suggestions and send it to <a href="mailto:kevinkarl.leano@gmail.com">kevinkarl.leano@gmail.com</a>.

## Changelog
See [changelog](https://github.com/kevinkarl22/jFullPageScroller/blob/main/CHANGELOG.md).

## Version
See [version](https://github.com/kevinkarl22/jFullPageScroller/blob/main/VERSION).
