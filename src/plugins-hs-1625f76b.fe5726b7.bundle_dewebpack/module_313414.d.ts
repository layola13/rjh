/**
 * Material replacement command for entities
 * Handles material changes on specific meshes with undo/redo support
 */

import { Command } from '@hsapp/command';
import { Entity } from '@hsapp/entity';
import { TransactionManager } from '@hsapp/transaction';

/**
 * Material data structure for mesh rendering
 */
export interface MaterialData {
  /** Material identifier or name */
  id?: string;
  /** Material properties and parameters */
  properties?: Record<string, unknown>;
  /** Texture mappings */
  textures?: Record<string, string>;
  /** Shader configuration */
  shader?: string;
}

/**
 * Entity metadata containing customization information
 */
export interface EntityMetadata {
  /** Custom size dimensions */
  customSize?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  [key: string]: unknown;
}

/**
 * Entity with material replacement capabilities
 */
export interface MaterialEntity {
  /** Entity metadata */
  metadata: EntityMetadata;
  /** Entity identifier */
  id?: string;
  /** Entity type */
  type?: string;
}

/**
 * Command for replacing material on a specific mesh of an entity
 * 
 * @remarks
 * This command creates a material replacement request through the transaction manager.
 * Note: This command does not support undo/redo operations.
 * 
 * @example
 *