# Admin Template Quick Starter

## Recent Activity
![Alt](https://repobeats.axiom.co/api/embed/3e96048e4f3ebb2edcd569bad134a8e1a163f7c5.svg "Repobeats analytics image")

## Tech Stack

> Lerna & Husky & CommitLint & Vue.js 2 & Vue Composition API & Element UI & Windi CSS & AntV X6 & Axios & CryptoJS & date-fns & Tinymce & VirtualScroll & Iconfont & Permission Control & ES Lint

## [**Document**](https://admin-template-quick-starter-docs.vercel.app/)

## [**Live demo**](https://admin-template-quick-starter.vercel.app/)

## Development

### Recomend

```bash
degit https://github.com/Ellipse120/admin-template-quick-starter.git
```

```bash
# clone the project
git clone https://github.com/Ellipse120/admin-template-quick-starter.git

# enter the project directory
cd crh-advanced-digital-factory

# install dependencies
npm i

# dev
npm run dev
```

## Production

```bash
# release staging
npm run build:stage

# relase production
npm run release:minor
or npm run release:patch
or npm run release:major

# push production code to CI
npm run build:prod
```

---

## `Git Commit Message Format`

>  `<type>(scope): <short summary>`

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
---

Copyright (c) 2021-present [Ellipse120](ellipse120@gmail.com)
