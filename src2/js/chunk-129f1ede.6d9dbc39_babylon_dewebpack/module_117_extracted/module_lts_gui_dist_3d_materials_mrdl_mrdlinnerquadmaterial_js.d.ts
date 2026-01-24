import { Scene } from '@babylonjs/core/scene';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Effect } from '@babylonjs/core/Materials/effect';

/**
 * Material defines for MRDL (Mixed Reality Design Language) Innerquad material
 * Extends the base MaterialDefines to include specific flags for rendering
 */
export declare class MRDLInnerquadMaterialDefines extends MaterialDefines {
    /** Whether normals are needed for rendering */
    _needNormals: boolean;
    
    /** Whether UV coordinates are needed for rendering */
    _needUVs: boolean;
    
    /** Whether fog should be applied */
    FOG?: boolean;
    
    /** Whether normal attribute is present */
    NORMAL?: boolean;
    
    /** Whether first UV set is present */
    UV1?: boolean;
    
    /** Whether second UV set is present */
    UV2?: boolean;
    
    /** Whether vertex colors are present */
    VERTEXCOLOR?: boolean;
    
    /** Whether tangent attribute is present */
    TANGENT?: boolean;
    
    /** Whether image processing is applied via post-process */
    IMAGEPROCESSINGPOSTPROCESS?: boolean;
    
    /** Internal render ID for caching */
    _renderId?: number;
    
    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Innerquad Material
 * A specialized material for rendering inner quad elements with glow effects
 * commonly used in Mixed Reality UI components
 */
export declare class MRDLInnerquadMaterial extends PushMaterial {
    /**
     * Base color of the quad with alpha channel
     * @default Color4(1, 1, 1, 0.05)
     */
    color: Color4;
    
    /**
     * Radius of the quad corners
     * @default 0.12
     */
    radius: number;
    
    /**
     * Whether the radius is fixed regardless of scale
     * @default true
     */
    fixedRadius: boolean;
    
    /**
     * Filter width for anti-aliasing
     * @internal
     * @default 1
     */
    _filterWidth: number;
    
    /**
     * Fraction of the glow effect intensity (0.0 to 1.0)
     * @default 0
     */
    glowFraction: number;
    
    /**
     * Maximum glow intensity
     * @default 0.5
     */
    glowMax: number;
    
    /**
     * Glow falloff rate - controls how quickly glow fades
     * @default 2
     */
    glowFalloff: number;
    
    /**
     * Creates a new MRDL Innerquad material
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Specifies whether the material requires alpha blending
     * @returns Always returns true as this material uses transparency
     */
    needAlphaBlending(): boolean;
    
    /**
     * Specifies whether the material requires alpha testing
     * @returns Always returns false as alpha blending is used instead
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null as alpha testing is not used
     */
    getAlphaTestTexture(): null;
    
    /**
     * Checks if the material is ready to be rendered for a specific mesh/submesh
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to render
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds the material data to the effect for rendering a specific submesh
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
     * Disposes the material and releases its resources
     * @param forceDisposeEffect - Whether to force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Creates a clone of the material
     * @param name - Name for the cloned material
     * @returns A new instance of MRDLInnerquadMaterial with copied properties
     */
    clone(name: string): MRDLInnerquadMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;
    
    /**
     * Gets the class name of the material
     * @returns "MRDLInnerquadMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material and creates a new instance
     * @param source - Serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns A new MRDLInnerquadMaterial instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLInnerquadMaterial;
}