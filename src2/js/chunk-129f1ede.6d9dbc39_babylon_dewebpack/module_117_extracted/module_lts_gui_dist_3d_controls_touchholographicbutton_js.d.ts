import { Observable } from "core/Misc/observable";
import { Scene } from "core/scene";
import { Mesh } from "core/Meshes/mesh";
import { TransformNode } from "core/Meshes/transformNode";
import { Vector3 } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { FadeInOutBehavior } from "core/Behaviors/Meshes/fadeInOutBehavior";
import { TouchButton3D } from "../../../lts/gui/dist/3D/controls/touchButton3D";
import { FluentMaterial } from "../../../lts/gui/dist/3D/materials/fluent/fluentMaterial";
import { FluentButtonMaterial } from "../../../lts/gui/dist/3D/materials/fluentButton/fluentButtonMaterial";
import { AdvancedDynamicTexture } from "../../../lts/gui/dist/2D/advancedDynamicTexture";
import { StackPanel } from "../../../lts/gui/dist/2D/controls/stackPanel";
import { Image } from "../../../lts/gui/dist/2D/controls/image";
import { TextBlock } from "../../../lts/gui/dist/2D/controls/textBlock";
import { Observer } from "core/Misc/observable";
import { Texture } from "core/Materials/Textures/texture";

/**
 * 3D touch holographic button control with fluent design styling
 * Features include tooltip support, hover effects, and material customization
 */
export declare class TouchHolographicButton extends TouchButton3D {
    /** Base URL for loading 3D model assets */
    static readonly MODEL_BASE_URL: string;
    
    /** Filename of the button 3D model */
    static readonly MODEL_FILENAME: string;

    /** Whether materials are shared across button instances for performance optimization */
    private _shareMaterials: boolean;
    
    /** Controls visibility of the back plate mesh */
    private _isBackplateVisible: boolean;
    
    /** Depth of the front interactive plate in scene units */
    private readonly _frontPlateDepth: number;
    
    /** Depth of the back plate in scene units */
    private readonly _backPlateDepth: number;
    
    /** Default color of the back plate */
    private readonly _backplateColor: Color3;
    
    /** Color of the back plate when button is toggled */
    private readonly _backplateToggledColor: Color3;

    /** Text content displayed on the button */
    private _text?: string;
    
    /** URL of the image displayed on the button */
    private _imageUrl?: string;

    /** Back plate mesh */
    private _backPlate: Mesh;
    
    /** Front interactive plate mesh */
    private _frontPlate: Mesh;
    
    /** Text/content display plate mesh */
    private _textPlate: Mesh;

    /** Material for the back plate */
    private _backMaterial: FluentMaterial;
    
    /** Material for the front interactive plate */
    private _frontMaterial: FluentButtonMaterial;
    
    /** Material for the text/content plate */
    private _plateMaterial: StandardMaterial;

    /** Tooltip hover mesh */
    private _tooltipMesh?: Mesh;
    
    /** Tooltip text control */
    private _tooltipTextBlock?: TextBlock;
    
    /** Tooltip texture */
    private _tooltipTexture?: AdvancedDynamicTexture;
    
    /** Fade behavior for tooltip animations */
    private _tooltipFade?: FadeInOutBehavior;
    
    /** Observer for tooltip hover events */
    private _tooltipHoverObserver?: Observer<Vector3>;
    
    /** Observer for tooltip pointer out events */
    private _tooltipOutObserver?: Observer<Vector3>;
    
    /** Observer for pointer hover/move events */
    private _pointerHoverObserver?: Observer<Vector3>;
    
    /** Observer for picked point changes */
    private _pickedPointObserver?: Observer<Vector3>;

    /**
     * Creates a new touch holographic button
     * @param name - Unique name for the button control
     * @param shareMaterials - Whether to share materials across instances (default: true)
     */
    constructor(name: string, shareMaterials?: boolean);

    /**
     * Gets or sets the rendering group ID for all button meshes
     * Used to control rendering order in the scene
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);

    /**
     * Gets the root mesh of the button (back plate)
     */
    get mesh(): Mesh;

    /**
     * Gets or sets the tooltip text displayed on hover
     * Setting to null/undefined removes the tooltip
     */
    get tooltipText(): string | null;
    set tooltipText(value: string | null);

    /**
     * Gets or sets the text content displayed on the button
     */
    get text(): string | undefined;
    set text(value: string | undefined);

    /**
     * Gets or sets the image URL displayed on the button
     */
    get imageUrl(): string | undefined;
    set imageUrl(value: string | undefined);

    /**
     * Gets the back plate fluent material
     */
    get backMaterial(): FluentMaterial;

    /**
     * Gets the front plate fluent button material
     */
    get frontMaterial(): FluentButtonMaterial;

    /**
     * Gets the text/content plate material
     */
    get plateMaterial(): StandardMaterial;

    /**
     * Gets whether materials are shared across instances
     */
    get shareMaterials(): boolean;

    /**
     * Sets whether the back plate is visible
     */
    set isBackplateVisible(value: boolean);

    /**
     * Disposes tooltip-related resources
     * @internal
     */
    private _disposeTooltip(): void;

    /**
     * Gets the type name of this control
     * @returns "TouchHolographicButton"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Rebuilds the button content (text and image)
     * @internal
     */
    private _rebuildContent(): void;

    /**
     * Creates the 3D node hierarchy for the button
     * @param scene - The scene to create nodes in
     * @returns Root transform node
     * @internal
     */
    protected _createNode(scene: Scene): TransformNode;

    /**
     * Applies the facade texture to the plate material
     * @param texture - Texture to apply
     * @internal
     */
    protected _applyFacade(texture: Texture): void;

    /**
     * Creates the back plate fluent material
     * @param mesh - Mesh to create material for
     * @internal
     */
    private _createBackMaterial(mesh: Mesh): void;

    /**
     * Creates the front plate fluent button material
     * @param mesh - Mesh to create material for
     * @internal
     */
    private _createFrontMaterial(mesh: Mesh): void;

    /**
     * Creates the text/content plate standard material
     * @param mesh - Mesh to create material for
     * @internal
     */
    private _createPlateMaterial(mesh: Mesh): void;

    /**
     * Handles toggle state changes
     * @param isToggled - New toggle state
     * @internal
     */
    protected _onToggle(isToggled: boolean): void;

    /**
     * Applies materials to button meshes
     * @param mesh - Reference mesh for material creation
     * @internal
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Disposes the button and all associated resources
     */
    dispose(): void;
}