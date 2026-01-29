interface TouchState {
  pageX: number;
  pageY: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface ScrollElement extends Element {
  scrollTop: number;
  scrollLeft: number;
}

interface PerfectScrollbarInstance {
  settings: {
    swipePropagation: boolean;
    swipeEasing: boolean;
  };
  event: {
    bind(target: EventTarget, eventName: string, handler: EventListener): void;
  };
  contentHeight: number;
  containerHeight: number;
  contentWidth: number;
  containerWidth: number;
}

interface Environment {
  supportsTouch: boolean;
  supportsIePointer: boolean;
}

interface EnvironmentModule {
  env: Environment;
}

interface InstanceRegistry {
  get(element: Element): PerfectScrollbarInstance | null;
}

interface UpdateFunction {
  (element: Element): void;
}

interface SetScrollFunction {
  (element: Element, axis: string, value: number): void;
}

function initializeSwipeHandlers(
  element: ScrollElement,
  instance: PerfectScrollbarInstance,
  supportsTouch: boolean,
  supportsPointer: boolean
): void {
  function updateScrollPosition(deltaX: number, deltaY: number): void {
    setScroll(element, "top", element.scrollTop - deltaY);
    setScroll(element, "left", element.scrollLeft - deltaX);
    updateElement(element);
  }

  const touchState: TouchState = { pageX: 0, pageY: 0 };
  let lastTouchTime = 0;
  const velocity: Velocity = { x: 0, y: 0 };
  let intervalId: number | null = null;
  let isWindowTouched = false;
  let isElementTouched = false;

  function handleWindowTouchStart(): void {
    isWindowTouched = true;
  }

  function handleWindowTouchEnd(): void {
    isWindowTouched = false;
  }

  function extractTouchPoint(event: TouchEvent | PointerEvent): Touch | PointerEvent {
    return (event as TouchEvent).targetTouches
      ? (event as TouchEvent).targetTouches[0]
      : (event as PointerEvent);
  }

  function isValidTouchEvent(event: TouchEvent | PointerEvent): boolean {
    const pointerEvent = event as PointerEvent;
    const touchEvent = event as TouchEvent;

    if (pointerEvent.pointerType && pointerEvent.pointerType === "pen" && pointerEvent.buttons === 0) {
      return false;
    }

    if (touchEvent.targetTouches && touchEvent.targetTouches.length === 1) {
      return true;
    }

    if (pointerEvent.pointerType && 
        (pointerEvent.pointerType === "mouse" || pointerEvent.pointerType === pointerEvent.MSPOINTER_TYPE_MOUSE)) {
      return false;
    }

    return true;
  }

  function handleElementTouchStart(event: Event): void {
    if (!isValidTouchEvent(event as TouchEvent | PointerEvent)) {
      return;
    }

    isElementTouched = true;
    const point = extractTouchPoint(event as TouchEvent | PointerEvent);
    touchState.pageX = point.pageX;
    touchState.pageY = point.pageY;
    lastTouchTime = new Date().getTime();

    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    event.stopPropagation();
  }

  function handleElementTouchMove(event: Event): void {
    const touchEvent = event as TouchEvent | PointerEvent;

    if (!isElementTouched && instance.settings.swipePropagation) {
      handleElementTouchStart(event);
    }

    if (isWindowTouched || !isElementTouched || !isValidTouchEvent(touchEvent)) {
      return;
    }

    const point = extractTouchPoint(touchEvent);
    const currentPosition: TouchState = {
      pageX: point.pageX,
      pageY: point.pageY
    };

    const deltaX = currentPosition.pageX - touchState.pageX;
    const deltaY = currentPosition.pageY - touchState.pageY;

    updateScrollPosition(deltaX, deltaY);
    touchState.pageX = currentPosition.pageX;
    touchState.pageY = currentPosition.pageY;

    const currentTime = new Date().getTime();
    const timeDelta = currentTime - lastTouchTime;

    if (timeDelta > 0) {
      velocity.x = deltaX / timeDelta;
      velocity.y = deltaY / timeDelta;
      lastTouchTime = currentTime;
    }

    if (shouldPreventDefault(deltaX, deltaY)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  function shouldPreventDefault(deltaX: number, deltaY: number): boolean {
    const currentScrollTop = element.scrollTop;
    const currentScrollLeft = element.scrollLeft;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaY > absDeltaX) {
      const isAtBottom = deltaY < 0 && currentScrollTop === instance.contentHeight - instance.containerHeight;
      const isAtTop = deltaY > 0 && currentScrollTop === 0;

      if (isAtBottom || isAtTop) {
        return !instance.settings.swipePropagation;
      }
    } else if (absDeltaX > absDeltaY) {
      const isAtRight = deltaX < 0 && currentScrollLeft === instance.contentWidth - instance.containerWidth;
      const isAtLeft = deltaX > 0 && currentScrollLeft === 0;

      if (isAtRight || isAtLeft) {
        return !instance.settings.swipePropagation;
      }
    }

    return true;
  }

  function handleElementTouchEnd(): void {
    if (isWindowTouched || !isElementTouched) {
      return;
    }

    isElementTouched = false;

    if (instance.settings.swipeEasing) {
      clearInterval(intervalId!);
      intervalId = window.setInterval(() => {
        if (!instanceRegistry.get(element)) {
          clearInterval(intervalId!);
          return;
        }

        if (!velocity.x && !velocity.y) {
          clearInterval(intervalId!);
          return;
        }

        const minVelocityThreshold = 0.01;
        if (Math.abs(velocity.x) < minVelocityThreshold && Math.abs(velocity.y) < minVelocityThreshold) {
          clearInterval(intervalId!);
          return;
        }

        const easingMultiplier = 30;
        const dampingFactor = 0.8;

        updateScrollPosition(easingMultiplier * velocity.x, easingMultiplier * velocity.y);
        velocity.x *= dampingFactor;
        velocity.y *= dampingFactor;
      }, 10);
    }
  }

  if (supportsTouch) {
    instance.event.bind(window, "touchstart", handleWindowTouchStart);
    instance.event.bind(window, "touchend", handleWindowTouchEnd);
    instance.event.bind(element, "touchstart", handleElementTouchStart);
    instance.event.bind(element, "touchmove", handleElementTouchMove);
    instance.event.bind(element, "touchend", handleElementTouchEnd);
  } else if (supportsPointer) {
    if (window.PointerEvent) {
      instance.event.bind(window, "pointerdown", handleWindowTouchStart);
      instance.event.bind(window, "pointerup", handleWindowTouchEnd);
      instance.event.bind(element, "pointerdown", handleElementTouchStart);
      instance.event.bind(element, "pointermove", handleElementTouchMove);
      instance.event.bind(element, "pointerup", handleElementTouchEnd);
    } else if ((window as any).MSPointerEvent) {
      instance.event.bind(window, "MSPointerDown", handleWindowTouchStart);
      instance.event.bind(window, "MSPointerUp", handleWindowTouchEnd);
      instance.event.bind(element, "MSPointerDown", handleElementTouchStart);
      instance.event.bind(element, "MSPointerMove", handleElementTouchMove);
      instance.event.bind(element, "MSPointerUp", handleElementTouchEnd);
    }
  }
}

declare const environmentModule: EnvironmentModule;
declare const instanceRegistry: InstanceRegistry;
declare const updateElement: UpdateFunction;
declare const setScroll: SetScrollFunction;

export default function initializeSwipe(element: ScrollElement): void {
  const environment = environmentModule.env;
  
  if (!environment.supportsTouch && !environment.supportsIePointer) {
    return;
  }

  const instance = instanceRegistry.get(element);
  if (!instance) {
    return;
  }

  initializeSwipeHandlers(
    element,
    instance,
    environment.supportsTouch,
    environment.supportsIePointer
  );
}