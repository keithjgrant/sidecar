import React from 'react';
import { Link } from 'gatsby';

export default function TileLink({ href, image, imagePosition, children }) {
  let imageUrl = '';
  if (image) {
    imageUrl = image.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
  }

  const style = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : null,
    backgroundPosition: imagePosition || null,
  };
  return (
    <Link to={href} style={style}>
      {children}
    </Link>
  );
}
