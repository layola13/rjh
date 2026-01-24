import { Observable } from '@babylonjs/core/Misc/observable';
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Scene } from '@babylonjs/core/scene';
import { Viewport } from '@babylonjs/core/Maths/math.viewport';
import { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PointerInfo, PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { KeyboardEventTypes } from '@babylonjs/core/Events/keyboardEvents';
import { ClipboardInfo, ClipboardEventTypes } from '@babylonjs/core/Events/clipboardEvents';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Layer } from '@babylonjs/core/Layers/layer';
import { Observer } from '@babylonjs/core/Misc/observable';
import { Nullable } from '@babylonjs/core/types';
import { Container } from './controls/container';
import { Control } from './controls/control';
import { Style } from './style';
import { Measure } from './measure';

/**
 * Interface for serialized ADT content
 */
export interface IAdvancedDynamicTextureSerializedContent {
    /** Root container serialized data */
    root: any;
    /** Texture width in pixels */
    width: number;
    /** Texture height in pixels */
    height: number;
}

/**
 * Interface for size information
 */
export interface ISize {
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
}

/**
 * Advanced Dynamic Texture for creating 2D GUI layers in Babylon.js
 * Can be used in fullscreen mode or attached to meshes
 */
export declare class AdvancedDynamicTexture extends DynamicTexture {
    /** Snippet service URL for loading/saving GUI configurations */
    static SnippetUrl: string;
    
    /** Enable GPU optimizations for better performance */
    static AllowGPUOptimizations: boolean;

    /**
     * Observable triggered when the GUI is ready to be used
     */
    onGuiReadyObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable triggered when clipboard copy event occurs
     */
    onClipboardObservable: Observable<ClipboardInfo>;

    /**
     * Observable triggered when a control is picked/clicked
     */
    onControlPickedObservable: Observable<Control>;

    /**
     * Observable triggered before layout calculations begin
     */
    onBeginLayoutObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable triggered after layout calculations complete
     */
    onEndLayoutObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable triggered before rendering begins
     */
    onBeginRenderObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Observable triggered after rendering completes
     */
    onEndRenderObservable: Observable<AdvancedDynamicTexture>;

    /**
     * Whether to premultiply alpha values during rendering
     */
    premulAlpha: boolean;

    /**
     * Whether to apply Y-axis inversion when updating the texture
     */
    applyYInversionOnUpdate: boolean;

    /**
     * Check pointer events every frame (can impact performance)
     */
    checkPointerEveryFrame: boolean;

    /**
     * Gets the number of layout calls performed in the last frame
     */
    get numLayoutCalls(): number;

    /**
     * Gets the number of render calls performed in the last frame
     */
    get numRenderCalls(): number;

    /**
     * Gets or sets the render scale multiplier
     */
    get renderScale(): number;
    set renderScale(value: number);

    /**
     * Gets or sets the background color
     */
    get background(): string;
    set background(value: string);

    /**
     * Gets or sets the ideal width for responsive scaling
     */
    get idealWidth(): number;
    set idealWidth(value: number);

    /**
     * Gets or sets the ideal height for responsive scaling
     */
    get idealHeight(): number;
    set idealHeight(value: number);

    /**
     * Gets or sets whether to use the smallest ideal dimension for scaling
     */
    get useSmallestIdeal(): boolean;
    set useSmallestIdeal(value: boolean);

    /**
     * Gets or sets whether to render at ideal size
     */
    get renderAtIdealSize(): boolean;
    set renderAtIdealSize(value: boolean);

    /**
     * Gets the calculated ideal ratio for responsive scaling
     */
    get idealRatio(): number;

    /**
     * Gets the associated layer (if in fullscreen mode)
     */
    get layer(): Nullable<Layer>;

    /**
     * Gets the root container holding all controls
     */
    get rootContainer(): Container;

    /**
     * Gets or sets the currently focused control
     */
    get focusedControl(): Nullable<Control>;
    set focusedControl(value: Nullable<Control>);

    /**
     * Gets or sets whether the texture is rendered in foreground
     */
    get isForeground(): boolean;
    set isForeground(value: boolean);

    /**
     * Gets or sets clipboard data for copy/paste operations
     */
    get clipboardData(): string;
    set clipboardData(value: string);

    /**
     * Gets or sets whether to use invalidate rectangle optimization
     */
    get useInvalidateRectOptimization(): boolean;
    set useInvalidateRectOptimization(value: boolean);

    /**
     * Creates an AdvancedDynamicTexture
     * @param name - Texture name
     * @param width - Texture width in pixels (0 for auto)
     * @param height - Texture height in pixels (0 for auto)
     * @param scene - Associated scene
     * @param generateMipMaps - Whether to generate mipmaps
     * @param samplingMode - Texture sampling mode
     * @param invertY - Whether to invert Y coordinates
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
     * Gets the class name
     * @returns The class name
     */
    getClassName(): string;

    /**
     * Gets all direct children of the root container
     * @returns Array of controls
     */
    getChildren(): Control[];

    /**
     * Gets all descendants of the root container
     * @param directDescendantsOnly - If true, only get direct children
     * @param predicate - Optional filter function
     * @returns Array of controls
     */
    getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];

    /**
     * Gets all controls of a specific type
     * @param typeName - The type name to search for
     * @returns Array of matching controls
     */
    getControlsByType(typeName: string): Control[];

    /**
     * Gets a control by its name
     * @param name - The control name
     * @returns The control or null if not found
     */
    getControlByName(name: string): Nullable<Control>;

    /**
     * Executes a function on all controls recursively
     * @param func - Function to execute
     * @param container - Starting container (defaults to root)
     */
    executeOnAllControls(func: (control: Control) => void, container?: Container): void;

    /**
     * Invalidates a rectangular area for optimized rendering
     * @param left - Left coordinate
     * @param top - Top coordinate
     * @param right - Right coordinate
     * @param bottom - Bottom coordinate
     */
    invalidateRect(left: number, top: number, right: number, bottom: number): void;

    /**
     * Marks the texture as needing a redraw
     */
    markAsDirty(): void;

    /**
     * Creates a new style object
     * @returns A new Style instance
     */
    createStyle(): Style;

    /**
     * Adds a control to the root container
     * @param control - The control to add
     * @returns This texture for chaining
     */
    addControl(control: Control): AdvancedDynamicTexture;

    /**
     * Removes a control from the root container
     * @param control - The control to remove
     * @returns This texture for chaining
     */
    removeControl(control: Control): AdvancedDynamicTexture;

    /**
     * Moves controls to non-overlapping positions
     * @param groupFilter - Group identifier or array of controls
     * @param forceMovement - Movement force multiplier
     * @param deltaMultiplier - Delta multiplier for movement
     */
    moveToNonOverlappedPosition(
        groupFilter?: number | Control[],
        forceMovement?: number,
        deltaMultiplier?: number
    ): void;

    /**
     * Disposes the texture and all associated resources
     */
    dispose(): void;

    /**
     * Gets the global viewport in pixels
     * @returns The viewport measure
     */
    getProjectedPosition(position: Vector3, worldMatrix: Matrix): Vector2;

    /**
     * Gets the projected position with Z depth
     * @param position - World position
     * @param worldMatrix - World transformation matrix
     * @returns Projected position with Z
     */
    getProjectedPositionWithZ(position: Vector3, worldMatrix: Matrix): Vector3;

    /**
     * Performs picking at specified coordinates
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param pointerInfo - Optional pointer information
     */
    pick(x: number, y: number, pointerInfo?: Nullable<PointerInfo>): void;

    /**
     * Attaches the texture to scene pointer events
     */
    attach(): void;

    /**
     * Registers clipboard event handlers
     */
    registerClipboardEvents(): void;

    /**
     * Unregisters clipboard event handlers
     */
    unRegisterClipboardEvents(): void;

    /**
     * Attaches the texture to a mesh for 3D GUI
     * @param mesh - The mesh to attach to
     * @param supportPointerMove - Whether to support pointer move events
     */
    attachToMesh(mesh: AbstractMesh, supportPointerMove?: boolean): void;

    /**
     * Moves focus to a specific control
     * @param control - The control to focus
     */
    moveFocusToControl(control: Control): void;

    /**
     * Serializes the texture content to JSON
     * @returns Serialized content
     */
    serializeContent(): IAdvancedDynamicTextureSerializedContent;

    /**
     * Parses serialized content and reconstructs the GUI
     * @param serializedObject - The serialized data
     * @param scaleToSize - Whether to scale to original size
     */
    parseSerializedObject(serializedObject: any, scaleToSize?: boolean): void;

    /**
     * Alias for parseSerializedObject
     */
    parseContent: typeof AdvancedDynamicTexture.prototype.parseSerializedObject;

    /**
     * Clones the texture
     * @param name - Name for the cloned texture
     * @returns The cloned texture
     */
    clone(name?: string): AdvancedDynamicTexture;

    /**
     * Parses GUI from a snippet server
     * @param snippetId - The snippet identifier
     * @param scaleToSize - Whether to scale to size
     * @param targetTexture - Optional target texture to load into
     * @returns Promise resolving to the texture
     */
    static ParseFromSnippetAsync(
        snippetId: string,
        scaleToSize?: boolean,
        targetTexture?: AdvancedDynamicTexture
    ): Promise<AdvancedDynamicTexture>;

    /**
     * Instance method to parse from snippet
     * @param snippetId - The snippet identifier
     * @param scaleToSize - Whether to scale to size
     * @returns Promise resolving to this texture
     */
    parseFromSnippetAsync(snippetId: string, scaleToSize?: boolean): Promise<AdvancedDynamicTexture>;

    /**
     * Parses GUI from a URL
     * @param url - The URL to load from
     * @param scaleToSize - Whether to scale to size
     * @param targetTexture - Optional target texture to load into
     * @returns Promise resolving to the texture
     */
    static ParseFromFileAsync(
        url: string,
        scaleToSize?: boolean,
        targetTexture?: AdvancedDynamicTexture
    ): Promise<AdvancedDynamicTexture>;

    /**
     * Instance method to parse from URL
     * @param url - The URL to load from
     * @param scaleToSize - Whether to scale to size
     * @returns Promise resolving to this texture
     */
    parseFromURLAsync(url: string, scaleToSize?: boolean): Promise<AdvancedDynamicTexture>;

    /**
     * Scales the texture uniformly
     * @param ratio - Scale ratio
     */
    scale(ratio: number): void;

    /**
     * Scales the texture to specific dimensions
     * @param width - Target width
     * @param height - Target height
     */
    scaleTo(width: number, height: number): void;

    /**
     * Checks if the GUI is ready for rendering
     * @returns True if ready
     */
    guiIsReady(): boolean;

    /**
     * Creates an AdvancedDynamicTexture for a mesh
     * @param mesh - The target mesh
     * @param width - Texture width
     * @param height - Texture height
     * @param supportPointerMove - Enable pointer move events
     * @param onlyAlphaTexture - Use only alpha channel
     * @param invertY - Invert Y coordinates
     * @param materialSetupCallback - Custom material setup function
     * @returns The created texture
     */
    static CreateForMesh(
        mesh: AbstractMesh,
        width?: number,
        height?: number,
        supportPointerMove?: boolean,
        onlyAlphaTexture?: boolean,
        invertY?: boolean,
        materialSetupCallback?: (mesh: AbstractMesh, uniqueId: string, texture: AdvancedDynamicTexture, onlyAlphaTexture: boolean) => void
    ): AdvancedDynamicTexture;

    /**
     * Creates an AdvancedDynamicTexture for a mesh (returns only texture, no material setup)
     * @param mesh - The target mesh
     * @param width - Texture width
     * @param height - Texture height
     * @param supportPointerMove - Enable pointer move events
     * @param invertY - Invert Y coordinates
     * @returns The created texture
     */
    static CreateForMeshTexture(
        mesh: AbstractMesh,
        width?: number,
        height?: number,
        supportPointerMove?: boolean,
        invertY?: boolean
    ): AdvancedDynamicTexture;

    /**
     * Creates a fullscreen GUI layer
     * @param name - Texture name
     * @param foreground - Render in foreground
     * @param scene - Associated scene
     * @param samplingMode - Texture sampling mode
     * @param adaptiveScaling - Enable adaptive scaling for high DPI
     * @returns The created texture
     */
    static CreateFullscreenUI(
        name: string,
        foreground?: boolean,
        scene?: Nullable<Scene>,
        samplingMode?: number,
        adaptiveScaling?: boolean
    ): AdvancedDynamicTexture;
}