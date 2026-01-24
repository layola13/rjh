/**
 * Kitchen accessories placement module
 * Provides utilities for placing kitchen accessories in 3D space
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * 3D position coordinates
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D position coordinates
 */
export interface Position2D {
  x: number;
  y: number;
}

/**
 * Kitchen area type
 */
export type KitchenAreaType = 'prepare' | 'cut' | 'finish' | 'cook';

/**
 * Line segment in 3D space
 */
export interface LineSegment {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

/**
 * Product metadata
 */
export interface ProductMeta {
  id: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  [key: string]: unknown;
}

/**
 * Content definition for kitchen accessories
 */
export interface ContentDefinition {
  /** Display label */
  label: string;
  /** Product tag ID for catalog lookup */
  tag?: string;
  /** Whether multiple instances are allowed */
  allowMutiple: boolean;
  /** Array of product IDs */
  items: string[];
  /** Default product IDs if tag lookup fails */
  defaultItems: string[];
  /** Resolved product metadata */
  metas: ProductMeta[];
}

/**
 * Kitchen area information
 */
export interface AreaInfo {
  /** Area type identifier */
  type: KitchenAreaType;
  /** Working paths defining the area */
  path: Position2D[][];
  /** Reference line segment */
  startLine?: LineSegment;
  /** Height offset from base cabinet */
  height: number;
  /** Reference direction vector */
  refDir?: THREE.Vector3;
  /** Reference position */
  referencePos?: THREE.Vector3;
  /** Associated cabinet assemblies */
  cabinets: unknown[];
  /** Content definitions to place */
  contentDefs?: ContentDefinition[];
  /** Auto-placement function */
  autoPlaceFunc: (areaInfo: AreaInfo) => void;
}

/**
 * Placement metadata result
 */
export interface PlacementMeta {
  /** Product metadata to place */
  meta: ProductMeta;
  /** 3D location for placement */
  location: Position3D;
  /** Rotation angle in radians */
  rotation: number;
}

/**
 * Countertop information
 */
export interface CountertopInfo {
  countertop: unknown;
  countertopPath: Position2D[];
  backSplashPath: Position2D[][];
  area: number;
  sinkCabinet?: Position3D;
  cookCabinet?: Position3D;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Minimum spacing between accessories (in meters)
 */
export const ACCESSORY_SPACING: 0.08;

/**
 * Offset against boundary (in meters)
 */
export const BOUNDARY_OFFSET: 0.03;

/**
 * Maximum distance threshold (in meters)
 */
export const MAX_DISTANCE_THRESHOLD: 0.2;

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Places kitchen accessories in the specified room
 * @param room - Target room entity
 * @param resetSelection - Whether to reset selection after placement
 * @param fetchFromCatalog - Whether to fetch products from catalog
 * @returns Promise that resolves when placement is complete
 */
export function placeAccessoriesInKitchen(
  room: unknown,
  resetSelection?: boolean,
  fetchFromCatalog?: boolean
): Promise<void>;

/**
 * Adds a product to the scene
 * @param productMeta - Product metadata
 * @param position - 3D position
 * @param rotation - Rotation angle in radians
 * @param additionalParams - Optional additional parameters
 * @returns Product assembly result
 */
export function addProduct(
  productMeta: ProductMeta,
  position: Position3D,
  rotation: number,
  additionalParams?: unknown
): unknown;

/**
 * Generates a random index within range [0, max]
 * @param max - Maximum value (inclusive)
 * @returns Random integer
 */
export function generateRandomIndex(max: number): number;

/**
 * Generates array of unique random numbers
 * @param max - Maximum value for random numbers
 * @param count - How many random numbers to generate
 * @returns Array of unique random integers
 */
export function generateRandomNumbers(max: number, count: number): number[];

/**
 * Creates array by randomly selecting elements from source array
 * @param sourceArray - Source array to select from
 * @param selectionCount - Number of elements to select
 * @returns Array of randomly selected elements
 */
export function createArrayByRandomSelection<T>(
  sourceArray: T[],
  selectionCount: number
): T[];

// ============================================================================
// Internal Classes
// ============================================================================

/**
 * Manages placement of accessories within a kitchen area
 * @internal
 */
declare class AccessoryPlacementManager {
  /**
   * Creates a new placement manager
   * @param areaInfo - Area information
   * @param contentCount - Number of content types
   */
  constructor(areaInfo: AreaInfo, contentCount: number);

  /**
   * Finds suitable placement location for content
   * @param contentDef - Content definition
   * @returns Placement metadata or undefined if no suitable location found
   */
  findPlaceForContent(contentDef: ContentDefinition): PlacementMeta | undefined;
}

// ============================================================================
// Utility Functions (Internal)
// ============================================================================

/**
 * Finds closest base cabinet to a position
 * @internal
 */
declare function findClosestBaseCabinet(
  cabinets: unknown[] | undefined,
  position: Position2D
): unknown;

/**
 * Splits path by line segment intersection
 * @internal
 */
declare function splitPathByLine(
  path: Position2D[],
  line: LineSegment,
  referencePos?: Position2D
): Position2D[][];

/**
 * Filters backsplash paths
 * @internal
 */
declare function filterBacksplashPath(
  paths: Position2D[][] | Position2D[],
  cabinets?: unknown[]
): Position2D[];

/**
 * Segments path by cabinet width
 * @internal
 */
declare function segmentPathByCabinet(
  path: Position2D[],
  cabinet: { XLength: number; YLength: number }
): Position2D[][][];

/**
 * Fetches content definitions by area type
 * @internal
 */
declare function fetchContentDefinitions(
  areaType: KitchenAreaType,
  contentConfig: Record<KitchenAreaType, ContentDefinition[]>,
  maxItems?: number,
  useCatalog?: boolean
): Promise<ContentDefinition[]>;

/**
 * Auto-placement function for prepare/cut/finish areas
 * @internal
 */
declare function autoPlaceStandardArea(areaInfo: AreaInfo): void;

/**
 * Auto-placement function for cooking area
 * @internal
 */
declare function autoPlaceCookingArea(areaInfo: AreaInfo): void;

/**
 * Places hanging accessories above cooking area
 * @internal
 */
declare function placeHangingAccessories(
  areaInfo: AreaInfo,
  productMetas: ProductMeta[]
): void;