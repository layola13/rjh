/**
 * Represents a 2D face with outer loop containing curves
 */
interface Face2D {
  /** The outer boundary loop of the face */
  outerLoop: Loop;
}

/**
 * Represents a closed loop consisting of multiple curves
 */
interface Loop {
  /** Array of curves that form the loop */
  curves: Curve[];
  
  /**
   * Get discrete points representing the loop geometry
   * @returns Array of 2D points
   */
  getDiscretePoints(): Point2D[];
}

/**
 * Represents a 2D point
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a bounding box in 2D space
 */
interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Represents a curve segment in a 2D face
 */
interface Curve {
  /** Unique identifier for the curve */
  id: string | number;
  
  /** Indicates if this curve is a background element */
  isbackground?: boolean;
  
  /** Parent entities that reference this curve */
  parents: Record<string, ParentEntity>;
}

/**
 * Represents a parent entity that can contain curves
 */
interface ParentEntity {
  /**
   * Get the top-level unique parent entity
   * @returns The unique parent Face2D
   */
  getUniqueParent(): Face2D;
}

/**
 * Decorator class for Face2D that provides advanced curve analysis and removal operations.
 * Used to identify and filter curves based on parent relationships and spatial containment.
 */
declare class Face2dDecorator {
  /** The Face2D instance being decorated */
  private readonly _face2d: Face2D;

  /**
   * Creates a new Face2dDecorator instance
   * @param face2d - The 2D face to decorate
   */
  constructor(face2d: Face2D);

  /**
   * Analyzes the face's curves and determines which curves should be removed based on:
   * 1. Curves with no valid parents outside the current face
   * 2. Curves belonging to parent faces contained within the current face
   * 3. Curves belonging to parent faces that contain the current face (prioritized by nesting depth)
   * 4. Curves belonging to parent faces that don't overlap with the current face
   * 
   * @returns Array of curves that should be removed, or empty array if no curves qualify
   */
  findCurvesToRemove(): Curve[];

  /**
   * Checks if a given polygon's outer wire contains any curve with an identical ID
   * to curves in the decorated face's outer loop
   * 
   * @param polygon - The Face2D polygon to check against
   * @returns True if at least one curve ID matches, false otherwise
   */
  isPolygonOuterWireHasIdenticalCurve(polygon: Face2D): boolean;
}

export { Face2dDecorator };