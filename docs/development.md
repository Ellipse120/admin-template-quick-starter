# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
  - [Dev server](#dev-server)
    - [Developing with the production API](#developing-with-the-production-api)
  - [Git Commit Formats](#Git-Commit-Formats)
  - [Code Generators](#code-generators)
  - [Aliases](#aliases)
  - [Globals](#globals)
    - [Base components](#base-components)
  - [Docker (optional)](#docker-optional)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

Then update the following files to suit your application:

- `src/project-config.json` (provides metadata about your app)

## Installation

::: tip
Go [FTP Server](ftp://10.128.73.241/node_modules/) folder, get the specied package. Then, unzip to the root of your project.
:::

## Dev

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
npm run dev

# Launch the dev server and automatically open it in
# your default browser when ready
npm run dev --open
```

### Developing with the production API

By default, dev and tests filter requests through [the mock API](/docs/tests.md#the-mock-api) in `tests/mock-api`. To test directly against a local/live API instead, run dev and test commands with the `API_BASE_URL` environment variable set. For example:

```bash
# To develop against a local backend server
API_BASE_URL=http://localhost:3000 yarn dev

# To test and develop against a production server
API_BASE_URL=https://example.io yarn dev:e2e
```

## Git Commit Formats

Git Commit Message Format: `<type>(scope): <short summary>`

```text
type: Commit Type, build | ci | docs | feat | style | fix | perf | refactor | test
scope: Commit Scope, 
short summary: Not Capitalized. No period at the end. Less than 100 characters
```

---

```text
build: Changes that affect the build system or external dependencies(Ex scopes: gulp, npm, broccoli)
ci: Changes to our CI configuration files and scripts(Ex scopes: Circle, BrowserStack)
docs: Documentation only changes or code messages
feat: A new feature
style: improve CSS
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
test: Adding missing tests or unit test or correcting existing tests
```

::: warning
We use Git Hooks for validation of commit messages. If not pass validates, the commit will be rejected.
:::

## Code Generators

This project includes generators to speed up common development tasks. Commands include:

```bash
# Generate a new view component
npm run new:crud-OptionsAPI
npm run new:crud-CompositionAPI

# Generate a new component
npm run new:component
```

![Image from alias](/assets/imgs/code-generator.gif)

Update existing or create new generators in the `generators` folder, for detail: [Hygen docs](http://www.hygen.io/).

## Aliases

To simplify referencing local modules and refactoring, you can set aliases to be shared between dev and unit tests in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Globals

### Shared Components

[Base components](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) (a.k.a. presentational, dumb, or pure components)
but for more readable code, we recommend import components for using.

## Docker (optional)

TODO
