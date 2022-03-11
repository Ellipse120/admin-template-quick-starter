module.exports = {
  title: "Admin Template Quick Starter",
  description: "A simple and beautiful vuepress blog",
  port: 8100,
  base: "/docs/",
  markdown: {
    lineNumbers: true
  },
  head: [["link", { rel: "icon", type: "icon", href: "./favicon.ico" }]],
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      {
        text: "Github",
        link: "https://github.com/Ellipse120/admin-template-quick-starter"
      }
    ],
    displayAllHeaders: true,
    smoothScroll: true,
    sidebar: [
      "/",
      "/development",
      "/architecture",
      "/tech",
      "/routing",
      "/state",
      "/tests",
      "/linting",
      "/editors",
      "/production",
      "/troubleshooting"
    ]
  }
};
