import { Vector2, Loop, MathAlg } from 'math-geometry-library';
import { SnapHelper } from './SnapHelper';
import { HSCore } from './HSCore';

/**
 * Position entities collection for snap calculation
 */
interface PositionEntities {
  /** Wall entities in the current layer */
  walls: any[];
  /** Structure entities in the current layer */
  structures: any[];
  /** Beam entities in the current layer */
  beams: any[];
  /** Hole entities in the current layer */
  holes: any[];
  /** Current room entity, if any */
  room: any | undefined;
}

/**
 * Options for extracting snap geometries
 */
interface ExtractSnapGeomOptions {
  /** Whether to include room boundary curves in snap calculation */
  includeRoomCurves: boolean;
}

/**
 * Helper class for snapping holes to nearby geometric entities.
 * Extends SnapHelper to provide hole-specific snapping behavior,
 * including handling of slab openings in outdoor layers.
 */
export declare class HoleSnapHelper extends SnapHelper {
  /**
   * Collection of entities that participate in position snapping
   * @private
   */
  private _posEntities: PositionEntities;

  /**
   * Extracted geometric primitives used for snap calculations
   * @private
   */
  private _snapGeometries: any[];

  /**
   * Current working layer for snap operations
   */
  currentLayer: any;

  /**
   * Master entity being operated on
   */
  currentMaster: any;

  /**
   * Retrieves and caches snap objects for the current operation.
   * Filters relevant entities and extracts their geometric data.
   * @private
   */
  private _getSnapObjs(): void;

  /**
   * Filters entities in the current context to determine which
   * should participate in snap calculations.
   * @returns Collection of filtered entities organized by type
   * @private
   */
  private _filter(): PositionEntities;

  /**
   * Filters entities when the master is inside a room
   * @param room - The containing room
   * @param entities - Entity collection to populate
   * @private
   */
  private _filter_inroom(room: any, entities: PositionEntities): void;

  /**
   * Filters entities when the master is outside any room
   * @param layer - The current layer
   * @param entities - Entity collection to populate
   * @private
   */
  private _filter_outroom(layer: any, entities: PositionEntities): void;

  /**
   * Extracts snap geometries from position entities
   * @param entities - Position entities to extract from
   * @param options - Extraction options
   * @returns Array of snap geometries
   * @private
   */
  private _extractSnapGeom(
    entities: PositionEntities,
    options: ExtractSnapGeomOptions
  ): any[];

  /**
   * Determines if a point is within the outdoor layer's slab boundaries.
   * Only applicable when the current master is a slab opening.
   * @param point - Point coordinates to test (array or object with x, y)
   * @returns True if the point is inside any outdoor slab boundary
   */
  inOutdoorLayer(point: number[] | { x: number; y: number }): boolean;

  /**
   * Recalculates the appropriate layer for the current master entity.
   * Handles special logic for slab openings in outdoor layers:
   * - Switches to outdoor layer if hole is within outdoor slab
   * - Switches to active layer if hole is outside outdoor slab
   */
  reClacLayer(): void;

  /**
   * Resets the current working layer and clears cached snap data.
   * Used when the layer context changes during operations.
   * @param layer - The new layer to set as current
   */
  resetCurrentLayer(layer: any): void;
}