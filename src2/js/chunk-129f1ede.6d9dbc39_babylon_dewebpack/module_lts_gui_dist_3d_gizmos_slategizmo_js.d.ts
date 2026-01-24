import { Gizmo } from "core/Gizmos/gizmo";
import { TransformNode } from "core/Meshes/transformNode";
import { Quaternion } from "core/Maths/math.quaternion";
import { Vector3, TmpVectors } from "core/Maths/math.vector";
import { Matrix } from "core/Maths/math.matrix";
import { Observer } from "core/Misc/observable";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { Scene } from "core/scene";
import { PivotTools } from "core/Misc/pivotTools";
import { CornerHandle, SideHandle, GizmoHandle } from "./gizmoHandle";
import { HolographicSlate } from "../controls3D/holographicSlate";
import { PointerInfo } from "core/Events/pointerEvents";

/**
 * Defines the dimensions and origin offset for a corner handle
 */
interface CornerHandleConfig {
    /** The direction vector for dimension changes (-1 or 1 for each axis) */
    dimensions: Vector3;
    /** The origin point offset for this corner */
    origin: Vector3;
}

/**
 * Bounding box representation for the gizmo
 */
interface BoundingBoxData {
    /** Minimum corner of the bounding box */
    min: Vector3;
    /** Maximum corner of the bounding box */
    max: Vector3;
}

/**
 * Drag behavior callback for corner handles
 */
type CornerDragCallback = (
    origin: Vector3,
    dimensions: Vector3,
    delta: Vector3,
    config: CornerHandleConfig
) => void;

/**
 * Gizmo for manipulating 3D slate controls with corner and side handles
 * Allows resizing and rotating slate UI elements in 3D space
 */
export declare class SlateGizmo extends Gizmo {
    /** Dimensions of the bounding box */
    private _boundingDimensions: Vector3;
    
    /** Observer for render loop updates */
    private _renderObserver: Observer<Scene> | null;
    
    /** Temporary quaternion for calculations */
    private _tmpQuaternion: Quaternion;
    
    /** Temporary vector for calculations */
    private _tmpVector: Vector3;
    
    /** Parent transform node for all handles */
    private _handlesParent: TransformNode;
    
    /** Array of corner resize handles */
    private _corners: CornerHandle[];
    
    /** Array of side rotation handles */
    private _sides: SideHandle[];
    
    /** Bounding box min/max vectors */
    private _boundingBoxGizmo: BoundingBoxData;
    
    /** Margin between handles and slate edges (as a ratio) */
    private _margin: number;
    
    /** Size of each handle (as a ratio of slate dimensions) */
    private _handleSize: number;
    
    /** The currently attached slate control */
    private _attachedSlate: HolographicSlate | null;
    
    /** Observer for slate picking events */
    private _pickedPointObserver: Observer<PointerInfo> | null;
    
    /** Currently hovered handle */
    private _handleHovered: GizmoHandle | null;
    
    /** Currently dragged handle */
    private _handleDragged: GizmoHandle | null;
    
    /** Cached scale of the attached slate */
    private _existingSlateScale: Vector3;
    
    /**
     * If set, handle sizes will remain constant on screen regardless of distance
     * @default false
     */
    fixedScreenSize: boolean;
    
    /**
     * Distance scaling factor for fixed screen size mode
     * @default 10
     */
    fixedScreenSizeDistanceFactor: number;

    /**
     * Creates a new SlateGizmo instance
     * @param gizmoLayer - The utility layer scene for rendering gizmo elements
     */
    constructor(gizmoLayer: any);

    /**
     * Gets the currently attached holographic slate
     */
    get attachedSlate(): HolographicSlate | null;

    /**
     * Attaches the gizmo to a holographic slate control
     * @param slate - The slate to attach to, or null to detach
     */
    set attachedSlate(slate: HolographicSlate | null);

    /**
     * Creates the transform node hierarchy and all handle instances
     * @internal
     */
    private _createNode(): void;

    /**
     * Constrains a delta vector to maintain aspect ratio
     * @param delta - The input delta vector (modified in place)
     * @param aspectRatio - The target aspect ratio (width/height)
     * @param invertY - Whether to invert the Y component
     * @internal
     */
    private _keepAspectRatio(delta: Vector3, aspectRatio: number, invertY?: boolean): void;

    /**
     * Clamps dimension changes to respect minimum slate dimensions
     * @param delta - The dimension change vector (modified in place)
     * @param currentDimensions - Current slate dimensions
     * @param scaleDirection - Direction multipliers for scaling
     * @param preserveAspectRatio - Whether to maintain aspect ratio while clamping
     * @internal
     */
    private _clampDimensions(
        delta: Vector3,
        currentDimensions: Vector3,
        scaleDirection: Vector3,
        preserveAspectRatio?: boolean
    ): void;

    /**
     * Applies a handle movement to update slate origin and dimensions
     * @param origin - Original origin position
     * @param dimensions - Original dimensions
     * @param delta - Movement delta in local space
     * @param config - Corner handle configuration
     * @param preserveAspectRatio - Whether to maintain aspect ratio
     * @internal
     */
    private _moveHandle(
        origin: Vector3,
        dimensions: Vector3,
        delta: Vector3,
        config: CornerHandleConfig,
        preserveAspectRatio: boolean
    ): void;

    /**
     * Attaches drag behavior to a corner handle for resizing
     * @param handle - The corner handle to configure
     * @param callback - Callback function invoked during drag
     * @param config - Corner configuration (dimensions and origin)
     * @internal
     */
    private _assignDragBehaviorCorners(
        handle: CornerHandle,
        callback: CornerDragCallback,
        config: CornerHandleConfig
    ): void;

    /**
     * Attaches drag behavior to a side handle for rotation
     * @param handle - The side handle to configure
     * @param rotationAxis - The local axis to rotate around
     * @internal
     */
    private _assignDragBehaviorSides(handle: SideHandle, rotationAxis: Vector3): void;

    /**
     * Called when the attached node changes
     * @param node - The newly attached node
     * @internal
     */
    protected _attachedNodeChanged(node: AbstractMesh | null): void;

    /**
     * Updates the bounding box and handle positions to match the current slate
     */
    updateBoundingBox(): void;

    /**
     * Updates handle positions based on current bounding box
     * @internal
     */
    private _updateHandlesPosition(): void;

    /**
     * Updates handle scaling based on slate dimensions and settings
     * @internal
     */
    private _updateHandlesScaling(): void;

    /**
     * Updates gizmo state each frame
     * @internal
     */
    protected _update(): void;

    /**
     * Disposes of the gizmo and all its handles
     */
    dispose(): void;
}