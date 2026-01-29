import { toInt } from './utils';
import { css } from './dom-utils';
import { get } from './instances';
import { updateScrollbarGeometry } from './update-geometry';
import { updateScroll } from './update-scroll';

interface ScrollbarState {
  negativeScrollAdjustment: number;
  isNegativeScroll: boolean;
  scrollbarXRail: HTMLElement;
  scrollbarYRail: HTMLElement;
  railXMarginWidth: number;
  railYMarginHeight: number;
}

export function updateScrollbarLayout(element: HTMLElement): void {
  const state = get(element);
  
  if (!state) {
    return;
  }

  state.negativeScrollAdjustment = state.isNegativeScroll 
    ? element.scrollWidth - element.clientWidth 
    : 0;

  css(state.scrollbarXRail, 'display', 'block');
  css(state.scrollbarYRail, 'display', 'block');

  state.railXMarginWidth = 
    toInt(css(state.scrollbarXRail, 'marginLeft')) + 
    toInt(css(state.scrollbarXRail, 'marginRight'));

  state.railYMarginHeight = 
    toInt(css(state.scrollbarYRail, 'marginTop')) + 
    toInt(css(state.scrollbarYRail, 'marginBottom'));

  css(state.scrollbarXRail, 'display', 'none');
  css(state.scrollbarYRail, 'display', 'none');

  updateScrollbarGeometry(element);

  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  css(state.scrollbarXRail, 'display', '');
  css(state.scrollbarYRail, 'display', '');
}