import React from 'react';

interface NavTagProps {
  title?: string;
}

/**
 * Price-tag silhouette for Tags nav.
 */
export default function NavTag({ title }: NavTagProps) {
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
        <path d="M1493 3308 c-530 -530 -963 -967 -963 -973 0 -6 405 -415 900 -910 l900 -900 970 970 970 970 -2 900 -3 900 -905 3 -905 2 -962 -962z m2605 7 l2 -780 -885 -885 -885 -885 -782 783 -783 782 885 885 885 885 780 -2 780 -3 3 -780z" />
        <path d="M2996 3481 l-139 -139 48 -180 c26 -99 51 -186 55 -192 4 -6 92 -34 195 -62 l188 -50 138 139 138 138 -51 191 -52 192 -180 48 c-100 26 -186 49 -191 51 -6 2 -73 -59 -149 -136z m288 -76 c49 -13 91 -26 93 -28 2 -3 15 -46 29 -98 l25 -93 -69 -69 -69 -69 -93 26 c-51 14 -95 27 -97 30 -3 2 -16 46 -30 96 l-25 93 68 68 c38 38 71 69 74 69 3 0 45 -11 94 -25z" />
      </g>
    </svg>
  );
}
