/**
 * Utility class for frame-related operations including intersection detection,
 * connection analysis, and snapping functionality.
 */
export declare class FrameUtil {
  /** Reference to the main view containing shape manager */
  private readonly view: View;
  
  /** Cache of frames that intersect during recursive search */
  private readonly intersectFrames: Set<Frame | Wall>;
  
  /** Cache of frame edge connected components during search */
  private readonly frameEdgeConnectedComponents: Set<Frame | Wall | Couple>;

  /**
   * Creates a new FrameUtil instance
   * @param view - The view instance containing shape manager
   */
  constructor(view: View);

  /**
   * Gets all frames that intersect with the given segment edge
   * @param edge - The segment to check for intersections
   * @param excludeFrame - Optional frame to exclude from results
   * @returns Array of intersecting frames
   */
  getIntersectFrames(edge: Segment, excludeFrame?: Frame | Wall): Array<Frame | Wall>;

  /**
   * Finds a corner joiner that coincides with the given frame's corner edge
   * @param frame - The frame to check against corner joiners
   * @returns The coincided corner joiner or undefined
   */
  getOneCoincidedCornerJoiner(frame: Frame): CornerJoiner | undefined;

  /**
   * Finds a corner joiner that coincides with any of the given frame's edges
   * Checks both outer edges of corner joiners
   * @param frame - The frame to check against corner joiners
   * @returns The coincided corner joiner or undefined
   */
  getOneCoincidedCornerJoinerAll(frame: Frame): CornerJoiner | undefined;

  /**
   * Checks if the given edge coincides with any couple's outer edges
   * @param edge - The segment to check
   * @returns True if edge coincides with a couple
   */
  isCoincidedCouple(edge: Segment): boolean;

  /**
   * Finds the nearest frame edge to the given point
   * @param point - The point to measure distance from
   * @returns Tuple of [nearest segment, frame containing it, edge index]
   */
  getNearestFrame(point: Point): [Segment | undefined, Frame | Wall | undefined, number | undefined];

  /**
   * Finds the nearest shape edge to the given point (excluding walls)
   * @param point - The point to measure distance from
   * @returns Tuple of [nearest segment, shape containing it, edge index]
   */
  getNearestShape(point: Point): [Segment | undefined, Frame | Couple | undefined, number | undefined];

  /**
   * Recursive helper to find all intersecting frames
   * @param edge - Current edge being processed
   * @param excludeFrame - Optional frame to exclude
   * @returns Array of all intersecting frames found recursively
   */
  private getIntersectFramesHelper(edge: Segment, excludeFrame?: Frame | Wall): Array<Frame | Wall>;

  /**
   * Single iteration of intersection search (non-recursive)
   * @param edge - The segment to check
   * @param excludeFrame - Optional frame to exclude
   * @returns Array of directly intersecting frames
   */
  private getIntersectFramesOnce(edge: Segment, excludeFrame?: Frame | Wall): Array<Frame | Wall>;

  /**
   * Gets all connected components for all edges of a frame
   * @param frame - The frame to analyze
   * @returns Array of all connected shapes
   */
  getFrameConnectedComponents(frame: Frame): Array<Frame | Wall | Couple>;

  /**
   * Gets connected components for a specific wall edge
   * @param wall - The wall containing the edge
   * @param edgeIndex - Index of the edge to check
   * @returns Array of connected components
   */
  getWallEdgeConnectedComponents(wall: Wall, edgeIndex: number): ConnectedComponent[];

  /**
   * Gets connected components for a specific frame edge
   * @param frame - The frame containing the edge
   * @param edgeIndex - Index of the edge to check
   * @returns Array of connected components
   */
  getFrameEdgeConnectedComponents(frame: Frame, edgeIndex: number): ConnectedComponent[];

  /**
   * Gets connected components for a couple edge
   * @param couple - The couple shape
   * @param edge - The edge to check
   * @returns Array of connected components
   */
  getCoupleEdgeConnectedComponents(couple: Couple, edge: Segment): ConnectedComponent[];

  /**
   * Recursive helper to find all connected components
   * @param edge - Current edge being processed
   * @param excludeShape - Shape to exclude from search
   * @returns Array of all connected components found recursively
   */
  private getConnectedComponentsHelper(edge: Segment, excludeShape: Frame | Wall | Couple): ConnectedComponent[];

  /**
   * Gets directly connected components for an edge (non-recursive)
   * @param edge - The edge to check
   * @param excludeShape - Shape to exclude
   * @returns Array of directly connected components
   */
  private getConnectedComponentsOnce(edge: Segment, excludeShape: Frame | Wall | Couple): ConnectedComponent[];

  /**
   * Gets connected components for a specific frame edge (convenience method)
   * @param frame - The frame
   * @param edgeIndex - Index of the edge
   * @returns Array of connected frames/walls/couples
   */
  connectedComponents(frame: Frame, edgeIndex: number): Array<Frame | Wall | Couple>;

  /**
   * Snaps source frame to target frame, resizing and positioning it
   * @param sourceFrame - Frame to be snapped
   * @param targetFrame - Frame or couple to snap to
   * @param forceHorizontal - Force horizontal alignment if true
   */
  snapTo(sourceFrame: Frame, targetFrame: Frame | Couple, forceHorizontal?: boolean): void;

  /**
   * Finds the rightmost element in the scene
   * @returns The element with the highest x-coordinate center
   */
  findRightEndElement(): Frame | Couple | undefined;

  /**
   * Finds the nearest element to snap the given frame to
   * @param frame - The frame to find a snap target for
   * @returns Nearest frame, couple, or wall
   */
  findNearestSnapElement(frame: Frame): Frame | Couple | Wall | undefined;

  /**
   * Snaps the frame to an appropriate target
   * @param frame - Frame to snap
   * @param snapToEnd - If true, snaps to rightmost element; otherwise nearest
   */
  snapFrame(frame: Frame, snapToEnd?: boolean): void;

  /**
   * Checks if polygon contains arcs that prevent snapping
   * @param polygon - The polygon to check
   * @returns True if polygon has arcs (excluding half/quarter circle polys)
   */
  private unsnap(polygon: Polygon): boolean;
}

/**
 * Represents a connected component result with frame and edge information
 */
interface ConnectedComponent {
  /** The connected frame, wall, or couple */
  frame: Frame | Wall | Couple;
  
  /** The edge that connects */
  edge: Segment;
  
  /** Index of the edge in the frame's polygon */
  edgeIdx: number;
}

/**
 * View interface containing shape manager
 */
interface View {
  shapeManager: ShapeManager;
}

/**
 * Shape manager containing all scene shapes
 */
interface ShapeManager {
  /** Map of regular frames */
  shapem: Map<string, Frame>;
  
  /** Map of corner joiner elements */
  cornerJoiners: Map<string, CornerJoiner>;
  
  /** Array of couple elements */
  couples: Couple[];
  
  /** Array of wall elements */
  walls: Wall[];
}

/**
 * Base frame class with polygon representation
 */
interface Frame {
  readonly id: string;
  polygon: Polygon;
  updatePoly(): void;
  updateFrame(redraw: boolean): void;
  translate(vector: Vector): void;
  draw(view: View): void;
}

/**
 * Wall element (similar to Frame)
 */
interface Wall {
  readonly id: string;
  polygon: Polygon;
  isBackground: boolean;
}

/**
 * Couple element connecting two frames
 */
interface Couple {
  readonly id: string;
  polygon: Polygon;
  centerEdge: Segment;
  outerEdges: Segment[];
}

/**
 * Corner joiner element
 */
interface CornerJoiner {
  readonly id: string;
  cornerEdge: Segment;
  outerEdges: Segment[];
  draw(view: View): void;
  skewFrame(view: View): void;
}

/**
 * Connector element
 */
interface Connector {
  outerEdges: Segment[];
}

/**
 * Polygon with edges and bounding box
 */
interface Polygon {
  edges: Array<Segment | Arc>;
  box: BoundingBox;
  edge(index: number): Segment | Arc;
  resize(width?: number, height?: number): Polygon;
}

/**
 * Special polygon types
 */
interface HalfCirclePoly extends Polygon {}
interface QuarterCirclePoly extends Polygon {}

/**
 * Bounding box for shapes
 */
interface BoundingBox {
  center: Point;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/**
 * Geometric segment (line)
 */
interface Segment {
  distanceTo(other: Segment | Point): [number];
}

/**
 * Geometric arc (curve)
 */
interface Arc {}

/**
 * 2D point
 */
interface Point {
  x: number;
  y: number;
  distanceTo(other: Point): [number];
}

/**
 * 2D vector
 */
interface Vector {
  x: number;
  y: number;
  slope: number;
  invert(): Vector;
  add(other: Vector): Vector;
  multiply(scalar: number): Vector;
}

/**
 * Utility functions for geometric operations
 */
declare namespace Utils {
  /**
   * Checks if two segments coincide (overlap)
   */
  function segCoincide(seg1: Segment, seg2: Segment): boolean;
  
  /**
   * Checks if segment is vertical
   */
  function isSegVertical(seg: Segment): boolean;
  
  /**
   * Checks if segment is horizontal
   */
  function isSegHorizontal(seg: Segment): boolean;
  
  /**
   * Checks if segment is horizontal or vertical
   */
  function isHorizOrVer(seg: Segment): boolean;
}