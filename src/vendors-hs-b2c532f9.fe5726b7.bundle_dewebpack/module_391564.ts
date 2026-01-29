interface ScrollbarSettings {
  minScrollbarLength?: number;
  maxScrollbarLength?: number;
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  scrollXMarginOffset: number;
  scrollYMarginOffset: number;
}

interface ScrollbarState {
  containerWidth: number;
  containerHeight: number;
  contentWidth: number;
  contentHeight: number;
  scrollbarXRail: HTMLElement;
  scrollbarYRail: HTMLElement;
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  settings: ScrollbarSettings;
  scrollbarXActive: boolean;
  scrollbarYActive: boolean;
  railXWidth: number;
  railXMarginWidth: number;
  railXRatio: number;
  scrollbarXWidth: number;
  scrollbarXLeft: number;
  railYHeight: number;
  railYMarginHeight: number;
  railYRatio: number;
  scrollbarYHeight: number;
  scrollbarYTop: number;
  negativeScrollAdjustment: number;
  isRtl: boolean;
  isScrollbarXUsingBottom: boolean;
  isScrollbarYUsingRight: boolean;
  scrollbarXBottom: number;
  scrollbarXTop: number;
  scrollbarYRight: number;
  scrollbarYLeft: number;
  scrollbarYOuterWidth: number;
  railBorderXWidth: number;
  railBorderYWidth: number;
}

interface MathUtils {
  toInt(value: number): number;
}

interface DomUtils {
  queryChildren(element: HTMLElement, selector: string): HTMLElement[];
  remove(element: HTMLElement): void;
  appendTo(child: HTMLElement, parent: HTMLElement): void;
  css(element: HTMLElement, styles: Record<string, number | string>): void;
}

interface StateManager {
  get(element: HTMLElement): ScrollbarState;
}

declare const mathUtils: MathUtils;
declare const domUtils: DomUtils;
declare const stateManager: StateManager;
declare const setScroll: (element: HTMLElement, direction: string, value: number) => void;

function constrainScrollbarLength(state: ScrollbarState, length: number): number {
  let constrainedLength = length;

  if (state.settings.minScrollbarLength) {
    constrainedLength = Math.max(constrainedLength, state.settings.minScrollbarLength);
  }

  if (state.settings.maxScrollbarLength) {
    constrainedLength = Math.min(constrainedLength, state.settings.maxScrollbarLength);
  }

  return constrainedLength;
}

function updateScrollbarPositions(element: HTMLElement, state: ScrollbarState): void {
  const xRailStyles: Record<string, number | string> = {
    width: state.railXWidth
  };

  if (state.isRtl) {
    xRailStyles.left = state.negativeScrollAdjustment + element.scrollLeft + state.containerWidth - state.contentWidth;
  } else {
    xRailStyles.left = element.scrollLeft;
  }

  if (state.isScrollbarXUsingBottom) {
    xRailStyles.bottom = state.scrollbarXBottom - element.scrollTop;
  } else {
    xRailStyles.top = state.scrollbarXTop + element.scrollTop;
  }

  domUtils.css(state.scrollbarXRail, xRailStyles);

  const yRailStyles: Record<string, number | string> = {
    top: element.scrollTop,
    height: state.railYHeight
  };

  if (state.isScrollbarYUsingRight) {
    if (state.isRtl) {
      yRailStyles.right = state.contentWidth - (state.negativeScrollAdjustment + element.scrollLeft) - state.scrollbarYRight - state.scrollbarYOuterWidth;
    } else {
      yRailStyles.right = state.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (state.isRtl) {
      yRailStyles.left = state.negativeScrollAdjustment + element.scrollLeft + 2 * state.containerWidth - state.contentWidth - state.scrollbarYLeft - state.scrollbarYOuterWidth;
    } else {
      yRailStyles.left = state.scrollbarYLeft + element.scrollLeft;
    }
  }

  domUtils.css(state.scrollbarYRail, yRailStyles);

  domUtils.css(state.scrollbarX, {
    left: state.scrollbarXLeft,
    width: state.scrollbarXWidth - state.railBorderXWidth
  });

  domUtils.css(state.scrollbarY, {
    top: state.scrollbarYTop,
    height: state.scrollbarYHeight - state.railBorderYWidth
  });
}

export function updateScrollbar(element: HTMLElement): void {
  const state = stateManager.get(element);

  state.containerWidth = element.clientWidth;
  state.containerHeight = element.clientHeight;
  state.contentWidth = element.scrollWidth;
  state.contentHeight = element.scrollHeight;

  if (!element.contains(state.scrollbarXRail)) {
    const existingXRails = domUtils.queryChildren(element, ".ps__scrollbar-x-rail");
    existingXRails.forEach(rail => domUtils.remove(rail));
    domUtils.appendTo(state.scrollbarXRail, element);
  }

  if (!element.contains(state.scrollbarYRail)) {
    const existingYRails = domUtils.queryChildren(element, ".ps__scrollbar-y-rail");
    existingYRails.forEach(rail => domUtils.remove(rail));
    domUtils.appendTo(state.scrollbarYRail, element);
  }

  if (!state.settings.suppressScrollX && state.containerWidth + state.settings.scrollXMarginOffset < state.contentWidth) {
    state.scrollbarXActive = true;
    state.railXWidth = state.containerWidth - state.railXMarginWidth;
    state.railXRatio = state.containerWidth / state.railXWidth;
    state.scrollbarXWidth = constrainScrollbarLength(
      state,
      mathUtils.toInt(state.railXWidth * state.containerWidth / state.contentWidth)
    );
    state.scrollbarXLeft = mathUtils.toInt(
      (state.negativeScrollAdjustment + element.scrollLeft) * (state.railXWidth - state.scrollbarXWidth) / (state.contentWidth - state.containerWidth)
    );
  } else {
    state.scrollbarXActive = false;
  }

  if (!state.settings.suppressScrollY && state.containerHeight + state.settings.scrollYMarginOffset < state.contentHeight) {
    state.scrollbarYActive = true;
    state.railYHeight = state.containerHeight - state.railYMarginHeight;
    state.railYRatio = state.containerHeight / state.railYHeight;
    state.scrollbarYHeight = constrainScrollbarLength(
      state,
      mathUtils.toInt(state.railYHeight * state.containerHeight / state.contentHeight)
    );
    state.scrollbarYTop = mathUtils.toInt(
      element.scrollTop * (state.railYHeight - state.scrollbarYHeight) / (state.contentHeight - state.containerHeight)
    );
  } else {
    state.scrollbarYActive = false;
  }

  if (state.scrollbarXLeft >= state.railXWidth - state.scrollbarXWidth) {
    state.scrollbarXLeft = state.railXWidth - state.scrollbarXWidth;
  }

  if (state.scrollbarYTop >= state.railYHeight - state.scrollbarYHeight) {
    state.scrollbarYTop = state.railYHeight - state.scrollbarYHeight;
  }

  updateScrollbarPositions(element, state);

  if (state.scrollbarXActive) {
    element.classList.add("ps--active-x");
  } else {
    element.classList.remove("ps--active-x");
    state.scrollbarXWidth = 0;
    state.scrollbarXLeft = 0;
    setScroll(element, "left", 0);
  }

  if (state.scrollbarYActive) {
    element.classList.add("ps--active-y");
  } else {
    element.classList.remove("ps--active-y");
    state.scrollbarYHeight = 0;
    state.scrollbarYTop = 0;
    setScroll(element, "top", 0);
  }
}