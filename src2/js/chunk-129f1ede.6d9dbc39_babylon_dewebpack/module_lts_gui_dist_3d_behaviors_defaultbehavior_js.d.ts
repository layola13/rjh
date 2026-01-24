import type { Scene } from "core/scene";
import type { TransformNode } from "core/Meshes/transformNode";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Observer } from "core/Misc/observable";
import type { FollowBehavior } from "core/Behaviors/Meshes/followBehavior";
import type { SixDofDragBehavior } from "core/Behaviors/Meshes/sixDofDragBehavior";
import type { SurfaceMagnetismBehavior } from "core/Behaviors/Meshes/surfaceMagnetismBehavior";
import type { PickingInfo } from "core/Collisions/pickingInfo";

/**
 * Default behavior combining follow, six degrees of freedom drag, and surface magnetism behaviors
 * for 3D GUI controls and interactive objects.
 */
export declare class DefaultBehavior {
    /**
     * The name identifier for this behavior.
     * @returns Always returns "Default"
     */
    readonly name: string;

    /**
     * Enable or disable the follow behavior component.
     * When enabled, the object will follow the camera or target.
     * @default false
     */
    followBehaviorEnabled: boolean;

    /**
     * Enable or disable the six degrees of freedom drag behavior component.
     * When enabled, the object can be dragged in 3D space.
     * @default true
     */
    sixDofDragBehaviorEnabled: boolean;

    /**
     * Enable or disable the surface magnetism behavior component.
     * When enabled, the object will snap to nearby surfaces during drag operations.
     * @default true
     */
    surfaceMagnetismBehaviorEnabled: boolean;

    /**
     * The transform node that this behavior is currently attached to.
     * Null when not attached to any node.
     */
    attachedNode: TransformNode | null;

    /**
     * Gets the internal follow behavior instance.
     * Manages object following logic (camera or target tracking).
     */
    readonly followBehavior: FollowBehavior;

    /**
     * Gets the internal six degrees of freedom drag behavior instance.
     * Handles 3D dragging with full rotational and translational freedom.
     */
    readonly sixDofDragBehavior: SixDofDragBehavior;

    /**
     * Gets the internal surface magnetism behavior instance.
     * Provides surface snapping functionality during interactions.
     */
    readonly surfaceMagnetismBehavior: SurfaceMagnetismBehavior;

    /**
     * Creates a new instance of DefaultBehavior with default settings.
     */
    constructor();

    /**
     * Initialize the behavior.
     * Called before attaching to perform any necessary setup.
     */
    init(): void;

    /**
     * Attach the behavior to a transform node.
     * 
     * @param node - The transform node to attach the behavior to
     * @param draggableMeshes - Optional array of meshes that can be used to initiate dragging.
     *                          If null, the attached node itself will be draggable.
     * @param surfaceMeshes - Optional array of meshes to use for surface magnetism detection.
     *                        Objects will snap to surfaces of these meshes during drag.
     */
    attach(
        node: TransformNode,
        draggableMeshes?: AbstractMesh[] | null,
        surfaceMeshes?: AbstractMesh[]
    ): void;

    /**
     * Detach the behavior from its current node.
     * Cleans up all observers and sub-behaviors.
     */
    detach(): void;

    /**
     * Internal scene reference for observer management.
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
     * Observer for the scene's before render observable.
     * Updates follow behavior state based on drag status.
     * @internal
     */
    private _onBeforeRenderObserver: Observer<Scene> | null;

    /**
     * Observer for the drag behavior's drag observable.
     * Handles surface magnetism during drag operations.
     * @internal
     */
    private _onDragObserver: Observer<{ pickInfo: PickingInfo }> | null;

    /**
     * Registers observable handlers for behavior coordination.
     * Manages interaction between follow, drag, and surface magnetism behaviors.
     * @internal
     */
    private _addObservables(): void;

    /**
     * Unregisters all observable handlers.
     * Called during detach to clean up event subscriptions.
     * @internal
     */
    private _removeObservables(): void;
}