/**
 * Represents a node in a Binary Space Partitioning (BSP) tree.
 * Used for constructive solid geometry (CSG) operations like union, intersection, and difference.
 */
export declare class BSPNode {
  /**
   * The plane that divides space at this node.
   */
  plane: Plane | null;

  /**
   * Polygons that lie on the dividing plane.
   */
  polygons: Polygon[];

  /**
   * BSP node representing the front half-space (positive side of the plane).
   */
  front: BSPNode | null;

  /**
   * BSP node representing the back half-space (negative side of the plane).
   */
  back: BSPNode | null;

  /**
   * Creates a new BSP node.
   * @param polygons - Optional array of polygons to build the BSP tree from.
   */
  constructor(polygons?: Polygon[]);

  /**
   * Creates a deep copy of this BSP node and its entire subtree.
   * @returns A new BSPNode with cloned plane, polygons, and child nodes.
   */
  clone(): BSPNode;

  /**
   * Inverts this BSP tree by flipping all polygons and swapping front/back subtrees.
   * Converts solid space to empty space and vice versa.
   */
  invert(): void;

  /**
   * Clips a list of polygons against this BSP tree, removing parts that lie inside.
   * @param polygons - Array of polygons to clip.
   * @returns Array of clipped polygon fragments that lie outside this BSP tree.
   */
  clipPolygons(polygons: Polygon[]): Polygon[];

  /**
   * Recursively removes all polygons in this BSP tree that are inside the given BSP tree.
   * @param bsp - The BSP tree to clip against.
   */
  clipTo(bsp: BSPNode): void;

  /**
   * Collects all polygons from this node and all descendant nodes.
   * @returns Array containing all polygons in the entire subtree.
   */
  allPolygons(): Polygon[];

  /**
   * Builds a BSP tree from a list of polygons by recursively subdividing space.
   * @param polygons - Array of polygons to partition into the tree structure.
   */
  build(polygons: Polygon[]): void;
}

/**
 * Represents a plane in 3D space used for partitioning polygons.
 */
export interface Plane {
  /**
   * Creates a deep copy of this plane.
   */
  clone(): Plane;

  /**
   * Flips the plane's orientation (reverses normal direction).
   */
  flip(): void;

  /**
   * Splits a polygon by this plane into multiple categories.
   * @param polygon - The polygon to split.
   * @param coplanarFront - Array to receive coplanar polygons facing the same direction as the plane.
   * @param coplanarBack - Array to receive coplanar polygons facing opposite to the plane.
   * @param front - Array to receive polygon fragments in front of the plane.
   * @param back - Array to receive polygon fragments behind the plane.
   */
  splitPolygon(
    polygon: Polygon,
    coplanarFront: Polygon[],
    coplanarBack: Polygon[],
    front: Polygon[],
    back: Polygon[]
  ): void;
}

/**
 * Represents a convex polygon in 3D space.
 */
export interface Polygon {
  /**
   * The plane equation derived from this polygon's vertices.
   */
  plane: Plane;

  /**
   * Creates a deep copy of this polygon.
   */
  clone(): Polygon;

  /**
   * Flips the polygon by reversing vertex order and normal direction.
   */
  flip(): void;
}

export default BSPNode;