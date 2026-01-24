import type { Point, Vector, Line, Segment } from './geometry';
import type { ShapeManager, Shape } from './shape';
import type { SashManager, Sash } from './sash';
import type { FrameElement } from './frame';
import type { Polygon } from './polygon';
import type { MullionManager } from './mullion';
import type { View } from './view';

/**
 * Enum representing the type of equal split operation for mullions
 */
export enum EqualSplitType {
  /** Split type for outer boundaries */
  Outter = 'Outter'
}

/**
 * Geometry utility functions
 */
declare module './geometry' {
  export default {
    /** Creates a line segment between two points */
    segment(start: Point, end: Point): Segment;
    /** Creates a vector from coordinates or between two points */
    vector(x: number, y: number): Vector;
    vector(from: Point, to: Point): Vector;
    /** Creates an infinite line from a point and direction vector */
    line(point: Point, direction: Vector): Line;
  };
}

/**
 * Glass calculation utilities
 */
declare module './glass' {
  export class Glass {
    /** Recalculates serial numbers for all shapes */
    static calcSerial(shapes: Shape[]): void;
  }
}

/**
 * Represents a polygon with availability status
 */
interface AvailablePolygon extends Polygon {
  /** Unique identifier for this polygon */
  polyId: PolyId;
  
  /**
   * Checks if this polygon intersects with a line
   * @returns Array of intersection points
   */
  intersect(line: Line): Point[];
  
  /**
   * Checks if a point is contained within this polygon
   */
  contains(point: Point): boolean;
  
  /**
   * Partitions this polygon into equal segments
   * @param count - Number of equal parts to create
   * @param vertical - Whether to partition vertically (true) or horizontally (false)
   * @returns Array of polygon partitions with bounding boxes
   */
  partition(count: number, vertical: boolean): Array<{ box: { center: Point } }>;
}

/**
 * Polygon identifier with equality comparison
 */
interface PolyId {
  /** Checks if this ID equals another */
  equalTo(other: PolyId): boolean;
}

/**
 * Manages mullion splitting operations
 */
interface MullionSplitter {
  /** All split lines created by this splitter */
  lines: Array<{
    /** Type of equal split applied to this line */
    equalSplit?: EqualSplitType;
  }>;
}

/**
 * Manages mullions for a frame element
 */
interface MullionManager {
  /** The splitter that generates mullion lines */
  splitter: MullionSplitter;
}

/**
 * A frame element (shape or sash) that can contain mullions
 */
interface FrameElementWithMullions extends FrameElement {
  /** Unique identifier */
  id: string | number;
  
  /** Polygons currently in use by this element */
  usedPoly: PolyId[];
  
  /** Polygons available for mullion placement */
  avaiablePoly: AvailablePolygon[];
  
  /** Manager for mullion operations */
  mulManager: MullionManager;
  
  /** Parent frame for updates */
  topFrame: {
    /** Updates the frame structure */
    updateFrame(deep: boolean): void;
    /** Renders the frame in the view */
    draw(view: View): void;
  };
}

/**
 * A shape (window/door panel) that can contain sashes and mullions
 */
interface Shape extends FrameElementWithMullions {
  /** Manager for sash operations */
  sashManager: SashManager;
}

/**
 * A sash (openable frame) that can contain mullions
 */
interface Sash extends FrameElementWithMullions {}

/**
 * Manages all sashes within a shape
 */
interface SashManager {
  /** All sashes in this manager */
  allSashes: Sash[];
}

/**
 * Manages all shapes in the view
 */
interface ShapeManager {
  /** All shapes managed by this instance */
  shapem: Shape[];
  
  /**
   * Adds a new mullion (dividing bar) to all applicable shapes
   * @param line - The line defining the mullion position
   */
  addMullion(line: Line): void;
}

/**
 * Manages tool interactions in the view
 */
interface ToolManager {
  /** Releases the currently active tool */
  releaseTool(): void;
}

/**
 * Main application view containing all managers
 */
interface View {
  /** Manages all shapes in the view */
  shapeManager: ShapeManager;
  
  /** Manages tool interactions */
  toolManager: ToolManager;
}

/**
 * Drag event containing edge information
 */
interface DragEvent {
  /**
   * Gets an edge from the drag operation
   * @param index - Edge index (0-based)
   */
  edge(index: number): Line;
}

/**
 * Base class for mullion cross line operations
 */
declare class MullionCrossLine {
  /** The view this tool operates on */
  protected view: View;
  
  constructor(view: View);
}

/**
 * Tool for creating equally-spaced mullions by dragging a line across frames.
 * When the user completes a drag, this tool divides intersected polygons into
 * equal segments and adds mullions at the division points.
 * 
 * @example
 *