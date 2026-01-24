/**
 * Information about a wall in the TG (likely "Telegram" or "Tag") system.
 * Provides details about wall positioning, orientation, and relationship to other components.
 */
export declare class TgWallInfo {
  /**
   * The wall object this info is associated with.
   */
  readonly wall: Wall;

  /**
   * The layer that contains this wall.
   */
  readonly layer: Layer;

  /**
   * The side of the outer wall.
   */
  readonly outerWallSide: WallSide;

  /**
   * Whether the wall orientation is reversed.
   */
  readonly reversed: boolean;

  /**
   * Whether this wall is shared between multiple spaces.
   */
  readonly shared: boolean;

  /**
   * Regions associated with this wall.
   */
  readonly regions: WallRegion[];

  /**
   * Cached value indicating if this is an interior wall.
   * @internal
   */
  private _isInteriorWall?: boolean;

  /**
   * Creates a new TgWallInfo instance.
   * @param wall - The wall object to create info for. Must have a parent layer.
   * @throws {Error} If the wall has no parent layer.
   */
  constructor(wall: Wall);

  /**
   * Determines if this wall is an interior wall (not an exterior/outer wall).
   * Result is cached after first computation.
   */
  get isInteriorWall(): boolean;
}

/**
 * Represents a wall entity with an ID and parent reference.
 */
interface Wall {
  id: string | number;
  parent: Layer | null | undefined;
}

/**
 * Represents a layer containing walls and providing building operations.
 */
interface Layer {
  slabBuilder: SlabBuilder;
  roomBuilder: RoomBuilder;
}

/**
 * Builder for slab-related operations on walls.
 */
interface SlabBuilder {
  /**
   * Gets outer wall information including side and orientation.
   */
  getOuterWallInfo(wall: Wall): {
    outerWallSide: WallSide;
    reversed: boolean;
  };

  /**
   * Checks if a wall is shared between multiple spaces.
   */
  isWallShared(wall: Wall): boolean;

  /**
   * Determines if a wall is an interior wall.
   */
  isInteriorWall(wall: Wall): boolean;
}

/**
 * Builder for room-related operations on walls.
 */
interface RoomBuilder {
  /**
   * Gets wall information including regions.
   */
  getWallInfo(wallId: string | number): {
    regions: WallRegion[];
  };
}

/**
 * Represents a side of a wall (e.g., left, right, front, back).
 */
type WallSide = string | number;

/**
 * Represents a region on a wall (e.g., window, door, segment).
 */
type WallRegion = unknown;