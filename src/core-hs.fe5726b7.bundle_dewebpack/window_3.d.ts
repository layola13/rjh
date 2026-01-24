import type { Opening, Opening_IO } from './Opening';
import type { Entity } from './Entity';
import type { WindowSill } from './WindowSill';
import type { Manager } from './Manager';
import type { Wall } from './Wall';
import type { ParametricModel } from './ParametricModel';
import type { PocketSideType } from './Pocket';
import type { NCustomizedParametricRoof } from './NCustomizedParametricRoof';
import type { Logger } from './Logger';

/**
 * Window sill side type enumeration
 */
export enum WindowSillSideType {
  INNER = 'INNER',
  OUTER = 'OUTER',
  DOUBLE = 'DOUBLE'
}

/**
 * Window sill outline points structure
 */
export interface WindowSillOutline {
  /** Main outline points forming the window sill boundary */
  outline: THREE.Vector2[];
  /** Inner boundary points */
  innerBound: THREE.Vector2[];
  /** Inner edge points */
  innerPoints: THREE.Vector2[];
  /** Outer edge points */
  outerPoints: THREE.Vector2[];
}

/**
 * Window sill geometric information
 */
export interface WindowSillPartInfo {
  /** Contour points defining the sill shape */
  points: THREE.Vector2[];
  /** Inner sill contour points */
  innerSillPoints: THREE.Vector2[];
  /** Outer sill contour points */
  outerSillPoints: THREE.Vector2[];
  /** Double-sided sill contour points */
  doubleSillPoints: THREE.Vector2[];
  /** Vertical elevation offset */
  elevation: number;
  /** Indices for primary molding edges */
  moldingIndices: number[];
  /** Indices for secondary molding edges */
  secondMoldingIndices: number[];
  /** Indices for outer molding edges */
  outerMoldingIndices: number[];
  /** Whether to flip molding direction */
  moldingFlip: boolean;
}

/**
 * Window parts information collection
 */
export interface WindowPartsInfo {
  /** Window sill geometric data */
  Sill: WindowSillPartInfo;
  /** Bounding geometry information */
  boundings: WindowSillOutline;
}

/**
 * Options for build parts info operation
 */
export interface BuildPartsOptions {
  /** Whether this is a preview-only operation */
  previewDirty?: boolean;
}

/**
 * Serialized window data structure
 */
export interface SerializedWindowData {
  /** Window indent from wall face */
  __indent?: number;
  /** Window frame thickness */
  __thickness?: number;
  [key: string]: unknown;
}

/**
 * Window metadata structure
 */
export interface WindowMetadata {
  /** User-defined free-form data */
  userFreeData?: {
    /** Associated model definitions */
    models?: Array<{
      /** Model type identifier */
      type: string;
      [key: string]: unknown;
    }>;
  };
  [key: string]: unknown;
}

/**
 * I/O handler for Window entity serialization/deserialization
 */
export declare class Window_IO extends Opening_IO {
  /**
   * Load window data from serialized format
   * @param data - Serialized window data
   * @param entity - Target window entity
   * @param context - Loading context
   */
  load(data: SerializedWindowData, entity: Entity, context: unknown): void;

  /**
   * Get singleton instance of Window_IO
   */
  static instance(): Window_IO;
}

/**
 * Window entity representing building windows with sills and pockets
 */
export declare class Window extends Opening {
  /** Top view SVG symbol for 2D representation */
  topView: string;
  
  /** Vertical Z-axis elevation */
  z: number;
  
  /** Cached parts information for geometry generation */
  protected partsInfo?: WindowPartsInfo;
  
  /** Flag indicating bounding box needs recalculation */
  protected _boundDirty: boolean;
  
  /** Internal indent value from wall face */
  protected __indent: number;
  
  /** Internal thickness value */
  protected __thickness: number;

  /**
   * Create a new Window instance
   * @param id - Unique entity identifier (empty string for auto-generation)
   * @param metadata - Optional window metadata
   */
  constructor(id?: string, metadata?: WindowMetadata);

  /**
   * Get all window sill children attached to this window
   * @returns Array of WindowSill entities
   */
  getWindowSills(): WindowSill[];

  /**
   * Get the primary window sill (asserts max 1 sill exists in debug mode)
   * @returns The window sill or null if none exists
   */
  getWindowSill(): WindowSill | null;

  /**
   * Add a window sill to this window if not already visible
   */
  addSill(): void;

  /**
   * Remove all window sills from this window
   */
  removeSill(): void;

  /**
   * Check if window sill can be added (not allowed for bay windows)
   * @returns True if sill can be added
   */
  canAddSill(): boolean;

  /**
   * Check if window sill is currently visible
   * @returns True if sill exists and is not hidden
   */
  isShowSill(): boolean;

  /**
   * Get the height of the window sill
   * @returns Sill height in meters, or 0 if no sill
   */
  getSillHeight(): number;

  /**
   * Create a new window sill instance from metadata or default template
   * @returns New WindowSill parametric model or null
   */
  createWindowSill(): ParametricModel | null;

  /**
   * Calculate 2D indent direction vector
   * @returns Vector pointing from wall face toward window
   */
  getIndentVector(): HSCore.Util.Math.Vec2;

  /**
   * Calculate 3D indent direction vector
   * @returns 3D vector pointing from wall face toward window
   */
  getIndentVector3(): THREE.Vector3;

  /**
   * Get the side type of the window sill (inner/outer/double)
   * @returns Window sill side type
   */
  getWindowSillSide(): WindowSillSideType;

  /**
   * Build or rebuild window parts geometric information
   * @param existingParts - Optional existing part parameters to preserve
   * @param options - Optional build configuration
   */
  buildPartsInfo(existingParts?: Array<{ partName: string; [key: string]: unknown }>, options?: BuildPartsOptions): void;

  /**
   * Get the I/O handler for this window type
   * @returns Window_IO singleton instance
   */
  getIO(): Window_IO;

  /**
   * Called when a field value changes
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * Called when a pocket is added to this window
   */
  onPocketAdded(): void;

  /**
   * Called when a pocket is removed from this window
   */
  onPocketRemoved(): void;

  /**
   * Called when the pocket size changes
   */
  onPocketSizeChanged(): void;

  /**
   * Called when the host wall or roof changes
   */
  onHostChanged(): void;

  /**
   * Internal setter for thickness property
   * @param value - New thickness value in meters
   */
  protected _setThickness(value: number): void;

  /**
   * Get the host entity (wall or roof) this window is placed on
   * @returns Host wall or roof entity
   */
  getHost(): Wall | NCustomizedParametricRoof | null;

  /**
   * Check if pocket is currently visible
   * @returns True if pocket exists and is visible
   */
  isShowPocket(): boolean;

  /**
   * Get the pocket entity associated with this window
   * @returns Pocket entity
   */
  getPocket(): {
    side: PocketSideType;
    XSize: number;
    YSize: number;
    dirtyGeometry(): void;
  };

  /**
   * Get the roof face ID if window is hosted on a roof
   * @returns Roof face identifier
   */
  getHostRoofFaceId(): string | number;

  /**
   * Get window width (X dimension)
   */
  readonly XSize: number;

  /**
   * Get window indent distance from wall face
   */
  readonly indent: number;

  /**
   * Get window frame thickness
   */
  readonly thickness: number;

  /**
   * Get window content type
   */
  readonly contentType: {
    isTypeOf(type: string): boolean;
  } | null;

  /**
   * Iterate over all child entities
   * @param callback - Function called for each child
   * @param context - Context object for callback
   */
  forEachChild(callback: (child: Entity) => void, context: unknown): void;

  /**
   * Add a child entity to this window
   * @param child - Child entity to add
   */
  addChild(child: Entity): void;

  /**
   * Remove a child entity from this window
   * @param child - Child entity to remove
   */
  removeChild(child: Entity): void;

  /**
   * Mark geometry as needing rebuild
   */
  dirtyGeometry(): void;

  /**
   * All child entities indexed by ID
   */
  readonly children: Record<string, Entity>;

  /**
   * Window metadata
   */
  readonly metadata: WindowMetadata | null;
}