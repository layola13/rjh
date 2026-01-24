/**
 * Overlayable Mixin
 * 
 * Provides overlay functionality for components that need to display an overlay layer.
 * Handles overlay creation, removal, and scroll behavior management.
 * 
 * @module Overlayable
 */

import Vue, { VueConstructor } from 'vue';
import VOverlay from '../../components/VOverlay';

/**
 * Props for the overlayable mixin
 */
interface OverlayableProps {
  /**
   * Whether to hide the overlay layer
   */
  hideOverlay: boolean;
  
  /**
   * Color of the overlay
   */
  overlayColor: string;
  
  /**
   * Opacity of the overlay (0-1 or percentage string)
   */
  overlayOpacity: number | string;
}

/**
 * Data structure for the overlayable mixin
 */
interface OverlayableData {
  /**
   * Request animation frame ID for overlay animations
   */
  animationFrame: number;
  
  /**
   * Reference to the VOverlay component instance
   */
  overlay: InstanceType<typeof VOverlay> | null;
}

/**
 * Methods provided by the overlayable mixin
 */
interface OverlayableMethods {
  /**
   * Creates a new overlay instance and mounts it to the DOM
   */
  createOverlay(): void;
  
  /**
   * Generates and displays the overlay
   * @returns True if overlay was generated
   */
  genOverlay(): boolean | undefined;
  
  /**
   * Removes the overlay from the DOM
   * @param showScroll - Whether to restore scroll after removal (default: true)
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
  hasScrollbar(element: HTMLElement | null): boolean;
  
  /**
   * Determines if element should allow scrolling based on scroll position
   * @param element - DOM element
   * @param delta - Scroll delta (positive or negative)
   * @returns True if element is at scroll boundary
   */
  shouldScroll(element: HTMLElement, delta: number): boolean;
  
  /**
   * Checks if a node is inside another node
   * @param node - Child node
   * @param parent - Parent node
   * @returns True if node is descendant of parent
   */
  isInside(node: Node | null, parent: Node): boolean;
  
  /**
   * Checks the event path to determine if scrolling should be prevented
   * @param event - Wheel or keyboard event
   * @returns True if event should be allowed to propagate
   */
  checkPath(event: WheelEvent | KeyboardEvent): boolean;
  
  /**
   * Gets the composed path of an event (polyfill for older browsers)
   * @param event - Event object
   * @returns Array of elements in event path
   */
  composedPath(event: Event): EventTarget[];
  
  /**
   * Disables page scrolling and attaches scroll listeners
   */
  hideScroll(): void;
  
  /**
   * Re-enables page scrolling and removes scroll listeners
   */
  showScroll(): void;
}

/**
 * Computed properties expected on the component using this mixin
 */
interface OverlayableComputed {
  /**
   * Whether the component is currently active
   */
  isActive: boolean;
  
  /**
   * Whether the overlay should be absolutely positioned
   */
  absolute: boolean;
  
  /**
   * Active z-index for the component
   */
  activeZIndex?: number;
}

/**
 * Refs expected on the component using this mixin
 */
interface OverlayableRefs {
  /**
   * Reference to the dialog element
   */
  dialog?: HTMLElement;
  
  /**
   * Reference to the content element
   */
  content?: HTMLElement;
}

/**
 * Overlayable mixin for Vue components
 * 
 * Adds overlay management capabilities including:
 * - Overlay creation and destruction
 * - Scroll prevention when overlay is active
 * - Z-index management
 * - Event handling for keyboard and wheel events
 */
declare const Overlayable: VueConstructor<
  Vue & OverlayableData & OverlayableMethods & OverlayableComputed & {
    $refs: OverlayableRefs;
    $vuetify: {
      breakpoint: {
        smAndDown: boolean;
      };
    };
  }
>;

export default Overlayable;