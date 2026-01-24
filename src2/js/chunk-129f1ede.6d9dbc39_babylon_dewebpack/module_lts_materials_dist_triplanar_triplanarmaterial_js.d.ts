/**
 * Tri-planar material implementation for Babylon.js
 * Provides texture mapping using three perpendicular planar projections (X, Y, Z axes)
 */

import type { Nullable } from 'core/types';
import type { Matrix } from 'core/Maths/math.vector';
import type { Color3 } from 'core/Maths/math.color';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Texture } from 'core/Materials/Textures/texture';
import type { Scene } from 'core/scene';
import type { AbstractMesh } from 'core/Meshes/abstractMesh';
import type { SubMesh } from 'core/Meshes/subMesh';
import type { Mesh } from 'core/Meshes/mesh';
import type { Effect } from 'core/Materials/effect';
import type { MaterialDefines } from 'core/Materials/materialDefines';
import type { PushMaterial } from 'core/Materials/pushMaterial';

/**
 * Material defines specific to tri-planar material
 * Controls texture mapping, lighting, and rendering features
 */
export declare class TriPlanarMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture for X-axis projection */
    DIFFUSEX: boolean;
    
    /** Enable diffuse texture for Y-axis projection */
    DIFFUSEY: boolean;
    
    /** Enable diffuse texture for Z-axis projection */
    DIFFUSEZ: boolean;
    
    /** Enable normal/bump texture for X-axis projection */
    BUMPX: boolean;
    
    /** Enable normal/bump texture for Y-axis projection */
    BUMPY: boolean;
    
    /** Enable normal/bump texture for Z-axis projection */
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
    
    /** Enable depth pre-pass rendering */
    DEPTHPREPASS: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog effects */
    FOG: boolean;
    
    /** Enable specular lighting term */
    SPECULARTERM: boolean;
    
    /** Enable normal calculation */
    NORMAL: boolean;
    
    /** Enable vertex color */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha channel */
    VERTEXALPHA: boolean;
    
    /** Number of bone influences per vertex for skinning */
    NUM_BONE_INFLUENCERS: number;
    
    /** Total number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enable GPU instancing */
    INSTANCES: boolean;
    
    /** Enable per-instance color variation */
    INSTANCESCOLOR: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping in shader */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * Tri-planar mapping material for Babylon.js
 * Maps textures along three perpendicular axes (X, Y, Z) based on surface normals
 * Useful for large terrain or organic surfaces where UV mapping is impractical
 */
export declare class TriPlanarMaterial extends PushMaterial {
    /**
     * Mix texture (currently unused in implementation)
     * @deprecated
     */
    mixTexture: Nullable<BaseTexture>;
    
    /**
     * Diffuse texture projected along X-axis
     */
    get diffuseTextureX(): Nullable<Texture>;
    set diffuseTextureX(value: Nullable<Texture>);
    
    /**
     * Diffuse texture projected along Y-axis
     */
    get diffuseTextureY(): Nullable<Texture>;
    set diffuseTextureY(value: Nullable<Texture>);
    
    /**
     * Diffuse texture projected along Z-axis
     */
    get diffuseTextureZ(): Nullable<Texture>;
    set diffuseTextureZ(value: Nullable<Texture>);
    
    /**
     * Normal/bump texture projected along X-axis
     */
    get normalTextureX(): Nullable<Texture>;
    set normalTextureX(value: Nullable<Texture>);
    
    /**
     * Normal/bump texture projected along Y-axis
     */
    get normalTextureY(): Nullable<Texture>;
    set normalTextureY(value: Nullable<Texture>);
    
    /**
     * Normal/bump texture projected along Z-axis
     */
    get normalTextureZ(): Nullable<Texture>;
    set normalTextureZ(value: Nullable<Texture>);
    
    /**
     * Size of texture tiling in world units
     * Larger values = smaller texture repetition
     */
    tileSize: number;
    
    /**
     * Diffuse color multiplier
     */
    diffuseColor: Color3;
    
    /**
     * Specular reflection color
     */
    specularColor: Color3;
    
    /**
     * Specular shininess exponent (higher = sharper highlights)
     */
    specularPower: number;
    
    /**
     * Disable all dynamic lighting calculations
     */
    get disableLighting(): boolean;
    set disableLighting(value: boolean);
    
    /**
     * Maximum number of simultaneous lights affecting this material
     */
    get maxSimultaneousLights(): number;
    set maxSimultaneousLights(value: number);
    
    /**
     * Creates a new tri-planar material
     * @param name - Material name
     * @param scene - Parent scene
     */
    constructor(name: string, scene?: Scene);
    
    /**
     * Determines if the material requires alpha blending
     * @returns True if alpha < 1.0
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material requires alpha testing
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
     * @param useInstances - Whether GPU instancing is used
     * @returns True if ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds the material data to the effect for rendering
     * @param world - World matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets list of animatable textures
     * @returns Array of animatable textures (currently only mixTexture)
     */
    getAnimatables(): Array<BaseTexture>;
    
    /**
     * Gets all active textures used by this material
     * @returns Array of active textures
     */
    getActiveTextures(): Array<BaseTexture>;
    
    /**
     * Checks if a specific texture is used by this material
     * @param texture - Texture to check
     * @returns True if texture is used
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * Disposes material resources
     * @param forceDisposeEffect - Force disposal of shader effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): TriPlanarMaterial;
    
    /**
     * Serializes the material to JSON
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name
     * @returns "TriPlanarMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized tri-planar material
     * @param source - Serialized material data
     * @param scene - Target scene
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): TriPlanarMaterial;
}