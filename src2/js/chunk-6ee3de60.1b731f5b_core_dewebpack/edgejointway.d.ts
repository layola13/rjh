/**
 * Defines the connection style between edge segments in a graph or diagram.
 * Determines how edges join at connection points or routing waypoints.
 */
export enum EdgeJointWay {
  /**
   * Default joining behavior.
   * Uses system or context-dependent default routing.
   */
  Default = 0,

  /**
   * Horizontal joining style.
   * Edges connect using horizontal line segments.
   */
  Horizontal = 1,

  /**
   * Vertical joining style.
   * Edges connect using vertical line segments.
   */
  Vertical = 2,

  /**
   * Diagonal joining style.
   * Edges connect using diagonal line segments.
   */
  Diagonal = 3,

  /**
   * Separated joining style.
   * Edges are kept separate without direct connection.
   */
  Separated = 4
}