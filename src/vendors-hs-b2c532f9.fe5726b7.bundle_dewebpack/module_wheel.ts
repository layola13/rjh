interface ScrollbarElement {
  element: HTMLElement;
  settings: ScrollSettings;
  scrollbarYActive: boolean;
  scrollbarXActive: boolean;
  event: EventManager;
}

interface ScrollSettings {
  wheelSpeed: number;
  useBothWheelAxes: boolean;
  wheelPropagation: boolean;
}

interface EventManager {
  bind(element: HTMLElement, eventName: string, handler: EventListener): void;
}

interface NormalizedWheelDelta {
  deltaX: number;
  deltaY: number;
}

const WHEEL_DELTA_DIVISOR = 6;
const DELTA_LINE_MULTIPLIER = 10;

const CONSUMING_CLASS = 'ps__child--consume';

function getComputedStyle(element: HTMLElement): CSSStyleDeclaration {
  return window.getComputedStyle(element);
}

function normalizeWheelDelta(event: WheelEvent): [number, number] {
  let deltaX = event.deltaX;
  let deltaY = -1 * event.deltaY;

  if (deltaX === undefined || deltaY === undefined) {
    deltaX = -1 * (event as any).wheelDeltaX / WHEEL_DELTA_DIVISOR;
    deltaY = (event as any).wheelDeltaY / WHEEL_DELTA_DIVISOR;
  }

  if (event.deltaMode === 1) {
    deltaX *= DELTA_LINE_MULTIPLIER;
    deltaY *= DELTA_LINE_MULTIPLIER;
  }

  if (deltaX !== deltaX && deltaY !== deltaY) {
    deltaX = 0;
    deltaY = (event as any).wheelDelta;
  }

  if (event.shiftKey) {
    return [-deltaY, -deltaX];
  }

  return [deltaX, deltaY];
}

function shouldPreventScroll(
  target: EventTarget | null,
  container: HTMLElement,
  deltaX: number,
  deltaY: number
): boolean {
  const isWebKit = 'WebkitAppearance' in document.documentElement.style;
  
  if (!isWebKit && container.querySelector('select:focus')) {
    return true;
  }

  if (!(target instanceof HTMLElement) || !container.contains(target)) {
    return false;
  }

  let currentElement: HTMLElement | null = target;

  while (currentElement && currentElement !== container) {
    if (currentElement.classList.contains(CONSUMING_CLASS)) {
      return true;
    }

    const computedStyle = getComputedStyle(currentElement);

    if (deltaY && computedStyle.overflowY.match(/(scroll|auto)/)) {
      const maxScrollTop = currentElement.scrollHeight - currentElement.clientHeight;
      if (maxScrollTop > 0) {
        const canScrollUp = currentElement.scrollTop > 0 && deltaY < 0;
        const canScrollDown = currentElement.scrollTop < maxScrollTop && deltaY > 0;
        if (canScrollUp || canScrollDown) {
          return true;
        }
      }
    }

    if (deltaX && computedStyle.overflowX.match(/(scroll|auto)/)) {
      const maxScrollLeft = currentElement.scrollWidth - currentElement.clientWidth;
      if (maxScrollLeft > 0) {
        const canScrollLeft = currentElement.scrollLeft > 0 && deltaX < 0;
        const canScrollRight = currentElement.scrollLeft < maxScrollLeft && deltaX > 0;
        if (canScrollLeft || canScrollRight) {
          return true;
        }
      }
    }

    currentElement = currentElement.parentElement;
  }

  return false;
}

function shouldStopPropagation(
  container: HTMLElement,
  deltaX: number,
  deltaY: number
): boolean {
  const scrollTop = Math.floor(container.scrollTop);
  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop + container.offsetHeight === container.scrollHeight;
  const isAtLeft = container.scrollLeft === 0;
  const isAtRight = container.scrollLeft + container.offsetWidth === container.scrollWidth;

  const isVerticalScroll = Math.abs(deltaY) > Math.abs(deltaX);
  const isAtEdge = isVerticalScroll ? (isAtTop || isAtBottom) : (isAtLeft || isAtRight);

  return !isAtEdge;
}

function updateScrollbar(scrollbar: ScrollbarElement): void {
  // Placeholder for scrollbar update logic
}

function initializeWheelHandler(scrollbar: ScrollbarElement): void {
  const container = scrollbar.element;

  function handleWheel(event: Event): void {
    const wheelEvent = event as WheelEvent;
    const [deltaX, deltaY] = normalizeWheelDelta(wheelEvent);

    if (shouldPreventScroll(wheelEvent.target, container, deltaX, deltaY)) {
      return;
    }

    let shouldPrevent = false;

    if (scrollbar.settings.useBothWheelAxes) {
      if (scrollbar.scrollbarYActive && !scrollbar.scrollbarXActive) {
        if (deltaY) {
          container.scrollTop -= deltaY * scrollbar.settings.wheelSpeed;
        } else {
          container.scrollTop += deltaX * scrollbar.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (scrollbar.scrollbarXActive && !scrollbar.scrollbarYActive) {
        if (deltaX) {
          container.scrollLeft += deltaX * scrollbar.settings.wheelSpeed;
        } else {
          container.scrollLeft -= deltaY * scrollbar.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }
    } else {
      container.scrollTop -= deltaY * scrollbar.settings.wheelSpeed;
      container.scrollLeft += deltaX * scrollbar.settings.wheelSpeed;
    }

    updateScrollbar(scrollbar);

    shouldPrevent = shouldPrevent || 
      (shouldStopPropagation(container, deltaX, deltaY) || !scrollbar.settings.wheelPropagation);

    if (shouldPrevent && !wheelEvent.ctrlKey) {
      wheelEvent.stopPropagation();
      wheelEvent.preventDefault();
    }
  }

  if (window.onwheel !== undefined) {
    scrollbar.event.bind(container, 'wheel', handleWheel);
  } else if ((window as any).onmousewheel !== undefined) {
    scrollbar.event.bind(container, 'mousewheel', handleWheel);
  }
}