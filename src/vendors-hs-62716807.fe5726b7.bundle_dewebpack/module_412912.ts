type ScrollMode = 'if-needed' | 'always';
type BlockAlignment = 'start' | 'center' | 'end' | 'nearest';
type InlineAlignment = 'start' | 'center' | 'end' | 'nearest';

interface ScrollOptions {
  scrollMode: ScrollMode;
  block: BlockAlignment;
  inline: InlineAlignment;
  boundary: Element | ((element: Element) => boolean);
  skipOverflowHiddenElements: boolean;
}

interface ScrollAction {
  el: Element;
  top: number;
  left: number;
}

function isElement(target: unknown): target is Element {
  return typeof target === "object" && target != null && (target as Element).nodeType === 1;
}

function isOverflowProperty(value: string, skipOverflowHidden: boolean): boolean {
  return (!skipOverflowHidden || value !== "hidden") && value !== "visible" && value !== "clip";
}

function isScrollableFrame(element: Element): boolean {
  const frameElement = getFrameElement(element);
  return !!frameElement && (
    frameElement.clientHeight < element.scrollHeight ||
    frameElement.clientWidth < element.scrollWidth
  );
}

function getFrameElement(element: Element): Element | null {
  if (!element.ownerDocument || !element.ownerDocument.defaultView) {
    return null;
  }
  try {
    return element.ownerDocument.defaultView.frameElement as Element | null;
  } catch (error) {
    return null;
  }
}

function isScrollable(element: Element, skipOverflowHidden: boolean): boolean {
  if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
    const computedStyle = getComputedStyle(element, null);
    return (
      isOverflowProperty(computedStyle.overflowY, skipOverflowHidden) ||
      isOverflowProperty(computedStyle.overflowX, skipOverflowHidden) ||
      isScrollableFrame(element)
    );
  }
  return false;
}

function computeScrollOffset(
  viewportStart: number,
  viewportEnd: number,
  viewportSize: number,
  borderStart: number,
  borderEnd: number,
  targetStart: number,
  targetEnd: number,
  targetSize: number
): number {
  if (targetStart < viewportStart && targetEnd > viewportEnd || targetStart > viewportStart && targetEnd < viewportEnd) {
    return 0;
  }
  if (targetStart <= viewportStart && targetEnd <= viewportEnd || targetEnd >= viewportEnd && targetEnd >= viewportEnd) {
    return targetStart - viewportStart - borderStart;
  }
  if (targetEnd > viewportEnd && targetEnd < viewportEnd || targetStart < viewportStart && targetEnd > viewportEnd) {
    return targetEnd - viewportEnd + borderEnd;
  }
  return 0;
}

function getParentElement(element: Element): Element | null {
  const parentElement = element.parentElement;
  if (parentElement == null) {
    const rootNode = element.getRootNode() as DocumentFragment | Document;
    return (rootNode as ShadowRoot).host || null;
  }
  return parentElement;
}

export default function computeScrollIntoView(
  target: Element,
  options: ScrollOptions
): ScrollAction[] {
  const windowObject = window;
  const { scrollMode, block, inline, boundary, skipOverflowHiddenElements } = options;

  const boundaryCheck = typeof boundary === "function" 
    ? boundary 
    : (element: Element) => element !== boundary;

  if (!isElement(target)) {
    throw new TypeError("Invalid target");
  }

  const scrollingElement = document.scrollingElement || document.documentElement;
  const scrollableAncestors: Element[] = [];

  let currentElement: Element | null = target;
  while (isElement(currentElement) && boundaryCheck(currentElement)) {
    currentElement = getParentElement(currentElement);

    if (currentElement === scrollingElement) {
      scrollableAncestors.push(currentElement);
      break;
    }

    if (
      currentElement != null &&
      currentElement === document.body &&
      isScrollable(currentElement, skipOverflowHiddenElements) &&
      !isScrollable(document.documentElement, skipOverflowHiddenElements)
    ) {
      continue;
    }

    if (currentElement != null && isScrollable(currentElement, skipOverflowHiddenElements)) {
      scrollableAncestors.push(currentElement);
    }
  }

  const viewportWidth = windowObject.visualViewport ? windowObject.visualViewport.width : innerWidth;
  const viewportHeight = windowObject.visualViewport ? windowObject.visualViewport.height : innerHeight;
  const scrollX = window.scrollX || pageXOffset;
  const scrollY = window.scrollY || pageYOffset;

  const targetRect = target.getBoundingClientRect();
  const targetHeight = targetRect.height;
  const targetWidth = targetRect.width;
  const targetTop = targetRect.top;
  const targetRight = targetRect.right;
  const targetBottom = targetRect.bottom;
  const targetLeft = targetRect.left;

  const alignedVertical = 
    block === "start" || block === "nearest" 
      ? targetTop 
      : block === "end" 
        ? targetBottom 
        : targetTop + targetHeight / 2;

  const alignedHorizontal = 
    inline === "center" 
      ? targetLeft + targetWidth / 2 
      : inline === "end" 
        ? targetRight 
        : targetLeft;

  const actions: ScrollAction[] = [];

  for (let i = 0; i < scrollableAncestors.length; i++) {
    const ancestor = scrollableAncestors[i];
    const ancestorRect = ancestor.getBoundingClientRect();
    const ancestorHeight = ancestorRect.height;
    const ancestorWidth = ancestorRect.width;
    const ancestorTop = ancestorRect.top;
    const ancestorRight = ancestorRect.right;
    const ancestorBottom = ancestorRect.bottom;
    const ancestorLeft = ancestorRect.left;

    if (
      scrollMode === "if-needed" &&
      targetTop >= 0 &&
      targetLeft >= 0 &&
      targetBottom <= viewportHeight &&
      targetRight <= viewportWidth &&
      targetTop >= ancestorTop &&
      targetBottom <= ancestorBottom &&
      targetLeft >= ancestorLeft &&
      targetRight <= ancestorRight
    ) {
      return actions;
    }

    const computedStyle = getComputedStyle(ancestor);
    const borderLeft = parseInt(computedStyle.borderLeftWidth, 10);
    const borderTop = parseInt(computedStyle.borderTopWidth, 10);
    const borderRight = parseInt(computedStyle.borderRightWidth, 10);
    const borderBottom = parseInt(computedStyle.borderBottomWidth, 10);

    let scrollTop = 0;
    let scrollLeft = 0;

    const scrollbarWidth = "offsetWidth" in ancestor 
      ? (ancestor as HTMLElement).offsetWidth - (ancestor as HTMLElement).clientWidth - borderLeft - borderRight 
      : 0;
    const scrollbarHeight = "offsetHeight" in ancestor 
      ? (ancestor as HTMLElement).offsetHeight - (ancestor as HTMLElement).clientHeight - borderTop - borderBottom 
      : 0;

    const widthScale = "offsetWidth" in ancestor 
      ? (ancestor as HTMLElement).offsetWidth === 0 
        ? 0 
        : ancestorWidth / (ancestor as HTMLElement).offsetWidth 
      : 0;
    const heightScale = "offsetHeight" in ancestor 
      ? (ancestor as HTMLElement).offsetHeight === 0 
        ? 0 
        : ancestorHeight / (ancestor as HTMLElement).offsetHeight 
      : 0;

    if (ancestor === scrollingElement) {
      scrollTop = 
        block === "start" 
          ? alignedVertical 
          : block === "end" 
            ? alignedVertical - viewportHeight 
            : block === "nearest" 
              ? computeScrollOffset(scrollY, scrollY + viewportHeight, viewportHeight, borderTop, borderBottom, scrollY + alignedVertical, scrollY + alignedVertical + targetHeight, targetHeight) 
              : alignedVertical - viewportHeight / 2;

      scrollLeft = 
        inline === "start" 
          ? alignedHorizontal 
          : inline === "center" 
            ? alignedHorizontal - viewportWidth / 2 
            : inline === "end" 
              ? alignedHorizontal - viewportWidth 
              : computeScrollOffset(scrollX, scrollX + viewportWidth, viewportWidth, borderLeft, borderRight, scrollX + alignedHorizontal, scrollX + alignedHorizontal + targetWidth, targetWidth);

      scrollTop = Math.max(0, scrollTop + scrollY);
      scrollLeft = Math.max(0, scrollLeft + scrollX);
    } else {
      scrollTop = 
        block === "start" 
          ? alignedVertical - ancestorTop - borderTop 
          : block === "end" 
            ? alignedVertical - ancestorBottom + borderBottom + scrollbarHeight 
            : block === "nearest" 
              ? computeScrollOffset(ancestorTop, ancestorBottom, ancestorHeight, borderTop, borderBottom + scrollbarHeight, alignedVertical, alignedVertical + targetHeight, targetHeight) 
              : alignedVertical - (ancestorTop + ancestorHeight / 2) + scrollbarHeight / 2;

      scrollLeft = 
        inline === "start" 
          ? alignedHorizontal - ancestorLeft - borderLeft 
          : inline === "center" 
            ? alignedHorizontal - (ancestorLeft + ancestorWidth / 2) + scrollbarWidth / 2 
            : inline === "end" 
              ? alignedHorizontal - ancestorRight + borderRight + scrollbarWidth 
              : computeScrollOffset(ancestorLeft, ancestorRight, ancestorWidth, borderLeft, borderRight + scrollbarWidth, alignedHorizontal, alignedHorizontal + targetWidth, targetWidth);

      const currentScrollLeft = (ancestor as Element).scrollLeft;
      const currentScrollTop = (ancestor as Element).scrollTop;

      const htmlAncestor = ancestor as HTMLElement;
      scrollTop = Math.max(0, Math.min(currentScrollTop + scrollTop / heightScale, htmlAncestor.scrollHeight - ancestorHeight / heightScale + scrollbarHeight));
      scrollLeft = Math.max(0, Math.min(currentScrollLeft + scrollLeft / widthScale, htmlAncestor.scrollWidth - ancestorWidth / widthScale + scrollbarWidth));

      alignedVertical += currentScrollTop - scrollTop;
      alignedHorizontal += currentScrollLeft - scrollLeft;
    }

    actions.push({
      el: ancestor,
      top: scrollTop,
      left: scrollLeft
    });
  }

  return actions;
}