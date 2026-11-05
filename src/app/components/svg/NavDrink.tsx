import React from 'react';

interface NavDrinkProps {
  title?: string;
}

/**
 * Cocktail glass silhouette for Drinks nav.
 */
export default function NavDrink({ title }: NavDrinkProps) {
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
        <path d="M1090 4429 c-19 -6 -46 -22 -59 -36 -29 -33 -25 -85 10 -135 13 -18 360 -461 771 -985 l748 -952 0 -650 0 -651 -230 0 -231 0 -24 -25 c-32 -31 -32 -75 -1 -112 l24 -28 545 0 545 0 26 24 c32 30 34 78 5 115 l-20 26 -235 0 -234 0 0 650 0 650 748 953 c412 523 758 966 771 983 55 75 31 151 -53 173 -58 14 -3053 14 -3106 0z m2943 -172 c-4 -8 -64 -84 -131 -170 l-124 -157 -1132 0 -1133 0 -123 158 c-68 86 -128 163 -133 170 -8 9 271 12 1387 12 1157 0 1396 -2 1389 -13z m-409 -519 c-4 -7 -226 -291 -493 -631 -379 -483 -487 -615 -496 -605 -18 20 -960 1221 -969 1236 -6 9 193 12 979 12 786 0 985 -3 979 -12z" />
      </g>
    </svg>
  );
}
