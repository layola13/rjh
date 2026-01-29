import type { Floor } from './Floor';
import type { Wall } from './Wall';
import type { Layer } from './Layer';
import type { SpaceInfo } from './SpaceInfo';
import type { Opening, ParametricOpening } from './Opening';
import type { Face } from './Face';
import type { Content } from './Content';
import type { Door, Window } from './DoorWindow';
import type { Box2, Loop, MathAlg } from './Geometry';

/**
 * Room type enumeration
 */
export enum RoomTypeEnum {
  Hallway = 'hallway',
  LivingDiningRoom = 'livingDiningRoom',
  LivingRoom = 'livingRoom',
  DiningRoom = 'diningRoom',
  Bedroom = 'bedroom'
}

/**
 * 2D point coordinate
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Path with outer boundary and inner holes
 */
export interface PathWithHoles {
  outer: Point2D[];
  holes: Point2D[][];
}

/**
 * Room utility class providing methods for room-related operations
 */
export declare class RoomUtil {
  /**
   * Calculate space level hierarchy for a given layer
   * @param layer - The layer containing space information
   * @returns Map of space info to their hierarchy level
   */
  static getSpaceLevel(layer: Layer): Map<SpaceInfo, number>;

  /**
   * Find the root space for a given slab and space list
   * @param layer - The layer to search in
   * @param slab - The slab entity
   * @param spaces - List of space infos
   * @returns The root space info or undefined
   */
  static _getRootSpace(
    layer: Layer,
    slab: unknown,
    spaces: SpaceInfo[]
  ): SpaceInfo | undefined;

  /**
   * Select the best door from a list of openings based on room priority
   * @param openings - List of door openings
   * @param spaces - List of space infos
   * @returns The best door opening or undefined
   */
  static _getBestDoor(
    openings: Array<Opening | ParametricOpening>,
    spaces: SpaceInfo[]
  ): Opening | ParametricOpening | undefined;

  /**
   * Get all spaces related to the given space through doors or adjacency
   * @param space - The source space info
   * @param spaces - Optional list of spaces to search within
   * @returns Array of related space infos
   */
  static getRelatedSpaces(
    space: SpaceInfo,
    spaces?: SpaceInfo[]
  ): SpaceInfo[];

  /**
   * Get all rooms related to a floor entity
   * @param floorId - The floor entity ID
   * @returns Array of related room IDs
   */
  static getRelatedRooms(floorId: string): string[];

  /**
   * Auto-fit cornices in a room by dirtying their geometry
   * @param floor - The floor entity
   */
  static autoFitCornicesInRoom(floor: Floor): void;

  /**
   * Get all walls that bound a room
   * @param floor - The floor entity
   * @param returnInstancesOnly - If true, only return wall instances
   * @returns Array of wall entities
   */
  static getBoundWallsOfRoom(
    floor: Floor,
    returnInstancesOnly?: boolean
  ): Wall[];

  /**
   * Find all interior walls within a room
   * @param floor - The floor entity
   * @param returnIdsOnly - If true, return wall IDs instead of entities
   * @returns Array of wall entities or IDs
   */
  static findInteriorWallsInRoom(
    floor: Floor,
    returnIdsOnly?: boolean
  ): Wall[] | string[];

  /**
   * Calculate the area of a room from its geometry
   * @param floor - The floor entity
   * @returns The calculated area
   */
  static getArea(floor: Floor): number;

  /**
   * Get all walls associated with a room
   * @param floor - The floor entity
   * @returns Array of wall entities
   */
  static getRoomWalls(floor: Floor | null): Wall[];

  /**
   * Get all openings (doors, windows) in a room
   * @param floor - The floor entity
   * @returns Array of opening entities
   */
  static getRoomOpenings(floor: Floor): Array<Opening | ParametricOpening>;

  /**
   * Get all transparent openings (open doors, windows) in a room
   * @param floor - The floor entity
   * @returns Array of transparent opening entities
   */
  static getRoomTransparentOpenings(
    floor: Floor
  ): Array<Opening | ParametricOpening>;

  /**
   * Calculate a proper center position for a room polygon
   * @param geometry - Array of 2D points forming the room outline
   * @returns The calculated center point
   */
  static getProperCenterPosition(geometry: Point2D[]): Point2D;

  /**
   * Calculate a proper center position for a room with holes
   * Uses grid-based flood fill algorithm to find deepest interior point
   * @param path - Room path with outer boundary and holes
   * @returns The calculated center point
   */
  static getProperCenterPositionWithHoles(path: PathWithHoles): Point2D;

  /**
   * Calculate room area including loop walls
   * @param geometry - Array of 2D points forming the room outline
   * @returns The calculated area
   */
  static getRoomAreaIncludeLoopWall(geometry: Point2D[]): number;

  /**
   * Get the border geometry paths of all walls in a room
   * @param floor - The floor entity
   * @returns Array of wall border paths
   */
  static getRoomLoopWallsPaths(floor: Floor): Point2D[][];

  /**
   * Union multiple wall paths into a single path
   * @param paths - Array of wall paths to union
   * @returns The unioned path
   */
  static unionWallPaths(paths: Point2D[][]): Point2D[];

  /**
   * Check if a room path is contained within another path
   * @param roomPath - The room path to check
   * @param containerPath - The container path
   * @returns True if room path is inside container path
   */
  static isRoomPathsInPaths(
    roomPath: Point2D[],
    containerPath: Point2D[]
  ): boolean;

  /**
   * Get the room type identifier for a content entity
   * @param content - The content entity (furniture, door, window, etc.)
   * @returns Room type string in format "roomType-id" or "none-id"
   */
  static getContentRoomType(content: Content | Door | Window): string;
}