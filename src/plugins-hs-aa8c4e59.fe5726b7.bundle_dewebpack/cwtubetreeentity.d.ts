import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ParameterNames } from './ParameterNames';
import { CWTubeEntity } from './CWTubeEntity';

/**
 * Represents a tube tree entity in the CAD/CAM system.
 * Manages hierarchical structure of tube components.
 * 
 * @extends AcceptEntity
 */
export declare class CWTubeTreeEntity extends AcceptEntity {
  /**
   * Creates a new CWTubeTreeEntity instance.
   */
  constructor();

  /**
   * Builds child entities from tube data.
   * Creates CWTubeEntity instances for each tube in the collection.
   * 
   * @param data - The source data containing tubes collection
   */
  buildChildren(data: TubeTreeData): void;

  /**
   * Builds and sets entity data from source object.
   * Configures instance data and entity type classification.
   * 
   * @param data - The source data for entity configuration
   */
  buildEntityData(data: TubeTreeData): void;

  /**
   * Extracts and constructs instance data from source object.
   * Creates InstanceData with id and parentId parameter.
   * 
   * @param data - The source data containing entity identifiers
   * @returns Configured InstanceData object
   */
  getInstanceData(data: TubeTreeData): InstanceData;
}

/**
 * Data structure for tube tree entity configuration.
 */
export interface TubeTreeData {
  /** Unique identifier for the entity */
  id: string;
  
  /** Parent entity identifier for hierarchical relationship */
  parentId: string;
  
  /** Classification type for the entity */
  classType: string;
  
  /** Collection of child tube entities */
  tubes: TubeData[];
}

/**
 * Data structure for individual tube configuration.
 */
export interface TubeData {
  /** Tube-specific properties (extend as needed) */
  [key: string]: unknown;
}