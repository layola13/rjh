/**
 * Touch Holographic Button for MRTK3 GUI system
 * Provides a 3D interactive button with holographic effects, tooltips, and customizable materials
 */

import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Observable } from '@babylonjs/core/Misc/observable';
import { FadeInOutBehavior } from '@babylonjs/core/Behaviors/Meshes/fadeInOutBehavior';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { Grid } from '@babylonjs/gui/2D/controls/grid';
import { Image } from '@babylonjs/gui/2D/controls/image';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { TouchButton3D } from './touchButton3D';
import { MRDLBackglowMaterial } from '../materials/mrdl/mrdlBackglowMaterial';
import { MRDLBackplateMaterial } from '../materials/mrdl/mrdlBackplateMaterial';
import { MRDLFrontplateMaterial } from '../materials/mrdl/mrdlFrontplateMaterial';
import { MRDLInnerquadMaterial } from '../materials/mrdl/mrdlInnerquadMaterial';

/**
 * Configuration for animation keyframe data
 */
interface AnimationKeyframeData {
    /** Keyframe time position */
    frame: number;
    /** [value, inTangent?, outTangent?, interpolation?] */
    values: number[];
}

/**
 * Configuration for mesh animation properties
 */
interface MeshAnimationConfig {
    /** Animation name identifier */
    name: string;
    /** Target mesh to animate */
    mesh?: Mesh;
    /** Property path to animate (e.g., "position.z", "material.fadeOut") */
    property: string;
    /** Array of keyframe data */
    keys: AnimationKeyframeData[];
}

/**
 * Shared materials cache for TouchHolographicButton instances
 */
interface TouchSharedMaterials {
    /** Shared backplate material across instances */
    mrdlBackplateMaterial?: MRDLBackplateMaterial;
    /** Shared frontplate material across instances */
    mrdlFrontplateMaterial?: MRDLFrontplateMaterial;
    /** Shared backglow material across instances */
    mrdlBackglowMaterial?: MRDLBackglowMaterial;
    /** Shared inner quad material across instances */
    mrdlInnerQuadMaterial?: MRDLInnerquadMaterial;
}

/**
 * TouchHolographicButton - A 3D interactive button with holographic visual effects
 * following Microsoft's Mixed Reality Design Language (MRDL) specifications.
 * 
 * Features:
 * - Multi-layer holographic rendering (backplate, frontplate, glow, inner quad)
 * - Tooltip support with fade-in/out animations
 * - Toggle button mode
 * - Customizable text, subtext, and icon
 * - Material sharing for performance optimization
 * - Pointer interaction animations
 */
export declare class TouchHolographicButton extends TouchButton3D {
    /** Base URL for MRTK asset resources */
    static readonly MRTK_ASSET_BASE_URL: string = "https://assets.babylonjs.com/meshes/MRTK/";
    
    /** Frontplate 3D model filename */
    static readonly FRONTPLATE_MODEL_FILENAME: string = "mrtk-fluent-frontplate.glb";
    
    /** Backplate 3D model filename */
    static readonly BACKPLATE_MODEL_FILENAME: string = "mrtk-fluent-backplate.glb";
    
    /** Back glow effect 3D model filename */
    static readonly BACKGLOW_MODEL_FILENAME: string = "mrtk-fluent-button.glb";
    
    /** Inner quad 3D model filename */
    static readonly INNERQUAD_MODEL_FILENAME: string = "SlateProximity.glb";

    /**
     * Button width in world units
     * @default 1
     */
    width: number;

    /**
     * Button height in world units
     * @default 1
     */
    height: number;

    /**
     * Corner radius for rounded button edges
     * @default 0.14
     */
    radius: number;

    /**
     * Text label font size in pixels
     * @default 18
     */
    textSizeInPixels: number;

    /**
     * Icon/image size in pixels
     * @default 40
     */
    imageSizeInPixels: number;

    /**
     * Base color for plate material
     * @default Color3(0.4, 0.4, 0.4)
     */
    plateMaterialColor: Color3;

    /**
     * Depth of the front collision/interaction plate
     * @default 0.2
     */
    frontPlateDepth: number;

    /**
     * Depth of the back visual plate
     * @default 0.04
     */
    backPlateDepth: number;

    /**
     * Offset distance for back glow effect
     * @default 0.1
     */
    backGlowOffset: number;

    /**
     * Depth for flat plane elements
     * @default 0.001
     */
    flatPlaneDepth: number;

    /**
     * Corner radius for inner quad layer
     * @default radius - 0.04
     */
    innerQuadRadius: number;

    /**
     * Default inner quad color (normal state)
     * @default Color4(0, 0, 0, 0)
     */
    innerQuadColor: Color4;

    /**
     * Inner quad color when toggled on
     * @default Color4(0.5197843, 0.6485234, 0.9607843, 0.6)
     */
    innerQuadToggledColor: Color4;

    /**
     * Inner quad color during hover (normal state)
     * @default Color4(1, 1, 1, 0.05)
     */
    innerQuadHoverColor: Color4;

    /**
     * Inner quad color during hover (toggled state)
     * @default Color4(0.5197843, 0.6485234, 0.9607843, 1)
     */
    innerQuadToggledHoverColor: Color4;

    /**
     * Creates a new TouchHolographicButton instance
     * @param name - Unique identifier for the button
     * @param shareMaterials - Whether to share materials across instances for performance (default: true)
     */
    constructor(name: string, shareMaterials?: boolean);

    /**
     * Gets or sets the rendering group ID for all button meshes
     * Controls rendering order and layer grouping
     */
    renderingGroupId: number;

    /**
     * Gets the main mesh (backplate) of the button
     * @readonly
     */
    readonly mesh: Mesh;

    /**
     * Gets or sets the tooltip text displayed on hover
     * Setting to null/empty string removes the tooltip
     */
    tooltipText: string | null;

    /**
     * Gets or sets the primary text label
     */
    text: string;

    /**
     * Gets or sets the secondary text (subtext) label
     */
    subtext: string;

    /**
     * Gets or sets the icon image URL
     */
    imageUrl: string;

    /**
     * Gets the backplate MRDL material
     * @readonly
     */
    readonly backMaterial: MRDLBackplateMaterial;

    /**
     * Gets the frontplate MRDL material
     * @readonly
     */
    readonly frontMaterial: MRDLFrontplateMaterial;

    /**
     * Gets the back glow MRDL material
     * @readonly
     */
    readonly backGlowMaterial: MRDLBackglowMaterial;

    /**
     * Gets the inner quad MRDL material
     * @readonly
     */
    readonly innerQuadMaterial: MRDLInnerquadMaterial;

    /**
     * Gets the text plate standard material
     * @readonly
     */
    readonly plateMaterial: StandardMaterial;

    /**
     * Gets whether materials are shared across instances
     * @readonly
     */
    readonly shareMaterials: boolean;

    /**
     * Sets whether the backplate is visible
     * @writeonly
     */
    isBackplateVisible: boolean;

    /**
     * Animation callback executed when pointer enters button bounds
     */
    pointerEnterAnimation: () => void;

    /**
     * Animation callback executed when pointer exits button bounds
     */
    pointerOutAnimation: () => void;

    /**
     * Animation callback executed when pointer button is pressed down
     */
    pointerDownAnimation: () => void;

    /**
     * Animation callback executed when pointer button is released
     */
    pointerUpAnimation: () => void;

    /**
     * Gets the type name identifier for serialization
     * @returns "TouchHolographicButton"
     */
    protected _getTypeName(): string;

    /**
     * Rebuilds the button's 2D content layout based on current properties
     * @internal
     */
    protected _rebuildContent(): void;

    /**
     * Calculates the aspect ratio (width/height) of the button
     * @returns Aspect ratio value
     * @internal
     */
    protected _getAspectRatio(): number;

    /**
     * Creates a vertical layout for button content (icon, text)
     * Used when aspect ratio <= 1 (portrait orientation)
     * @returns Configured StackPanel with vertical layout
     * @internal
     */
    protected _alignContentVertically(): StackPanel;

    /**
     * Creates a horizontal layout for button content (icon, text, subtext)
     * Used when aspect ratio > 1 (landscape orientation)
     * @returns Configured Rectangle containing horizontal layout
     * @internal
     */
    protected _alignContentHorizontally(): Rectangle;

    /**
     * Creates the root node hierarchy for the button
     * @param scene - Parent scene
     * @returns Root TransformNode
     * @internal
     */
    protected _createNode(scene: Scene): TransformNode;

    /**
     * Creates the backplate mesh and loads its 3D model
     * @param scene - Parent scene
     * @returns Temporary box mesh (replaced when model loads)
     * @internal
     */
    protected _createBackPlate(scene: Scene): Mesh;

    /**
     * Creates the frontplate collision mesh and loads its 3D model
     * @param scene - Parent scene
     * @returns Front collision mesh
     * @internal
     */
    protected _createFrontPlate(scene: Scene): Mesh;

    /**
     * Creates the inner quad mesh for toggle state visualization
     * @param scene - Parent scene
     * @returns Inner quad mesh
     * @internal
     */
    protected _createInnerQuad(scene: Scene): Mesh;

    /**
     * Creates the back glow effect mesh (only for non-toggle buttons)
     * @param scene - Parent scene
     * @returns Back glow mesh or undefined for toggle buttons
     * @internal
     */
    protected _createBackGlow(scene: Scene): Mesh | undefined;

    /**
     * Applies a texture facade to the plate material
     * @param texture - Texture to apply as emissive and opacity map
     * @internal
     */
    protected _applyFacade(texture: any): void;

    /**
     * Executes click press animation sequence
     * Animates back glow, collision plate position and scale
     * @internal
     */
    protected _performClickAnimation(): void;

    /**
     * Executes pointer enter/exit animation sequence
     * @param speed - Animation speed multiplier (positive for enter, negative for exit)
     * @internal
     */
    protected _performEnterExitAnimation(speed: number): void;

    /**
     * Creates or retrieves the backplate MRDL material
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _createBackMaterial(mesh: Mesh): void;

    /**
     * Creates or retrieves the frontplate MRDL material
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _createFrontMaterial(mesh: Mesh): void;

    /**
     * Creates or retrieves the back glow MRDL material
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _createBackGlowMaterial(mesh: Mesh): void;

    /**
     * Creates or retrieves the inner quad MRDL material
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _createInnerQuadMaterial(mesh: Mesh): void;

    /**
     * Creates the standard material for text plate rendering
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _createPlateMaterial(mesh: Mesh): void;

    /**
     * Handles toggle state changes
     * @param isToggled - New toggle state
     * @internal
     */
    protected _onToggle(isToggled: boolean): void;

    /**
     * Initializes and assigns materials to button meshes
     * Handles both shared and per-instance material creation
     * @param mesh - Reference mesh for scene context
     * @internal
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Disposes tooltip-related resources
     * @internal
     */
    protected _disposeTooltip(): void;

    /**
     * Disposes the button and all its resources
     * Cleans up meshes, materials, observers, and behaviors
     */
    dispose(): void;

    /** @internal */ protected _backPlate: Mesh;
    /** @internal */ protected _frontPlate: Mesh;
    /** @internal */ protected _textPlate: Mesh;
    /** @internal */ protected _innerQuad: Mesh;
    /** @internal */ protected _backGlow: Mesh;
    /** @internal */ protected _collisionPlate: Mesh;
    /** @internal */ protected _frontPlateCollisionMesh: Mesh;
    /** @internal */ protected _backMaterial: MRDLBackplateMaterial;
    /** @internal */ protected _frontMaterial: MRDLFrontplateMaterial;
    /** @internal */ protected _backGlowMaterial: MRDLBackglowMaterial;
    /** @internal */ protected _innerQuadMaterial: MRDLInnerquadMaterial;
    /** @internal */ protected _plateMaterial: StandardMaterial;
    /** @internal */ protected _tooltipMesh: Mesh;
    /** @internal */ protected _tooltipTexture: AdvancedDynamicTexture;
    /** @internal */ protected _tooltipTextBlock: TextBlock;
    /** @internal */ protected _tooltipFade: FadeInOutBehavior;
    /** @internal */ protected _tooltipHoverObserver: any;
    /** @internal */ protected _tooltipOutObserver: any;
    /** @internal */ protected _pointerClickObserver: any;
    /** @internal */ protected _pointerEnterObserver: any;
    /** @internal */ protected _pointerOutObserver: any;
    /** @internal */ protected _toggleObserver: any;
    /** @internal */ protected _pickedPointObserver: any;
    /** @internal */ protected _text: string;
    /** @internal */ protected _subtext: string;
    /** @internal */ protected _imageUrl: string;
    /** @internal */ protected _isBackplateVisible: boolean;
    /** @internal */ protected _shareMaterials: boolean;
}