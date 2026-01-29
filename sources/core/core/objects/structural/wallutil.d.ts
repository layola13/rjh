/**
 * Utility class for wall operations including insertion, geometry info retrieval,
 * association management, and wall manipulation.
 */
export interface WallUtil {
  /**
   * Inserts walls along a specified path.
   * @param path - The path along which to insert walls
   * @param options - Configuration options for wall insertion
   * @param context - Execution context
   * @param callback - Optional callback function
   * @returns Array of created wall entities
   */
  insertWallsByPath(
    path: unknown,
    options: unknown,
    context: unknown,
    callback: unknown
  ): unknown[];

  /**
   * Internal method to execute wall operations.
   * @param path - The path for the operation
   * @param options - Operation options
   * @param context - Execution context
   * @param callback - Optional callback
   * @returns Array of affected walls
   */
  _executeWallOperation(
    path: unknown,
    options: unknown,
    context: unknown,
    callback: unknown
  ): unknown[];

  /**
   * Retrieves geometric information for a given entity.
   * @param entityId - The ID of the entity
   * @returns Geometry info object with methods to query points and ranges, or undefined if not found
   */
  getGeometryInfo(entityId: string): GeometryInfo | undefined;

  /**
   * Gets the wall associated with a specific point.
   * @param point - The point to check for wall association
   * @returns The associated wall entity, or undefined
   */
  getPointAssociateWall(point: unknown): HSCore.Model.Wall | undefined;

  /**
   * Retrieves partial walls based on criteria.
   * @param criteria - Filter criteria
   * @param options - Additional options
   */
  getPartialWalls(criteria: unknown, options: unknown): void;

  /**
   * Attempts to assign properties from source walls to target walls.
   * @param sourceWalls - Array of source walls with properties to copy
   * @param targetWalls - Array of target walls to receive properties
   * @param priorityWalls - Optional array of walls to prioritize in assignment
   */
  tryAssignWallProperties(
    sourceWalls: Wall[],
    targetWalls: Wall[],
    priorityWalls?: Wall[]
  ): void;

  /**
   * Attempts to reassign wall contents (doors, windows, etc.) from old walls to new walls.
   * @param oldWalls - Original walls containing content
   * @param newWalls - New walls to receive content
   */
  tryAssignWallContents(oldWalls: Wall[], newWalls: Wall[]): void;

  /**
   * Finds the room that contains a specific wall.
   * @param wall - The wall to search for
   * @returns The room containing the wall, or undefined
   */
  getRoomWallIn(wall: Wall): HSCore.Model.Room | undefined;

  /**
   * Calculates the normal vector for a specific side of a wall.
   * @param wall - The wall entity
   * @param faceType - The face type (left or right), defaults to left
   * @returns Normal vector for the specified wall side
   */
  getWallSideNormal(
    wall: Wall,
    faceType?: HSCore.Model.WallFaceType
  ): THREE.Vector3;

  /**
   * Gets all corner windows associated with a wall.
   * @param wall - The wall to check
   * @returns Array of associated corner window entities
   */
  getAssociatedCornerWindow(wall: Wall): unknown[];

  /**
   * Checks if two walls are connected (share endpoints).
   * @param wall1 - First wall
   * @param wall2 - Second wall
   * @returns True if walls are connected, false otherwise
   */
  isWallConnected(wall1: Wall, wall2: Wall): boolean;

  /**
   * Removes invalid walls from the document.
   * @param walls - Array of walls to validate and clean
   */
  cleanUpInvalidWalls(walls: Wall[]): void;

  /**
   * Updates point-to-wall associations after wall modifications.
   * @param points - Array of points to update associations for
   * @param walls - Array of walls to check against
   */
  updatePointsAssociationOnWalls(points: Point[], walls: Wall[]): void;

  /**
   * Cleans up associations for modified walls.
   * @param walls - Walls to clean associations for
   * @param allWalls - All walls in the context
   */
  cleanUpAssociations(walls: Wall[], allWalls: Wall[]): void;

  /**
   * Internal method to remove walls with zero length.
   * @param walls - Array of walls to check
   * @returns True if any walls were removed, false otherwise
   */
  _removeZeroLengthWalls(walls: Wall[]): boolean;

  /**
   * Extracts all unique points from an array of walls.
   * @param walls - Array of walls
   * @returns Array of unique points from all walls
   */
  getAllWallsPoints(walls: Wall[]): Point[];

  /**
   * Splits walls that intersect with other walls at crossing points.
   * @param wallsToSplit - Walls that should be split
   * @param allWalls - All walls to check for intersections
   * @returns Array of newly created wall segments
   */
  splitCrossedWalls(wallsToSplit: Wall[], allWalls: Wall[]): Wall[];

  /**
   * Removes a wall from its parent container.
   * @param wall - The wall to remove
   */
  removeWall(wall: Wall): void;

  /**
   * Checks if a point lies on a wall.
   * @param wall - The wall to check
   * @param point - The point to test
   * @param adjustZ - Whether to adjust Z coordinate to match wall, defaults to true
   * @returns True if point is on wall, false otherwise
   */
  isPointOnWall(wall: Wall, point: Point, adjustZ?: boolean): boolean;

  /**
   * Extracts all points from an array of walls.
   * @param walls - Array of walls
   * @returns Array of all points
   */
  getWallsPoints(walls: Wall[]): Point[];

  /**
   * Gets all wall points from a specific layer.
   * @param layer - The layer containing walls
   * @returns Array of points from all walls in the layer
   */
  getLayerWallsPoints(layer: Layer): Point[];

  /**
   * Removes duplicate walls (walls with identical endpoints).
   * @param walls - Array of walls to check for duplicates
   */
  cleanUpDuplicateWalls(walls: Wall[]): void;

  /**
   * Removes associations that are no longer valid after a wall is changed.
   * @param wall - The wall that was modified
   */
  removeAssociationOnWallChanged(wall: Wall): void;

  /**
   * Adds new associations between two walls after changes.
   * @param wall1 - First wall
   * @param wall2 - Second wall
   */
  addAssociationOnWallChanged(wall1: unknown, wall2: unknown): void;

  /**
   * Gets all walls that have associations with a given wall.
   * @param wall - The wall to find associations for
   * @returns Array of associated walls
   */
  getWallsAssociatedByWall(wall: Wall): Wall[];

  /**
   * Creates deep copies of walls including their joint information.
   * @param walls - Array of walls to copy
   * @returns Array of cloned wall entities
   */
  copyWalls(walls: Wall[]): Wall[];

  /**
   * Finds all walls inside a polygon loop.
   * @param loop - Array of points defining the polygon loop
   * @param layer - The layer to search within
   * @param partial - If true, includes walls partially inside; if false, only fully inside
   * @param excludeWalls - Optional array of walls to exclude from results
   * @returns Array of walls inside the loop
   */
  findWallsInsideLoop(
    loop: Point[],
    layer: Layer,
    partial: boolean,
    excludeWalls?: Wall[]
  ): Wall[];

  /**
   * Internal helper to get walls associated with a wall via association manager.
   * @param associationManager - The association manager instance
   * @param wall - The wall to check
   * @returns Set of associated walls
   */
  _getWallsAssociatedByWall(
    associationManager: unknown,
    wall: Wall
  ): Set<Wall>;
}

/**
 * Geometry information for a wall or entity.
 */
export interface GeometryInfo {
  /**
   * Gets a specific point by index.
   * @param index - The point index
   * @returns The point at the specified index
   */
  getPoint(index: number): Point;

  /**
   * Gets a range of points between two indices.
   * @param startIndex - Start index
   * @param endIndex - End index
   * @returns Array of points in the range
   */
  getRange(startIndex: number, endIndex: number): Point[];

  /**
   * Gets the left face points.
   * @returns Array containing the two points defining the left face
   */
  left(): [Point, Point];

  /**
   * Gets the right face points.
   * @returns Array containing the two points defining the right face
   */
  right(): [Point, Point];

  /**
   * Gets the front face points.
   * @returns Array of points defining the front face
   */
  front(): Point[];

  /**
   * Gets the back face points.
   * @returns Array of points defining the back face
   */
  back(): Point[];

  /**
   * Gets all valid top face points.
   * @returns Array of points defining the top face
   */
  top(): Point[];
}

/**
 * Represents a wall entity with geometric properties.
 */
export interface Wall {
  /** Unique identifier */
  id: string;
  
  /** Start point of the wall */
  from: Point;
  
  /** End point of the wall */
  to: Point;
  
  /** Wall width/thickness */
  width: number;
  
  /** Wall length */
  length: number;

  /**
   * Checks if the wall is valid.
   */
  isValid(): boolean;

  /**
   * Iterates over all content (doors, windows, etc.) on the wall.
   * @param callback - Function called for each content item
   */
  forEachContent(callback: (content: unknown) => void): void;

  /**
   * Copies properties from another wall to this wall.
   * @param sourceWall - Wall to copy properties from
   */
  copyProperty(sourceWall: Wall): void;

  /**
   * Gets the unique parent container of this wall.
   */
  getUniqueParent(): { removeChild(wall: Wall): void } | undefined;

  /**
   * Splits this wall at specified points.
   * @param points - Points at which to split the wall
   * @param removeOriginal - Whether to remove the original wall
   * @returns Array of newly created wall segments
   */
  splitByPoints(points: Point[], removeOriginal: boolean): Wall[];

  /**
   * Creates a deep copy of this wall.
   */
  clone(): Wall;
}

/**
 * Represents a 3D point.
 */
export interface Point {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a layer containing walls.
 */
export interface Layer {
  /** Map of wall IDs to wall entities */
  walls: Record<string, Wall>;
}

export const WallUtil: WallUtil;