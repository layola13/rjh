/**
 * Utilities for managing molding data and geometry in room faces
 * @module MoldingUtil
 */

import { FaceUtil } from './FaceUtil';
import { Face } from './Face';

/**
 * Metadata describing a molding profile
 */
export interface MoldingProfile {
  [key: string]: unknown;
}

/**
 * Material metadata or material object
 */
export interface MoldingMaterial {
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Molding instance with profile metadata and material
 */
export interface Molding {
  /** Profile metadata */
  metadata: MoldingProfile;
  /** Material information */
  material: MoldingMaterial;
  /** Marks the molding geometry as needing regeneration */
  dirtyGeometry(): void;
}

/**
 * Result containing molding profile and material data
 */
export interface RoomMoldingData {
  /** Molding profile metadata */
  profile: MoldingProfile;
  /** Material metadata or material object */
  material: MoldingMaterial | Record<string, unknown>;
}

/**
 * Neighbor face information
 */
export interface NeighborFaceInfo {
  face?: Face;
}

/**
 * Result of finding neighbor faces
 */
export interface NeighborFaces {
  /** Previous neighbor face */
  pre?: NeighborFaceInfo;
  /** Next neighbor face */
  next?: NeighborFaceInfo;
}

/**
 * Utility class for molding operations on room faces
 */
export declare class MoldingUtil {
  /**
   * Retrieves molding data from a collection of room elements
   * @param elements - Array of room elements (faces) to search
   * @param moldingType - Type identifier for the molding to retrieve
   * @returns Molding data including profile and material, or undefined if not found
   */
  static getRoomMoldingData(
    elements: unknown[],
    moldingType: string
  ): RoomMoldingData | undefined;

  /**
   * Marks neighboring face moldings as dirty (requiring geometry update)
   * @param face - The face whose neighbors should be updated
   * @param moldingType - Type identifier for the molding to mark dirty
   */
  static dirtyNeighborMoldingsByFacetype(
    face: Face,
    moldingType: string
  ): void;
}

/**
 * Global HSCore namespace
 */
declare global {
  namespace HSCore {
    namespace Model {
      class Face {
        /**
         * Gets moldings of specified type attached to this face
         * @param moldingType - Type identifier for the molding
         * @returns Array of molding instances, or undefined
         */
        getMolding(moldingType: string): Molding[] | undefined;
      }
    }
  }
}