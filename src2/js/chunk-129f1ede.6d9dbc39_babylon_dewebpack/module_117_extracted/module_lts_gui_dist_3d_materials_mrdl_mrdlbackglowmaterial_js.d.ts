import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Matrix } from '@babylonjs/core/Maths/math.vector';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { Effect } from '@babylonjs/core/Materials/effect';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';

/**
 * Material defines for MRDL Backglow material
 * Extends the base MaterialDefines with specific requirements for this material
 */
declare class MRDLBackglowMaterialDefines extends MaterialDefines {
    /** Indicates if normals are needed for rendering */
    _needNormals: boolean;
    
    /** Indicates if UV coordinates are needed for rendering */
    _needUVs: boolean;
    
    /** Fog effect flag */
    FOG?: boolean;
    
    /** Normal attribute flag */
    NORMAL?: boolean;
    
    /** Primary UV coordinate flag */
    UV1?: boolean;
    
    /** Secondary UV coordinate flag */
    UV2?: boolean;
    
    /** Vertex color flag */
    VERTEXCOLOR?: boolean;
    
    /** Tangent attribute flag */
    TANGENT?: boolean;
    
    /** Image processing post-process flag */
    IMAGEPROCESSINGPOSTPROCESS?: boolean;
    
    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Backglow Material
 * A specialized material that creates a glowing backlight effect commonly used in mixed reality UI elements.
 * Provides customizable glow, bevel, and color blending properties for enhanced visual feedback.
 */
export declare class MRDLBackglowMaterial extends PushMaterial {
    /**
     * Radius of the beveled edge in local units
     * @default 0.16
     */
    bevelRadius: number;
    
    /**
     * Width of the glowing line effect
     * @default 0.16
     */
    lineWidth: number;
    
    /**
     * When true, sizes are in absolute world units; when false, sizes are relative
     * @default false
     */
    absoluteSizes: boolean;
    
    /**
     * Motion tuning parameter for animation effects
     * @default 0
     */
    tuningMotion: number;
    
    /**
     * Motion intensity multiplier for animated glow effects
     * @default 1
     */
    motion: number;
    
    /**
     * Maximum glow intensity value
     * @default 0.7
     */
    maxIntensity: number;
    
    /**
     * Exponent controlling how quickly the glow intensity fades in
     * @default 2
     */
    intensityFadeInExponent: number;
    
    /**
     * Starting distance for the outer fuzz/glow effect
     * @default 0.04
     */
    outerFuzzStart: number;
    
    /**
     * Ending distance for the outer fuzz/glow effect
     * @default 0.04
     */
    outerFuzzEnd: number;
    
    /**
     * Primary glow color (RGBA)
     * @default Color4(0.682353, 0.698039, 1, 1) - Light blue
     */
    color: Color4;
    
    /**
     * Inner/core glow color (RGBA)
     * @default Color4(0.356863, 0.392157, 0.796078, 1) - Darker blue
     */
    innerColor: Color4;
    
    /**
     * Exponent controlling color blending between inner and outer colors
     * @default 1.5
     */
    blendExponent: number;
    
    /**
     * Falloff rate for glow intensity over distance
     * @default 2
     */
    falloff: number;
    
    /**
     * Bias offset for glow calculation
     * @default 0.5
     */
    bias: number;
    
    /**
     * Creates a new MRDL Backglow Material
     * @param name - Name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material requires alpha blending
     * @returns Always returns true as backglow uses additive blending
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material requires alpha testing
     * @returns Always returns false
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null as alpha testing is not used
     */
    getAlphaTestTexture(): null;
    
    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - The mesh to check readiness for
     * @param subMesh - The submesh to check readiness for
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds material data to the shader for rendering a submesh
     * @param world - World transformation matrix
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
     * Disposes of the material and releases resources
     * @param forceDisposeEffect - If true, forcefully disposes the shader effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Creates a clone of the material
     * @param name - Name for the cloned material
     * @returns A new instance with copied properties
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
     * Parses a serialized material to reconstruct the material instance
     * @param source - Serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - Root URL for loading assets
     * @returns Reconstructed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackglowMaterial;
}