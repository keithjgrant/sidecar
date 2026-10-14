export function click(): void {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(10);
  }
}

export function long(): void {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(150);
  }
}
