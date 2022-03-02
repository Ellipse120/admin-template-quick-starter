# Architecture

- [Architecture](#architecture)
  - [`docs`](#docs)
  - [`generators`](#generators)
  - [`public`](#public)
    - [`index.html`](#indexhtml)
  - [`src`](#src)
    - [`assets`](#assets)
    - [`components`](#components)
    - [`styles`](#styles)
    - [`router`](#router)
    - [`state`](#state)
    - [`utils`](#utils)
    - [`project-config.js`](#project-config)
    - [`App.vue`](#App-vue)
    - [`main.js`](#main-js)
    - [`permission.js`](#permission-js)
  - [`tests`](#tests)

## `docs`

[VuePress](https://vuepress.vuejs.org/) configuration for docs static site generation.

You found me! :wink:

## `generators`

Generator templates to speed up development. See [the development doc](development.md#generators) for more.

## `public`

Where you'll keep any static assets, to be added to the `dist` directory without processing from our build system. Ex: We use [`Tinymce`](https://www.tiny.cloud/docs/) for WYSIWYG editors, so we'll need to add its assets to the `public` directory.

### `index.html`

This one file actually _does_ get processed by our build system, allowing us to inject some information from Webpack with [EJS](http://ejs.co/), such as the title, then add our JS and CSS.

## `src`

Where we keep all our source files.

### `assets`

This project manages assets via Vue CLI. Learn more about [its asset handling here](https://cli.vuejs.org/guide/html-and-static-assets.html).

### `components`

Where most of the components in our app will live.

### `styles`

Override `ElementUI` class, global style Where we keep our [design variables and tooling](tech.md#design-variables-and-tooling).

### `router`

Where the router, routes, and any routing-related components live. See [the routing doc](routing.md) for more.

### `state`

Where all our global state management lives. See [the state management doc](state.md) for more.

### `utils`

These are utility functions you may want to share between many files in your application. They will always be pure and never have side effects, meaning if you provide a function the same arguments, it will always return the same result. These should also never directly affect the DOM or interface with our Vuex state.

### `project-config`

Contains app-specific metadata.

### `App.vue`

The root Vue component that simply delegates to the router view. This is typically the only component to contain global CSS.

### `main.js`

The entry point to our app, were we create our Vue instance and mount it to the DOM.

### `permission.js`

ACL of permissions for our app.

## `tests`

Where all our tests go. See [the tests doc](tests.md) for more.
