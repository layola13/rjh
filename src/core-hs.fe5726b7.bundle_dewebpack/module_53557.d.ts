/**
 * Room and camera-related utility functions for finding rooms and extracting geometric data.
 * Provides methods to locate rooms by camera position and retrieve opening lines from wall-mounted objects.
 */

/**
 * Represents a line segment with direction information
 */
export interface OpeningLine {
  /** Start point of the opening line */
  from: THREE.Vector3;
  /** End point of the opening line */
  to: THREE.Vector3;
  /** Perpendicular direction vector */
  pdir: THREE.Vector2;
}

/**
 * Camera position and orientation data
 */
export interface CameraData {
  /** Camera X coordinate */
  x: number;
  /** Camera Y coordinate */
  y: number;
  /** Camera Z coordinate */
  z: number;
  /** Target point X coordinate (optional) */
  target_x?: number;
  /** Target point Y coordinate (optional) */
  target_y?: number;
  /** Target point Z coordinate (optional) */
  target_z?: number;
  /** Near clipping plane distance (optional, defaults to 0.1) */
  near?: number;
}

/**
 * Extracts the opening line from a wall-mounted element (e.g., door, window).
 * Calculates the line segment representing the opening based on the element's size and wall tangent.
 * 
 * @param element - The element (e.g., door/window) mounted on a wall
 * @returns Opening line data with from/to points and perpendicular direction, or null if invalid
 */
export declare function getOpeningLine(element: HSCore.Model.Element): OpeningLine | null;

/**
 * Retrieves the polygon path representing a room's boundary.
 * 
 * @param room - The room model object
 * @param documentManager - Document manager containing geometry information
 * @returns Array of Vector3 points forming the room polygon, or undefined if not available
 */
export declare function roomPolygon(
  room: HSCore.Model.Room,
  documentManager: HSCore.Doc.DocumentManager
): THREE.Vector3[] | undefined;

/**
 * Finds a room that contains the camera position or camera target point.
 * First attempts to find a room containing the camera position (adjusted by near plane).
 * If not found and target coordinates are provided, searches using the target point.
 * 
 * @param camera - Camera position and orientation data
 * @param documentManager - Document manager for accessing geometry
 * @param floorSlab - Optional floor slab to limit search scope
 * @returns The room containing the camera position/target, or undefined if none found
 */
export declare function findRoomByCamera(
  camera: CameraData,
  documentManager: HSCore.Doc.DocumentManager,
  floorSlab?: HSCore.Model.FloorSlab
): HSCore.Model.Room | HSCore.Model.Floor | undefined;