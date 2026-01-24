/**
 * Countertop calculation utilities module
 * Provides functions for calculating countertop geometry, including profiles, backsplashes, and connections
 */

import { Vector2, Vector3 } from 'three';
import * as HSCore from '@/core';
import * as HSCatalog from '@/catalog';
import { StateIds, CounterTopLocalIds } from '@/constants/countertop';
import {
  fixnumber,
  fixpoints,
  zCounter,
  mapZCounter,
  calcClipPaths,
  calcWaterBar,
  calcClipPolygon,
  updateToleranceOfPaths,
  calcBoardPath,
  calcOffset,
  SubObstacle,
  calcAddRoomPath,
  calcAddRoomPathHighLowCountertop,
  refreshProfile,
  isZipBoardI,
  isScaleDecoPanel,
  getRoomPath,
  fixpoint,
  convert2Local,
} from '@/utils/geometry';

/** Default countertop product seek ID */
const DEFAULT_COUNTERTOP_SEEK_ID = 'b4cba8ff-7e1f-4816-8f6d-417be3272c8e';

/** Tolerance for numerical comparison */
const NUMERICAL_TOLERANCE = 0.005;

/**
 * Point in 3D space
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Countertop extension options (in meters)
 */
interface CountertopExtend {
  left: number;
  right: number;
  front: number;
  back: number;
}

/**
 * Countertop height parameters
 */
interface CountertopHeight {
  countertop?: number;
  backsplash?: number;
  nodripedge?: number;
  nodripedgeOffset?: number;
}

/**
 * Calculated countertop data
 */
interface CountertopData {
  /** Main countertop profile path */
  countertop: Point3D[];
  /** Backsplash profile paths */
  backsplash: Point3D[][];
  /** No-drip edge profile paths */
  noDripEdge: Point3D[][];
  /** IDs of cabinets included under this countertop */
  cabinets: string[];
  /** Hole paths for sinks/cooktops */
  holePath: Point3D[][];
  /** Z-position of the countertop */
  z: number;
  /** Extension parameters */
  extend: CountertopExtend;
  /** Optional height parameters */
  height?: CountertopHeight;
}

/**
 * Customized path configuration
 */
interface CustomizedPathConfig {
  customizedPath: Point3D[];
}

/**
 * Molding profile options
 */
interface MoldingOptions {
  profileMeta: unknown;
  material: unknown;
  states: Array<{ id: string; value: number }>;
}

/**
 * Cabinet or assembly entity type
 */
type CabinetEntity = HSCore.Model.PAssembly | HSCore.Model.Content;

/**
 * Calculate countertops based on selected cabinets
 * @param cabinetIds - Optional array of cabinet entity IDs. If not provided, calculates for all base cabinets
 * @param extend - Extension parameters for countertop edges
 * @param sinkConfig - Optional sink positioning configuration
 * @param targetRoom - Optional room to limit calculations
 * @returns Array of calculated countertop data
 */
export function calcCounterTop(
  cabinetIds?: string[],
  extend: CountertopExtend = { left: 0, right: 0, front: 0, back: 0 },
  sinkConfig?: { sinkPosition: 'top' | 'bottom' },
  targetRoom?: HSCore.Model.Room
): CountertopData[];

/**
 * Calculate countertops with customized path
 * @param config - Configuration with custom path
 * @returns Array of calculated countertop data
 */
export function calcCounterTopWithCustomizedPath(
  config: CustomizedPathConfig
): CountertopData[];

/**
 * Calculate countertops without high-low differentiation
 * @param cabinetIds - Optional array of cabinet entity IDs
 * @param extend - Extension parameters
 * @param config - Optional customized path configuration
 * @returns Array of calculated countertop data
 */
export function calcCounterTopWithoutHighLowCountertop(
  cabinetIds: string[] | undefined,
  extend: CountertopExtend,
  config?: CustomizedPathConfig
): CountertopData[];

/**
 * Calculate countertops with high-low connections
 * @param cabinetIds - Optional array of cabinet entity IDs
 * @param extend - Extension parameters
 * @param profileMeta - Profile metadata for connections
 * @param offsetZ - Z-axis offset
 * @param targetRoom - Optional room to limit calculations
 * @returns Array of calculated countertop data including connection pieces
 */
export function calcCounterTopWithHighLowConnection(
  cabinetIds: string[] | undefined,
  extend: CountertopExtend,
  profileMeta: { profile: unknown; profileSizeX: number; profileSizeY: number },
  offsetZ: number,
  targetRoom?: HSCore.Model.Room
): CountertopData[];

/**
 * Calculate connection piece between high and low countertops
 * @param lowerCabinet - Lower cabinet entity
 * @param higherCabinet - Higher cabinet entity
 * @param existingCountertops - Existing countertop calculations
 * @param extend - Extension parameters
 * @param thickness - Countertop thickness
 * @returns Connection countertop data or null if no valid connection
 */
export function calcCounterTopHighLowConnection(
  lowerCabinet: CabinetEntity,
  higherCabinet: CabinetEntity,
  existingCountertops: CountertopData[],
  extend: CountertopExtend,
  thickness: number
): CountertopData | null;

/**
 * Fill in parameters for countertop metadata
 * @param metadata - Source metadata template
 * @param countertopData - Calculated countertop data
 * @param mode - Processing mode (0 = standard, other = custom)
 * @param hasCustomPath - Whether custom path is used
 * @returns Processed metadata with filled parameters
 */
export function fillInParameters(
  metadata: unknown,
  countertopData: CountertopData,
  mode?: number,
  hasCustomPath?: boolean
): unknown;

/**
 * Fill in parameters without differentiating countertop types
 * @param metadata - Source metadata template
 * @param countertopData - Calculated countertop data
 * @param mode - Processing mode
 * @param hasCustomPath - Whether custom path is used
 * @returns Processed metadata with filled parameters
 */
export function fillInParametersWithoutDiffCountertop(
  metadata: unknown,
  countertopData: CountertopData,
  mode?: number,
  hasCustomPath?: boolean
): unknown;

/**
 * Get all base cabinets in the scene
 * @param cabinetIds - Optional filter by specific cabinet IDs
 * @returns Array of cabinet entities
 */
export function getAllCabinet(cabinetIds?: string[]): CabinetEntity[];

/**
 * Get all existing countertop entities in a room
 * @param room - Optional room to filter by
 * @returns Array of countertop entities
 */
export function getAllCounterTops(room?: HSCore.Model.Room): HSCore.Model.PAssembly[];

/**
 * Calculate which cabinets are included under a countertop profile
 * @param profile - Countertop profile path
 * @param zHeight - Z-height of the countertop
 * @returns Array of cabinet IDs
 */
export function calcIncludeCabinets(profile: Point3D[], zHeight: number): string[];

/**
 * Get countertop extension options from entity state
 * @param entity - Countertop entity
 * @returns Extension parameters
 */
export function getCounterTopExtendOptions(entity: HSCore.Model.PAssembly): CountertopExtend;

/**
 * Get molding options (backsplash or no-drip edge) from countertop
 * @param entity - Countertop entity
 * @param localId - Local ID of the molding child (backsplash or noDripEdge)
 * @returns Molding configuration
 */
export function getCounterTopMoldingOptions(
  entity: HSCore.Model.PAssembly,
  localId: string
): MoldingOptions;

/**
 * Get state value by ID from entity
 * @param entity - Entity with states
 * @param stateId - State identifier
 * @returns State value
 */
export function getStateValueByID(entity: HSCore.Model.PAssembly, stateId: string): unknown;

/**
 * Set state value by ID on entity
 * @param entity - Entity to update
 * @param value - New value
 * @param stateId - State identifier
 */
export function setStateValueByID(
  entity: HSCore.Model.PAssembly,
  value: unknown,
  stateId: string
): void;

/**
 * Get height from metadata
 * @param metadata - Countertop metadata
 * @returns Height value in meters
 */
export function getHeightFromMeta(metadata: unknown): number;

/**
 * Check if entity is a countertop
 * @param entity - Entity to check
 * @returns True if entity is a countertop
 */
export function isCounterTop(entity: HSCore.Model.Entity): boolean;

/**
 * Load countertop product by seek ID
 * @param seekId - Product seek ID, defaults to standard countertop
 * @returns Promise resolving to product data
 */
export function loadProduct(seekId?: string): Promise<unknown>;