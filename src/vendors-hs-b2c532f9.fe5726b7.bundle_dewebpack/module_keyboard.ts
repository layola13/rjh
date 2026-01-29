interface ScrollbarInstance {
  element: HTMLElement;
  ownerDocument: Document;
  contentWidth: number;
  contentHeight: number;
  containerWidth: number;
  containerHeight: number;
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  scrollbarXActive: boolean;
  scrollbarYActive: boolean;
  settings: {
    suppressScrollX: boolean;
    suppressScrollY: boolean;
    wheelPropagation: boolean;
  };
  event: {
    bind: (element: Document | HTMLElement, eventName: string, handler: (event: KeyboardEvent) => void) => void;
  };
}

const SCROLL_STEP_DEFAULT = 30;

function isElementMatching(element: Element | null, selector: string): boolean {
  if (!element) return false;
  return element.matches(selector);
}

function getDeepActiveElement(ownerDocument: Document): Element | null {
  let activeElement = document.activeElement ?? ownerDocument.activeElement;
  
  if (!activeElement) return null;
  
  if (activeElement.tagName === "IFRAME") {
    const iframe = activeElement as HTMLIFrameElement;
    activeElement = iframe.contentDocument?.activeElement ?? null;
  }
  
  if (activeElement) {
    let shadowElement = activeElement as Element & { shadowRoot?: ShadowRoot };
    while (shadowElement.shadowRoot) {
      shadowElement = shadowElement.shadowRoot.activeElement as Element & { shadowRoot?: ShadowRoot };
    }
    activeElement = shadowElement;
  }
  
  return activeElement;
}

function isEditableElement(element: Element | null): boolean {
  if (!element) return false;
  
  return (
    isElementMatching(element, "input, [contenteditable]") ||
    isElementMatching(element, "select, [contenteditable]") ||
    isElementMatching(element, "textarea, [contenteditable]") ||
    isElementMatching(element, "button, [contenteditable]")
  );
}

function shouldPreventScroll(
  instance: ScrollbarInstance,
  deltaX: number,
  deltaY: number
): boolean {
  const scrollTop = Math.floor(instance.element.scrollTop);
  
  if (deltaY === 0) {
    if (!instance.scrollbarYActive) return false;
    
    const atTop = scrollTop === 0 && deltaY > 0;
    const atBottom = scrollTop >= instance.contentHeight - instance.containerHeight && deltaY < 0;
    
    if (atTop || atBottom) {
      return !instance.settings.wheelPropagation;
    }
  }
  
  const scrollLeft = instance.element.scrollLeft;
  
  if (deltaX === 0) {
    if (!instance.scrollbarXActive) return false;
    
    const atLeft = scrollLeft === 0 && deltaX < 0;
    const atRight = scrollLeft >= instance.contentWidth - instance.containerWidth && deltaX > 0;
    
    if (atLeft || atRight) {
      return !instance.settings.wheelPropagation;
    }
  }
  
  return true;
}

function updateScrollPosition(instance: ScrollbarInstance): void {
  // Placeholder for the actual update function (referenced as 'g' in original)
  // Implementation would trigger scroll bar position updates
}

export function initKeyboardModule(instance: ScrollbarInstance): void {
  const { element, ownerDocument, event } = instance;
  
  event.bind(ownerDocument, "keydown", (keyEvent: KeyboardEvent) => {
    const isDefaultPrevented = 
      (keyEvent.isDefaultPrevented && keyEvent.isDefaultPrevented()) || 
      keyEvent.defaultPrevented;
    
    if (isDefaultPrevented) return;
    
    const isHovering = isElementMatching(element, ":hover");
    const isScrollbarXFocused = isElementMatching(instance.scrollbarX, ":focus");
    const isScrollbarYFocused = isElementMatching(instance.scrollbarY, ":focus");
    
    if (!isHovering && !isScrollbarXFocused && !isScrollbarYFocused) return;
    
    const activeElement = getDeepActiveElement(ownerDocument);
    
    if (isEditableElement(activeElement)) return;
    
    let deltaX = 0;
    let deltaY = 0;
    
    switch (keyEvent.which) {
      case 37: // Left arrow
        deltaX = keyEvent.metaKey 
          ? -instance.contentWidth 
          : keyEvent.altKey 
            ? -instance.containerWidth 
            : -SCROLL_STEP_DEFAULT;
        break;
        
      case 38: // Up arrow
        deltaY = keyEvent.metaKey 
          ? instance.contentHeight 
          : keyEvent.altKey 
            ? instance.containerHeight 
            : SCROLL_STEP_DEFAULT;
        break;
        
      case 39: // Right arrow
        deltaX = keyEvent.metaKey 
          ? instance.contentWidth 
          : keyEvent.altKey 
            ? instance.containerWidth 
            : SCROLL_STEP_DEFAULT;
        break;
        
      case 40: // Down arrow
        deltaY = keyEvent.metaKey 
          ? -instance.contentHeight 
          : keyEvent.altKey 
            ? -instance.containerHeight 
            : -SCROLL_STEP_DEFAULT;
        break;
        
      case 32: // Space
        deltaY = keyEvent.shiftKey 
          ? instance.containerHeight 
          : -instance.containerHeight;
        break;
        
      case 33: // Page Up
        deltaY = instance.containerHeight;
        break;
        
      case 34: // Page Down
        deltaY = -instance.containerHeight;
        break;
        
      case 36: // Home
        deltaY = instance.contentHeight;
        break;
        
      case 35: // End
        deltaY = -instance.contentHeight;
        break;
        
      default:
        return;
    }
    
    const shouldSuppressX = instance.settings.suppressScrollX && deltaX !== 0;
    const shouldSuppressY = instance.settings.suppressScrollY && deltaY !== 0;
    
    if (shouldSuppressX || shouldSuppressY) return;
    
    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    
    updateScrollPosition(instance);
    
    if (shouldPreventScroll(instance, deltaX, deltaY)) {
      keyEvent.preventDefault();
    }
  });
}