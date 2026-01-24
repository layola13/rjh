/**
 * Border shape indicator for frames and sashes
 * Displays a border outline around the host shape
 */
export declare class Border extends Shape {
  /**
   * The shape that this border is attached to
   */
  readonly host: Shape;

  /**
   * Whether to apply rounding to border corners
   */
  readonly round: boolean;

  /**
   * Visual shape elements representing the border
   */
  private vshape: any[];

  /**
   * Polygon shapes that define the border geometry
   */
  private borderShapes: Polygon[];

  /**
   * Creates a new Border indicator
   * @param host - The shape to draw a border around (Frame, Sash, or Bead)
   * @param round - Whether to round the border corners (default: false)
   */
  constructor(host: Shape, round?: boolean);

  /**
   * Updates the border polygon geometry based on the host shape
   * Applies different styling based on whether the host is a Frame, Sash, or Bead
   */
  updatePoly(): void;

  /**
   * Renders the border shapes to the canvas
   * @param layer - The Konva layer to draw on
   */
  draw(layer: any): void;

  /**
   * Cleans up and recycles border shape resources
   * @param force - Whether to force immediate recycling (default: false)
   */
  recycle(force?: boolean): void;

  /**
   * Translates the border shapes by a given vector
   * @param vector - The translation vector to apply
   */
  translate(vector: Vector): void;
}

/**
 * Polygon geometry type used for border shapes
 */
interface Polygon {
  /**
   * Creates a deep copy of this polygon
   */
  clone(): Polygon;

  /**
   * Applies rounding to polygon corners
   * @param radius - The rounding radius
   */
  round(radius: number): void;

  /**
   * Translates the polygon by a vector
   * @param vector - The translation vector
   */
  translate(vector: Vector): void;
}

/**
 * Base shape class that Border extends
 */
interface Shape {
  /**
   * The polygon defining the shape's geometry
   */
  polygon: Polygon;

  /**
   * Adds a child shape to this shape
   * @param child - The child shape to add
   */
  add(child: Shape): void;
}

/**
 * 2D vector for translations
 */
interface Vector {
  x: number;
  y: number;
}