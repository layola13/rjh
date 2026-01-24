import { Color4, Vector2, Vector3, Vector4 } from '@babylonjs/core/Maths/math.color';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Nullable } from '@babylonjs/core/types';

/**
 * Material defines for MRDL Slider Thumb Material
 * Extends MaterialDefines to include shader feature flags
 */
export declare class MRDLSliderThumbMaterialDefines extends MaterialDefines {
    /** Enable sky environment lighting */
    SKY_ENABLED: boolean;
    
    /** Enable secondary blob effect */
    BLOB_ENABLE_2: boolean;
    
    /** Enable iridescence effect */
    IRIDESCENCE_ENABLED: boolean;
    
    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Slider Thumb Material
 * 
 * A specialized material for rendering interactive slider thumb controls in mixed reality applications.
 * Supports advanced visual effects including:
 * - Rounded corners with customizable radii
 * - Bevel edges (front and back)
 * - Environmental reflections and lighting
 * - Proximity-based blob effects for finger tracking
 * - Gradient coloring
 * - Rim lighting and iridescence
 * - Decal textures
 * 
 * @see https://docs.microsoft.com/windows/mixed-reality/mrtk-unity/
 */
export declare class MRDLSliderThumbMaterial extends PushMaterial {
    /** URL for the default blue gradient texture used in rim and iridescence effects */
    static readonly BLUE_GRADIENT_TEXTURE_URL: string;
    
    // Geometry Properties
    
    /** Base radius of the slider thumb geometry */
    radius: number;
    
    /** Front bevel depth */
    bevelFront: number;
    
    /** Front bevel stretch factor */
    bevelFrontStretch: number;
    
    /** Back bevel depth */
    bevelBack: number;
    
    /** Back bevel stretch factor */
    bevelBackStretch: number;
    
    /** Radius multiplier for top-left corner */
    radiusTopLeft: number;
    
    /** Radius multiplier for top-right corner */
    radiusTopRight: number;
    
    /** Radius multiplier for bottom-left corner */
    radiusBottomLeft: number;
    
    /** Radius multiplier for bottom-right corner */
    radiusBottomRight: number;
    
    // Bulge Effect
    
    /** Enable/disable bulge effect */
    bulgeEnabled: boolean;
    
    /** Height of the bulge effect */
    bulgeHeight: number;
    
    /** Radius of the bulge effect */
    bulgeRadius: number;
    
    // Lighting Properties
    
    /** Intensity of the directional sun light */
    sunIntensity: number;
    
    /** Theta angle (polar) of sun direction */
    sunTheta: number;
    
    /** Phi angle (azimuthal) of sun direction */
    sunPhi: number;
    
    /** Indirect diffuse lighting intensity */
    indirectDiffuse: number;
    
    // Material Surface Properties
    
    /** Base albedo color with alpha */
    albedo: Color4;
    
    /** Specular reflection intensity */
    specular: number;
    
    /** Specular shininess exponent */
    shininess: number;
    
    /** Sharpness of surface features */
    sharpness: number;
    
    /** Subsurface scattering amount */
    subsurface: number;
    
    // Gradient Colors
    
    /** Color for left side of gradient */
    leftGradientColor: Color4;
    
    /** Color for right side of gradient */
    rightGradientColor: Color4;
    
    // Reflection Properties
    
    /** Overall reflection intensity */
    reflection: number;
    
    /** Reflection intensity on front faces */
    frontReflect: number;
    
    /** Reflection intensity on edge faces */
    edgeReflect: number;
    
    /** Power factor for reflection falloff */
    power: number;
    
    // Environment Colors
    
    /** Sky color for environment reflection */
    skyColor: Color4;
    
    /** Horizon color for environment reflection */
    horizonColor: Color4;
    
    /** Ground color for environment reflection */
    groundColor: Color4;
    
    /** Power factor for horizon gradient */
    horizonPower: number;
    
    // Edge Properties
    
    /** Width of the edge effect */
    width: number;
    
    /** Fuzziness of edges */
    fuzz: number;
    
    /** Minimum fuzziness value */
    minFuzz: number;
    
    /** Fade distance for clipping */
    clipFade: number;
    
    // Color Adjustment
    
    /** Hue shift amount (-1 to 1) */
    hueShift: number;
    
    /** Saturation shift amount */
    saturationShift: number;
    
    /** Value/brightness shift amount */
    valueShift: number;
    
    // Blob Effect 1 (Primary proximity indicator)
    
    /** 3D position of the first blob effect */
    blobPosition: Vector3;
    
    /** Intensity of the first blob */
    blobIntensity: number;
    
    /** Size of blob when near */
    blobNearSize: number;
    
    /** Size of blob when far */
    blobFarSize: number;
    
    /** Distance threshold for "near" */
    blobNearDistance: number;
    
    /** Distance threshold for "far" */
    blobFarDistance: number;
    
    /** Fade transition length */
    blobFadeLength: number;
    
    /** Pulse animation amount */
    blobPulse: number;
    
    /** Overall fade amount */
    blobFade: number;
    
    /** Texture for blob appearance */
    blobTexture: Texture;
    
    // Blob Effect 2 (Secondary proximity indicator)
    
    /** 3D position of the second blob effect */
    blobPosition2: Vector3;
    
    /** Size of second blob when near */
    blobNearSize2: number;
    
    /** Pulse animation amount for second blob */
    blobPulse2: number;
    
    /** Overall fade amount for second blob */
    blobFade2: number;
    
    // Hand Tracking Positions (Local)
    
    /** Position of left index finger tip */
    leftIndexPosition: Vector3;
    
    /** Position of right index finger tip */
    rightIndexPosition: Vector3;
    
    /** Position of left index finger middle joint */
    leftIndexMiddlePosition: Vector3;
    
    /** Position of right index finger middle joint */
    rightIndexMiddlePosition: Vector3;
    
    // Decal Properties
    
    /** XY scale of the decal texture */
    decalScaleXY: Vector2;
    
    /** Whether decal appears only on front face */
    decalFrontOnly: boolean;
    
    // Rim Lighting
    
    /** Intensity of rim lighting effect */
    rimIntensity: number;
    
    /** Hue shift for rim light color */
    rimHueShift: number;
    
    /** Saturation shift for rim light color */
    rimSaturationShift: number;
    
    /** Value shift for rim light color */
    rimValueShift: number;
    
    // Iridescence
    
    /** Intensity of iridescence effect */
    iridescenceIntensity: number;
    
    // Global Hand Tracking (for multi-user scenarios)
    
    /** Use global left index finger tracking (1 = true, 0 = false) */
    useGlobalLeftIndex: number;
    
    /** Use global right index finger tracking (1 = true, 0 = false) */
    useGlobalRightIndex: number;
    
    /** Proximity value for global left index tip */
    globalLeftIndexTipProximity: number;
    
    /** Proximity value for global right index tip */
    globalRightIndexTipProximity: number;
    
    /** Global position of left index finger tip (homogeneous coordinates) */
    globalLeftIndexTipPosition: Vector4;
    
    /** Global position of right index finger tip (homogeneous coordinates) */
    globaRightIndexTipPosition: Vector4;
    
    /** Global position of left thumb tip (homogeneous coordinates) */
    globalLeftThumbTipPosition: Vector4;
    
    /** Global position of right thumb tip (homogeneous coordinates) */
    globalRightThumbTipPosition: Vector4;
    
    /** Global position of left index finger middle joint (homogeneous coordinates) */
    globalLeftIndexMiddlePosition: Vector4;
    
    /** Global position of right index finger middle joint (homogeneous coordinates) */
    globalRightIndexMiddlePosition: Vector4;
    
    // Private Textures
    
    /** @internal Blue gradient texture for rim and iridescence effects */
    private _blueGradientTexture: Texture;
    
    /** @internal Decal texture overlay */
    private _decalTexture: Texture;
    
    /** @internal Reflection map texture for environment */
    private _reflectionMapTexture: Texture;
    
    /** @internal Indirect environment texture */
    private _indirectEnvTexture: Texture;
    
    /**
     * Creates a new MRDL Slider Thumb Material instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Specifies whether this material requires alpha blending
     * @returns Always false - this material doesn't use alpha blending
     */
    needAlphaBlending(): boolean;
    
    /**
     * Specifies whether this material requires alpha testing
     * @returns Always false - this material doesn't use alpha testing
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always null - this material doesn't use alpha testing
     */
    getAlphaTestTexture(): Nullable<Texture>;
    
    /**
     * Checks if the material is ready to render for a specific mesh and submesh
     * @param mesh - The mesh to check
     * @param subMesh - The submesh to check
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds the material uniforms and textures for rendering a specific submesh
     * @param world - World transformation matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable properties in the material
     * @returns Array of animatable objects (currently empty)
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Disposes of the material and its resources
     * @param forceDisposeEffect - Whether to force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Creates a clone of this material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): MRDLSliderThumbMaterial;
    
    /**
     * Serializes this material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;
    
    /**
     * Gets the class name of this material
     * @returns "MRDLSliderThumbMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material from JSON
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading textures
     * @returns Parsed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLSliderThumbMaterial;
}