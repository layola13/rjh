/**
 * Module: CustomizedPMInsEdgeEntity
 * Represents a customized PM Insert Edge entity in the system.
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { Utils } from './Utils';

/**
 * Configuration data for building a CustomizedPMInsEdgeEntity
 */
interface EntityConfig {
  /** Entity type identifier */
  type: string;
  /** File or resource path */
  path: string;
  /** Length value of the edge */
  length: number;
}

/**
 * Type configuration for entity classification
 */
interface TypeConfig {
  /** Class type identifier with 'diy2_' prefix */
  classType: string;
}

/**
 * CustomizedPMInsEdgeEntity class
 * 
 * A specialized entity class for handling customized PM insert edges.
 * Extends AcceptEntity to provide custom building and data management capabilities.
 */
export declare class CustomizedPMInsEdgeEntity extends AcceptEntity {
  /**
   * Constructs a new CustomizedPMInsEdgeEntity instance
   */
  constructor();

  /**
   * Builds the child entities for this edge entity.
   * Currently does not perform any operations.
   */
  buildChildren(): void;

  /**
   * Builds and configures the entity data based on provided configuration.
   * Sets instance data and type information for the entity.
   * 
   * @param config - Configuration object containing type, path, and length information
   */
  buildEntityData(config: EntityConfig): void;

  /**
   * Creates and returns instance data from the provided configuration.
   * Adds a length parameter formatted as a number.
   * 
   * @param config - Configuration object containing path and length
   * @returns Configured InstanceData object with length parameter
   */
  getInstanceData(config: EntityConfig): InstanceData;

  /**
   * Sets the instance data for this entity (inherited from AcceptEntity)
   * 
   * @param data - Instance data to set
   */
  protected setInstanceData(data: InstanceData): void;

  /**
   * Sets the type configuration for this entity (inherited from AcceptEntity)
   * 
   * @param config - Type configuration object
   */
  protected setType(config: TypeConfig): void;
}