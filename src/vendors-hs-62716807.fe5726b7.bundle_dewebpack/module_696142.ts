export default function hasClass(element: Element, className: string): boolean {
  return element.classList 
    ? !!className && element.classList.contains(className) 
    : (" " + ((element as SVGElement).className.baseVal || (element as HTMLElement).className) + " ").indexOf(" " + className + " ") !== -1;
}