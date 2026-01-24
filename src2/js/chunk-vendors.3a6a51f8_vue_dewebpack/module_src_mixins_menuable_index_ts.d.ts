/**
 * Menuable Mixin Type Definitions
 * Provides positioning and activation logic for menu-like components
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Represents the dimensional properties of an element
 */
interface DimensionRect {
  /** Top position in pixels */
  top: number;
  /** Left position in pixels */
  left: number;
  /** Bottom position in pixels */
  bottom: number;
  /** Right position in pixels */
  right: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Offset from top of parent */
  offsetTop: number;
  /** Total scrollable height */
  scrollHeight: number;
  /** Offset from left of parent (activator only) */
  offsetLeft?: number;
}

/**
 * Tracks dimensions of both activator and content elements
 */
interface MenuDimensions {
  /** Dimensions of the element that triggers the menu */
  activator: DimensionRect;
  /** Dimensions of the menu content */
  content: DimensionRect;
}

/**
 * Props accepted by the Menuable mixin
 */
interface MenuableProps {
  /** Allow menu to overflow viewport boundaries */
  allowOverflow: boolean;
  /** Apply light theme variant */
  light: boolean;
  /** Apply dark theme variant */
  dark: boolean;
  /** Maximum width of menu content */
  maxWidth: number | string;
  /** Minimum width of menu content */
  minWidth: number | string;
  /** Nudge menu down by specified pixels */
  nudgeBottom: number | string;
  /** Nudge menu left by specified pixels */
  nudgeLeft: number | string;
  /** Nudge menu right by specified pixels */
  nudgeRight: number | string;
  /** Nudge menu up by specified pixels */
  nudgeTop: number | string;
  /** Adjust menu width by specified pixels */
  nudgeWidth: number | string;
  /** Offset menu when it would overflow */
  offsetOverflow: boolean;
  /** Open menu on activator click */
  openOnClick: boolean;
  /** Absolute X position for menu */
  positionX: number | null;
  /** Absolute Y position for menu */
  positionY: number | null;
  /** Z-index for menu layering */
  zIndex: number | string | null;
}

/**
 * Data properties managed by the Menuable mixin
 */
interface MenuableData {
  /** Absolute X coordinate from click event */
  absoluteX: number;
  /** Absolute Y coordinate from click event */
  absoluteY: number;
  /** Element that activated the menu */
  activatedBy: HTMLElement | null;
  /** Whether the activator has fixed positioning */
  activatorFixed: boolean;
  /** Cached dimensions of activator and content */
  dimensions: MenuDimensions;
  /** Whether the menu just received focus */
  hasJustFocused: boolean;
  /** Whether window object is available (SSR check) */
  hasWindow: boolean;
  /** Whether menu is activated by an input element */
  inputActivator: boolean;
  /** Whether menu content is currently visible */
  isContentActive: boolean;
  /** Current page width in pixels */
  pageWidth: number;
  /** Current vertical scroll offset */
  pageYOffset: number;
  /** CSS class applied when menu is active */
  stackClass: string;
  /** Minimum z-index for stacked menus */
  stackMinZIndex: number;
}

/**
 * Computed properties provided by the Menuable mixin
 */
interface MenuableComputed {
  /**
   * Calculate left position of menu based on activator and nudge values
   * @returns Left position in pixels
   */
  computedLeft(): number;
  
  /**
   * Calculate top position of menu based on activator and nudge values
   * @returns Top position in pixels
   */
  computedTop(): number;
  
  /**
   * Check if an activator element exists
   * @returns True if activator is present
   */
  hasActivator(): boolean;
}

/**
 * Methods provided by the Menuable mixin
 */
interface MenuableMethods {
  /**
   * Get absolute position object when using positionX/Y or absolute coordinates
   * @returns Dimension object with absolute positioning
   */
  absolutePosition(): DimensionRect;
  
  /**
   * Activate the menu (override in component)
   */
  activate(): void;
  
  /**
   * Calculate left position with unit conversion
   * @param contentWidth - Width of the content element
   * @returns Left position as CSS value string
   */
  calcLeft(contentWidth: number): string;
  
  /**
   * Calculate top position with unit conversion
   * @returns Top position as CSS value string
   */
  calcTop(): string;
  
  /**
   * Adjust horizontal position to prevent overflow
   * @param left - Initial left position
   * @param contentWidth - Width of the content
   * @returns Adjusted left position
   */
  calcXOverflow(left: number, contentWidth: number): number;
  
  /**
   * Adjust vertical position to prevent overflow
   * @param top - Initial top position
   * @returns Adjusted top position
   */
  calcYOverflow(top: number): number;
  
  /**
   * Trigger activation if window is available
   */
  callActivate(): void;
  
  /**
   * Deactivate menu and reset content state
   */
  callDeactivate(): void;
  
  /**
   * Update pageYOffset based on scroll position
   */
  checkForPageYOffset(): void;
  
  /**
   * Determine if activator has fixed positioning in DOM tree
   */
  checkActivatorFixed(): void;
  
  /**
   * Deactivate the menu (override in component)
   */
  deactivate(): void;
  
  /**
   * Generate event listeners for the activator element
   * @returns Object mapping event names to handlers
   */
  genActivatorListeners(): Record<string, (event: Event) => void>;
  
  /**
   * Get inner height of viewport
   * @returns Height in pixels or 0 if no window
   */
  getInnerHeight(): number;
  
  /**
   * Get horizontal scroll offset
   * @returns Offset in pixels or 0 if no window
   */
  getOffsetLeft(): number;
  
  /**
   * Get vertical scroll offset
   * @returns Offset in pixels or 0 if no window
   */
  getOffsetTop(): number;
  
  /**
   * Get bounding rectangle with rounded pixel values
   * @param element - Target DOM element
   * @returns Rounded bounding rectangle
   */
  getRoundedBoundedClientRect(element: HTMLElement): {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
  };
  
  /**
   * Measure dimensions of an element
   * @param element - Element to measure
   * @returns Dimension object or null
   */
  measure(element: HTMLElement | null): DimensionRect | null;
  
  /**
   * Temporarily display hidden content to measure dimensions
   * @param callback - Function to execute while content is visible
   */
  sneakPeek(callback: () => void): void;
  
  /**
   * Begin transition to active state
   * @returns Promise that resolves when transition starts
   */
  startTransition(): Promise<void>;
  
  /**
   * Recalculate and update all dimension measurements
   */
  updateDimensions(): void;
}

/**
 * Menuable Mixin
 * Combines positioning, stacking, and activation behaviors for menu components
 */
declare const Menuable: VueConstructor<
  Vue & 
  MenuableProps & 
  MenuableData & 
  MenuableComputed & 
  MenuableMethods
>;

export default Menuable;