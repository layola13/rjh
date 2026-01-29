interface ScrollDimensions {
  containerHeight: number;
  contentHeight: number;
  pageY: number;
  railYHeight: number;
  scrollbarY: HTMLElement;
  scrollbarYHeight: number;
  scrollTop: number;
  y: number;
  scrollbarYRail: HTMLElement;
  containerWidth: number;
  contentWidth: number;
  pageX: number;
  railXWidth: number;
  scrollbarX: HTMLElement;
  scrollbarXWidth: number;
  scrollLeft: number;
  x: number;
  scrollbarXRail: HTMLElement;
}

function bindScrollbarDrag(
  element: HTMLElement,
  verticalProps: Array<keyof Pick<ScrollDimensions, 'containerHeight' | 'contentHeight' | 'pageY' | 'railYHeight' | 'scrollbarY' | 'scrollbarYHeight' | 'scrollTop' | 'y' | 'scrollbarYRail'>>,
  horizontalProps: Array<keyof Pick<ScrollDimensions, 'containerWidth' | 'contentWidth' | 'pageX' | 'railXWidth' | 'scrollbarX' | 'scrollbarXWidth' | 'scrollLeft' | 'x' | 'scrollbarXRail'>>
): void {
  b(element, verticalProps);
  b(element, horizontalProps);
}

function b(element: HTMLElement, properties: readonly string[]): void {
  // Implementation would bind drag handlers for the specified scrollbar properties
}

export function moduleDragThumb(element: HTMLElement): void {
  bindScrollbarDrag(
    element,
    ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"],
    ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]
  );
}