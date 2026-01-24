/**
 * 2D transformation matrix utilities and helper functions
 * @module Transform
 */

/**
 * Point in 2D space
 */
export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * RGBA color representation
 */
export interface RGBAColor {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * RGB color representation
 */
export interface RGBColor {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
}

/**
 * Bounding box in 2D space
 */
export interface BoundingBox {
  /** X coordinate of top-left corner */
  x: number;
  /** Y coordinate of top-left corner */
  y: number;
  /** Width of the box */
  width: number;
  /** Height of the box */
  height: number;
}

/**
 * Decomposed transformation properties
 */
export interface DecomposedTransform {
  /** X translation */
  x: number;
  /** Y translation */
  y: number;
  /** Rotation angle */
  rotation: number;
  /** Scale factor along X axis */
  scaleX: number;
  /** Scale factor along Y axis */
  scaleY: number;
  /** Skew angle along X axis */
  skewX: number;
  /** Skew angle along Y axis */
  skewY: number;
}

/**
 * 2D affine transformation matrix [a, b, c, d, e, f]
 * Represents the transformation:
 * | a c e |
 * | b d f |
 * | 0 0 1 |
 */
export type Matrix2D = [number, number, number, number, number, number];

/**
 * 2D transformation matrix class
 * Implements affine transformations using a 3x3 matrix
 */
export declare class Transform {
  /**
   * Internal matrix representation [a, b, c, d, e, f]
   */
  m: Matrix2D;

  /**
   * Indicates if the transform has been modified
   */
  dirty: boolean;

  /**
   * Creates a new Transform instance
   * @param matrix - Initial transformation matrix (defaults to identity matrix)
   */
  constructor(matrix?: Matrix2D);

  /**
   * Resets the transformation matrix to identity
   */
  reset(): void;

  /**
   * Creates a copy of this transform
   * @returns A new Transform instance with the same matrix values
   */
  copy(): Transform;

  /**
   * Copies this transform's matrix into another transform
   * @param target - The target transform to copy into
   */
  copyInto(target: Transform): void;

  /**
   * Transforms a point using this transformation matrix
   * @param point - The point to transform
   * @returns The transformed point
   */
  point(point: Point): Point;

  /**
   * Applies a translation transformation
   * @param x - Translation along X axis
   * @param y - Translation along Y axis
   * @returns This transform instance (for chaining)
   */
  translate(x: number, y: number): this;

  /**
   * Applies a scaling transformation
   * @param scaleX - Scale factor along X axis
   * @param scaleY - Scale factor along Y axis
   * @returns This transform instance (for chaining)
   */
  scale(scaleX: number, scaleY: number): this;

  /**
   * Applies a rotation transformation
   * @param angle - Rotation angle in radians
   * @returns This transform instance (for chaining)
   */
  rotate(angle: number): this;

  /**
   * Gets the translation component of this transform
   * @returns The translation as a point
   */
  getTranslation(): Point;

  /**
   * Applies a skew transformation
   * @param skewX - Skew angle along X axis
   * @param skewY - Skew angle along Y axis
   * @returns This transform instance (for chaining)
   */
  skew(skewX: number, skewY: number): this;

  /**
   * Multiplies this transform by another transform
   * @param transform - The transform to multiply with
   * @returns This transform instance (for chaining)
   */
  multiply(transform: Transform): this;

  /**
   * Inverts this transformation matrix
   * @returns This transform instance (for chaining)
   */
  invert(): this;

  /**
   * Gets the underlying transformation matrix
   * @returns The 2D transformation matrix
   */
  getMatrix(): Matrix2D;

  /**
   * Sets the absolute position by solving the transformation equation
   * @param x - Target X position
   * @param y - Target Y position
   * @returns This transform instance (for chaining)
   */
  setAbsolutePosition(x: number, y: number): this;

  /**
   * Decomposes the transformation matrix into individual components
   * @returns The decomposed transformation properties
   */
  decompose(): DecomposedTransform;
}

/**
 * Utility functions for canvas operations, color manipulation, and geometry
 */
export declare namespace Util {
  /**
   * Checks if a value is a DOM element
   * @param value - The value to check
   * @returns True if the value is a DOM element
   */
  function _isElement(value: unknown): value is HTMLElement;

  /**
   * Checks if a value is a function
   * @param value - The value to check
   * @returns True if the value is a function
   */
  function _isFunction(value: unknown): value is Function;

  /**
   * Checks if a value is a plain object
   * @param value - The value to check
   * @returns True if the value is a plain object
   */
  function _isPlainObject(value: unknown): value is Record<string, unknown>;

  /**
   * Checks if a value is an array
   * @param value - The value to check
   * @returns True if the value is an array
   */
  function _isArray(value: unknown): value is unknown[];

  /**
   * Checks if a value is a valid number
   * @param value - The value to check
   * @returns True if the value is a finite number
   */
  function _isNumber(value: unknown): value is number;

  /**
   * Checks if a value is a string
   * @param value - The value to check
   * @returns True if the value is a string
   */
  function _isString(value: unknown): value is string;

  /**
   * Checks if a value is a boolean
   * @param value - The value to check
   * @returns True if the value is a boolean
   */
  function _isBoolean(value: unknown): value is boolean;

  /**
   * Checks if a value is an object (including arrays and functions)
   * @param value - The value to check
   * @returns True if the value is an object
   */
  function isObject(value: unknown): value is object;

  /**
   * Validates if a string is a valid CSS selector
   * @param selector - The selector string to validate
   * @returns True if the selector is valid
   */
  function isValidSelector(selector: string): boolean;

  /**
   * Returns the sign of a number
   * @param value - The number to check
   * @returns 1 for positive or zero, -1 for negative
   */
  function _sign(value: number): 1 | -1;

  /**
   * Requests an animation frame callback
   * @param callback - Function to execute on next frame
   */
  function requestAnimFrame(callback: () => void): void;

  /**
   * Creates a new canvas element
   * @returns A new HTMLCanvasElement
   */
  function createCanvasElement(): HTMLCanvasElement;

  /**
   * Creates a new image element
   * @returns A new HTMLImageElement
   */
  function createImageElement(): HTMLImageElement;

  /**
   * Checks if an element is attached to the document
   * @param element - The element to check
   * @returns True if the element is in the document
   */
  function _isInDocument(element: Node): boolean;

  /**
   * Loads an image from a URL
   * @param url - The image URL
   * @param callback - Callback function receiving the loaded image
   */
  function _urlToImage(url: string, callback: (image: HTMLImageElement) => void): void;

  /**
   * Converts RGB color values to hexadecimal string
   * @param r - Red channel (0-255)
   * @param g - Green channel (0-255)
   * @param b - Blue channel (0-255)
   * @returns Hexadecimal color string (without #)
   */
  function _rgbToHex(r: number, g: number, b: number): string;

  /**
   * Converts hexadecimal color string to RGB
   * @param hex - Hexadecimal color string (with or without #)
   * @returns RGB color object
   */
  function _hexToRgb(hex: string): RGBColor;

  /**
   * Generates a random hexadecimal color
   * @returns Random color string with # prefix
   */
  function getRandomColor(): string;

  /**
   * Parses a color string and returns RGB values
   * @param color - Color string (named, hex, or rgb format)
   * @returns RGB color object
   */
  function getRGB(color: string): RGBColor;

  /**
   * Converts any color format to RGBA
   * @param color - Color string in any supported format
   * @returns RGBA color object or null if invalid
   */
  function colorToRGBA(color: string): RGBAColor | null;

  /**
   * Converts named color to RGBA
   * @param color - Named color (e.g., "red", "blue")
   * @returns RGBA color object or null if not found
   */
  function _namedColorToRBA(color: string): RGBAColor | null;

  /**
   * Converts RGB color string to RGBA
   * @param color - RGB color string (e.g., "rgb(255, 0, 0)")
   * @returns RGBA color object or undefined if invalid
   */
  function _rgbColorToRGBA(color: string): RGBAColor | undefined;

  /**
   * Converts RGBA color string to RGBA object
   * @param color - RGBA color string (e.g., "rgba(255, 0, 0, 0.5)")
   * @returns RGBA color object or undefined if invalid
   */
  function _rgbaColorToRGBA(color: string): RGBAColor | undefined;

  /**
   * Converts 6-digit hex color to RGBA
   * @param color - Hex color string (e.g., "#ff0000")
   * @returns RGBA color object or undefined if invalid
   */
  function _hex6ColorToRGBA(color: string): RGBAColor | undefined;

  /**
   * Converts 3-digit hex color to RGBA
   * @param color - Hex color string (e.g., "#f00")
   * @returns RGBA color object or undefined if invalid
   */
  function _hex3ColorToRGBA(color: string): RGBAColor | undefined;

  /**
   * Converts HSL color string to RGBA
   * @param color - HSL color string (e.g., "hsl(0, 100%, 50%)")
   * @returns RGBA color object or undefined if invalid
   */
  function _hslColorToRGBA(color: string): RGBAColor | undefined;

  /**
   * Checks if two bounding boxes intersect
   * @param box1 - First bounding box
   * @param box2 - Second bounding box
   * @returns True if the boxes intersect
   */
  function haveIntersection(box1: BoundingBox, box2: BoundingBox): boolean;

  /**
   * Creates a deep clone of a plain object
   * @param obj - The object to clone
   * @returns A deep copy of the object
   */
  function cloneObject<T extends Record<string, unknown>>(obj: T): T;

  /**
   * Creates a shallow copy of an array
   * @param arr - The array to clone
   * @returns A shallow copy of the array
   */
  function cloneArray<T>(arr: T[]): T[];

  /**
   * Converts degrees to radians
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  function degToRad(degrees: number): number;

  /**
   * Converts radians to degrees
   * @param radians - Angle in radians
   * @returns Angle in degrees
   */
  function radToDeg(radians: number): number;

  /**
   * @deprecated Use degToRad instead
   */
  function _degToRad(degrees: number): number;

  /**
   * @deprecated Use radToDeg instead
   */
  function _radToDeg(radians: number): number;

  /**
   * Gets rotation value in the configured unit (degrees or radians)
   * @param radians - Rotation in radians
   * @returns Rotation in configured unit
   */
  function _getRotation(radians: number): number;

  /**
   * Capitalizes the first letter of a string
   * @param str - The string to capitalize
   * @returns Capitalized string
   */
  function _capitalize(str: string): string;

  /**
   * Throws a Konva error
   * @param message - Error message
   * @throws Always throws an Error
   */
  function throw(message: string): never;

  /**
   * Logs a Konva error to console
   * @param message - Error message
   */
  function error(message: string): void;

  /**
   * Logs a Konva warning to console (if warnings are enabled)
   * @param message - Warning message
   */
  function warn(message: string): void;

  /**
   * Iterates over object properties
   * @param obj - The object to iterate
   * @param callback - Function called for each property
   */
  function each<T extends Record<string, unknown>>(
    obj: T,
    callback: (key: string, value: unknown) => void
  ): void;

  /**
   * Checks if a value is within a range
   * @param value - The value to check
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (exclusive)
   * @returns True if value is in range
   */
  function _inRange(value: number, min: number, max: number): boolean;

  /**
   * Calculates projection of a point onto a line segment
   * @param x1 - Segment start X
   * @param y1 - Segment start Y
   * @param x2 - Segment end X
   * @param y2 - Segment end Y
   * @param px - Point X
   * @param py - Point Y
   * @returns Tuple of [projection X, projection Y, squared distance]
   */
  function _getProjectionToSegment(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    px: number,
    py: number
  ): [number, number, number];

  /**
   * Calculates projection of a point onto a polyline
   * @param point - The point to project
   * @param line - Array of points forming the line
   * @param isClosed - Whether the line is closed (polygon)
   * @returns The projected point
   */
  function _getProjectionToLine(
    point: Point,
    line: Point[],
    isClosed: boolean
  ): Point;

  /**
   * Prepares arrays for interpolation in tweening
   * @param start - Start point array
   * @param end - End point array
   * @param isClosed - Whether the path is closed
   * @returns Normalized array for tweening
   */
  function _prepareArrayForTween(
    start: number[],
    end: number[],
    isClosed: boolean
  ): number[];

  /**
   * Removes circular references from an object for serialization
   * @param obj - The object to prepare
   * @returns The prepared object or null if unconfigurable properties found
   */
  function _prepareToStringify<T extends Record<string, unknown>>(
    obj: T
  ): T | null;

  /**
   * Assigns properties from source to target (shallow merge)
   * @param target - Target object
   * @param source - Source object
   * @returns The target object
   */
  function _assign<T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
  ): T;

  /**
   * Gets the first pointer ID from a pointer/touch event
   * @param event - The pointer or touch event
   * @returns The pointer identifier
   */
  function _getFirstPointerId(
    event: PointerEvent | TouchEvent
  ): number;
}