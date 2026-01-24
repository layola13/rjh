/**
 * BOM3 data formatting and entity conversion utilities
 * Provides functions for transforming entities, groups, and paths into BOM3 format
 */

import { HSPaveSDK } from './pave-sdk';
import { groupBy } from './utils';
import { Utils } from './utils/format';

/**
 * Parameter name constants for entity properties
 */
export interface ParameterNames {
  parentId: string;
  center: string;
  rotation: string;
  scale: string;
  size: string;
  path: string;
  area: string;
}

/**
 * 2D point coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Vector data structure
 */
export interface VectorData {
  data: Point2D[];
}

/**
 * Path region with outer boundary and holes
 */
export interface PathRegion {
  /** Outer boundary points */
  outer: Point2D[][];
  /** Inner hole points */
  holes: Point2D[][][];
}

/**
 * Entity type information
 */
export interface EntityType {
  /** BOM classification type */
  classType: string;
  [key: string]: unknown;
}

/**
 * Entity category information
 */
export interface EntityCategory {
  /** Unique identifier for the category */
  seekId?: string;
  [key: string]: unknown;
}

/**
 * Entity instance data
 */
export interface EntityInstance {
  /** Unique instance identifier */
  id: string;
  /** Parent entity identifier */
  parentId?: string;
  /** Center position */
  center?: Point2D;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Scale factor */
  scale?: number;
  /** Dimensions */
  size?: { width: number; height: number };
  /** Path data */
  path?: PathRegion[];
  /** Area value */
  area?: number;
  /**
   * Get parameter value by name
   */
  getParameterValue(paramName: string): unknown;
}

/**
 * Base entity structure
 */
export interface PaveEntity {
  /** Entity type */
  type: EntityType;
  /** Entity category */
  category?: EntityCategory;
  /** Entity instance */
  instance: EntityInstance;
  /** Unique identifier prefix */
  prefix?: string;
  /**
   * Get the runtime instance ID
   */
  getInstanceId(): string;
  /**
   * Get the persistent entity ID
   */
  getId(): string;
  /**
   * Traverse entity hierarchy
   */
  traverse(callback: (entity: PaveEntity) => boolean): void;
}

/**
 * BOM3 entity representation
 */
export interface Bom3Entity {
  /** Entity type information */
  type?: EntityType;
  /** Entity category information */
  category?: EntityCategory;
  /** Entity instance data */
  instance: {
    id: string;
    parentId?: string;
    center?: Point2D;
    rotation?: number;
    scale?: number;
    size?: { width: number; height: number };
    path?: PathRegion[];
    area?: number;
  };
}

/**
 * BOM3 data item
 */
export interface Bom3DataItem {
  [key: string]: unknown;
}

/**
 * Contents information summary
 */
export interface ContentsInfo {
  /** Entity type */
  type: EntityType;
  /** Entity category */
  category: EntityCategory;
  /** Number of instances */
  count: number;
  /** List of instances */
  instances: Array<{
    id: string;
    parentId?: string;
    center?: Point2D;
    rotation?: number;
    scale?: number;
    size?: { width: number; height: number };
    path?: PathRegion[];
    area?: number;
  }>;
}

/**
 * Grouped entities with metadata
 */
export interface GroupedEntities {
  entities: PaveEntity[];
  [key: string]: unknown;
}

/**
 * Sketch with entity and regions
 */
export interface SketchData {
  /** Pre-processed entity data */
  entity: Bom3Entity;
  /** Associated BOM3 data regions */
  regions: Bom3DataItem[];
}

/**
 * Result of pave entity to BOM3 conversion
 */
export interface PaveToBom3Result {
  /** Sketch entities with regions */
  sketches: SketchData[];
  /** Water jet tile components */
  waterJets: Bom3DataItem[];
}

/**
 * BOM3 data builder interface
 */
export interface Bom3DataBuilder {
  /**
   * Build BOM3 data from entity
   */
  buildBom3Data(entity: PaveEntity): Bom3DataItem[] | null;
}

/**
 * Entity conversion options
 */
export interface EntityConversionOptions {
  /** Exclude type information */
  ignoreType?: boolean;
  /** Exclude category information */
  ignoreCategory?: boolean;
}

/**
 * Format number points to specified precision
 * @param points - Array of numeric points to format
 * @returns Formatted number points
 */
export function formatNumberPoints(points: number[]): number[];

/**
 * Generate BOM3 data from grouped entities
 * @param groupMap - Map of entity groups by key
 * @param key - Group key to retrieve
 * @param builder - BOM3 data builder instance
 * @returns Array of BOM3 data items
 */
export function genBom3DataFromGroup(
  groupMap: Map<string, PaveEntity[]>,
  key: string,
  builder: Bom3DataBuilder
): Bom3DataItem[];

/**
 * Generate contents information summary from entities
 * Groups entities by category and aggregates instance data
 * @param entities - Array of pave entities
 * @returns Array of contents information objects
 */
export function genContentsInfo(entities: PaveEntity[]): ContentsInfo[];

/**
 * Convert path curves to XY coordinate arrays
 * Optionally clips paths against a clipping region
 * @param paths - Input path regions
 * @param clipRegion - Optional clipping region
 * @returns Array of path regions with XY coordinates
 */
export function getPathToXY(
  paths: Array<{ outer: unknown[]; holes: unknown[][] }>,
  clipRegion?: unknown
): PathRegion[];

/**
 * Set object parameter values from entity instance
 * @param target - Target object to populate
 * @param entity - Source entity with parameters
 * @param parameterMap - Mapping of parameter names to target keys
 * @param validateParams - Whether to validate parameter existence
 */
export function setObjectParameterValues(
  target: Record<string, unknown>,
  entity: PaveEntity,
  parameterMap: Record<string, string>,
  validateParams?: boolean
): void;

/**
 * Convert pave entity to BOM3 entity format
 * @param entity - Source pave entity
 * @param options - Conversion options
 * @returns BOM3 entity representation
 */
export function turnEntityToBom3Entity(
  entity: PaveEntity,
  options?: EntityConversionOptions
): Bom3Entity;

/**
 * Pre-process entity for BOM3 conversion with full ID path
 * @param entity - Source pave entity
 * @returns BOM3 entity with prefixed IDs
 */
export function turnEntityToBom3EntityPre(entity: PaveEntity): Bom3Entity;

/**
 * Convert pave entities to BOM3 data structures
 * Separates sketches and water jet tiles
 * @param entities - Array of pave entities to convert
 * @param builder - BOM3 data builder instance
 * @returns Object containing sketches and waterJets arrays
 */
export function turnPaveEntityToBom3Data(
  entities: PaveEntity[],
  builder: Bom3DataBuilder
): PaveToBom3Result;