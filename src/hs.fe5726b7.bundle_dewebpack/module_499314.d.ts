/**
 * DOM utilities for querying document ownership, window references, scroll positions, and element positioning.
 * Provides cross-browser compatible helpers for common DOM operations.
 */

/**
 * Coordinates representing a 2D position.
 */
export interface Coordinates {
  /** Horizontal position in pixels */
  left: number;
  /** Vertical position in pixels */
  top: number;
}

/**
 * Gets the owner document of a given element or React component.
 * Falls back to the global document if none can be determined.
 * 
 * @param element - A DOM element or React component instance
 * @returns The document that owns the element
 */
export function ownerDocument(element: Element | React.Component | null | undefined): Document;

/**
 * Gets the window object that contains the given element or React component.
 * Falls back to the global window if none can be determined.
 * 
 * @param element - A DOM element or React component instance
 * @returns The window object containing the element
 */
export function ownerWindow(element: Element | React.Component | null | undefined): Window;

/**
 * Gets or sets the vertical scroll position of an element.
 * 
 * @param element - The element to query or modify
 * @returns The current scrollTop value when called without a value parameter
 */
export function scrollTop(element: Element | Window | null | undefined): number;

/**
 * Sets the vertical scroll position of an element.
 * 
 * @param element - The element to modify
 * @param value - The new scroll position in pixels
 */
export function scrollTop(element: Element | Window | null | undefined, value: number): void;

/**
 * Calculates the offset position of an element relative to the document.
 * Takes into account page scroll and client offsets.
 * 
 * @param element - The element to measure
 * @returns Coordinates relative to the document, or null if element is invalid
 */
export function offset(element: Element | null | undefined): Coordinates | null;

/**
 * Gets the position of an element relative to its offset parent.
 * Uses offsetLeft and offsetTop properties.
 * 
 * @param element - The element to measure
 * @returns Coordinates relative to the offset parent
 */
export function position(element: HTMLElement): Coordinates;