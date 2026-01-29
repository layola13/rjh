import { get as getScrollbarState } from './scrollbar-state';
import { updateGeometry } from './update-geometry';
import { setScrollTop, setScrollLeft } from './scroll-handler';

interface ScrollbarState {
  scrollbarY: HTMLElement;
  scrollbarYRail: HTMLElement;
  scrollbarYTop: number;
  scrollbarX: HTMLElement;
  scrollbarXRail: HTMLElement;
  scrollbarXLeft: number;
  containerHeight: number;
  containerWidth: number;
  event: {
    bind: (element: HTMLElement, eventName: string, handler: EventListener) => void;
  };
}

interface ScrollableElement extends HTMLElement {
  scrollTop: number;
  scrollLeft: number;
}

/**
 * Initializes click handlers for scrollbar rails to enable jump-to-click scrolling.
 * Clicking on the rail above/below the thumb scrolls by one container height/width.
 * 
 * @param element - The scrollable container element
 */
export function initializeRailClickHandlers(element: ScrollableElement): void {
  const state = getScrollbarState(element);

  setupVerticalRailClickHandler(element, state);
  setupHorizontalRailClickHandler(element, state);
}

function setupVerticalRailClickHandler(
  element: ScrollableElement,
  state: ScrollbarState
): void {
  const stopPropagation = (event: Event): void => {
    event.stopPropagation();
  };

  // Prevent clicks on the scrollbar thumb from bubbling to the rail
  state.event.bind(state.scrollbarY, 'click', stopPropagation);

  // Handle clicks on the vertical scrollbar rail
  state.event.bind(state.scrollbarXRail, 'click', (event: MouseEvent): void => {
    const railBounds = state.scrollbarYRail.getBoundingClientRect();
    const clickPosition = event.pageY - window.pageYOffset - railBounds.top;
    const direction = clickPosition > state.scrollbarYTop ? 1 : -1;
    
    const newScrollTop = element.scrollTop + direction * state.containerHeight;
    setScrollTop(element, 'top', newScrollTop);
    updateGeometry(element);
    
    event.stopPropagation();
  });
}

function setupHorizontalRailClickHandler(
  element: ScrollableElement,
  state: ScrollbarState
): void {
  const stopPropagation = (event: Event): void => {
    event.stopPropagation();
  };

  // Prevent clicks on the scrollbar thumb from bubbling to the rail
  state.event.bind(state.scrollbarX, 'click', stopPropagation);

  // Handle clicks on the horizontal scrollbar rail
  state.event.bind(state.scrollbarXRail, 'click', (event: MouseEvent): void => {
    const railBounds = state.scrollbarXRail.getBoundingClientRect();
    const clickPosition = event.pageX - window.pageXOffset - railBounds.left;
    const direction = clickPosition > state.scrollbarXLeft ? 1 : -1;
    
    const newScrollLeft = element.scrollLeft + direction * state.containerWidth;
    setScrollLeft(element, 'left', newScrollLeft);
    updateGeometry(element);
    
    event.stopPropagation();
  });
}