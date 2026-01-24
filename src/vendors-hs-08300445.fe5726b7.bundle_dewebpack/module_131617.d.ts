/**
 * Utility functions for motion animations and DOM operations
 */

/**
 * Generates a motion class name by combining prefix, custom name, and default name
 * @param prefix - The base prefix for the motion class (e.g., 'fade', 'slide')
 * @param customName - Optional custom motion name provided by user
 * @param defaultName - Default motion name to use when customName is not provided
 * @returns The generated motion class name
 * @example
 * getMotionName('fade', null, 'in') // Returns: 'fade-in'
 * getMotionName('slide', 'custom', 'left') // Returns: 'custom'
 */
export function getMotionName(
  prefix: string,
  customName: string | null | undefined,
  defaultName?: string
): string | undefined;

/**
 * Generates a unique UUID by incrementing an internal counter
 * @returns A unique numeric identifier
 * @example
 * getUUID() // Returns: 0
 * getUUID() // Returns: 1
 */
export function getUUID(): number;

/**
 * Position coordinates relative to the document
 */
export interface Offset {
  /** Distance from the left edge of the document */
  left: number;
  /** Distance from the top edge of the document */
  top: number;
}

/**
 * Calculates the offset position of an element relative to the document
 * @param element - The DOM element to calculate offset for
 * @returns An object containing the left and top offset coordinates
 * @example
 * const elem = document.getElementById('myElement');
 * const position = offset(elem); // Returns: { left: 100, top: 200 }
 */
export function offset(element: HTMLElement): Offset;