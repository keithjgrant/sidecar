import React from 'react';

interface NavHamburgerProps {
  title?: string;
}

/**
 * Three-line menu icon for More / overflow nav.
 */
export default function NavHamburger({ title }: NavHamburgerProps) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <g
        transform="translate(0,512) scale(0.1,-0.1)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M523 3700 c-17 -10 -37 -28 -42 -39 -18 -33 -13 -86 11 -116 46 -58 -84 -55 2067 -55 1374 0 1988 3 2008 11 52 19 83 58 83 104 0 47 -19 79 -60 100 -25 13 -274 15 -2032 15 -1966 0 -2004 0 -2035 -20z" />
        <path d="M535 2544 c-16 -8 -38 -25 -47 -37 -22 -28 -23 -95 -2 -125 39 -55 -97 -52 2074 -52 2171 0 2035 -3 2074 52 21 30 20 97 -2 124 -9 12 -31 29 -49 38 -29 15 -214 16 -2025 16 -1777 0 -1996 -2 -2023 -16z" />
        <path d="M553 1389 c-111 -32 -107 -187 5 -219 51 -14 3953 -14 4004 0 115 32 115 188 0 220 -48 13 -3963 12 -4009 -1z" />
      </g>
    </svg>
  );
}
