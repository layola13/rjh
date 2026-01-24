/**
 * Flue entity class for chimney/flue modeling
 * Extends Obstacle to provide specialized flue functionality with body face normal validation
 */

import { Obstacle } from './Obstacle';
import { Entity } from './Entity';

/**
 * Metadata interface for initializing Flue entities
 */
interface FlueMeta {
  /** WebCAD document data */
  webCADDocument?: unknown;
  /** Additional metadata properties */
  [key: string]: unknown;
}

/**
 * Flue class representing a chimney or flue object in the model
 * Automatically validates body face normals during initialization
 */
export class Flue extends Obstacle {
  /**
   * WebCAD document associated with this flue entity
   */
  webCADDocument?: unknown;

  /**
   * Creates a new Flue instance
   * @param id - Unique identifier for the flue entity (default: empty string)
   * @param parent - Optional parent entity reference
   */
  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
  }

  /**
   * Initializes the flue entity from metadata
   * Validates body face normals in the WebCAD document after parent initialization
   * @param meta - Metadata object containing initialization parameters
   */
  initByMeta(meta: FlueMeta): void {
    super.initByMeta(meta);
    this.webCADDocument = WebCADModelAPI.validateBodyFaceNormals(this.webCADDocument);
  }
}

/**
 * Global WebCAD Model API interface
 */
declare global {
  const WebCADModelAPI: {
    validateBodyFaceNormals(document: unknown): unknown;
  };

  const HSConstants: {
    ModelClass: {
      NgFlue: string;
    };
  };
}

// Register Flue class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgFlue, Flue);