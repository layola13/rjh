/**
 * Three-planar mapping material for Babylon.js
 * Provides automatic texture projection from three orthogonal axes (X, Y, Z)
 */

import { MaterialDefines } from 'core/Materials/materialDefines';
import { PushMaterial } from 'core/Materials/pushMaterial';
import { Scene } from 'core/scene';
import { Mesh } from 'core/Meshes/mesh';
import { SubMesh } from 'core/Meshes/subMesh';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Texture } from 'core/Materials/Textures/texture';
import { Nullable } from 'core/types';
import { Matrix } from 'core/Maths/math.vector';
import { Color3 } from 'core/Maths/math.color';
import { IAnimatable } from 'core/Animations/animatable.interface';
import { Effect } from 'core/Materials/effect';
import { SerializationHelper } from 'core/Misc/decorators';

/**
 * Material defines for TriPlanarMaterial
 * Stores shader feature flags and compilation directives
 */
export declare class TriPlanarMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture on X axis */
    DIFFUSEX: boolean;
    
    /** Enable diffuse texture on Y axis */
    DIFFUSEY: boolean;
    
    /** Enable diffuse texture on Z axis */
    DIFFUSEZ: boolean;
    
    /** Enable normal/bump texture on X axis */
    BUMPX: boolean;
    
    /** Enable normal/bump texture on Y axis */
    BUMPY: boolean;
    
    /** Enable normal/bump texture on Z axis */
    BUMPZ: boolean;
    
    /** Enable clipping plane 1 */
    CLIPPLANE: boolean;
    
    /** Enable clipping plane 2 */
    CLIPPLANE2: boolean;
    
    /** Enable clipping plane 3 */
    CLIPPLANE3: boolean;
    
    /** Enable clipping plane 4 */
    CLIPPLANE4: boolean;
    
    /** Enable clipping plane 5 */
    CLIPPLANE5: boolean;
    
    /** Enable clipping plane 6 */
    CLIPPLANE6: boolean;
    
    /** Enable alpha testing */
    ALPHATEST: boolean;
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog rendering */
    FOG: boolean;
    
    /** Enable specular lighting term */
    SPECULARTERM: boolean;
    
    /** Enable normal attribute */
    NORMAL: boolean;
    
    /** Enable vertex color attribute */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha channel */
    VERTEXALPHA: boolean;
    
    /** Number of bone influences per vertex (skinning) */
    NUM_BONE_INFLUENCERS: number;
    
    /** Maximum bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instanced rendering */
    INSTANCES: boolean;
    
    /** Enable per-instance color attribute */
    INSTANCESCOLOR: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * TriPlanar mapping material
 * Automatically projects textures from three orthogonal planes (X, Y, Z) based on surface normal
 * Ideal for terrain, rocks, and organic shapes without UV mapping
 */
export declare class TriPlanarMaterial extends PushMaterial {
    /**
     * Mix texture (legacy/unused property)
     */
    mixTexture?: Nullable<BaseTexture>;
    
    /**
     * Diffuse texture projected on X axis (YZ plane)
     */
    diffuseTextureX?: Nullable<BaseTexture>;
    
    /**
     * Diffuse texture projected on Y axis (XZ plane)
     */
    diffuseTextureY?: Nullable<BaseTexture>;
    
    /**
     * Diffuse texture projected on Z axis (XY plane)
     */
    diffuseTextureZ?: Nullable<BaseTexture>;
    
    /**
     * Normal/bump texture projected on X axis (YZ plane)
     */
    normalTextureX?: Nullable<BaseTexture>;
    
    /**
     * Normal/bump texture projected on Y axis (XZ plane)
     */
    normalTextureY?: Nullable<BaseTexture>;
    
    /**
     * Normal/bump texture projected on Z axis (XY plane)
     */
    normalTextureZ?: Nullable<BaseTexture>;
    
    /**
     * UV tiling multiplier for all texture projections
     * @default 1.0
     */
    tileSize: number;
    
    /**
     * Diffuse color multiplier
     * @default Color3(1, 1, 1) - white
     */
    diffuseColor: Color3;
    
    /**
     * Specular reflection color
     * @default Color3(0.2, 0.2, 0.2) - light gray
     */
    specularColor: Color3;
    
    /**
     * Specular power/glossiness exponent
     * Higher values create sharper highlights
     * @default 64
     */
    specularPower: number;
    
    /**
     * Disable all lighting calculations (unlit material)
     * @default false
     */
    disableLighting: boolean;
    
    /**
     * Maximum number of simultaneous lights affecting this material
     * @default 4
     */
    maxSimultaneousLights: number;
    
    /**
     * Creates a new TriPlanarMaterial instance
     * @param name - Material name identifier
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Checks if the material needs alpha blending
     * @returns True if alpha < 1.0
     */
    needAlphaBlending(): boolean;
    
    /**
     * Checks if the material needs alpha testing
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
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to render
     * @param useInstances - Whether instanced rendering is used
     * @returns True if ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds material data to the effect for a specific submesh
     * @param world - World transformation matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets all animatable textures from this material
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Gets all active textures used by this material
     * @returns Array of active textures
     */
    getActiveTextures(): BaseTexture[];
    
    /**
     * Checks if this material uses a specific texture
     * @param texture - Texture to check
     * @returns True if texture is used
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - Force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns New cloned material instance
     */
    clone(name: string): TriPlanarMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name
     * @returns "TriPlanarMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create material in
     * @param rootUrl - Root URL for texture loading
     * @returns Parsed material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): TriPlanarMaterial;
}