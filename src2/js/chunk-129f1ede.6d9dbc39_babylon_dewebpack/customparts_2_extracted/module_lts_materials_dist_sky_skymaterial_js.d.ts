import type { Scene } from '@babylonjs/core/scene';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { Matrix } from '@babylonjs/core/Maths/math.vector';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import type { Nullable } from '@babylonjs/core/types';
import type { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { Vector3, Quaternion } from '@babylonjs/core/Maths/math.vector';

/**
 * Sky material defines for shader compilation
 * Controls which shader features are enabled
 */
export declare class SkyMaterialDefines extends MaterialDefines {
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
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog rendering */
    FOG: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    /** Enable dithering */
    DITHER: boolean;

    constructor();
}

/**
 * Sky material for rendering realistic atmospheric sky effects
 * Implements physically-based sky rendering with Rayleigh and Mie scattering
 * 
 * @see https://doc.babylonjs.com/extensions/sky
 */
export declare class SkyMaterial extends PushMaterial {
    /**
     * Luminosity of the sky (brightness multiplier)
     * @default 1.0
     */
    luminance: number;

    /**
     * Atmospheric turbidity (haziness)
     * Higher values create hazier/milkier sky appearance
     * @default 10.0
     */
    turbidity: number;

    /**
     * Rayleigh scattering coefficient
     * Controls blue wavelength scattering intensity
     * @default 2.0
     */
    rayleigh: number;

    /**
     * Mie scattering coefficient
     * Controls larger particle scattering (dust, water vapor)
     * @default 0.005
     */
    mieCoefficient: number;

    /**
     * Mie scattering directional factor (anisotropy)
     * Controls sun glow intensity and size
     * Range: -1.0 to 1.0
     * @default 0.8
     */
    mieDirectionalG: number;

    /**
     * Distance from camera to sky sphere
     * @default 500.0
     */
    distance: number;

    /**
     * Sun inclination angle (elevation)
     * Range: 0.0 (horizon) to 1.0 (zenith)
     * Only used when useSunPosition is false
     * @default 0.49
     */
    inclination: number;

    /**
     * Sun azimuth angle (horizontal rotation)
     * Range: 0.0 to 1.0 (maps to 0 to 2π radians)
     * Only used when useSunPosition is false
     * @default 0.25
     */
    azimuth: number;

    /**
     * Direct sun position in world space
     * Used when useSunPosition is true
     * @default Vector3(0, 100, 0)
     */
    sunPosition: Vector3;

    /**
     * Whether to use direct sunPosition or calculate from inclination/azimuth
     * @default false
     */
    useSunPosition: boolean;

    /**
     * Camera offset for sky rendering
     * Shifts sky position relative to camera
     * @default Vector3.Zero()
     */
    cameraOffset: Vector3;

    /**
     * Up direction vector for sky orientation
     * @default Vector3.Up()
     */
    up: Vector3;

    /**
     * Enable dithering to reduce color banding artifacts
     * @default false
     */
    dithering: boolean;

    /** @internal Camera position cache */
    private _cameraPosition: Vector3;

    /** @internal Sky orientation quaternion for sun position calculation */
    private _skyOrientation: Quaternion;

    /**
     * Creates a new sky material instance
     * @param name - Material name identifier
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Checks if the material requires alpha blending
     * @returns True if alpha is less than 1.0
     */
    needAlphaBlending(): boolean;

    /**
     * Checks if the material requires alpha testing
     * @returns Always returns false for sky material
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null for sky material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to render for a specific submesh
     * Compiles shader if necessary with required defines
     * @param mesh - Mesh to render
     * @param subMesh - Submesh to check readiness for
     * @param useInstances - Whether instanced rendering is used
     * @returns True if material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds material parameters to the effect for rendering a submesh
     * Updates shader uniforms with current material properties
     * @param world - World matrix of the mesh
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Gets list of animatable properties in the material
     * @returns Empty array (sky material has no animatable textures)
     */
    getAnimatables(): IAnimatable[];

    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - Force dispose shader effects
     * @param forceDisposeTextures - Force dispose textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

    /**
     * Clones the material to a new instance
     * @param name - Name for the cloned material
     * @returns Cloned sky material instance
     */
    clone(name: string): SkyMaterial;

    /**
     * Serializes the material to JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Gets the class name of the material
     * @returns "SkyMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized sky material from JSON
     * @param source - Serialized material data
     * @param scene - Scene to create material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed sky material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): SkyMaterial;
}