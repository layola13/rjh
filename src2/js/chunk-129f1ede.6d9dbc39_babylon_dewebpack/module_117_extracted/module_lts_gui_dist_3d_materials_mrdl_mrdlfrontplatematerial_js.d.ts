import { 
  MaterialDefines, 
  PushMaterial, 
  MaterialHelper, 
  EffectFallbacks, 
  VertexBuffer, 
  Constants, 
  Texture, 
  Color4, 
  Vector3, 
  SerializationHelper, 
  RegisterClass 
} from '@babylonjs/core';
import type { Scene } from '@babylonjs/core/scene';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import type { Effect } from '@babylonjs/core/Materials/effect';
import type { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import type { Nullable } from '@babylonjs/core/types';

/**
 * Material defines for MRDL (Mixed Reality Design Language) Frontplate shader
 * Controls compilation flags for shader features
 */
declare class MRDLFrontplateMaterialDefines extends MaterialDefines {
  /** Enable smooth edge rendering */
  SMOOTH_EDGES: boolean;
  
  /** Enable fog rendering */
  FOG?: boolean;
  
  /** Enable normal attributes */
  NORMAL?: boolean;
  
  /** Enable UV1 texture coordinates */
  UV1?: boolean;
  
  /** Enable UV2 texture coordinates */
  UV2?: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR?: boolean;
  
  /** Enable tangent attributes */
  TANGENT?: boolean;
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS?: boolean;
  
  constructor();
}

/**
 * MRDL Frontplate Material - A specialized material for Mixed Reality UI frontplates
 * Implements advanced visual effects including blob interaction, selection feedback,
 * proximity detection, and gaze-based interactions
 * 
 * @remarks
 * This material is designed for Mixed Reality applications and provides:
 * - Interactive "blob" effects for finger proximity visualization
 * - Selection and hover state feedback
 * - Gaze-based intensity modulation
 * - Smooth edge rendering with customizable parameters
 */
export declare class MRDLFrontplateMaterial extends PushMaterial {
  
  // ===== Static Properties =====
  
  /** URL for the blob texture used in proximity effects */
  static BLOB_TEXTURE_URL: string;
  
  /**
   * Parse a serialized MRDLFrontplateMaterial
   * @param source - Serialized material data
   * @param scene - The scene to create the material in
   * @param rootUrl - Root URL for loading assets
   * @returns Parsed material instance
   */
  static Parse(source: any, scene: Scene, rootUrl: string): MRDLFrontplateMaterial;
  
  // ===== Core Shape Properties =====
  
  /** Corner radius of the frontplate (in meters) */
  radius: number;
  
  /** Width of the edge line (in meters) */
  lineWidth: number;
  
  /** If true, radius is relative to height; if false, absolute value */
  relativeToHeight: boolean;
  
  /** Edge color and alpha (RGBA) */
  edgeColor: Color4;
  
  /** Fade out intensity (0-1, where 1 is fully visible) */
  fadeOut: number;
  
  // ===== Primary Blob Properties =====
  
  /** Enable the primary interaction blob effect */
  blobEnable: boolean;
  
  /** World-space position of the primary blob (e.g., finger tip position) */
  blobPosition: Vector3;
  
  /** Visual intensity of the blob effect (0-1) */
  blobIntensity: number;
  
  /** Size of the blob when near the surface (in meters) */
  blobNearSize: number;
  
  /** Size of the blob when far from the surface (in meters) */
  blobFarSize: number;
  
  /** Distance threshold considered "near" (in meters) */
  blobNearDistance: number;
  
  /** Distance threshold considered "far" (in meters) */
  blobFarDistance: number;
  
  /** Transition length for blob fade out (in meters) */
  blobFadeLength: number;
  
  /** Inner fade radius for smooth blob center (0-1) */
  blobInnerFade: number;
  
  /** Pulse animation intensity (0-1) */
  blobPulse: number;
  
  /** Overall blob fade multiplier (0-1) */
  blobFade: number;
  
  /** Maximum size during pulse animation (in meters) */
  blobPulseMaxSize: number;
  
  // ===== Secondary Blob Properties =====
  
  /** Enable the secondary interaction blob effect */
  blobEnable2: boolean;
  
  /** World-space position of the secondary blob */
  blobPosition2: Vector3;
  
  /** Size of the secondary blob when near the surface (in meters) */
  blobNearSize2: number;
  
  /** Inner fade radius for the secondary blob (0-1) */
  blobInnerFade2: number;
  
  /** Pulse animation intensity for secondary blob (0-1) */
  blobPulse2: number;
  
  /** Overall fade multiplier for secondary blob (0-1) */
  blobFade2: number;
  
  // ===== Gaze Interaction Properties =====
  
  /** Intensity of gaze-based highlighting (0-1) */
  gazeIntensity: number;
  
  /** Focus amount from gaze tracking (0-1) */
  gazeFocus: number;
  
  // ===== Selection Properties =====
  
  /** Selection edge fuzziness/softness (0-1) */
  selectionFuzz: number;
  
  /** Selection state (0 = not selected, 1 = selected) */
  selected: number;
  
  /** Selection fade transition progress (0-1) */
  selectionFade: number;
  
  /** Size modifier during selection fade */
  selectionFadeSize: number;
  
  /** Distance threshold for selection effect (in meters) */
  selectedDistance: number;
  
  /** Transition length for selection fade (in meters) */
  selectedFadeLength: number;
  
  // ===== Proximity Detection Properties =====
  
  /** Maximum intensity for proximity highlighting (0-1) */
  proximityMaxIntensity: number;
  
  /** Distance where proximity effect starts to fade (in meters) */
  proximityFarDistance: number;
  
  /** Radius of near-field proximity detection (in meters) */
  proximityNearRadius: number;
  
  /** Anisotropy of proximity effect (directional bias) */
  proximityAnisotropy: number;
  
  // ===== Global Index Finger Tracking =====
  
  /** Use global left index finger position for blob tracking */
  useGlobalLeftIndex: boolean;
  
  /** Use global right index finger position for blob tracking */
  useGlobalRightIndex: boolean;
  
  // ===== Private Properties =====
  
  /** @internal Filter width for edge smoothing */
  private _filterWidth: number;
  
  /** @internal Blob texture for proximity visualization */
  private _blobTexture: Texture;
  
  // ===== Constructor =====
  
  /**
   * Creates a new MRDLFrontplateMaterial instance
   * @param name - Name of the material
   * @param scene - The scene to add the material to
   */
  constructor(name: string, scene: Scene);
  
  // ===== Material Lifecycle Methods =====
  
  /**
   * Specifies if the material requires alpha blending
   * @returns Always true for this material
   */
  needAlphaBlending(): boolean;
  
  /**
   * Specifies if the material requires alpha testing
   * @returns Always false for this material
   */
  needAlphaTesting(): boolean;
  
  /**
   * Gets the texture used for alpha testing
   * @returns Always null for this material
   */
  getAlphaTestTexture(): Nullable<Texture>;
  
  /**
   * Checks if the material is ready to render for a specific mesh/submesh
   * @param mesh - The mesh to render
   * @param subMesh - The submesh to render
   * @returns True if ready to render, false otherwise
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
  
  /**
   * Binds the material properties to the effect for rendering a submesh
   * @param world - World matrix of the mesh
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
  
  /**
   * Gets the list of animatable properties in the material
   * @returns Empty array (no animatables in this material)
   */
  getAnimatables(): IAnimatable[];
  
  /**
   * Disposes the material and releases associated resources
   * @param forceDisposeEffect - Force disposal of the effect
   */
  dispose(forceDisposeEffect?: boolean): void;
  
  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns Cloned material instance
   */
  clone(name: string): MRDLFrontplateMaterial;
  
  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): any;
  
  /**
   * Gets the class name of the material
   * @returns "MRDLFrontplateMaterial"
   */
  getClassName(): string;
}