import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import 'typeface-playfair-display';
import 'typeface-lato';

function Meta({ description, meta, title = 'Sidecar', image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaImage = image || '/icons/icon-144x144.png';
  const metaTags = getMeta(
    {
      title,
      metaDescription,
      metaImage,
      site,
    },
    meta
  );

  return (
    <>
      <html lang="en-US" />
      <title>{title}</title>
      {metaTags.map((props) => (
        <meta {...props} />
      ))}
    </>
  );
}

Meta.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

Meta.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Meta;

function getMeta({ title, metaDescription, metaImage, site }, additional) {
  return [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: `https://sidecar.us${metaImage}`,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
    {
      name: 'twitter:image:src',
      content: `https://sidecar.us${metaImage}`,
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ].concat(additional || []);
}
