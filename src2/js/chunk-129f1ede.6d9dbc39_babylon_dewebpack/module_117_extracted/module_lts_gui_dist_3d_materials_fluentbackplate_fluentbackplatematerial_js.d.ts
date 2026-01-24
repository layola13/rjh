/**
 * Type definitions for Fluent Backplate Material
 * A material used for creating fluent design backplates with various visual effects
 */

import { 
  MaterialDefines, 
  PushMaterial, 
  Scene, 
  SubMesh, 
  AbstractMesh,
  Color4, 
  Vector3, 
  Vector4,
  Texture,
  IAnimatable
} from '@babylonjs/core';

/**
 * Material defines for FluentBackplateMaterial
 * Defines shader preprocessor flags and material features
 */
export declare class FluentBackplateMaterialDefines extends MaterialDefines {
  /** Enable first blob effect */
  BLOB_ENABLE: boolean;
  
  /** Enable second blob effect */
  BLOB_ENABLE_2: boolean;
  
  /** Enable smooth edge rendering */
  SMOOTH_EDGES: boolean;
  
  /** Enable iridescent map texture */
  IRIDESCENT_MAP_ENABLE: boolean;
  
  constructor();
}

/**
 * Fluent Design Backplate Material
 * Implements Microsoft Fluent Design System backplate with advanced visual effects including:
 * - Rounded corners with configurable radii
 * - Blob proximity effects (dual blob support)
 * - Iridescence effects
 * - Highlight effects
 * - Edge smoothing
 */
export declare class FluentBackplateMaterial extends PushMaterial {
  /** Default URL for blob texture */
  static readonly BLOB_TEXTURE_URL: string;
  
  /** Default URL for iridescence map texture */
  static readonly IM_TEXTURE_URL: string;

  // Corner radius properties
  /** Corner radius for the backplate */
  radius: number;
  
  /** Width of the border line */
  lineWidth: number;
  
  /** Whether sizes are absolute (true) or relative (false) */
  absoluteSizes: boolean;

  // Color properties
  /** Base color of the backplate */
  baseColor: Color4;
  
  /** Color of the border line */
  lineColor: Color4;
  
  /** Color of the highlight effect */
  highlightColor: Color4;

  // Blob effect properties (primary)
  /** Intensity of the blob effect (0-1) */
  blobIntensity: number;
  
  /** Size of blob when far from surface */
  blobFarSize: number;
  
  /** Distance at which blob starts appearing */
  blobNearDistance: number;
  
  /** Distance at which blob is fully visible */
  blobFarDistance: number;
  
  /** Length over which blob fades */
  blobFadeLength: number;
  
  /** Size of blob when near surface */
  blobNearSize: number;
  
  /** Pulse animation value for blob */
  blobPulse: number;
  
  /** Fade value for blob visibility */
  blobFade: number;

  // Blob effect properties (secondary)
  /** Size of second blob when near surface */
  blobNearSize2: number;
  
  /** Pulse animation value for second blob */
  blobPulse2: number;
  
  /** Fade value for second blob visibility */
  blobFade2: number;

  // Highlight properties
  /** Width of the highlight effect */
  highlightWidth: number;

  // Iridescence properties
  /** Intensity of iridescence effect */
  iridescenceIntensity: number;
  
  /** Intensity of iridescence at edges */
  iridescenceEdgeIntensity: number;

  // Fade properties
  /** Fade out value (0-1) */
  fadeOut: number;

  // Global interaction properties
  /** Position of left index finger tip for proximity effects */
  globalLeftIndexTipPosition: Vector3;
  
  /** Position of right index finger tip for proximity effects */
  globalRightIndexTipPosition: Vector3;

  /**
   * Creates a new FluentBackplateMaterial instance
   * @param name - Name of the material
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
   * @returns Always null - no alpha test texture is used
   */
  getAlphaTestTexture(): null;

  /**
   * Checks if the material is ready to be rendered for a specific submesh
   * @param mesh - The mesh to check
   * @param subMesh - The submesh to check
   * @returns True if the material is ready
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;

  /**
   * Binds the material data to the effect for a specific submesh
   * @param world - World matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatables in the material
   * @returns Empty array - no animatable textures
   */
  getAnimatables(): IAnimatable[];

  /**
   * Disposes the material and its resources
   * @param forceDisposeEffect - Force disposal of the effect
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns Cloned material instance
   */
  clone(name: string): FluentBackplateMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "FluentBackplateMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for assets
   * @returns Parsed material instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): FluentBackplateMaterial;
}