import React from 'react';

export const GatsbyImage = ({
  alt,
  ...rest
}: {
  alt?: string;
  [key: string]: unknown;
}): React.ReactElement => React.createElement('img', { alt, ...rest });

export const getImage = (): undefined => undefined;

export const StaticImage = ({
  alt,
  ...rest
}: {
  alt?: string;
  [key: string]: unknown;
}): React.ReactElement => React.createElement('img', { alt, ...rest });
