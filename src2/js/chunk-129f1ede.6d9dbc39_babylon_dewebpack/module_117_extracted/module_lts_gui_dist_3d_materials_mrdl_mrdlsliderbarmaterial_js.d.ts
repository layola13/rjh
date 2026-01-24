import {
  Color4,
  Constants,
  Material,
  MaterialDefines,
  Mesh,
  PushMaterial,
  Scene,
  SerializationHelper,
  SubMesh,
  Texture,
  Vector2,
  Vector3,
  Vector4,
} from '@babylonjs/core';

/**
 * Material defines for MRDL Slider Bar Material
 * Manages shader feature flags and compilation state
 */
export declare class MRDLSliderBarMaterialDefines extends MaterialDefines {
  /** Enable sky environment lighting */
  SKY_ENABLED: boolean;
  
  /** Enable secondary blob effect */
  BLOB_ENABLE_2: boolean;
  
  /** Enable iridescence effect */
  IRIDESCENCE_ENABLED: boolean;
  
  constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Slider Bar Material
 * 
 * A specialized material for rendering interactive slider bars in mixed reality experiences.
 * Supports advanced visual features including:
 * - Gradient coloring and iridescence
 * - Proximity-based blob effects for hand tracking
 * - Reflections and rim lighting
 * - Customizable bevels and rounded corners
 * - Global hand tracking integration
 * 
 * @see https://docs.microsoft.com/windows/mixed-reality/mrtk-unity/
 */
export declare class MRDLSliderBarMaterial extends PushMaterial {
  /** URL for the default blue gradient texture */
  static readonly BLUE_GRADIENT_TEXTURE_URL: string;

  // Geometry Properties
  
  /** Base radius for rounded corners */
  radius: number;
  
  /** Front bevel depth */
  bevelFront: number;
  
  /** Front bevel stretch factor */
  bevelFrontStretch: number;
  
  /** Back bevel depth */
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

  // Bulge Properties
  
  /** Enable bulge effect */
  bulgeEnabled: boolean;
  
  /** Height of the bulge deformation */
  bulgeHeight: number;
  
  /** Radius of the bulge effect */
  bulgeRadius: number;

  // Lighting Properties
  
  /** Directional sun light intensity */
  sunIntensity: number;
  
  /** Sun elevation angle (theta) in radians */
  sunTheta: number;
  
  /** Sun azimuth angle (phi) in radians */
  sunPhi: number;
  
  /** Indirect diffuse lighting contribution */
  indirectDiffuse: number;

  // Surface Properties
  
  /** Base albedo color with alpha */
  albedo: Color4;
  
  /** Specular reflection intensity */
  specular: number;
  
  /** Specular shininess exponent */
  shininess: number;
  
  /** Sharpness of specular highlights */
  sharpness: number;
  
  /** Subsurface scattering intensity */
  subsurface: number;

  // Gradient Properties
  
  /** Left side gradient color */
  leftGradientColor: Color4;
  
  /** Right side gradient color */
  rightGradientColor: Color4;

  // Reflection Properties
  
  /** Overall reflection intensity */
  reflection: number;
  
  /** Front-facing reflection amount */
  frontReflect: number;
  
  /** Edge (Fresnel) reflection amount */
  edgeReflect: number;
  
  /** Reflection falloff power */
  power: number;
  
  /** Sky color for reflections */
  skyColor: Color4;
  
  /** Horizon color for reflections */
  horizonColor: Color4;
  
  /** Ground color for reflections */
  groundColor: Color4;
  
  /** Horizon gradient power/falloff */
  horizonPower: number;

  // Edge/Fuzz Properties
  
  /** Edge width for anti-aliasing */
  width: number;
  
  /** Fuzz/softness amount */
  fuzz: number;
  
  /** Minimum fuzz threshold */
  minFuzz: number;
  
  /** Fade distance for clipping */
  clipFade: number;

  // Color Shift Properties
  
  /** HSV hue shift amount */
  hueShift: number;
  
  /** HSV saturation shift amount */
  saturationShift: number;
  
  /** HSV value/brightness shift amount */
  valueShift: number;

  // Blob 1 Properties (Proximity Effect)
  
  /** World position of first blob */
  blobPosition: Vector3;
  
  /** Intensity of first blob effect */
  blobIntensity: number;
  
  /** Blob size when near */
  blobNearSize: number;
  
  /** Blob size when far */
  blobFarSize: number;
  
  /** Distance considered "near" */
  blobNearDistance: number;
  
  /** Distance considered "far" */
  blobFarDistance: number;
  
  /** Fade transition length */
  blobFadeLength: number;
  
  /** Blob pulse animation value */
  blobPulse: number;
  
  /** Blob opacity fade value */
  blobFade: number;
  
  /** Optional texture for blob */
  blobTexture: Texture;

  // Blob 2 Properties (Secondary Proximity Effect)
  
  /** World position of second blob */
  blobPosition2: Vector3;
  
  /** Second blob size when near */
  blobNearSize2: number;
  
  /** Second blob pulse animation value */
  blobPulse2: number;
  
  /** Second blob opacity fade value */
  blobFade2: number;

  // Hand Tracking - Local Positions
  
  /** Left index finger tip position (local space) */
  leftIndexPosition: Vector3;
  
  /** Right index finger tip position (local space) */
  rightIndexPosition: Vector3;
  
  /** Left index finger middle joint position (local space) */
  leftIndexMiddlePosition: Vector3;
  
  /** Right index finger middle joint position (local space) */
  rightIndexMiddlePosition: Vector3;

  // Hand Tracking - Global Positions
  
  /** Use global left index tracking (1 = enabled, 0 = disabled) */
  useGlobalLeftIndex: number;
  
  /** Use global right index tracking (1 = enabled, 0 = disabled) */
  useGlobalRightIndex: number;
  
  /** Global left index tip proximity value (0-1) */
  globalLeftIndexTipProximity: number;
  
  /** Global right index tip proximity value (0-1) */
  globalRightIndexTipProximity: number;
  
  /** Global left index tip position (world space) */
  globalLeftIndexTipPosition: Vector4;
  
  /** Global right index tip position (world space) */
  globaRightIndexTipPosition: Vector4;
  
  /** Global left thumb tip position (world space) */
  globalLeftThumbTipPosition: Vector4;
  
  /** Global right thumb tip position (world space) */
  globalRightThumbTipPosition: Vector4;
  
  /** Global left index middle joint position (world space) */
  globalLeftIndexMiddlePosition: Vector4;
  
  /** Global right index middle joint position (world space) */
  globalRightIndexMiddlePosition: Vector4;

  // Decal Properties
  
  /** XY scale for decal texture */
  decalScaleXY: Vector2;
  
  /** Only render decal on front face */
  decalFrontOnly: boolean;

  // Rim Lighting Properties
  
  /** Rim light intensity */
  rimIntensity: number;
  
  /** Rim light hue shift */
  rimHueShift: number;
  
  /** Rim light saturation shift */
  rimSaturationShift: number;
  
  /** Rim light value/brightness shift */
  rimValueShift: number;

  // Iridescence Properties
  
  /** Iridescence effect intensity */
  iridescenceIntensity: number;

  /**
   * Creates a new MRDL Slider Bar Material
   * @param name - Material name
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Specifies if the material requires alpha blending
   * @returns Always false - this material doesn't use alpha blending
   */
  needAlphaBlending(): boolean;

  /**
   * Specifies if the material requires alpha testing
   * @returns Always false - this material doesn't use alpha testing
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null - no alpha test texture
   */
  getAlphaTestTexture(): Texture | null;

  /**
   * Checks if the material is ready to be rendered for a specific mesh/submesh
   * @param mesh - The mesh to check
   * @param subMesh - The submesh to check
   * @param useInstances - Whether instances are being used
   * @returns True if ready to render
   */
  isReadyForSubMesh(mesh: Mesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds the material data to the GPU for rendering a submesh
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable textures/properties
   * @returns Empty array - no animatables
   */
  getAnimatables(): Array<unknown>;

  /**
   * Disposes of the material and releases GPU resources
   * @param forceDisposeEffect - Force disposal of the shader effect
   * @param forceDisposeTextures - Force disposal of textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns A new instance with copied properties
   */
  clone(name: string): MRDLSliderBarMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name
   * @returns "MRDLSliderBarMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for loading assets
   * @returns Parsed material instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLSliderBarMaterial;
}