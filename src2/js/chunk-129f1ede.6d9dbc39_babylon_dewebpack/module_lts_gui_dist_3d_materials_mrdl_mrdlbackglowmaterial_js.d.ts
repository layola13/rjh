import { Scene } from '@babylonjs/core/scene';
import { Matrix, Vector3, Color4 } from '@babylonjs/core/Maths/math';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Effect } from '@babylonjs/core/Materials/effect';

/**
 * Material defines for MRDL Backglow Material
 * Extends MaterialDefines to include specific shader requirements
 */
export declare class MRDLBackglowMaterialDefines extends MaterialDefines {
    /**
     * Indicates if normals are needed for this material
     */
    _needNormals: boolean;

    /**
     * Indicates if UVs are needed for this material
     */
    _needUVs: boolean;

    /**
     * Indicates if fog should be applied
     */
    FOG?: boolean;

    /**
     * Indicates if normal attribute is available
     */
    NORMAL?: boolean;

    /**
     * Indicates if UV1 attribute is available
     */
    UV1?: boolean;

    /**
     * Indicates if UV2 attribute is available
     */
    UV2?: boolean;

    /**
     * Indicates if vertex color attribute is available
     */
    VERTEXCOLOR?: boolean;

    /**
     * Indicates if tangent attribute is available
     */
    TANGENT?: boolean;

    /**
     * Indicates if image processing is applied by post process
     */
    IMAGEPROCESSINGPOSTPROCESS?: boolean;

    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Backglow Material
 * Creates a glowing backlight effect commonly used in mixed reality interfaces
 * Provides additive blending with customizable glow parameters
 */
export declare class MRDLBackglowMaterial extends PushMaterial {
    /**
     * Radius of the beveled edge effect
     * @default 0.16
     */
    bevelRadius: number;

    /**
     * Width of the line/edge glow
     * @default 0.16
     */
    lineWidth: number;

    /**
     * Whether sizes are absolute (true) or relative (false)
     * @default false
     */
    absoluteSizes: boolean;

    /**
     * Tuning parameter for motion effects
     * @default 0
     */
    tuningMotion: number;

    /**
     * Motion intensity value
     * @default 1
     */
    motion: number;

    /**
     * Maximum glow intensity
     * @default 0.7
     */
    maxIntensity: number;

    /**
     * Exponent controlling how fast intensity fades in
     * @default 2
     */
    intensityFadeInExponent: number;

    /**
     * Start position of outer fuzz/blur effect
     * @default 0.04
     */
    outerFuzzStart: number;

    /**
     * End position of outer fuzz/blur effect
     * @default 0.04
     */
    outerFuzzEnd: number;

    /**
     * Primary glow color (RGBA)
     * @default Color4(0.682353, 0.698039, 1, 1) - Light blue
     */
    color: Color4;

    /**
     * Inner glow color (RGBA)
     * @default Color4(0.356863, 0.392157, 0.796078, 1) - Dark blue
     */
    innerColor: Color4;

    /**
     * Exponent controlling color blending between inner and outer
     * @default 1.5
     */
    blendExponent: number;

    /**
     * Falloff rate of the glow effect
     * @default 2
     */
    falloff: number;

    /**
     * Bias offset for glow calculation
     * @default 0.5
     */
    bias: number;

    /**
     * Creates a new instance of MRDLBackglowMaterial
     * @param name - Name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);

    /**
     * Specifies that this material always needs alpha blending
     * @returns Always true (additive blending required)
     */
    needAlphaBlending(): boolean;

    /**
     * Specifies that this material does not need alpha testing
     * @returns Always false
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always null (no alpha test texture)
     */
    getAlphaTestTexture(): null;

    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     * @returns True if the material is ready
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
     * @returns Empty array (no animatable textures)
     */
    getAnimatables(): IAnimatable[];

    /**
     * Disposes the material and its resources
     * @param forceDisposeEffect - If true, forcefully dispose the effect
     * @param forceDisposeTextures - If true, forcefully dispose textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

    /**
     * Creates a copy of the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): MRDLBackglowMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;

    /**
     * Gets the class name of the material
     * @returns "MRDLBackglowMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material from JSON
     * @param source - Serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackglowMaterial;
}