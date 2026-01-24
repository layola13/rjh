import type { VueConstructor } from 'vue';
import type VOverlay from '../../components/VOverlay';

/**
 * Overlayable mixin interface
 * Provides overlay functionality for components that need to display a backdrop/overlay
 */
export interface OverlayableInstance {
  /** Animation frame request ID for overlay transitions */
  animationFrame: number;
  
  /** VOverlay component instance */
  overlay: InstanceType<typeof VOverlay> | null;
  
  /** Whether the component is currently active */
  isActive?: boolean;
  
  /** Whether the overlay should be absolutely positioned */
  absolute?: boolean;
  
  /** Active z-index for stacking context */
  activeZIndex?: number;
  
  /** Reference to the root element */
  $el: HTMLElement;
  
  /** Reference to dialog element (if applicable) */
  $refs: {
    dialog?: HTMLElement;
    content?: HTMLElement;
  };
  
  /** Vuetify instance */
  $vuetify: {
    breakpoint: {
      smAndDown: boolean;
    };
  };
}

/**
 * Overlayable mixin props
 */
export interface OverlayableProps {
  /** Hide the overlay backdrop */
  hideOverlay?: boolean;
  
  /** Color of the overlay backdrop */
  overlayColor?: string;
  
  /** Opacity of the overlay (0-1 or percentage string) */
  overlayOpacity?: number | string;
}

/**
 * Overlayable mixin methods
 */
export interface OverlayableMethods {
  /**
   * Creates a new VOverlay instance and mounts it to the DOM
   */
  createOverlay(): void;
  
  /**
   * Generates and displays the overlay backdrop
   * @returns True if overlay was generated successfully
   */
  genOverlay(): boolean | undefined;
  
  /**
   * Removes the overlay from the DOM
   * @param showScroll - Whether to restore scrolling (default: true)
   */
  removeOverlay(showScroll?: boolean): void;
  
  /**
   * Handles scroll events to prevent scrolling when overlay is active
   * @param event - Wheel or keyboard event
   */
  scrollListener(event: WheelEvent | KeyboardEvent): void;
  
  /**
   * Checks if an element has a scrollbar
   * @param element - DOM element to check
   * @returns True if element has vertical scrollbar
   */
  hasScrollbar(element: Element | null): boolean;
  
  /**
   * Determines if element should scroll based on scroll position and delta
   * @param element - Element being scrolled
   * @param delta - Scroll direction and amount
   * @returns True if element is at scroll boundary
   */
  shouldScroll(element: HTMLElement, delta: number): boolean;
  
  /**
   * Checks if an element is inside another element
   * @param child - Potential child element
   * @param parent - Potential parent element
   * @returns True if child is inside parent
   */
  isInside(child: Node | null, parent: Node): boolean;
  
  /**
   * Checks the event path to determine if scrolling should be prevented
   * @param event - Wheel or keyboard event
   * @returns True if default scroll behavior should be prevented
   */
  checkPath(event: WheelEvent | KeyboardEvent): boolean;
  
  /**
   * Gets the composed path of an event (polyfill for older browsers)
   * @param event - Event object
   * @returns Array of event targets from innermost to outermost
   */
  composedPath(event: Event): EventTarget[];
  
  /**
   * Disables page scrolling and adds scroll event listeners
   */
  hideScroll(): void;
  
  /**
   * Restores page scrolling and removes scroll event listeners
   */
  showScroll(): void;
}

/**
 * Overlayable mixin data
 */
export interface OverlayableData {
  /** Animation frame request ID */
  animationFrame: number;
  
  /** VOverlay component instance */
  overlay: InstanceType<typeof VOverlay> | null;
}

/**
 * Overlayable mixin
 * Adds overlay/backdrop functionality to components with scroll lock behavior
 */
declare const Overlayable: VueConstructor<
  OverlayableInstance & OverlayableMethods
>;

export default Overlayable;