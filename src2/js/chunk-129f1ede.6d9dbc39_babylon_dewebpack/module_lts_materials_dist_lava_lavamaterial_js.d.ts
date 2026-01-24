import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Texture } from "core/Materials/Textures/texture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { SubMesh } from "core/Meshes/subMesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Mesh } from "core/Meshes/mesh";
import { MaterialDefines } from "core/Materials/materialDefines";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { Scene } from "core/scene";
import type { Effect } from "core/Materials/effect";

/**
 * Material defines for the lava material.
 * Contains shader compilation flags and feature toggles.
 */
export declare class LavaMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture */
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
    
    /** Enable light 0 */
    LIGHT0: boolean;
    
    /** Enable light 1 */
    LIGHT1: boolean;
    
    /** Enable light 2 */
    LIGHT2: boolean;
    
    /** Enable light 3 */
    LIGHT3: boolean;
    
    /** Light 0 is spotlight */
    SPOTLIGHT0: boolean;
    
    /** Light 1 is spotlight */
    SPOTLIGHT1: boolean;
    
    /** Light 2 is spotlight */
    SPOTLIGHT2: boolean;
    
    /** Light 3 is spotlight */
    SPOTLIGHT3: boolean;
    
    /** Light 0 is hemisphere light */
    HEMILIGHT0: boolean;
    
    /** Light 1 is hemisphere light */
    HEMILIGHT1: boolean;
    
    /** Light 2 is hemisphere light */
    HEMILIGHT2: boolean;
    
    /** Light 3 is hemisphere light */
    HEMILIGHT3: boolean;
    
    /** Light 0 is directional light */
    DIRLIGHT0: boolean;
    
    /** Light 1 is directional light */
    DIRLIGHT1: boolean;
    
    /** Light 2 is directional light */
    DIRLIGHT2: boolean;
    
    /** Light 3 is directional light */
    DIRLIGHT3: boolean;
    
    /** Light 0 is point light */
    POINTLIGHT0: boolean;
    
    /** Light 1 is point light */
    POINTLIGHT1: boolean;
    
    /** Light 2 is point light */
    POINTLIGHT2: boolean;
    
    /** Light 3 is point light */
    POINTLIGHT3: boolean;
    
    /** Enable shadow for light 0 */
    SHADOW0: boolean;
    
    /** Enable shadow for light 1 */
    SHADOW1: boolean;
    
    /** Enable shadow for light 2 */
    SHADOW2: boolean;
    
    /** Enable shadow for light 3 */
    SHADOW3: boolean;
    
    /** Enable shadows globally */
    SHADOWS: boolean;
    
    /** Use ESM shadow for light 0 */
    SHADOWESM0: boolean;
    
    /** Use ESM shadow for light 1 */
    SHADOWESM1: boolean;
    
    /** Use ESM shadow for light 2 */
    SHADOWESM2: boolean;
    
    /** Use ESM shadow for light 3 */
    SHADOWESM3: boolean;
    
    /** Use Poisson sampling for shadow 0 */
    SHADOWPOISSON0: boolean;
    
    /** Use Poisson sampling for shadow 1 */
    SHADOWPOISSON1: boolean;
    
    /** Use Poisson sampling for shadow 2 */
    SHADOWPOISSON2: boolean;
    
    /** Use Poisson sampling for shadow 3 */
    SHADOWPOISSON3: boolean;
    
    /** Use PCF filtering for shadow 0 */
    SHADOWPCF0: boolean;
    
    /** Use PCF filtering for shadow 1 */
    SHADOWPCF1: boolean;
    
    /** Use PCF filtering for shadow 2 */
    SHADOWPCF2: boolean;
    
    /** Use PCF filtering for shadow 3 */
    SHADOWPCF3: boolean;
    
    /** Use PCSS for shadow 0 */
    SHADOWPCSS0: boolean;
    
    /** Use PCSS for shadow 1 */
    SHADOWPCSS1: boolean;
    
    /** Use PCSS for shadow 2 */
    SHADOWPCSS2: boolean;
    
    /** Use PCSS for shadow 3 */
    SHADOWPCSS3: boolean;
    
    /** Enable normals */
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
    
    /** Number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instancing */
    INSTANCES: boolean;
    
    /** Enable per-instance colors */
    INSTANCESCOLOR: boolean;
    
    /** Disable lighting (unlit mode) */
    UNLIT: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * Lava material for creating animated lava effects.
 * Uses noise textures and time-based animation to simulate flowing lava.
 * @see https://doc.babylonjs.com/extensions/Lava
 */
export declare class LavaMaterial extends PushMaterial {
    /**
     * Internal diffuse texture reference
     * @internal
     */
    _diffuseTexture: Nullable<BaseTexture>;
    
    /**
     * Diffuse texture for the lava surface
     */
    diffuseTexture: Nullable<BaseTexture>;
    
    /**
     * Noise texture used for lava animation
     */
    noiseTexture: Nullable<Texture>;
    
    /**
     * Color of the fog effect
     */
    fogColor: Color3;
    
    /**
     * Speed multiplier for the animation
     * @default 1.0
     */
    speed: number;
    
    /**
     * Speed of the lava movement
     * @default 1.0
     */
    movingSpeed: number;
    
    /**
     * Speed of low-frequency noise variations
     * @default 1.0
     */
    lowFrequencySpeed: number;
    
    /**
     * Density of the fog effect
     * @default 0.15
     */
    fogDensity: number;
    
    /**
     * Diffuse color of the material
     */
    diffuseColor: Color3;
    
    /**
     * Internal flag for disabling lighting
     * @internal
     */
    _disableLighting: boolean;
    
    /**
     * Disables lighting calculations
     */
    disableLighting: boolean;
    
    /**
     * Internal flag for unlit mode
     * @internal
     */
    _unlit: boolean;
    
    /**
     * Renders material without lighting
     */
    unlit: boolean;
    
    /**
     * Internal storage for maximum simultaneous lights
     * @internal
     */
    _maxSimultaneousLights: number;
    
    /**
     * Maximum number of lights that can affect this material simultaneously
     * @default 4
     */
    maxSimultaneousLights: number;
    
    /**
     * Internal scaled diffuse color
     * @internal
     */
    private _scaledDiffuse: Color3;
    
    /**
     * Internal time accumulator for animation
     * @internal
     */
    private _lastTime: number;
    
    /**
     * Creates a new lava material
     * @param name - Name of the material
     * @param scene - Scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Checks if the material needs alpha blending
     * @returns True if alpha blending is required
     */
    needAlphaBlending(): boolean;
    
    /**
     * Checks if the material needs alpha testing
     * @returns False, lava material doesn't use alpha testing
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the alpha test texture
     * @returns Always null for lava material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render a submesh
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to render
     * @param useInstances - True if using instancing
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds the material data to the submesh
     * @param world - World matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable properties
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Gets the list of active textures used by the material
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
     * Disposes the material and its resources
     * @param forceDisposeEffect - Force disposal of the effect
     * @param forceDisposeTextures - Force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): LavaMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;
    
    /**
     * Gets the class name of the material
     * @returns "LavaMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed lava material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): LavaMaterial;
}