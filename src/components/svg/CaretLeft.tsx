import React from 'react';

interface CaretLeftProps {
  title?: string;
}

export default function CaretLeft({ title }: CaretLeftProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 157.934 296.447"
    >
      <title>{title || 'Back'}</title>
      <path d=" M 143.394 0.925 Q 88.576 55.496 2.929 140.755 C -0.977 144.661 -0.976 150.993 2.929 154.897 Q 120.894 272.3 143.394 294.925 C 152.019 300.425 161.769 289.925 156.394 280.925 Q 111.144 235.55 24.142 147.826 Q 125.019 46.55 156.394 14.925 C 161.019 6.05 153.144 -2.95 143.394 0.925 Z " />
    </svg>
  );
}
