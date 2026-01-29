interface ScrollOffset {
  top: number;
  left: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface ElementBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface ScrollUtility {
  stopScrolling(element: HTMLElement): void;
  startScrolling(element: HTMLElement, axis: 'x' | 'y'): void;
}

interface InstancesUtility {
  get(element: HTMLElement): ElementInstance | null;
}

interface ElementInstance {
  event: EventBinder;
  ownerDocument: Document;
}

interface EventBinder {
  bind(target: Window | Document | HTMLElement, eventName: string, handler: EventListener): void;
}

interface UpdateUtility {
  (element: HTMLElement): void;
}

interface SetScrollUtility {
  (element: HTMLElement, axis: 'top' | 'left', value: number): void;
}

declare const scrollUtility: ScrollUtility;
declare const instancesUtility: InstancesUtility;
declare const updateUtility: UpdateUtility;
declare const setScrollUtility: SetScrollUtility;

function initializeSelectionScroll(element: HTMLElement, instance: ElementInstance): void {
  let scrollInterval: NodeJS.Timeout | null = null;
  const scrollOffset: ScrollOffset = {
    top: 0,
    left: 0
  };

  function stopAutoScroll(): void {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    scrollUtility.stopScrolling(element);
  }

  let isSelecting = false;

  instance.event.bind(instance.ownerDocument, 'selectionchange', (): void => {
    const selection = window.getSelection?.() ?? document.getSelection?.() ?? null;
    
    if (selection && selection.toString().length !== 0) {
      const range = selection.getRangeAt(0);
      const ancestorContainer = range.commonAncestorContainer;
      
      if (element.contains(ancestorContainer)) {
        isSelecting = true;
      } else {
        isSelecting = false;
        stopAutoScroll();
      }
    } else {
      isSelecting = false;
      stopAutoScroll();
    }
  });

  instance.event.bind(window, 'mouseup', (): void => {
    if (isSelecting) {
      isSelecting = false;
      stopAutoScroll();
    }
  });

  instance.event.bind(window, 'keyup', (): void => {
    if (isSelecting) {
      isSelecting = false;
      stopAutoScroll();
    }
  });

  instance.event.bind(window, 'mousemove', (event: Event): void => {
    if (!isSelecting) {
      return;
    }

    const mouseEvent = event as MouseEvent;
    const mousePosition: MousePosition = {
      x: mouseEvent.pageX,
      y: mouseEvent.pageY
    };

    const elementBounds: ElementBounds = {
      left: element.offsetLeft,
      right: element.offsetLeft + element.offsetWidth,
      top: element.offsetTop,
      bottom: element.offsetTop + element.offsetHeight
    };

    const edgeThreshold = 3;
    const slowScrollSpeed = 5;
    const fastScrollSpeed = 20;
    const fastScrollThreshold = 5;

    if (mousePosition.x < elementBounds.left + edgeThreshold) {
      scrollOffset.left = -slowScrollSpeed;
      scrollUtility.startScrolling(element, 'x');
    } else if (mousePosition.x > elementBounds.right - edgeThreshold) {
      scrollOffset.left = slowScrollSpeed;
      scrollUtility.startScrolling(element, 'x');
    } else {
      scrollOffset.left = 0;
    }

    if (mousePosition.y < elementBounds.top + edgeThreshold) {
      const distanceFromEdge = elementBounds.top + edgeThreshold - mousePosition.y;
      scrollOffset.top = distanceFromEdge < fastScrollThreshold ? -slowScrollSpeed : -fastScrollSpeed;
      scrollUtility.startScrolling(element, 'y');
    } else if (mousePosition.y > elementBounds.bottom - edgeThreshold) {
      const distanceFromEdge = mousePosition.y - elementBounds.bottom + edgeThreshold;
      scrollOffset.top = distanceFromEdge < fastScrollThreshold ? slowScrollSpeed : fastScrollSpeed;
      scrollUtility.startScrolling(element, 'y');
    } else {
      scrollOffset.top = 0;
    }

    if (scrollOffset.top === 0 && scrollOffset.left === 0) {
      stopAutoScroll();
    } else if (!scrollInterval) {
      const scrollIntervalDelay = 50;
      scrollInterval = setInterval((): void => {
        if (instancesUtility.get(element)) {
          setScrollUtility(element, 'top', element.scrollTop + scrollOffset.top);
          setScrollUtility(element, 'left', element.scrollLeft + scrollOffset.left);
          updateUtility(element);
        } else {
          if (scrollInterval) {
            clearInterval(scrollInterval);
          }
        }
      }, scrollIntervalDelay);
    }
  });
}

export default function setupSelectionScroll(element: HTMLElement): void {
  const instance = instancesUtility.get(element);
  if (instance) {
    initializeSelectionScroll(element, instance);
  }
}