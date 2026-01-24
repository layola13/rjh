import { 
  MaterialDefines, 
  PushMaterial, 
  Material,
  Scene, 
  Mesh,
  SubMesh,
  AbstractMesh,
  BaseTexture,
  Texture,
  Color3,
  Color4,
  Vector3,
  Vector4,
  Effect,
  EffectFallbacks,
  MaterialHelper,
  VertexBuffer,
  Constants,
  SerializationHelper,
  IAnimatable
} from '@babylonjs/core';

/**
 * Material defines for FluentButton material shader
 * Extends MaterialDefines to provide custom shader definitions
 */
declare class FluentButtonMaterialDefines extends MaterialDefines {
  /** Enable relative width calculations */
  RELATIVE_WIDTH: boolean;
  
  /** Enable fade effect */
  ENABLE_FADE: boolean;
  
  /** Constructor */
  constructor();
}

/**
 * FluentButton material for MRTK-style 3D buttons in Babylon.js GUI
 * Provides proximity-based hover effects, selection feedback, and animated blobs
 * following the Microsoft Fluent Design System
 */
declare class FluentButtonMaterial extends PushMaterial {
  /** Default URL for the blob texture used in hover effects */
  static readonly BLOB_TEXTURE_URL: string;

  // Edge styling properties
  
  /** Width of the button edge outline (default: 0.04) */
  edgeWidth: number;
  
  /** Color of the button edge with alpha (default: rgba(0.592, 0.592, 0.592, 1)) */
  edgeColor: Color4;

  // Proximity effect properties
  
  /** Maximum intensity of proximity glow effect (default: 0.45) */
  proximityMaxIntensity: number;
  
  /** Distance at which proximity effect ends (default: 0.16) */
  proximityFarDistance: number;
  
  /** Radius of proximity effect at near distance (default: 1.5) */
  proximityNearRadius: number;
  
  /** Anisotropy factor for proximity shape (default: 1) */
  proximityAnisotropy: number;

  // Selection state properties
  
  /** Fuzziness/softness of selection highlight (default: 0.5) */
  selectionFuzz: number;
  
  /** Current selection state: 0 = unselected, 1 = selected (default: 0) */
  selected: number;
  
  /** Selection fade animation value (default: 0) */
  selectionFade: number;
  
  /** Size of the selection fade region (default: 0.3) */
  selectionFadeSize: number;
  
  /** Distance threshold for selection detection (default: 0.08) */
  selectedDistance: number;
  
  /** Length over which selection fades in/out (default: 0.08) */
  selectedFadeLength: number;

  // Blob effect properties (shared)
  
  /** Intensity/brightness of blob effects (default: 0.5) */
  blobIntensity: number;
  
  /** Size of blob at far distance (default: 0.05) */
  blobFarSize: number;
  
  /** Distance at which blob near size applies (default: 0) */
  blobNearDistance: number;
  
  /** Distance at which blob far size applies (default: 0.08) */
  blobFarDistance: number;
  
  /** Length over which blob size transitions (default: 0.08) */
  blobFadeLength: number;

  // Left blob (typically left index finger) properties
  
  /** Enable/disable left blob effect (default: true) */
  leftBlobEnable: boolean;
  
  /** Size of left blob at near distance (default: 0.025) */
  leftBlobNearSize: number;
  
  /** Pulse animation value for left blob (default: 0) */
  leftBlobPulse: number;
  
  /** Opacity fade value for left blob (default: 1) */
  leftBlobFade: number;
  
  /** Inner fade/softness for left blob (default: 0.01) */
  leftBlobInnerFade: number;

  // Right blob (typically right index finger) properties
  
  /** Enable/disable right blob effect (default: true) */
  rightBlobEnable: boolean;
  
  /** Size of right blob at near distance (default: 0.025) */
  rightBlobNearSize: number;
  
  /** Pulse animation value for right blob (default: 0) */
  rightBlobPulse: number;
  
  /** Opacity fade value for right blob (default: 1) */
  rightBlobFade: number;
  
  /** Inner fade/softness for right blob (default: 0.01) */
  rightBlobInnerFade: number;

  // Active face detection properties
  
  /** Forward direction vector of the active face (default: (0, 0, -1)) */
  activeFaceDir: Vector3;
  
  /** Up direction vector of the active face (default: (0, 1, 0)) */
  activeFaceUp: Vector3;
  
  /** Enable fade based on face orientation (default: true) */
  enableFade: boolean;
  
  /** Width of the fade region (default: 1.5) */
  fadeWidth: number;
  
  /** Smooth transition for active face detection (default: true) */
  smoothActiveFace: boolean;

  // Visual options
  
  /** Display debug frame around button (default: false) */
  showFrame: boolean;
  
  /** Use texture for blob rendering (default: true) */
  useBlobTexture: boolean;

  // Global hand tracking positions
  
  /** World-space position of left index fingertip (default: Vector3.Zero()) */
  globalLeftIndexTipPosition: Vector3;
  
  /** World-space position of right index fingertip (default: Vector3.Zero()) */
  globalRightIndexTipPosition: Vector3;

  /**
   * Creates a new FluentButton material
   * @param name - Name of the material
   * @param scene - Scene to attach the material to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if the material requires alpha blending
   * @returns Always true for fluent button material
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if the material requires alpha testing
   * @returns Always true for fluent button material
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null (no dedicated alpha test texture)
   */
  getAlphaTestTexture(): BaseTexture | null;

  /**
   * Checks if the material is ready to render a specific submesh
   * @param mesh - The mesh to check
   * @param subMesh - The submesh to check
   * @param useInstances - Whether instances are being used
   * @returns True if ready to render
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds the material to a submesh for rendering
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable properties in this material
   * @returns Empty array (texture is the only animatable)
   */
  getAnimatables(): IAnimatable[];

  /**
   * Disposes the material and its resources
   * @param forceDisposeEffect - Force disposal of the effect
   * @param forceDisposeTextures - Force disposal of textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns Cloned FluentButtonMaterial instance
   */
  clone(name: string): FluentButtonMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): any;

  /**
   * Gets the class name of this material
   * @returns "FluentButtonMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for loading assets
   * @returns Parsed FluentButtonMaterial instance
   */
  static Parse(source: any, scene: Scene, rootUrl: string): FluentButtonMaterial;
}

export { FluentButtonMaterial, FluentButtonMaterialDefines };