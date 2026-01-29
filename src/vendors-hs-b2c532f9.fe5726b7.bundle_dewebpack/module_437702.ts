import { isEditable } from './utils';
import { matches } from './dom';
import { get as getInstanceData } from './instances';
import { updateGeometry } from './update-geometry';
import { updateScroll } from './update-scroll';

interface ScrollbarInstance {
  scrollbarX: HTMLElement;
  scrollbarY: HTMLElement;
  scrollbarXActive: boolean;
  scrollbarYActive: boolean;
  contentWidth: number;
  contentHeight: number;
  containerWidth: number;
  containerHeight: number;
  ownerDocument: Document;
  settings: {
    wheelPropagation: boolean;
  };
  event: {
    bind: (element: HTMLElement | Document, eventName: string, handler: EventListener) => void;
  };
}

function shouldPreventDefault(deltaX: number, deltaY: number, element: HTMLElement, instance: ScrollbarInstance): boolean {
  const currentScrollTop = element.scrollTop;

  if (deltaX === 0) {
    if (!instance.scrollbarYActive) {
      return false;
    }

    const atTop = currentScrollTop === 0 && deltaY > 0;
    const atBottom = currentScrollTop >= instance.contentHeight - instance.containerHeight && deltaY < 0;

    if (atTop || atBottom) {
      return !instance.settings.wheelPropagation;
    }
  }

  const currentScrollLeft = element.scrollLeft;

  if (deltaY === 0) {
    if (!instance.scrollbarXActive) {
      return false;
    }

    const atLeft = currentScrollLeft === 0 && deltaX < 0;
    const atRight = currentScrollLeft >= instance.contentWidth - instance.containerWidth && deltaX > 0;

    if (atLeft || atRight) {
      return !instance.settings.wheelPropagation;
    }
  }

  return true;
}

function initializeKeyboardHandler(element: HTMLElement, instance: ScrollbarInstance): void {
  let isMouseInside = false;

  instance.event.bind(element, 'mouseenter', () => {
    isMouseInside = true;
  });

  instance.event.bind(element, 'mouseleave', () => {
    isMouseInside = false;
  });

  let shouldPrevent = false;

  instance.event.bind(instance.ownerDocument, 'keydown', (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.isDefaultPrevented?.() || keyboardEvent.defaultPrevented) {
      return;
    }

    const scrollbarXFocused = matches(instance.scrollbarX, ':focus');
    const scrollbarYFocused = matches(instance.scrollbarY, ':focus');

    if (!isMouseInside && !scrollbarXFocused && !scrollbarYFocused) {
      return;
    }

    let activeElement: Element | null = document.activeElement ?? instance.ownerDocument.activeElement;

    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = (activeElement as HTMLIFrameElement).contentDocument?.activeElement ?? null;
      } else {
        while (activeElement?.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }

      if (activeElement && isEditable(activeElement as HTMLElement)) {
        return;
      }
    }

    let deltaX = 0;
    let deltaY = 0;

    switch (keyboardEvent.which) {
      case 37: // Left arrow
        deltaX = keyboardEvent.metaKey ? -instance.contentWidth : keyboardEvent.altKey ? -instance.containerWidth : -30;
        break;
      case 38: // Up arrow
        deltaY = keyboardEvent.metaKey ? instance.contentHeight : keyboardEvent.altKey ? instance.containerHeight : 30;
        break;
      case 39: // Right arrow
        deltaX = keyboardEvent.metaKey ? instance.contentWidth : keyboardEvent.altKey ? instance.containerWidth : 30;
        break;
      case 40: // Down arrow
        deltaY = keyboardEvent.metaKey ? -instance.contentHeight : keyboardEvent.altKey ? -instance.containerHeight : -30;
        break;
      case 33: // Page up
        deltaY = 90;
        break;
      case 32: // Space
        deltaY = keyboardEvent.shiftKey ? 90 : -90;
        break;
      case 34: // Page down
        deltaY = -90;
        break;
      case 35: // End
        deltaY = keyboardEvent.ctrlKey ? -instance.contentHeight : -instance.containerHeight;
        break;
      case 36: // Home
        deltaY = keyboardEvent.ctrlKey ? element.scrollTop : instance.containerHeight;
        break;
      default:
        return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY, element, instance);

    if (shouldPrevent) {
      keyboardEvent.preventDefault();
    }
  });
}

export default function initializeKeyboard(element: HTMLElement): void {
  const instance = getInstanceData(element);
  initializeKeyboardHandler(element, instance);
}