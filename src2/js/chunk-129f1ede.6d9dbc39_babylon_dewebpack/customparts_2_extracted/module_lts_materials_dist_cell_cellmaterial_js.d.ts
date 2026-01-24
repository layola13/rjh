import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import type { Color3 } from "core/Maths/math.color";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { IEffectCreationOptions } from "core/Materials/effect";
import type { Mesh } from "core/Meshes/mesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Scene } from "core/scene";
import { MaterialDefines } from "core/Materials/materialDefines";
import { PushMaterial } from "core/Materials/pushMaterial";

/**
 * Defines for the Cell Material shader
 * Extends base MaterialDefines with specific flags for cell shading rendering
 */
export declare class CellMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture sampling */
    DIFFUSE: boolean;
    
    /** Enable clip plane 1 */
    CLIPPLANE: boolean;
    
    /** Enable clip plane 2 */
    CLIPPLANE2: boolean;
    
    /** Enable clip plane 3 */
    CLIPPLANE3: boolean;
    
    /** Enable clip plane 4 */
    CLIPPLANE4: boolean;
    
    /** Enable clip plane 5 */
    CLIPPLANE5: boolean;
    
    /** Enable clip plane 6 */
    CLIPPLANE6: boolean;
    
    /** Enable alpha testing */
    ALPHATEST: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog calculations */
    FOG: boolean;
    
    /** Enable normal vectors */
    NORMAL: boolean;
    
    /** Enable first UV channel */
    UV1: boolean;
    
    /** Enable second UV channel */
    UV2: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Number of bone influences per vertex */
    NUM_BONE_INFLUENCERS: number;
    
    /** Maximum bones per mesh for skinning */
    BonesPerMesh: number;
    
    /** Enable GPU instancing */
    INSTANCES: boolean;
    
    /** Enable per-instance color attributes */
    INSTANCESCOLOR: boolean;
    
    /** Enable N·L (normal dot light) calculation */
    NDOTL: boolean;
    
    /** Enable custom user lighting */
    CUSTOMUSERLIGHTING: boolean;
    
    /** Use basic cell shading mode (vs high-level) */
    CELLBASIC: boolean;
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Cell Material for toon/cel-shaded rendering effects
 * Provides non-photorealistic rendering with discrete lighting steps
 */
export declare class CellMaterial extends PushMaterial {
    /**
     * Diffuse texture for base color
     */
    diffuseTexture: Nullable<BaseTexture>;

    /**
     * Diffuse color tint
     */
    diffuseColor: Color3;

    /**
     * Whether to compute high-level cell shading (false = basic mode)
     */
    computeHighLevel: boolean;

    /**
     * Disable lighting calculations
     */
    disableLighting: boolean;

    /**
     * Maximum number of simultaneous lights affecting this material
     */
    maxSimultaneousLights: number;

    /**
     * Creates a new Cell Material instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Determines if the material needs alpha blending
     * @returns True if alpha is less than 1
     */
    needAlphaBlending(): boolean;

    /**
     * Determines if the material needs alpha testing
     * @returns Always false for this material
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always null for this material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - The mesh to check
     * @param subMesh - The submesh to check
     * @param useInstances - Whether GPU instancing is used
     * @returns True if ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds the material data to the effect for rendering a submesh
     * @param world - World matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Gets the list of animatable textures in this material
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];

    /**
     * Gets all active textures used by the material
     * @returns Array of active textures
     */
    getActiveTextures(): BaseTexture[];

    /**
     * Checks if the material uses a specific texture
     * @param texture - The texture to check
     * @returns True if the texture is used
     */
    hasTexture(texture: BaseTexture): boolean;

    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - Force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;

    /**
     * Gets the class name of the material
     * @returns "CellMaterial"
     */
    getClassName(): string;

    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned CellMaterial instance
     */
    clone(name: string): CellMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed CellMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): CellMaterial;
}