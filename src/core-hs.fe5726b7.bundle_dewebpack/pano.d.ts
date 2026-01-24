/**
 * Pano module - Provides utilities for panoramic view generation and navigation in floor plans.
 * Handles door detection, wall segment calculation, room analysis, and panorama connectivity.
 */

/**
 * Represents a 2D point in space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a 3D point in space
 */
export interface Point3D extends Point2D {
  z: number;
}

/**
 * Represents a wall segment with start and end points
 */
export interface WallSegment {
  from: Point2D;
  to: Point2D;
  dis?: number;
}

/**
 * Represents a connector between panoramic viewpoints
 */
export interface PanoConnector {
  /** Position of the connector in 3D space */
  pos: Point3D;
  /** Index reference to the connected panorama */
  id: number;
}

/**
 * Represents a panoramic viewpoint in the floor plan
 */
export interface PanoViewpoint {
  /** Position of the panorama in 2D space */
  pos: Point2D;
  /** List of doors leading outside the current room */
  outDoors: HSCore.Model.Door[];
  /** List of doors within the current room */
  inDoors: HSCore.Model.Door[];
  /** Identifier of the room containing this panorama */
  roomId: string;
  /** Type of the room (e.g., bedroom, kitchen) */
  roomType: string;
  /** Display name of the room */
  roomName: string;
  /** List of other panoramas visible from this viewpoint */
  visiblePanos: PanoViewpoint[];
  /** List of connectors to adjacent panoramas */
  connectors: PanoConnector[];
}

/**
 * Pano utility module for handling panoramic view calculations
 */
export declare const Pano: {
  /**
   * Validates if a wall meets the criteria for panorama generation
   * @param wall - The wall entity to validate
   * @returns True if the wall is valid, false otherwise
   */
  _isValidWall(wall: HSCore.Model.Wall | null): boolean;

  /**
   * Retrieves all doors from the active floor plan
   * @returns Array of door entities
   */
  _getDoorsFromFloorplan(): HSCore.Model.Door[];

  /**
   * Calculates wall segments, optionally excluding a specific door opening
   * @param excludedDoor - Optional door to exclude from segment calculation
   * @returns Array of wall segments
   */
  _getWallSegments(excludedDoor?: HSCore.Model.Door): WallSegment[];

  /**
   * Identifies doors leading outside the room from a given panorama position
   * @param pano - The panorama viewpoint to analyze
   */
  _getOutDoors(pano: PanoViewpoint): void;

  /**
   * Determines which room contains the given position
   * @param position - The 2D point to check
   * @returns The room entity containing the point, or null if not found
   */
  _getPosRoom(position: Point2D): HSCore.Model.Room | null;

  /**
   * Identifies doors within the same room as the panorama position
   * @param pano - The panorama viewpoint to analyze
   */
  _getInDoors(pano: PanoViewpoint): void;

  /**
   * Calculates which other panoramas are visible from the given viewpoint
   * without wall obstruction
   * @param pano - The source panorama viewpoint
   * @param allPanos - Array of all panorama viewpoints to check
   */
  _getVisiblePanos(pano: PanoViewpoint, allPanos: PanoViewpoint[]): void;

  /**
   * Determines connector points between the current panorama and adjacent ones
   * @param pano - The panorama viewpoint to process
   * @param allPanos - Array of all panorama viewpoints
   */
  _getConnectors(pano: PanoViewpoint, allPanos: PanoViewpoint[]): void;

  /**
   * Main function to calculate all panorama connections and relationships
   * @param panos - Array of panorama viewpoints to process
   * @returns The same array with calculated connections
   */
  getPanosConnectors(panos: PanoViewpoint[]): PanoViewpoint[];
};