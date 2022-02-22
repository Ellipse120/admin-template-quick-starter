module.exports = {
  title: 'Admin Template Quick Starter',
  description: 'A simple and beautiful vuepress blog',
  port: 8100,
  base: '/docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ],
    displayAllHeaders: true,
    smoothScroll: true,
    sidebar: [
      '/',
      '/development',
      '/architecture',
      '/tech',
      '/routing',
      '/state',
      '/tests',
      '/linting',
      '/editors',
      '/production',
      '/troubleshooting',
    ]
  }
}