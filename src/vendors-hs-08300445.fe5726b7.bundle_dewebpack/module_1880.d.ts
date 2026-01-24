/**
 * DOM utility functions for react-draggable
 * Provides cross-browser compatible methods for DOM manipulation, event handling, and transform operations
 */

/**
 * Position coordinates in 2D space
 */
export interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * String-based position (e.g., "50%", "10px")
 */
export interface PositionString {
  /** X coordinate as string */
  x: string | number;
  /** Y coordinate as string */
  y: string | number;
}

/**
 * Event listener options
 */
export interface EventListenerOptions {
  /** Whether to use capture phase */
  capture?: boolean;
  /** Whether the listener will call preventDefault() */
  passive?: boolean;
  /** Whether the listener should be invoked at most once */
  once?: boolean;
}

/**
 * CSS transform object
 */
export interface CSSTransform {
  [key: string]: string;
}

/**
 * Adds a CSS class name to an element
 * @param element - The target DOM element
 * @param className - The class name to add
 */
export declare function addClassName(element: HTMLElement, className: string): void;

/**
 * Removes a CSS class name from an element
 * @param element - The target DOM element
 * @param className - The class name to remove
 */
export declare function removeClassName(element: HTMLElement, className: string): void;

/**
 * Adds an event listener to an element with cross-browser compatibility
 * @param element - The target element
 * @param eventType - The event type (e.g., 'click', 'mousedown')
 * @param handler - The event handler function
 * @param options - Event listener options
 */
export declare function addEvent(
  element: HTMLElement | Document | Window | null | undefined,
  eventType: string,
  handler: EventListener,
  options?: EventListenerOptions
): void;

/**
 * Removes an event listener from an element with cross-browser compatibility
 * @param element - The target element
 * @param eventType - The event type
 * @param handler - The event handler function
 * @param options - Event listener options
 */
export declare function removeEvent(
  element: HTMLElement | Document | Window | null | undefined,
  eventType: string,
  handler: EventListener,
  options?: EventListenerOptions
): void;

/**
 * Adds user-select prevention styles to the document
 * Prevents text selection during drag operations
 * @param document - The document object
 */
export declare function addUserSelectStyles(document: Document | null | undefined): void;

/**
 * Schedules removal of user-select prevention styles
 * Uses requestAnimationFrame for optimal performance
 * @param document - The document object
 */
export declare function scheduleRemoveUserSelectStyles(document: Document): void;

/**
 * Creates a CSS transform string from position coordinates
 * @param position - The target position
 * @param controlPosition - Optional control position offset
 * @param unitSuffix - Unit suffix (e.g., 'px')
 * @returns CSS transform object with vendor prefixes
 */
export declare function createCSSTransform(
  position: Position,
  controlPosition?: PositionString | null
): CSSTransform;

/**
 * Creates an SVG transform string from position coordinates
 * @param position - The target position
 * @param controlPosition - Optional control position offset
 * @returns SVG transform string
 */
export declare function createSVGTransform(
  position: Position,
  controlPosition?: PositionString | null
): string;

/**
 * Generates a translate transform string
 * @param position - The target position
 * @param controlPosition - Optional control position offset
 * @param unitSuffix - Unit suffix (e.g., 'px', '')
 * @returns Transform string
 */
export declare function getTranslation(
  position: Position,
  controlPosition: PositionString | null | undefined,
  unitSuffix: string
): string;

/**
 * Checks if an element matches a CSS selector
 * @param element - The element to test
 * @param selector - The CSS selector
 * @returns True if element matches selector
 */
export declare function matchesSelector(element: HTMLElement, selector: string): boolean;

/**
 * Checks if an element or any of its parents (up to a boundary) matches a selector
 * @param element - The starting element
 * @param selector - The CSS selector to match
 * @param boundaryElement - The boundary element to stop searching at
 * @returns True if element or any parent matches selector before boundary
 */
export declare function matchesSelectorAndParentsTo(
  element: HTMLElement,
  selector: string,
  boundaryElement: HTMLElement
): boolean;

/**
 * Calculates offset coordinates from a parent element
 * @param event - The mouse or touch event
 * @param parent - The parent element to calculate offset from
 * @param scale - Scale factor for coordinate calculation
 * @returns Offset position coordinates
 */
export declare function offsetXYFromParent(
  event: MouseEvent | TouchEvent,
  parent: HTMLElement,
  scale: number
): Position;

/**
 * Gets a specific touch from a touch event by identifier
 * @param event - The touch event
 * @param identifier - The touch identifier
 * @returns The matching touch object or undefined
 */
export declare function getTouch(event: TouchEvent, identifier: number): Touch | undefined;

/**
 * Extracts the touch identifier from a touch event
 * @param event - The touch event
 * @returns The touch identifier or undefined
 */
export declare function getTouchIdentifier(event: TouchEvent): number | undefined;

/**
 * Gets the inner width of an element (excluding padding)
 * @param element - The target element
 * @returns Inner width in pixels
 */
export declare function innerWidth(element: HTMLElement): number;

/**
 * Gets the inner height of an element (excluding padding)
 * @param element - The target element
 * @returns Inner height in pixels
 */
export declare function innerHeight(element: HTMLElement): number;

/**
 * Gets the outer width of an element (including borders)
 * @param element - The target element
 * @returns Outer width in pixels
 */
export declare function outerWidth(element: HTMLElement): number;

/**
 * Gets the outer height of an element (including borders)
 * @param element - The target element
 * @returns Outer height in pixels
 */
export declare function outerHeight(element: HTMLElement): number;