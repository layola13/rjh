/**
 * Material replacement request for content entities.
 * Handles the transactional replacement of materials on 3D mesh objects.
 */

import { HSCore } from 'hscore-types';
import { MaterialData, MaterialUtils } from './material-utils';

/**
 * Interface representing the initialization tile size for materials.
 */
interface MaterialTileSize {
  /** Horizontal tile size initialization value */
  initTileSize_x: number;
  /** Vertical tile size initialization value */
  initTileSize_y: number;
}

/**
 * Interface for entities that support material operations.
 */
interface IMaterialEntity {
  /**
   * Sets material data for a specific mesh.
   * @param meshName - Name of the target mesh
   * @param materialData - Material configuration data
   */
  setMaterial(meshName: string, materialData: MaterialData): void;
}

/**
 * Request class for replacing materials on content entities.
 * Extends the base StateRequest to support transactional material changes.
 */
export declare class ContentMaterialReplaceRequest extends HSCore.Transaction.Common.StateRequest {
  /** The target entity to apply material changes */
  entity: IMaterialEntity;
  
  /** Name of the mesh to replace material on */
  meshName: string;
  
  /** Material configuration data to apply */
  materialData: MaterialData;
  
  /** Whether to use the mesh's UV coordinates */
  private _useMeshUV: boolean;

  /**
   * Creates a new material replacement request.
   * @param entity - Target entity containing the mesh
   * @param meshName - Name of the mesh to modify
   * @param materialData - New material data to apply
   * @param useMeshUV - Whether to use mesh UV mapping (default: false)
   */
  constructor(
    entity: IMaterialEntity,
    meshName: string,
    materialData: MaterialData,
    useMeshUV?: boolean
  );

  /**
   * Commits the material replacement operation.
   * Calculates initial tile sizes and applies the material to the target mesh.
   * @override
   */
  onCommit(): void;

  /**
   * Determines if this request can participate in field-level transactions.
   * @returns Always returns true for material replacement requests
   * @override
   */
  canTransactField(): boolean;
}