/**
 * Module: GroovingChamferData
 * Provides grooving and chamfer functionality for block entities
 */

import { Entity, Entity_IO } from './Entity';
import { State, Point2DState, Arc2DState, ArrayState } from './State';
import { EntityField } from './decorators';
import { Signal } from './Signal';
import { Logger } from './Logger';

/**
 * Chamfer type enumeration
 */
export enum ChamferType {
  /** Linear chamfer edge */
  Line = 'Line',
  /** Arched chamfer edge */
  Arch = 'Arch'
}

/**
 * Grooving type enumeration
 */
export enum GroovingType {
  /** Vertical grooving pattern */
  VType = 'v_Type',
  /** U-shaped grooving pattern */
  UType = 'u_type'
}

/**
 * Point interface for 2D coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Bounding box interface
 */
export interface BoundingBox {
  x: number;
  x2: number;
  y: number;
  y2: number;
  w: number;
  h: number;
}

/**
 * Material metadata interface
 */
export interface MaterialMetadata {
  [key: string]: unknown;
}

/**
 * Material interface
 */
export interface Material {
  id: string;
  metadata?: MaterialMetadata;
  offsetX?: number;
  normalTexture?: string;
  isUvTransformed(): boolean;
  setUvTransform(transform: unknown): void;
  resetUvTransform(): void;
  isSameUvTransform(other: Material): boolean;
}

/**
 * Property info interface
 */
export interface PropertyInfo {
  id: string;
  state: string;
  line: [string, string];
}

/**
 * Block parameters interface
 */
export interface BlockParameters {
  XLength?: number;
  YLength?: number;
  Rotation?: number;
  Outline?: Point2D[][];
  Origin?: Point2D[][];
}

/**
 * Block creation data interface
 */
export interface BlockCreateData {
  localId: string;
  name: string;
  material: string;
  parameters?: BlockParameters;
}

/**
 * Load options interface
 */
export interface LoadOptions {
  version?: string;
  invalidIds?: string[];
  productsMap?: Map<string, MaterialMetadata>;
}

/**
 * Dump callback type
 */
export type DumpCallback = (data: unknown[], entity: Block) => void;

/**
 * Grooving and chamfer data for block entities
 * Manages chamfer edges, grooving patterns, and custom texture URIs
 */
export declare class GroovingChamferData {
  /** Path defining the chamfer outline */
  chamferPath: Point2D[];
  
  /** Array indicating which edges have chamfer applied (1 = enabled, 0 = disabled) */
  edgesChamferInfo: number[];
  
  /** Width of the chamfer in meters */
  chamferWidth: number;
  
  /** Type of chamfer edge (Line or Arch) */
  chamferType: ChamferType;
  
  /** Number of vertical grooving lines */
  vGroovingCount: number;
  
  /** Number of horizontal grooving lines */
  hGroovingCount: number;
  
  /** Width of grooving lines in meters */
  groovingWidth: number;
  
  /** Angle of vertical grooving in degrees */
  vGroovingAngle: number;
  
  /** Angle of horizontal grooving in degrees */
  hGroovingAngle: number;
  
  /** Type of grooving pattern */
  groovingType: GroovingType;
  
  /** URI for custom texture overlay */
  customizedTextureURI: string;

  constructor();

  /**
   * Populate this instance with data from another instance
   * @param source - Source grooving chamfer data
   */
  populate(source: GroovingChamferData): void;

  /**
   * Reset to default values with a new chamfer path
   * @param chamferPath - New chamfer path to initialize with
   */
  reset(chamferPath: Point2D[]): void;

  /**
   * Check if this data is the same as another instance
   * @param other - Other instance to compare
   * @returns True if instances are equal
   */
  isSame(other: GroovingChamferData): boolean;

  /**
   * Check equality with another instance
   * @param other - Other instance to compare
   * @returns True if all properties match
   */
  equals(other: GroovingChamferData): boolean;

  /**
   * Check if grooving or chamfer data is valid and applied
   * @returns True if chamfer or grooving is configured
   */
  isValid(): boolean;

  /**
   * Generate a hash code for this configuration
   * @returns Hash code string, or empty string if invalid
   */
  getHashCode(): string;
}

/**
 * Block entity representing a tile or brick in the pattern
 * Manages geometry, materials, and grooving/chamfer properties
 */
export declare class Block extends Entity {
  /** Outline path states defining the block shape */
  Outline: ArrayState[];
  
  /** Origin path states defining the reference point */
  Origin: ArrayState[];
  
  /** Length in X direction (width) */
  XLength: State<number>;
  
  /** Length in Y direction (height) */
  YLength: State<number>;
  
  /** Rotation angle in degrees */
  Rotation: State<number>;
  
  /** Signal emitted when fields change */
  signalFieldChanged: Signal<Block>;
  
  /** Local identifier for this block */
  localId: string;
  
  /** Group identifier for related blocks */
  groupId: string;
  
  /** Group information array */
  groupInfo: unknown[];
  
  /** Property information definitions */
  propertiesInfos?: PropertyInfo[];
  
  /** Dynamic properties object */
  properties?: Record<string, unknown>;
  
  /** Brick pattern options */
  brickPatternOption?: unknown;
  
  /** Flag for small material rotation */
  materialSmall4Rot: boolean;
  
  /** Block name */
  name: string;

  constructor(id?: string, parent?: Entity);

  /**
   * Create a new Block from creation data
   * @param data - Block creation data
   * @param materialsMap - Map of material IDs to material definitions
   * @returns Newly created Block instance
   */
  static create(data: BlockCreateData, materialsMap: Record<string, unknown>): Block;

  /** Get material metadata */
  get metadata(): MaterialMetadata;

  /** Get/set the block material */
  get material(): Material | null;
  set material(value: Material | null);

  /** Get/set small material flag */
  get materialSmall(): boolean;
  set materialSmall(value: boolean);

  /** Get/set grooving and chamfer data */
  get groovingChamferData(): GroovingChamferData;
  set groovingChamferData(value: GroovingChamferData);

  /** Get/set customized texture URI */
  get customizedTextureURI(): string;
  set customizedTextureURI(value: string);

  /** Get/set map of reference IDs to customized texture URIs */
  get customizedTextureURIMap(): Map<string, string>;
  set customizedTextureURIMap(value: Map<string, string>);

  /**
   * Generate hash string for this block configuration
   * @returns Hash string
   */
  generateHashString(): string;

  /**
   * Get the IO handler for serialization
   * @returns Block IO instance
   */
  getIO(): Entity_IO;

  /**
   * Add property definitions to this block
   * @param properties - Array of property information
   */
  addProperties(properties: PropertyInfo[]): void;

  /**
   * Add group information to this block
   * @param groupId - Group identifier
   * @param groupsMap - Map of group IDs to group info
   */
  addGroups(groupId: string, groupsMap: Record<string, unknown[]>): void;

  /**
   * Get the outline paths as closed loops
   * @returns Array of closed outline paths
   */
  getOutline(): Point2D[][];

  /**
   * Get the outline path for painting (reversed order)
   * @returns Paint outline path
   */
  getPaintOutline(): Point2D[];

  /**
   * Get the origin paths as closed loops
   * @returns Array of closed origin paths
   */
  getOrigin(): Point2D[][];

  /**
   * Calculate bounding box for this block
   * @returns Bounding box dimensions
   */
  bounding(): BoundingBox;

  /**
   * Update the material for this block
   * @param material - New material instance or metadata
   */
  updateMaterial(material: Material | MaterialMetadata): void;

  /**
   * Get the current material
   * @returns Current material instance
   */
  getMaterial(): Material | null;

  /**
   * Get the image URL for this block
   * @returns Image URL string
   */
  getImageUrl(): string;

  /**
   * Reset grooving and chamfer data to defaults
   * @param clearNormalTexture - If true, also clear normal texture
   */
  resetGroovingChamfer(clearNormalTexture?: boolean): void;

  /**
   * Get customized texture URI for a reference ID
   * @param refId - Reference identifier
   * @returns Texture URI or undefined
   */
  getRefCustomizedTextureURI(refId: string): string | undefined;

  /**
   * Set customized texture URI for a reference ID
   * @param refId - Reference identifier
   * @param uri - Texture URI
   */
  setRefCustomizedTextureURI(refId: string, uri: string): void;

  /**
   * Check if grooving or chamfer is valid and applied
   * @returns True if valid
   */
  isGroovingChamferValid(): boolean;

  /**
   * Check if UV transform has been applied to material
   * @returns True if UV is transformed
   */
  isUvTransformed(): boolean;

  /**
   * Set UV transform on the material
   * @param transform - Transform data
   */
  setUvTransform(transform: unknown): void;

  /**
   * Reset UV transform to identity
   */
  resetUvTransform(): void;

  /**
   * Check if UV transform matches another material
   * @param other - Other material to compare
   * @returns True if transforms match
   */
  isSameUvTransform(other: Material): boolean;

  /**
   * Get block data for serialization
   * @returns Block data object
   */
  getBlockData(): { localId: string; materialSmall: boolean };

  /**
   * Get hash code for grooving and chamfer configuration
   * @returns Hash code number
   */
  getGroovingChamferHashCode(): number | string;

  /**
   * Copy tile processing data from another block
   * @param source - Source block to copy from
   */
  copyTileProcessData(source: Block): void;

  /**
   * Internal method to set outline with validation
   * @param outline - Outline data
   */
  protected _setOutline(outline: unknown): void;

  /**
   * Internal method to set origin with validation
   * @param origin - Origin data
   */
  protected _setOrigin(origin: unknown): void;

  /**
   * Get closed path from array states
   * @param states - Array of array states
   * @returns Closed paths
   */
  protected _getClosedPath(states: ArrayState[]): Point2D[][];

  /**
   * Get paint path (reversed) from array states
   * @param states - Array of array states
   * @returns Paint paths
   */
  protected _getPaintPath(states: ArrayState[]): Point2D[][];

  /**
   * Called when a field value changes
   * @param fieldName - Name of changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;
}