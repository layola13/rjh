import {
  MaterialDefines,
  PushMaterial,
  Scene,
  Mesh,
  SubMesh,
  Matrix,
  Color4,
  Vector2,
  Vector3,
  Vector4,
  Texture,
  BaseTexture,
  Nullable,
  AbstractMesh,
  IAnimatable,
  SerializationHelper,
  MaterialHelper,
  EffectFallbacks,
  VertexBuffer,
  Constants,
  Effect,
} from '@babylonjs/core';

/**
 * Material defines for MRDL Slider Bar Material
 * Extends the base MaterialDefines with specific shader features
 */
export declare class MRDLSliderBarMaterialDefines extends MaterialDefines {
  /** Enable sky-based environment lighting */
  SKY_ENABLED: boolean;
  
  /** Enable secondary blob effect */
  BLOB_ENABLE_2: boolean;
  
  /** Enable iridescence effect */
  IRIDESCENCE_ENABLED: boolean;

  constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Slider Bar Material
 * A specialized material for rendering interactive slider bars in mixed reality experiences.
 * Supports advanced visual effects including proximity-based interactions, gradients, 
 * reflections, and dynamic lighting.
 * 
 * @see https://docs.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/
 */
export declare class MRDLSliderBarMaterial extends PushMaterial {
  /** Default URL for the blue gradient texture used in rim and iridescence effects */
  static readonly BLUE_GRADIENT_TEXTURE_URL: string;

  // === Geometry Parameters ===
  
  /** Base radius of the slider bar geometry (default: 0.6) */
  radius: number;
  
  /** Front bevel depth (default: 0.6) */
  bevelFront: number;
  
  /** Front bevel stretch factor (default: 0.077) */
  bevelFrontStretch: number;
  
  /** Back bevel depth (default: 0) */
  bevelBack: number;
  
  /** Back bevel stretch factor (default: 0) */
  bevelBackStretch: number;
  
  /** Radius for top-left corner (default: 1) */
  radiusTopLeft: number;
  
  /** Radius for top-right corner (default: 1) */
  radiusTopRight: number;
  
  /** Radius for bottom-left corner (default: 1) */
  radiusBottomLeft: number;
  
  /** Radius for bottom-right corner (default: 1) */
  radiusBottomRight: number;

  // === Bulge Effect ===
  
  /** Enable bulge deformation effect (default: false) */
  bulgeEnabled: boolean;
  
  /** Height of the bulge effect (default: -0.323) */
  bulgeHeight: number;
  
  /** Radius of the bulge effect (default: 0.73) */
  bulgeRadius: number;

  // === Lighting Parameters ===
  
  /** Intensity of the directional sun light (default: 1.102) */
  sunIntensity: number;
  
  /** Polar angle (theta) of sun direction in radians (default: 0.76) */
  sunTheta: number;
  
  /** Azimuthal angle (phi) of sun direction in radians (default: 0.526) */
  sunPhi: number;
  
  /** Intensity of indirect diffuse lighting (default: 0.658) */
  indirectDiffuse: number;

  // === Material Properties ===
  
  /** Base albedo color (default: cyan blue) */
  albedo: Color4;
  
  /** Specular reflection intensity (default: 0) */
  specular: number;
  
  /** Shininess/glossiness factor (default: 10) */
  shininess: number;
  
  /** Sharpness of specular highlights (default: 0) */
  sharpness: number;
  
  /** Subsurface scattering amount (default: 0) */
  subsurface: number;

  // === Gradient Colors ===
  
  /** Color for left side of gradient (default: cyan blue) */
  leftGradientColor: Color4;
  
  /** Color for right side of gradient (default: cyan blue) */
  rightGradientColor: Color4;

  // === Reflection Parameters ===
  
  /** Overall reflection intensity (default: 0.749) */
  reflection: number;
  
  /** Reflection on front-facing surfaces (default: 0) */
  frontReflect: number;
  
  /** Reflection on edge/grazing angles (default: 0.09) */
  edgeReflect: number;
  
  /** Power factor for reflection falloff (default: 8.13) */
  power: number;

  // === Environment Colors ===
  
  /** Sky color for environment mapping (default: bright cyan) */
  skyColor: Color4;
  
  /** Horizon color for environment mapping (default: medium blue) */
  horizonColor: Color4;
  
  /** Ground color for environment mapping (default: dark blue) */
  groundColor: Color4;
  
  /** Power factor for horizon gradient (default: 1) */
  horizonPower: number;

  // === Edge/Border Parameters ===
  
  /** Width of the edge border (default: 0.02) */
  width: number;
  
  /** Fuzziness/softness of edges (default: 0.5) */
  fuzz: number;
  
  /** Minimum fuzz threshold (default: 0.001) */
  minFuzz: number;
  
  /** Fade distance for clipping (default: 0.01) */
  clipFade: number;

  // === Color Adjustment ===
  
  /** Hue shift amount (default: 0) */
  hueShift: number;
  
  /** Saturation shift amount (default: 0) */
  saturationShift: number;
  
  /** Value/brightness shift amount (default: 0) */
  valueShift: number;

  // === Blob Effect 1 (Primary Proximity Indicator) ===
  
  /** 3D position of the first proximity blob (default: [0, 0, 0.1]) */
  blobPosition: Vector3;
  
  /** Intensity/brightness of the first blob (default: 0.5) */
  blobIntensity: number;
  
  /** Size of blob when near (default: 0.01) */
  blobNearSize: number;
  
  /** Size of blob when far (default: 0.03) */
  blobFarSize: number;
  
  /** Distance threshold for "near" state (default: 0) */
  blobNearDistance: number;
  
  /** Distance threshold for "far" state (default: 0.08) */
  blobFarDistance: number;
  
  /** Length of fade transition (default: 0.576) */
  blobFadeLength: number;
  
  /** Pulse animation amount (default: 0) */
  blobPulse: number;
  
  /** Overall fade/opacity (default: 1) */
  blobFade: number;
  
  /** Optional texture for blob appearance */
  blobTexture: Texture;

  // === Blob Effect 2 (Secondary Proximity Indicator) ===
  
  /** 3D position of the second proximity blob (default: [0.2, 0, 0.1]) */
  blobPosition2: Vector3;
  
  /** Size of second blob when near (default: 0.01) */
  blobNearSize2: number;
  
  /** Pulse animation amount for second blob (default: 0) */
  blobPulse2: number;
  
  /** Overall fade/opacity for second blob (default: 1) */
  blobFade2: number;

  // === Hand Tracking - Local Positions ===
  
  /** Position of left index finger tip in local space (default: [0, 0, 1]) */
  leftIndexPosition: Vector3;
  
  /** Position of right index finger tip in local space (default: [-1, -1, -1]) */
  rightIndexPosition: Vector3;
  
  /** Position of left index middle joint in local space (default: [0, 0, 0]) */
  leftIndexMiddlePosition: Vector3;
  
  /** Position of right index middle joint in local space (default: [0, 0, 0]) */
  rightIndexMiddlePosition: Vector3;

  // === Hand Tracking - Global Positions ===
  
  /** Use global left index position (1 = true, 0 = false) (default: 1) */
  useGlobalLeftIndex: number;
  
  /** Use global right index position (1 = true, 0 = false) (default: 1) */
  useGlobalRightIndex: number;
  
  /** Global left index tip proximity value (default: 0) */
  globalLeftIndexTipProximity: number;
  
  /** Global right index tip proximity value (default: 0) */
  globalRightIndexTipProximity: number;
  
  /** Global position of left index finger tip (default: [0.5, 0, -0.55, 1]) */
  globalLeftIndexTipPosition: Vector4;
  
  /** Global position of right index finger tip (default: [0, 0, 0, 1]) */
  globaRightIndexTipPosition: Vector4;
  
  /** Global position of left thumb tip (default: [0.5, 0, -0.55, 1]) */
  globalLeftThumbTipPosition: Vector4;
  
  /** Global position of right thumb tip (default: [0, 0, 0, 1]) */
  globalRightThumbTipPosition: Vector4;
  
  /** Global position of left index middle joint (default: [0.5, 0, -0.55, 1]) */
  globalLeftIndexMiddlePosition: Vector4;
  
  /** Global position of right index middle joint (default: [0, 0, 0, 1]) */
  globalRightIndexMiddlePosition: Vector4;

  // === Decal Parameters ===
  
  /** XY scale of the decal texture (default: [1.5, 1.5]) */
  decalScaleXY: Vector2;
  
  /** Render decal only on front faces (default: true) */
  decalFrontOnly: boolean;

  // === Rim Lighting ===
  
  /** Intensity of rim light effect (default: 0.287) */
  rimIntensity: number;
  
  /** Hue shift for rim light (default: 0) */
  rimHueShift: number;
  
  /** Saturation shift for rim light (default: 0) */
  rimSaturationShift: number;
  
  /** Value shift for rim light (default: -1) */
  rimValueShift: number;

  // === Iridescence ===
  
  /** Intensity of iridescence effect (default: 0) */
  iridescenceIntensity: number;

  // === Private Textures ===
  
  /** Internal blue gradient texture for rim and iridescence */
  private _blueGradientTexture: Texture;
  
  /** Internal decal texture */
  private _decalTexture: Texture;
  
  /** Internal reflection map texture */
  private _reflectionMapTexture: Texture;
  
  /** Internal indirect environment texture */
  private _indirectEnvTexture: Texture;

  /**
   * Creates a new MRDL Slider Bar Material instance
   * @param name - Name of the material
   * @param scene - The scene this material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Specifies whether this material requires alpha blending
   * @returns Always false - this material uses opaque rendering
   */
  needAlphaBlending(): boolean;

  /**
   * Specifies whether this material requires alpha testing
   * @returns Always false - no alpha testing needed
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null - no alpha test texture
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready to render for a specific mesh sub-mesh
   * @param mesh - The mesh to render
   * @param subMesh - The sub-mesh to check readiness for
   * @returns True if the material and shaders are ready
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;

  /**
   * Binds the material data to the GPU for a specific sub-mesh
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The sub-mesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable properties in this material
   * @returns Array of animatable objects (textures, etc.)
   */
  getAnimatables(): IAnimatable[];

  /**
   * Disposes of the material and releases GPU resources
   * @param forceDisposeEffect - Force disposal of the shader effect
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Creates a deep clone of this material
   * @param name - Name for the cloned material
   * @returns A new instance with the same properties
   */
  clone(name: string): MRDLSliderBarMaterial;

  /**
   * Serializes this material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of this material
   * @returns "MRDLSliderBarMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material from JSON
   * @param source - Serialized material data
   * @param scene - The scene to create the material in
   * @param rootUrl - Root URL for loading resources
   * @returns Parsed material instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLSliderBarMaterial;
}