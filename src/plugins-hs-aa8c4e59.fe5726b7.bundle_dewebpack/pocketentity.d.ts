/**
 * PocketEntity module - Entity representation for pocket/molding components
 * @module PocketEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genCategoryDataFromContent, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

/**
 * Material metadata interface
 */
interface MaterialMetadata {
  aliModelId?: string;
  seekId?: string;
  metadata?: MaterialMetadata;
  [key: string]: unknown;
}

/**
 * Content parameters interface
 */
interface ContentParameters {
  materialData?: {
    metadata?: MaterialMetadata;
  } & MaterialMetadata;
}

/**
 * Parent entity reference
 */
interface ParentEntity {
  id: string;
}

/**
 * Content entity structure for building pocket entities
 */
interface ContentEntity {
  /** Unique identifier */
  id: string;
  /** Parent entity reference */
  parent?: ParentEntity | null;
  /** X dimension size */
  XSize: number;
  /** Y dimension size (thickness) */
  YSize: number;
  /** Side identifier */
  side: string;
  /** Material information */
  material?: MaterialMetadata;
  /** Additional parameters */
  parameters?: ContentParameters;
}

/**
 * PocketEntity class representing a molding/pocket component in the scene
 * Extends AcceptEntity to provide specialized entity data building functionality
 */
export class PocketEntity extends AcceptEntity {
  constructor();

  /**
   * Build entity data from content
   * Extracts and sets instance data, type, and category from the provided content
   * @param content - Source content entity containing pocket/molding information
   */
  buildEntityData(content: ContentEntity): void;

  /**
   * Build child entities (no-op for PocketEntity)
   * Override point for subclasses that need to construct child hierarchies
   */
  buildChildren(): void;

  /**
   * Extract instance data from content entity
   * Generates comprehensive instance data including geometry, material, and hierarchy information
   * @param content - Source content entity
   * @returns Instance data with all relevant parameters
   */
  getInstanceData(content: ContentEntity): InstanceData;
}

/**
 * Global application interface (legacy HSApp reference)
 */
declare global {
  const HSApp: {
    App: {
      getApp(): {
        catalogManager: {
          /**
           * Retrieve building product metadata by seek ID
           * @param seekId - Product identifier
           * @returns Material metadata
           */
          getBuildingProductMeta(seekId: string): MaterialMetadata;
        };
      };
    };
  };
}