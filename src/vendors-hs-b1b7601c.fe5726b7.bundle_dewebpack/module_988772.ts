export function setNonceAttribute(element: HTMLElement): void {
  const nonce: string | undefined = (globalThis as any).__webpack_nonce__;
  
  if (nonce) {
    element.setAttribute("nonce", nonce);
  }
}