/**
 * Customized PM Instance Face Entity
 * Represents a face entity with customized paving materials and regions
 */

import { AcceptEntity } from './AcceptEntity';
import { RegionEntity } from './RegionEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSPaveSDK, ClipMode } from './HSPaveSDK';
import { Utils } from './Utils';

/**
 * Area information for a face entity
 */
interface AreaInfo {
  /** Full area of the face in square units */
  fullArea: number;
  /** Valid/usable area of the face in square units */
  validArea: number;
}

/**
 * Material decorator information
 */
interface DecoratorInfo {
  /** Outline path of the decorator */
  outline?: any;
  /** Mixed paving configuration */
  mixPave?: MixPaveConfig;
  /** Seek/resource identifier */
  seekId?: string;
  /** Additional material properties */
  [key: string]: any;
}

/**
 * Mixed paving configuration with regions
 */
interface MixPaveConfig {
  /** Independent regions that don't interact with other regions */
  independentRegions: Region[];
  /** Regular regions that may overlap or interact */
  regions: Region[];
}

/**
 * Region definition within a paving layout
 */
interface Region {
  /** Unique path/identifier for the region */
  path: string;
  /** Additional region properties */
  [key: string]: any;
}

/**
 * Face entity configuration data
 */
interface FaceEntityData {
  /** Unique path/identifier for the face */
  path: string;
  /** Type classification of the face */
  type: string;
  /** Full area of the face */
  fullArea: number;
  /** Valid/usable area of the face */
  validArea: number;
  /** Optional decorator information */
  decoratorInfo?: DecoratorInfo;
}

/**
 * Region acceptance parameters
 */
interface RegionAcceptParams {
  /** Region configuration */
  region: Region;
  /** Outline paths */
  outline: any[];
  /** Mixed paving configuration */
  mixPave: MixPaveConfig;
  /** Associated face IDs */
  faceIds: string[];
}

/**
 * 2D material parameters
 */
interface Material2DParams {
  /** Material configuration (optional) */
  material?: DecoratorInfo;
}

/**
 * Customized PM Instance Face Entity
 * Handles face entities with customized paving materials, including mixed paving regions
 * and material decorators
 */
export declare class CustomizedPMInsFaceEntity extends AcceptEntity {
  constructor();

  /**
   * Build child entities from face data
   * Creates RegionEntity children for independent regions and regular regions
   * @param data - Face entity configuration data
   */
  protected buildChildren(data: FaceEntityData): void;

  /**
   * Build and set entity data from face configuration
   * @param data - Face entity configuration data
   */
  protected buildEntityData(data: FaceEntityData): void;

  /**
   * Get instance data from face entity configuration
   * Extracts area information and material parameters
   * @param data - Face entity configuration data
   * @returns Instance data with parameters
   */
  protected getInstanceData(data: FaceEntityData): InstanceData;
}