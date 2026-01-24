/**
 * Type definitions for SimpleMaterial
 * A simple material implementation for Babylon.js with basic diffuse lighting support
 */

import { MaterialDefines } from 'core/Materials/materialDefines';
import { PushMaterial } from 'core/Materials/pushMaterial';
import { Scene } from 'core/scene';
import { Mesh } from 'core/Meshes/mesh';
import { SubMesh } from 'core/Meshes/subMesh';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Texture } from 'core/Materials/Textures/texture';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { Matrix } from 'core/Maths/math.vector';
import { IAnimatable } from 'core/Animations/animatable.interface';

/**
 * Material defines for SimpleMaterial
 * Controls feature flags and shader compilation options
 */
export class SimpleMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture */
    DIFFUSE: boolean;
    
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
    
    /** Enable point size control */
    POINTSIZE: boolean;
    
    /** Enable fog */
    FOG: boolean;
    
    /** Enable normals */
    NORMAL: boolean;
    
    /** Enable UV channel 1 */
    UV1: boolean;
    
    /** Enable UV channel 2 */
    UV2: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Number of bone influences per vertex */
    NUM_BONE_INFLUENCERS: number;
    
    /** Number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instancing */
    INSTANCES: boolean;
    
    /** Enable instance colors */
    INSTANCESCOLOR: boolean;
    
    /** Enable image processing post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * SimpleMaterial - A simple material with diffuse color and basic lighting
 * Provides a lightweight material implementation with essential features
 */
export class SimpleMaterial extends PushMaterial {
    /**
     * Diffuse texture applied to the material
     */
    diffuseTexture: Nullable<BaseTexture>;
    
    /**
     * Diffuse color of the material
     * @defaultValue Color3(1, 1, 1) - white
     */
    diffuseColor: Color3;
    
    /**
     * Disable lighting calculations for this material
     * @defaultValue false
     */
    disableLighting: boolean;
    
    /**
     * Maximum number of simultaneous lights affecting this material
     * @defaultValue 4
     */
    maxSimultaneousLights: number;
    
    /**
     * Creates a new SimpleMaterial instance
     * @param name - Name of the material
     * @param scene - Scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending
     * @returns true if alpha is less than 1
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing
     * @returns false - SimpleMaterial does not use alpha testing
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns null - SimpleMaterial does not use alpha testing
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - Mesh to check
     * @param subMesh - Submesh to check
     * @param useInstances - Whether instancing is used
     * @returns true if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds material data for a specific submesh
     * @param world - World matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable properties in the material
     * @returns Array of animatable objects (textures with animations)
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Gets all active textures used by the material
     * @returns Array of active textures
     */
    getActiveTextures(): BaseTexture[];
    
    /**
     * Checks if the material uses a specific texture
     * @param texture - Texture to check
     * @returns true if the texture is used by this material
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * Disposes the material and its resources
     * @param forceDisposeEffect - Force disposal of effects
     * @param forceDisposeTextures - Force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Creates a clone of the material
     * @param name - Name for the cloned material
     * @returns Cloned SimpleMaterial instance
     */
    clone(name: string): SimpleMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;
    
    /**
     * Gets the class name of the material
     * @returns "SimpleMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed SimpleMaterial instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): SimpleMaterial;
}