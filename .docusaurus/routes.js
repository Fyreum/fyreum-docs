
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','29c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','302'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c7d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3c1'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','e08'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','bcf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','035'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','1fd'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','037'),
    routes: [
      {
        path: '/docs/aergia/intro',
        component: ComponentCreator('/docs/aergia/intro','2f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/aergia/placeholders',
        component: ComponentCreator('/docs/aergia/placeholders','3ac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/bedrock/intro',
        component: ComponentCreator('/docs/bedrock/intro','589'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/welcome',
        component: ComponentCreator('/docs/welcome','a64'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','624'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
