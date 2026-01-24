/**
 * SimpleMaterial - A simplified material for Babylon.js that supports basic lighting and textures
 * @module BABYLON
 */

import { MaterialDefines } from 'core/Materials/materialDefines';
import { PushMaterial } from 'core/Materials/pushMaterial';
import { Scene } from 'core/scene';
import { Nullable } from 'core/types';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Color3 } from 'core/Maths/math.color';
import { Matrix } from 'core/Maths/math.vector';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { SubMesh } from 'core/Meshes/subMesh';
import { Mesh } from 'core/Meshes/mesh';
import { IAnimatable } from 'core/Animations/animatable.interface';

/**
 * Material defines for SimpleMaterial
 * Controls rendering features and optimization flags
 */
export declare class SimpleMaterialDefines extends MaterialDefines {
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
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog */
    FOG: boolean;
    
    /** Enable normal vectors */
    NORMAL: boolean;
    
    /** Enable UV channel 1 */
    UV1: boolean;
    
    /** Enable UV channel 2 */
    UV2: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Number of bone influencers for skinning */
    NUM_BONE_INFLUENCERS: number;
    
    /** Number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instancing */
    INSTANCES: boolean;
    
    /** Enable instanced color attributes */
    INSTANCESCOLOR: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * SimpleMaterial - A basic material with diffuse color and lighting support
 * Provides a lightweight alternative to StandardMaterial for simple rendering needs
 */
export declare class SimpleMaterial extends PushMaterial {
    /**
     * The diffuse texture applied to the material
     */
    diffuseTexture: Nullable<BaseTexture>;
    
    /**
     * The diffuse color of the material
     * @default Color3(1, 1, 1) - White
     */
    diffuseColor: Color3;
    
    /**
     * Disable lighting calculations for this material
     * @default false
     */
    disableLighting: boolean;
    
    /**
     * Maximum number of simultaneous lights affecting this material
     * @default 4
     */
    maxSimultaneousLights: number;
    
    /**
     * Internal diffuse texture reference
     * @internal
     */
    private _diffuseTexture;
    
    /**
     * Internal lighting disabled flag
     * @internal
     */
    private _disableLighting;
    
    /**
     * Internal maximum lights count
     * @internal
     */
    private _maxSimultaneousLights;
    
    /**
     * Creates a new SimpleMaterial instance
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending
     * @returns True if alpha is less than 1
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing
     * @returns Always false for SimpleMaterial
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always null for SimpleMaterial
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - The mesh to check
     * @param subMesh - The submesh to check
     * @param useInstances - Whether instancing is used
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds the material to a submesh for rendering
     * @param world - The world matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
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
     * @param texture - The texture to check
     * @returns True if the texture is used
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - Force disposal of effect
     * @param forceDisposeTextures - Force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Clones the material
     * @param name - The name for the cloned material
     * @returns A new SimpleMaterial instance
     */
    clone(name: string): SimpleMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name of the material
     * @returns "SimpleMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - The serialized data
     * @param scene - The scene to create the material in
     * @param rootUrl - The root URL for loading resources
     * @returns The parsed SimpleMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): SimpleMaterial;
}