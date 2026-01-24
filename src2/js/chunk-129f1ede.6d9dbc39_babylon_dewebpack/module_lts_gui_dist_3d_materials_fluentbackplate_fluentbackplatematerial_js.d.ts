import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { Scene } from '@babylonjs/core/scene';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Matrix } from '@babylonjs/core/Maths/math.vector';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Nullable } from '@babylonjs/core/types';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';

/**
 * Material defines for FluentBackplate shader
 * Controls shader compilation flags and features
 */
export declare class FluentBackplateMaterialDefines extends MaterialDefines {
    /** Enable primary blob effect */
    BLOB_ENABLE: boolean;
    
    /** Enable secondary blob effect */
    BLOB_ENABLE_2: boolean;
    
    /** Enable smooth edge rendering */
    SMOOTH_EDGES: boolean;
    
    /** Enable iridescent map texture */
    IRIDESCENT_MAP_ENABLE: boolean;
    
    constructor();
}

/**
 * Fluent Design Backplate Material
 * 
 * Implements Microsoft Fluent Design System backplate material with features:
 * - Rounded corners with configurable radius
 * - Border lines with customizable width and color
 * - Interactive blob effects for proximity feedback
 * - Iridescent highlights
 * - Smooth edge anti-aliasing
 * 
 * @see https://docs.microsoft.com/en-us/windows/apps/design/signature-experiences/geometry
 */
export declare class FluentBackplateMaterial extends PushMaterial {
    /** Default URL for blob texture */
    static readonly BLOB_TEXTURE_URL: string;
    
    /** Default URL for iridescent map texture */
    static readonly IM_TEXTURE_URL: string;

    // ===== Shape Properties =====
    
    /** Corner radius for rounded rectangle (default: 0.03) */
    radius: number;
    
    /** Width of the border line (default: 0.01) */
    lineWidth: number;
    
    /** Whether sizes are in absolute units or relative (default: false) */
    absoluteSizes: boolean;

    // ===== Color Properties =====
    
    /** Base fill color of the backplate (default: dark blue) */
    baseColor: Color4;
    
    /** Border line color (default: blue) */
    lineColor: Color4;
    
    /** Highlight accent color (default: white) */
    highlightColor: Color4;

    // ===== Primary Blob Effect =====
    
    /** Intensity of the primary blob effect (default: 0.98) */
    blobIntensity: number;
    
    /** Size of blob when near (default: 0.22) */
    blobNearSize: number;
    
    /** Size of blob when far (default: 0.04) */
    blobFarSize: number;
    
    /** Distance threshold for near blob (default: 0) */
    blobNearDistance: number;
    
    /** Distance threshold for far blob (default: 0.08) */
    blobFarDistance: number;
    
    /** Fade transition length (default: 0.08) */
    blobFadeLength: number;
    
    /** Pulse animation value for blob (default: 0) */
    blobPulse: number;
    
    /** Fade animation value for blob (default: 0) */
    blobFade: number;

    // ===== Secondary Blob Effect =====
    
    /** Size of secondary blob when near (default: 0.22) */
    blobNearSize2: number;
    
    /** Pulse animation value for secondary blob (default: 0) */
    blobPulse2: number;
    
    /** Fade animation value for secondary blob (default: 0) */
    blobFade2: number;

    // ===== Highlight Properties =====
    
    /** Width of the highlight effect (default: 0.25) */
    highlightWidth: number;

    // ===== Iridescence Properties =====
    
    /** Overall iridescence intensity (default: 0) */
    iridescenceIntensity: number;
    
    /** Edge-specific iridescence intensity (default: 1) */
    iridescenceEdgeIntensity: number;

    // ===== Fade Properties =====
    
    /** Fade out amount for edges (default: 1) */
    fadeOut: number;

    // ===== Interaction Tracking =====
    
    /** Global position of left index finger tip for proximity effects */
    globalLeftIndexTipPosition: Vector3;
    
    /** Global position of right index finger tip for proximity effects */
    globalRightIndexTipPosition: Vector3;

    /**
     * Creates a new FluentBackplateMaterial instance
     * 
     * @param name - Material name
     * @param scene - Scene the material belongs to
     */
    constructor(name: string, scene: Scene);

    /**
     * Checks if the material needs alpha blending
     * @returns Always false - backplate is opaque
     */
    needAlphaBlending(): boolean;

    /**
     * Checks if the material needs alpha testing
     * @returns Always false - no alpha testing required
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always null - no alpha testing
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if material is ready to render for a specific submesh
     * 
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     * @returns True if shader is compiled and ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;

    /**
     * Binds material data to shader uniforms for rendering
     * 
     * @param world - World transformation matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;

    /**
     * Gets list of animatable properties
     * @returns Empty array - no animated textures
     */
    getAnimatables(): IAnimatable[];

    /**
     * Disposes of material resources
     * @param forceDisposeEffect - Whether to force dispose the effect
     */
    dispose(forceDisposeEffect?: boolean): void;

    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): FluentBackplateMaterial;

    /**
     * Serializes material to JSON
     * @returns Serialized material data
     */
    serialize(): any;

    /**
     * Gets the class name
     * @returns "FluentBackplateMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material
     * 
     * @param source - Serialized material data
     * @param scene - Scene to create material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): FluentBackplateMaterial;
}