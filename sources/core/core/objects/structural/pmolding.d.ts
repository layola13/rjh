import { PModel } from './PModel';
import { WebCadMoldingDocument } from './WebCadMoldingDocument';

/**
 * Profile data interface for molding configuration
 */
interface ProfileData {
  /** Unique identifier for seeking/referencing */
  seekId: string;
  /** MIME type or content classification */
  contentType: string;
  /** Profile definition data */
  profile: unknown;
  /** Profile dimension along X axis */
  profileSizeX: number;
  /** Profile dimension along Y axis */
  profileSizeY: number;
}

/**
 * Direction information for molding orientation
 */
interface DirectionInfo {
  /** Vertical reference line vector */
  verticalLine?: THREE.Vector3;
  /** Directional vector or orientation data */
  dir?: unknown;
}

/**
 * 3D point in space
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Path represented as an array of 3D points
 */
type Path = Point3D[];

/**
 * Molding configuration parameters
 */
interface MoldingConfig {
  /** Unique name/identifier for the molding */
  name: string;
  /** Array of paths defining the molding geometry */
  paths: Path[];
  /** Complete set of paths (may include auxiliary data) */
  wholePaths: Path[];
  /** Profile configuration data */
  profileData: {
    data: ProfileData;
  };
  /** Directional information for molding */
  dirInfo: DirectionInfo;
  /** Flag to preserve original profile coordinate system */
  bKeepProfileCordinate?: boolean;
}

/**
 * Entity interface representing a molding component
 */
interface MoldingEntity {
  /** Unique identifier */
  ID: string;
  /** Seek identifier for profile lookup */
  seekId: string;
  /** Content type classification */
  contentType: string;
  /** Profile definition */
  profile: unknown;
  /** Profile width */
  XSize: number;
  /** Profile height */
  YSize: number;
  /** Vertical reference line */
  pathVertLine?: Point3D;
  /** Profile direction */
  profileDir?: unknown;
  /** Preserve profile coordinate system flag */
  bKeepProfileCordinate?: boolean;
  /** Get all paths defining the molding geometry */
  getPaths(): Path[];
}

/**
 * PMolding - Model class for handling molding components in CAD system
 * 
 * Manages the creation and update of molding geometry based on profile data and paths.
 * Extends PModel to provide molding-specific functionality including:
 * - Profile configuration management
 * - Path processing and deduplication
 * - WebCAD document integration
 */
export declare class PMolding extends PModel {
  /** Internal WebCAD document for molding operations */
  private _webCadDocument: WebCadMoldingDocument;
  
  /** Cache key for detecting changes in molding configuration */
  private _cache?: string;

  /** Entity data for this molding component */
  protected entity: MoldingEntity;

  /**
   * Creates a new PMolding instance
   * 
   * @param arg1 - First constructor argument (inherited from PModel)
   * @param arg2 - Second constructor argument (inherited from PModel)
   * @param arg3 - Third constructor argument (inherited from PModel)
   */
  constructor(arg1: unknown, arg2: unknown, arg3: unknown);

  /**
   * Update handler called when the molding needs to be regenerated
   * 
   * Process flow:
   * 1. Extracts paths and directional data from entity
   * 2. Builds profile and path configuration
   * 3. Checks cache to avoid redundant updates
   * 4. Removes duplicate points from paths
   * 5. Updates WebCAD document with new molding geometry
   * 
   * Uses caching mechanism to prevent unnecessary recalculations
   * when entity data hasn't changed.
   */
  onUpdate(): void;
}