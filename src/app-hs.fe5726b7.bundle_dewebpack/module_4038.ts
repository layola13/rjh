export function setNonceAttribute(element: HTMLElement): void {
  const nonce = (globalThis as any).__webpack_nonce__;
  if (nonce) {
    element.setAttribute("nonce", nonce);
  }
}