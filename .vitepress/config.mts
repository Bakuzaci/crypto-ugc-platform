import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CryptoNoise',
  description: 'Crypto UGC Creator Platform - Documentation',
  base: '/',
  srcDir: '.',

  head: [
    ['meta', { name: 'theme-color', content: '#3B82F6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'CryptoNoise - Crypto UGC Platform' }],
    ['meta', { name: 'og:description', content: 'Two-sided marketplace connecting crypto projects with UGC creators' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'CryptoNoise',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/FEATURES' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Overview', link: '/README' },
        ]
      },
      {
        text: 'Documentation',
        items: [
          { text: 'Features', link: '/docs/FEATURES' },
          { text: 'Technical Spec', link: '/docs/TECHNICAL_SPEC' },
          { text: 'Database Schema', link: '/docs/DATABASE_SCHEMA' },
          { text: 'API Specification', link: '/docs/API_SPEC' },
          { text: 'UI Reference', link: '/docs/UI_REFERENCE' },
          { text: 'Roadmap', link: '/docs/ROADMAP' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Components', link: '/examples/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'CryptoNoise - Connecting Crypto Projects with UGC Creators',
      copyright: 'Documentation for educational purposes'
    },

    search: {
      provider: 'local'
    }
  }
})
