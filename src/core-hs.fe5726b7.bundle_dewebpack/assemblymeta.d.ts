/**
 * Metadata enumeration keys for design document properties
 */
export enum MetadataEnum {
  /** Design name */
  designName = "name",
  /** Design description */
  description = "description",
  /** Document visibility/access status */
  documentStatus = "status",
  /** Custom attributes object */
  attributes = "attributes",
  /** Unique design identifier */
  designId = "",
  /** 3D thumbnail URL */
  threeDThumbnail = "",
  /** Owner user identifier */
  userId = "",
  /** Additional metadata container */
  meta = "",
  /** 3D image URL */
  image3d = "image3d",
  /** 2D image URL */
  image2d = "image2d",
  /** Version identifier */
  versionId = "",
  /** Asset type classification */
  assetType = "assetType",
  /** Main asset identifier */
  mainAssetId = "mainAssetId",
  /** Original accessory asset identifier */
  originalAccessoryAssetId = "originalAccessoryAssetId",
  /** New accessory asset identifier */
  newAccessoryAssetId = "newAccessoryAssetId",
  /** Removed accessory asset identifier */
  removedAccessoryAssetId = "removedAccessoryAssetId",
  /** Design version number */
  designVersion = "designVersion",
  /** Physical address */
  address = "address",
  /** Basic attribute set */
  basicAttributes = "basicAttributes",
  /** Original apartment identifier */
  originApartmentId = "originApartmentId"
}

/**
 * Document visibility and access status
 */
export enum DocumentStatus {
  /** Private document (owner only) */
  Private = 0,
  /** Publicly accessible document */
  Public = 1,
  /** Soft-deleted document */
  Deleted = 2,
  /** Read-only document */
  Readonly = 5
}

/**
 * Floorplan metadata constants
 */
export enum FloorplanMeta {
  /** Magic identifier for floorplan format */
  magic = "u6tklt3u60yg",
  /** Current floorplan version */
  version = "1.11",
  /** Measurement unit */
  unit = "meter",
  /** Search keywords */
  keywords = "Homestyler web designer editor",
  /** Customization version */
  customizationVersion = "0.2"
}

/**
 * Floorplan version range
 */
export const FloorplanVersion: Readonly<{
  /** Minimum supported version */
  MIN: string;
  /** Maximum supported version */
  MAX: string;
}>;

/**
 * Assembly metadata constants
 */
export enum AssemblyMeta {
  /** Assembly format version */
  version = "0.1",
  /** Origin application */
  origin = "Floorplan web editor",
  /** Magic identifier for assembly format */
  magic = "171bd2f43d70",
  /** Measurement unit */
  unit = "cm"
}

/**
 * Image metadata structure
 */
export interface ImageMeta {
  /** Image URL */
  url?: string;
  [key: string]: unknown;
}

/**
 * Extended metadata container
 */
export interface MetaContainer {
  /** 2D image metadata */
  image2d?: ImageMeta;
  /** Bill of materials */
  bom?: unknown;
  /** 3D image metadata */
  image?: ImageMeta;
  [key: string]: unknown;
}

/**
 * Design metadata object structure
 */
export interface DesignMetadata {
  /** Unique design identifier */
  designId?: string;
  /** Design name */
  designName?: string;
  /** Design description */
  description?: string;
  /** Document access status */
  documentStatus?: DocumentStatus;
  /** 3D image URL */
  image3d?: string;
  /** 2D image URL */
  image2d?: string;
  /** Owner user identifier */
  userId?: string;
  /** Version identifier */
  designVersion?: string;
  /** Extended metadata */
  meta?: MetaContainer;
  /** New accessory asset identifier */
  newAccessoryAssetId?: string;
  /** Original accessory asset identifier */
  originalAccessoryAssetId?: string;
  /** Removed accessory asset identifier */
  removedAccessoryAssetId?: string;
  /** Physical address */
  address?: unknown;
  /** Basic attributes */
  basicAttributes?: unknown;
  /** Original apartment identifier */
  originApartmentId?: string;
  /** Custom attributes map */
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Raw design data from server
 */
export interface RawDesignData {
  /** Design name */
  name?: string;
  /** Design description */
  description?: string;
  /** Document status */
  status?: DocumentStatus;
  /** Owner user identifier */
  userId?: string;
  /** Version identifier */
  versionId?: string;
  /** Extended metadata */
  meta?: MetaContainer;
  /** New accessory asset identifier */
  newAccessoryAssetId?: string;
  /** Original accessory asset identifier */
  originalAccessoryAssetId?: string;
  /** Removed accessory asset identifier */
  removedAccessoryAssetId?: string;
  /** Physical address */
  address?: unknown;
  /** Basic attributes */
  basicAttributes?: unknown;
  /** Original apartment identifier */
  originApartmentId?: string;
  /** Custom attributes (string or array format) */
  attributes?: string | Array<{ free?: string[] }>;
  [key: string]: unknown;
}

/**
 * Changed metadata structure for change notifications
 */
export interface MetadataChanges {
  /** Changed attributes */
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Metadata manager class for design documents
 * Handles storage, retrieval, and change tracking of design metadata
 */
export declare class Metadata {
  private _metadataMap: Map<string, unknown>;
  private _attributes: Map<string, unknown>;
  private _changedValues: Map<string, unknown>;
  private _changedAttributes: Map<string, unknown>;
  private _flushCallbacks: Array<Promise<unknown>>;

  constructor();

  /**
   * Initialize metadata with default values
   */
  init(): void;

  /**
   * Reset metadata to initial state
   */
  reset(): void;

  /**
   * Get metadata value by key
   * @param key - Metadata key
   * @returns Metadata value or undefined
   */
  get(key: string): unknown;

  /**
   * Delete metadata value
   * @param key - Metadata key
   * @param attributeKey - Optional attribute key for nested deletion
   * @returns True if deletion was successful
   */
  delete(key: string, attributeKey?: string): boolean;

  /**
   * Set metadata value
   * @param key - Metadata key
   * @param value - Value to set
   */
  set(key: string, value: unknown): void;

  /**
   * Set a standard metadata value
   * @param key - Metadata key
   * @param value - Value to set
   */
  setValue(key: string, value: unknown): void;

  /**
   * Set a custom attribute value
   * @param key - Attribute key
   * @param value - Value to set
   */
  setAttribute(key: string, value: unknown): void;

  /**
   * Convert metadata to plain object
   * @returns Object representation of metadata
   */
  toObject(): DesignMetadata;

  /**
   * Load metadata from plain object
   * @param data - Object containing metadata
   * @returns This instance for chaining
   */
  fromObject(data: DesignMetadata): this;

  /**
   * Load metadata from raw design data
   * @param designId - Design identifier
   * @param data - Raw design data
   * @returns This instance for chaining
   */
  load(data: RawDesignData): this;

  /**
   * Flush pending changes and notify listeners
   * @returns Promise resolving when all flush callbacks complete
   */
  flush(): Promise<unknown[]>;

  /**
   * Register a callback to be executed on flush
   * @param callback - Promise-based callback
   */
  registerFlushCallback(callback: Promise<unknown>): void;

  /**
   * Unregister a flush callback
   * @param callback - Previously registered callback
   */
  unregisterFlushCallback(callback: Promise<unknown>): void;

  /**
   * Convert raw design data to design metadata object
   * @param designId - Design identifier
   * @param data - Raw design data from server
   * @returns Normalized design metadata
   */
  static getDesignMeta(designId: string | undefined, data: RawDesignData): DesignMetadata;
}