import type { Nullable } from "core/types";
import type { Scene } from "core/scene";
import type { Matrix } from "core/Maths/math.vector";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { SubMesh } from "core/Meshes/subMesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Mesh } from "core/Meshes/mesh";
import { PushMaterial } from "core/Materials/pushMaterial";
import { MaterialDefines } from "core/Materials/materialDefines";
import { Color4 } from "core/Maths/math.color";

/**
 * Defines the material constants for MRDL Innerquad material
 */
export class MRDLInnerquadMaterialDefines extends MaterialDefines {
    /**
     * Whether normals are needed for rendering
     */
    public _needNormals: boolean;
    
    /**
     * Whether UV coordinates are needed for rendering
     */
    public _needUVs: boolean;
    
    /**
     * Whether fog effect is enabled
     */
    public FOG?: boolean;
    
    /**
     * Whether normal attribute is available
     */
    public NORMAL?: boolean;
    
    /**
     * Whether first UV channel is available
     */
    public UV1?: boolean;
    
    /**
     * Whether second UV channel is available
     */
    public UV2?: boolean;
    
    /**
     * Whether vertex color attribute is available
     */
    public VERTEXCOLOR?: boolean;
    
    /**
     * Whether tangent attribute is available
     */
    public TANGENT?: boolean;
    
    /**
     * Whether image processing is applied by post-process
     */
    public IMAGEPROCESSINGPOSTPROCESS?: boolean;
    
    /**
     * Render ID for caching purposes
     */
    public _renderId?: number;

    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Innerquad Material
 * A specialized material for rendering inner quad elements with glow effects in mixed reality experiences
 */
export class MRDLInnerquadMaterial extends PushMaterial {
    /**
     * Base color of the material with alpha channel
     * @default Color4(1, 1, 1, 0.05)
     */
    public color: Color4;
    
    /**
     * Radius of the innerquad effect
     * @default 0.12
     */
    public radius: number;
    
    /**
     * Whether the radius is fixed or scales with distance
     * @default true
     */
    public fixedRadius: boolean;
    
    /**
     * Internal filter width parameter for edge smoothing
     * @internal
     */
    public _filterWidth: number;
    
    /**
     * Fraction of the glow effect intensity (0-1 range)
     * @default 0
     */
    public glowFraction: number;
    
    /**
     * Maximum intensity of the glow effect
     * @default 0.5
     */
    public glowMax: number;
    
    /**
     * Falloff rate of the glow effect
     * @default 2
     */
    public glowFalloff: number;

    /**
     * Creates a new MRDLInnerquadMaterial instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Determines if the material requires alpha blending
     * @returns Always returns true as this material supports transparency
     */
    needAlphaBlending(): boolean;

    /**
     * Determines if the material requires alpha testing
     * @returns Always returns false as this material doesn't use alpha testing
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null as alpha testing is not used
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - The mesh to check readiness for
     * @param subMesh - The submesh to check readiness for
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;

    /**
     * Binds the material data to the effect for rendering a submesh
     * @param world - World matrix of the mesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Gets the list of animatable properties in the material
     * @returns Empty array as this material has no animatable textures
     */
    getAnimatables(): IAnimatable[];

    /**
     * Disposes the material and releases GPU resources
     * @param forceDisposeEffect - Force disposal of the associated effect
     */
    dispose(forceDisposeEffect?: boolean): void;

    /**
     * Clones the material with a new name
     * @param name - Name for the cloned material
     * @returns A new instance of MRDLInnerquadMaterial with copied properties
     */
    clone(name: string): MRDLInnerquadMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Gets the class name of the material
     * @returns "MRDLInnerquadMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material and creates a new instance
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed MRDLInnerquadMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLInnerquadMaterial;
}