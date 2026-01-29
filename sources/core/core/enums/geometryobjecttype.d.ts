/**
 * Geometry object type enumeration
 * Defines various 2D geometry primitives supported by the system
 */
export enum GeometryObjectType {
  /**
   * Unknown or uninitialized geometry type
   */
  Unknown = 0,

  /**
   * 2D point geometry
   */
  Point2d = 1,

  /**
   * 2D arc geometry (portion of a circle)
   */
  Arc2d = 2,

  /**
   * 2D circle geometry (complete circular curve)
   */
  Circle2d = 3,

  /**
   * 2D line segment geometry (straight line between two points)
   */
  LineSegment2d = 4,

  /**
   * 2D poly-curve geometry (composite curve made of multiple segments)
   */
  PolyCurve2d = 5
}