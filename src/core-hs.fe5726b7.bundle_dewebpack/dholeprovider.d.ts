/**
 * Data provider for hole entities in a 3D modeling system.
 * Handles coordinate transformation and face path retrieval for holes in walls.
 * 
 * @module DHoleProvider
 */

import { IDataProvider } from './IDataProvider';

/**
 * Provides data access for hole entities, particularly for retrieving
 * face paths in world space coordinates.
 * 
 * @class DHoleProvider
 * @extends IDataProvider
 */
export declare class DHoleProvider extends IDataProvider {
  /**
   * The hole entity this provider manages.
   * @private
   */
  private readonly _entity: HSCore.Entity.Hole;

  /**
   * Creates a new DHoleProvider instance.
   * 
   * @param entity - The hole entity to provide data for
   */
  constructor(entity: HSCore.Entity.Hole);

  /**
   * Retrieves the face path of a hole in world space coordinates.
   * Returns the outer loop polygon vertices transformed to world space
   * if the hole's host is a Wall, otherwise returns an empty array.
   * 
   * @param face - The face object containing geometric data
   * @param _t - Unused parameter (potentially for future use)
   * @returns Array of 3D vectors representing the face path in world coordinates
   */
  getFacePath(face: HSCore.Geometry.Face, _t?: unknown): THREE.Vector3[];

  /**
   * Converts an array of local space vectors to world space coordinates
   * by applying the entity's transformation matrix.
   * 
   * @param vectors - Array of vectors in local space
   * @returns Array of vectors transformed to world space
   * @private
   */
  private _convertToWorldSpace(vectors: THREE.Vector3[]): THREE.Vector3[];
}

/**
 * Extended HSCore type definitions for this module.
 */
declare global {
  namespace HSCore {
    namespace Entity {
      interface Hole {
        getHost(): HSCore.Model.Wall | unknown;
      }
    }

    namespace Model {
      interface Wall {}
    }

    namespace Geometry {
      interface Face {
        getOuterLoopPolygon(): Array<{ x: number; y: number; z: number }> | null;
      }
    }

    namespace Util {
      namespace Matrix3DHandler {
        function getMatrix4(entity: unknown): THREE.Matrix4;
      }
    }
  }
}