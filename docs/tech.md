# Languages and technologies

- [Languages and technologies](#languages-and-technologies)
  - [JavaScript](#javascript)
    - [Polyfills](#polyfills)
    - [Vue](#vue)
    - [Vue Router](#vue-router)
    - [Vuex (state management)](#vuex-state-management)
    - [JavaScript FAQ](#javascript-faq)
  - [HTML](#html)
    - [Templates](#templates)
    - [Render functions](#render-functions)
    - [HTML FAQ](#html-faq)
  - [CSS](#css)
    - [WindiCSS](#windicss)
    - [GSAP](#gsap)
    - [SCSS](#scss)
    - [Importing global modules](#importing-global-modules)
    - [Referencing aliased asset URLs](#referencing-aliased-asset-urls)
    - [Design variables and tooling](#design-variables-and-tooling)(#sharing-scss-variables-with-javascript)
    - [CSS FAQ](#css-faq)

## JavaScript

Our JavaScript is compiled by Babel, using the [`@vue/babel-preset-app`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) as a base configuration. You can update this configuration in `.babelrc.js`.

If you're new to features such as `const`, `let`, and `=>` (arrow functions), take some time to read about the following features in Babel's ES2015 guide:

- [Arrow functions](https://babeljs.io/docs/en/learn/#arrows-and-lexical-this)
- [Template literals](https://babeljs.io/docs/en/learn/#template-strings)
- [Destructuring](https://babeljs.io/docs/en/learn/#destructuring)
- [Spread operator](https://babeljs.io/docs/en/learn/#default-rest-spread)
- [`let`/`const`](https://babeljs.io/docs/en/learn/#let-const)
- [`for`...`of`](https://babeljs.io/docs/en/learn/#iterators-forof)

Reading these sections alone will get you 99% of the way to mastering Babel code. It's also a good idea to read about Promises, if you don't yet feel comfortable with them. Here's a [good intro](https://developers.google.com/web/fundamentals/getting-started/primers/promises).

### Polyfills

This project uses Vue CLI's [modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode), which creates two bundles: one modern bundle targeting modern browsers that support [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), and one legacy bundle targeting older browsers that do not.

For each bundle, polyfills for any JavaScript features you use are included based on the target bundle and supported browsers defined by `browserslist` in `package.json`.

### Vue

Since Vue is such a huge part of our app, I strongly recommend everyone read through at least the _Essentials_ of [Vue's guide](https://vuejs.org/v2/guide/).

### Vue Router

To understand how to manage pages with Vue Router, I recommend reading through the _Essentials_ of [those docs](https://router.vuejs.org/en/essentials/getting-started.html). Then you can read more about [routing in this application](routing.md).

### Vuex (state management)

To wrap your head around our state management, I recommend reading through [those docs](https://vuex.vuejs.org/guide), starting at _What is Vuex?_ and stopping before _Application Architecture_. Then skip down and read [_Form Handling_](https://vuex.vuejs.org/en/forms.html) and [_Testing_](https://vuex.vuejs.org/en/testing.html). Finally, read about [state management in this application](state.md).

### JavaScript FAQ

**Why not use TypeScript instead of JavaScript? Isn't that more appropriate for enterprise environments?**

At its current rate of development, I think TypeScript will eventually _become_ the standard, but I don't think it's there yet for application development. Here's my reasoning:

- The vast majority of bugs I encounter are _not_ due to type violations. The most powerful tools against bugs remain linting, tests, and code reviews - none of which are made easier by TypeScript.
- TypeScript doesn't guarantee type safety - that still requires discipline. You can still use hundreds of `any` annotations and libraries without any type definitions.
- In Visual Studio Code, users can already get a lot of useful intellisense (including type information) without having to use TypeScript. [JSDoc comments](https://jsdoc.app/about-getting-started.html) can also be added to [serve the same purpose](https://blog.usejournal.com/type-vue-without-typescript-b2b49210f0b) on an as-needed basis.
- Despite most bugs having nothing to do with type violations, developers can spend _a lot_ of time working towards full type safety, meaning teams unaccustomed to strongly typed languages may face significant drops in productivity. As I mentioned earlier, I think that time would be better spent on tests and code reviews.
- While the next version of Vuex will be designed with TypeScript in mind, the current version can be particularly painful with TypeScript.

## HTML

All HTML will exist within [`.vue` files](https://vuejs.org/v2/guide/single-file-components.html), either:

- in a `<template>`, or
- in a [`render` function](https://vuejs.org/v2/guide/render-function.html), optionally using [JSX](https://vuejs.org/v2/guide/render-function.html#JSX).

### [Templates](https://vuejs.org/v2/guide/syntax.html)

~95% of HTML will be in `.vue` files. Since Vue has a chance to parse it before the browser does, we can also do a few extra things that normally aren't possible in a browser.

For example, any element or component can be self-closing:

```html
<span class="fa fa-comment" />
```

The above simply compiles to:

```html
<span class="fa fa-comment"></span>
```

This feature is especially useful when writing components with long names, but no content:

```html
<FileUploader
  title="Upload any relevant legal documents"
  description="PDFs or scanned images are preferred"
  icon="folder-open"
/>
```

### [Render functions](https://vuejs.org/v2/guide/render-function.html)

Render functions are _alternatives_ to templates. Components using render functions will be relatively rare, written only when we need either:

- the full expressive power of JavaScript, or
- better rendering performance through stateless, [functional components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)

These components can optionally be written using an HTML-like syntax within JavaScript called [JSX](https://vuejs.org/v2/guide/render-function.html#JSX), including support for [some template features](https://github.com/vuejs/babel-preset-vue#supports-event-modifiers).

### HTML FAQ

**Why not use a preprocessor like Jade instead of HTML?**

Jade offers too little convenience (no new features we'd want, just simpler syntax) and would break `eslint-plugin-vue`'s template linting.

**If using a render function instead of a template, why not use a `.js(x)` file instead of a `.vue` file?**

There are no advantages to using a JS(X) file, other than not having to use a `<script>` tag. By sticking to `.vue` files, you can:

- leave out components' `name` property, because `vue-loader` adds a `__filename` property to exported objects as a fallback for Vue's devtools
- easily add styles if you later decide to
- easily refactor to a template if you later decide to

## CSS

For our styles, we're using SCSS and CSS modules, which you can activate by adding the `lang="scss"` and `module` attributes to style tags in Vue components:

```vue
<style lang="scss" module>
/* Styles go here */
</style>
```

### `WindiCSS`

::: tip
We should think about make full use of the [WindiCSS](https://windicss.org/) library.
:::

### `GSAP`

::: tip
We should think about make full use of the [GSAP](https://www.greensock.com/gsap-js/) library. In demo page, there are some usage examples. Code in [`src/views/dashboard/demo.vue`](src/views/dashboard/demo.vue).
:::

### SCSS

SCSS is a superset of CSS, meaning any valid CSS is _also_ valid SCSS. This allows you to easily copy properties from other sources, without having to reformat it. It also means you can stick to writing the CSS you're still comfortable with while you're learning to use more advanced SCSS features.

I specifically recommend reading about:

- [Variables](http://sass-lang.com/guide#topic-2)
- [Nesting](http://sass-lang.com/guide#topic-3)
- [Operators](http://sass-lang.com/guide#topic-8)

Just those features cover at least 95% of use cases.

### Importing global modules

To import files from `node_modules`, Webpack's [css-loader](https://github.com/webpack-contrib/css-loader) requires adding `~` to the beginning of a module name to denote that it's a global (not relative) file reference. For example:

```scss
@import '~nprogress/nprogress.css';
```

### Referencing aliased asset URLs

Similarly to importing global modules, referencing aliased assets in _non_-module CSS also requires the `~` at the beginning of the name. For example:

```scss
background: url('~@assets/images/background.png');
```

### Design variables and tooling

All our [variables](https://sass-lang.com/guide#topic-2), [placeholder classes](https://sass-lang.com/guide#topic-7), [mixins](https://sass-lang.com/guide#topic-6), and other design tooling are in the `src/styles` folder. Each of these files define variables, prefixed with the name of the file, then combined in `src/styles/index.scss`. This combined file is aliased as `@design` for convenience and can be imported into SCSS using:

```scss
@import '@styles';
```

This makes all our design variables available in your component or SCSS file. We recommend using the `WindiCSS` tool to design your page.

> NOTE: The `src/styles` folder should never contain code that compiles to actual CSS, as that CSS would be duplicated across every component the file is imported into.

### CSS FAQ

**Why use `WindiCSS` instead of plain CSS or another CSS preprocessor?**

What is Atomic CSS(aka: Functional CSS)?
Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

- No runtime overhead
- No unused classes
- recyclable css
- focus html

Windi CSS: Next generation utility-first CSS framework.
