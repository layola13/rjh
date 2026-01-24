import { Observable } from '@babylonjs/core/Misc/observable';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Control3D } from './control3D';
import { MRDLSliderBarMaterial } from '../materials/mrdl/mrdlSliderBarMaterial';
import { MRDLSliderThumbMaterial } from '../materials/mrdl/mrdlSliderThumbMaterial';
import { MRDLBackplateMaterial } from '../materials/mrdl/mrdlBackplateMaterial';

/**
 * 3D slider control for MRTK-style UI interactions
 * Provides a draggable thumb along a slider bar with optional backplate
 */
export declare class Slider3D extends Control3D {
    /**
     * Base URL for loading MRTK slider 3D models
     */
    static readonly MODEL_BASE_URL: string;

    /**
     * Filename of the MRTK slider GLTF model
     */
    static readonly MODEL_FILENAME: string;

    /**
     * Observable triggered when slider value changes
     */
    readonly onValueChangedObservable: Observable<number>;

    /**
     * Gets the mesh representing the slider thumb (draggable part)
     */
    get mesh(): Mesh | null;

    /**
     * Gets or sets the minimum value of the slider
     * @remarks Value is clamped to be >= 0
     */
    get minimum(): number;
    set minimum(value: number);

    /**
     * Gets or sets the maximum value of the slider
     * @remarks Value is clamped to be >= minimum
     */
    get maximum(): number;
    set maximum(value: number);

    /**
     * Gets or sets the step increment for discrete slider values
     * @remarks 0 means continuous values, otherwise value snaps to step increments
     */
    get step(): number;
    set step(value: number);

    /**
     * Gets or sets the current slider value
     * @remarks Value is clamped between minimum and maximum
     */
    get value(): number;
    set value(value: number);

    /**
     * Gets the world-space position of the slider's start point (left edge)
     */
    get start(): number;

    /**
     * Gets the world-space position of the slider's end point (right edge)
     */
    get end(): number;

    /**
     * Gets the material applied to the slider bar
     */
    get sliderBarMaterial(): MRDLSliderBarMaterial;

    /**
     * Gets the material applied to the slider thumb
     */
    get sliderThumbMaterial(): MRDLSliderThumbMaterial;

    /**
     * Gets the material applied to the slider backplate
     */
    get sliderBackplateMaterial(): MRDLBackplateMaterial;

    /**
     * Sets the visibility of the entire slider control
     */
    set isVisible(value: boolean);

    /**
     * Creates a new Slider3D instance
     * @param name - Unique name for this slider control
     * @param isBackplateVisible - Whether to show the backplate mesh behind the slider
     */
    constructor(name: string, isBackplateVisible?: boolean);

    /**
     * Disposes of all meshes and materials associated with this slider
     */
    dispose(): void;
}