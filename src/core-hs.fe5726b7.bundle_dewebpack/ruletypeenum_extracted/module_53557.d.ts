/**
 * Room and camera utilities for finding rooms and processing geometry
 */

/**
 * Represents a line segment with direction information for an opening (door/window)
 */
export interface OpeningLine {
  /** Starting point of the opening line */
  from: THREE.Vector3;
  /** Ending point of the opening line */
  to: THREE.Vector3;
  /** Perpendicular direction vector */
  pdir: THREE.Vector2;
}

/**
 * Camera position and target information
 */
export interface CameraInfo {
  /** Camera X position */
  x: number;
  /** Camera Y position */
  y: number;
  /** Camera Z position */
  z: number;
  /** Camera target X coordinate */
  target_x?: number;
  /** Camera target Y coordinate */
  target_y?: number;
  /** Camera target Z coordinate */
  target_z?: number;
  /** Near clipping plane distance */
  near?: number;
}

/**
 * Gets the opening line geometry for a wall-mounted element (door/window)
 * @param element - The opening element (door or window)
 * @returns Opening line with from/to points and perpendicular direction, or null if invalid
 */
export declare function getOpeningLine(element: HSCore.Model.Opening): OpeningLine | null;

/**
 * Retrieves the polygon path for a room's geometry
 * @param room - The room model object
 * @param documentManager - Document manager containing geometry information
 * @returns Array of Vector3 points forming the room polygon, or undefined if not found
 */
export declare function roomPolygon(
  room: HSCore.Model.Room,
  documentManager: HSCore.Doc.DocumentManager
): THREE.Vector3[] | undefined;

/**
 * Finds the room containing the given camera position
 * @param camera - Camera position and target information
 * @param documentManager - Document manager for accessing geometry
 * @param floorSlab - Optional floor slab to search within (if undefined, searches all rooms)
 * @returns The room containing the camera position, or undefined if not found
 */
export declare function findRoomByCamera(
  camera: CameraInfo,
  documentManager: HSCore.Doc.DocumentManager,
  floorSlab?: HSCore.Model.FloorSlab
): HSCore.Model.Room | HSCore.Model.Floor | undefined;