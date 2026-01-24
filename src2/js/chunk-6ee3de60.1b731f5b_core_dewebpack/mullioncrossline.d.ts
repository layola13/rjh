import { Segment, Point, Vector, Line } from './geometry';
import { Utils } from './utils';
import { WinPolygon } from './polygon';
import { DragDrawTool, ToolType } from './tools';
import { ShapeManager } from './shapeManager';
import { SashManager } from './sashManager';

/**
 * Represents a polygon with an identifier
 */
interface AvailablePolygon extends WinPolygon {
  /** Unique identifier for the polygon */
  polyId: any;
  
  /**
   * Checks if this polygon intersects with a segment
   * @param segment - The segment to check intersection with
   * @returns Array of intersection points
   */
  intersect(segment: Segment): Point[];
  
  /**
   * Checks if this polygon contains a point
   * @param point - The point to check
   * @returns True if the point is contained within the polygon
   */
  contains(point: Point): boolean;
  
  /** Bounding box of the polygon */
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

/**
 * Represents a shape with polygons and sash information
 */
interface Shape {
  /** Main polygon of the shape */
  polygon: WinPolygon;
  
  /** List of available polygons for this shape */
  avaiablePoly: AvailablePolygon[];
  
  /** List of polygon IDs currently in use */
  usedPoly: any[];
  
  /** Sash manager for this shape */
  sashManager: SashManager;
}

/**
 * Represents a sash with available polygons
 */
interface Sash {
  /** List of available polygons for this sash */
  avaiablePoly: AvailablePolygon[];
}

/**
 * Tool for drawing cross lines on mullions
 * Extends DragDrawTool to provide interactive line drawing with snapping
 */
export declare class MullionCrossLine extends DragDrawTool {
  /** Starting point of the drag operation */
  protected firstPt: Point;
  
  /** Current cursor position during drag */
  protected curPt: Point;
  
  /** Auxiliary visual element for preview */
  protected aux: WinPolygon | null;
  
  /**
   * Creates a new MullionCrossLine tool instance
   * @param view - The view context for the tool
   */
  constructor(view: any);
  
  /**
   * Creates an auxiliary preview line based on current drag state
   * Snaps to nearest 45-degree angle increment
   * @remarks
   * - If start and current points are equal, creates a vertical line
   * - Otherwise, snaps to nearest 45° angle (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°)
   */
  protected makeAux(): void;
  
  /**
   * Finalizes the drag operation and creates mullion cross lines
   * @param polygon - The polygon representing the drawn line
   * @remarks
   * - Attempts to snap the line to existing edges
   * - If no snap point found, adjusts line to integer coordinates
   * - Intersects with available polygons and creates mullions at intersection points
   * - Releases tool if no valid intersections found
   */
  protected finishDrag(polygon: WinPolygon): void;
  
  /**
   * Adjusts a line segment to align with integer grid coordinates
   * @param segment - The segment to adjust
   * @returns Adjusted segment with coordinates snapped to integer values
   * @remarks
   * - Only applies adjustment if all shapes are rectangular
   * - Only adjusts horizontal or vertical lines
   * - Snaps to floor of coordinate values if within tolerance (0.05 units)
   */
  protected adjustLineForInteger(segment: Segment): Segment;
}