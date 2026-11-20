import React from 'react';

interface NavStarProps {
  title?: string;
}

/**
 * Outline star silhouette for Favorites nav.
 * Distinct from Star.tsx, which animates fill for the favorite button.
 */
export default function NavStar({ title }: NavStarProps) {
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
        <path d="M2235 3949 c-176 -358 -324 -654 -330 -658 -5 -4 -332 -54 -725 -111 -393 -56 -717 -104 -720 -107 -5 -4 3 -12 590 -584 245 -238 446 -441 448 -450 2 -8 -52 -334 -118 -723 -67 -389 -120 -709 -117 -712 2 -2 295 149 651 336 l647 340 646 -340 c356 -187 648 -338 651 -336 2 3 -51 323 -118 712 -66 389 -120 715 -118 723 2 9 201 210 443 445 578 563 600 585 595 590 -3 2 -324 50 -715 106 -390 56 -716 105 -724 109 -8 4 -159 300 -335 659 -177 358 -323 652 -326 652 -3 0 -149 -293 -325 -651z m599 -272 l267 -542 582 -84 c320 -47 592 -87 604 -90 20 -5 -36 -63 -412 -429 -239 -233 -435 -430 -435 -437 0 -7 45 -275 100 -596 55 -320 99 -586 98 -589 -2 -4 -245 120 -540 275 l-538 283 -537 -283 c-296 -156 -539 -280 -541 -276 -1 4 43 270 98 591 55 321 100 589 100 596 0 7 -196 203 -435 436 -410 400 -433 423 -407 430 15 3 287 44 604 89 l576 83 268 543 c147 299 270 543 274 543 4 0 127 -244 274 -543z" />
      </g>
    </svg>
  );
}
