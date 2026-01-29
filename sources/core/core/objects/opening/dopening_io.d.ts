/**
 * DOpening module - Handles opening entities (doors, windows, niches) in walls
 * Provides I/O serialization and core opening functionality
 */

import type { Signal, SignalHook } from '../signals';
import type { Entity } from '../entity';
import type { DAssembly, DAssembly_IO } from '../assembly';
import type { Wall } from '../wall';
import type { Face } from '../face';
import type { Floor } from '../floor';
import type { Material } from '../material';
import type { Curve3d, Line3d, Point3d } from '../geometry';
import type { DumpContext, LoadContext } from '../serialization';

/**
 * Face type classification for openings
 */
export enum OpeningFaceType {
  /** Top horizontal face */
  top = 'top',
  /** Bottom horizontal face (doorsill/threshold) */
  bottom = 'bottom',
  /** Vertical side faces (jambs) */
  side = 'side'
}

/**
 * Face set organized by type
 */
export interface FaceSet {
  [faceId: string]: Face;
}

/**
 * Face sets grouped by opening face type
 */
export interface FaceSets {
  [OpeningFaceType.top]: FaceSet;
  [OpeningFaceType.bottom]: FaceSet;
  [OpeningFaceType.side]: FaceSet;
}

/**
 * Shell geometry information for opening
 */
export interface ShellInfo {
  /** Geometry differences/deltas */
  diffs: unknown;
}

/**
 * Cornice cutter information for trim interference
 */
export interface CorniceCutterInfo {
  cutPath: Curve3d[];
  patchLines: Line3d[];
}

/**
 * Baseboard cutter information for trim interference
 */
export interface BaseboardCutterInfo {
  cutPath: Curve3d[];
  patchLines: Line3d[];
}

/**
 * Serialized opening data structure
 */
export interface DOpeningDump {
  /** Wall thickness at opening location */
  thickness?: number;
  /** Material ID for bottom face (doorsill/threshold) */
  bottomFaceMaterial?: string;
  /** Legacy material property */
  doorstoneMaterial?: string;
  /** Host wall entity ID */
  host?: string;
  /** Whether doorstone material is enabled */
  _isDoorStoneMaterialEnabled?: boolean;
  [key: string]: unknown;
}

/**
 * I/O handler for DOpening serialization/deserialization
 * Extends DAssembly_IO to handle opening-specific properties
 */
export declare class DOpening_IO extends DAssembly_IO {
  /**
   * Serialize opening entity to plain object
   * @param entity - Opening entity to dump
   * @param entityMap - Optional entity mapping
   * @param deep - Whether to perform deep clone
   * @param context - Dump context with settings
   * @returns Array of dumped entity data (entity + dependencies)
   */
  dump(
    entity: DOpening,
    entityMap?: Map<string, Entity>,
    deep?: boolean,
    context?: DumpContext
  ): DOpeningDump[];

  /**
   * Deserialize opening entity from plain object
   * @param entity - Opening entity to populate
   * @param data - Serialized opening data
   * @param context - Load context with entity cache
   */
  load(entity: DOpening, data: DOpeningDump, context: LoadContext): void;

  /**
   * Get singleton instance
   */
  static instance(): DOpening_IO;
}

/**
 * Opening entity - Represents holes in walls (doors, windows, niches, etc.)
 * Manages geometry, materials, and relationships with host walls
 */
export declare class DOpening extends DAssembly {
  /**
   * Signal emitted when opening validity changes
   */
  readonly signalValidityChanged: Signal<DOpening>;

  /**
   * Internal hook for material change signals
   * @internal
   */
  protected _materialSignalHook: SignalHook;

  /**
   * Wall thickness at opening location (meters)
   * @internal
   */
  protected __thickness: number;

  /**
   * SVG path string defining opening profile shape
   * @internal
   */
  protected __profile: string;

  /**
   * Front-facing profile curves
   * @internal
   */
  protected __frontProfile: Curve3d[];

  /**
   * Arch height for arched openings (meters)
   * @internal
   */
  protected __archHeight: number;

  /**
   * Whether doorstone/threshold material is enabled
   * @internal
   */
  protected __doorStoneMaterialEnabled: boolean;

  /**
   * Whether opening uses default alignment to wall side
   * @internal
   */
  protected __isDefaultAlign: boolean;

  /**
   * Face sets organized by type (top/bottom/side)
   * @internal
   */
  protected _faces: FaceSets;

  /**
   * Pocket X dimension (horizontal, meters)
   * @internal
   */
  protected _pocketXSize: number;

  /**
   * Pocket Y dimension (vertical, meters)
   * @internal
   */
  protected _pocketYSize: number;

  /**
   * Material applied to bottom face (doorsill/threshold)
   * @internal
   */
  protected _bottomFaceMaterial?: Material;

  /**
   * Host wall face that contains this opening
   */
  hostFace?: Face;

  /**
   * Door swing direction/configuration
   */
  swing?: string;

  /**
   * Create new opening entity
   * @param id - Unique entity identifier
   * @param doc - Parent document
   */
  constructor(id?: string, doc?: unknown);

  /**
   * Initialize face sets for top/bottom/side
   * @internal
   */
  protected _initFaceSets(): void;

  /**
   * Build opening geometry and cut hole in host wall
   */
  build(): void;

  /**
   * Update mixed paint materials and align faces to host
   */
  updateMixPaintAndAlignFaces(): void;

  /**
   * Set wall thickness
   * @param thickness - Thickness in meters
   * @internal
   */
  protected _setThickness(thickness: number): void;

  /**
   * Get shell geometry information
   */
  get shellInfos(): ShellInfo;

  /**
   * Get bottom profile curves
   */
  get bottomProfile(): Curve3d[];

  /**
   * Handle doorstone material status change
   * @internal
   */
  protected _onDoorStoneMaterialStatusChanged(): void;

  /**
   * Whether this opening supports paint materials
   */
  supportPM(): boolean;

  /**
   * Get associated pocket entity if exists
   */
  getPocket(): Entity | undefined;

  /**
   * Get primary bottom face (doorsill/threshold)
   */
  getBottomFace(): Face | undefined;

  /**
   * Set host wall entity
   * @param host - Wall entity
   * @internal
   */
  protected _setHost(host: Wall): void;

  /**
   * Handle host wall assignment change
   */
  onHostChanged(): void;

  /**
   * Get all bottom faces (may be multiple for complex openings)
   */
  getBottomFaces(): Face[];

  /**
   * Get IDs of all faces belonging to this opening
   */
  get faceIds(): string[];

  /**
   * Update host wall face reference and material bindings
   */
  updateHostFace(): void;

  /**
   * Apply materials to opening faces
   * @param applyToBottom - Whether to apply to bottom faces
   * @param applyToSides - Whether to apply to side faces
   * @internal
   */
  protected _applyMaterial(applyToBottom?: boolean, applyToSides?: boolean): void;

  /**
   * Get the host wall face containing this opening
   * @param wall - Host wall entity
   * @internal
   */
  protected _getHostFace(wall: Wall): Face | undefined;

  /**
   * Handle default alignment setting change
   * @param newValue - New alignment value
   * @param oldValue - Previous alignment value
   * @internal
   */
  protected _onDefaultAlignChanged(newValue: boolean, oldValue: boolean): void;

  /**
   * Refresh floor geometry affected by this opening
   */
  refreshFloorGeometry(): void;

  /**
   * Check if doorstone material is enabled
   */
  isDoorStoneMaterialEnabled(): boolean;

  /**
   * Get doorstone alignment side status
   */
  getDoorStoneAlignSideStatus(): boolean;

  /**
   * Get material applied to bottom face
   */
  getBottomFaceMaterial(): Material | undefined;

  /**
   * Get bottom face only if opening is at zero height (floor level)
   */
  getZeroHeightBottomFace(): Face | undefined;

  /**
   * Set material for bottom face (doorsill/threshold)
   * @param material - Material to apply
   */
  setBottomFaceMaterial(material: Material): void;

  /**
   * Internal setter for bottom face material
   * @param material - Material to apply
   * @internal
   */
  protected _setBottomFaceMaterial(material: Material): void;

  /**
   * Migrate bottom face material during data migration
   * @param material - Material to migrate
   * @internal
   */
  migrationBottomFaceMaterial(material: Material): void;

  /**
   * Set doorstone material enabled status
   * @param enabled - Whether to enable doorstone material
   */
  setDoorStoneMaterialStatus(enabled: boolean): void;

  /**
   * Update mixed paint materials on all faces
   * @param excludeDoorstone - Whether to exclude doorstone face
   */
  updateFaceMixPaint(excludeDoorstone?: boolean): void;

  /**
   * Get doorstone face if applicable (bottom face at floor level with doorstone enabled)
   */
  getDoorStoneFace(): Face | undefined;

  /**
   * Get floors that need refresh due to opening changes
   * @param existingFloors - Already collected floors to avoid duplicates
   */
  getRefreshFloors(existingFloors?: Floor[]): Floor[];

  /**
   * Get floors connected to this opening
   * @param existingFloors - Already collected floors to avoid duplicates
   */
  getConnectFloors(existingFloors?: Floor[]): Floor[];

  /**
   * Check if opening needs geometry refresh
   * @internal
   */
  protected _needRefresh(): boolean;

  /**
   * Iterate over all opening faces
   * @param callback - Function called for each face
   * @param context - Optional callback context
   */
  forEachFace(callback: (face: Face) => void, context?: unknown): void;

  /**
   * Get top faces (header)
   */
  get topFaces(): Face[];

  /**
   * Get bottom faces (doorsill/threshold)
   */
  get bottomFaces(): Face[];

  /**
   * Get side faces (jambs)
   */
  get sideFaces(): Face[];

  /**
   * Get faces by type
   * @param type - Face type to retrieve
   */
  getFaces(type: OpeningFaceType): Face[];

  /**
   * Get all faces as array
   */
  get faceList(): Face[];

  /**
   * Get face type classification
   * @param face - Face entity or ID
   */
  getFaceType(face: Face | string): OpeningFaceType | undefined;

  /**
   * Update mixed paint material on specific face
   * @param face - Face to update
   * @internal
   */
  protected _updateFaceMixpaint(face: Face): void;

  /**
   * Check if opening is contained within a room face
   * @param face - Room face to check
   * @param strict - Strict containment check
   */
  isContentInRoom(face: Face, strict?: boolean): boolean;

  /**
   * Set pocket dimensions
   * @param xSize - Horizontal size (meters)
   * @param ySize - Vertical size (meters)
   */
  setPocketSize(xSize: number, ySize: number): void;

  /**
   * Get I/O handler instance
   */
  getIO(): DOpening_IO;

  /**
   * Get cornice cutter information for trim interference
   * @param context - Calculation context
   */
  getCorniceCutterInfo(context: unknown): CorniceCutterInfo[];

  /**
   * Get baseboard cutter information for trim interference
   * @param context - Calculation context
   */
  getBaseboardCutterInfo(context: unknown): BaseboardCutterInfo[];

  /**
   * Get bottom profile curves for face holes
   */
  getFaceHoleBottomProfile(): Curve3d[][];

  /**
   * Offset opening cut path for pocket clearance
   * @param path - Original cut path
   * @param offset - Offset distance
   * @param context - Calculation context
   * @internal
   */
  protected offsetOpeningCutPath(
    path: Curve3d[],
    offset: number,
    context: unknown
  ): Curve3d[];

  /**
   * Check if pocket can be added to this opening
   */
  canAddPocket(): boolean;

  /**
   * Get linked faces for this opening
   */
  get linkFaces(): Face[];

  /**
   * Opening profile path (auto-generated if not set)
   * SVG path string defining the opening shape
   */
  profile: string;

  /**
   * Wall thickness at opening location (meters)
   */
  thickness: number;

  /**
   * Front-facing profile curves
   */
  get frontProfile(): Curve3d[];

  /**
   * Arch height for arched openings (meters)
   */
  archHeight: number;

  /**
   * Whether doorstone/threshold material is enabled
   */
  doorStoneMaterialEnabled: boolean;

  /**
   * Whether opening uses default alignment to wall side
   */
  isDefaultAlign: boolean;

  /**
   * Material applied to bottom face (doorsill/threshold)
   */
  bottomFaceMaterial: Material | undefined;
}