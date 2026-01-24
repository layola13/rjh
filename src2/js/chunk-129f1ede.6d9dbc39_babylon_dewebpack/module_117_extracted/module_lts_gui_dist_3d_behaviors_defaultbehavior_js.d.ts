import type { Scene } from "core/scene";
import type { TransformNode } from "core/Meshes/transformNode";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Observer } from "core/Misc/observable";
import type { PickingInfo } from "core/Collisions/pickingInfo";
import type { FollowBehavior } from "core/Behaviors/Meshes/followBehavior";
import type { SixDofDragBehavior } from "core/Behaviors/Meshes/sixDofDragBehavior";
import type { SurfaceMagnetismBehavior } from "core/Behaviors/Meshes/surfaceMagnetismBehavior";
import type { Behavior } from "core/Behaviors/behavior";

/**
 * Default behavior combining follow, six degrees of freedom drag, and surface magnetism behaviors.
 * This behavior manages the interaction between these three sub-behaviors to provide
 * a comprehensive control system for 3D objects in mixed reality scenarios.
 */
export declare class DefaultBehavior implements Behavior<TransformNode> {
  /**
   * The name identifier for this behavior.
   * @returns Always returns "Default"
   */
  readonly name: string;

  /**
   * Determines whether the follow behavior is enabled.
   * When true, the attached node will follow a target (e.g., camera or user).
   * @default false
   */
  followBehaviorEnabled: boolean;

  /**
   * Determines whether the six degrees of freedom drag behavior is enabled.
   * When true, allows free manipulation of the object in 3D space.
   * @default true
   */
  sixDofDragBehaviorEnabled: boolean;

  /**
   * Determines whether the surface magnetism behavior is enabled.
   * When true, allows the object to snap to surfaces during drag operations.
   * @default true
   */
  surfaceMagnetismBehaviorEnabled: boolean;

  /**
   * The node that this behavior is currently attached to.
   * Null when not attached to any node.
   */
  attachedNode: TransformNode | null;

  /**
   * Gets the follow behavior instance.
   * This behavior makes the node follow a target transform.
   */
  readonly followBehavior: FollowBehavior;

  /**
   * Gets the six degrees of freedom drag behavior instance.
   * This behavior allows full 3D manipulation with position and rotation control.
   */
  readonly sixDofDragBehavior: SixDofDragBehavior;

  /**
   * Gets the surface magnetism behavior instance.
   * This behavior snaps the node to nearby surfaces during interactions.
   */
  readonly surfaceMagnetismBehavior: SurfaceMagnetismBehavior;

  /**
   * Initializes the default behavior.
   * Called once when the behavior is created.
   */
  init(): void;

  /**
   * Attaches the behavior to a transform node.
   * @param target - The transform node to attach this behavior to
   * @param draggableMeshes - Optional array of meshes that can be used to initiate dragging
   * @param magnetismMeshes - Optional array of meshes to test for surface magnetism snapping
   */
  attach(
    target: TransformNode,
    draggableMeshes?: AbstractMesh[] | null,
    magnetismMeshes?: AbstractMesh[]
  ): void;

  /**
   * Detaches the behavior from its current node.
   * Removes all observers and cleans up sub-behaviors.
   */
  detach(): void;

  /**
   * The scene reference for this behavior.
   * @internal
   */
  private _scene: Scene;

  /**
   * Internal follow behavior instance.
   * @internal
   */
  private _followBehavior: FollowBehavior;

  /**
   * Internal six DOF drag behavior instance.
   * @internal
   */
  private _sixDofDragBehavior: SixDofDragBehavior;

  /**
   * Internal surface magnetism behavior instance.
   * @internal
   */
  private _surfaceMagnetismBehavior: SurfaceMagnetismBehavior;

  /**
   * Observer for before render events.
   * Used to coordinate follow and drag behaviors.
   * @internal
   */
  private _onBeforeRenderObserver: Observer<Scene> | null;

  /**
   * Observer for drag events.
   * Used to enable surface magnetism during dragging.
   * @internal
   */
  private _onDragObserver: Observer<{ pickInfo: PickingInfo }> | null;

  /**
   * Adds observable listeners to coordinate sub-behaviors.
   * @internal
   */
  private _addObservables(): void;

  /**
   * Removes all observable listeners.
   * @internal
   */
  private _removeObservables(): void;
}