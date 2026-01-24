/**
 * Point and wall operation command types.
 * 
 * This module defines string constants representing command class names
 * used for point and wall manipulation operations in the HSW (Home Space Workshop) system.
 * 
 * @module PointCommands
 * @frozen This object is frozen and cannot be modified at runtime
 */

/**
 * Command type identifiers for point and wall operations.
 * Each value represents a fully qualified class name in the HSW command system.
 */
export interface PointCommands {
  /**
   * Command for deleting a point.
   * @readonly
   */
  readonly DeletePoint: "hsw.cmd.point.CmdDeletePoint";

  /**
   * Command for merging walls at a specific point.
   * @readonly
   */
  readonly MergeWallOnPoint: "hsw.cmd.point.CmdMergeWallOnPoint";

  /**
   * Command for moving a point to a new position.
   * @readonly
   */
  readonly MovePoint: "hsw.cmd.point.CmdMovePoint";

  /**
   * Command for moving a non-geometry (NG) wall point.
   * @readonly
   */
  readonly MoveNgWallPoint: "hsw.cmd.wall.CmdMoveNGWallPoint";
}

/**
 * Frozen object containing all point and wall operation command identifiers.
 * 
 * @example
 *