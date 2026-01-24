import { Observable } from 'core/Misc/observable';
import { Control3D } from '../../../lts/gui/dist/3D/controls/control3D';
import { FluentBackplateMaterial } from '../../../lts/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial';
import { Mesh } from 'core/Meshes/mesh';
import { Scene } from 'core/scene';
import { TransformNode } from 'core/Meshes/transformNode';

/**
 * Holographic backplate control for 3D GUI
 * Provides a fluent design backplate with material sharing capabilities
 */
export declare class HolographicBackplate extends Control3D {
    /**
     * Base URL for loading the backplate model
     */
    static readonly MODEL_BASE_URL: string;

    /**
     * Filename of the backplate 3D model
     */
    static readonly MODEL_FILENAME: string;

    /**
     * Internal reference to the backplate model mesh
     */
    private _model: Mesh;

    /**
     * Internal reference to the fluent backplate material
     */
    private _material: FluentBackplateMaterial;

    /**
     * Flag indicating whether materials should be shared across instances
     */
    private readonly _shareMaterials: boolean;

    /**
     * Creates a new HolographicBackplate instance
     * @param name - Name of the control
     * @param shareMaterials - Whether to share materials across instances (default: true)
     */
    constructor(name?: string, shareMaterials?: boolean);

    /**
     * Gets or sets the rendering group ID for the backplate
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);

    /**
     * Gets the fluent backplate material
     */
    get material(): FluentBackplateMaterial;

    /**
     * Gets whether materials are shared across instances
     */
    get shareMaterials(): boolean;

    /**
     * Gets the type name of this control
     * @returns "HolographicBackplate"
     */
    protected _getTypeName(): string;

    /**
     * Creates the collision mesh node for the backplate
     * @param scene - The scene to create the node in
     * @returns The created transform node
     */
    protected _createNode(scene: Scene): TransformNode;

    /**
     * Creates the fluent backplate material
     * @param mesh - The mesh to create material for
     */
    protected _createMaterial(mesh: Mesh): void;

    /**
     * Applies material to the mesh, either shared or instance-specific
     * @param mesh - The mesh to apply material to
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Disposes of the backplate and its resources
     */
    dispose(): void;
}