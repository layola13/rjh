import { toInt, startScrolling, stopScrolling } from './utils';
import { css } from './dom';
import { get } from './instances';
import { updateScroll } from './update-scroll';
import { updateGeometry } from './update-geometry';

interface ScrollbarState {
  railXRatio: number;
  railYRatio: number;
  scrollbarXRail: HTMLElement;
  scrollbarYRail: HTMLElement;
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  railXWidth: number;
  railYHeight: number;
  scrollbarXWidth: number;
  scrollbarYHeight: number;
  scrollbarXLeft: number;
  scrollbarYTop: number;
  contentWidth: number;
  contentHeight: number;
  containerWidth: number;
  containerHeight: number;
  negativeScrollAdjustment: number;
  ownerDocument: Document;
  event: {
    bind: (element: HTMLElement | Document, eventName: string, handler: EventListener) => void;
    unbind: (element: HTMLElement | Document, eventName: string, handler: EventListener) => void;
    once: (element: HTMLElement | Document, eventName: string, handler: EventListener) => void;
  };
}

function initializeHorizontalDrag(element: HTMLElement, state: ScrollbarState): void {
  let initialScrollbarLeft: number | null = null;
  let initialPageX: number | null = null;

  const handleMouseMove = (event: MouseEvent): void => {
    updateHorizontalPosition(event.pageX - initialPageX!);
    updateGeometry(element);
    event.stopPropagation();
    event.preventDefault();
  };

  const updateHorizontalPosition = (deltaX: number): void => {
    const newScrollbarLeft = initialScrollbarLeft! + deltaX * state.railXRatio;
    const maxScrollbarLeft = Math.max(0, state.scrollbarXRail.getBoundingClientRect().left) + 
      state.railXRatio * (state.railXWidth - state.scrollbarXWidth);
    
    state.scrollbarXLeft = newScrollbarLeft < 0 ? 0 : 
                           newScrollbarLeft > maxScrollbarLeft ? maxScrollbarLeft : 
                           newScrollbarLeft;
    
    const scrollLeft = toInt(
      state.scrollbarXLeft * (state.contentWidth - state.containerWidth) / 
      (state.containerWidth - state.railXRatio * state.scrollbarXWidth)
    ) - state.negativeScrollAdjustment;
    
    updateScroll(element, 'left', scrollLeft);
  };

  const handleMouseUp = (): void => {
    stopScrolling(element, 'x');
    state.event.unbind(state.ownerDocument, 'mousemove', handleMouseMove as EventListener);
  };

  state.event.bind(state.scrollbarX, 'mousedown', ((event: MouseEvent): void => {
    initialPageX = event.pageX;
    initialScrollbarLeft = toInt(css(state.scrollbarX, 'left')) * state.railXRatio;
    startScrolling(element, 'x');
    state.event.bind(state.ownerDocument, 'mousemove', handleMouseMove as EventListener);
    state.event.once(state.ownerDocument, 'mouseup', handleMouseUp as EventListener);
    event.stopPropagation();
    event.preventDefault();
  }) as EventListener);
}

function initializeVerticalDrag(element: HTMLElement, state: ScrollbarState): void {
  let initialScrollbarTop: number | null = null;
  let initialPageY: number | null = null;

  const handleMouseMove = (event: MouseEvent): void => {
    updateVerticalPosition(event.pageY - initialPageY!);
    updateGeometry(element);
    event.stopPropagation();
    event.preventDefault();
  };

  const updateVerticalPosition = (deltaY: number): void => {
    const newScrollbarTop = initialScrollbarTop! + deltaY * state.railYRatio;
    const maxScrollbarTop = Math.max(0, state.scrollbarYRail.getBoundingClientRect().top) + 
      state.railYRatio * (state.railYHeight - state.scrollbarYHeight);
    
    state.scrollbarYTop = newScrollbarTop < 0 ? 0 : 
                          newScrollbarTop > maxScrollbarTop ? maxScrollbarTop : 
                          newScrollbarTop;
    
    const scrollTop = toInt(
      state.scrollbarYTop * (state.contentHeight - state.containerHeight) / 
      (state.containerHeight - state.railYRatio * state.scrollbarYHeight)
    );
    
    updateScroll(element, 'top', scrollTop);
  };

  const handleMouseUp = (): void => {
    stopScrolling(element, 'y');
    state.event.unbind(state.ownerDocument, 'mousemove', handleMouseMove as EventListener);
  };

  state.event.bind(state.scrollbarY, 'mousedown', ((event: MouseEvent): void => {
    initialPageY = event.pageY;
    initialScrollbarTop = toInt(css(state.scrollbarY, 'top')) * state.railYRatio;
    startScrolling(element, 'y');
    state.event.bind(state.ownerDocument, 'mousemove', handleMouseMove as EventListener);
    state.event.once(state.ownerDocument, 'mouseup', handleMouseUp as EventListener);
    event.stopPropagation();
    event.preventDefault();
  }) as EventListener);
}

export function initializeDraggableScrollbars(element: HTMLElement): void {
  const state = get(element);
  initializeHorizontalDrag(element, state);
  initializeVerticalDrag(element, state);
}