/**
 * Opening module - Defines door, window and other wall/slab opening entities
 */

import type { Content, Content_IO } from './Content';
import type { Entity } from './Entity';
import type { Face } from './Face';
import type { Wall } from './Wall';
import type { Slab } from './Slab';
import type { Material } from './Material';
import type { Signal, SignalHook } from './Signal';
import type { EntityFieldOptions } from './decorators';

/**
 * Defines the type of face on an opening (top, bottom, or side)
 */
export enum OpeningFaceType {
  /** Top face of the opening */
  top = 'top',
  /** Bottom face of the opening */
  bottom = 'bottom',
  /** Side face of the opening */
  side = 'side'
}

/**
 * Collection of faces organized by type
 */
export interface FaceCollection {
  [faceId: string]: Face;
}

/**
 * All faces of an opening organized by type
 */
export interface OpeningFaces {
  [OpeningFaceType.top]: FaceCollection;
  [OpeningFaceType.bottom]: FaceCollection;
  [OpeningFaceType.side]: FaceCollection;
}

/**
 * 3D point coordinates
 */
export type Point3D = [x: number, y: number, z: number];

/**
 * 2D point with optional z coordinate
 */
export interface Point2D {
  x: number;
  y: number;
  z?: number;
}

/**
 * Profile shape defined by points
 */
export interface ProfileShape {
  /** Array of points defining the profile */
  points: Point2D[];
  
  /**
   * Converts profile to polygon representation
   * @param closePath - Whether to close the path by repeating first point
   */
  toPolygon(closePath?: boolean): Point2D[];
}

/**
 * Swing direction lookup table for coordinate scaling
 */
export interface SwingScaleEntry {
  x: number;
  y: number;
}

/**
 * Serialized opening data
 */
export interface OpeningData {
  /** Face collections by type */
  faces: {
    [type in OpeningFaceType]?: string[]; // Array of face IDs
  };
  /** Animation data */
  animations?: Array<{
    type: string;
    angle?: number;
    anchor?: Point3D;
    axis?: Point3D;
  }>;
  /** Sub-category identifier */
  subCategory?: string;
  /** Profile path definition */
  profile?: string;
  /** Swing direction (0-3) */
  swing?: number;
  /** Door stone material enabled flag */
  _isDoorStoneMaterialEnabled?: boolean;
  /** Default alignment flag */
  _isDefaultAlign?: boolean;
  /** Opening thickness */
  thickness?: number;
  /** Host entity ID */
  host?: string;
  /** Indent distance from wall face */
  indent?: number;
  /** Arch height for arched openings */
  archHeight?: number;
}

/**
 * IO handler for serializing/deserializing Opening entities
 */
export class Opening_IO extends Content_IO {
  /**
   * Gets singleton instance
   */
  static instance(): Opening_IO;

  /**
   * Loads opening data from serialized format
   * @param entity - Target opening entity
   * @param data - Serialized opening data
   * @param entityMap - Map of entity IDs to entities
   */
  load(entity: Opening, data: OpeningData, entityMap: Map<string, Entity>): void;
}

/**
 * Base class for all opening types (doors, windows, niches, holes)
 * Openings are cutouts in walls or slabs that can contain faces and materials
 */
export class Opening extends Content {
  /**
   * Swing direction scale factors for coordinate transformations
   * Maps swing values (0-3) to x/y scale multipliers
   */
  static readonly SWING_SCALE_TABLE: readonly SwingScaleEntry[];

  // ==================== Core Properties ====================

  /**
   * Profile path definition (SVG-like path string)
   * Defines the 2D shape of the opening
   */
  profile: string;

  /**
   * Swing direction of the opening (0-3)
   * - 0: Right swing, outward
   * - 1: Right swing, inward
   * - 2: Left swing, inward
   * - 3: Left swing, outward
   */
  swing: number;

  /**
   * Whether the opening is currently in opened state
   */
  isOpened: boolean;

  /**
   * Opening angle in degrees (-90 to 90)
   * Positive values open outward, negative values open inward
   */
  angle: number;

  /**
   * Rotation anchor point in 3D space [x, y, z]
   */
  anchor: Point3D;

  /**
   * Rotation axis direction vector [x, y, z]
   */
  anchorAxis: Point3D;

  /**
   * Thickness of the opening (wall width or slab thickness)
   */
  thickness: number;

  /**
   * Height of arch for arched openings
   */
  archHeight: number;

  /**
   * Y-axis length in local coordinates
   * For wall openings, returns thickness
   */
  readonly YLength: number;

  /**
   * Z-axis length in local coordinates
   * For slab openings, returns thickness
   */
  readonly ZLength: number;

  /**
   * Y-axis size including scale
   */
  readonly YSize: number;

  /**
   * Z-axis size including scale
   */
  readonly ZSize: number;

  /**
   * Whether door stone material is enabled for bottom face
   */
  doorStoneMaterialEnabled: boolean;

  /**
   * Whether using default alignment for door stone
   */
  isDefaultAlign: boolean;

  /**
   * Material applied to bottom face
   */
  bottomFaceMaterial: Material | undefined;

  /**
   * Host face that contains this opening
   */
  hostFace: Face | undefined;

  /**
   * Top faces of the opening
   */
  topFaces: FaceCollection;

  /**
   * Bottom faces of the opening
   */
  bottomFaces: FaceCollection;

  /**
   * Side faces of the opening
   */
  sideFaces: FaceCollection;

  /**
   * Frame width (from metadata or default)
   */
  readonly frameWidth: number;

  /**
   * Indent distance from wall face
   */
  indent: number;

  // ==================== Signals ====================

  /**
   * Emitted when a pocket is added to the opening
   */
  signalPocketAdded: Signal<Opening>;

  /**
   * Emitted when a pocket is removed from the opening
   */
  signalPocketRemoved: Signal<Opening>;

  /**
   * Emitted when the host entity changes
   */
  signalHostChanged: Signal<Opening>;

  // ==================== Constructor ====================

  /**
   * Creates a new Opening instance
   * @param tag - Optional entity tag for identification
   */
  constructor(tag?: string);

  // ==================== Profile Methods ====================

  /**
   * Gets the base profile shape of the opening
   * Computed from the center profile points
   */
  readonly baseProfile: ProfileShape | undefined;

  /**
   * Builds a default rectangular profile path
   * Used when no custom profile is specified
   */
  protected _buildDefaultRectangleProfile(): string;

  /**
   * Updates profile based on metadata
   * @param metadata - Content metadata
   */
  updateProfile(metadata: Record<string, unknown>): void;

  /**
   * Updates opening geometry based on parametric modeling
   * @param width - Optional width override
   * @param height - Optional height override
   * @param archHeight - Optional arch height override
   */
  updateByPM(width?: number, height?: number, archHeight?: number): void;

  // ==================== Face Management ====================

  /**
   * All faces organized by type
   */
  readonly faces: OpeningFaces;

  /**
   * Adds a face to the specified face collection
   * @param faceType - Type of face (top/bottom/side)
   * @param face - Face entity to add
   */
  addFace(faceType: OpeningFaceType, face: Face): void;

  /**
   * Gets all faces of a specific type
   * @param faceType - Type of face to retrieve
   */
  getFaces(faceType: OpeningFaceType): Face[] | undefined;

  /**
   * Gets the face type for a given face entity
   * @param face - Face to find type for
   */
  getFaceType(face: Face): OpeningFaceType | undefined;

  /**
   * Sets all faces of a specific type
   * @param faceType - Type of face to set
   * @param faces - Array of faces to set
   */
  setFaces(faceType: OpeningFaceType, faces: Face[]): void;

  /**
   * Marks all faces as needing geometry update
   */
  dirtyFaces(): void;

  /**
   * Iterates over all faces (side and optionally bottom)
   * @param callback - Function to call for each face
   * @param context - Optional context for callback
   */
  forEachFace(callback: (face: Face) => void, context?: unknown): void;

  /**
   * Gets the bottom face if it serves as door stone
   */
  getDoorStoneFace(): Face | undefined;

  /**
   * Gets the bottom face of the opening
   */
  getBottomFace(): Face | undefined;

  /**
   * Gets bottom face if at zero height and door stone disabled
   */
  getZeroHeightBottomFace(): Face | undefined;

  /**
   * Gets default material for bottom face
   */
  protected _getBottomFaceDefaultMaterial(): Material;

  // ==================== Door Stone Methods ====================

  /**
   * Checks if door stone material is enabled
   */
  isDoorStoneMaterialEnabled(): boolean;

  /**
   * Sets door stone material enabled status
   * @param enabled - Whether to enable door stone material
   */
  setDoorStoneMaterialStatus(enabled: boolean): void;

  /**
   * Toggles door stone alignment side
   */
  toggleDoorStoneAlignSide(): void;

  /**
   * Gets door stone alignment side status
   */
  getDoorStoneAlignSideStatus(): boolean;

  /**
   * Gets material applied to bottom face
   */
  getBottomFaceMaterial(): Material | undefined;

  /**
   * Sets material for bottom face
   * @param material - Material to apply
   */
  setBottomFaceMaterial(material: Material | undefined): void;

  /**
   * @deprecated Use doorStoneMaterialEnabled property
   */
  _isDoorStoneMaterialEnabled: boolean;

  // ==================== Geometry Methods ====================

  /**
   * Resizes the opening
   * @param xSize - Width
   * @param ySize - Depth (or thickness for wall openings)
   * @param zSize - Height (or thickness for slab openings)
   * @param archHeight - Optional arch height
   */
  resize(xSize: number, ySize: number, zSize: number, archHeight?: number): void;

  /**
   * Gets the thickness of the opening
   */
  getThickness(): number;

  /**
   * Sets the thickness of the opening
   * @param thickness - New thickness value
   */
  setThickness(thickness: number): void;

  /**
   * Gets indent direction vector
   */
  getIndentDirection(): { x: number; y: number };

  /**
   * Gets indent offset vector
   */
  getIndentVector(): { x: number; y: number };

  // ==================== Opening State Methods ====================

  /**
   * Checks if the opening can be opened (e.g., doors/windows)
   */
  canOpen(): boolean;

  /**
   * Gets the current opening angle with swing adjustment
   */
  protected _getAngle(): number;

  /**
   * Validates that the opening state is consistent
   */
  protected _validateOpenStatus(): boolean;

  /**
   * Flips the swing direction
   * @param direction - Flip direction flag
   */
  protected _flipSwing(direction: boolean): void;

  // ==================== Metadata Methods ====================

  /**
   * Checks if parametric modeling is supported
   */
  supportPM(): boolean;

  /**
   * Initializes opening from content metadata
   * @param metadata - Content metadata
   * @param parent - Optional parent entity
   * @param skipProfile - Whether to skip profile initialization
   * @param skipPM - Whether to skip parametric modeling update
   */
  initByMeta(
    metadata: Record<string, unknown>,
    parent?: Entity,
    skipProfile?: boolean,
    skipPM?: boolean
  ): void;

  /**
   * Migrates content metadata to new format
   * @param metadata - Metadata to migrate
   */
  migrateContentMetaData(metadata: Record<string, unknown>): void;

  /**
   * Gets metadata keys that should be filtered during serialization
   */
  getMetadataFilterKeys(): Set<string>;

  // ==================== Material Methods ====================

  /**
   * Iterates over all materials used by the opening
   * @param callback - Function to call for each material
   * @param context - Optional context for callback
   */
  forEachMaterial(callback: (material: Material) => void, context?: unknown): void;

  // ==================== Lifecycle Methods ====================

  /**
   * Verifies the integrity of the opening and its faces
   */
  verify(): boolean;

  /**
   * Destroys the opening and cleans up resources
   */
  destroy(): void;

  /**
   * Gets the IO handler for this opening type
   */
  getIO(): Opening_IO;

  // ==================== Internal Methods ====================

  /**
   * Initializes face collections
   */
  protected _initFaceSets(): void;

  /**
   * Internal setter for thickness with face position updates
   */
  protected _setThickness(thickness: number): void;

  /**
   * Internal method to get faces by type
   */
  protected _getFaces(faceType: OpeningFaceType): FaceCollection;

  /**
   * Internal method to set faces object
   */
  protected _setFacesObj(faceType: OpeningFaceType, faces: FaceCollection): void;

  /**
   * Internal method to update faces
   */
  protected _setFaces(faceType: OpeningFaceType, faces: FaceCollection): void;

  /**
   * Internal setter for bottom face material
   */
  protected _setBottomFaceMaterial(material: Material | undefined): void;

  /**
   * Hook for door stone material status changes
   */
  protected _onDoorStoneMaterialStatusChanged(): void;

  /**
   * Hook for default alignment changes
   * @param newValue - New alignment value
   * @param oldValue - Previous alignment value
   */
  protected _onDefaultAlignChanged(newValue: boolean, oldValue: boolean): void;

  // ==================== Private Fields ====================

  /** @internal */
  private __profile: string;
  /** @internal */
  private __swing: number;
  /** @internal */
  private __isOpened: boolean;
  /** @internal */
  private __angle: number;
  /** @internal */
  private __anchor: Point3D;
  /** @internal */
  private __anchorAxis: Point3D;
  /** @internal */
  private __thickness: number;
  /** @internal */
  private __archHeight: number;
  /** @internal */
  private __doorStoneMaterialEnabled: boolean;
  /** @internal */
  private __isDefaultAlign: boolean;
  /** @internal */
  private __indent: number;
  /** @internal */
  private _faces: OpeningFaces;
  /** @internal */
  private _baseProfile?: ProfileShape;
  /** @internal */
  private _bottomFace?: Face;
  /** @internal */
  private _bottomFaceMaterial?: Material;
  /** @internal */
  private _bottomFaceDefaultMaterial?: Material;
  /** @internal */
  private _materialSignalHook: SignalHook<unknown>;
  /** @internal */
  private _needUpdateFaces: boolean;
}