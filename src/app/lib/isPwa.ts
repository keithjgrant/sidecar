export default function isPwa(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  if (window.location.search.includes('pwa=1')) {
    return true;
  }
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone) ||
    document.referrer.includes('android-app://')
  );
}
