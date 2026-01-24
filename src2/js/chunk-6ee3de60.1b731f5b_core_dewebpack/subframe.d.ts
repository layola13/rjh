import { View } from './View';
import { Shape, Frame, CornerJoiner, Connector, WinPolygon, PartialSubFrame } from './shapes';
import { Direction } from './Direction';
import { EdgeJointWay } from './EdgeJointWay';

/**
 * Represents a sub-frame structure that groups multiple frame components together.
 * A SubFrame manages the rendering, boundary calculation, and serialization of grouped frame elements.
 */
export declare class SubFrame {
  /**
   * The components (shapes) that belong to this sub-frame
   */
  components: Array<Frame | CornerJoiner | Connector>;

  /**
   * Reference to the parent view that contains this sub-frame
   */
  view: View;

  /**
   * The profile size (thickness) of the frame edges in pixels
   * @default 24
   */
  profileSize: number;

  /**
   * The way edges are joined together
   * @default EdgeJointWay.Default
   */
  edgeJointWay: EdgeJointWay;

  /**
   * Internal array of partial sub-frame parts used for rendering
   */
  parts: PartialSubFrame[];

  /**
   * Sides that should not be rendered (hidden from view)
   */
  hiddenSides: Direction[];

  /**
   * The overall boundary polygon of this sub-frame
   */
  boundary: WinPolygon;

  /**
   * Color manager for rendering colors
   */
  colorManager: ColorManager;

  /**
   * Creates a new SubFrame instance
   * @param components - The shapes that make up this sub-frame
   * @param view - The parent view containing this sub-frame
   */
  constructor(components: Array<Frame | CornerJoiner | Connector>, view: View);

  /**
   * Finds the SubFrame that contains the given component
   * @param component - The component to search for
   * @returns The SubFrame containing the component, or undefined if not found
   */
  static findBy(component: Shape): SubFrame | undefined;

  /**
   * Gets all Frame components in this sub-frame
   */
  readonly frames: Frame[];

  /**
   * Gets all CornerJoiner components in this sub-frame
   */
  readonly cornerJoiners: CornerJoiner[];

  /**
   * Gets all Connector components in this sub-frame
   */
  readonly connectors: Connector[];

  /**
   * Checks if a point hits any bar in the sub-frame and highlights it
   * @param point - The point to test for intersection
   * @returns True if a bar was hit, false otherwise
   */
  hitBar(point: Point): boolean;

  /**
   * Renders the sub-frame and all its parts to the view
   */
  draw(): void;

  /**
   * Clears all rendered parts and recycles resources
   */
  clear(): void;

  /**
   * Recalculates the polygon boundaries for all parts of the sub-frame
   * This includes computing the overall boundary and creating frame managers
   */
  updatePoly(): void;

  /**
   * Serializes the sub-frame to a JSON-compatible object
   * @returns Object containing component UIDs, profile size, edge joint way, and hidden sides
   */
  toJSON(): {
    /** Component unique identifiers */
    cs: string[];
    /** Profile size */
    ps: number;
    /** Edge joint way */
    ejw: EdgeJointWay;
    /** Hidden sides */
    hs: Direction[];
  };

  /**
   * Deserializes a sub-frame from a JSON object
   * @param data - The serialized sub-frame data
   */
  deserialize(data: {
    cs: string[];
    ps: number;
    ejw: EdgeJointWay;
    hs: Direction[];
  }): void;

  /**
   * Updates all related targets (dimensions, polygons) after changes
   * Also refreshes total width/height and optimizes the view
   */
  updateRelatedTargets(): void;

  /**
   * Creates a half corner joiner polygon based on boundary constraints
   * @param cornerJoiner - The corner joiner to process
   * @param minX - Minimum X boundary
   * @param maxX - Maximum X boundary
   * @param includeInBounds - Whether to include edges within bounds (true) or outside (false)
   * @returns A polygon representing half of the corner joiner
   */
  halfCj(
    cornerJoiner: CornerJoiner,
    minX: number,
    maxX: number,
    includeInBounds: boolean
  ): WinPolygon;

  /**
   * Joins two edges into a closed polygon
   * @param edge1 - First edge
   * @param edge2 - Second edge
   * @returns A polygon formed by connecting the two edges
   */
  join2Edges(edge1: Edge, edge2: Edge): WinPolygon;

  /**
   * Computes the overall boundary polygon from corner coordinates
   * @param minX - Minimum X coordinate
   * @param minY - Minimum Y coordinate
   * @param maxX - Maximum X coordinate
   * @param maxY - Maximum Y coordinate
   */
  computeOverallBoundary(minX: number, minY: number, maxX: number, maxY: number): void;

  /**
   * Finds the inner polygon by offsetting edges inward
   * @param polygon - The outer polygon
   * @param offsets - Array of offset distances for each edge
   * @returns The inner polygon with edges offset by the specified amounts
   */
  findInnerPoly(polygon: WinPolygon, offsets: number[]): WinPolygon;

  /**
   * Finds the minimum X coordinate among components
   * @param components - Array of components to search
   * @returns The minimum X coordinate
   */
  xmin(components: Shape[]): number;

  /**
   * Finds the maximum X coordinate among components
   * @param components - Array of components to search
   * @returns The maximum X coordinate
   */
  xmax(components: Shape[]): number;

  /**
   * Finds the minimum Y coordinate among components
   * @param components - Array of components to search
   * @returns The minimum Y coordinate
   */
  ymin(components: Shape[]): number;

  /**
   * Finds the maximum Y coordinate among components
   * @param components - Array of components to search
   * @returns The maximum Y coordinate
   */
  ymax(components: Shape[]): number;

  /**
   * Unifies multiple shape polygons into a single polygon using boolean union
   * @param shapes - Array of shapes or polygons to unify
   * @returns A single unified polygon
   */
  unifyShapePolygon(shapes: Array<Shape | WinPolygon>): WinPolygon;

  /**
   * Creates a rectangular polygon from two corner points
   * @param minX - Minimum X coordinate
   * @param minY - Minimum Y coordinate
   * @param maxX - Maximum X coordinate
   * @param maxY - Maximum Y coordinate
   * @returns A rectangular polygon
   */
  polyFrom2Pts(minX: number, minY: number, maxX: number, maxY: number): WinPolygon;
}