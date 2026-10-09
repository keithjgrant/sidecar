import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
// @ts-expect-error untyped font packages
import 'typeface-playfair-display';
// @ts-expect-error untyped font packages
import 'typeface-lato';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface MetaProps {
  description?: string;
  meta?: MetaTag[];
  title?: string;
  image?: string | null;
}

function Meta({ description = '', meta = [], title = 'Sidecar', image }: MetaProps) {
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

Meta.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Meta;

interface GetMetaArgs {
  title: string;
  metaDescription: string;
  metaImage: string;
  site: { siteMetadata: { title: string; description: string; author: string } };
}

function getMeta({ title, metaDescription, metaImage, site }: GetMetaArgs, additional: MetaTag[]): MetaTag[] {
  const tags: MetaTag[] = [
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
  ];
  return tags.concat(additional || []);
}
