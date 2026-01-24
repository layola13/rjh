/**
 * PathItem class for managing SVG path elements
 * Provides methods to manipulate path display, attributes, and lifecycle
 */
export declare class PathItem {
  /**
   * Internal flag tracking visibility state
   * @private
   */
  private _isShow: boolean;

  /**
   * The underlying SVG node element
   */
  node: SvgPathNode;

  /**
   * Creates a new PathItem instance
   * @param context - Context object containing a path() method that returns an SVG node
   */
  constructor(context: PathContext);

  /**
   * Sets the path data for the SVG element
   * @param pathData - Path data to be converted to SVG path format
   */
  set path(pathData: unknown);

  /**
   * Sets attributes on the SVG node
   * @param attributes - Object containing attribute key-value pairs
   * @returns The current PathItem instance for method chaining
   */
  attr(attributes: Record<string, unknown>): this;

  /**
   * Adds marker elements to the start and end of the path
   * @param marker - Marker element or identifier to apply
   */
  marker(marker: unknown): void;

  /**
   * Shows the path element if currently hidden
   */
  show(): void;

  /**
   * Hides the path element if currently visible
   */
  hide(): void;

  /**
   * Removes the path element from the DOM
   */
  dispose(): void;
}

/**
 * Context object providing access to SVG path creation
 */
interface PathContext {
  /**
   * Creates and returns an SVG path node
   */
  path(): SvgPathNode;
}

/**
 * SVG path node interface with manipulation methods
 */
interface SvgPathNode {
  /**
   * Sets attributes on the node
   */
  attr(attributes: Record<string, unknown>): void;

  /**
   * Adds a marker to the specified position
   */
  marker(position: 'start' | 'end', marker: unknown): void;

  /**
   * Makes the node visible
   */
  show(): void;

  /**
   * Hides the node
   */
  hide(): void;

  /**
   * Removes the node from the DOM
   */
  remove(): void;
}