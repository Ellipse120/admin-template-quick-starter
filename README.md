# 管理系统模板

> Lerna & Husky & CommitLint & Vue.js 2 & Vue Composition API & Element UI & Windi CSS & AntV X6 & Axios & CryptoJS & [date-fns](http://10.128.198.185:8080/date-fns-doc/) & Tinymce & VirtualScroll & Iconfont & Permission Control & Lint

[**Live demo**](https://admin-template-quick-starter.vercel.app/)

## Development

```bash
# clone the project
git clone https://github.com/Ellipse120/admin-template-quick-starter.git

# enter the project directory
cd crh-advanced-digital-factory

# (optional) Windows用户需要执行
husky install

# install dependencies
npm i

# 开发
npm run dev
```

## Production

```bash
# 发布测试环境
npm run build:stage

# 发布生产环境
# `dev` 合并到`master`分支, 禁止反向操作. 然后将master最新的代码及Tag推送
npm run release:minor
or npm run release:patch
or npm run release:major

# 最后在master分支打包发布
npm run build:prod
```

---

## Git Commit Message Format: `<type>(scope): <short summary>`

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

Copyright (c) 2021-present lusai
