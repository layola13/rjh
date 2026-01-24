import { Observable } from "core/Misc/observable";
import { Vector2, Vector3, Vector4, Quaternion, Viewport, Epsilon, Scalar } from "core/Maths/math";
import { Mesh, VertexData } from "core/Meshes/mesh";
import { CreateBox, CreatePlane } from "core/Meshes/Builders/meshBuilder";
import { Scene } from "core/scene";
import { PointerDragBehavior } from "core/Behaviors/Meshes/pointerDragBehavior";
import { ContentDisplay3D } from "./contentDisplay3D";
import { TouchHolographicButton } from "./touchHolographicButton";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import { Control } from "../../2D/controls/control";
import { TextBlock, TextWrapping } from "../../2D/controls/textBlock";
import { DefaultBehavior } from "../behaviors/defaultBehavior";
import { SlateGizmo } from "../gizmos/slateGizmo";
import { FluentMaterial } from "../materials/fluent/fluentMaterial";
import { FluentBackplateMaterial } from "../materials/fluentBackplate/fluentBackplateMaterial";

/**
 * Represents a holographic slate control with a title bar and content area.
 * Provides 3D UI panel with draggable content, follow behavior, and close functionality.
 */
export declare class HolographicSlate extends ContentDisplay3D {
    /**
     * Base URL for loading MRTK assets
     */
    static readonly ASSETS_BASE_URL: string;

    /**
     * Filename for the close icon asset
     */
    static readonly CLOSE_ICON_FILENAME: string;

    /**
     * Filename for the follow icon asset
     */
    static readonly FOLLOW_ICON_FILENAME: string;

    /**
     * Default text resolution height in pixels
     */
    private static readonly _DEFAULT_TEXT_RESOLUTION_Y: number;

    /**
     * Margin between title bar and content area
     */
    titleBarMargin: number;

    /**
     * Origin point of the slate in local space
     */
    origin: Vector3;

    /**
     * Minimum dimensions the slate can be resized to
     */
    minDimensions: Vector2;

    /**
     * Default dimensions of the slate
     */
    defaultDimensions: Vector2;

    /**
     * Internal dimensions storage
     */
    private _dimensions: Vector2;

    /**
     * Height of the title bar
     */
    private _titleBarHeight: number;

    /**
     * Title text displayed in the title bar
     */
    private _titleText: string;

    /**
     * Scale ratio for content zoom/pan operations
     */
    private _contentScaleRatio: number;

    /**
     * Viewport defining the visible region of content texture
     */
    private _contentViewport: Viewport;

    /**
     * Follow button control for enabling/disabling follow behavior
     */
    private _followButton: TouchHolographicButton;

    /**
     * Close button control for disposing the slate
     */
    private _closeButton: TouchHolographicButton;

    /**
     * Drag behavior for panning content within the slate
     */
    private _contentDragBehavior: PointerDragBehavior;

    /**
     * Material for the title bar
     */
    private _titleBarMaterial: FluentBackplateMaterial;

    /**
     * Material for the content display area
     */
    private _contentMaterial: FluentMaterial;

    /**
     * Material for the back plate
     */
    private _backMaterial: FluentBackplateMaterial;

    /**
     * Mesh representing the title bar
     */
    private _titleBar: Mesh;

    /**
     * Mesh for displaying the title text
     */
    private _titleBarTitle: Mesh;

    /**
     * Text component for the title
     */
    private _titleTextComponent: TextBlock;

    /**
     * Mesh representing the content display surface
     */
    private _contentPlate: Mesh;

    /**
     * Mesh representing the back plate
     */
    private _backPlate: Mesh;

    /**
     * Default interaction behavior handler
     */
    private _defaultBehavior: DefaultBehavior;

    /**
     * Gizmo for visual manipulation and bounds display
     */
    private _gizmo: SlateGizmo;

    /**
     * Observer for picked point changes
     */
    private _pickedPointObserver: Observer<Vector3> | null;

    /**
     * Observer for position changes during drag operations
     */
    private _positionChangedObserver: Observer<{ position: Vector3 }> | null;

    /**
     * Gets the default behavior handler for this slate
     */
    get defaultBehavior(): DefaultBehavior;

    /**
     * Gets or sets the dimensions of the slate.
     * Enforces minimum dimensions and maintains aspect ratio when needed.
     */
    get dimensions(): Vector2;
    set dimensions(value: Vector2);

    /**
     * Gets or sets the height of the title bar
     */
    get titleBarHeight(): number;
    set titleBarHeight(value: number);

    /**
     * Gets or sets the rendering group ID for all slate meshes
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);

    /**
     * Gets or sets the title text displayed in the title bar
     */
    get title(): string;
    set title(value: string);

    /**
     * Creates a new HolographicSlate instance
     * @param name - Name identifier for the slate
     */
    constructor(name?: string);

    /**
     * Applies a texture facade to the content material
     * @param texture - Texture to apply to the content plate
     */
    protected _applyFacade(texture: any): void;

    /**
     * Adds a control to the slate and prepares it for rendering
     * @param control - Control to add
     */
    protected _addControl(control: any): void;

    /**
     * Returns the type name of this control
     * @returns Type name string
     */
    protected _getTypeName(): string;

    /**
     * Positions and scales all child elements (title bar, buttons, plates) based on current dimensions
     */
    protected _positionElements(): void;

    /**
     * Applies the current content viewport to the content plate's texture UV coordinates
     */
    protected _applyContentViewport(): void;

    /**
     * Resets the content viewport to default position and scale
     */
    protected _resetContentPositionAndZoom(): void;

    /**
     * Updates the pivot point of the slate mesh based on current dimensions and origin
     */
    protected _updatePivot(): void;

    /**
     * Creates and initializes all mesh nodes for the slate
     * @param scene - Scene to create meshes in
     * @returns Root mesh node
     */
    protected _createNode(scene: Scene): Mesh;

    /**
     * Attaches drag behavior to the content plate for panning functionality
     */
    protected _attachContentPlateBehavior(): void;

    /**
     * Applies materials to all slate meshes
     * @param mesh - Root mesh to apply materials to
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Prepares the slate node for rendering and sets up behaviors
     * @param scene - Scene to prepare in
     */
    protected _prepareNode(scene: Scene): void;

    /**
     * Resets the slate to default dimensions and positions it in front of the camera
     * @param resetDimensions - Whether to reset dimensions to default values
     */
    resetDefaultAspectAndPose(resetDimensions?: boolean): void;

    /**
     * Disposes of the slate and all associated resources
     */
    dispose(): void;
}