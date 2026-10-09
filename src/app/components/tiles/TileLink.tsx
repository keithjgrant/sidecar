import React from 'react';
import { Link } from 'gatsby';

export interface TileLinkProps {
  href: string;
  image?: { childImageSharp?: { gatsbyImageData?: { images?: { fallback?: { src?: string } } } } };
  imagePosition?: string;
  children: React.ReactNode;
}

export default function TileLink({ href, image, imagePosition, children }: TileLinkProps) {
  let imageUrl = '';
  if (image) {
    imageUrl = image.childImageSharp?.gatsbyImageData?.images?.fallback?.src ?? '';
  }

  const style: React.CSSProperties = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
    backgroundPosition: imagePosition || undefined,
  };
  return (
    <Link to={href} style={style}>
      {children}
    </Link>
  );
}
