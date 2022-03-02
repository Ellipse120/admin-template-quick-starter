---
inject: true
to: src/router/index.js
at_line: 96
append: true
---

  {
    path: '/<%= name %>',
    component: Layout,
    meta: { title: '<%= h.changeCase.pascal(name) %>' },
    alwaysShow: true,
    children: [
      {
        path: '',
        name: '<%= h.changeCase.pascal(name) %>',
        component: () => lazyLoadView(import('@/views/<%= name  %>/index')),
        meta: { title: '<%= h.changeCase.pascal(name)  %>' }
      }
    ]
  },