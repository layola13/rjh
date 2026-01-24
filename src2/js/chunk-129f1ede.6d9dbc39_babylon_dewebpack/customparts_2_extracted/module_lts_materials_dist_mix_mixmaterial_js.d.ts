import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Texture } from "core/Materials/Textures/texture";
import { MaterialDefines } from "core/Materials/materialDefines";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import type { Scene } from "core/scene";

/**
 * Defines the material defines for MixMaterial
 * Used to configure shader compilation flags
 */
export declare class MixMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture support */
    DIFFUSE: boolean;
    
    /** Enable first clipping plane */
    CLIPPLANE: boolean;
    
    /** Enable second clipping plane */
    CLIPPLANE2: boolean;
    
    /** Enable third clipping plane */
    CLIPPLANE3: boolean;
    
    /** Enable fourth clipping plane */
    CLIPPLANE4: boolean;
    
    /** Enable fifth clipping plane */
    CLIPPLANE5: boolean;
    
    /** Enable sixth clipping plane */
    CLIPPLANE6: boolean;
    
    /** Enable alpha testing */
    ALPHATEST: boolean;
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Enable point size */
    POINTSIZE: boolean;
    
    /** Enable fog calculations */
    FOG: boolean;
    
    /** Enable specular term calculations */
    SPECULARTERM: boolean;
    
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
    
    /** Number of bone influencers per vertex */
    NUM_BONE_INFLUENCERS: number;
    
    /** Number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instancing */
    INSTANCES: boolean;
    
    /** Enable instance colors */
    INSTANCESCOLOR: boolean;
    
    /** Enable second mix map */
    MIXMAP2: boolean;
    
    /** Enable image processing post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Material that blends multiple textures based on mix maps
 * Supports up to 8 diffuse textures blended using 2 mix maps (4 textures per mix map)
 */
export declare class MixMaterial extends PushMaterial {
    /**
     * First mix texture (RGBA channels control blending of diffuse textures 1-4)
     * @internal
     */
    _mixTexture1: Nullable<Texture>;
    
    /**
     * Gets or sets the first mix texture
     */
    mixTexture1: Nullable<Texture>;

    /**
     * Second mix texture (RGBA channels control blending of diffuse textures 5-8)
     * @internal
     */
    _mixTexture2: Nullable<Texture>;
    
    /**
     * Gets or sets the second mix texture
     */
    mixTexture2: Nullable<Texture>;

    /**
     * First diffuse texture (blended by mix map 1 red channel)
     * @internal
     */
    _diffuseTexture1: Nullable<Texture>;
    
    /**
     * Gets or sets the first diffuse texture
     */
    diffuseTexture1: Nullable<Texture>;

    /**
     * Second diffuse texture (blended by mix map 1 green channel)
     * @internal
     */
    _diffuseTexture2: Nullable<Texture>;
    
    /**
     * Gets or sets the second diffuse texture
     */
    diffuseTexture2: Nullable<Texture>;

    /**
     * Third diffuse texture (blended by mix map 1 blue channel)
     * @internal
     */
    _diffuseTexture3: Nullable<Texture>;
    
    /**
     * Gets or sets the third diffuse texture
     */
    diffuseTexture3: Nullable<Texture>;

    /**
     * Fourth diffuse texture (blended by mix map 1 alpha channel)
     * @internal
     */
    _diffuseTexture4: Nullable<Texture>;
    
    /**
     * Gets or sets the fourth diffuse texture
     */
    diffuseTexture4: Nullable<Texture>;

    /**
     * Fifth diffuse texture (blended by mix map 2 red channel)
     * @internal
     */
    _diffuseTexture5: Nullable<Texture>;
    
    /**
     * Gets or sets the fifth diffuse texture
     */
    diffuseTexture5: Nullable<Texture>;

    /**
     * Sixth diffuse texture (blended by mix map 2 green channel)
     * @internal
     */
    _diffuseTexture6: Nullable<Texture>;
    
    /**
     * Gets or sets the sixth diffuse texture
     */
    diffuseTexture6: Nullable<Texture>;

    /**
     * Seventh diffuse texture (blended by mix map 2 blue channel)
     * @internal
     */
    _diffuseTexture7: Nullable<Texture>;
    
    /**
     * Gets or sets the seventh diffuse texture
     */
    diffuseTexture7: Nullable<Texture>;

    /**
     * Eighth diffuse texture (blended by mix map 2 alpha channel)
     * @internal
     */
    _diffuseTexture8: Nullable<Texture>;
    
    /**
     * Gets or sets the eighth diffuse texture
     */
    diffuseTexture8: Nullable<Texture>;

    /**
     * Base diffuse color of the material
     */
    diffuseColor: Color3;

    /**
     * Specular color (reflected light color)
     */
    specularColor: Color3;

    /**
     * Specular power (controls shininess, higher = sharper highlights)
     */
    specularPower: number;

    /**
     * Whether to disable lighting calculations
     * @internal
     */
    _disableLighting: boolean;
    
    /**
     * Gets or sets whether lighting is disabled
     */
    disableLighting: boolean;

    /**
     * Maximum number of simultaneous lights
     * @internal
     */
    _maxSimultaneousLights: number;
    
    /**
     * Gets or sets the maximum number of simultaneous lights
     */
    maxSimultaneousLights: number;

    /**
     * Creates a new MixMaterial instance
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);

    /**
     * Determines if alpha blending is needed for this material
     * @returns True if alpha is less than 1, false otherwise
     */
    needAlphaBlending(): boolean;

    /**
     * Determines if alpha testing is needed for this material
     * @returns Always returns false
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to render
     * @param useInstances - Whether instancing is used
     * @returns True if ready, false otherwise
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds the material to the submesh for rendering
     * @param world - The world matrix
     * @param mesh - The mesh to bind to
     * @param subMesh - The submesh to bind to
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Gets the list of animatable textures in this material
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];

    /**
     * Gets the list of active textures used by this material
     * @returns Array of active textures
     */
    getActiveTextures(): BaseTexture[];

    /**
     * Checks if this material uses a specific texture
     * @param texture - The texture to check
     * @returns True if the texture is used, false otherwise
     */
    hasTexture(texture: BaseTexture): boolean;

    /**
     * Disposes the material and optionally its textures
     * @param forceDisposeEffect - Whether to force disposal of the effect
     * @param forceDisposeTextures - Whether to force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

    /**
     * Creates a clone of this material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): MixMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;

    /**
     * Gets the class name of this material
     * @returns "MixMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material
     * @param source - The serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - The root URL for loading textures
     * @returns Parsed MixMaterial instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MixMaterial;
}