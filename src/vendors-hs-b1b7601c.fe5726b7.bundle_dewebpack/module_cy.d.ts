/**
 * Represents a bounding box with geometric properties
 */
interface BoundingBox {
  /** Y coordinate of the bounding box */
  cy: number;
  /** Height of the bounding box */
  height: number;
  /** X coordinate of the bounding box */
  x?: number;
  /** Y coordinate of the bounding box */
  y?: number;
  /** Width of the bounding box */
  width?: number;
}

/**
 * Represents an object with geometric positioning capabilities
 */
interface GeometricElement {
  /**
   * Gets the bounding box of the element
   * @returns The bounding box containing position and dimension information
   */
  gbox(): BoundingBox;

  /**
   * Sets or transforms the Y coordinate of the element
   * @param value - The Y coordinate value to set
   * @returns This element instance for method chaining
   */
  y(value: number): this;

  /**
   * Gets or sets the center Y coordinate of the element
   * 
   * @param offset - Optional offset value from the bounding box center
   * 
   * **Getter mode (no parameter):**
   * - Returns the Y coordinate of the element's center point
   * - Retrieves `gbox().cy` property
   * 
   * **Setter mode (with parameter):**
   * - Sets the element's Y coordinate based on offset from center
   * - Calculates as: `offset - bounding box height / 2`
   * - Returns the element instance for method chaining
   * 
   * @returns When getter: the center Y coordinate; When setter: this element for chaining
   * 
   * @example
   *