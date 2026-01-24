/**
 * Curve-curve overlap result types from MathAlg library
 */
export declare const CURVE_CURVE_OVERLAP_RESULTS: readonly [
  MathAlg.CurveCuvePositonType.OVERLAP,
  MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
];

/**
 * Wall region collection result
 */
export interface WallRegionsOfRoomsResult {
  /** All adjacent wall regions found */
  allAdjacentWallRegions: WallRegion[];
}

/**
 * Room snapshot containing floor and polygon data
 */
export interface RoomSnapshot {
  floor: Floor;
  polygon: {
    outer: Loop;
    holes: Loop[];
  };
}

/**
 * Wall joint information
 */
export interface WallJointInfo {
  type: WallJointType;
  wallInfos: Array<{
    wall: Wall;
    type: WallConnectionType;
  }>;
}

/**
 * Slab sketch 2D hole definition
 */
export interface SlabSketch2dHole {
  id: number;
  loop: Loop;
}

/**
 * Data collected from rooms for processing
 */
export interface CollectedRoomData {
  beforeRooms: Room[];
  roomSnapshots: RoomSnapshot[];
  walls: Wall[];
  structures: NCustomizedStructure[];
  beams: Beam[];
  splitCurves: Line2d[];
  roomsOuter: StructureFaceInfo[][];
  slabOpenings: Opening[];
  openings: Opening[];
  unionWallsPolygon: Polygon[];
  wallJoints: WallJointInfo[];
  wallOpeningsMap: Map<Wall, Opening[]>;
  slabSketch2dHoles: SlabSketch2dHole[];
}

/**
 * Copied room data with cloned entities
 */
export interface CopiedRoomData extends CollectedRoomData {
  // Inherits all properties from CollectedRoomData
}

/**
 * Wall region cut result
 */
export interface CutWallRegionResult {
  /** Paths at wall joints */
  jointPaths: Array<{ outer: Curve2d[] }>;
  /** Normal wall region paths */
  normalPaths: Array<{ outer: Curve2d[] }>;
}

/**
 * Slab path definition
 */
export interface SlabPath {
  outer: Curve2d[];
  holes: Curve2d[][];
}

/**
 * Get wall regions that belong to specified rooms
 * @param selectedWalls - Walls to analyze
 * @param allWalls - All available walls in the scene
 * @param boundingCurves - Curves defining the bounding area
 * @returns Wall regions result
 */
export declare function getWallRegionsOfRooms(
  selectedWalls: Wall[],
  allWalls: Wall[],
  boundingCurves: Curve2d[]
): WallRegionsOfRoomsResult;

/**
 * Collect data from rooms for copying/processing
 * @param rooms - Rooms to collect from
 * @param boundingPolygon - Optional bounding polygon (if undefined, auto-calculated)
 * @returns Collected room data
 */
export declare function collectFromRooms(
  rooms: Room[],
  boundingPolygon?: Polygon
): CollectedRoomData;

/**
 * Copy data from rooms with cloning
 * @param rooms - Source rooms
 * @param boundingPolygon - Optional bounding polygon
 * @returns Copied room data with cloned entities
 */
export declare function copyFromRooms(
  rooms: Room[],
  boundingPolygon?: Polygon
): CopiedRoomData;

/**
 * Create a deep copy from already copied data
 * @param copiedData - Previously copied room data
 * @returns New copy of the data
 */
export declare function copyFromCopied(
  copiedData: CopiedRoomData
): CopiedRoomData;

/**
 * Get wall regions at joints between walls
 * @param walls - Walls to analyze for joint regions
 * @returns Wall regions at joints
 */
export declare function getJointWallRegions(walls: Wall[]): WallRegion[];

/**
 * Cut wall region by linked wall regions
 * @param targetWall - Wall to cut
 * @param allWallRegions - All available wall regions
 * @param linkedWalls - Walls linked to the target
 * @returns Cut result with joint and normal paths
 */
export declare function cutWallRegionByLinkedWallRegion(
  targetWall: Wall,
  allWallRegions: WallRegion[],
  linkedWalls: Wall[]
): CutWallRegionResult;

/**
 * Get curve parameter range based on loop curves
 * @param curve - Curve to measure
 * @param loopCurves - Loop curves to project onto
 * @returns Parameter interval range
 */
export declare function getCurveRange(
  curve: Curve2d,
  loopCurves: Curve2d[]
): Interval;

/**
 * Get curve parameter range by intersection with loop curves
 * @param curve - Curve to intersect
 * @param loopCurves - Loop curves to intersect with
 * @returns Parameter interval range
 */
export declare function getCurveRangeByIntersect(
  curve: Curve2d,
  loopCurves: Curve2d[]
): Interval;

/**
 * Check if an opening is on a wall
 * @param opening - Opening or parametric opening to check
 * @param wall - Wall to test against
 * @returns True if opening is on wall
 */
export declare function isOpeningOnWall(
  opening: Opening | ParametricOpening,
  wall: Wall
): boolean;

/**
 * Check if a point on an opening is on a wall
 * @param point - Point to check
 * @param wall - Wall to test against
 * @returns True if point is on wall curve
 */
export declare function isOpeningPointOnWall(
  point: Point2d,
  wall: Wall
): boolean;

/**
 * Dispose/cleanup copied data
 * @param copiedData - Copied data to dispose
 */
export declare function disposeCopied(copiedData?: CopiedRoomData): void;

/**
 * Get slab path from floor or slab info
 * @param floorOrSlab - Floor or slab entity
 * @returns Slab path with outer and holes
 */
export declare function getSlabPath(
  floorOrSlab?: Floor | { slabInfo?: { rawPath?: SlabPath }; path?: SlabPath }
): SlabPath;

/**
 * Copy an opening entity
 * @param opening - Opening to copy
 * @returns Cloned opening entity
 */
export declare function copyOpening(
  opening: Opening | ParametricOpening
): Opening | ParametricOpening | undefined;