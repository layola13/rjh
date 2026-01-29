/**
 * Content utility module for handling spatial relationships between content objects and their host surfaces
 * @module CWContentUtil
 */

/**
 * Maximum distance threshold for content-to-host face detection (in scene units)
 */
const enum HostDetectionThreshold {
  /** Maximum distance to consider a face as host surface */
  toHostMaxDistance = 0.1
}

/**
 * Utility class for content and host face operations
 */
export declare class CWContentUtil {
  /**
   * Determines the most appropriate host face (wall, floor, or ceiling) for a given content entity.
   * 
   * Algorithm:
   * 1. Traverses parent hierarchy to find host surface
   * 2. Validates host is on same layer as content
   * 3. For lighting and plumbing fixtures, applies specific placement rules:
   *    - Wall lamps: prefer vertical faces only
   *    - Ceiling lamps: prefer horizontal top face
   *    - Cold water valves: exclude horizontal checks
   * 4. Projects content position onto room faces to find closest surface
   * 5. Checks ceiling proximity if content is near layer top
   * 
   * @param content - The content entity to find host face for (e.g., lighting fixture, valve, decoration)
   * @returns The host face (Wall/Floor/Ceiling model) or undefined if no suitable host found
   * 
   * @remarks
   * - Requires content to be inside a valid room with defined geometry
   * - Uses world coordinates for distance calculations
   * - Prioritizes layer consistency and content type constraints
   */
  static getHostFace(
    content: HSCore.Model.Content
  ): HSCore.Model.Wall | HSCore.Model.Floor | HSCore.Model.Ceiling | undefined;
}