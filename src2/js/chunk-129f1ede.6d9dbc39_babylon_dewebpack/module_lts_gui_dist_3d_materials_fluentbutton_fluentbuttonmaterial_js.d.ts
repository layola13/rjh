import { Scene } from '@babylonjs/core/scene';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Nullable } from '@babylonjs/core/types';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

/**
 * Material defines for the FluentButton material
 * Controls shader compilation flags and feature toggles
 */
export declare class FluentButtonMaterialDefines extends MaterialDefines {
    /** Indicates if relative width calculations should be used */
    RELATIVE_WIDTH: boolean;
    
    /** Enables fade effect on the button */
    ENABLE_FADE: boolean;
    
    constructor();
}

/**
 * Material for rendering Fluent Design styled 3D buttons
 * Implements proximity-based interactions, selection states, and animated "blob" effects
 * commonly used in Mixed Reality Toolkit (MRTK) interfaces
 */
export declare class FluentButtonMaterial extends PushMaterial {
    /** Default URL for the blob texture used in hover effects */
    static readonly BLOB_TEXTURE_URL: string;
    
    // Edge Properties
    /** Width of the button edge/border in world units */
    edgeWidth: number;
    
    /** Color of the button edge including alpha transparency */
    edgeColor: Color4;
    
    // Proximity Effects
    /** Maximum intensity of the proximity highlight effect (0-1) */
    proximityMaxIntensity: number;
    
    /** Distance at which proximity effects begin to fade out */
    proximityFarDistance: number;
    
    /** Radius around the interaction point where proximity effects are strongest */
    proximityNearRadius: number;
    
    /** Anisotropy factor for directional proximity stretching */
    proximityAnisotropy: number;
    
    // Selection State
    /** Fuzziness/softness of the selection edge transition */
    selectionFuzz: number;
    
    /** Current selection state (0 = not selected, 1 = fully selected) */
    selected: number;
    
    /** Animation fade value for selection state transitions */
    selectionFade: number;
    
    /** Size of the selection fade effect area */
    selectionFadeSize: number;
    
    /** Distance threshold for selection proximity detection */
    selectedDistance: number;
    
    /** Length over which selection effect fades in/out */
    selectedFadeLength: number;
    
    // Shared Blob Properties
    /** Intensity/brightness of blob effects (0-1) */
    blobIntensity: number;
    
    /** Size of blobs when far from the button surface */
    blobFarSize: number;
    
    /** Distance at which blob reaches minimum size */
    blobNearDistance: number;
    
    /** Distance at which blob reaches maximum size */
    blobFarDistance: number;
    
    /** Length over which blob size transitions between near and far */
    blobFadeLength: number;
    
    // Left Blob (typically left hand index finger)
    /** Enables/disables the left blob effect */
    leftBlobEnable: boolean;
    
    /** Size of the left blob when near the button */
    leftBlobNearSize: number;
    
    /** Pulse animation value for the left blob (0-1) */
    leftBlobPulse: number;
    
    /** Overall fade/visibility of the left blob (0-1) */
    leftBlobFade: number;
    
    /** Inner fade radius for soft blob edges */
    leftBlobInnerFade: number;
    
    // Right Blob (typically right hand index finger)
    /** Enables/disables the right blob effect */
    rightBlobEnable: boolean;
    
    /** Size of the right blob when near the button */
    rightBlobNearSize: number;
    
    /** Pulse animation value for the right blob (0-1) */
    rightBlobPulse: number;
    
    /** Overall fade/visibility of the right blob (0-1) */
    rightBlobFade: number;
    
    /** Inner fade radius for soft blob edges */
    rightBlobInnerFade: number;
    
    // Active Face Properties
    /** Direction vector defining which face of the button is "active" (front-facing) */
    activeFaceDir: Vector3;
    
    /** Up vector for the active face orientation */
    activeFaceUp: Vector3;
    
    /** Enables fade effect based on viewing angle */
    enableFade: boolean;
    
    /** Width/extent of the viewing angle fade effect */
    fadeWidth: number;
    
    /** Smooths the transition between active and inactive faces */
    smoothActiveFace: boolean;
    
    /** Shows a debug frame around the button */
    showFrame: boolean;
    
    /** Uses texture for blob rendering instead of procedural generation */
    useBlobTexture: boolean;
    
    // Global Hand Tracking Positions
    /** World-space position of the left hand index finger tip */
    globalLeftIndexTipPosition: Vector3;
    
    /** World-space position of the right hand index finger tip */
    globalRightIndexTipPosition: Vector3;
    
    /** Internal texture reference for blob rendering */
    private _blobTexture: Texture;
    
    /**
     * Creates a new FluentButtonMaterial instance
     * @param name - Name identifier for the material
     * @param scene - Scene to which this material belongs
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if alpha blending is required for this material
     * @returns Always true for fluent buttons to support transparency effects
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if alpha testing is required for this material
     * @returns Always true for proper edge rendering
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always null as alpha testing uses procedural calculations
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render for a specific submesh
     * Handles shader compilation and uniform setup
     * @param mesh - Mesh being rendered
     * @param subMesh - SubMesh being rendered
     * @param useInstances - Whether instanced rendering is used
     * @returns True if material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds material data to the shader for rendering a submesh
     * Sets all uniforms and textures required by the shader
     * @param world - World transformation matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - SubMesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable properties in this material
     * @returns Empty array as this material doesn't expose animatables
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Disposes of the material and releases GPU resources
     * @param forceDisposeEffect - If true, forces disposal of shader effect even if shared
     * @param forceDisposeTextures - If true, forces disposal of all textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Creates a copy of this material
     * @param name - Name for the cloned material
     * @returns New FluentButtonMaterial instance with copied properties
     */
    clone(name: string): FluentButtonMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name of this material
     * @returns "FluentButtonMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material from JSON
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading external resources
     * @returns Newly created FluentButtonMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): FluentButtonMaterial;
}