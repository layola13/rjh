/**
 * Window pocket model and I/O handler for parametric window pockets.
 * Supports different pocket sides (inner, outer, both) and profile-based sizing.
 */

import type { ParametricModel, ParametricModel_IO } from './ParametricModel';
import type { Entity } from './Entity';
import type { Layer, Wall } from './Model';

/**
 * Pocket side types enumeration
 */
export enum PocketSideType {
  /** Pocket on inner wall side only */
  Inner = 'Inner',
  /** Pocket on outer wall side only */
  Outer = 'Outer',
  /** Pocket on both sides */
  Both = 'Both'
}

/**
 * Profile data structure containing profile dimensions
 */
export interface ProfileData {
  /** Profile width dimension (X-axis) */
  profileSizeX: number;
  /** Profile height dimension (Y-axis) */
  profileSizeY: number;
}

/**
 * Window pocket parameters
 */
export interface WindowPocketParameters {
  /** Outer molding width dimension */
  outerMoldingSizeX?: number;
  /** Outer molding height dimension */
  outerMoldingSizeY?: number;
  /** Side of the wall where pocket is placed */
  side?: PocketSideType;
  /** Profile configuration data */
  profileData?: ProfileData;
}

/**
 * Initialization parameters for window pocket
 */
export interface WindowPocketInitParameters extends WindowPocketParameters {
  /** Required profile data for initialization */
  profileData: ProfileData;
}

/**
 * Wall geometry information
 */
export interface WallInfo {
  /** Whether wall is shared between spaces */
  shared: boolean;
  /** Identifier for the outer side of the wall */
  outerWallSide?: string | null;
}

/**
 * Geometry manager for wall operations
 */
export interface GeometryManager {
  /**
   * Retrieves wall geometry information
   * @param wall - Wall entity to query
   * @returns Wall information or null if not found
   */
  getWallInfo(wall: Wall): WallInfo | null;
}

/**
 * Document manager interface
 */
export interface DocumentManager {
  /** Geometry operations manager */
  geometryManager: GeometryManager;
}

/**
 * Load options for I/O operations
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * I/O handler for WindowPocket serialization and deserialization.
 * Manages loading window pocket data and ensures profile dimensions are properly set.
 */
export declare class WindowPocket_IO extends ParametricModel_IO {
  /**
   * Singleton instance accessor
   */
  static instance(): WindowPocket_IO;

  /**
   * Loads window pocket data from serialized format.
   * Automatically sets outer molding sizes from profile data if not explicitly provided.
   * 
   * @param entity - Target window pocket entity to populate
   * @param data - Serialized data object containing parameters
   * @param options - Optional loading configuration
   */
  load(
    entity: WindowPocket,
    data: { parameters: WindowPocketParameters },
    options?: LoadOptions
  ): void;
}

/**
 * Parametric window pocket model.
 * Represents a pocket (recess) in a wall for window installation.
 * Automatically determines default pocket side based on wall configuration.
 */
export declare class WindowPocket extends ParametricModel {
  /**
   * Window pocket configuration parameters
   */
  parameters: WindowPocketParameters;

  /**
   * Active side(s) of the wall where pocket is applied.
   * Setting this property triggers parts info rebuild.
   */
  side: PocketSideType;

  /**
   * Creates a new window pocket instance
   * 
   * @param id - Unique identifier for the entity (optional)
   * @param parent - Parent entity in the hierarchy (optional)
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Initializes window pocket with configuration parameters.
   * Sets outer molding dimensions from profile data.
   * 
   * @param params - Initialization parameters including profile data
   */
  initByParameters(params: WindowPocketInitParameters): void;

  /**
   * Determines default pocket side based on parent wall configuration.
   * Returns Inner if wall is non-shared with outer side, otherwise Both.
   * 
   * @returns Default pocket side type
   */
  getDefaultSide(): PocketSideType;

  /**
   * Retrieves the I/O handler instance for this model type
   * 
   * @returns WindowPocket_IO singleton instance
   */
  getIO(): WindowPocket_IO;

  /**
   * Gets the first parent entity that is not of specified types
   * 
   * @param excludedTypes - Array of entity types to skip
   * @returns Parent entity or null
   */
  getFirstParentOfNonTypes(excludedTypes: unknown[]): Entity & {
    buildPartsInfo(): void;
    getHost(): Wall | null;
  };
}

/**
 * Entity registration
 */
declare module './Entity' {
  interface Entity {
    registerClass(className: string, constructor: typeof WindowPocket): void;
  }
}

/**
 * Global namespace declarations
 */
declare global {
  namespace HSCore {
    namespace Model {
      class Layer {}
      class Wall {}
    }
    namespace Doc {
      function getDocManager(): DocumentManager;
    }
  }

  namespace HSConstants {
    namespace ModelClass {
      const NgParametricWindowPocket: string;
    }
  }
}