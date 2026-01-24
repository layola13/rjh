/**
 * Adjusts the vertical position of an element to ensure it stays within viewport bounds.
 * 
 * @remarks
 * This function calculates the element's offset after applying CSS properties.
 * If the element's top position is negative (above viewport), it adjusts the CSS
 * to bring it back into view.
 * 
 * @param cssProperties - CSS properties object to apply to the element
 * @public
 */
declare function adjustElementPosition(cssProperties: CSSProperties): void;

/**
 * CSS properties that can be applied to an element
 */
interface CSSProperties {
  /** The top position in pixels or other CSS units */
  top: number | string;
  
  /** Additional CSS properties */
  [key: string]: number | string | undefined;
}

/**
 * Represents the offset position of an element relative to the document
 */
interface Offset {
  /** The top position in pixels from the document top */
  top: number;
  
  /** The left position in pixels from the document left */
  left: number;
}

/**
 * jQuery-like element wrapper interface
 */
interface ElementWrapper {
  /**
   * Apply CSS properties to the element
   * @param properties - CSS properties to apply
   * @returns The element wrapper for chaining
   */
  css(properties: CSSProperties): this;
  
  /**
   * Get the current offset of the element relative to the document
   * @returns The offset object containing top and left positions
   */
  offset(): Offset;
}

/**
 * jQuery-like selector function
 * @param context - The context (typically 'this') to wrap
 * @returns An element wrapper providing jQuery-like methods
 */
declare function e(context: unknown): ElementWrapper;

export { adjustElementPosition, CSSProperties, Offset, ElementWrapper };