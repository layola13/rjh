import { Edge } from './Edge';
import { Slab } from './Slab';
import { Loop } from './Loop';
import { Vertex } from './Vertex';
import { Command } from './Command';
import { Request } from './Request';
import { Gizmo } from './Gizmo';

/**
 * Represents a 2D point in space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a 3D point in space
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * Represents a line segment defined by two points
 */
type LineSegment = [Point2D, Point2D];

/**
 * A polygon represented as an array of 2D points
 */
type Polygon = Point2D[];

/**
 * Constraint information for edge movement
 */
interface ConstraintInfo {
  /** Original position of the point before movement */
  originalPoint: Point2D;
  /** Whether a new edge needs to be inserted */
  needInsertNewEdge: boolean;
  /** First connected edge at this point */
  connectEdge1?: Edge;
  /** Second connected edge at this point */
  connectEdge2?: Edge;
  /** Line that constrains movement */
  constraintLine?: LineSegment;
  /** First constraint point */
  constraintPoint1?: Vertex;
  /** Second constraint point */
  constraintPoint2?: Vertex;
  /** Extended vertex reference */
  extVertex?: Vertex;
  /** Original position of extended point */
  extOriginalPoint?: Point2D;
  /** First extended connected edge */
  extConnectEdge1?: Edge;
  /** Second extended connected edge */
  extConnectEdge2?: Edge;
  /** Extended constraint line */
  extConstraintLine?: LineSegment;
  /** First extended constraint point */
  extConstraintPoint1?: Point2D;
  /** Second extended constraint point */
  extConstraintPoint2?: Point2D;
  /** Newly created edge during operation */
  newEdge?: Edge;
  /** Original vertex before modification */
  originalVertex?: Vertex;
}

/**
 * Result of checking if a new edge insertion is needed
 */
interface EdgeInsertionCheckResult {
  /** Whether a new edge needs to be inserted */
  needInsertNewEdge: boolean;
  /** Target constraint point for insertion */
  constraintPoint?: Vertex;
  /** Extended constraint point for insertion */
  extConstraintPoint?: Point2D;
}

/**
 * Saved vertex position data for undo/redo
 */
interface SavedVertexData {
  from: Point3D;
  to: Point3D;
  originalFromVertex?: Point3D;
  originalToVertex?: Point3D;
  extFromVertex?: Point3D;
  extToVertex?: Point3D;
}

/**
 * Event data for mouse/drag operations
 */
interface MoveEventData {
  /** Offset from original position */
  offset?: { x: number; y: number } | [number, number];
  /** Current position */
  position?: { x: number; y: number } | [number, number];
}

/**
 * Command for moving split edges in the floor plan
 * 
 * This command handles the interactive movement of split edges while maintaining
 * geometric constraints and preventing invalid configurations like self-intersections.
 * 
 * @example
 *