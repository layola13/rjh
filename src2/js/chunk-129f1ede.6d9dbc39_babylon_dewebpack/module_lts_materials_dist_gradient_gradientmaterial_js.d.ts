import type { Nullable } from '@babylonjs/core/types';
import type { Matrix } from '@babylonjs/core/Maths/math.vector';
import type { Color3 } from '@babylonjs/core/Maths/math.color';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import type { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import type { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Scene } from '@babylonjs/core/scene';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';

/**
 * Material defines for gradient material
 * Controls various rendering features and compilation flags
 */
declare class GradientMaterialDefines extends MaterialDefines {
    /** Enable emissive lighting */
    EMISSIVE: boolean;
    
    /** Enable first clip plane */
    CLIPPLANE: boolean;
    
    /** Enable second clip plane */
    CLIPPLANE2: boolean;
    
    /** Enable third clip plane */
    CLIPPLANE3: boolean;
    
    /** Enable fourth clip plane */
    CLIPPLANE4: boolean;
    
    /** Enable fifth clip plane */
    CLIPPLANE5: boolean;
    
    /** Enable sixth clip plane */
    CLIPPLANE6: boolean;
    
    /** Enable alpha testing */
    ALPHATEST: boolean;
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog rendering */
    FOG: boolean;
    
    /** Enable normal vertex attribute */
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
    
    /** Enable instanced rendering */
    INSTANCES: boolean;
    
    /** Enable per-instance color */
    INSTANCESCOLOR: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Gradient material for rendering smooth color gradients
 * Creates a vertical gradient between two colors with customizable blending
 */
export declare class GradientMaterial extends PushMaterial {
    /**
     * Maximum number of simultaneous lights affecting this material
     * @internal
     */
    private _maxSimultaneousLights: number;
    
    /**
     * Gets or sets the maximum number of lights that can affect this material simultaneously
     */
    maxSimultaneousLights: number;
    
    /**
     * Color at the top of the gradient
     */
    topColor: Color3;
    
    /**
     * Alpha transparency of the top color (0 = fully transparent, 1 = fully opaque)
     */
    topColorAlpha: number;
    
    /**
     * Color at the bottom of the gradient
     */
    bottomColor: Color3;
    
    /**
     * Alpha transparency of the bottom color (0 = fully transparent, 1 = fully opaque)
     */
    bottomColorAlpha: number;
    
    /**
     * Vertical offset of the gradient center
     */
    offset: number;
    
    /**
     * Scale factor for the gradient distribution
     */
    scale: number;
    
    /**
     * Smoothness of the gradient transition (higher = smoother)
     */
    smoothness: number;
    
    /**
     * Whether lighting calculations are disabled
     * @internal
     */
    private _disableLighting: boolean;
    
    /**
     * Gets or sets whether lighting is disabled for this material
     */
    disableLighting: boolean;

    /**
     * Creates a new gradient material instance
     * @param name - Name of the material
     * @param scene - Scene the material belongs to
     */
    constructor(name: string, scene: Scene);

    /**
     * Determines if the material requires alpha blending
     * @returns True if any alpha value is less than 1
     */
    needAlphaBlending(): boolean;

    /**
     * Determines if the material requires alpha testing
     * @returns Always returns true
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null (no alpha test texture)
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - Mesh to render
     * @param subMesh - Submesh to check readiness for
     * @param useInstances - Whether instanced rendering is used
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds material data to the effect for rendering a submesh
     * @param world - World matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Gets the list of animatable properties in the material
     * @returns Empty array (no animatable properties)
     */
    getAnimatables(): IAnimatable[];

    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - Whether to force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;

    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned gradient material instance
     */
    clone(name: string): GradientMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Gets the class name of the material
     * @returns "GradientMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized gradient material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed gradient material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): GradientMaterial;
}