/**
 * Module: RegionEntity
 * Represents a region entity in the HSPaveSDK system for handling region-based paving operations
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSPaveSDK } from './HSPaveSDK';
import { Utils } from './Utils';

/**
 * Interface representing the configuration data for accepting a region entity
 */
interface RegionAcceptData {
  /** The mixed pave configuration */
  mixPave: any;
  /** The region instance to process */
  region: HSPaveSDK.Region;
  /** Optional outline paths for clipping */
  outline?: number[][][] | null;
  /** Array of face identifiers */
  faceIds: string[];
}

/**
 * Interface for pave template configuration
 */
interface PaveTemplate {
  pave?: {
    /** Whether the pattern adapts to material size */
    isPatternAdaptiveMaterialSize?: boolean;
  };
}

/**
 * Interface for region information returned by the decorator
 */
interface RegionInfo {
  /** The class type identifier */
  classType: string;
  /** Pattern information object */
  patternInfo: unknown;
  /** Material configuration */
  material: unknown;
  /** Block definitions */
  blocks: unknown;
  /** Element identifiers */
  elementIds: unknown;
  /** Component data */
  component: unknown;
  /** Size dimensions */
  size: number[];
  /** Parent region identifier */
  parentId: string;
  /** Modified brick data */
  modifyBricks: unknown;
  /** Region path coordinates */
  path: number[][];
}

/**
 * RegionEntity class extends AcceptEntity to handle region-specific entity operations
 * Manages hierarchical region structures with free regions and child regions
 */
export declare class RegionEntity extends AcceptEntity {
  constructor();

  /**
   * Builds child entities for the given region data
   * Processes both free regions and child regions with clipping operations
   * 
   * @param data - The region acceptance data containing region hierarchy
   */
  buildChildren(data: RegionAcceptData): void;

  /**
   * Builds entity data from region information
   * Decorates region info and sets instance data with type information
   * 
   * @param data - The region acceptance data
   * @param template - Optional pave template configuration
   */
  buildEntityData(data: RegionAcceptData, template?: PaveTemplate | null): void;

  /**
   * Generates instance data for a specific region
   * Calculates area metrics and compiles region parameters
   * 
   * @param data - The region acceptance data
   * @param regionInfo - The decorated region information
   * @returns Instance data with all region parameters
   */
  getInstanceData(data: RegionAcceptData, regionInfo: RegionInfo): InstanceData;
}