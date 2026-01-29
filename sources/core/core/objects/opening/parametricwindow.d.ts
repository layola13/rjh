/**
 * Parametric window module providing window component management and IO operations.
 * Handles window parameters, parts, and host wall interactions.
 */

import { Content, Content_IO } from './Content';
import { Signal, SignalHook } from './Signal';
import { EntityField } from './EntityField';
import { Wall } from './Wall';
import { WindowFrame, WindowSill, WindowPocket, WindowWall, WindowCeiling, WindowHole } from './WindowComponents';

/**
 * Flag enumeration for parametric window display states.
 */
export enum ParametricWindowFlagEnum {
  /** Hide dimension annotations */
  dimensionOff = 256,
  /** Enable hover highlight state */
  hoverOn = 512
}

/**
 * Parameter enumeration for parametric window dimensions.
 */
export enum ParametricWindowParamsEnum {
  /** Side A dimension (typically width) */
  sideA = 2,
  /** Side B dimension */
  sideB = 4,
  /** Side C dimension */
  sideC = 8,
  /** Side D dimension */
  sideD = 16,
  /** Window height */
  height = 32,
  /** Elevation above floor */
  elevation = 64
}

/**
 * Window parameters interface defining dimensional and display properties.
 */
export interface WindowParameters {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  sideD?: number;
  height?: number;
  elevation?: number;
  indent?: number;
  showPocket?: boolean;
}

/**
 * Part information structure for window components.
 */
export interface PartInfo {
  partName: string;
  type?: string;
  [key: string]: unknown;
}

/**
 * Collection of part information indexed by part name.
 */
export interface PartsInfoCollection {
  boundings?: {
    outline: Array<{ x: number; y: number }>;
  };
  [partName: string]: unknown;
}

/**
 * Wall geometric information for window placement.
 */
export interface WallInfo {
  /** Inner intersection point at 'to' end */
  innerTo: THREE.Vector3;
  /** Outer intersection point at 'from' end */
  outerFrom: THREE.Vector3;
  /** Wall thickness */
  width: number;
  /** Wall direction vector */
  direction: THREE.Vector3;
  /** Wall length */
  length: number;
  /** Indicates if wall is reversed */
  reversed?: boolean;
  /** Next connected wall */
  next?: Wall;
  /** Outer wall side type */
  outerWallSide?: number;
}

/**
 * Side data structure describing window opening geometry.
 */
export interface SideData {
  /** Outer 'from' point */
  outerFrom: THREE.Vector3;
  /** Inner 'from' point */
  innerFrom: THREE.Vector3;
  /** Center 'from' point */
  from: THREE.Vector3;
  /** Outer 'to' point */
  outerTo: THREE.Vector3;
  /** Inner 'to' point */
  innerTo: THREE.Vector3;
  /** Center 'to' point */
  to: THREE.Vector3;
  /** Whether attached to wall */
  isWall: boolean;
  /** Opening height */
  height: number;
  /** Opening width */
  width: number;
  /** Elevation above floor */
  elevation: number;
}

/**
 * Material data interface for textures and appearance.
 */
export interface MaterialData {
  seekId: string;
  textureURI: string;
  tileSize_x: number;
  tileSize_y: number;
  offsetX: number;
  offsetY: number;
  flipX: boolean;
  flipY: boolean;
  rotation: number;
  wrap: number;
  color: number;
  seamColor: string;
  seamWidth: number;
  isCustomized: boolean;
  seamFillerSupported: boolean;
  userDefined: unknown;
  defaultTextureURI: string;
  normalTexture?: string;
}

/**
 * Profile data for window component cross-sections.
 */
export interface ProfileData {
  seekId: string;
  normalTexture: string;
  profile: string;
  profileSizeX: number;
  profileSizeY: number;
  thumbnail: string;
}

/**
 * Window pocket parameters.
 */
export interface WindowPocketParameters {
  type: string;
  partName: string;
  insideThickness: number;
  profileData: ProfileData;
  materialData: MaterialData;
}

/**
 * BOM (Bill of Materials) data for manufacturing.
 */
export interface BOMData {
  material?: MaterialData;
  height?: number;
  area?: number;
}

/**
 * Specification data containing parameters and child models.
 */
export interface SpecData {
  parameters: Record<string, unknown>;
  models: Array<Record<string, unknown>>;
}

/**
 * IO handler for serializing and deserializing ParametricWindow instances.
 */
export declare class ParametricWindow_IO extends Content_IO {
  /**
   * Serialize a parametric window instance to JSON.
   * @param entity - The window entity to serialize
   * @param callback - Optional callback after serialization
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Array of serialized data objects
   */
  dump(
    entity: ParametricWindow,
    callback?: (data: unknown[], entity: ParametricWindow) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize JSON data into a parametric window instance.
   * @param entity - Target entity to populate
   * @param data - Serialized window data
   * @param options - Deserialization options
   */
  load(entity: ParametricWindow, data: Record<string, unknown>, options?: Record<string, unknown>): void;

  /**
   * Get singleton instance of the IO handler.
   */
  static instance(): ParametricWindow_IO;
}

/**
 * Parametric window component providing configurable window openings in walls.
 * Manages window frames, sills, pockets, and geometric relationships with host walls.
 */
export declare class ParametricWindow extends Content {
  /** Internal window parameters */
  private __parameters: WindowParameters;
  
  /** Update flag indicating geometry rebuild needed */
  private __needUpdate: boolean;
  
  /** Information about window parts and their geometry */
  partsInfo: PartsInfoCollection;
  
  /** Preview parameters for temporary display */
  private _previewParams?: WindowParameters;
  
  /** Signal dispatched when a window part changes */
  readonly signalPartChanged: Signal<unknown>;
  
  /** Signal dispatched when a part is added */
  readonly signalPartAdded: Signal<unknown>;
  
  /** Signal dispatched when host wall changes */
  readonly signalHostChanged: Signal<{ oldHost: Wall | null; newHost: Wall | null }>;
  
  /** Hook for listening to host material changes */
  private hostMaterialSignalHook: SignalHook;

  /**
   * Create a new parametric window.
   * @param id - Unique identifier
   * @param metadata - Optional metadata object
   */
  constructor(id?: string, metadata?: Record<string, unknown>);

  /** Get side A dimension */
  get sideA(): number | undefined;

  /** Get side B dimension */
  get sideB(): number | undefined;

  /** Get side C dimension */
  get sideC(): number | undefined;

  /** Get side D dimension */
  get sideD(): number | undefined;

  /** Get elevation above floor level */
  get elevation(): number;

  /** Get window height */
  get height(): number | undefined;

  /** Get whether pocket should be displayed */
  get showPocket(): boolean | undefined;

  /** Get preview parameters */
  get previewParams(): WindowParameters | undefined;

  /** Set preview parameters and trigger geometry update */
  set previewParams(value: WindowParameters | undefined);

  /** Get indent (inset) distance from wall face */
  get indent(): number;

  /** Window parameters (decorated field) */
  @EntityField()
  parameters: WindowParameters;

  /** Update flag (decorated field) */
  @EntityField()
  needUpdate: boolean;

  /**
   * Verify window integrity (must have children and valid geometry).
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Clean up resources and dispose signals.
   */
  destroy(): void;

  /**
   * Initialize from metadata definition.
   * @param metadata - Metadata containing parameters and defaults
   */
  initByMeta(metadata: Record<string, unknown>): void;

  /**
   * Get keys to filter when cloning metadata.
   * @returns Set of keys to exclude
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Migrate content metadata (scalability and metadata).
   * @param metadata - Source metadata
   */
  migrateContentMetaData(metadata: Record<string, unknown>): void;

  /**
   * Initialize parts information from models or children.
   * @param models - Optional array of part models
   * @returns Parts info collection
   */
  private _initPartsInfo(models?: PartInfo[]): PartsInfoCollection;

  /**
   * Get geometric information about a wall.
   * @param wall - Wall entity
   * @returns Wall geometry info or undefined
   */
  private _getWallInfo(wall: Wall): WallInfo | undefined;

  /**
   * Construct side data for window opening geometry.
   * @param outerFrom - Outer starting point
   * @param outerTo - Outer ending point
   * @param innerFrom - Inner starting point
   * @param innerTo - Inner ending point
   * @param width - Opening width
   * @param isWall - Whether on a wall
   * @param elevation - Optional elevation override
   * @returns Side geometry data
   */
  private _constructSideData(
    outerFrom: THREE.Vector3,
    outerTo: THREE.Vector3,
    innerFrom: THREE.Vector3,
    innerTo: THREE.Vector3,
    width: number,
    isWall: boolean,
    elevation?: number
  ): SideData;

  /**
   * Get IO handler for serialization.
   * @returns IO handler instance
   */
  getIO(): ParametricWindow_IO;

  /**
   * Check if window is valid (has parent validity and children).
   * @returns True if valid
   */
  isValid(): boolean;

  /**
   * Set host wall and update openings.
   * @param host - New host wall
   */
  protected _setHost(host: Wall | null): void;

  /**
   * Get the wall face that hosts this window.
   * @param wall - Host wall
   * @returns Wall face or null
   */
  getHostFace(wall: Wall): unknown | null;

  /**
   * Adjust attached contents when parts info changes.
   * @param oldPartsInfo - Previous parts info
   * @param newPartsInfo - New parts info
   */
  protected _adjustAttachedContents(oldPartsInfo: PartsInfoCollection, newPartsInfo: PartsInfoCollection): void;

  /**
   * Check if a content can be added as child.
   * @param content - Content to check
   * @returns True if can be added
   */
  canAddContent(content: unknown): boolean;

  /**
   * Add window openings to host walls.
   */
  addOpenings(): void;

  /**
   * Remove window openings from host walls.
   */
  removeOpenings(): void;

  /**
   * Refresh internal bounding box from parts info.
   */
  refreshBoundInternal(): void;

  /**
   * Get specification data (parameters and models).
   * @returns Spec data object
   */
  getSpecData(): SpecData;

  /**
   * Handle field change events.
   * @param fieldName - Changed field name
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Rebuild parts information and trigger geometry update.
   */
  rebuildPartsInfo(): void;

  /**
   * Mark geometry as dirty and notify host walls.
   */
  protected _dirtyGeometry(): void;

  /**
   * Notify host walls to update.
   * @param notify - Whether to notify
   */
  protected _notifyHostWalls(notify: boolean): void;

  /**
   * Set a flag on this window and all children.
   * @param flag - Flag to set
   * @param notify - Whether to notify observers
   */
  setFlagOn(flag: number, notify: boolean): void;

  /**
   * Clear a flag on this window and all children.
   * @param flag - Flag to clear
   * @param notify - Whether to notify observers
   */
  setFlagOff(flag: number, notify: boolean): void;

  /**
   * Get Bill of Materials data for manufacturing.
   * @returns BOM data
   */
  getBOMData(): BOMData;

  /**
   * Get all window frame children.
   * @returns Array of window frames
   */
  getWindowFrames(): WindowFrame[];

  /**
   * Get all window sill children.
   * @returns Array of window sills
   */
  getWindowSills(): WindowSill[];

  /**
   * Check if sill is currently visible.
   * @returns True if sill is shown
   */
  isShowSill(): boolean;

  /**
   * Get all window pocket children.
   * @returns Array of window pockets
   */
  getWindowPockets(): WindowPocket[];

  /**
   * Get all window wall children.
   * @returns Array of window walls
   */
  getWindowWalls(): WindowWall[];

  /**
   * Get all window ceiling children.
   * @returns Array of window ceilings
   */
  getWindowCeilings(): WindowCeiling[];

  /**
   * Get all window hole children (openings).
   * @returns Array of window holes
   */
  getWindowHoles(): WindowHole[];

  /**
   * Get default parameters for window pocket component.
   * @returns Default pocket parameters
   */
  static getDefaultWindowPocketParameters(): WindowPocketParameters;

  /**
   * Create child models from metadata definitions.
   * @param models - Model definitions from metadata
   * @param additionalModels - Additional models to create
   * @returns Array of created child models
   */
  protected _createChildModels(models: PartInfo[], additionalModels: PartInfo[]): unknown[];

  /**
   * Mirror the window across an axis.
   * @param axis - Axis to mirror across
   */
  mirror(axis: THREE.Vector3): void;

  /**
   * Calculate intermediate points between two point arrays.
   * @param points1 - First array of points
   * @param points2 - Second array of points
   * @returns Object containing two arrays of intermediate points
   */
  private static _getMiddlePoints(
    points1: Array<{ x: number; y: number }>,
    points2: Array<{ x: number; y: number }>
  ): {
    point1: Array<{ x: number; y: number }>;
    point2: Array<{ x: number; y: number }>;
  };

  /**
   * Build or rebuild parts information from current parameters.
   * @param options - Optional build options
   * @param metadata - Optional metadata override
   */
  protected buildPartsInfo(options?: unknown, metadata?: { previewDirty?: boolean }): void;

  /**
   * Mark preview as dirty and schedule update.
   */
  protected dirtyPreview(): void;

  /**
   * Check if outline uses host absolute positioning.
   * @returns True if using absolute positioning
   */
  protected _isOutlineWithHostAbsolutePosition(): boolean;
}