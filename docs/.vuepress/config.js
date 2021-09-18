module.exports = {
  lang: 'zh-CN',
  title: 'docker-learn',
  description: 'docker',
  head: [
    ['link', { rel: 'icon', href: 'https://jz74.djtest.cn/favicon.ico' }]
  ],
  themeConfig: {
    logo: 'https://docs.docker.com/images/docker-icon.svg',
    home: '/',
    navbar: [
      // NavbarItem
      {
        text: '参考文章',
        link: '/overwirte/',
      },
      // NavbarGroup
      {
        text: '命令总结',
        children: [
          {text: 'image', link: '/images/'},
          {text: 'container', link: '/container/'}
        ],
      },
    ],
    darkMode: true,
    lastUpdated: false,
    toggleDarkMode: '切换模式',
    toggleSidebar: '切换侧边栏',
    repo: 'liyunfei22/docker-learn',
    themePlugins: {
      backToTop: true,
    }
  },
  plugins: [
    // ['@vuepress/plugin-debug'],
    // ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-search',
      {
        placeholder: 'Search',
        isSearchable: (page) => page.path !== '/',
      },
    ],
  ],
}