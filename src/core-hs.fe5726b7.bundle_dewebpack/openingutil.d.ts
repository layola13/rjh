/**
 * Utility functions for managing openings (windows, doors, holes) in architectural models.
 * Handles positioning, rotation, host assignment, and geometric calculations for openings
 * on various surfaces including roofs, walls, and slabs.
 */

import type { Layer } from '../layer/Layer';
import type { Opening } from '../model/Opening';
import type { NCustomizedParametricRoof } from '../model/NCustomizedParametricRoof';
import type { Window } from '../model/Window';
import type { ParametricOpening } from '../model/ParametricOpening';
import type { Wall } from '../model/Wall';
import type { Slab } from '../model/Slab';
import type { Face } from '../model/Face';
import type { DHole } from '../model/DHole';
import type { Pocket } from '../model/Pocket';
import type { WindowHole } from '../model/Parametrization/WindowHole';
import type { Vector2, Vector3, Loop, Surface, TrimmedSurface, Arc2d, Line2d, Interval, Tolerance } from '../geometry';
import type { RoofFace } from '../model/RoofFace';
import type { SpaceInfo } from '../model/SpaceInfo';
import type { Curve2d } from '../geometry/Curve2d';

/** Face information with range on a wall curve */
interface WallFaceRange {
  face: Face;
  range: Interval;
}

/** Snap information for wall openings */
interface WallSnapInfo {
  leftFace: Face;
  rightFace: Face;
  range: Interval;
}

/** Slab area calculation result */
interface SlabAreaResult {
  slab: Slab;
  area: number;
}

/** Space level information */
interface SpaceLevelInfo {
  space: SpaceInfo;
  level: number;
  dist: number;
}

/** Profile structure with outer boundary and holes */
interface ProfileData {
  outer: Array<{ curve: Curve2d }>;
  holes: Array<Array<{ curve: Curve2d }>>;
}

/** Path structure for clipping operations */
interface PathStructure {
  outer: Curve2d[];
  holes?: Curve2d[][];
}

/** Wall change update result */
interface WallChangeUpdater {
  update: () => void;
}

/** Height range for openings */
interface HeightRange {
  base: number;
  top: number;
}

/** Resize options */
interface ResizeOptions {
  fitOpeningTop?: boolean;
  xScale?: number;
  yScale?: number;
  xPos?: number;
  yPos?: number;
}

/** Position update data */
interface PositionUpdateData {
  openingPos: Vector2;
  wallCurve: Curve2d;
}

/**
 * Opening utility class providing static methods for opening management
 */
export declare const OpeningUtil: {
  /**
   * Updates the rotation and position of an opening on a roof face
   * @param roof - The roof entity
   * @param faceTag - Tag identifying the roof face
   * @param opening - The opening to update
   * @param position - Target position for the opening
   */
  updateRoofOpeningRotationAndPos(
    roof: NCustomizedParametricRoof,
    faceTag: string,
    opening: Opening | ParametricOpening,
    position: Vector3
  ): void;

  /**
   * Gets the normal vector of the roof face hosting the opening
   * @param opening - The opening entity
   * @returns Normal vector if found, undefined otherwise
   */
  getHostRoofFaceNormal(opening: Opening | ParametricOpening): Vector3 | undefined;

  /**
   * Disables the window sill for window openings
   * @param opening - The window or parametric opening
   */
  setWindowSillOff(opening: Window | ParametricOpening): void;

  /**
   * Gets the roof face that hosts the specified opening
   * @param opening - The opening entity
   * @returns The hosting roof face if found, undefined otherwise
   */
  getOpeningHostRoofFace(opening: Opening | ParametricOpening): RoofFace | undefined;

  /**
   * Refreshes the slab host assignment for an opening
   * @param opening - The opening to refresh
   * @param slab - Optional target slab
   * @param layer - Optional target layer
   */
  refreshSlabOpeningHost(opening: Opening | ParametricOpening, slab?: Slab, layer?: Layer): void;

  /**
   * Determines which slab owns the specified opening based on geometric overlap
   * @param opening - The opening entity
   * @param layer - Optional layer to search within
   * @returns The owning slab if found, undefined otherwise
   */
  getOpeningOwnedSlab(opening: Opening | ParametricOpening, layer?: Layer): Slab | undefined;

  /**
   * Gets information about the space (room) that contains the opening
   * @param opening - The opening entity (door or parametric door)
   * @returns Space information if found, undefined otherwise
   */
  getBelongSpaceInfo(opening: Opening | ParametricOpening): SpaceInfo | undefined;

  /**
   * Gets the list of inside faces for bay window openings
   * @param opening - The parametric opening
   * @returns Array of interior faces
   */
  getInsideFaces(opening: ParametricOpening): Face[];

  /**
   * Checks if a content entity is inside a room face
   * @param content - The opening or parametric opening
   * @param roomFace - The room face to check against
   * @returns True if content is inside the room face
   */
  isContentInRoom(content: Opening | ParametricOpening, roomFace: Face): boolean;

  /**
   * Creates an updater for opening position when wall geometry changes
   * @param opening - The opening to update
   * @param updateData - Position update data
   * @param wall - Optional wall host
   * @returns Updater object with update method
   */
  getWallChangeUpdater(
    opening: Opening | ParametricOpening,
    updateData: PositionUpdateData,
    wall?: Wall
  ): WallChangeUpdater;

  /**
   * Calculates the angle of an opening on a wall
   * @param opening - The opening entity
   * @param wall - Optional wall host
   * @param shouldReverse - Whether to reverse the direction
   * @returns Angle in degrees, undefined if not applicable
   */
  getOpeningAngle(
    opening: Opening | ParametricOpening,
    wall?: Wall,
    shouldReverse?: boolean
  ): number | undefined;

  /**
   * Determines if the opening direction should be reversed on the wall
   * @param opening - The opening entity
   * @param wall - Optional wall host
   * @returns True if direction should be reversed
   * @internal
   */
  _needReverseDirection(opening: Opening | ParametricOpening, wall?: Wall): boolean;

  /**
   * Gets the face type (left/right/top/bottom) where the opening should snap
   * @param opening - The opening entity
   * @returns Face type identifier
   */
  getSnapFaceType(opening: Opening | ParametricOpening): number | undefined;

  /**
   * Checks if the opening is a valid wall opening type
   * @param opening - Entity to check
   * @returns True if valid wall opening
   */
  isValidOpeningOnWall(opening: unknown): opening is Opening | WindowHole | DHole;

  /**
   * Determines if a door has transparent (glass) panels
   * @param door - The door opening
   * @returns True if door has significant glass area
   */
  isTransparentDoor(door: ParametricOpening): boolean | undefined;

  /**
   * Gets the height range of an opening (base and top elevation)
   * @param opening - The opening entity
   * @returns Height range object
   */
  getOpeningHeightRange(opening: Opening | ParametricOpening): HeightRange;

  /**
   * Gets all walls hosting the opening, including overlapping walls in other layers
   * @param opening - The opening entity
   * @param host - Optional host wall
   * @returns Array of host walls
   */
  getHostWalls(opening: Opening | ParametricOpening, host?: Wall): Wall[];

  /**
   * Gets wall faces affected by a slab hole opening
   * @param opening - The slab hole opening
   * @param options - Optional transform parameters
   * @returns Array of affected wall faces
   */
  getSlabHoleAffectedWallFaces(opening: Opening | ParametricOpening, options?: ResizeOptions): Face[];

  /**
   * Checks if the opening is on an exterior/outside wall
   * @param opening - The opening entity
   * @returns True if on outside wall
   */
  isOutsideOpening(opening: Opening | ParametricOpening): boolean;

  /**
   * Resizes an opening to fit within its host wall constraints
   * @param opening - The opening to resize
   * @param wall - The host wall
   * @param options - Optional resize parameters
   * @returns True if resize was successful
   */
  resizeContent(
    opening: Opening | ParametricOpening,
    wall: Wall,
    options?: ResizeOptions
  ): boolean | undefined;

  /**
   * Gets snap information for a single wall, including face ranges
   * @param opening - The opening entity
   * @param wall - Optional wall host
   * @returns Array of snap information
   */
  getSingleWallSnapInfo(opening: Opening | ParametricOpening, wall?: Wall): WallSnapInfo[] | undefined;

  /**
   * Gets the 2D curve representing a wall face
   * @param face - The wall face
   * @returns The face curve
   */
  getFaceCurve(face: Face): Curve2d | undefined;

  /**
   * Calculates updated position for opening after wall changes
   * @param opening - The opening entity
   * @param updateData - Position update data
   * @param wall - Optional wall host
   * @returns New position vector
   * @internal
   */
  _getUpdatePosition(
    opening: Opening | ParametricOpening,
    updateData: PositionUpdateData,
    wall?: Wall
  ): Vector2;

  /**
   * Checks if an opening is partially within a layer's height range
   * @param opening - The opening entity
   * @param layer - The layer to check
   * @returns True if partially in layer
   */
  isOpeningPartialInLayer(opening: Opening | ParametricOpening, layer: Layer): boolean;

  /**
   * Builds opening geometry in all relevant layers that the opening intersects
   * @param openings - Array of openings to build
   * @param excludeLayers - Optional layers to exclude
   */
  buildOpeningsInRelevantLayers(openings: Array<Opening | ParametricOpening>, excludeLayers?: Layer[]): void;

  /**
   * Checks if an opening spans across multiple layers
   * @param opening - The opening entity
   * @returns True if opening crosses layer boundary
   */
  isCrossLayerOpening(opening: Opening | ParametricOpening): boolean;

  /**
   * Checks if an opening previously crossed layer boundaries (historical check)
   * @param opening - The opening entity
   * @returns True if was cross-layer
   */
  wasCrossLayerOpening(opening: Opening | ParametricOpening): boolean;

  /**
   * Checks if an opening was previously in a layer (historical check)
   * @param opening - The opening entity
   * @param layer - The layer to check
   * @returns True if was in layer
   */
  wasOpeningPartialInLayer(opening: Opening | ParametricOpening, layer: Layer): boolean;

  /**
   * Gets the distance from the opening's base to the floor level
   * @param opening - The parametric opening
   * @returns Distance to floor
   */
  getParametricOpeningDistanceToFloor(opening: ParametricOpening): number;
};