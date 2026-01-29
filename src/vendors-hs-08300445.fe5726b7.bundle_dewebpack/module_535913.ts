export default function isElementVisible(element: Element | null | undefined): boolean {
  if (!element) {
    return false;
  }

  if (element instanceof Element) {
    if (element.offsetParent) {
      return true;
    }

    if ('getBBox' in element && typeof (element as any).getBBox === 'function') {
      const svgElement = element as SVGGraphicsElement;
      const boundingBox = svgElement.getBBox();
      const { width, height } = boundingBox;
      
      if (width || height) {
        return true;
      }
    }

    if (element.getBoundingClientRect) {
      const clientRect = element.getBoundingClientRect();
      const { width, height } = clientRect;
      
      if (width || height) {
        return true;
      }
    }
  }

  return false;
}