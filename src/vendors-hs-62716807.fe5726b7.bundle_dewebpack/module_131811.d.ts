/**
 * Affix observer module for managing scroll-based fixed positioning
 * Tracks targets and their associated affix components, handling scroll/resize events
 */

/**
 * Represents an affix component that can be positioned relative to a target
 */
export interface AffixComponent {
  /**
   * Lazily updates the position of the affix component
   */
  lazyUpdatePosition(): void;
}

/**
 * Event handler with optional cleanup
 */
export interface EventHandler {
  /**
   * Removes the event listener
   */
  remove?: () => void;
}

/**
 * Rectangle bounds information
 */
export interface Rect {
  /** Distance from viewport top */
  top: number;
  /** Distance from viewport bottom */
  bottom: number;
}

/**
 * Observer entity tracking a target element and its affix components
 */
export interface ObserverEntity {
  /** The DOM element or window being observed */
  target: HTMLElement | Window;
  /** List of affix components attached to this target */
  affixList: AffixComponent[];
  /** Event handlers registered for this target */
  eventHandlers: Record<string, EventHandler>;
}

/**
 * Adds an affix component to observe a target element
 * Registers event listeners if this is the first affix for the target
 * 
 * @param target - The element or window to observe
 * @param affixComponent - The affix component to attach
 */
export function addObserveTarget(
  target: HTMLElement | Window | null | undefined,
  affixComponent: AffixComponent
): void;

/**
 * Removes an affix component from observation
 * Cleans up event listeners if no more affixes are attached to the target
 * 
 * @param affixComponent - The affix component to remove
 */
export function removeObserveTarget(affixComponent: AffixComponent): void;

/**
 * Gets all registered observer entities
 * 
 * @returns Array of all observer entities
 */
export function getObserverEntities(): ObserverEntity[];

/**
 * Gets the bounding rectangle of a target element or window
 * 
 * @param target - The element or window to measure
 * @returns Rectangle bounds relative to the viewport
 */
export function getTargetRect(target: HTMLElement | Window): Rect;

/**
 * Calculates the fixed top position for an affix component
 * 
 * @param targetRect - The bounds of the target element
 * @param affixRect - The bounds of the affix element
 * @param offsetTop - The top offset threshold
 * @returns The calculated top position, or undefined if not fixed
 */
export function getFixedTop(
  targetRect: Rect,
  affixRect: Rect,
  offsetTop?: number
): number | undefined;

/**
 * Calculates the fixed bottom position for an affix component
 * 
 * @param targetRect - The bounds of the target element
 * @param affixRect - The bounds of the affix element
 * @param offsetBottom - The bottom offset threshold
 * @returns The calculated bottom position, or undefined if not fixed
 */
export function getFixedBottom(
  targetRect: Rect,
  affixRect: Rect,
  offsetBottom?: number
): number | undefined;