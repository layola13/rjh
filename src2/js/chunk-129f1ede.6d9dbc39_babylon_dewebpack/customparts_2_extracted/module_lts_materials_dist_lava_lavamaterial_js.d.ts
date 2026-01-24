import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Texture } from "core/Materials/Textures/texture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { Effect } from "core/Materials/effect";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import { PushMaterial } from "core/Materials/pushMaterial";
import { MaterialDefines } from "core/Materials/materialDefines";
import type { Scene } from "core/scene";

/**
 * Defines for LavaMaterial shader compilation
 * Controls which features and effects are enabled in the lava material
 */
export declare class LavaMaterialDefines extends MaterialDefines {
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
    /** Enable fog calculations */
    FOG: boolean;
    
    /** Enable light source 0 */
    LIGHT0: boolean;
    /** Enable light source 1 */
    LIGHT1: boolean;
    /** Enable light source 2 */
    LIGHT2: boolean;
    /** Enable light source 3 */
    LIGHT3: boolean;
    
    /** Light 0 is a spotlight */
    SPOTLIGHT0: boolean;
    /** Light 1 is a spotlight */
    SPOTLIGHT1: boolean;
    /** Light 2 is a spotlight */
    SPOTLIGHT2: boolean;
    /** Light 3 is a spotlight */
    SPOTLIGHT3: boolean;
    
    /** Light 0 is a hemispheric light */
    HEMILIGHT0: boolean;
    /** Light 1 is a hemispheric light */
    HEMILIGHT1: boolean;
    /** Light 2 is a hemispheric light */
    HEMILIGHT2: boolean;
    /** Light 3 is a hemispheric light */
    HEMILIGHT3: boolean;
    
    /** Light 0 is a directional light */
    DIRLIGHT0: boolean;
    /** Light 1 is a directional light */
    DIRLIGHT1: boolean;
    /** Light 2 is a directional light */
    DIRLIGHT2: boolean;
    /** Light 3 is a directional light */
    DIRLIGHT3: boolean;
    
    /** Light 0 is a point light */
    POINTLIGHT0: boolean;
    /** Light 1 is a point light */
    POINTLIGHT1: boolean;
    /** Light 2 is a point light */
    POINTLIGHT2: boolean;
    /** Light 3 is a point light */
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
    
    /** Use ESM shadow map for light 0 */
    SHADOWESM0: boolean;
    /** Use ESM shadow map for light 1 */
    SHADOWESM1: boolean;
    /** Use ESM shadow map for light 2 */
    SHADOWESM2: boolean;
    /** Use ESM shadow map for light 3 */
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
    
    /** Use PCSS filtering for shadow 0 */
    SHADOWPCSS0: boolean;
    /** Use PCSS filtering for shadow 1 */
    SHADOWPCSS1: boolean;
    /** Use PCSS filtering for shadow 2 */
    SHADOWPCSS2: boolean;
    /** Use PCSS filtering for shadow 3 */
    SHADOWPCSS3: boolean;
    
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
    /** Maximum bones per mesh */
    BonesPerMesh: number;
    
    /** Enable hardware instancing */
    INSTANCES: boolean;
    /** Enable per-instance colors */
    INSTANCESCOLOR: boolean;
    
    /** Disable lighting calculations (unlit mode) */
    UNLIT: boolean;
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * Animated lava material for Babylon.js
 * Creates a dynamic flowing lava effect with customizable speed, fog, and texturing
 */
export declare class LavaMaterial extends PushMaterial {
    /**
     * Diffuse texture applied to the lava surface
     */
    diffuseTexture: Nullable<Texture>;
    
    /**
     * Noise texture used for lava distortion and animation
     */
    noiseTexture: Nullable<Texture>;
    
    /**
     * Color of the fog effect overlaying the lava
     */
    fogColor: Nullable<Color3>;
    
    /**
     * Overall animation speed multiplier
     * @default 1
     */
    speed: number;
    
    /**
     * Speed of the lava flow movement
     * @default 1
     */
    movingSpeed: number;
    
    /**
     * Speed of low-frequency distortion waves
     * @default 1
     */
    lowFrequencySpeed: number;
    
    /**
     * Density of the fog effect (higher = denser fog)
     * @default 0.15
     */
    fogDensity: number;
    
    /**
     * Base diffuse color of the lava material
     * @default Color3(1, 1, 1) - white
     */
    diffuseColor: Color3;
    
    /**
     * Disables lighting calculations when true (material becomes unaffected by scene lights)
     * @default false
     */
    disableLighting: boolean;
    
    /**
     * Makes the material unlit (emissive only, no light interaction)
     * @default false
     */
    unlit: boolean;
    
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
     * Internal flag for disabling lighting
     * @internal
     */
    private _disableLighting;
    
    /**
     * Internal flag for unlit mode
     * @internal
     */
    private _unlit;
    
    /**
     * Internal maximum lights storage
     * @internal
     */
    private _maxSimultaneousLights;
    
    /**
     * Scaled diffuse color (internal calculation cache)
     * @internal
     */
    private _scaledDiffuse;
    
    /**
     * Accumulated time for animation
     * @internal
     */
    private _lastTime;
    
    /**
     * Creates a new LavaMaterial instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending
     * @returns true if alpha is less than 1
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing
     * @returns always false for lava material
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns always null for lava material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to check
     * @param useInstances - Whether hardware instancing is used
     * @returns true if material is ready, false otherwise
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds the material data to the effect for rendering a submesh
     * @param world - World matrix of the mesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable textures in the material
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
     * @param texture - Texture to check
     * @returns true if texture is used
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
     * @returns Cloned LavaMaterial instance
     */
    clone(name: string): LavaMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name of the material
     * @returns "LavaMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized LavaMaterial from JSON
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed LavaMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): LavaMaterial;
}