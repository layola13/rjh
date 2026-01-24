import { B2Processor } from './B2Processor';
import { FacePredicate } from './FacePredicate';
import { HoleEntity } from './HoleEntity';
import { ModelClassName } from './ModelClassName';
import { backendCatalogHelper } from './backendCatalogHelper';
import { needCalculateBrickCount, dollarTransfer, getColor } from './materialUtils';
import { resourceManager } from './resourceManager';
import { PaveRubbleAlgorithm, RubbleSizeTypeEnum } from './PaveRubbleAlgorithm';

/**
 * Material information for BOM (Bill of Materials) generation
 */
export interface MaterialInfo {
  /** Material category identifier */
  category: string;
  /** Human-readable category type name */
  categoryType: string;
  /** Brand name */
  brand: string;
  /** Brand unique identifier */
  brandId: string;
  /** Material color */
  color: string;
  /** Quantity/count of material needed */
  count: number;
  /** URL to material texture/preview image */
  image: string;
  /** Display name of the material */
  name: string;
  /** Unique seek identifier */
  seekId: string;
  /** Dimensions of the material tile/unit */
  size: { x: number; y: number };
  /** Unit of measurement (area, pieces, etc.) */
  unit: string;
  /** Area of the face where material is applied */
  locationFaceArea: number;
  /** Unit type string ('area' or 'other') */
  unitTypeStr: string;
  /** Room identifier where material is used */
  roomId?: string;
  /** Location name (e.g., 'floor', 'ceiling', 'wall') */
  locationName?: string;
  /** Reference seek IDs for related materials */
  refSeekIds?: string[];
  /** Whether to keep count as integer */
  keepInteger?: boolean;
  /** Total region area */
  regionArea?: number;
  /** Whether this is a rubble/irregular pattern material */
  isRubble?: boolean;
  /** Pattern unit identifier */
  patternUnitId?: string;
  /** Pattern information */
  patternInfo?: PatternInfo;
  /** Unique identifier for rubble calculation */
  uid?: string;
  /** Path data for rubble materials */
  rubblePath?: RubblePath[];
}

/**
 * Pattern information for pave materials
 */
export interface PatternInfo {
  /** Pattern seek identifier */
  seekId: string;
  /** Unit information array */
  unitsInfos?: UnitInfo[];
}

/**
 * Unit information in a pattern
 */
export interface UnitInfo {
  /** Unit identifier */
  unitId: string;
  /** X-dimension length */
  xLength: number;
  /** Y-dimension length */
  yLength: number;
  /** Area of the unit */
  area: number;
  /** Materials used in this unit */
  materials: Material[];
}

/**
 * Material definition
 */
export interface Material {
  /** Material seek identifier */
  seekId: string;
  /** Category type */
  categoryType: string;
  /** Texture URL */
  textureUrl: string;
  /** Display name */
  displayName: string;
  /** Brand name */
  v: string;
  /** Brand ID */
  vId: string;
  /** Tile size in X dimension */
  tileSize_x: number;
  /** Tile size in Y dimension */
  tileSize_y: number;
}

/**
 * Block information for pave materials
 */
export interface BlockInfo {
  /** Unit identifier this block belongs to */
  unitId: string;
  /** Material seek identifier */
  materialSeekId: string;
  /** Count of blocks */
  count: number;
  /** Whether this is a rubble/irregular block */
  isRubble?: boolean;
  /** Path information for rubble blocks */
  path?: PathSegment[][];
  /** Major material reference information */
  major?: { refSeekIds: string[] };
}

/**
 * Path segment for rubble materials
 */
export interface PathSegment {
  /** Path coordinates or data */
  path: unknown;
  /** Area of this path segment */
  area: number;
}

/**
 * Rubble path information
 */
export interface RubblePath {
  /** Unique identifier */
  uid: string;
  /** Path data */
  path: unknown;
  /** Area covered by this path */
  area: number;
}

/**
 * Modified brick information
 */
export interface ModifiedBrick {
  /** Material information */
  material: Material;
}

/**
 * Filter options for BOM data generation
 */
export interface FilterOptions {
  /** Whether to perform hard load */
  hardload?: boolean;
  /** Whether to skip joint return calculation */
  noJointRet?: boolean;
}

/**
 * Options for building BOM data
 */
export interface BuildBomOptions {
  /** Filter options */
  filterOptions?: FilterOptions;
}

/**
 * Face entity representing a surface in the model
 */
export interface FaceEntity {
  /** Get the instance ID */
  getInstanceId(): string;
  /** Get entity instance with parameters */
  instance: {
    getParameterValue(key: string): unknown;
  };
  /** Get parent entity */
  getParent(): FaceEntity | undefined;
  /** Entity type information */
  type: {
    /** Class type identifier */
    classType: string;
  };
}

/**
 * Pave entity representing a paving pattern
 */
export interface PaveEntity {
  /** Get the instance ID */
  getInstanceId(): string;
  /** Get a unique identifier */
  getId(): string;
  /** Get parameter value by key */
  getParameterValue(key: string): unknown;
  /** Traverse children with callback */
  traverse(callback: (entity: FaceEntity) => boolean): void;
  /** Child entities */
  children?: unknown[];
  /** Entity instance */
  instance: {
    getParameterValue(key: string): unknown;
  };
}

/**
 * Customized entity in the model
 */
export interface CustomizedEntity {
  /** Get parameter value by key */
  getParameterValue(key: string): unknown;
  /** Child entities */
  children?: unknown[];
}

/**
 * Opening entity (doors, windows, holes, etc.)
 */
export interface OpeningEntity {
  /** Get parameter value by key */
  getParameterValue(key: string): unknown;
  /** Child entities */
  children?: unknown[];
}

/**
 * Database API for entity queries
 */
export interface DbApi {
  /** Find all entities matching a predicate */
  findAll(entities: unknown[], predicate: FacePredicate): FaceEntity[];
}

/**
 * Context for B2Material processor
 */
export interface B2MaterialContext {
  /** Pave entities */
  paves: PaveEntity[];
  /** Room faces mapped by room ID */
  roomFaces: Map<string, FaceEntity[]>;
  /** Customized entities */
  customizedEntities: CustomizedEntity[];
  /** Opening entities */
  openings: OpeningEntity[];
  /** Database API */
  dbApi: DbApi;
}

/**
 * B2Material processor for generating Bill of Materials from building model
 * Processes faces, paves, and openings to calculate material quantities
 */
export declare class B2Material extends B2Processor {
  /** Processing context */
  context: B2MaterialContext;

  /**
   * Create a new B2Material processor
   * @param context - Processing context with model data
   */
  constructor(context: B2MaterialContext);

  /**
   * Assign face location name to material(s)
   * @param materialOrArray - Single material or array of materials
   * @param faceEntity - Face entity to get location from
   */
  withFaceLocation(
    materialOrArray: MaterialInfo | MaterialInfo[] | undefined,
    faceEntity: FaceEntity
  ): void;

  /**
   * Build BOM (Bill of Materials) data from the model
   * @param options - Build options including filter settings
   * @returns Array of material information for BOM
   */
  buildBom2Data(options?: BuildBomOptions): MaterialInfo[];

  /**
   * Get the location name for a face entity
   * @param faceEntity - Face entity to determine location
   * @returns Location name (e.g., 'floor', 'ceiling', 'wall', 'wallHole', etc.)
   */
  getFaceLocation(faceEntity: FaceEntity): string | undefined;

  /**
   * Get material information from material data
   * @param materialData - Material data object
   * @param validArea - Valid area where material is applied (default: 1)
   * @returns Material information for BOM
   */
  getMaterial(materialData: Material, validArea?: number): MaterialInfo;

  /**
   * Get materials used in a pave entity
   * @param paveEntity - Pave entity to extract materials from
   * @returns Array of material information
   */
  getPaveMaterials(paveEntity: PaveEntity): MaterialInfo[];

  /**
   * Calculate brick area from block information
   * @param blockInfo - Block information
   * @param unitArea - Area of the pattern unit
   * @returns Total area of the bricks
   * @private
   */
  private _getBrickArea(blockInfo: BlockInfo, unitArea: number): number;

  /**
   * Calculate accurate brick material counts including rubble patterns
   * Updates material counts in-place and resolves reference materials
   * @param materials - Array of materials to calculate
   * @param options - Build options for calculation behavior
   * @private
   */
  private _calculateBrickMaterials(
    materials: MaterialInfo[],
    options?: BuildBomOptions
  ): void;
}