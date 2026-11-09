import { useState, useEffect } from 'react';

const DESKTOP_NAV_QUERY = '(min-width: 540px)';

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_NAV_QUERY);
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}
