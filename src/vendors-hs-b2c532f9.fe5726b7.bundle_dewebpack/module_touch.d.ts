/**
 * Touch module for handling touch and pointer events on scrollable elements.
 * Provides smooth touch scrolling with momentum/easing support.
 * @module TouchModule
 */

/**
 * Touch state tracking interface
 */
interface TouchState {
  /** Initial touch/pointer position when interaction started */
  startOffset: {
    pageX?: number;
    pageY?: number;
  };
  /** Timestamp when touch started (in milliseconds) */
  startTime: number;
  /** Current scrolling velocity */
  speed: {
    x?: number;
    y?: number;
  };
  /** Timer handle for momentum easing animation */
  easingLoop: number | null;
}

/**
 * Scroll element interface with perfect-scrollbar properties
 */
interface ScrollElement extends HTMLElement {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  contains(node: Node): boolean;
}

/**
 * Perfect-scrollbar instance interface
 */
interface PerfectScrollbarInstance {
  /** The scrollable DOM element */
  element: ScrollElement;
  /** Event binding utilities */
  event: {
    bind(element: Element, eventName: string, handler: EventListener): void;
  };
  /** Horizontal scrollbar element */
  scrollbarX: Element;
  /** Vertical scrollbar element */
  scrollbarY: Element;
  /** Total content height */
  contentHeight: number;
  /** Total content width */
  contentWidth: number;
  /** Visible container height */
  containerHeight: number;
  /** Visible container width */
  containerWidth: number;
  /** Plugin settings */
  settings: {
    /** Enable momentum scrolling after touch release */
    swipeEasing: boolean;
  };
  /** Whether scrollbar is fully initialized */
  isInitialized: boolean;
}

/**
 * Global Leaflet/library compatibility flags
 */
interface GlobalLibrary {
  /** Browser supports touch events (touchstart, touchmove, etc.) */
  supportsTouch: boolean;
  /** Browser supports IE pointer events (MSPointerEvent or PointerEvent) */
  supportsIePointer: boolean;
  /** Is Chrome browser */
  isChrome: boolean;
}

/**
 * CSS class name constants
 */
interface CssClasses {
  element: {
    /** Class marking elements that consume scroll events (prevent bubbling) */
    consuming: string;
  };
}

declare const L: GlobalLibrary;
declare const l: CssClasses;
declare function n(element: Element): CSSStyleDeclaration;
declare function g(instance: PerfectScrollbarInstance): void;

/**
 * Initialize touch/pointer event handlers for the scrollbar instance.
 * Supports touch events, Pointer Events API, and legacy MSPointerEvent.
 * 
 * @param instance - Perfect-scrollbar instance to enhance with touch support
 */
export function initializeTouchModule(instance: PerfectScrollbarInstance): void {
  // Only initialize if browser supports touch or pointer events
  if (!L.supportsTouch && !L.supportsIePointer) {
    return;
  }

  const element = instance.element;

  /** Touch interaction state */
  const state: TouchState = {
    startOffset: {},
    startTime: 0,
    speed: {},
    easingLoop: null,
  };

  /**
   * Scroll the element by the given deltas and update the scrollbar UI.
   * 
   * @param deltaX - Horizontal scroll offset (positive = scroll right)
   * @param deltaY - Vertical scroll offset (positive = scroll down)
   */
  function applyScroll(deltaX: number, deltaY: number): void {
    element.scrollTop -= deltaY;
    element.scrollLeft -= deltaX;
    g(instance);
  }

  /**
   * Extract the primary touch/pointer from a touch or pointer event.
   * 
   * @param event - Touch or pointer event
   * @returns The first touch point or the pointer event itself
   */
  function getPrimaryTouch(event: TouchEvent | PointerEvent): Touch | PointerEvent {
    return (event as TouchEvent).targetTouches
      ? (event as TouchEvent).targetTouches[0]
      : (event as PointerEvent);
  }

  /**
   * Determine if the event should trigger touch scrolling.
   * Filters out scrollbar interactions, pen-hover events, multi-touch, and mouse pointers.
   * 
   * @param event - Touch or pointer event
   * @returns True if event should be handled as a scroll gesture
   */
  function shouldHandleEvent(event: TouchEvent | PointerEvent): boolean {
    const pointerEvent = event as PointerEvent;
    const touchEvent = event as TouchEvent;

    // Ignore if touching the scrollbar itself
    if (event.target === instance.scrollbarX || event.target === instance.scrollbarY) {
      return false;
    }

    // Filter pen hover (buttons === 0)
    if (pointerEvent.pointerType && pointerEvent.pointerType === "pen" && pointerEvent.buttons === 0) {
      return false;
    }

    // Only handle single-touch gestures
    if (touchEvent.targetTouches && touchEvent.targetTouches.length !== 1) {
      return false;
    }

    // Ignore mouse pointer events (only handle touch/pen)
    if (
      pointerEvent.pointerType &&
      (pointerEvent.pointerType === "mouse" ||
        pointerEvent.pointerType === (pointerEvent as any).MSPOINTER_TYPE_MOUSE)
    ) {
      return false;
    }

    return true;
  }

  /**
   * Handle touch/pointer start event.
   * Records initial position and timestamp for velocity calculation.
   * 
   * @param event - Touch or pointer start event
   */
  function handleTouchStart(event: TouchEvent | PointerEvent): void {
    if (!shouldHandleEvent(event)) {
      return;
    }

    const touch = getPrimaryTouch(event);
    state.startOffset.pageX = touch.pageX;
    state.startOffset.pageY = touch.pageY;
    state.startTime = new Date().getTime();

    // Cancel any ongoing momentum animation
    if (state.easingLoop !== null) {
      clearInterval(state.easingLoop);
    }
  }

  /**
   * Check if the target element or its ancestors can handle the scroll internally.
   * Prevents touch scrolling when a nested scrollable element can consume the gesture.
   * 
   * @param target - Event target element
   * @param deltaX - Horizontal scroll delta
   * @param deltaY - Vertical scroll delta
   * @returns True if a nested element should consume the scroll
   */
  function isConsumedByNestedScroller(
    target: EventTarget | null,
    deltaX: number,
    deltaY: number
  ): boolean {
    if (!(target instanceof Element) || !element.contains(target)) {
      return false;
    }

    let currentElement: Element | null = target;

    while (currentElement && currentElement !== element) {
      // Check for explicit consuming class
      if (currentElement.classList.contains(l.element.consuming)) {
        return true;
      }

      const styles = n(currentElement);

      // Check vertical scrollability
      if (deltaY && styles.overflowY.match(/(scroll|auto)/)) {
        const maxScrollTop = currentElement.scrollHeight - currentElement.clientHeight;
        if (maxScrollTop > 0) {
          const canScrollUp = currentElement.scrollTop > 0 && deltaY < 0;
          const canScrollDown = currentElement.scrollTop < maxScrollTop && deltaY > 0;
          if (canScrollUp || canScrollDown) {
            return true;
          }
        }
      }

      // Check horizontal scrollability
      if (deltaX && styles.overflowX.match(/(scroll|auto)/)) {
        const maxScrollLeft = currentElement.scrollWidth - currentElement.clientWidth;
        if (maxScrollLeft > 0) {
          const canScrollLeft = currentElement.scrollLeft > 0 && deltaX < 0;
          const canScrollRight = currentElement.scrollLeft < maxScrollLeft && deltaX > 0;
          if (canScrollLeft || canScrollRight) {
            return true;
          }
        }
      }

      currentElement = currentElement.parentNode as Element | null;
    }

    return false;
  }

  /**
   * Determine if preventDefault should be called to block native scroll bounce.
   * 
   * @param deltaX - Horizontal scroll delta
   * @param deltaY - Vertical scroll delta
   * @returns True if event should be prevented (blocks browser default)
   */
  function shouldPreventDefault(deltaX: number, deltaY: number): boolean {
    const currentScrollTop = Math.floor(element.scrollTop);
    const currentScrollLeft = element.scrollLeft;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine primary scroll direction
    if (absDeltaY > absDeltaX) {
      // Vertical scroll
      const atBottom = deltaY < 0 && currentScrollTop === instance.contentHeight - instance.containerHeight;
      const atTop = deltaY > 0 && currentScrollTop === 0;

      if (atBottom || atTop) {
        // Special case: allow pull-to-refresh in Chrome when at top
        return !(window.scrollY === 0 && deltaY > 0 && L.isChrome);
      }
    } else if (absDeltaX > absDeltaY) {
      // Horizontal scroll
      const atRight = deltaX < 0 && currentScrollLeft === instance.contentWidth - instance.containerWidth;
      const atLeft = deltaX > 0 && currentScrollLeft === 0;

      if (atRight || atLeft) {
        return true;
      }
    }

    return true;
  }

  /**
   * Handle touch/pointer move event.
   * Calculates scroll delta, updates velocity, and applies scrolling.
   * 
   * @param event - Touch or pointer move event
   */
  function handleTouchMove(event: TouchEvent | PointerEvent): void {
    if (!shouldHandleEvent(event)) {
      return;
    }

    const touch = getPrimaryTouch(event);
    const currentPosition = {
      pageX: touch.pageX,
      pageY: touch.pageY,
    };

    const deltaX = currentPosition.pageX - (state.startOffset.pageX ?? 0);
    const deltaY = currentPosition.pageY - (state.startOffset.pageY ?? 0);

    // Check if nested element should consume this scroll
    if (isConsumedByNestedScroller(event.target, deltaX, deltaY)) {
      return;
    }

    // Apply scroll
    applyScroll(deltaX, deltaY);
    state.startOffset = currentPosition;

    // Calculate velocity for momentum scrolling
    const currentTime = new Date().getTime();
    const elapsed = currentTime - state.startTime;

    if (elapsed > 0) {
      state.speed.x = deltaX / elapsed;
      state.speed.y = deltaY / elapsed;
      state.startTime = currentTime;
    }

    // Prevent default browser behavior (bounce, pull-to-refresh, etc.)
    if (shouldPreventDefault(deltaX, deltaY) && event.cancelable) {
      event.preventDefault();
    }
  }

  /**
   * Handle touch/pointer end event.
   * Initiates momentum scrolling animation if swipe easing is enabled.
   */
  function handleTouchEnd(): void {
    if (!instance.settings.swipeEasing) {
      return;
    }

    clearInterval(state.easingLoop!);

    state.easingLoop = window.setInterval(() => {
      // Stop if scrollbar was destroyed
      if (instance.isInitialized) {
        clearInterval(state.easingLoop!);
        return;
      }

      // Stop if no velocity
      if (!state.speed.x && !state.speed.y) {
        clearInterval(state.easingLoop!);
        return;
      }

      // Stop if velocity is negligible
      const VELOCITY_THRESHOLD = 0.01;
      if (Math.abs(state.speed.x ?? 0) < VELOCITY_THRESHOLD && Math.abs(state.speed.y ?? 0) < VELOCITY_THRESHOLD) {
        clearInterval(state.easingLoop!);
        return;
      }

      // Apply momentum scroll (30ms frame interval * velocity)
      const MOMENTUM_MULTIPLIER = 30;
      applyScroll(MOMENTUM_MULTIPLIER * (state.speed.x ?? 0), MOMENTUM_MULTIPLIER * (state.speed.y ?? 0));

      // Apply friction (80% decay per frame)
      const FRICTION_FACTOR = 0.8;
      state.speed.x = (state.speed.x ?? 0) * FRICTION_FACTOR;
      state.speed.y = (state.speed.y ?? 0) * FRICTION_FACTOR;
    }, 10);
  }

  // Bind appropriate event listeners based on browser support
  if (L.supportsTouch) {
    instance.event.bind(element, "touchstart", handleTouchStart as EventListener);
    instance.event.bind(element, "touchmove", handleTouchMove as EventListener);
    instance.event.bind(element, "touchend", handleTouchEnd as EventListener);
  } else if (L.supportsIePointer) {
    if (window.PointerEvent) {
      instance.event.bind(element, "pointerdown", handleTouchStart as EventListener);
      instance.event.bind(element, "pointermove", handleTouchMove as EventListener);
      instance.event.bind(element, "pointerup", handleTouchEnd as EventListener);
    } else if ((window as any).MSPointerEvent) {
      instance.event.bind(element, "MSPointerDown", handleTouchStart as EventListener);
      instance.event.bind(element, "MSPointerMove", handleTouchMove as EventListener);
      instance.event.bind(element, "MSPointerUp", handleTouchEnd as EventListener);
    }
  }
}