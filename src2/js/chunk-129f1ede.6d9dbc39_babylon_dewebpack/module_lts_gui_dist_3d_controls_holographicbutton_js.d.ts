import { Button3D } from './button3D';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { Mesh } from 'core/Meshes/mesh';
import { Scene } from 'core/scene';
import { Observer } from 'core/Misc/observable';
import { Vector3 } from 'core/Maths/math.vector';
import { FluentMaterial } from '../materials/fluent/fluentMaterial';
import { StandardMaterial } from 'core/Materials/standardMaterial';
import { AdvancedDynamicTexture } from '../2D/advancedDynamicTexture';
import { TextBlock } from '../2D/controls/textBlock';
import { FadeInOutBehavior } from 'core/Behaviors/Meshes/fadeInOutBehavior';
import { Texture } from 'core/Materials/Textures/texture';

/**
 * Holographic button control for 3D GUI with Fluent Design styling.
 * Provides hover effects, tooltips, and material sharing capabilities.
 */
export declare class HolographicButton extends Button3D {
    /**
     * Back plate mesh of the button
     */
    private _backPlate: Mesh;

    /**
     * Front plate mesh (visible on hover)
     */
    private _frontPlate: Mesh;

    /**
     * Text/content plate mesh
     */
    private _textPlate: Mesh;

    /**
     * Material for the back plate with hover light effects
     */
    private _backMaterial: FluentMaterial;

    /**
     * Material for the front plate with glow effects
     */
    private _frontMaterial: FluentMaterial;

    /**
     * Material for the text/content plate
     */
    private _plateMaterial: StandardMaterial;

    /**
     * Current button text
     */
    private _text: string;

    /**
     * URL of the button image icon
     */
    private _imageUrl: string;

    /**
     * Whether to share materials across multiple button instances
     */
    private _shareMaterials: boolean;

    /**
     * Mesh for tooltip display
     */
    private _tooltipMesh?: Mesh;

    /**
     * Texture for tooltip rendering
     */
    private _tooltipTexture?: AdvancedDynamicTexture;

    /**
     * Text block control for tooltip content
     */
    private _tooltipTextBlock?: TextBlock;

    /**
     * Fade behavior for tooltip animations
     */
    private _tooltipFade?: FadeInOutBehavior;

    /**
     * Observer for tooltip hover enter events
     */
    private _tooltipHoverObserver?: Observer<void>;

    /**
     * Observer for tooltip hover exit events
     */
    private _tooltipOutObserver?: Observer<void>;

    /**
     * Observer for picked point changes (hover light position)
     */
    private _pickedPointObserver?: Observer<Vector3 | null>;

    /**
     * Creates a new HolographicButton instance
     * @param name - Unique name for the button
     * @param shareMaterials - Whether to share materials across instances for performance (default: true)
     */
    constructor(name: string, shareMaterials?: boolean);

    /**
     * Gets or sets the rendering group ID for all button meshes
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);

    /**
     * Gets or sets the tooltip text. Set to null/empty to hide tooltip.
     */
    get tooltipText(): string | null;
    set tooltipText(value: string | null);

    /**
     * Gets or sets the button text label
     */
    get text(): string;
    set text(value: string);

    /**
     * Gets or sets the button image icon URL
     */
    get imageUrl(): string;
    set imageUrl(value: string);

    /**
     * Gets the back plate material (read-only)
     */
    get backMaterial(): FluentMaterial;

    /**
     * Gets the front plate material (read-only)
     */
    get frontMaterial(): FluentMaterial;

    /**
     * Gets the text/content plate material (read-only)
     */
    get plateMaterial(): StandardMaterial;

    /**
     * Gets whether materials are shared across instances (read-only)
     */
    get shareMaterials(): boolean;

    /**
     * Disposes tooltip-related resources
     * @internal
     */
    private _disposeTooltip(): void;

    /**
     * Returns the type name of this control
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Rebuilds the button's facade texture content (text and image)
     * @internal
     */
    protected _rebuildContent(): void;

    /**
     * Creates the button mesh hierarchy
     * @param scene - The scene to create meshes in
     * @returns The root mesh (back plate)
     * @internal
     */
    protected _createNode(scene: Scene): Mesh;

    /**
     * Applies the facade texture to the plate material
     * @param texture - The texture to apply
     * @internal
     */
    protected _applyFacade(texture: AdvancedDynamicTexture): void;

    /**
     * Creates the back plate material with hover light effects
     * @param mesh - The mesh to create material for
     * @internal
     */
    private _createBackMaterial(mesh: AbstractMesh): void;

    /**
     * Creates the front plate material with glow effects
     * @param mesh - The mesh to create material for
     * @internal
     */
    private _createFrontMaterial(mesh: AbstractMesh): void;

    /**
     * Creates the text/content plate material
     * @param mesh - The mesh to create material for
     * @internal
     */
    private _createPlateMaterial(mesh: AbstractMesh): void;

    /**
     * Assigns materials to button meshes, using shared materials if enabled
     * @param mesh - The root mesh
     * @internal
     */
    protected _affectMaterial(mesh: AbstractMesh): void;

    /**
     * Disposes the button and all its resources
     */
    dispose(): void;

    /**
     * Animation callback when pointer enters the button
     */
    pointerEnterAnimation: () => void;

    /**
     * Animation callback when pointer exits the button
     */
    pointerOutAnimation: () => void;
}