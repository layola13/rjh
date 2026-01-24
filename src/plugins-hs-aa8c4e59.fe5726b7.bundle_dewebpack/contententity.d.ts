/**
 * Content entity module for managing content-based entities in the system.
 * Extends AcceptEntity with content-specific functionality.
 * @module ContentEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { HSCore } from './HSCore';

/**
 * Instance data structure containing entity parameters and metadata
 */
export interface InstanceData {
  /**
   * Add parameters to the instance data
   * @param params - Variable number of Parameter objects to add
   */
  addParameter(...params: Parameter[]): void;
}

/**
 * Content object structure passed to entity methods
 */
export interface ContentObject {
  /** Unique identifier for the content */
  id?: string;
  
  /** Parent content reference */
  parent?: {
    /** Parent's unique identifier */
    id?: string;
  };
  
  /** Additional content properties */
  [key: string]: unknown;
}

/**
 * Entity type descriptor
 */
export type EntityType = string;

/**
 * Category data descriptor for entity classification
 */
export type CategoryData = string | Record<string, unknown>;

/**
 * ContentEntity class handles content-specific entity operations.
 * Extends AcceptEntity to provide specialized content processing capabilities.
 * 
 * @example
 *