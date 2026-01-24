import { Observable } from '@babylonjs/core/Misc/observable';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { FadeInOutBehavior } from '@babylonjs/core/Behaviors/Meshes/fadeInOutBehavior';
import { Observer } from '@babylonjs/core/Misc/observable';
import { Button3D } from './button3D';
import { FluentMaterial } from '../materials/fluent/fluentMaterial';
import { AdvancedDynamicTexture } from '../2D/advancedDynamicTexture';
import { StackPanel } from '../2D/controls/stackPanel';
import { Image } from '../2D/controls/image';
import { TextBlock } from '../2D/controls/textBlock';
import { Control } from '../2D/controls/control';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

/**
 * Interface for GUI3DManager host with shared materials
 */
interface ISharedMaterialsHost {
    onPickedPointChangedObservable: Observable<Vector3 | null>;
    _sharedMaterials: {
        backFluentMaterial?: FluentMaterial;
        frontFluentMaterial?: FluentMaterial;
    };
}

/**
 * Class representing a holographic button for 3D GUI interactions.
 * This button features a Fluent Design System style with hover effects,
 * optional text and image content, and tooltip support.
 */
export declare class HolographicButton extends Button3D {
    /**
     * Back plate mesh (main interactive surface)
     */
    protected _backPlate: Mesh;

    /**
     * Front plate mesh (hover effect overlay)
     */
    protected _frontPlate: Mesh;

    /**
     * Text/content plate mesh
     */
    protected _textPlate: Mesh;

    /**
     * Material for the back plate with hover light effects
     */
    protected _backMaterial: FluentMaterial;

    /**
     * Material for the front plate with glow and border effects
     */
    protected _frontMaterial: FluentMaterial;

    /**
     * Material for the text/content plate
     */
    protected _plateMaterial: StandardMaterial;

    /**
     * Text content displayed on the button
     */
    protected _text: string;

    /**
     * URL of the image displayed on the button
     */
    protected _imageUrl: string;

    /**
     * Whether this button shares materials with other buttons for optimization
     */
    protected _shareMaterials: boolean;

    /**
     * Mesh used to display the tooltip
     */
    protected _tooltipMesh?: Mesh;

    /**
     * Texture for rendering tooltip content
     */
    protected _tooltipTexture?: AdvancedDynamicTexture;

    /**
     * Text block control for tooltip text
     */
    protected _tooltipTextBlock?: TextBlock;

    /**
     * Fade behavior for tooltip animations
     */
    protected _tooltipFade?: FadeInOutBehavior;

    /**
     * Observer for tooltip hover enter events
     */
    protected _tooltipHoverObserver?: Observer<unknown>;

    /**
     * Observer for tooltip hover exit events
     */
    protected _tooltipOutObserver?: Observer<unknown>;

    /**
     * Observer for picked point changes (hover position tracking)
     */
    protected _pickedPointObserver?: Observer<Vector3 | null>;

    /**
     * Host manager that can provide shared materials
     */
    protected _host: ISharedMaterialsHost;

    /**
     * Creates a new HolographicButton instance
     * @param name - Unique name for the button
     * @param shareMaterials - Whether to share materials with other buttons (default: true)
     */
    constructor(name: string, shareMaterials?: boolean);

    /**
     * Gets or sets the rendering group ID for all button meshes
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);

    /**
     * Gets or sets the tooltip text. Setting to null/empty removes the tooltip.
     */
    get tooltipText(): string | null;
    set tooltipText(value: string | null);

    /**
     * Gets or sets the text content displayed on the button
     */
    get text(): string;
    set text(value: string);

    /**
     * Gets or sets the image URL for the button icon
     */
    get imageUrl(): string;
    set imageUrl(value: string);

    /**
     * Gets the back plate material (Fluent material with hover effects)
     */
    get backMaterial(): FluentMaterial;

    /**
     * Gets the front plate material (overlay with glow and borders)
     */
    get frontMaterial(): FluentMaterial;

    /**
     * Gets the plate material used for text/content rendering
     */
    get plateMaterial(): StandardMaterial;

    /**
     * Gets whether this button shares materials with others
     */
    get shareMaterials(): boolean;

    /**
     * Animation callback when pointer enters the button
     */
    pointerEnterAnimation: () => void;

    /**
     * Animation callback when pointer exits the button
     */
    pointerOutAnimation: () => void;

    /**
     * Disposes the tooltip and removes related observers
     */
    protected _disposeTooltip(): void;

    /**
     * Returns the type name of this control
     */
    protected _getTypeName(): string;

    /**
     * Rebuilds the button content (text and image) on the facade texture
     */
    protected _rebuildContent(): void;

    /**
     * Creates the node hierarchy for the button (back, front, and text plates)
     * @param scene - The scene to create meshes in
     */
    protected _createNode(scene: Scene): Mesh;

    /**
     * Applies the facade texture to the plate material
     * @param texture - The texture containing button content
     */
    protected _applyFacade(texture: BaseTexture): void;

    /**
     * Creates the back material with hover light effects
     * @param mesh - The mesh to apply material properties from
     */
    protected _createBackMaterial(mesh: Mesh): void;

    /**
     * Creates the front material with glow and border effects
     * @param mesh - The mesh to apply material properties from
     */
    protected _createFrontMaterial(mesh: Mesh): void;

    /**
     * Creates the plate material for text/content rendering
     * @param mesh - The mesh to apply material properties from
     */
    protected _createPlateMaterial(mesh: Mesh): void;

    /**
     * Assigns materials to the button meshes, using shared materials if enabled
     * @param mesh - The root mesh
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Disposes the button and all its resources
     */
    dispose(): void;
}