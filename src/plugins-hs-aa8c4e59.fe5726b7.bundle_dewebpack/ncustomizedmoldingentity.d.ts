import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

/**
 * Generates entity type from content
 * @param content - The content object to extract entity type from
 */
export declare function genEntityTypeFromContent(content: any): string;

/**
 * Generates category data from content
 * @param content - The content object to extract category data from
 */
export declare function genCategoryDataFromContent(content: any): any;

/**
 * Gets the entity layer information
 * @param entity - The entity to get layer from
 */
export declare function getEntityLayer(entity: any): { id: string } | undefined;

/**
 * Material data structure for customized molding
 */
export interface MaterialData {
  seekId: string;
  aliModelId: string;
  name: string;
  textureURI: string;
}

/**
 * Material category structure used in entity parameters
 */
export interface MaterialCategory {
  category: {
    seekId: string;
    aliModelId: string;
    categoryType: string;
    displayName: string;
    textureUrl: string;
  };
}

/**
 * 3D path segment with length calculation capability
 */
export interface Path3DSegment {
  /**
   * Gets the length of this path segment
   */
  getLength(): number;
}

/**
 * Content interface for customized molding entity
 */
export interface CustomizedMoldingContent {
  /** Unique identifier */
  id: string;
  
  /** Parent entity reference */
  parent?: HSCore.Model.NCustomizedFeatureModel;
  
  /** Width of the molding profile */
  profileWidth: number;
  
  /** Height of the molding profile */
  profileHeight: number;
  
  /**
   * Gets the 3D sweep path for the molding
   * @returns Array of path segments or undefined if path is not available
   */
  getSweepPath3D(): Path3DSegment[] | undefined;
  
  /**
   * Gets material data if this is a NCustomizedModelMolding instance
   */
  getMaterialData?(): MaterialData;
}

/**
 * Customized molding entity class
 * Extends AcceptEntity to handle customized molding elements in the scene
 */
export declare class NCustomizedMoldingEntity extends AcceptEntity {
  /**
   * Constructs a new NCustomizedMoldingEntity instance
   */
  constructor();

  /**
   * Builds child entities (empty implementation for molding entities)
   */
  buildChildren(): void;

  /**
   * Builds entity data from the provided content
   * Sets instance data, type, and category based on content properties
   * @param content - The customized molding content object
   */
  buildEntityData(content: CustomizedMoldingContent): void;

  /**
   * Extracts and formats instance data from content
   * @param content - The customized molding content object
   * @returns Formatted instance data with parameters including:
   *  - layerId: Layer identifier
   *  - roomId: Associated room identifier
   *  - parentId: Parent entity identifier
   *  - path: 3D sweep path segments
   *  - size: [length, width, height] dimensions
   *  - material: Material category information
   *  - length: Total path length
   */
  getInstanceData(content: CustomizedMoldingContent): InstanceData;

  /**
   * Calculates total length of a 3D path
   * @param path - Array of path segments
   * @returns Sum of all segment lengths
   */
  getPathLength(path: Path3DSegment[]): number;

  /**
   * Retrieves the room ID containing this molding entity
   * @param entity - The entity to find room for
   * @returns Room identifier or undefined if not found
   */
  getRoomId(entity: CustomizedMoldingContent): string | undefined;
}