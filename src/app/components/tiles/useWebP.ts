import { useState, useEffect } from 'react';

export default function useWebP(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    canUseWebP().then((bool) => setSupported(bool));
  });

  return supported;
}

function canUseWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      resolve(!!(img.height > 0 && img.width > 0));
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src =
      'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}
