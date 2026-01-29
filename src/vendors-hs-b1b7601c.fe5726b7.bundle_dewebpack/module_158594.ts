interface ScrollOptions {
  block?: 'start' | 'end' | 'center' | 'nearest';
  inline?: 'start' | 'end' | 'center' | 'nearest';
  behavior?: ScrollBehavior | ((actions: ScrollAction[]) => void);
}

interface ScrollAction {
  el: Element;
  top: number;
  left: number;
}

function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return value === Object(value) && Object.keys(value as object).length !== 0;
}

function normalizeScrollOptions(options: boolean | ScrollOptions): Required<Pick<ScrollOptions, 'block' | 'inline'>> & Pick<ScrollOptions, 'behavior'> {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }
  
  if (isNonEmptyObject(options)) {
    return options as Required<Pick<ScrollOptions, 'block' | 'inline'>> & Pick<ScrollOptions, 'behavior'>;
  }
  
  return {
    block: 'start',
    inline: 'nearest'
  };
}

function performScroll(actions: ScrollAction[], behavior: ScrollBehavior = 'auto'): void {
  const isScrollBehaviorSupported = 'scrollBehavior' in document.body.style;
  
  actions.forEach((action) => {
    const { el, top, left } = action;
    
    if (el.scroll && isScrollBehaviorSupported) {
      el.scroll({
        top,
        left,
        behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function scrollIntoView(element: Element, options?: boolean | ScrollOptions): void {
  const isConnected = (element as HTMLElement).isConnected || element.ownerDocument.documentElement.contains(element);
  
  if (isNonEmptyObject(options) && typeof options.behavior === 'function') {
    const scrollActions = isConnected ? computeScrollIntoView(element, options) : [];
    return options.behavior(scrollActions);
  }
  
  if (isConnected) {
    const normalizedOptions = normalizeScrollOptions(options ?? true);
    const scrollActions = computeScrollIntoView(element, normalizedOptions);
    performScroll(scrollActions, normalizedOptions.behavior as ScrollBehavior);
  }
}

// Note: computeScrollIntoView is imported from module 412912
// You need to provide its implementation or import it separately
declare function computeScrollIntoView(element: Element, options: ScrollOptions): ScrollAction[];

export default scrollIntoView;