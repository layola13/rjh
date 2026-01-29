interface ScrollState {
  contentHeight: number;
  containerHeight: number;
  contentWidth: number;
  containerWidth: number;
  lastTop?: number;
  lastLeft?: number;
}

type ScrollAxis = 'top' | 'left';

const SCROLL_END_THRESHOLD = 2;

const createCustomEvent = (eventName: string): Event => {
  const event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  return event;
};

const scrollStateMap = new WeakMap<Element, ScrollState>();

const getScrollState = (element: Element): ScrollState => {
  const state = scrollStateMap.get(element);
  if (!state) {
    throw new Error('Scroll state not found for element');
  }
  return state;
};

export const updateScroll = (
  element: HTMLElement,
  axis: ScrollAxis,
  value: number
): void => {
  if (element === undefined) {
    throw new Error('You must provide an element to the update-scroll function');
  }
  if (axis === undefined) {
    throw new Error('You must provide an axis to the update-scroll function');
  }
  if (value === undefined) {
    throw new Error('You must provide a value to the update-scroll function');
  }

  let scrollValue = value;

  if (axis === 'top' && scrollValue <= 0) {
    element.scrollTop = scrollValue = 0;
    element.dispatchEvent(createCustomEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && scrollValue <= 0) {
    element.scrollLeft = scrollValue = 0;
    element.dispatchEvent(createCustomEvent('ps-x-reach-start'));
  }

  const state = getScrollState(element);

  if (axis === 'top' && scrollValue >= state.contentHeight - state.containerHeight) {
    const maxScroll = state.contentHeight - state.containerHeight;
    if (maxScroll - element.scrollTop <= SCROLL_END_THRESHOLD) {
      scrollValue = element.scrollTop;
    } else {
      element.scrollTop = scrollValue = maxScroll;
    }
    element.dispatchEvent(createCustomEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && scrollValue >= state.contentWidth - state.containerWidth) {
    const maxScroll = state.contentWidth - state.containerWidth;
    if (maxScroll - element.scrollLeft <= SCROLL_END_THRESHOLD) {
      scrollValue = element.scrollLeft;
    } else {
      element.scrollLeft = scrollValue = maxScroll;
    }
    element.dispatchEvent(createCustomEvent('ps-x-reach-end'));
  }

  if (state.lastTop === undefined) {
    state.lastTop = element.scrollTop;
  }

  if (state.lastLeft === undefined) {
    state.lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && scrollValue < state.lastTop) {
    element.dispatchEvent(createCustomEvent('ps-scroll-up'));
  }

  if (axis === 'top' && scrollValue > state.lastTop) {
    element.dispatchEvent(createCustomEvent('ps-scroll-down'));
  }

  if (axis === 'left' && scrollValue < state.lastLeft) {
    element.dispatchEvent(createCustomEvent('ps-scroll-left'));
  }

  if (axis === 'left' && scrollValue > state.lastLeft) {
    element.dispatchEvent(createCustomEvent('ps-scroll-right'));
  }

  if (axis === 'top' && scrollValue !== state.lastTop) {
    element.scrollTop = state.lastTop = scrollValue;
    element.dispatchEvent(createCustomEvent('ps-scroll-y'));
  }

  if (axis === 'left' && scrollValue !== state.lastLeft) {
    element.scrollLeft = state.lastLeft = scrollValue;
    element.dispatchEvent(createCustomEvent('ps-scroll-x'));
  }
};