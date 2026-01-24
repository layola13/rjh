import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { 
  genEntityTypeFromContent, 
  genCategoryDataFromContent, 
  getPathLength, 
  getEntityLayer 
} from './utils';

/**
 * Material category information
 */
interface MaterialCategory {
  /** Seek material ID */
  seekId: string;
  /** Alibaba model ID */
  aliModelId: string;
  /** Category type identifier */
  categoryType: string;
  /** Display name for the material */
  displayName: string;
  /** URL to the material texture */
  textureUrl: string;
}

/**
 * Material data structure
 */
interface MaterialData {
  /** Material category details */
  category?: MaterialCategory;
}

/**
 * Content interface representing molding entity data
 */
interface MoldingContent {
  /** Unique identifier for the content */
  id: string;
  /** Path coordinates defining the molding shape */
  path: number[][];
  /** Size in X dimension */
  XSize: number;
  /** Size in Y dimension */
  YSize: number;
  /** Parent entity reference */
  parent?: HSCore.Model.CustomizedModel | null;
}

/**
 * Entity representing a customized molding component in the scene.
 * Handles molding geometry, materials, and hierarchy relationships.
 * 
 * @extends AcceptEntity
 */
export declare class CustomizedMoldingEntity extends AcceptEntity {
  /**
   * Constructs a new CustomizedMoldingEntity instance
   */
  constructor();

  /**
   * Builds child entities for this molding.
   * Currently not implemented.
   */
  buildChildren(): void;

  /**
   * Builds and populates entity data from the provided content.
   * Sets instance data, entity type, and category information.
   * 
   * @param content - The molding content data to process
   */
  buildEntityData(content: MoldingContent): void;

  /**
   * Extracts and constructs instance data from molding content.
   * Includes path geometry, dimensions, material properties, and hierarchy info.
   * 
   * @param content - The molding content to extract data from
   * @returns Instance data object with all molding parameters
   */
  getInstanceData(content: MoldingContent): InstanceData;

  /**
   * Retrieves the room ID that contains this molding entity.
   * Traverses parent hierarchy to find the containing room.
   * 
   * @param content - The molding content to find the room for
   * @returns Room ID if found, undefined otherwise
   */
  getRoomId(content: MoldingContent): string | undefined;
}