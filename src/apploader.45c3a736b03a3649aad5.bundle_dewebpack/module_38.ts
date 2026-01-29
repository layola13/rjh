export function setNonce(element: HTMLElement): void {
  const nonce = typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : undefined;
  
  if (nonce) {
    element.setAttribute("nonce", nonce);
  }
}