import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CryptoNoise',
  description: 'Two-sided marketplace connecting crypto/Web3 projects with UGC content creators. Performance-based creator campaigns with real-time analytics.',
  base: '/',
  srcDir: '.',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3B82F6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'CryptoNoise - Crypto UGC Creator Platform' }],
    ['meta', { name: 'og:description', content: 'Two-sided marketplace connecting crypto projects with UGC creators. Pay for performance, not promises.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'CryptoNoise - Crypto UGC Platform' }],
    ['meta', { name: 'keywords', content: 'crypto marketing, UGC, content creators, Web3, blockchain, DeFi, crypto campaigns' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'CryptoNoise',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Overview', link: '/README' },
          { text: 'Features', link: '/docs/FEATURES' },
          { text: 'Technical Spec', link: '/docs/TECHNICAL_SPEC' },
          { text: 'API Reference', link: '/docs/API_SPEC' }
        ]
      },
      { text: 'Examples', link: '/examples/' },
      { text: 'Roadmap', link: '/docs/ROADMAP' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/README' },
            { text: 'Quick Start', link: '/docs/FEATURES' },
          ]
        },
        {
          text: 'Core Documentation',
          collapsed: false,
          items: [
            { text: 'Features Specification', link: '/docs/FEATURES' },
            { text: 'Technical Architecture', link: '/docs/TECHNICAL_SPEC' },
            { text: 'Database Schema', link: '/docs/DATABASE_SCHEMA' },
            { text: 'API Reference', link: '/docs/API_SPEC' },
          ]
        },
        {
          text: 'Design & UI',
          collapsed: false,
          items: [
            { text: 'UI Reference Guide', link: '/docs/UI_REFERENCE' },
            { text: 'Example Components', link: '/examples/' },
          ]
        },
        {
          text: 'Planning',
          collapsed: false,
          items: [
            { text: 'Development Roadmap', link: '/docs/ROADMAP' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cryptonoise/cryptonoise' }
    ],

    footer: {
      message: 'CryptoNoise - Connecting Crypto Projects with UGC Creators',
      copyright: 'Documentation for educational purposes'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/cryptonoise/cryptonoise/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  }
})
