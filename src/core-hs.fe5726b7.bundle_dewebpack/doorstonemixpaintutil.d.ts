/**
 * Utility class for handling door stone and mixed paint operations.
 * Provides methods to check face connections, opening positions, and material merging logic.
 */
export declare class DoorStoneMixpaintUtil {
  /**
   * Checks if two faces are connected based on their raw paths and altitude.
   * Compares the outer paths of both faces after transforming them to world coordinates.
   * 
   * @param faceA - The first face to compare
   * @param faceB - The second face to compare
   * @returns True if the faces have overlapping curves, false otherwise
   */
  static _isTwoFacesConnected(
    faceA: HSCore.Model.Face,
    faceB: HSCore.Model.Face
  ): boolean;

  /**
   * Gets the bottom path of an opening projected onto the floor plane.
   * Only returns a path if the opening's Z-coordinate is at floor level (zero).
   * 
   * @param opening - The opening element to get the bottom path from
   * @returns The 2D world raw path of the bottom face, or undefined if not at floor level
   */
  static getOpeningBottomPathOnFloor(
    opening: HSCore.Model.Opening
  ): HSCore.Geometry.Path2D | undefined;

  /**
   * Determines if an opening is located within a room defined by the given floors.
   * Checks if the opening's host face is connected to any of the provided floor faces.
   * 
   * @param opening - The opening element to check
   * @param floors - Array of floor faces to check against
   * @returns True if the opening's host face connects to any floor, false otherwise
   */
  static isOpeningInRoomGivenFloors(
    opening: HSCore.Model.Opening,
    floors: HSCore.Model.Face[]
  ): boolean;

  /**
   * Determines if an opening's path can be merged with the given floor elements.
   * 
   * Requirements for merging:
   * - All elements must be Floor instances
   * - Opening must be a Hole or Door
   * - Door stone material must be disabled
   * - Opening must be at floor level (Z = 0)
   * - Opening must be within the room defined by the floors
   * 
   * @param opening - The opening element (Hole or Door) to check
   * @param floors - Array of floor elements to potentially merge with
   * @returns True if all conditions for merging are met, false otherwise
   */
  static canOpeningPathMergedWithFloors(
    opening: HSCore.Model.Opening,
    floors: HSCore.Model.Floor[]
  ): boolean;
}