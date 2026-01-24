/**
 * WFABox module - Box gizmo annotation component
 * @module WFABox
 */

import { Node, Vector3, Quaternion } from './367441'; // Graphics node types
import { BoxGizmo } from './918038'; // Box gizmo implementation
import { WFABase } from './122206'; // Base annotation class

/**
 * Position interface representing 3D coordinates
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Quaternion interface representing rotation
 */
interface QuaternionRotation {
  x: number;
  y: number;
  z: number;
  w: number;
}

/**
 * WFABox class - Box-shaped annotation with visual gizmo
 * Extends WFABase to provide box-specific annotation functionality
 */
export declare class WFABox extends WFABase {
  /**
   * Internal box gizmo instance for rendering
   * @private
   */
  private _boxGizmo: BoxGizmo;

  /**
   * Creates a new WFABox instance
   * @param param1 - First constructor parameter (type unknown from context)
   * @param param2 - Second constructor parameter (type unknown from context)
   * @param param3 - Third constructor parameter (type unknown from context)
   * @param param4 - Fourth constructor parameter (type unknown from context)
   * @param param5 - Fifth constructor parameter (type unknown from context)
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown
  );

  /**
   * Initializes the box gizmo and sets up the scene graph
   * - Creates and configures the box gizmo with default color and opacity
   * - Adds the gizmo to the scene node hierarchy
   * @protected
   */
  protected init(): void;

  /**
   * Cleanup method called when the box is being destroyed
   * - Disposes the box gizmo resources
   * - Calls parent class cleanup
   * @public
   */
  onCleanup(): void;

  /**
   * Updates the node transformation matrix
   * - Applies position, scale, and rotation to the graphics node
   * - Performs range and collision checking
   * @protected
   */
  protected _updateNodeTransform(): void;

  /**
   * Gets the gizmo scale vector
   * @returns The size of the box as a 3D vector
   * @protected
   */
  protected _getGizmoScale(): Vector3;

  /**
   * Gets the gizmo rotation quaternion
   * @returns The rotation of the box as a quaternion
   * @protected
   */
  protected _getGizmoRotation(): QuaternionRotation;

  /**
   * Inherited from WFABase - gets the size of the annotation
   * @returns The dimensions of the box
   * @protected
   */
  protected _getSize(): Vector3;

  /**
   * Inherited from WFABase - gets the rotation of the annotation
   * @returns The rotation quaternion
   * @protected
   */
  protected _getRotation(): QuaternionRotation;

  /**
   * Inherited from WFABase - gets the bottom center position
   * @returns The bottom center point of the box
   * @protected
   */
  protected getBottomCenterPos(): Position3D;

  /**
   * Inherited from WFABase - checks range and collision detection
   * @param gizmo - The gizmo to check
   * @protected
   */
  protected _checkRangeAndCollision(gizmo: BoxGizmo): void;

  /**
   * Inherited from WFABase - the graphics node
   * @public
   */
  node: Node;

  /**
   * Inherited from WFABase - the layer containing this annotation
   * @public
   */
  layer: unknown;
}