import { Observable } from "core/Misc/observable";
import { Scene } from "core/scene";
import { Mesh } from "core/Meshes/mesh";
import { Control3D } from "../../../lts/gui/dist/3D/controls/control3D";
import { FluentBackplateMaterial } from "../../../lts/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial";

/**
 * Represents a holographic backplate control for 3D GUI elements.
 * Provides a visual backing surface with Fluent Design styling.
 */
export declare class HolographicBackplate extends Control3D {
    /**
     * Base URL for loading the MRTK 3D model assets.
     */
    static readonly MODEL_BASE_URL: string;

    /**
     * Filename of the Fluent backplate 3D model.
     */
    static readonly MODEL_FILENAME: string;

    /**
     * Gets or sets the rendering group ID for the backplate mesh.
     * Controls the rendering order in the scene.
     */
    renderingGroupId: number;

    /**
     * Gets the Fluent backplate material applied to this control.
     * @readonly
     */
    readonly material: FluentBackplateMaterial;

    /**
     * Gets whether this backplate shares materials with other instances.
     * Material sharing improves performance when multiple backplates are used.
     * @readonly
     */
    readonly shareMaterials: boolean;

    /**
     * Creates a new HolographicBackplate instance.
     * @param name - The name identifier for this backplate control
     * @param shareMaterials - Whether to share materials across multiple backplate instances (default: true)
     */
    constructor(name: string, shareMaterials?: boolean);

    /**
     * Gets the type name of this control.
     * @returns The string "HolographicBackplate"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Creates the collision mesh node and loads the visual model.
     * @param scene - The Babylon.js scene to create the node in
     * @returns The root mesh node with collision bounds
     * @internal
     */
    protected _createNode(scene: Scene): Mesh;

    /**
     * Creates a new Fluent backplate material for this control.
     * @param mesh - The mesh that will use this material
     * @internal
     */
    protected _createMaterial(mesh: Mesh): void;

    /**
     * Assigns or shares material to the backplate mesh.
     * Handles material sharing logic based on shareMaterials property.
     * @param mesh - The mesh to apply material to
     * @internal
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Disposes of the backplate control and its resources.
     * Cleans up materials (if not shared) and model meshes.
     */
    dispose(): void;

    /**
     * The internal mesh model representing the front plate.
     * @internal
     */
    private _model: Mesh;

    /**
     * The Fluent backplate material instance.
     * @internal
     */
    private _material: FluentBackplateMaterial;

    /**
     * Flag indicating whether materials are shared across instances.
     * @internal
     */
    private readonly _shareMaterials: boolean;
}