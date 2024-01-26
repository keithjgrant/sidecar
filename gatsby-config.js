/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Sidecar`,
    siteUrl: `https://sidecar.us`,
    description: 'A curated collection of cocktails for the home bartender',
    author: '@keithjgrant',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Sidecar',
        short_name: 'Sidecar',
        description: 'A curated collection of cocktails',
        start_url: '/',
        background_color: '#413d40',
        theme_color: '#f4b071',
        display: 'standalone',
        icon: 'src/images/icon.png',
        crossOrigin: 'use-credentials',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/drinks/', '/drinks/*'],
      },
    },
    'gatsby-plugin-netlify',
  ],
};
