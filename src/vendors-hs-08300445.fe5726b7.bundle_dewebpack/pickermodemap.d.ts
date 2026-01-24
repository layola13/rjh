/**
 * Picker utility types and functions for date/time picker components
 * Provides keyboard navigation, scroll behavior, and mode mapping utilities
 */

/**
 * Picker mode type definition
 */
export type PickerMode = 'year' | 'month' | 'quarter' | 'week' | 'time' | 'date';

/**
 * Picker panel mode type definition
 */
export type PanelMode = 'decade' | 'year' | 'quarter' | 'month' | 'week' | 'date' | 'time';

/**
 * Mouse down event handler type
 */
export type MouseDownHandler = (event: MouseEvent) => void;

/**
 * Keyboard event handler options for picker navigation
 */
export interface KeyDownHandlerOptions {
  /**
   * Handler for left/right arrow keys
   * @param offset -1 for left, 1 for right
   */
  onLeftRight?: (offset: number) => void;

  /**
   * Handler for Ctrl+left/right arrow keys
   * @param offset -1 for left, 1 for right
   */
  onCtrlLeftRight?: (offset: number) => void;

  /**
   * Handler for up/down arrow keys
   * @param offset -1 for up, 1 for down
   */
  onUpDown?: (offset: number) => void;

  /**
   * Handler for PageUp/PageDown keys
   * @param offset -1 for PageUp, 1 for PageDown
   */
  onPageUpDown?: (offset: number) => void;

  /**
   * Handler for Enter key
   */
  onEnter?: () => void;
}

/**
 * Date/time value object with getNow method
 */
export interface DateTimeValue {
  /**
   * Get current date/time value
   */
  getNow(): unknown;
}

/**
 * Picker mode mapping function type
 */
export type PickerModeMappingFn = ((panelMode: PanelMode) => PanelMode) | null;

/**
 * Picker mode map configuration
 * Maps picker modes to their panel mode transformation logic
 */
export const PickerModeMap: Record<PickerMode, PickerModeMappingFn>;

/**
 * Add a global mouse down event listener
 * @param handler - Mouse down event handler
 * @returns Cleanup function to remove the listener
 */
export function addGlobalMouseDownEvent(handler: MouseDownHandler): () => void;

/**
 * Create a keyboard event handler for picker navigation
 * @param event - Keyboard event
 * @param options - Handler options for different key combinations
 * @returns true if event was handled, false otherwise
 */
export function createKeyDownHandler(
  event: KeyboardEvent,
  options: KeyDownHandlerOptions
): boolean;

/**
 * Check if any element in the array contains the target element
 * @param elements - Array of elements to check
 * @param target - Target element to find
 * @returns true if target is contained in any element
 */
export function elementsContains(
  elements: Array<Element | null | undefined>,
  target: Element
): boolean;

/**
 * Get default date/time format string based on picker mode
 * @param format - Custom format string (if provided)
 * @param mode - Picker mode
 * @param showTime - Whether to show time
 * @param use12Hours - Whether to use 12-hour format
 * @returns Format string
 */
export function getDefaultFormat(
  format: string | undefined,
  mode: PickerMode,
  showTime: boolean,
  use12Hours: boolean
): string;

/**
 * Calculate input size based on picker mode and format
 * @param mode - Picker mode
 * @param format - Format string or formatter function
 * @param value - Date/time value object
 * @returns Input size (character count)
 */
export function getInputSize(
  mode: PickerMode,
  format: string | ((value: unknown) => string),
  value: DateTimeValue
): number;

/**
 * Get the actual target element from an event (handles shadow DOM)
 * @param event - Event object
 * @returns Target element
 */
export function getTargetFromEvent(event: Event): EventTarget | null;

/**
 * Smoothly scroll element to target position
 * @param element - Element to scroll
 * @param targetScrollTop - Target scroll position
 * @param duration - Animation duration in milliseconds
 */
export function scrollTo(
  element: HTMLElement,
  targetScrollTop: number,
  duration: number
): void;

/**
 * Wait for element to be ready (mounted/rendered)
 * @param element - Element or element getter function
 * @param callback - Callback to execute when element is ready
 * @returns Cleanup function to cancel waiting
 */
export function waitElementReady(
  element: Element | (() => Element | null | undefined),
  callback: () => void
): () => void;