import { Gizmo } from "core/Gizmos/gizmo";
import { TransformNode } from "core/Meshes/transformNode";
import { Quaternion } from "core/Maths/math.quaternion";
import { Vector3, TmpVectors } from "core/Maths/math.vector";
import { Matrix } from "core/Maths/math.matrix";
import { Observer } from "core/Misc/observable";
import { Scene } from "core/scene";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { CornerHandle, SideHandle, GizmoHandle } from "./gizmoHandle";
import { Slate } from "../controls/slate";
import { PickingInfo } from "core/Collisions/pickingInfo";

/**
 * Configuration for handle movement constraints
 */
interface HandleDimensions {
  /** Direction vector for dimension scaling (-1, 0, or 1 for each axis) */
  dimensions: Vector3;
  /** Origin point offset for the handle */
  origin: Vector3;
}

/**
 * Bounding box representation for the gizmo
 */
interface BoundingBox {
  /** Minimum corner of the bounding box */
  min: Vector3;
  /** Maximum corner of the bounding box */
  max: Vector3;
}

/**
 * Callback for handle drag operations
 */
type HandleDragCallback = (
  origin: Vector3,
  dimensions: Vector3,
  delta: Vector3,
  config: HandleDimensions
) => void;

/**
 * Gizmo for manipulating slate controls in 3D space.
 * Provides corner handles for resizing and side handles for rotation.
 */
export declare class SlateGizmo extends Gizmo {
  /** Minimum margin around slate edges for handle positioning (in normalized units) */
  private readonly HANDLE_MARGIN = 0.35;
  
  /** Default size of interaction handles (in normalized units) */
  private readonly DEFAULT_HANDLE_SIZE = 0.075;

  /** Current dimensions of the attached slate's bounding box */
  private _boundingDimensions: Vector3;
  
  /** Observer for scene render events */
  private _renderObserver: Observer<Scene> | null;
  
  /** Temporary quaternion for calculations */
  private _tmpQuaternion: Quaternion;
  
  /** Temporary vector for calculations */
  private _tmpVector: Vector3;
  
  /** Corner handles for resizing (4 corners) */
  private _corners: CornerHandle[];
  
  /** Side handles for rotation (4 sides) */
  private _sides: SideHandle[];
  
  /** Parent transform node containing all handle nodes */
  private _handlesParent: TransformNode;
  
  /** Bounding box data for the gizmo */
  private _boundingBoxGizmo: BoundingBox;
  
  /** Spacing margin between slate edge and handles */
  private _margin: number;
  
  /** Size of the interaction handles */
  private _handleSize: number;
  
  /** Currently attached slate control */
  private _attachedSlate: Slate | null;
  
  /** Last known scale of the attached slate */
  private _existingSlateScale: Vector3;
  
  /** Observer for slate picking events */
  private _pickedPointObserver: Observer<PickingInfo> | null;
  
  /** Currently hovered handle */
  private _handleHovered: GizmoHandle | null;
  
  /** Currently dragged handle */
  private _handleDragged: GizmoHandle | null;

  /**
   * Whether handles maintain fixed screen size regardless of distance.
   * When true, handles scale based on camera distance.
   */
  fixedScreenSize: boolean;

  /**
   * Distance factor for fixed screen size calculation.
   * Larger values make handles appear smaller at the same distance.
   */
  fixedScreenSizeDistanceFactor: number;

  /**
   * Gets the currently attached slate control
   */
  get attachedSlate(): Slate | null;

  /**
   * Sets the slate control to be manipulated by this gizmo.
   * Attaches the gizmo to the slate's mesh and sets up picking observers.
   * @param value - The slate to attach, or null to detach
   */
  set attachedSlate(value: Slate | null);

  /**
   * Creates a new SlateGizmo instance
   * @param gizmoLayer - The utility layer for rendering gizmo elements
   */
  constructor(gizmoLayer: any);

  /**
   * Creates the transform node hierarchy and all handle nodes.
   * Sets up 4 corner handles for resizing and 4 side handles for rotation.
   */
  private _createNode(): void;

  /**
   * Constrains a movement vector to maintain aspect ratio.
   * Projects the input vector onto a diagonal line defined by the aspect ratio.
   * @param movement - The movement vector to constrain (modified in place)
   * @param aspectRatio - Target width/height ratio
   * @param invertY - Whether to invert the Y component of the constraint
   */
  private _keepAspectRatio(
    movement: Vector3,
    aspectRatio: number,
    invertY?: boolean
  ): void;

  /**
   * Clamps dimension changes to respect minimum slate dimensions.
   * Ensures the resulting dimensions don't go below slate's minDimensions.
   * @param dimensionDelta - Dimension change vector (modified in place)
   * @param currentDimensions - Current slate dimensions
   * @param direction - Direction vector indicating which dimensions are changing
   * @param maintainAspectRatio - Whether to enforce aspect ratio during clamping
   */
  private _clampDimensions(
    dimensionDelta: Vector3,
    currentDimensions: Vector3,
    direction: Vector3,
    maintainAspectRatio?: boolean
  ): void;

  /**
   * Applies handle movement to update slate origin and dimensions.
   * Handles coordinate transformations and constraint application.
   * @param origin - Original slate origin position
   * @param dimensions - Original slate dimensions
   * @param delta - Movement delta in local space
   * @param config - Handle configuration defining movement constraints
   * @param maintainAspectRatio - Whether to maintain aspect ratio during movement
   */
  private _moveHandle(
    origin: Vector3,
    dimensions: Vector3,
    delta: Vector3,
    config: HandleDimensions,
    maintainAspectRatio: boolean
  ): void;

  /**
   * Assigns drag behavior to a corner handle for resizing operations.
   * Sets up onDragStart, onDrag, and onDragEnd callbacks.
   * @param handle - The corner handle to configure
   * @param callback - Function to call during drag with movement data
   * @param config - Handle configuration defining resize constraints
   */
  private _assignDragBehaviorCorners(
    handle: CornerHandle,
    callback: HandleDragCallback,
    config: HandleDimensions
  ): void;

  /**
   * Assigns drag behavior to a side handle for rotation operations.
   * Calculates rotation based on angular movement around the pivot point.
   * @param handle - The side handle to configure
   * @param axis - Local rotation axis for this handle
   */
  private _assignDragBehaviorSides(handle: SideHandle, axis: Vector3): void;

  /**
   * Called when the attached node changes.
   * Triggers bounding box update if a valid node is attached.
   * @param node - The newly attached node, or null
   */
  protected _attachedNodeChanged(node: TransformNode | null): void;

  /**
   * Recalculates and updates the bounding box based on the attached mesh hierarchy.
   * Temporarily resets transform to get accurate local bounds, then restores it.
   */
  updateBoundingBox(): void;

  /**
   * Updates the positions of all handles based on the current bounding box.
   * Places corner handles at box corners and side handles at edge midpoints.
   * Applies margin offset to position handles outside the slate bounds.
   */
  private _updateHandlesPosition(): void;

  /**
   * Updates the scale of all handles based on slate dimensions.
   * Ensures handles maintain consistent visual size relative to slate size.
   */
  private _updateHandlesScaling(): void;

  /**
   * Per-frame update callback.
   * Handles fixed screen size scaling and position updates.
   */
  protected _update(): void;

  /**
   * Disposes of the gizmo and all associated resources.
   * Removes observers and disposes all handle objects.
   */
  dispose(): void;
}