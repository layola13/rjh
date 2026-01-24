/**
 * Marker type enumeration for dimension and shadow markers
 */
export enum IMarkerType {
  /** Standard dimension marker */
  Dimension = "dimensionMarker",
  /** Shadow dimension marker with reduced opacity */
  DimensionShadow = "dimensionShadowMarker"
}

/**
 * Point in 2D space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 2D Vector utilities
 */
export interface Vector2 {
  /**
   * Calculate angle between this vector and another vector
   * @param other - Target vector
   * @returns Angle in radians
   */
  angleTo(other: Vector2): number;
}

export namespace Vector2 {
  /**
   * Get unit vector along X axis
   */
  export function X(): Vector2;
}

/**
 * Transformation matrix for SVG elements
 */
export interface Matrix {
  /**
   * Apply scaling transformation
   * @param sx - Scale factor on x-axis
   * @param sy - Scale factor on y-axis
   * @param cx - Center x coordinate
   * @param cy - Center y coordinate
   * @returns Matrix instance for chaining
   */
  scale(sx: number, sy: number, cx: number, cy: number): Matrix;
  
  /**
   * Apply translation transformation
   * @param tx - Translation on x-axis
   * @param ty - Translation on y-axis
   * @returns Matrix instance for chaining
   */
  translate(tx: number, ty: number): Matrix;
}

/**
 * SVG marker node wrapper
 */
export interface MarkerNode {
  /** Unique identifier */
  id(value?: string): string | this;
  
  /**
   * Set element attributes
   * @param attributes - Key-value pairs of attributes
   */
  attr(attributes: Record<string, unknown>): this;
  
  /**
   * Set text content
   * @param content - Text to display
   */
  text(content: string): this;
  
  /** Show the marker */
  show(): void;
  
  /** Hide the marker */
  hide(): void;
  
  /** Remove the marker from DOM */
  remove(): void;
  
  /** Marker instance */
  instance?: MarkerNode;
}

/**
 * SVG element with marker support
 */
export interface SvgElement {
  /** Element ID */
  id: string;
  
  /**
   * Find element by ID
   * @param id - Element identifier
   */
  getElementById(id: string): { instance: MarkerNode } | null;
}

/**
 * SVG defs container
 */
export interface SvgDefs {
  /**
   * Create a marker element
   * @param width - Marker width
   * @param height - Marker height
   * @param builder - Function to build marker content
   */
  marker(
    width: number,
    height: number,
    builder: (element: MarkerBuilder) => void
  ): MarkerNode;
}

/**
 * Marker content builder
 */
export interface MarkerBuilder {
  /**
   * Add a path to the marker
   * @param pathData - SVG path data string
   */
  path(pathData: string): { stroke(color: string): void };
}

/**
 * Dimension curve with geometric properties
 */
export interface DimensionCurve {
  /** Get curve start point */
  getStartPt(): Point2D;
  
  /** Get curve midpoint */
  getMidPt(): Point2D;
  
  /** Get curve length in meters */
  getLength(): number;
}

/**
 * Rendering context for marker elements
 */
export interface MarkerContext {
  /** SVG root node */
  node: SvgElement;
  
  /** Get defs container for marker definitions */
  defs(): SvgDefs;
  
  /** Get current viewport scale factor */
  getScaleFactor(): number;
}

/**
 * Visual marker item for dimension annotations
 * Displays measurement arrows and length values on dimension curves
 */
export declare class MarkerItem {
  /** Rendering context */
  private readonly context: MarkerContext;
  
  /** Underlying SVG marker node */
  private node: MarkerNode | undefined;
  
  /**
   * Create a dimension marker
   * @param context - Rendering context with SVG node
   * @param type - Marker type (dimension or shadow)
   */
  constructor(context: MarkerContext, type?: IMarkerType);
  
  /**
   * Position and orient marker along a dimension curve
   * @param curve - Dimension curve to follow
   */
  setCurve(curve: DimensionCurve): void;
  
  /**
   * Get underlying SVG marker node
   */
  getNode(): MarkerNode | undefined;
  
  /**
   * Set marker attributes
   * @param attributes - Key-value pairs of SVG attributes
   * @returns This instance for chaining
   */
  attr(attributes: Record<string, unknown>): this;
  
  /** Make marker visible */
  show(): void;
  
  /** Hide marker from view */
  hide(): void;
  
  /** Remove marker and clean up resources */
  dispose(): void;
}