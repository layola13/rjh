/**
 * BalconyData module - Provides default material configurations for balcony surfaces
 * Original Module ID: 391466
 */

/**
 * Metadata information for material configuration
 */
interface MaterialMeta {
  /** Magic identifier for the material system */
  magic: string;
  /** Version of the material format */
  version: string;
  /** Unit of measurement (e.g., "meter") */
  unit: string;
  /** Searchable keywords */
  keywords: string;
  /** Customization version */
  customizationVersion: string;
}

/**
 * 2D line segment data
 */
interface LineSegment2D {
  /** Line type identifier */
  type: 'ln2';
  /** Line data: [point coordinates, direction vector, offset] */
  data: Array<[number, number] | number[]>;
}

/**
 * Path contour consisting of multiple segments
 */
interface PathContour {
  /** Array of line segments defining the contour */
  cs: LineSegment2D[][];
}

/**
 * Extended properties for regions
 */
interface RegionExtension {
  /** Corner radius */
  cr: number;
}

/**
 * Pivot point for pattern positioning
 */
interface PatternPivot {
  /** Position coordinates [x, y] */
  p: [number, number];
}

/**
 * Template configuration for brick patterns
 */
interface BrickTemplate {
  /** Template unique identifier */
  id: string;
  /** Template parameter mappings */
  map: {
    /** Brick width */
    ID_BRICK_W: number;
    /** Brick height */
    ID_BRICK_H: number;
    /** Gap between bricks */
    ID_BRICK_GAP: number;
  };
}

/**
 * Material parameters for textures and colors
 */
interface MaterialParameters {
  /** Color mode: "texture" or "color" */
  colorM?: 'texture' | 'color';
  /** Texture URL */
  tUrl?: string;
  /** Scale X factor */
  sX?: number;
  /** Scale Y factor */
  sY?: number;
  /** Normal map parameters */
  nPs?: Array<{
    /** Normal map texture URL */
    tUrl: string;
    /** Texture X tiling */
    tX: number;
    /** Texture Y tiling */
    tY: number;
  }>;
}

/**
 * Material reference with seek ID and parameters
 */
interface MaterialReference {
  /** Unique seek identifier for the material */
  seekId: string;
  /** Material parameter overrides */
  pms: MaterialParameters;
}

/**
 * Seam configuration for patterns
 */
interface SeamConfiguration {
  /** Seam width in meters */
  width: number;
  /** Material used for seams */
  mat: MaterialReference;
}

/**
 * Pattern unit configuration
 */
interface PatternUnit {
  /** Unit identifier */
  id: number;
  /** Materials applied to this unit */
  mats: MaterialReference[];
  /** Seed for randomization */
  sd: number;
  /** Percentage distribution of materials */
  pct: Record<string, number>;
}

/**
 * Pattern configuration for regions
 */
interface Pattern {
  /** Pattern unique identifier */
  id: string;
  /** Pattern type: 0 = solid, 1 = tiled */
  type: 0 | 1;
  /** Template configuration (for tiled patterns) */
  tmpl?: BrickTemplate;
  /** Pivot point for positioning */
  pv: PatternPivot;
  /** Seam configuration (for tiled patterns) */
  seam?: SeamConfiguration;
  /** Pattern units (for tiled patterns) */
  units?: PatternUnit[];
  /** Material reference (for solid patterns) */
  mat?: MaterialReference;
}

/**
 * Region definition with pattern assignment
 */
interface MixPaveRegion {
  /** Region unique identifier */
  id: string;
  /** Pattern ID to apply to this region */
  patId: string;
  /** Path defining the region boundary */
  path: {
    cs: LineSegment2D[][];
  };
  /** Extended properties */
  ext: RegionExtension;
}

/**
 * Mix paving configuration (version 3.00)
 */
interface MixPaveConfiguration {
  /** Configuration version */
  version: string;
  /** List of regions to pave */
  regions: MixPaveRegion[];
  /** List of pattern definitions */
  pats: Pattern[];
  /** Background material */
  bgMat: MaterialReference;
}

/**
 * Host face information for material application
 */
interface HostFace {
  /** Face entity identifier */
  faceEntity: string;
  /** Face identifier (optional) */
  faceId?: string;
}

/**
 * Face group configuration
 */
interface FaceGroup {
  /** Face group identifier */
  faceGroupId: string;
  /** Mapping of face group bounds */
  faceGroupBoundMap: Record<string, unknown>;
}

/**
 * Base material data node
 */
interface BaseDataNode {
  /** Layer type identifier */
  l: string;
  /** Node unique identifier */
  id: string;
  /** Parent node IDs */
  p?: string[];
  /** Child node IDs */
  c?: string[];
}

/**
 * Material layer data
 */
interface MaterialLayer extends BaseDataNode {
  l: 'Material';
  /** Unique seek identifier for the material product */
  seekId: string;
  /** Texture URI (for texture mode) */
  textureURI?: string;
  /** Small icon URI */
  iconSmallURI?: string;
  /** Large icon URI */
  iconLargeURI?: string;
  /** Color value (for color mode) */
  color?: number;
  /** Color mode: "texture" or "color" */
  colorMode: 'texture' | 'color';
  /** Tile size in X direction (meters) */
  tileSize_x?: number;
  /** Tile size in Y direction (meters) */
  tileSize_y?: number;
  /** Seam color (RGB as integer) */
  seamColor: number;
  /** Mixpaint node ID reference */
  mixpaint: string;
}

/**
 * Mixpaint layer data
 */
interface MixpaintLayer extends BaseDataNode {
  l: 'Mixpaint';
  /** Host face information */
  host: HostFace;
  /** Face group configuration */
  faceGroup: FaceGroup;
}

/**
 * MixSketch2d layer data
 */
interface MixSketch2dLayer extends BaseDataNode {
  l: 'MixSketch2d';
  /** Mix paving configuration */
  mixPave: MixPaveConfiguration;
}

/**
 * Union type for all data layer types
 */
type DataLayer = MaterialLayer | MixpaintLayer | MixSketch2dLayer;

/**
 * Complete material configuration structure
 */
interface MaterialConfiguration {
  /** Metadata for the configuration */
  meta: MaterialMeta;
  /** Entry point node ID */
  entryId: string;
  /** Array of data layers (Material, Mixpaint, MixSketch2d) */
  data: DataLayer[];
  /** Legacy materials array (deprecated) */
  materials: unknown[];
  /** Product seek IDs used in this configuration */
  products: string[];
  /** Product IDs (duplicate of products) */
  productIds: string[];
  /** Generated products array */
  generatedProducts: unknown[];
}

/**
 * Wall face material configuration
 */
interface WallFaceConfiguration {
  /** Element types present on this wall face */
  elementTypes: string[];
  /** Surface area in square meters */
  area: number;
  /** Material configuration JSON */
  matJson: MaterialConfiguration;
}

/**
 * Default materials for all balcony surfaces
 */
interface BalconyDefaultMaterials {
  /** Floor material configuration */
  floor: MaterialConfiguration;
  /** Ceiling material configuration */
  ceiling: MaterialConfiguration;
  /** Wall face material configurations */
  wallFaces: WallFaceConfiguration[];
}

/**
 * BalconyData class - Manages default material configurations for balconies
 */
export declare class BalconyData {
  /**
   * Returns default material configurations for balcony surfaces
   * Includes floor, ceiling, and wall face materials with predefined patterns
   * 
   * @returns Complete set of default materials for a balcony
   */
  static getDefaultMaterials(): BalconyDefaultMaterials;
}