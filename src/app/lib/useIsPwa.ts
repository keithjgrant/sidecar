import { useState, useEffect } from 'react';
import isPwa from './isPwa';

export default function useIsPwa(): boolean {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const update = () => setInstalled(isPwa());
    update();

    const mq = window.matchMedia('(display-mode: standalone)');
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return installed;
}
