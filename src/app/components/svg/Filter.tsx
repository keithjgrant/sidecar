import React from 'react';

interface FilterProps {
  title?: string;
}

export default function Filter({ title }: FilterProps) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
    >
      {title ? <title>{title}</title> : null}
      <g
        transform="translate(0,512) scale(0.1,-0.1)"
        fill="none"
        stroke="currentColor"
        strokeWidth="600"
      >
        <path
          d="M205 5104 c-112 -41 -170 -187 -116 -293 11 -21 397 -569 857 -1217
461 -648 851 -1203 867 -1231 15 -29 34 -67 40 -85 8 -24 13 -318 17 -1073 6
-1150 1 -1075 70 -1142 46 -45 108 -67 168 -60 68 9 1027 378 1070 412 19 15
43 46 53 69 18 39 19 81 19 861 0 905 0 905 62 1016 18 33 409 589 869 1237
460 647 844 1192 853 1211 10 18 20 56 23 85 7 72 -34 149 -102 191 l-48 30
-2331 2 c-2020 1 -2336 0 -2371 -13z"
        />
      </g>
    </svg>
  );
}
