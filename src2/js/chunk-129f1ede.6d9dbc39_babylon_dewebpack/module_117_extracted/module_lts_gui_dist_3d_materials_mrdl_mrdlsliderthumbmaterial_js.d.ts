import { Material, Scene, SubMesh, Mesh, BaseTexture, Color4, Vector2, Vector3, Vector4, Texture, Constants } from '@babylonjs/core';

/**
 * Material defines for MRDL Slider Thumb Material
 * Extends the base MaterialDefines to provide shader compilation flags
 */
export declare class MRDLSliderThumbMaterialDefines {
    /** Enable sky environment lighting */
    SKY_ENABLED: boolean;
    
    /** Enable secondary blob effect */
    BLOB_ENABLE_2: boolean;
    
    /** Enable iridescence effect */
    IRIDESCENCE_ENABLED: boolean;
    
    /** Indicates if fog effect is enabled */
    FOG?: boolean;
    
    /** Indicates if normal attributes are needed */
    NORMAL?: boolean;
    
    /** Indicates if primary UV coordinates are needed */
    UV1?: boolean;
    
    /** Indicates if secondary UV coordinates are needed */
    UV2?: boolean;
    
    /** Indicates if vertex colors are needed */
    VERTEXCOLOR?: boolean;
    
    /** Indicates if tangent attributes are needed */
    TANGENT?: boolean;
    
    /** Check if defines have changed and need recompilation */
    isDirty: boolean;
    
    /** Mark defines as processed */
    markAsProcessed(): void;
    
    /** Convert defines to shader string */
    toString(): string;
    
    /** Rebuild the defines */
    rebuild(): void;
}

/**
 * MRDL (Mixed Reality Design Language) Slider Thumb Material
 * A specialized material for rendering interactive slider thumb controls in mixed reality applications.
 * Supports advanced visual effects including bevel edges, gradients, reflections, proximity-based lighting,
 * and multi-blob interactions for enhanced user feedback.
 */
export declare class MRDLSliderThumbMaterial extends Material {
    /** URL to the default blue gradient texture used for rim and iridescence effects */
    static readonly BLUE_GRADIENT_TEXTURE_URL: string;
    
    // Geometry Properties
    
    /** Base radius of the slider thumb */
    radius: number;
    
    /** Front bevel amount */
    bevelFront: number;
    
    /** Front bevel stretch factor */
    bevelFrontStretch: number;
    
    /** Back bevel amount */
    bevelBack: number;
    
    /** Back bevel stretch factor */
    bevelBackStretch: number;
    
    /** Top-left corner radius multiplier */
    radiusTopLeft: number;
    
    /** Top-right corner radius multiplier */
    radiusTopRight: number;
    
    /** Bottom-left corner radius multiplier */
    radiusBottomLeft: number;
    
    /** Bottom-right corner radius multiplier */
    radiusBottomRight: number;
    
    /** Enable bulge deformation effect */
    bulgeEnabled: boolean;
    
    /** Height of the bulge effect */
    bulgeHeight: number;
    
    /** Radius of the bulge effect */
    bulgeRadius: number;
    
    // Lighting Properties
    
    /** Intensity of the directional sun light */
    sunIntensity: number;
    
    /** Theta angle of sun direction (polar angle) */
    sunTheta: number;
    
    /** Phi angle of sun direction (azimuthal angle) */
    sunPhi: number;
    
    /** Indirect diffuse lighting contribution */
    indirectDiffuse: number;
    
    // Material Properties
    
    /** Base albedo color with alpha */
    albedo: Color4;
    
    /** Specular reflection intensity */
    specular: number;
    
    /** Specular shininess/glossiness */
    shininess: number;
    
    /** Sharpness of specular highlights */
    sharpness: number;
    
    /** Subsurface scattering amount */
    subsurface: number;
    
    // Gradient Colors
    
    /** Left side gradient color */
    leftGradientColor: Color4;
    
    /** Right side gradient color */
    rightGradientColor: Color4;
    
    // Reflection Properties
    
    /** Overall reflection intensity */
    reflection: number;
    
    /** Front face reflection amount */
    frontReflect: number;
    
    /** Edge reflection amount */
    edgeReflect: number;
    
    /** Reflection power/falloff */
    power: number;
    
    /** Sky dome color for reflections */
    skyColor: Color4;
    
    /** Horizon color for reflections */
    horizonColor: Color4;
    
    /** Ground color for reflections */
    groundColor: Color4;
    
    /** Horizon blend power */
    horizonPower: number;
    
    // Edge Properties
    
    /** Width of edge effects */
    width: number;
    
    /** Fuzz/softness amount */
    fuzz: number;
    
    /** Minimum fuzz amount */
    minFuzz: number;
    
    /** Clip fade distance */
    clipFade: number;
    
    // Color Adjustment
    
    /** Hue shift adjustment */
    hueShift: number;
    
    /** Saturation shift adjustment */
    saturationShift: number;
    
    /** Value/brightness shift adjustment */
    valueShift: number;
    
    // Blob 1 (Primary interaction point)
    
    /** Position of the primary proximity blob in local space */
    blobPosition: Vector3;
    
    /** Intensity of the primary blob effect */
    blobIntensity: number;
    
    /** Size of blob when near */
    blobNearSize: number;
    
    /** Size of blob when far */
    blobFarSize: number;
    
    /** Distance threshold for near state */
    blobNearDistance: number;
    
    /** Distance threshold for far state */
    blobFarDistance: number;
    
    /** Fade transition length */
    blobFadeLength: number;
    
    /** Pulse animation amount */
    blobPulse: number;
    
    /** Overall blob fade multiplier */
    blobFade: number;
    
    /** Optional texture for blob appearance */
    blobTexture: Texture;
    
    // Blob 2 (Secondary interaction point)
    
    /** Position of the secondary proximity blob */
    blobPosition2: Vector3;
    
    /** Size of secondary blob when near */
    blobNearSize2: number;
    
    /** Pulse animation for secondary blob */
    blobPulse2: number;
    
    /** Fade multiplier for secondary blob */
    blobFade2: number;
    
    // Hand Tracking / Finger Positions
    
    /** Left index finger tip position (local space) */
    leftIndexPosition: Vector3;
    
    /** Right index finger tip position (local space) */
    rightIndexPosition: Vector3;
    
    /** Left index middle joint position */
    leftIndexMiddlePosition: Vector3;
    
    /** Right index middle joint position */
    rightIndexMiddlePosition: Vector3;
    
    // Decal Properties
    
    /** Scale of decal texture on X and Y axes */
    decalScaleXY: Vector2;
    
    /** Apply decal only to front face */
    decalFrontOnly: boolean;
    
    // Rim Light
    
    /** Rim light intensity */
    rimIntensity: number;
    
    /** Rim light hue shift */
    rimHueShift: number;
    
    /** Rim light saturation shift */
    rimSaturationShift: number;
    
    /** Rim light value shift */
    rimValueShift: number;
    
    // Iridescence
    
    /** Iridescence effect intensity */
    iridescenceIntensity: number;
    
    // Global Hand Tracking State
    
    /** Use global left index finger tracking (1 = enabled, 0 = disabled) */
    useGlobalLeftIndex: number;
    
    /** Use global right index finger tracking (1 = enabled, 0 = disabled) */
    useGlobalRightIndex: number;
    
    /** Proximity value for global left index finger (0-1) */
    globalLeftIndexTipProximity: number;
    
    /** Proximity value for global right index finger (0-1) */
    globalRightIndexTipProximity: number;
    
    /** Global left index finger tip position (world space) */
    globalLeftIndexTipPosition: Vector4;
    
    /** Global right index finger tip position (world space) */
    globaRightIndexTipPosition: Vector4;
    
    /** Global left thumb tip position (world space) */
    globalLeftThumbTipPosition: Vector4;
    
    /** Global right thumb tip position (world space) */
    globalRightThumbTipPosition: Vector4;
    
    /** Global left index middle joint position (world space) */
    globalLeftIndexMiddlePosition: Vector4;
    
    /** Global right index middle joint position (world space) */
    globalRightIndexMiddlePosition: Vector4;
    
    /**
     * Creates a new MRDLSliderThumbMaterial instance
     * @param name - Name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending
     * @returns Always returns false (opaque material)
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing
     * @returns Always returns false
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null
     */
    getAlphaTestTexture(): BaseTexture | null;
    
    /**
     * Checks if the material is ready to be rendered for a specific submesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     * @returns True if the material is ready, false otherwise
     */
    isReadyForSubMesh(mesh: Mesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds the material uniforms and textures for a specific submesh
     * @param world - World matrix of the mesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable textures in the material
     * @returns Array of animatable textures (empty for this material)
     */
    getAnimatables(): BaseTexture[];
    
    /**
     * Disposes the material and its resources
     * @param forceDisposeEffect - Force disposal of shader effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns A new instance with copied properties
     */
    clone(name: string): MRDLSliderThumbMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name of the material
     * @returns "MRDLSliderThumbMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Target scene
     * @param rootUrl - Root URL for loading textures
     * @returns Parsed material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLSliderThumbMaterial;
}