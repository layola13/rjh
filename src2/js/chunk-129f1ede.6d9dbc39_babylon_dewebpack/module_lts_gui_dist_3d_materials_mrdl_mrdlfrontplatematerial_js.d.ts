import { 
  MaterialDefines, 
  PushMaterial, 
  SubMesh, 
  AbstractMesh, 
  Scene, 
  Effect, 
  Color4, 
  Vector3, 
  Texture, 
  Constants 
} from '@babylonjs/core';

/**
 * Material defines for MRDL Frontplate Material
 * Extends the base MaterialDefines to support custom shader features
 */
export declare class MRDLFrontplateMaterialDefines extends MaterialDefines {
  /**
   * Enables smooth edge rendering
   */
  SMOOTH_EDGES: boolean;
  
  /**
   * Indicates if normals are required for rendering
   */
  _needNormals: boolean;
  
  /**
   * Indicates if UV coordinates are required for rendering
   */
  _needUVs: boolean;
  
  constructor();
}

/**
 * Mixed Reality Design Language (MRDL) Frontplate Material
 * A specialized material for rendering interactive UI frontplates in mixed reality applications
 * Supports blob effects, proximity interactions, gaze focus, and selection states
 */
export declare class MRDLFrontplateMaterial extends PushMaterial {
  /**
   * Default URL for the blob texture used in the material
   */
  static BLOB_TEXTURE_URL: string;
  
  /**
   * Corner radius of the frontplate
   * @default 0.12
   */
  radius: number;
  
  /**
   * Width of the edge line
   * @default 0.01
   */
  lineWidth: number;
  
  /**
   * Whether dimensions are relative to height
   * @default false
   */
  relativeToHeight: boolean;
  
  /**
   * Internal filter width parameter for edge rendering
   * @default 1
   */
  _filterWidth: number;
  
  /**
   * Color of the frontplate edge
   * @default Color4(0.53, 0.53, 0.53, 1)
   */
  edgeColor: Color4;
  
  /**
   * Fade out intensity
   * @default 1
   */
  fadeOut: number;
  
  // Primary Blob Configuration
  
  /**
   * Enables the primary blob effect
   * @default true
   */
  blobEnable: boolean;
  
  /**
   * World position of the primary blob
   * @default Vector3(100, 100, 100)
   */
  blobPosition: Vector3;
  
  /**
   * Intensity of the primary blob effect
   * @default 0.5
   */
  blobIntensity: number;
  
  /**
   * Size of the blob when near
   * @default 0.032
   */
  blobNearSize: number;
  
  /**
   * Size of the blob when far
   * @default 0.048
   */
  blobFarSize: number;
  
  /**
   * Distance threshold for near blob size
   * @default 0.008
   */
  blobNearDistance: number;
  
  /**
   * Distance threshold for far blob size
   * @default 0.064
   */
  blobFarDistance: number;
  
  /**
   * Length of the blob fade transition
   * @default 0.04
   */
  blobFadeLength: number;
  
  /**
   * Inner fade amount for the blob
   * @default 0.01
   */
  blobInnerFade: number;
  
  /**
   * Pulse animation value for the blob (0-1)
   * @default 0
   */
  blobPulse: number;
  
  /**
   * Fade amount for the blob (0-1)
   * @default 1
   */
  blobFade: number;
  
  /**
   * Maximum size during blob pulse animation
   * @default 0.05
   */
  blobPulseMaxSize: number;
  
  // Secondary Blob Configuration
  
  /**
   * Enables the secondary blob effect
   * @default true
   */
  blobEnable2: boolean;
  
  /**
   * World position of the secondary blob
   * @default Vector3(10, 10.1, -0.6)
   */
  blobPosition2: Vector3;
  
  /**
   * Size of the secondary blob when near
   * @default 0.008
   */
  blobNearSize2: number;
  
  /**
   * Inner fade amount for the secondary blob
   * @default 0.1
   */
  blobInnerFade2: number;
  
  /**
   * Pulse animation value for the secondary blob (0-1)
   * @default 0
   */
  blobPulse2: number;
  
  /**
   * Fade amount for the secondary blob (0-1)
   * @default 1
   */
  blobFade2: number;
  
  // Gaze Interaction
  
  /**
   * Intensity of the gaze interaction effect
   * @default 0.8
   */
  gazeIntensity: number;
  
  /**
   * Focus level of the gaze (0-1)
   * @default 0
   */
  gazeFocus: number;
  
  /**
   * Internal blob texture used for rendering
   */
  _blobTexture: Texture;
  
  // Selection State
  
  /**
   * Fuzziness of the selection border
   * @default 0.5
   */
  selectionFuzz: number;
  
  /**
   * Whether the frontplate is currently selected (0-1)
   * @default 1
   */
  selected: number;
  
  /**
   * Fade amount for the selection state
   * @default 0.2
   */
  selectionFade: number;
  
  /**
   * Size of the selection fade effect
   * @default 0
   */
  selectionFadeSize: number;
  
  /**
   * Distance threshold for selection activation
   * @default 0.08
   */
  selectedDistance: number;
  
  /**
   * Length of the selection fade transition
   * @default 0.08
   */
  selectedFadeLength: number;
  
  // Proximity Interaction
  
  /**
   * Maximum intensity of the proximity effect
   * @default 0.45
   */
  proximityMaxIntensity: number;
  
  /**
   * Distance threshold for far proximity
   * @default 0.16
   */
  proximityFarDistance: number;
  
  /**
   * Radius for near proximity detection
   * @default 0.016
   */
  proximityNearRadius: number;
  
  /**
   * Anisotropy factor for proximity effect directionality
   * @default 1
   */
  proximityAnisotropy: number;
  
  // Hand Tracking
  
  /**
   * Whether to use the global left index finger position for interactions
   * @default true
   */
  useGlobalLeftIndex: boolean;
  
  /**
   * Whether to use the global right index finger position for interactions
   * @default true
   */
  useGlobalRightIndex: boolean;
  
  /**
   * Creates a new MRDLFrontplateMaterial instance
   * @param name - Name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);
  
  /**
   * Determines if alpha blending is needed for this material
   * @returns Always returns true for this material
   */
  needAlphaBlending(): boolean;
  
  /**
   * Determines if alpha testing is needed for this material
   * @returns Always returns false for this material
   */
  needAlphaTesting(): boolean;
  
  /**
   * Gets the texture used for alpha testing
   * @returns Always returns null for this material
   */
  getAlphaTestTexture(): Texture | null;
  
  /**
   * Checks if the material is ready to render for a specific submesh
   * @param mesh - The mesh to check readiness for
   * @param subMesh - The submesh to check readiness for
   * @returns True if the material is ready to render
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
  
  /**
   * Binds the material data to the effect for rendering a submesh
   * @param world - World matrix of the mesh
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;
  
  /**
   * Gets the list of animatables in the material
   * @returns Empty array (this material has no animatables)
   */
  getAnimatables(): Array<unknown>;
  
  /**
   * Disposes of the material and releases associated resources
   * @param forceDisposeEffect - Whether to force dispose the effect
   */
  dispose(forceDisposeEffect?: boolean): void;
  
  /**
   * Creates a clone of this material
   * @param name - Name for the cloned material
   * @returns A new instance of MRDLFrontplateMaterial with the same properties
   */
  clone(name: string): MRDLFrontplateMaterial;
  
  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;
  
  /**
   * Gets the class name of the material
   * @returns "MRDLFrontplateMaterial"
   */
  getClassName(): string;
  
  /**
   * Parses a serialized material and creates a new instance
   * @param source - The serialized material data
   * @param scene - The scene to create the material in
   * @param rootUrl - The root URL for loading external resources
   * @returns A new MRDLFrontplateMaterial instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLFrontplateMaterial;
}