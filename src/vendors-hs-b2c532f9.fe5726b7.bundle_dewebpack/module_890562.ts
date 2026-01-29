interface ScrollbarState {
  scrollbarYActive: boolean;
  scrollbarXActive: boolean;
  contentHeight: number;
  containerHeight: number;
  contentWidth: number;
  containerWidth: number;
  settings: ScrollbarSettings;
  event: EventManager;
}

interface ScrollbarSettings {
  wheelSpeed: number;
  useBothWheelAxes: boolean;
  wheelPropagation: boolean;
}

interface EventManager {
  bind(element: HTMLElement, eventName: string, handler: EventListener): void;
}

interface WheelEventData {
  deltaX?: number;
  deltaY?: number;
  wheelDeltaX?: number;
  wheelDeltaY?: number;
  deltaMode?: number;
  wheelDelta?: number;
  shiftKey?: boolean;
}

const WHEEL_DELTA_DIVISOR = 6;
const DELTA_MODE_LINE_MULTIPLIER = 10;

function normalizeWheelDelta(event: WheelEventData): [number, number] {
  let deltaX = event.deltaX;
  let deltaY = event.deltaY !== undefined ? -1 * event.deltaY : undefined;

  if (deltaX === undefined || deltaY === undefined) {
    deltaX = event.wheelDeltaX !== undefined ? -1 * event.wheelDeltaX / WHEEL_DELTA_DIVISOR : 0;
    deltaY = event.wheelDeltaY !== undefined ? event.wheelDeltaY / WHEEL_DELTA_DIVISOR : 0;
  }

  if (event.deltaMode && event.deltaMode === 1) {
    deltaX *= DELTA_MODE_LINE_MULTIPLIER;
    deltaY *= DELTA_MODE_LINE_MULTIPLIER;
  }

  if (deltaX !== deltaX && deltaY !== deltaY) {
    deltaX = 0;
    deltaY = event.wheelDelta ?? 0;
  }

  return event.shiftKey ? [-deltaY, -deltaX] : [deltaX, deltaY];
}

function isScrollableChildHovered(element: HTMLElement, deltaX: number, deltaY: number): boolean {
  const hoveredChild = element.querySelector<HTMLElement>(
    "textarea:hover, select[multiple]:hover, .ps-child:hover"
  );

  if (!hoveredChild) {
    return false;
  }

  const computedStyle = window.getComputedStyle(hoveredChild);
  const overflowValues = [
    computedStyle.overflow,
    computedStyle.overflowX,
    computedStyle.overflowY
  ].join("");

  if (!overflowValues.match(/(scroll|auto)/)) {
    return false;
  }

  const verticalScrollableHeight = hoveredChild.scrollHeight - hoveredChild.clientHeight;
  if (verticalScrollableHeight > 0) {
    const isAtTop = hoveredChild.scrollTop === 0 && deltaY > 0;
    const isAtBottom = hoveredChild.scrollTop === verticalScrollableHeight && deltaY < 0;
    if (!(isAtTop || isAtBottom)) {
      return true;
    }
  }

  const horizontalScrollableWidth = hoveredChild.scrollLeft - hoveredChild.clientWidth;
  if (horizontalScrollableWidth > 0) {
    const isAtLeft = hoveredChild.scrollLeft === 0 && deltaX < 0;
    const isAtRight = hoveredChild.scrollLeft === horizontalScrollableWidth && deltaX > 0;
    if (!(isAtLeft || isAtRight)) {
      return true;
    }
  }

  return false;
}

function shouldPreventPropagation(
  element: HTMLElement,
  state: ScrollbarState,
  deltaX: number,
  deltaY: number
): boolean {
  const currentScrollTop = element.scrollTop;

  if (deltaX === 0) {
    if (!state.scrollbarYActive) {
      return false;
    }
    const isAtTop = currentScrollTop === 0 && deltaY > 0;
    const isAtBottom = currentScrollTop >= state.contentHeight - state.containerHeight && deltaY < 0;
    if (isAtTop || isAtBottom) {
      return !state.settings.wheelPropagation;
    }
  }

  const currentScrollLeft = element.scrollLeft;

  if (deltaY === 0) {
    if (!state.scrollbarXActive) {
      return false;
    }
    const isAtLeft = currentScrollLeft === 0 && deltaX < 0;
    const isAtRight = currentScrollLeft >= state.contentWidth - state.containerWidth && deltaX > 0;
    if (isAtLeft || isAtRight) {
      return !state.settings.wheelPropagation;
    }
  }

  return true;
}

function setupWheelHandler(
  element: HTMLElement,
  state: ScrollbarState,
  updateGeometry: (element: HTMLElement) => void,
  setScrollPosition: (element: HTMLElement, axis: string, value: number) => void
): void {
  function handleWheel(event: Event): void {
    const wheelEvent = event as WheelEvent;
    const [deltaX, deltaY] = normalizeWheelDelta(wheelEvent);

    if (isScrollableChildHovered(element, deltaX, deltaY)) {
      return;
    }

    let shouldPreventDefault = false;

    if (state.settings.useBothWheelAxes) {
      if (state.scrollbarYActive && !state.scrollbarXActive) {
        const newScrollTop = deltaY
          ? element.scrollTop - deltaY * state.settings.wheelSpeed
          : element.scrollTop + deltaX * state.settings.wheelSpeed;
        setScrollPosition(element, "top", newScrollTop);
        shouldPreventDefault = true;
      } else if (state.scrollbarXActive && !state.scrollbarYActive) {
        const newScrollLeft = deltaX
          ? element.scrollLeft + deltaX * state.settings.wheelSpeed
          : element.scrollLeft - deltaY * state.settings.wheelSpeed;
        setScrollPosition(element, "left", newScrollLeft);
        shouldPreventDefault = true;
      }
    } else {
      setScrollPosition(element, "top", element.scrollTop - deltaY * state.settings.wheelSpeed);
      setScrollPosition(element, "left", element.scrollLeft + deltaX * state.settings.wheelSpeed);
    }

    updateGeometry(element);

    shouldPreventDefault =
      shouldPreventDefault || shouldPreventPropagation(element, state, deltaX, deltaY);

    if (shouldPreventDefault) {
      wheelEvent.stopPropagation();
      wheelEvent.preventDefault();
    }
  }

  if (window.onwheel !== undefined) {
    state.event.bind(element, "wheel", handleWheel);
  } else if (window.onmousewheel !== undefined) {
    state.event.bind(element, "mousewheel", handleWheel);
  }
}

export default function initializeWheelHandler(
  element: HTMLElement,
  getState: (element: HTMLElement) => ScrollbarState,
  updateGeometry: (element: HTMLElement) => void,
  setScrollPosition: (element: HTMLElement, axis: string, value: number) => void
): void {
  const state = getState(element);
  setupWheelHandler(element, state, updateGeometry, setScrollPosition);
}