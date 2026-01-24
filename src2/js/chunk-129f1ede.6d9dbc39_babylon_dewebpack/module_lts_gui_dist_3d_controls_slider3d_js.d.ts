import type { Observable } from 'core/Misc/observable';
import type { Control3D } from '../../../lts/gui/dist/3D/controls/control3D';
import type { MRDLSliderBarMaterial } from '../../../lts/gui/dist/3D/materials/mrdl/mrdlSliderBarMaterial';
import type { MRDLSliderThumbMaterial } from '../../../lts/gui/dist/3D/materials/mrdl/mrdlSliderThumbMaterial';
import type { MRDLBackplateMaterial } from '../../../lts/gui/dist/3D/materials/mrdl/mrdlBackplateMaterial';
import type { AbstractMesh, Scene, Vector3, PointerDragBehavior } from '@babylonjs/core';

/**
 * 3D slider control for GUI interactions
 * Extends Control3D to provide a draggable slider interface with thumb, bar, and backplate components
 */
export declare class Slider3D extends Control3D {
    /**
     * Base URL for MRTK model assets
     */
    static readonly MODEL_BASE_URL: string;

    /**
     * Filename for the MRTK fluent backplate model
     */
    static readonly MODEL_FILENAME: string;

    /**
     * Observable fired when the slider value changes
     */
    readonly onValueChangedObservable: Observable<number>;

    /**
     * Creates a new Slider3D instance
     * @param name - The name of the slider control
     * @param sliderBackplateVisible - Whether the backplate is visible (default: false)
     */
    constructor(name: string, sliderBackplateVisible?: boolean);

    /**
     * Gets the main mesh representing the slider thumb
     */
    get mesh(): AbstractMesh | null;

    /**
     * Gets the minimum value of the slider
     */
    get minimum(): number;

    /**
     * Sets the minimum value of the slider (cannot be negative)
     * Automatically adjusts current value if it falls below the new minimum
     */
    set minimum(value: number);

    /**
     * Gets the maximum value of the slider
     */
    get maximum(): number;

    /**
     * Sets the maximum value of the slider
     * Automatically adjusts current value if it exceeds the new maximum
     */
    set maximum(value: number);

    /**
     * Gets the step increment for discrete value changes
     */
    get step(): number;

    /**
     * Sets the step increment (clamped between 0 and maximum-minimum)
     * Set to 0 for continuous sliding
     */
    set step(value: number);

    /**
     * Gets the current value of the slider
     */
    get value(): number;

    /**
     * Sets the current value of the slider (clamped between minimum and maximum)
     * Updates thumb position and triggers onValueChangedObservable
     */
    set value(value: number);

    /**
     * Gets the starting position (left edge) of the slider bar in local space
     */
    get start(): number;

    /**
     * Gets the ending position (right edge) of the slider bar in local space
     */
    get end(): number;

    /**
     * Gets the material applied to the slider bar
     */
    get sliderBarMaterial(): MRDLSliderBarMaterial;

    /**
     * Gets the material applied to the slider thumb (draggable element)
     */
    get sliderThumbMaterial(): MRDLSliderThumbMaterial;

    /**
     * Gets the material applied to the slider backplate
     */
    get sliderBackplateMaterial(): MRDLBackplateMaterial;

    /**
     * Sets the visibility of the entire slider control
     */
    set isVisible(visible: boolean);

    /**
     * Creates the 3D node hierarchy for the slider
     * @param scene - The Babylon.js scene to create the meshes in
     * @returns The root mesh of the slider
     * @internal
     */
    protected _createNode(scene: Scene): AbstractMesh;

    /**
     * Initializes or assigns materials to slider components
     * @param mesh - The root mesh of the slider
     * @internal
     */
    protected _affectMaterial(mesh: AbstractMesh): void;

    /**
     * Creates the drag behavior for the slider thumb
     * @returns Configured PointerDragBehavior for horizontal dragging
     * @internal
     */
    protected _createBehavior(): PointerDragBehavior;

    /**
     * Converts a logical value to a physical position along the slider bar
     * @param value - The logical value between minimum and maximum
     * @returns The x-position in local space
     * @internal
     */
    protected _convertToPosition(value: number): number;

    /**
     * Converts a physical position to a logical value
     * @param position - The x-position in local space
     * @returns The logical value, quantized to step if step > 0
     * @internal
     */
    protected _convertToValue(position: number): number;

    /**
     * Disposes of the slider and all its resources
     * Cleans up meshes, materials, and observables
     */
    dispose(): void;

    /**
     * Internal reference to the slider backplate mesh
     * @internal
     */
    protected _sliderBackplate?: AbstractMesh;

    /**
     * Internal reference to the slider bar mesh
     * @internal
     */
    protected _sliderBar: AbstractMesh;

    /**
     * Internal reference to the slider thumb mesh (draggable)
     * @internal
     */
    protected _sliderThumb: AbstractMesh;

    /**
     * Material instance for the backplate
     * @internal
     */
    protected _sliderBackplateMaterial: MRDLBackplateMaterial;

    /**
     * Material instance for the slider bar
     * @internal
     */
    protected _sliderBarMaterial: MRDLSliderBarMaterial;

    /**
     * Material instance for the slider thumb
     * @internal
     */
    protected _sliderThumbMaterial: MRDLSliderThumbMaterial;

    /**
     * Whether the backplate is visible
     * @internal
     */
    protected _sliderBackplateVisible: boolean;

    /**
     * Cached minimum value
     * @internal
     */
    protected _minimum: number;

    /**
     * Cached maximum value
     * @internal
     */
    protected _maximum: number;

    /**
     * Step increment for discrete values
     * @internal
     */
    protected _step: number;

    /**
     * Current slider value
     * @internal
     */
    protected _value: number;

    /**
     * Tracks thumb position during drag operations
     * @internal
     */
    protected _draggedPosition: number;

    /**
     * Visibility state of the control
     * @internal
     */
    protected _isVisible: boolean;
}