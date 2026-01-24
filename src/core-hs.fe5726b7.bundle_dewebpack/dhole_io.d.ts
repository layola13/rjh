import type { Vector2 } from './Vector2';
import type { Entity } from './Entity';
import type { ContentBase, ContentBase_IO } from './ContentBase';
import type { Face } from './Face';
import type { Wall, WallFaceType } from './Wall';
import type { Material } from './Material';
import type { SignalHook } from './SignalHook';

/**
 * Represents the size of a pocket hole opening
 */
export interface PocketSize {
  /** Horizontal size of the pocket */
  x?: number;
  /** Vertical size of the pocket */
  y?: number;
}

/**
 * Position in 3D space
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Rotation angles in 3D space (in degrees)
 */
export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Size dimensions in 3D space
 */
export interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Parameters for updating a DHole instance
 */
export interface DHoleUpdateParams {
  /** Profile path string defining the hole shape */
  profile?: string;
  /** Position of the hole */
  position?: Position3D;
  /** Size of the hole */
  size?: Size3D;
  /** Rotation of the hole */
  rotation?: Rotation3D;
  /** Pocket dimensions */
  pocket?: PocketSize;
}

/**
 * Serialized representation of a Pocket
 */
export interface PocketDump {
  XSize: number;
  YSize: number;
}

/**
 * Serialized representation of a DHole
 */
export interface DHoleDump {
  /** Profile path string */
  profile: string;
  /** Array of side face entity IDs */
  sideFaces: string[];
  /** Array of bottom face entity IDs */
  bottomFaces: string[];
  /** Host face entity ID (optional) */
  hostFace?: string;
  /** Pocket size data */
  pocket: PocketDump;
  /** Host wall entity ID (optional) */
  host?: string;
  /** Bottom face material ID (optional) */
  bottomFaceMaterial?: string;
  /** Legacy doorstone material ID (optional) */
  doorstoneMaterial?: string;
  /** Whether doorstone material is enabled */
  _isDoorStoneMaterialEnabled?: boolean;
  /** Whether using default alignment */
  _isDefaultAlign?: boolean;
}

/**
 * Options for dump/serialization operations
 */
export interface DumpOptions {
  /** Set of already dumped entity IDs to avoid duplication */
  dumpedEntities?: Set<string>;
}

/**
 * Pocket class representing the recessed area dimensions of a hole
 */
export declare class Pocket {
  private _XSize: number;
  private _YSize: number;

  /**
   * Creates a new Pocket instance
   * @param xSize - Horizontal size (default: 0)
   * @param ySize - Vertical size (default: 0)
   */
  constructor(xSize?: number, ySize?: number);

  /**
   * Updates pocket dimensions
   * @param size - New size values
   */
  update(size: PocketSize): void;

  /**
   * Gets the horizontal size
   */
  get XSize(): number;

  /**
   * Gets the vertical size
   */
  get YSize(): number;
}

/**
 * IO handler for DHole serialization and deserialization
 */
export declare class DHole_IO extends ContentBase_IO {
  private static _DHole_IO_instance?: DHole_IO;

  /**
   * Gets the singleton instance
   */
  static instance(): DHole_IO;

  /**
   * Serializes a DHole entity to a plain object
   * @param entity - The DHole entity to dump
   * @param callback - Optional callback invoked after dump
   * @param deep - Whether to perform deep clone (default: true)
   * @param options - Additional dump options
   * @returns Array of serialized entities
   */
  dump(
    entity: DHole,
    callback?: (result: unknown[], entity: DHole) => void,
    deep?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes data into a DHole entity
   * @param entity - The target DHole entity
   * @param data - Serialized DHole data
   * @param loadContext - Context object for entity resolution
   */
  load(entity: DHole, data: DHoleDump, loadContext: unknown): void;
}

/**
 * DHole class representing a door or window opening in a wall
 */
export declare class DHole extends ContentBase {
  /** Profile path string defining the hole shape */
  private __profile: string;
  
  /** Pocket dimensions */
  private __pocket: Pocket;
  
  /** Side faces of the hole */
  private __sideFaces: Face[];
  
  /** Bottom faces of the hole */
  private __bottomFaces: Face[];
  
  /** Host face that the hole belongs to */
  private __hostFace?: Face;
  
  /** Host wall containing this hole */
  private __host?: Wall;
  
  /** Whether doorstone material is enabled */
  private __doorStoneMaterialEnabled: boolean;
  
  /** Whether using default alignment */
  private __isDefaultAlign: boolean;
  
  /** Material applied to bottom face */
  private _bottomFaceMaterial?: Material;
  
  /** Signal hook for material updates */
  private _materialSignalHook: SignalHook<this>;

  /**
   * Gets the IO handler for this entity type
   */
  getIO(): DHole_IO;

  /**
   * Updates the hole with new parameters
   * @param params - Update parameters
   */
  updateHole(params: DHoleUpdateParams): void;

  /**
   * Sets the pocket dimensions
   * @param size - New pocket size
   */
  setPocket(size?: PocketSize): void;

  /**
   * Marks geometry as dirty and triggers update
   */
  dirtyGeometry(): void;

  /**
   * Creates or updates side faces based on profile
   * @private
   */
  private _createOrUpdateSideFaces(): void;

  /**
   * Sorts faces into side and bottom categories
   * @private
   */
  private _sortFaces(): void;

  /**
   * Gets all bottom-facing faces
   * @private
   */
  private _getBottomFaces(): Face[];

  /**
   * Sets the material for the bottom face
   * @param material - Material to apply
   */
  setBottomFaceMaterial(material: Material): void;

  /**
   * Internal method to apply bottom face material
   * @private
   */
  private _setBottomFaceMaterial(material: Material): void;

  /**
   * Updates mix paint materials on faces
   * @param excludeDoorstone - Whether to exclude doorstone face (default: false)
   */
  updateFaceMixPaint(excludeDoorstone?: boolean): void;

  /**
   * Updates mix paint on a specific face
   * @private
   */
  private _updateFaceMixpaint(face: Face): void;

  /**
   * Assigns this hole to a wall
   * @param wall - Target wall or undefined to unassign
   */
  assignTo(wall?: Wall): void;

  /**
   * Checks if pocket can be added
   * @returns Always false for DHole
   */
  canAddPocket(): false;

  /**
   * Gets the host wall containing this hole
   */
  getHost(): Wall | undefined;

  /**
   * Gets the rotation of the hole (inherited from host if present)
   */
  get rotation(): number;

  /**
   * Marks position as dirty and triggers update
   * @param propagate - Whether to propagate to children
   */
  dirtyPosition(propagate?: boolean): void;

  /**
   * Gets the pocket dimensions
   */
  getPocket(): Pocket;

  /**
   * Gets the type of a given face
   * @param face - Face to check
   */
  getFaceType(face: Face): WallFaceType;

  /**
   * Gets the host face for a given wall
   * @param wall - Wall to search
   */
  getHostFace(wall: Wall): Face | undefined;

  /**
   * Toggles doorstone alignment side
   */
  toggleDoorStoneAlignSide(): void;

  /**
   * Gets the current doorstone alignment status
   */
  getDoorStoneAlignSideStatus(): boolean;

  /**
   * Handler for default alignment changes
   * @private
   */
  private _onDefaultAlignChanged(oldValue: boolean, newValue: boolean): void;

  /**
   * Internal method to find host face
   * @private
   */
  private _getHostFace(wall: Wall): Face | undefined;

  /**
   * Updates the host face reference and applies materials
   * @private
   */
  private _updateHostFace(): void;

  /**
   * Applies materials to hole faces based on host face
   * @param applyToBottom - Whether to apply to bottom face (default: true)
   * @param applyToSides - Whether to apply to side faces (default: true)
   * @private
   */
  private _applyMaterial(applyToBottom?: boolean, applyToSides?: boolean): void;

  /**
   * Called when a field value changes
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Iterates over all materials used by this hole
   * @param callback - Function called for each material
   * @param context - Context for callback invocation
   */
  forEachMaterial(callback: (material: Material) => void, context?: unknown): void;

  /**
   * Gets the doorstone face if enabled and at zero height
   */
  getDoorStoneFace(): Face | undefined;

  /**
   * Gets the primary bottom face
   */
  getBottomFace(): Face | undefined;

  /**
   * Gets all side faces
   */
  getSideFaces(): Face[];

  /**
   * Refreshes the geometry of connected floor faces
   */
  refreshFloorGeometry(): void;

  /**
   * Gets the bottom face when at zero height and doorstone disabled
   */
  getZeroHeightBottomFace(): Face | undefined;

  /**
   * Checks if doorstone material is enabled
   */
  isDoorStoneMaterialEnabled(): boolean;

  /**
   * Sets the doorstone material enabled status
   * @param enabled - New status
   */
  setDoorStoneMaterialStatus(enabled: boolean): void;

  /**
   * Gets the bottom face material
   */
  getBottomFaceMaterial(): Material | undefined;

  /**
   * Handler for doorstone material status changes
   * @private
   */
  private _onDoorStoneMaterialStatusChanged(): void;

  /**
   * Checks if fields can be transacted
   * @returns Always false for DHole
   */
  canTransactField(): false;

  /**
   * Gets the proxy object for this entity
   */
  getProxyObject(): unknown;

  // Decorated EntityField properties
  
  /** Profile path string */
  profile: string;
  
  /** Host wall */
  host?: Wall;
  
  /** Pocket dimensions */
  pocket: Pocket;
  
  /** Side faces array */
  sideFaces: Face[];
  
  /** Bottom faces array */
  bottomFaces: Face[];
  
  /** Host face reference */
  hostFace?: Face;
  
  /** Doorstone material enabled flag */
  doorStoneMaterialEnabled: boolean;
  
  /** Default alignment flag */
  isDefaultAlign: boolean;
  
  /** Bottom face material */
  bottomFaceMaterial?: Material;
}