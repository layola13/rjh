export function isWindow(element: unknown): element is Window {
  return element != null && element === (element as Window).window;
}

export default function getScroll(
  element: Window | Document | Element | null | undefined,
  isVertical: boolean
): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const scrollProperty: "scrollTop" | "scrollLeft" = isVertical ? "scrollTop" : "scrollLeft";
  let scrollValue = 0;

  if (isWindow(element)) {
    scrollValue = element[isVertical ? "pageYOffset" : "pageXOffset"];
  } else if (element instanceof Document) {
    scrollValue = element.documentElement[scrollProperty];
  } else if (element) {
    scrollValue = element[scrollProperty];
  }

  if (element && !isWindow(element) && typeof scrollValue !== "number") {
    const ownerDoc = (element as Element).ownerDocument || (element as Document);
    scrollValue = ownerDoc.documentElement[scrollProperty];
  }

  return scrollValue;
}