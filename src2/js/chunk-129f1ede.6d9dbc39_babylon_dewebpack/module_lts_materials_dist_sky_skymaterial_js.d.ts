import { 
  Scene, 
  Material, 
  PushMaterial, 
  MaterialDefines, 
  Mesh, 
  SubMesh, 
  AbstractMesh,
  Vector3,
  Quaternion,
  Matrix,
  Camera,
  BaseTexture,
  Nullable,
  IAnimatable
} from '@babylonjs/core';

/**
 * Defines for the Sky material shader
 * Extends MaterialDefines to add sky-specific shader compilation flags
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
  /** Enable vertex color support */
  VERTEXCOLOR: boolean;
  /** Enable vertex alpha support */
  VERTEXALPHA: boolean;
  /** Image processing applied by post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;
  /** Enable dithering effect */
  DITHER: boolean;

  constructor();
}

/**
 * Sky material for Babylon.js
 * Creates a physically-based sky with atmospheric scattering effects
 * Based on the Preetham sky model for realistic day/night cycle rendering
 */
export declare class SkyMaterial extends PushMaterial {
  /**
   * Luminance intensity of the sky (brightness factor)
   * @default 1.0
   */
  luminance: number;

  /**
   * Atmospheric turbidity (haziness)
   * Lower values = clearer sky, higher values = more hazy
   * @default 10
   */
  turbidity: number;

  /**
   * Rayleigh scattering coefficient
   * Controls blue color intensity from molecular scattering
   * @default 2
   */
  rayleigh: number;

  /**
   * Mie scattering coefficient
   * Controls scattering from larger particles (aerosols, pollution)
   * @default 0.005
   */
  mieCoefficient: number;

  /**
   * Mie scattering directional factor (anisotropy)
   * Controls how forward-focused the scattering is
   * Range: [-1, 1], typically around 0.8 for Earth's atmosphere
   * @default 0.8
   */
  mieDirectionalG: number;

  /**
   * Distance from camera to the sky dome
   * @default 500
   */
  distance: number;

  /**
   * Sun inclination angle (elevation)
   * Range: [0, 1] where 0 = horizon, 0.5 = zenith
   * Only used when useSunPosition is false
   * @default 0.49
   */
  inclination: number;

  /**
   * Sun azimuth angle (compass direction)
   * Range: [0, 1] representing 0-360 degrees
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
   * Whether to use the sunPosition vector directly
   * If false, sun position is calculated from inclination and azimuth
   * @default false
   */
  useSunPosition: boolean;

  /**
   * Camera offset for parallax effects
   * @default Vector3.Zero()
   */
  cameraOffset: Vector3;

  /**
   * Up direction vector for sky orientation
   * @default Vector3.Up()
   */
  up: Vector3;

  /**
   * Enable dithering to reduce color banding
   * @default false
   */
  dithering: boolean;

  /** @internal Camera position cache */
  private _cameraPosition: Vector3;

  /** @internal Sky orientation quaternion for rotation calculations */
  private _skyOrientation: Quaternion;

  /**
   * Creates a new Sky material instance
   * @param name - The material name
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if alpha blending is required
   * @returns True if material alpha is less than 1.0
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if alpha testing is required
   * @returns Always false for sky material
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null for sky material
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready to render for a specific submesh
   * @param mesh - The mesh to render
   * @param subMesh - The submesh to check
   * @param useInstances - Whether instances are being used
   * @returns True if the material is ready
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds material data to the GPU for a specific submesh
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable properties
   * @returns Empty array (sky material has no animatable textures)
   */
  getAnimatables(): IAnimatable[];

  /**
   * Disposes the material and releases resources
   * @param forceDisposeEffect - Force disposal of the shader effect
   * @param forceDisposeTextures - Force disposal of associated textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns A new SkyMaterial instance with copied properties
   */
  clone(name: string): SkyMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "SkyMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material from JSON
   * @param source - Serialized material data
   * @param scene - The scene to create the material in
   * @param rootUrl - Root URL for loading resources
   * @returns Parsed SkyMaterial instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): SkyMaterial;
}