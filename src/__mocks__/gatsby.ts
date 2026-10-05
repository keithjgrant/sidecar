import React from 'react';

export const graphql = (): void => undefined;

export const Link = ({
  to,
  children,
  ...rest
}: {
  to: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}): React.ReactElement =>
  React.createElement('a', { href: to, ...rest }, children);

export const navigate = (): void => undefined;

export const useStaticQuery = (): Record<string, unknown> => ({});

export const StaticQuery = ({
  render,
}: {
  render: (data: Record<string, unknown>) => React.ReactNode;
}): React.ReactNode => render({});
