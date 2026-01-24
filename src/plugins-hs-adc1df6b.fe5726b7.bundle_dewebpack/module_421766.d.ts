/**
 * Roof metadata manager - handles loading and caching of roof type configurations
 */

/**
 * Configuration for roof type ordering and defaults
 */
interface RoofTypeConfig {
  /** Display/processing order */
  order: number;
  /** Whether this is the default roof type */
  isDefault?: boolean;
}

/**
 * Map of roof type identifiers to their configuration
 */
interface RoofTypeConfigMap {
  flatParamRoof: RoofTypeConfig;
  shedParamRoof: RoofTypeConfig;
  gableParamRoof: RoofTypeConfig;
  hipParamRoof: RoofTypeConfig;
  saltBoxParamRoof: RoofTypeConfig;
  boxGableParamRoof: RoofTypeConfig;
  pyramidParamRoof: RoofTypeConfig;
}

/**
 * Catalog item metadata from the application
 */
interface CatalogItemMeta {
  /** Unique identifier */
  id: string;
  /** User-specific free-form data */
  userFreeData: {
    /** JSON-encoded parametric metadata */
    parametricMeta: string;
  };
}

/**
 * Parsed parametric metadata structure
 */
interface ParametricMetadata {
  /** Type of roof (e.g., 'flat', 'gable', etc.) */
  roofType: string;
  /** Whether the main part is rectangular */
  isRectMainPart?: boolean;
  /** Whether arc shapes are not supported */
  isNotSupprtArc?: boolean;
  /** Whether only convex polygons are allowed */
  isConvexPoly?: boolean;
  /** JSON-encoded documentation/configuration */
  doc: string;
}

/**
 * Processed roof metadata entry
 */
interface RoofMetadata {
  /** Original catalog metadata */
  meta: CatalogItemMeta;
  /** Type of roof */
  roofType: string;
  /** Whether the main part must be rectangular */
  isRectMainPart: boolean;
  /** Whether arc shapes are not supported */
  isNotSupprtArc: boolean;
  /** Whether only convex polygons are supported */
  isConvexPoly: boolean;
  /** Display/processing order */
  order?: number;
}

/**
 * Manages roof type metadata loading and caching
 */
declare class RoofMetadataManager {
  /** The default roof metadata configuration */
  defaultRoofMeta?: RoofMetadata;
  
  /** List of all available roof metadata configurations */
  roofMetaList: RoofMetadata[];
  
  /** Internal retry counter for failed preload attempts */
  private _retryTime: number;
  
  /**
   * Initialize the roof metadata manager
   * Triggers preload if default metadata is not yet loaded
   */
  init(): void;
  
  /**
   * Internal method to preload roof metadata from catalog
   * Retries up to 3 times on failure
   * @private
   */
  private _preload(): void;
}

/**
 * Singleton instance of the roof metadata manager
 */
declare const roofMetadataManager: RoofMetadataManager;

export default roofMetadataManager;