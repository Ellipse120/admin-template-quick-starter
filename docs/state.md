# State management

- [State management](#state-management)
  - [Modules](#modules)
  - [Module Nesting](#module-nesting)

## Modules

The `src/state/modules` directory is where all shared application state lives. Any JS file added here (apart from unit tests) will be automatically registered in the store as a [namespaced module](https://vuex.vuejs.org/en/modules.html#namespacing).

Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.

## Module Nesting

Vuex modules can be nested, which sometimes makes sense for organizational purposes. For example, if you created these files:

```js
// @file src/state/modules/dashboard.js

export const state = {
  role: 'project-manager',
}
```

```js
// @file src/state/modules/dashboard/videos.js

export const state = {
  all: [],
}

export const getters = {
  favorited(state) {
    return state.all.filter((video) => video.favorited)
  },
}
```

Then you'd be able to access those modules with:

```js
store.state.dashboard.role
store.state.dashboard.videos.all
store.getters['dashboard/videos/favorited']
```

As you can see, placing the `videos` module in a folder called `dashboard` automatically nests it underneath the `dashboard` namespace. This works even if a `dashboard.js` file doesn't exist. You can also have as many levels of nesting as you want.
