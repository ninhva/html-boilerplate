# HTML Boilerplate

HTML5 Boilerplate is a frontend template include HTML, CSS, JS for building fast sites.

## Getting started

Open your preferred command line tool and run follow some steps below:

1. __`git clone https://github.com/ninhva/html-boilerplate.git`__.
2. `cd html-boilerplate`.
3. `npm install` automatically to install plugins required for the build script based in `package.json` file.
4. `npm run dev` to preview and development, then run url `http://localhost:9000` in your browser.
5. `npm run prod` to preview final version, then run url `http://localhost:9090` in your browser.
6. `npm run build` to build final version.

## Features
* You can separate the elements (header, footer, banner, aside...) to be reused many times without trouble.
* Prettify HTML code.
* Using SASS library.
* Minify JS and CSS files.
* Minify images (jpg, png, svg...) seamlessly.

## Project structure
<pre>
<code>
html-boilerplate/
├── src/
│   ├── fonts
│   ├── images
│   ├── scripts
│   ├── styles
│   └── views/
│       ├── layouts
│       ├── pages
│       └── partials
└── gulpfile.js

</code>
</pre>

### CSS Methodology

- Blocks
  - are prefixed with `b-`
  - __good:__ b-menu, b-sidebar, b-sitemap, b-user
  - __bad:__ menu, sidebar, sitemap, user
- Elements
  - have _no prefix_ and can only be defined in block scope
  - are not prefixed with their block (choose a longer name if it's not expressive enough)
  - __good:__ item, title, user-avatar (instead of user or avatar)
  - __bad:__ user-user-avatar, menu-item-a
- Modifier
  - are prefixed with `is-`, and have to be defined in block or element scope
  - __good:__ is-selected, is-active, is-approved
  - __bad:__ selected, active, approved


#### Example

File `_menu.scss` in `source/sass/blocks` directory.

```
.b-menu { /* block: 'b-menu' */
  &.is-static { /* modifier: 'is-static' for b-menu  */
    …
  }

  .item { /* element: 'item' in b-menu */
    a { /* element: 'item a' in b-menu */
      …
    }
  }
}
```


#### Class-Naming

Because you want to know if the block is for page layout or for a single component, we separate page layout blocks from component blocks.

Page Layout Blocks:

- b-page
- b-page-header
- b-page-nav
- b-page-main
- b-page-aside
- b-page-footer

Component Blocks:

- b-eventlist
- b-linklist
- b-sitemap
- b-teaser-text
- b-teaser-video
- …


#### Commenting

Start with a small description of the rule set, then number tiny details that are worth an explanation. The numbers are matching with the numbered comments at the end of the CSS rules, e.g. `/* [1] */`.

```
/**
 * Purpose of the selector or the rule set
 * 1. Hardware acceleration hack
 * 2. position: sticky; on anything but top aligned elements is buggy in Chrome <37 and iOS 7+
 */
 
.box {
  position: fixed;
  transform: translate3d(0, 0, 0); /* [1] */
  
  .csspositionsticky & {
    position: sticky; /* [2] */
  }
}
```


### CSS Coding Style

(This list is not intended to be exhaustive.)

- Use lowercase for class names.
- Be consistant with indentation – using 2 spaces.
- Be consistent in declaration order, cluster related properties (Positioning, Box-Model, Text & Color).
- Be consistant with quotes – using double quotes `""`.
- Quote attribute values in selectors, e.g. `input[type="checkbox"]`.
- One selector per line, one rule per line.
- Put spaces after `:` in property declarations.
- Put a `;` at the end of the last declaration in a declaration block.
- Include a space after each comma in comma-separated property or function values, e.g. `rgba(0, 0, 0, 0)`.
- Separate each ruleset by a blank line.


### CSS Coding Guidelines

#### Avoid dangerous selectors

If a selector is too generic, it's dangerous. In 99% of cases you have to overwrite this rule somewhere. Be more specific. Try using a class instead. (Exception: CSS-Resetstyles)

__bad__

```
header { … }
h2 { … }
ul { … }
```

__good__

```
.header { … }
.subtitle { … }
.linklist { … }
```


#### Avoid element selectors

Element selectors are expensive. Like the rule above, be more specific. Try using a class instead. Furthermore elements like `<div />` and `<span />` should always have a class-attribute in your markup.

__bad__

```
.foo div { … }
.foo span { … }
.foo ul { … }
```

__good__

```
.foo .section { … }
.foo .title { … }
.foo .linklist { … }
```


#### Avoid IDs where possible

IDs should never be used in CSS. Use IDs in HTML for fragment identifiers and maybee JS hooks but never in CSS because of their heightened specificity and because they can never be used more than once in a page.

Though you should use IDs in forms to connect `<input />` and `<label />` with the `for`-attribute.

__bad__

```
#sidebar
```

__good__

```
.sidebar
```


#### Avoid qualifying class names with element selectors

It's counterproductive because you unnecessary heighten the specifity.

__bad__

```
ul.linklist { … }
div.example { … }
a.back { … }
```

__good__

```
.linklist { … }
.example { … }
.back { … }
```


#### Avoid the descendant selector

The descendant selector is the most expensive selector in CSS. You should target directly if possible.

__bad__

```
html body .linklist li a { … }
```

__good__

```
.linklist-link { … }
```


#### Avoid deep nesting

Following to the rule above you should also try to nest your selectors maximum 3 levels deep.

__bad__

```
.navlist li a span:before { … }
```

__good__

```
.navlist .info:before { … }
```


#### Avoid using the same selctor for styling and JS

Separation of concerns

__bad__

```
.dialog-opener { … }
```

```
$('.dialog-opener')…
```

__good__

```
.dialog-opener { … }
```

prefixed with `js-`

```
$('.js-dialog-opener')…
```

or use data-attributes:

```
$('[data-dialog-opener]')…
```


#### Avoid using native language

The English language has proven itself among coders as the standard.

__bad__

```
.share-buttons .chia-se a {
  background: url("../img/icons/facebook-teilen.png") no-repeat 0 0;
}
```

__good__

```
.share-buttons .facebook-share a {
  background: url("../img/icons/facebook-share.png") no-repeat 0 0;
}
```


#### Use shorthand properties where possible

It's shorter and easier to read.

__bad__

```
.box {
  padding-top: 0;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}
```

__good__

```
.box {
  padding: 0 10px 20px;
}
```


#### Omit unit specification after “0” values

__bad__

```
.box {
  margin: 0px;
}
```

__good__

```
.box {
  margin: 0;
}
```

__exception, where you don't omit__

```
.box {
  transform: rotate(0deg);
}
```


#### Use hexadecimal color codes unless using rgba or hsl

In most cases the hex code is shorter than the color names, so you could save some bits.

__bad__

```
.box {
  color: orange;
}
```

__good__

```
.box {
  color: #ffa500;
}
```


#### Use 3 character hexadecimal notation where possible

Like above, it's shorter and saves some bits.

__bad__

```
.box {
  color: #ff009;
}
```

__good__

```
.box {
  color: #f09;
}
```


#### Use number keywords 100–900 for font-weight

It's the typographic standard to use number keywords. Like above it's also shorter and saves some bits.

__bad__

```
.box {
  font-weight: normal;
}
```

__good__

```
.box {
  font-weight: 400;
}
```


#### Separate words in class names by a hyphen

__bad__

```
.user_avatar { … }
.userAvatar { … }
.useravatar { … }
```

__good__

```
.user-avatar { … }
```


#### Don't use !important

It may be ok to use it on helper classes though.

### SASS structure

There is a main SCSS-file `main.scss`.

The `main.scss` imports all partials.

This is how the `sass`-folder looks like:

```
$ tree
.
styles
├── base
│   ├── minxins
│   |   ├── _box-shadow.scss
│   |   ├── _rem.scss
│   |   └── …
│   ├── _button.scss
│   ├── _extends.scss
│   ├── _fonts.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _utility.scss
│   ├── _variables.scss
│   └── …
├── custom
│   ├── _custom-plugin.scss
│   └── …
├── layouts
│   ├── _header.scss
│   ├── _footer.scss
│   └── …
├── pages
│   ├── _homepage.scss
│   ├── _aboutpage.scss
│   └── …
└── responsive
    ├── _responsive.scss
    └── …

```

Some explanation:

- __button.scss__ – put your button styles.
- __reset.scss__ – global browser reset.
- __fonts.scss__ – use it for `@font-face`-declarations.
- __mixins/__ – put your mixins in here, e.g. `rem`, `breakpoint` etc.
- __utility.scss__ – put your common classes.
- __variables/__ – put your variables in here, e.g. `color`, `typography` etc.


### SASS Coding Guidelines

#### Syntax

We're using SCSS-syntax because it's valid CSS and more expressive.


#### Order of definition

If you have a consistent order of definition, everybody can scan the code on first sight.

__List media queries first__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
}
```

__List global styles beginning with @extend second (separated by a blank line)__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
  // Global Styles
  @extend %module;
  
}
```

__List @include third__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
  // Global Styles
  @extend %module;
  @include transition(all .5s ease);
  
}
```

__List regular styles next__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
  // Global Styles
  @extend %module;
  @include transition(all .5s ease);
  color: #000;
  
}
```

__List pseudo-class/elements nesting with & (separated by a blank line)__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
  // Global Styles
  @extend %module;
  @include transition(all .5s ease);
  color: #000;
  
  &:hover {
    color: #fff;
  }
  
  &::after {
    content: "";
  }
  
}
```

__List nested selectors last (separated by a blank line)__

```
.b-foo {
  
  // Media Queries
  @include breakpoint(767) {
    padding: 10px;
  }
  
  // Global Styles
  @extend %module;
  @include transition(all .5s ease);
  color: #000;
  
  &:hover {
    color: #fff;
  }
  
  &::after {
    content: "";
  }
  
  > .bar {
    background-color: #f90;
  }
  
}
```


#### Nesting

Maximum Nesting: three levels deep!

```
.b-foo {
  .bar {
    .baz {
      // no more!
    }
  }
}
```


#### Blocks in blocks

Where to define the styles for blocks in blocks? Answer: always in your block which gets the styling. Otherwise you have to maintain more than one file which is error-prone.

Example: Assumed that you have a different styling for the user-avatar-block, based on whether it's in your page-header-block or in your page-footer-block.

```
<div class="b-page-header">
  <div class="b-user-avatar">
    …
  </div>
</div>

<div class="b-page-footer">
  <div class="b-user-avatar">
    …
  </div>
</div>
```

__bad__

```
// _page-header.scss
.b-page-header {
  .b-user-avatar {
    float: right;
    width: 100px;
    height: 100px;
  }
}

// _page-footer.scss
.b-page-footer {
  .b-user-avatar {
    float: left;
    width: 50px;
    height: 50px;
  }
}

// _user-avatar.scss
.b-user-avatar {
  border-radius: 50%;
}
```

__good__

```
// _user-avatar.scss
.b-user-avatar {
  border-radius: 50%;
  
  .b-page-header & {
    float: right;
    width: 100px;
    height: 100px;
  }
  
  .b-page-footer & {
    float: left;
    width: 50px;
    height: 50px;
  }
}
```


#### Order of elements

Selectors mirror the order of the markup.

```
<div class="b-foo">
  <ul class="bar">
    <li class="baz">
      <a class="qux" href="#">Link</a>
    </li>
  </ul>
</div>
```

__bad__

```
.b-foo {
  .qux {
    …
  }
  
  .bar {
    …
  }
}
```

__good__

```
.b-foo {
  .bar {
    …
  }
  
  .qux {
    …
  }
}
```


#### Bundling

All child selectors are bundled below the parent selector.

```
<div class="b-foo">
  <ul class="bar">
    <li class="baz">
      <a class="qux" href="#">Link</a>
    </li>
  </ul>
</div>
```

__bad__

```
.b-foo {
  .bar {
    …
  }
}

.b-foo {
  .qux {
    …
  }
}
```

__good__

```
.b-foo {
  .bar {
    …
  }
  
  .qux {
    …
  }
}
```


#### Child selectors

Each child selector will be indented and set on a new line. Important: you don't have to mirror the complete DOM!  
Rule of thumb: The selector is as short as possible. Indention only if the selector is needed.

```
<div class="b-foo">
  <ul class="bar">
    <li class="baz">
      <a class="qux" href="#">Link</a>
    </li>
  </ul>
</div>
```

__bad__

```
.b-foo {
  .baz .qux {
    …
  }
}
```

__bad too__

```
.b-foo {
  .baz {
    .qux {
      …
    }
  }
}
```

__good__

```
.b-foo {
  .qux {
    …
  }
}
```


#### Placeholder extends vs. class extends

You have two options to extend code blocks that are reused several times: standard classes and placeholders. The advantage of placeholder extends over classes: they won't be added to the CSS output and remain silent. Very usefull for helper classes e.g. like the `clearfix` which was put directly on the markup in the past.

__Class extend__

```
// Usage
.foo {
  padding: 10px;
}

.bar {
  @extend .foo;
  color: #fff;
}

// Output
.foo,
.bar {
  padding: 10px;
}

.bar {
  color: #fff;
}
```

__Placeholder extend__

```
// Usage
%foo {
  padding: 10px;
}

.bar {
  @extend %foo;
  color: #fff;
}

// Output
.bar {
  padding: 10px;
  color: #fff;
}
```


#### Placeholder extends > Mixins

To reuse SASS snippets repeatedly, you should choose placeholder extends and not mixins. Thus, the CSS output is smaller because selectors are summarized.

__bad__

```
// Mixin
@mixin ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Usage
.foo {
  @include ellipsis();
}

.bar {
  @include ellipsis();
}

// Output
.foo {
  overflow: hidden;
  text-overflow: ellipsis:
  white-space: nowrap;
}

.bar {
  overflow: hidden;
  text-overflow: ellipsis:
  white-space: nowrap;
}
```

__good__

```
// Placeholder extend
%ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Usage
.foo {
  @extend %ellipsis;
}

.bar {
  @extend %ellipsis;
}

// Output
.foo,
.bar {
  overflow: hidden;
  text-overflow: ellipsis:
  white-space: nowrap;
}
```


#### Keep it simple – Part 1

Just because you can solve problems with functions, mixins etc. in SASS, you must not necessarily do it. :)  
Always remember that others should easily read and understand your code too.

__elaborate__

```
// Mixin
@mixin context($old-context, $new-context) {
  @at-root #{selector-replace(&, $old-context, $new-context)} {
    @content;
  }
}

// Usage
li {
  float: left;
  
  ul {
    display: none;
    
    @include context('li', 'li:hover') {
      display: block;
    }
  }
}
```

__simple__

```
li {
  float: left;
  
  ul {
    display: none;
  }
  
  &:hover ul {
    display: block;
  }
}
```


#### Keep it simple – Part 2

For better readability, you should write the properties as in CSS.

__elaborate__

```
.foo {
  font: {
    family: arial, sans-serif;
    size: 5em;
    weight: 700;
  }
}
```

__simple__

```
.box {
  font-family: arial, sans-serif;
  font-size: 5em;
  font-weight: 700;
}
```

## Browser support
* Chrome (latest)
* Safari (latest)
* Firefox (latest)
* Edge (latest)
* Opera (latest)
* Internet Explorer 10+

## License
nikita.css
[MIT License](html-boilerplate/LICENSE)
