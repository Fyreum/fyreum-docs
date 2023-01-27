// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsDark');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fyreum Docs (Beta)',
  tagline: 'Official Docs for projects of Fyreum',
  url: 'https://docs.fyreum.de',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Fyreum', // Usually your GitHub org/user name.
  projectName: 'fyreum-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Fyreum Docs',
        logo: {
          alt: 'Fyreum Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'bedrock/intro',
            position: 'left',
            label: 'Bedrock',
          },
          {
            href: 'https://github.com/Fyreum/fyreum-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Bedrock',
                to: '/bedrock/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/17299902/fyreum',
              },
              {
                label: 'Discord',
                href: 'https://dc.erethon.de',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Fyreum1',
              },
            ],
          },
          {
            title: 'Other',
            items: [
              {
                label: 'Main Site',
                href: 'https://fyreum.de',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Fyreum',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fyreum, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          'java',
          'kotlin',
        ],
      },
    }),
};

module.exports = config;
