/**
 * Geometry utilities for 2D coordinates, rectangles, boxes, and sizes.
 * Provides classes for spatial calculations, intersections, and transformations.
 */

/**
 * Represents a bounding box defined by its edges.
 * Useful for collision detection and spatial queries.
 */
export declare class Box {
  /** Top edge Y coordinate */
  top: number;
  
  /** Right edge X coordinate */
  right: number;
  
  /** Bottom edge Y coordinate */
  bottom: number;
  
  /** Left edge X coordinate */
  left: number;

  /**
   * Creates a new Box instance.
   * @param top - Top edge Y coordinate
   * @param right - Right edge X coordinate
   * @param bottom - Bottom edge Y coordinate
   * @param left - Left edge X coordinate
   */
  constructor(top: number, right: number, bottom: number, left: number);

  /**
   * Creates a bounding box that contains all provided coordinates.
   * @param coordinates - One or more Coordinate points to bound
   * @returns A Box that encompasses all provided coordinates
   */
  static boundingBox(...coordinates: Coordinate[]): Box;

  /**
   * Gets the width of the box.
   * @returns Width (right - left)
   */
  getWidth(): number;

  /**
   * Gets the height of the box.
   * @returns Height (bottom - top)
   */
  getHeight(): number;

  /**
   * Creates a deep copy of this box.
   * @returns A new Box instance with the same dimensions
   */
  clone(): Box;

  /**
   * Checks if this box contains a coordinate or another box.
   * @param target - Coordinate or Box to test
   * @returns True if the target is fully contained within this box
   */
  contains(target: Coordinate | Box): boolean;

  /**
   * Expands the box by the specified amounts in each direction.
   * @param top - Amount to expand top edge (or a Box to expand by)
   * @param right - Amount to expand right edge
   * @param bottom - Amount to expand bottom edge
   * @param left - Amount to expand left edge
   * @returns This box (for chaining)
   */
  expand(top: number | Box, right?: number, bottom?: number, left?: number): this;

  /**
   * Expands this box to include another box.
   * @param other - Box to include
   */
  expandToInclude(other: Box): void;

  /**
   * Expands this box to include a coordinate point.
   * @param coordinate - Point to include
   */
  expandToIncludeCoordinate(coordinate: Coordinate): void;

  /**
   * Checks if two boxes are equal.
   * @param box1 - First box
   * @param box2 - Second box
   * @returns True if all edges are equal
   */
  static equals(box1: Box | null, box2: Box | null): boolean;

  /**
   * Checks if a box contains a coordinate or another box.
   * @param box - Container box
   * @param target - Coordinate or Box to test
   * @returns True if target is fully contained
   */
  static contains(box: Box | null, target: Coordinate | Box | null): boolean;

  /**
   * Calculates horizontal distance from box edge to coordinate.
   * @param box - Reference box
   * @param coord - Target coordinate
   * @returns Distance (0 if inside, negative/positive if outside left/right)
   */
  static relativePositionX(box: Box, coord: Coordinate): number;

  /**
   * Calculates vertical distance from box edge to coordinate.
   * @param box - Reference box
   * @param coord - Target coordinate
   * @returns Distance (0 if inside, negative/positive if outside top/bottom)
   */
  static relativePositionY(box: Box, coord: Coordinate): number;

  /**
   * Calculates minimum distance from box to coordinate.
   * @param box - Reference box
   * @param coord - Target coordinate
   * @returns Euclidean distance (0 if coordinate is inside box)
   */
  static distance(box: Box, coord: Coordinate): number;

  /**
   * Checks if two boxes intersect.
   * @param box1 - First box
   * @param box2 - Second box
   * @returns True if boxes overlap
   */
  static intersects(box1: Box, box2: Box): boolean;

  /**
   * Checks if two boxes intersect with padding.
   * @param box1 - First box
   * @param box2 - Second box
   * @param padding - Additional padding around boxes
   * @returns True if boxes overlap considering padding
   */
  static intersectsWithPadding(box1: Box, box2: Box, padding: number): boolean;

  /**
   * Rounds all edges up to nearest integer.
   * @returns This box (for chaining)
   */
  ceil(): this;

  /**
   * Rounds all edges down to nearest integer.
   * @returns This box (for chaining)
   */
  floor(): this;

  /**
   * Rounds all edges to nearest integer.
   * @returns This box (for chaining)
   */
  round(): this;

  /**
   * Translates the box by the specified offset.
   * @param x - Horizontal offset (or Coordinate for both axes)
   * @param y - Vertical offset
   * @returns This box (for chaining)
   */
  translate(x: number | Coordinate, y?: number): this;

  /**
   * Scales the box by the specified factors.
   * @param scaleX - Horizontal scale factor
   * @param scaleY - Vertical scale factor (defaults to scaleX if omitted)
   * @returns This box (for chaining)
   */
  scale(scaleX: number, scaleY?: number): this;
}

/**
 * Represents a rectangle defined by position (left, top) and dimensions (width, height).
 * Provides methods for spatial operations and transformations.
 */
export declare class Rect {
  /** Left edge X coordinate */
  left: number;
  
  /** Top edge Y coordinate */
  top: number;
  
  /** Width of the rectangle */
  width: number;
  
  /** Height of the rectangle */
  height: number;

  /**
   * Creates a new Rect instance.
   * @param left - Left edge X coordinate
   * @param top - Top edge Y coordinate
   * @param width - Rectangle width
   * @param height - Rectangle height
   */
  constructor(left: number, top: number, width: number, height: number);

  /**
   * Creates a deep copy of this rectangle.
   * @returns A new Rect instance with the same dimensions
   */
  clone(): Rect;

  /**
   * Converts this rectangle to a Box representation.
   * @returns A Box with equivalent bounds
   */
  toBox(): Box;

  /**
   * Creates a rectangle from a coordinate position and size.
   * @param position - Top-left corner position
   * @param size - Rectangle dimensions
   * @returns A new Rect instance
   */
  static createFromPositionAndSize(position: Coordinate, size: Size): Rect;

  /**
   * Creates a rectangle from a Box.
   * @param box - Box to convert
   * @returns A new Rect instance
   */
  static createFromBox(box: Box): Rect;

  /**
   * Checks if two rectangles are equal.
   * @param rect1 - First rectangle
   * @param rect2 - Second rectangle
   * @returns True if position and dimensions match
   */
  static equals(rect1: Rect | null, rect2: Rect | null): boolean;

  /**
   * Computes the intersection with another rectangle (mutates this instance).
   * @param other - Rectangle to intersect with
   * @returns True if rectangles intersect, false otherwise
   */
  intersection(other: Rect): boolean;

  /**
   * Computes the intersection of two rectangles (non-mutating).
   * @param rect1 - First rectangle
   * @param rect2 - Second rectangle
   * @returns New Rect representing intersection, or null if no overlap
   */
  static intersection(rect1: Rect, rect2: Rect): Rect | null;

  /**
   * Checks if two rectangles intersect.
   * @param rect1 - First rectangle
   * @param rect2 - Second rectangle
   * @returns True if rectangles overlap
   */
  static intersects(rect1: Rect, rect2: Rect): boolean;

  /**
   * Checks if this rectangle intersects with another.
   * @param other - Rectangle to test
   * @returns True if rectangles overlap
   */
  intersects(other: Rect): boolean;

  /**
   * Computes the difference between two rectangles (areas in rect1 not in rect2).
   * @param rect1 - Rectangle to subtract from
   * @param rect2 - Rectangle to subtract
   * @returns Array of rectangles representing the difference
   */
  static difference(rect1: Rect, rect2: Rect): Rect[];

  /**
   * Computes the difference between this and another rectangle.
   * @param other - Rectangle to subtract
   * @returns Array of rectangles representing the difference
   */
  difference(other: Rect): Rect[];

  /**
   * Expands this rectangle to include another rectangle (mutating).
   * @param other - Rectangle to include
   */
  boundingRect(other: Rect): void;

  /**
   * Creates a bounding rectangle that contains both input rectangles.
   * @param rect1 - First rectangle
   * @param rect2 - Second rectangle
   * @returns New Rect bounding both inputs, or null if either is null
   */
  static boundingRect(rect1: Rect | null, rect2: Rect | null): Rect | null;

  /**
   * Checks if this rectangle contains a coordinate or another rectangle.
   * @param target - Coordinate or Rect to test
   * @returns True if target is fully contained
   */
  contains(target: Coordinate | Rect): boolean;

  /**
   * Calculates squared distance from rectangle to coordinate.
   * @param coord - Target coordinate
   * @returns Squared Euclidean distance (0 if inside)
   */
  squaredDistance(coord: Coordinate): number;

  /**
   * Calculates distance from rectangle to coordinate.
   * @param coord - Target coordinate
   * @returns Euclidean distance (0 if inside)
   */
  distance(coord: Coordinate): number;

  /**
   * Gets the dimensions of this rectangle.
   * @returns A Size instance
   */
  getSize(): Size;

  /**
   * Gets the top-left corner coordinate.
   * @returns Coordinate of top-left corner
   */
  getTopLeft(): Coordinate;

  /**
   * Gets the center coordinate.
   * @returns Coordinate of center point
   */
  getCenter(): Coordinate;

  /**
   * Gets the bottom-right corner coordinate.
   * @returns Coordinate of bottom-right corner
   */
  getBottomRight(): Coordinate;

  /**
   * Rounds all properties up to nearest integer.
   * @returns This rectangle (for chaining)
   */
  ceil(): this;

  /**
   * Rounds all properties down to nearest integer.
   * @returns This rectangle (for chaining)
   */
  floor(): this;

  /**
   * Rounds all properties to nearest integer.
   * @returns This rectangle (for chaining)
   */
  round(): this;

  /**
   * Translates the rectangle by the specified offset.
   * @param x - Horizontal offset (or Coordinate for both axes)
   * @param y - Vertical offset
   * @returns This rectangle (for chaining)
   */
  translate(x: number | Coordinate, y?: number): this;

  /**
   * Scales the rectangle by the specified factors.
   * @param scaleX - Horizontal scale factor
   * @param scaleY - Vertical scale factor (defaults to scaleX if omitted)
   * @returns This rectangle (for chaining)
   */
  scale(scaleX: number, scaleY?: number): this;
}

/**
 * Represents 2D dimensions (width and height).
 * Provides utility methods for size calculations and transformations.
 */
export declare class Size {
  /** Width dimension */
  width: number;
  
  /** Height dimension */
  height: number;

  /**
   * Creates a new Size instance.
   * @param width - Width value
   * @param height - Height value
   */
  constructor(width: number, height: number);

  /**
   * Checks if two sizes are equal.
   * @param size1 - First size
   * @param size2 - Second size
   * @returns True if width and height match
   */
  static equals(size1: Size | null, size2: Size | null): boolean;

  /**
   * Creates a deep copy of this size.
   * @returns A new Size instance with the same dimensions
   */
  clone(): Size;

  /**
   * Gets the longest dimension.
   * @returns Maximum of width and height
   */
  getLongest(): number;

  /**
   * Gets the shortest dimension.
   * @returns Minimum of width and height
   */
  getShortest(): number;

  /**
   * Calculates the area.
   * @returns Width × height
   */
  area(): number;

  /**
   * Calculates the perimeter.
   * @returns 2 × (width + height)
   */
  perimeter(): number;

  /**
   * Calculates the aspect ratio.
   * @returns Width / height
   */
  aspectRatio(): number;

  /**
   * Checks if the size has zero area.
   * @returns True if area is 0
   */
  isEmpty(): boolean;

  /**
   * Rounds dimensions up to nearest integer.
   * @returns This size (for chaining)
   */
  ceil(): this;

  /**
   * Checks if this size fits inside another size.
   * @param container - Size to test against
   * @returns True if both dimensions are less than or equal to container
   */
  fitsInside(container: Size): boolean;

  /**
   * Rounds dimensions down to nearest integer.
   * @returns This size (for chaining)
   */
  floor(): this;

  /**
   * Rounds dimensions to nearest integer.
   * @returns This size (for chaining)
   */
  round(): this;

  /**
   * Scales dimensions by the specified factors.
   * @param scaleX - Horizontal scale factor
   * @param scaleY - Vertical scale factor (defaults to scaleX if omitted)
   * @returns This size (for chaining)
   */
  scale(scaleX: number, scaleY?: number): this;

  /**
   * Scales this size to cover a target size (maintaining aspect ratio).
   * At least one dimension will match the target; the other may exceed it.
   * @param target - Size to cover
   * @returns This size (for chaining)
   */
  scaleToCover(target: Size): this;

  /**
   * Scales this size to fit inside a target size (maintaining aspect ratio).
   * At least one dimension will match the target; the other may be smaller.
   * @param target - Size to fit within
   * @returns This size (for chaining)
   */
  scaleToFit(target: Size): this;
}

/**
 * Represents a 2D coordinate point (x, y).
 * Provides methods for vector operations, transformations, and distance calculations.
 */
export declare class Coordinate {
  /** Horizontal position */
  x: number;
  
  /** Vertical position */
  y: number;

  /**
   * Creates a new Coordinate instance.
   * @param x - X coordinate (defaults to 0)
   * @param y - Y coordinate (defaults to 0)
   */
  constructor(x?: number, y?: number);

  /**
   * Creates a deep copy of this coordinate.
   * @returns A new Coordinate instance with the same values
   */
  clone(): Coordinate;

  /**
   * Checks if this coordinate equals another.
   * @param other - Coordinate to compare
   * @returns True if x and y match
   */
  equals(other: Coordinate): boolean;

  /**
   * Checks if two coordinates are equal.
   * @param coord1 - First coordinate
   * @param coord2 - Second coordinate
   * @returns True if x and y match
   */
  static equals(coord1: Coordinate | null, coord2: Coordinate | null): boolean;

  /**
   * Calculates Euclidean distance between two coordinates.
   * @param coord1 - First coordinate
   * @param coord2 - Second coordinate
   * @returns Distance between points
   */
  static distance(coord1: Coordinate, coord2: Coordinate): number;

  /**
   * Calculates the magnitude (length) of a coordinate vector.
   * @param coord - Coordinate to measure
   * @returns Vector magnitude from origin
   */
  static magnitude(coord: Coordinate): number;

  /**
   * Calculates squared distance between two coordinates (faster than distance).
   * @param coord1 - First coordinate
   * @param coord2 - Second coordinate
   * @returns Squared distance between points
   */
  static squaredDistance(coord1: Coordinate, coord2: Coordinate): number;

  /**
   * Computes the vector difference between two coordinates.
   * @param coord1 - First coordinate
   * @param coord2 - Second coordinate
   * @returns New Coordinate representing coord1 - coord2
   */
  static difference(coord1: Coordinate, coord2: Coordinate): Coordinate;

  /**
   * Computes the vector sum of two coordinates.
   * @param coord1 - First coordinate
   * @param coord2 - Second coordinate
   * @returns New Coordinate representing coord1 + coord2
   */
  static sum(coord1: Coordinate, coord2: Coordinate): Coordinate;

  /**
   * Rounds coordinates up to nearest integer.
   * @returns This coordinate (for chaining)
   */
  ceil(): this;

  /**
   * Rounds coordinates down to nearest integer.
   * @returns This coordinate (for chaining)
   */
  floor(): this;

  /**
   * Rounds coordinates to nearest integer.
   * @returns This coordinate (for chaining)
   */
  round(): this;

  /**
   * Translates the coordinate by the specified offset.
   * @param x - Horizontal offset (or Coordinate for both axes)
   * @param y - Vertical offset
   * @returns This coordinate (for chaining)
   */
  translate(x: number | Coordinate, y?: number): this;

  /**
   * Scales the coordinate by the specified factors.
   * @param scaleX - Horizontal scale factor
   * @param scaleY - Vertical scale factor (defaults to scaleX if omitted)
   * @returns This coordinate (for chaining)
   */
  scale(scaleX: number, scaleY?: number): this;

  /**
   * Rotates the coordinate around a center point by radians.
   * @param angleRadians - Rotation angle in radians
   * @param center - Center of rotation (defaults to origin)
   */
  rotateRadians(angleRadians: number, center?: Coordinate): void;

  /**
   * Rotates the coordinate around a center point by degrees.
   * @param angleDegrees - Rotation angle in degrees
   * @param center - Center of rotation (defaults to origin)
   */
  rotateDegrees(angleDegrees: number, center?: Coordinate): void;
}