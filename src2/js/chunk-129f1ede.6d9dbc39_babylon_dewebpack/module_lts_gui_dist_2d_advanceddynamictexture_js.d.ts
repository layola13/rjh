import { DynamicTexture } from 'core/Materials/Textures/dynamicTexture';
import { Observable } from 'core/Misc/observable';
import { Scene } from 'core/scene';
import { Nullable } from 'core/types';
import { Observer } from 'core/Misc/observable';
import { Vector2, Vector3 } from 'core/Maths/math.vector';
import { Viewport } from 'core/Maths/math.viewport';
import { Matrix } from 'core/Maths/math.matrix';
import { PointerInfo, PointerEventTypes } from 'core/Events/pointerEvents';
import { KeyboardInfo } from 'core/Events/keyboardEvents';
import { ClipboardInfo, ClipboardEventTypes } from 'core/Events/clipboardEvents';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { Layer } from 'core/Layers/layer';
import { Engine } from 'core/Engines/engine';
import { Camera } from 'core/Cameras/camera';
import { Container } from './controls/container';
import { Control } from './controls/control';
import { Style } from './style';
import { Measure } from './measure';

/**
 * Interface for serialized AdvancedDynamicTexture content
 */
export interface IAdvancedDynamicTextureSerializedContent {
    /** Root container serialization data */
    root: Record<string, unknown>;
    /** Texture width in pixels */
    width: number;
    /** Texture height in pixels */
    height: number;
}

/**
 * Material creation callback for mesh-attached textures
 */
export type MaterialCreationCallback = (
    mesh: AbstractMesh,
    uniqueId: string,
    texture: AdvancedDynamicTexture,
    emissiveOnly: boolean
) => void;

/**
 * Class used to create interactive 2D user interfaces rendered as textures
 * Can be used as fullscreen overlay or attached to mesh surfaces
 */
export declare class AdvancedDynamicTexture extends DynamicTexture {
    /**
     * Base URL for loading GUI snippets from the cloud
     */
    static SnippetUrl: string;

    /**
     * Define if cached data should be used for GPU optimization
     */
    static AllowGPUOptimizations: boolean;

    /**
     * Observable raised when the GUI is fully ready (all controls loaded)
     */
    readonly onGuiReadyObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable raised when clipboard copy event occurs
     */
    readonly onClipboardObservable: Observable<ClipboardInfo>;

    /**
     * Observable raised when a control is picked by pointer
     */
    readonly onControlPickedObservable: Observable<Control>;

    /**
     * Observable raised before layout calculation begins
     */
    readonly onBeginLayoutObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable raised after layout calculation completes
     */
    readonly onEndLayoutObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable raised before rendering begins
     */
    readonly onBeginRenderObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable raised after rendering completes
     */
    readonly onEndRenderObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Gets the number of layout calls in the last frame
     */
    readonly numLayoutCalls: number;

    /**
     * Gets the number of render calls in the last frame
     */
    readonly numRenderCalls: number;

    /**
     * Gets or sets the render scale factor (higher = better quality but slower)
     */
    renderScale: number;

    /**
     * Gets or sets the background color (CSS format: "#RRGGBB" or "rgba(r,g,b,a)")
     */
    background: string;

    /**
     * Gets or sets the ideal width for adaptive scaling
     * When set, the GUI will scale to maintain this width
     */
    idealWidth: number;

    /**
     * Gets or sets the ideal height for adaptive scaling
     * When set, the GUI will scale to maintain this height
     */
    idealHeight: number;

    /**
     * Gets or sets whether to use the smallest ideal dimension for scaling
     * True: uses minimum of width/height ratio
     * False: prioritizes idealWidth if set, otherwise idealHeight
     */
    useSmallestIdeal: boolean;

    /**
     * Gets or sets whether to render at ideal size internally
     * When true, renders at ideal resolution and scales output
     */
    renderAtIdealSize: boolean;

    /**
     * Gets the computed ideal ratio for adaptive scaling
     */
    readonly idealRatio: number;

    /**
     * Gets the associated layer (for fullscreen mode)
     */
    readonly layer: Nullable<Layer>;

    /**
     * Gets the root container holding all controls
     */
    readonly rootContainer: Container;

    /**
     * Gets or sets the currently focused control
     */
    focusedControl: Nullable<Control>;

    /**
     * Gets or sets whether this is a foreground or background layer
     */
    isForeground: boolean;

    /**
     * Gets or sets clipboard data for copy/paste operations
     */
    clipboardData: string;

    /**
     * Gets or sets whether to use invalidated rectangle optimization
     * When true, only redraws changed regions
     */
    useInvalidateRectOptimization: boolean;

    /**
     * Gets or sets whether to premultiply alpha channel
     */
    premulAlpha: boolean;

    /**
     * Gets or sets whether to invert Y-axis on texture updates
     */
    applyYInversionOnUpdate: boolean;

    /**
     * Gets or sets whether to check pointer events every frame
     * When false, only checks on pointer move/interaction
     */
    checkPointerEveryFrame: boolean;

    /**
     * Creates a new AdvancedDynamicTexture
     * @param name Texture name
     * @param width Texture width (0 for auto in fullscreen mode)
     * @param height Texture height (0 for auto in fullscreen mode)
     * @param scene Scene to attach to
     * @param generateMipMaps Whether to generate mipmaps
     * @param samplingMode Texture sampling mode
     * @param invertY Whether to invert Y-axis
     */
    constructor(
        name: string,
        width?: number,
        height?: number,
        scene?: Nullable<Scene>,
        generateMipMaps?: boolean,
        samplingMode?: number,
        invertY?: boolean
    );

    /**
     * Gets class name
     * @returns "AdvancedDynamicTexture"
     */
    getClassName(): string;

    /**
     * Gets all immediate children (root container only)
     * @returns Array containing the root container
     */
    getChildren(): Container[];

    /**
     * Gets all descendant controls recursively
     * @param directDescendantsOnly If true, only returns direct children
     * @param predicate Optional filter function
     * @returns Array of controls
     */
    getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];

    /**
     * Gets all controls of a specific type
     * @param typeName Type name to search for (e.g., "Button", "TextBlock")
     * @returns Array of matching controls
     */
    getControlsByType(typeName: string): Control[];

    /**
     * Finds a control by name
     * @param name Control name to search for
     * @returns Matching control or null if not found
     */
    getControlByName(name: string): Nullable<Control>;

    /**
     * Executes a callback on all controls recursively
     * @param callback Function to execute on each control
     * @param container Starting container (defaults to root)
     */
    executeOnAllControls(callback: (control: Control) => void, container?: Container): void;

    /**
     * Marks a rectangular region as invalid (needs redraw)
     * @param left Left coordinate
     * @param top Top coordinate
     * @param right Right coordinate (inclusive)
     * @param bottom Bottom coordinate (inclusive)
     */
    invalidateRect(left: number, top: number, right: number, bottom: number): void;

    /**
     * Marks the entire texture as dirty (needs redraw)
     */
    markAsDirty(): void;

    /**
     * Creates a new style for controls
     * @returns New Style instance
     */
    createStyle(): Style;

    /**
     * Adds a control to the root container
     * @param control Control to add
     * @returns This texture for chaining
     */
    addControl(control: Control): AdvancedDynamicTexture;

    /**
     * Removes a control from the root container
     * @param control Control to remove
     * @returns This texture for chaining
     */
    removeControl(control: Control): AdvancedDynamicTexture;

    /**
     * Moves overlapping controls away from each other
     * @param overlapGroup Group identifier or array of controls
     * @param deltaStep Distance to move per iteration
     * @param repelFactor Strength of repulsion (higher = stronger)
     */
    moveToNonOverlappedPosition(
        overlapGroup?: string | Control[],
        deltaStep?: number,
        repelFactor?: number
    ): void;

    /**
     * Disposes the texture and all associated resources
     */
    dispose(): void;

    /**
     * Projects a 3D position to 2D GUI coordinates
     * @param position 3D world position
     * @param worldMatrix World transformation matrix
     * @returns 2D coordinates
     */
    getProjectedPosition(position: Vector3, worldMatrix: Matrix): Vector2;

    /**
     * Projects a 3D position to 2D GUI coordinates with depth
     * @param position 3D world position
     * @param worldMatrix World transformation matrix
     * @returns 3D coordinates (x, y, depth)
     */
    getProjectedPositionWithZ(position: Vector3, worldMatrix: Matrix): Vector3;

    /**
     * Performs picking at specified coordinates
     * @param x X coordinate
     * @param y Y coordinate
     * @param viewport Optional viewport for picking transform
     */
    pick(x: number, y: number, viewport?: Nullable<Viewport>): void;

    /**
     * Attaches the texture to pointer events (for fullscreen mode)
     */
    attach(): void;

    /**
     * Registers clipboard event listeners
     */
    registerClipboardEvents(): void;

    /**
     * Unregisters clipboard event listeners
     */
    unRegisterClipboardEvents(): void;

    /**
     * Attaches the texture to a mesh surface
     * @param mesh Mesh to attach to
     * @param supportPointerMove Whether to track pointer move events on the mesh
     */
    attachToMesh(mesh: AbstractMesh, supportPointerMove?: boolean): void;

    /**
     * Moves focus to a specific control
     * @param control Control to focus
     */
    moveFocusToControl(control: Control): void;

    /**
     * Serializes the GUI content
     * @returns Serialized data object
     */
    serializeContent(): IAdvancedDynamicTextureSerializedContent;

    /**
     * Parses serialized GUI data
     * @param serializedObject Serialized data
     * @param scaleToSize Whether to scale to original size
     */
    parseSerializedObject(serializedObject: IAdvancedDynamicTextureSerializedContent, scaleToSize?: boolean): void;

    /**
     * Alias for parseSerializedObject (legacy)
     */
    parseContent: (serializedObject: IAdvancedDynamicTextureSerializedContent, scaleToSize?: boolean) => void;

    /**
     * Clones this texture
     * @param name Optional name for the clone
     * @returns Cloned texture
     */
    clone(name?: string): AdvancedDynamicTexture;

    /**
     * Loads GUI from a snippet server
     * @param snippetId Snippet identifier or "_BLANK" for empty
     * @param scaleToSize Whether to scale to snippet's original size
     * @param targetTexture Optional existing texture to parse into
     * @returns Promise resolving to the texture
     */
    static ParseFromSnippetAsync(
        snippetId: string,
        scaleToSize?: boolean,
        targetTexture?: AdvancedDynamicTexture
    ): Promise<AdvancedDynamicTexture>;

    /**
     * Loads GUI from a snippet into this texture
     * @param snippetId Snippet identifier
     * @param scaleToSize Whether to scale to snippet's original size
     * @returns Promise resolving to this texture
     */
    parseFromSnippetAsync(snippetId: string, scaleToSize?: boolean): Promise<AdvancedDynamicTexture>;

    /**
     * Loads GUI from a URL
     * @param url URL to load from
     * @param scaleToSize Whether to scale to file's original size
     * @param targetTexture Optional existing texture to parse into
     * @returns Promise resolving to the texture
     */
    static ParseFromFileAsync(
        url: string,
        scaleToSize?: boolean,
        targetTexture?: AdvancedDynamicTexture
    ): Promise<AdvancedDynamicTexture>;

    /**
     * Loads GUI from a URL into this texture
     * @param url URL to load from
     * @param scaleToSize Whether to scale to file's original size
     * @returns Promise resolving to this texture
     */
    parseFromURLAsync(url: string, scaleToSize?: boolean): Promise<AdvancedDynamicTexture>;

    /**
     * Scales the texture uniformly
     * @param ratio Scale factor
     */
    scale(ratio: number): void;

    /**
     * Scales the texture to specific dimensions
     * @param width New width
     * @param height New height
     */
    scaleTo(width: number, height: number): void;

    /**
     * Checks if the GUI is fully loaded and ready
     * @returns True if all controls are ready
     */
    guiIsReady(): boolean;

    /**
     * Creates a texture attached to a mesh
     * @param mesh Mesh to attach to
     * @param width Texture width
     * @param height Texture height
     * @param supportPointerMove Whether to track pointer moves
     * @param onlyAlpha Whether to use alpha-only material (no color)
     * @param invertY Whether to invert Y-axis
     * @param materialSetupCallback Optional custom material setup function
     * @param sampling Texture sampling mode
     * @returns Created texture
     */
    static CreateForMesh(
        mesh: AbstractMesh,
        width?: number,
        height?: number,
        supportPointerMove?: boolean,
        onlyAlpha?: boolean,
        invertY?: boolean,
        materialSetupCallback?: MaterialCreationCallback,
        sampling?: number
    ): AdvancedDynamicTexture;

    /**
     * Creates a texture attached to a mesh (returns texture only, no material)
     * @param mesh Mesh to attach to
     * @param width Texture width
     * @param height Texture height
     * @param supportPointerMove Whether to track pointer moves
     * @param invertY Whether to invert Y-axis
     * @returns Created texture
     */
    static CreateForMeshTexture(
        mesh: AbstractMesh,
        width?: number,
        height?: number,
        supportPointerMove?: boolean,
        invertY?: boolean
    ): AdvancedDynamicTexture;

    /**
     * Creates a fullscreen GUI overlay
     * @param name Texture name
     * @param foreground Whether to render in foreground (true) or background (false)
     * @param scene Scene to attach to
     * @param sampling Texture sampling mode
     * @param adaptiveScaling Whether to use adaptive scaling based on hardware
     * @returns Created texture
     */
    static CreateFullscreenUI(
        name: string,
        foreground?: boolean,
        scene?: Nullable<Scene>,
        sampling?: number,
        adaptiveScaling?: boolean
    ): AdvancedDynamicTexture;
}