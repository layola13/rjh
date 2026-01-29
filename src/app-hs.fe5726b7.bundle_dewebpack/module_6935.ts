export default function applyStyles(cssText: string, element: HTMLElement): void {
  const styleElement = element as HTMLStyleElement;
  
  if (styleElement.styleSheet) {
    (styleElement.styleSheet as CSSStyleSheet & { cssText: string }).cssText = cssText;
  } else {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(document.createTextNode(cssText));
  }
}