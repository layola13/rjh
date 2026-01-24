/**
 * Room utility module providing helper functions for room operations,
 * content management, and spatial calculations.
 */

import { Vector2, Loop, MathAlg } from './geometry';
import { Wall } from './wall';
import { Floor } from './floor';
import { Content } from './content';
import { Layer } from './layer';
import { Opening } from './opening';
import { NCustomizedStructure } from './customized-structure';
import { NCustomizedBeam } from './customized-beam';
import { Molding } from './molding';
import { Logger } from './logger';

/**
 * Interface representing a point in 2D space with an identifier
 */
export interface Point2D {
  id: string;
  x: number;
  y: number;
}

/**
 * Interface for room information containing geometry and associated data
 */
export interface RoomInfo {
  geometry?: unknown;
  path?: {
    outer?: unknown[];
  };
  floors?: Floor[];
  structures: unknown[];
  faces?: unknown[];
  wallFaces?: {
    walls: Wall[];
    faces: unknown[];
  };
}

/**
 * Interface for wall faces information
 */
export interface WallFacesInfo {
  wallFaces: {
    walls: Wall[];
    faces: unknown[];
  };
}

/**
 * Interface for entities with room checking capabilities
 */
export interface RoomAwareEntity {
  isContentInRoom?(room: Floor, strict?: boolean): boolean;
  getHost?(): unknown;
  roomInfos?: RoomInfo[];
}

/**
 * Room utility class providing comprehensive room manipulation and query operations
 */
export declare class RoomUtil {
  /**
   * Retrieves all points that lie on a line segment, including filter results
   * @param start - Starting point of the line segment
   * @param end - Ending point of the line segment
   * @param filterPoints - Additional points to check for line intersection
   * @returns Sorted array of points on the line segment
   */
  _retrievePointsInLine(
    start: Point2D,
    end: Point2D,
    filterPoints: Point2D[]
  ): Point2D[];

  /**
   * Attempts to assign room properties from source rooms to target rooms
   * @param sourceRooms - Array of source rooms to copy properties from
   * @param targetRooms - Array of target rooms to receive properties
   * @param referenceRoom - Optional reference room for property matching
   */
  tryAssignRoomProperties(
    sourceRooms: Floor[],
    targetRooms: Floor[],
    referenceRoom?: Floor
  ): void;

  /**
   * Attempts to assign room contents from source rooms to target rooms
   * @param sourceRooms - Array of source rooms containing content
   * @param targetRooms - Array of target rooms to receive content
   */
  tryAssignRoomContents(sourceRooms: Floor[], targetRooms: Floor[]): void;

  /**
   * Gets all wall faces associated with a room
   * @param room - The room to query
   * @returns Array of structure faces in the room
   */
  getAllWallFacesInRoom(room: Floor): unknown[];

  /**
   * Gets the boundary points defining a room's perimeter
   * @param room - The room to extract points from
   * @returns Array of points defining the room boundary
   */
  getRoomPoints(room: Floor): Point2D[];

  /**
   * Gets all unique points from all rooms in the scene or provided collection
   * @param rooms - Optional array of rooms to query; if undefined, uses active layer
   * @returns Object mapping point IDs to point objects
   */
  getAllRoomPoints(rooms?: Floor[]): Point2D[];

  /**
   * Finds interior walls connected to a specific room
   * @param room - The room to find connected walls for
   * @param filterFn - Optional filter function to exclude certain walls
   * @returns Array of interior walls connected to the room
   */
  findInteriorWallsConnectedToRoom(
    room: Floor,
    filterFn?: (wall: Wall) => boolean
  ): Wall[];

  /**
   * Merges multiple rooms into a single room
   * @param sourceRoom - The source room to merge from
   * @param targetRoom - The target room to merge into
   */
  mergeRooms(sourceRoom: Floor, targetRoom: Floor): void;

  /**
   * Gets all rooms that contain the specified content
   * @param content - The content entity to check
   * @param layer - Optional layer to search within
   * @param strict - Whether to use strict containment checking
   * @returns Array of floors containing the content
   */
  getRoomsContentIn(
    content: RoomAwareEntity,
    layer?: Layer,
    strict?: boolean
  ): Floor[];

  /**
   * Gets the first room that contains the specified content
   * @param content - The content entity to check
   * @param layer - Optional layer to search within
   * @param strict - Whether to use strict containment checking
   * @returns First floor containing the content, or undefined
   */
  getRoomContentIn(
    content: RoomAwareEntity,
    layer?: Layer,
    strict?: boolean
  ): Floor | undefined;

  /**
   * Gets rooms containing the specified structure
   * @param structure - The structure to check
   * @returns Array of floors containing the structure
   */
  getRoomsStructureIn(structure: RoomAwareEntity): Floor[];

  /**
   * Gets the room containing a specific opening
   * @param opening - The opening to check
   * @param layer - Optional layer to search within
   * @returns Floor containing the opening, or undefined
   */
  getRoomOpeningIn(opening: RoomAwareEntity, layer?: Layer): Floor | undefined;

  /**
   * Checks if wainscot content is within a specific room
   * @param content - The wainscot content to check
   * @param room - The room to check against
   * @returns True if the wainscot is in the room
   */
  isContentInRoomWainscot(content: Content, room: Floor): boolean;

  /**
   * Checks if molding is within a specific room
   * @param molding - The molding to check
   * @param room - The room to check against
   * @returns True if the molding is in the room
   */
  isContentInRoomModing(molding: Molding, room: Floor): boolean;

  /**
   * Checks if content is within a specific room
   * @param content - The content to check
   * @param room - The room to check against
   * @param strict - Whether to use strict containment checking
   * @returns True if the content is in the room
   */
  isContentInRoom(
    content: Content | RoomAwareEntity,
    room: Floor,
    strict?: boolean
  ): boolean;

  /**
   * Checks if an entity is within a specific room
   * @param entity - The entity to check
   * @param room - The room to check against
   * @returns True if the entity is in the room
   */
  isEntityInRoom(entity: unknown, room: Floor): boolean;

  /**
   * Checks if a corner window content is within a specific room
   * @param content - The corner window content to check
   * @param room - The room to check against
   * @returns True if the corner window is in the room
   */
  isContentInRoomCornerWindow(content: unknown, room: Floor): boolean;

  /**
   * Computes the ceiling height for rooms
   * @returns The global wall height in 3D
   */
  computeCeilingHeight(): number;

  /**
   * Determines if a room is considered small based on area and openings
   * @param room - The room to check
   * @returns True if the room is considered small
   */
  isSmallRoom(room: Floor): boolean;
}

/**
 * Default export of the RoomUtil utility object
 */
export const RoomUtil: RoomUtil;