/**
 * Module: WFACompsMovement
 * Provides movement gizmo components for interactive object manipulation in 3D space.
 * Supports directional movement arrows with camera-aware visibility and styling.
 */

import type { Vector3, Quaternion, Matrix, Node, MeshBasicMaterial, RasterizerCullMode } from './367441';
import type { Vector3 as BabylonVector3, Matrix4, Quaternion as BabylonQuaternion } from './815362';
import type { HSApp } from './518193';
import type { HSCore } from './635589';
import type { WFABase, WFABaseController } from './770439';
import type { ActiveType } from './289659';
import type { MoveArrowColor, MoveArrowScaleFactor } from './44182';

/**
 * Scale configuration for movement gizmo based on camera distance
 */
interface GizmoScale {
  /** 3D scale vector for the gizmo */
  scale: BabylonVector3;
  /** Radius scale factor */
  scaleRadius: number;
}

/**
 * Drag event parameters for content movement
 */
interface DragStartEvent {
  /** Whether movement is constrained within room boundaries */
  constraintInRoom?: boolean;
  /** Movement method identifier */
  moveby?: string;
  /** Direction vector for movement */
  moveDir?: BabylonVector3;
  /** Face of the host object where content is attached */
  hostFace?: unknown;
}

/**
 * Drag movement event parameters
 */
interface DragMoveEvent {
  /** Enable linear movement constraint */
  linearMove?: boolean;
  /** Movement offset [x, y, z] */
  offset?: [number, number, number];
  /** Direction vector for movement */
  moveDir?: BabylonVector3;
  /** Movement method identifier */
  moveby?: string;
}

/**
 * Main movement gizmo component class.
 * Renders directional arrows for moving content objects in 3D space.
 * Handles camera-relative positioning, scaling, and visibility.
 */
export declare class WFACompsMovement extends WFABase {
  /** Root node containing the gizmo mesh */
  node: Node;

  /**
   * Creates a movement gizmo instance
   * @param param1 - First constructor parameter (inherited from WFABase)
   * @param param2 - Second constructor parameter (inherited from WFABase)
   * @param param3 - Content items to manipulate
   * @param param4 - Fourth constructor parameter (inherited from WFABase)
   * @param param5 - Fifth constructor parameter (inherited from WFABase)
   * @param param6 - Sixth constructor parameter (inherited from WFABase)
   * @param param7 - Optional controller instance, defaults to new MovementController
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown,
    param6: unknown,
    param7?: MovementController
  );

  /**
   * Determines if the gizmo should be visible.
   * Hides when facing away from camera.
   * @returns True if gizmo should be shown
   */
  protected _isShowEnable(): boolean;

  /**
   * Handles active state changes.
   * Updates gizmo opacity based on activation state.
   */
  protected _onActiveChange(): void;

  /**
   * Mouse move event handler.
   * Updates cursor to pointer when hovering.
   * @returns False to prevent event propagation
   */
  onMouseMove(): boolean;

  /**
   * Checks if the gizmo is facing towards the camera
   * @returns True if facing camera (angle cosine >= 0)
   */
  protected _isTowardsCamra(): boolean;

  /**
   * Calculates the angle between gizmo direction and camera direction
   * @returns Angle in radians
   */
  protected _getAngleToCamera(): number;

  /**
   * Calculates scale and radius based on camera distance and type
   * @returns Scale configuration object
   */
  protected _getGizmoScale(): GizmoScale;

  /**
   * Updates the gizmo's transform (position, rotation, scale) based on camera
   */
  protected _updateNodeTransform(): void;

  /**
   * Calculates gizmo rotation to face the camera appropriately
   * @returns Rotation quaternion
   */
  protected _getGizmoRotation(): BabylonQuaternion;

  /**
   * Gets the movement direction vector based on active type
   * @returns Direction vector (left/right/top/bottom/near/far)
   */
  protected _getDirection(): BabylonVector3;

  /**
   * Public accessor for movement direction
   * @returns Direction vector
   */
  getMoveDir(): BabylonVector3;

  /**
   * Gets the base rotation quaternion for the active type
   * @returns Base rotation before camera alignment
   */
  protected _getBaseRotation(): BabylonQuaternion;

  /**
   * Calculates gizmo world position offset from content center
   * @param scaleRadius - Radius scale factor
   * @returns World position vector
   */
  protected _getGizmoPosition(scaleRadius: number): BabylonVector3;

  /**
   * Applies normal (non-hovered) color styling to the gizmo.
   * Color varies by direction: red (left/right), green (near/far), blue (top/bottom)
   */
  protected _setNormalStyler(): void;

  /**
   * Applies hover color styling to the gizmo.
   * Uses brighter colors than normal state
   */
  protected _setHoverStyler(): void;

  /**
   * Initializes the gizmo mesh geometry from static mesh data
   */
  protected _initMesh(): void;

  /**
   * Builds the mesh node hierarchy from SVG path data
   * @param data - SVG path data containing fill and stroke information
   * @returns Object containing root node and stroke mesh reference
   */
  protected _buildMesh(data: {
    paths: Array<{
      userData: {
        style: {
          fill?: string;
          fillOpacity?: number;
          stroke?: string;
          strokeOpacity?: number;
        };
      };
      toShapes(isCCW: boolean): unknown[];
      subPaths: Array<{
        getPoints(): unknown[];
      }>;
    }>;
  }): {
    node: Node;
    strokeMesh: Node;
  };

  /**
   * Gets the angle between two vectors relative to a normal axis
   * @param vec1 - First vector
   * @param vec2 - Second vector
   * @param normal - Normal axis for angle calculation
   * @returns Angle in radians
   */
  protected _getAngle(vec1: BabylonVector3, vec2: BabylonVector3, normal: BabylonVector3): number;

  /**
   * Sets mesh color and opacity
   * @param node - Target node
   * @param color - RGB color value (optional)
   * @param opacity - Opacity value (optional)
   */
  protected _setMeshColor(node: Node, color?: number, opacity?: number): void;

  /**
   * Gets the bottom center position of the content being moved
   * @returns World space position vector
   */
  protected getBottomCenterPos(): BabylonVector3;

  /**
   * Gets the coordinate system rotation
   * @returns Rotation quaternion
   */
  protected _getCoordRotation(): BabylonQuaternion;
}

/**
 * Controller for handling movement drag interactions.
 * Manages command execution and drag event lifecycle.
 */
declare class MovementController extends WFABaseController {
  /**
   * Gets the movement direction from the listener
   */
  get direction(): BabylonVector3;

  /**
   * Handles drag start event.
   * Creates and executes movement command.
   * @param event - Drag start event parameters
   * @returns True if drag started successfully
   */
  ondragstart(event: DragStartEvent): boolean;

  /**
   * Handles drag end event.
   * Clears active state.
   */
  ondragend(): void;

  /**
   * Composes drag move parameters with linear movement constraint.
   * Projects offset onto movement direction vector.
   * @param event - Drag move event parameters
   * @returns Modified event parameters
   */
  composedragmoveparam(event: DragMoveEvent): DragMoveEvent;
}