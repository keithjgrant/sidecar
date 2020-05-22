import React from 'react';
import styled, { css } from 'styled-components';

const FillPath = styled.path`
  transition: transform 0.2s var(--ease-out-cubic);
  transform-origin: center;

  ${(props) =>
    props.isFilled
      ? css`
          transition: transform 0.2s var(--ease-out-back);
        `
      : ''}
`;

export default function Star({ isFilled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
    >
      <title>Favorite</title>
      <g>
        <FillPath
          d=" M 122.307 501.42 C 114.133 501.42 106.016 498.86 99.076 493.82 C 86.789 484.898 80.748 470.058 83.311 455.09 L 105.296 326.702 L 11.996 235.805 C 1.12 225.209 -2.724 209.654 1.964 195.211 C 6.652 180.769 18.9 170.438 33.925 168.251 L 162.824 149.486 L 220.44 32.663 C 227.157 19.045 240.762 10.582 255.947 10.579 L 255.958 10.579 C 271.139 10.579 284.743 19.033 291.465 32.644 L 301.336 52.632 Q 321 95 349.143 149.436 L 478.052 168.132 C 493.079 170.312 505.331 180.635 510.028 195.075 C 514.724 209.515 510.889 225.073 500.018 235.675 L 406.767 326.621 L 428.82 454.997 C 431.391 469.963 425.358 484.806 413.076 493.735 C 400.795 502.665 384.814 503.823 371.37 496.76 L 256.059 436.176 L 140.781 496.821 C 134.936 499.9 128.604 501.42 122.307 501.42 L 122.307 501.42 Z "
          transform={isFilled ? 'scale(1)' : 'scale(0)'}
          isFilled={isFilled}
        />
        <path d=" M 122.307 501.42 C 114.133 501.42 106.016 498.86 99.076 493.82 C 86.789 484.898 80.748 470.058 83.311 455.09 L 105.296 326.702 L 11.996 235.805 C 1.12 225.209 -2.724 209.654 1.964 195.211 C 6.652 180.769 18.9 170.438 33.925 168.251 L 162.824 149.486 L 220.44 32.663 C 227.157 19.045 240.762 10.582 255.947 10.579 L 255.958 10.579 C 271.139 10.579 284.743 19.033 291.465 32.644 L 301.336 52.632 C 303.781 57.584 301.75 63.581 296.796 66.026 C 291.846 68.471 285.848 66.44 283.402 61.487 L 273.532 41.5 C 270.155 34.662 263.584 30.579 255.957 30.579 C 255.955 30.579 255.954 30.579 255.951 30.579 C 248.322 30.581 241.751 34.667 238.376 41.51 L 178.435 163.048 C 176.979 166 174.164 168.046 170.907 168.52 L 36.805 188.042 C 29.255 189.141 23.341 194.13 20.986 201.387 C 18.63 208.644 20.486 216.156 25.951 221.48 L 123.016 316.045 C 125.373 318.342 126.45 321.651 125.894 324.896 L 103.022 458.466 C 101.734 465.986 104.651 473.154 110.825 477.636 C 116.999 482.119 124.716 482.675 131.469 479.122 L 251.4 416.029 C 254.313 414.496 257.793 414.496 260.707 416.027 L 380.671 479.056 C 387.426 482.605 395.143 482.045 401.315 477.558 C 407.486 473.072 410.399 465.903 409.108 458.383 L 386.165 324.826 C 385.607 321.582 386.682 318.272 389.039 315.973 L 486.054 221.357 C 491.516 216.03 493.368 208.517 491.008 201.261 C 488.648 194.006 482.732 189.02 475.181 187.925 L 341.069 168.474 C 337.812 168.001 334.996 165.956 333.538 163.005 L 323.266 142.204 C 320.821 137.252 322.852 131.255 327.805 128.81 C 332.757 126.363 338.753 128.397 341.199 133.349 L 349.143 149.436 L 478.052 168.132 C 493.079 170.312 505.331 180.635 510.028 195.075 C 514.724 209.515 510.889 225.073 500.018 235.675 L 406.767 326.621 L 428.82 454.997 C 431.391 469.963 425.358 484.806 413.076 493.735 C 400.795 502.665 384.814 503.823 371.37 496.76 L 256.059 436.176 L 140.781 496.821 C 134.936 499.9 128.604 501.42 122.307 501.42 L 122.307 501.42 Z " />
        <path d=" M 312.251 107.44 C 309.621 107.44 307.041 106.38 305.181 104.51 C 303.321 102.65 302.251 100.08 302.251 97.44 C 302.251 94.81 303.321 92.24 305.181 90.37 C 307.041 88.51 309.621 87.44 312.251 87.44 C 314.891 87.44 317.461 88.51 319.321 90.37 C 321.181 92.23 322.251 94.81 322.251 97.44 C 322.251 100.08 321.181 102.65 319.321 104.51 C 317.461 106.38 314.881 107.44 312.251 107.44 Z " />
      </g>
    </svg>
  );
}
