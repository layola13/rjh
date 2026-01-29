/**
 * Module: ParametricCustomizedCeilingLoopBuilder
 * Provides utilities for building and managing parametric customized ceiling loops,
 * including light slots, light bands, and moldings.
 */

import { CeilingUtil } from './CeilingUtil';

/**
 * Represents edge range information for room calculations
 */
interface EdgeRangeInfo {
  wallIndex: number;
  min: number;
  max: number;
  value: number;
  area: number;
}

/**
 * Represents a 2D point coordinate
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Opening range information
 */
interface OpeningRange {
  min: number;
  max: number;
}

/**
 * Opening information for edges
 */
interface EdgeOpeningInfo {
  edgeIndex: number;
  opening: HSCore.Model.Opening;
  type: 'window' | 'door' | 'hole' | 'unknown';
  range: OpeningRange;
}

/**
 * Light slot metadata structure
 */
interface LightSlotMetaData {
  path: unknown;
  parameters: Record<string, unknown>;
  options: {
    lightSlotId?: string;
    [key: string]: unknown;
  };
}

/**
 * Light band metadata structure
 */
interface LightBandMetaData {
  parameters: Record<string, unknown>;
  options: {
    lightBandId?: string;
    [key: string]: unknown;
  };
}

/**
 * Molding metadata structure
 */
interface MoldingMetaData {
  profile?: unknown;
  options?: {
    moldingId?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Object with optional type property for marking
 */
interface TypeMarkable {
  type?: string;
  [key: string]: unknown;
}

/**
 * Applies morphological opening to a polygon and returns the processed result
 * @param polygon - Input polygon vertices
 * @param offset - Opening offset value
 * @returns Processed polygon vertices or empty array
 */
declare function applyMorphologicalOpening(
  polygon: Point2D[],
  offset: number
): Point2D[];

/**
 * Creates a CustomizedModelLightSlot from metadata
 * @param metaData - Light slot metadata
 * @returns CustomizedModelLightSlot instance or undefined
 */
export declare function createCustomizedModelLightSlot(
  metaData?: LightSlotMetaData
): HSCore.Model.CustomizedModelLightSlot | undefined;

/**
 * Creates a new NCustomizedModelLightSlot instance
 * @returns New NCustomizedModelLightSlot
 */
export declare function createNCustomizedModelLightSlot(): HSCore.Model.NCustomizedModelLightSlot;

/**
 * Creates a new NCustomizedModelLightBand instance
 * @returns New NCustomizedModelLightBand
 */
export declare function createNCustomizedModelLightBand(): HSCore.Model.NCustomizedModelLightBand;

/**
 * Creates a CustomizedModelLightBand from metadata
 * @param metaData - Light band metadata
 * @returns CustomizedModelLightBand instance or undefined
 */
export declare function createCustomizedModelLightBand(
  metaData?: LightBandMetaData
): HSCore.Model.CustomizedModelLightBand | undefined;

/**
 * Creates a CustomizedModelMolding from metadata
 * @param metaData - Molding metadata
 * @returns CustomizedModelMolding instance or undefined
 */
export declare function createCustomizedModelMolding(
  metaData?: MoldingMetaData
): HSCore.Model.CustomizedModelMolding | undefined;

/**
 * Creates a new NCustomizedModelMolding instance
 * @returns New NCustomizedModelMolding
 */
export declare function createNCustomizedModelMolding(): HSCore.Model.NCustomizedModelMolding;

/**
 * Finds the maximum area loop from given polygon vertices
 * @param vertices - Input polygon vertices
 * @param applyOpening - Whether to apply morphological opening
 * @param simplify - Whether to simplify the polygon
 * @param openingOffset - Optional opening offset value
 * @returns Processed polygon vertices
 */
export declare function findMaxAreaLoop(
  vertices: Point2D[],
  applyOpening: boolean,
  simplify: boolean,
  openingOffset?: number
): Point2D[];

/**
 * Marks type property for THREE.js objects in a nested structure
 * Recursively adds type identifiers to Vector2, Vector3, and Plane objects
 * @param obj - Object to mark with type information
 */
export declare function markParamType(obj: TypeMarkable): void;

/**
 * Synchronizes children elements (moldings, light slots, light bands) based on WebCAD document
 * Updates existing elements and adds/removes as needed
 * @param entity - Entity containing children to synchronize
 */
export declare function syncChildrenByWebCADDocument(
  entity: HSCore.Model.Entity
): void;

/**
 * Checks if a face represents a light slot
 * @param entity - Entity to check
 * @param faceId - Face identifier
 * @returns True if the face is a light slot
 */
export declare function isLightSlot(
  entity: HSCore.Model.Entity,
  faceId: string | number
): boolean;

/**
 * Builder class for creating parametric customized ceiling loops
 * Handles polygon generation, shrinking, and loop creation for ceiling elements
 */
export declare class ParametricCustomizedCeilingLoopBuilder {
  /** The room (Floor/Ceiling) entity */
  readonly room: HSCore.Model.Floor | HSCore.Model.Ceiling;
  
  /** Position point for polygon generation */
  readonly pos: Point2D;
  
  /** Whether to use room's default polygon without shrinking */
  readonly useRoomDefaultPolygon: boolean;

  /**
   * Creates a new ParametricCustomizedCeilingLoopBuilder
   * @param room - Room entity (Floor or Ceiling)
   * @param pos - Position point
   * @param useRoomDefaultPolygon - Use default polygon without processing (default: false)
   */
  constructor(
    room: HSCore.Model.Floor | HSCore.Model.Ceiling,
    pos: Point2D,
    useRoomDefaultPolygon?: boolean
  );

  /**
   * Shrinks the outline polygon based on door/window openings
   * Adjusts vertices to account for wall openings and edge intersections
   * @returns Shrunk polygon vertices
   */
  shrinkOutlinePolygon(): Point2D[];

  /**
   * Generates the base outline polygon for the ceiling loop
   * Retrieves room path and processes vertices
   * @returns Outline polygon vertices
   */
  generateOutlinePolygon(): Point2D[];

  /**
   * Generates a ceiling loop with specified level
   * Applies morphological opening based on level-specific parameters
   * @param level - Loop level (1-3), affects opening intensity
   * @returns Final loop polygon vertices
   */
  generateLoop(level: number): Point2D[];
}