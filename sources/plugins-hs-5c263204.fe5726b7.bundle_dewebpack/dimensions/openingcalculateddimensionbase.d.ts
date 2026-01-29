/**
 * Base class for calculated opening dimensions in 2D views.
 * Provides dimension gizmos for openings placed on walls or roofs.
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { Vector2, Line2d } from './geometry';
import { SVGDimensionType } from './svg-dimension-type';
import { DimensionHelper } from './dimension-helper';

declare namespace OpeningCalculatedDimensionBaseTypes {
  /**
   * Data structure for a single dimension line
   */
  interface DimensionData {
    /** Start point of the dimension line */
    start: Vector2;
    /** End point of the dimension line */
    end: Vector2;
    /** Position where dimension text should be displayed */
    textPosition: Vector2;
    /** Minimum allowed value for this dimension */
    min: number;
    /** Maximum allowed value for this dimension */
    max: number;
    /** Direction vector of the dimension */
    direction?: Vector2;
    /** Whether this dimension is invalid/has errors */
    invalid: boolean;
    /** Whether the dimension direction is inverted */
    inverted?: boolean;
  }

  /**
   * Adjacent points calculated for dimension placement
   */
  interface AdjacentPointsData {
    /** Nearest point to start */
    start: Vector2 | undefined;
    /** Nearest point to end */
    end: Vector2 | undefined;
    /** Left boundary point */
    left: Vector2;
    /** Right boundary point */
    right: Vector2;
    /** Offset vector for dimension line placement */
    offset: Vector2;
    /** Whether the dimension calculation is invalid */
    invalid: boolean;
  }

  /**
   * Working curve data associated with a floor
   */
  interface WorkingCurveData {
    /** The overlapping curve segment */
    workCurve: any; // Specific curve type from geometry system
    /** Associated floor entity (optional) */
    floor?: HSCore.Model.Floor;
  }
}

/**
 * Base class for opening calculated dimensions.
 * Manages dimension gizmos for openings on walls and roofs.
 * @extends HSApp.View.SVG.Gizmo
 */
export declare class OpeningCalculatedDimensionBase extends HSApp.View.SVG.Gizmo {
  /**
   * The opening or related entity being dimensioned
   */
  entity: HSCore.Model.Opening | HSCore.Model.Entity;

  /**
   * Array of 2D dimension view gizmos (up to 6 dimensions)
   * @private
   */
  private _dimensionView2d: HSApp.View.SVG.LinearDimension[];

  /**
   * Flag indicating gizmo needs recalculation
   * @private
   */
  private _gizmoDirty: boolean;

  /**
   * Default offset distance for dimension lines from entity (in model units)
   * @readonly
   */
  readonly kDimensionOffset: number;

  /**
   * Cached intersection points for dimension calculations
   */
  intersectPoints: Vector2[];

  /**
   * Flag indicating if dimension calculation resulted in invalid state
   */
  isInValid: boolean;

  /**
   * Creates an instance of OpeningCalculatedDimensionBase.
   * @param context - Application context
   * @param layer - SVG layer for rendering
   * @param canvas - Canvas element
   * @param entity - The opening or entity to dimension
   */
  constructor(
    context: HSApp.Context,
    layer: SVGElement,
    canvas: HTMLElement,
    entity: HSCore.Model.Opening | HSCore.Model.Entity
  );

  /**
   * Gets the array of dimension view gizmos
   * @readonly
   */
  get dimensionView2d(): HSApp.View.SVG.LinearDimension[];

  /**
   * Returns the unique type identifier for this gizmo class
   * @static
   */
  static uniqueType(): SVGDimensionType;

  /**
   * Called when the gizmo is activated in the view.
   * Sets up event listeners and performs initial update.
   */
  onActivate(): void;

  /**
   * Called when the gizmo is deactivated.
   * Removes all event listeners.
   */
  onDeactivate(): void;

  /**
   * Cleanup method called before gizmo disposal.
   * Cleans up all child dimension gizmos.
   */
  onCleanup(): void;

  /**
   * Updates the gizmo visibility and marks it dirty if entity is valid.
   */
  update(): void;

  /**
   * Renders the gizmo if the view is active.
   * Updates child gizmos if marked dirty.
   */
  draw(): void;

  /**
   * Populates dimension view gizmos with calculated dimension data.
   * @param dimensionDataArray - Array of dimension data for each gizmo
   */
  fillDimensionData(dimensionDataArray: (OpeningCalculatedDimensionBaseTypes.DimensionData | undefined)[]): void;

  /**
   * Updates all child dimension gizmos based on entity type and host.
   * Handles both wall-hosted and roof-hosted openings.
   */
  updateChildGizmo(): void;

  /**
   * Calculates dimension data for roof-hosted opening size.
   * @returns Dimension data or undefined if calculation fails
   * @private
   */
  private _computeRoofOpeningSizeDimensionData(): OpeningCalculatedDimensionBaseTypes.DimensionData | undefined;

  /**
   * Checks if the opening intersects or overlaps with other openings on the wall.
   * @param wall - The host wall entity
   * @param infiniteLine - Infinite line for intersection testing
   * @param directionVector - Direction vector for overlap testing
   * @param boundedLine - Bounded line segment
   * @returns True if intersection or overlap detected
   */
  calcIntersect(
    wall: HSCore.Model.Wall,
    infiniteLine: Line2d,
    directionVector: Vector2,
    boundedLine: any
  ): boolean;

  /**
   * Finds the closest adjacent points on the wall for dimension placement.
   * @param wall - The host wall entity
   * @returns Array of adjacent point data for each working curve
   * @private
   */
  private _getClosestAdjacentPointOnWall(wall: HSCore.Model.Wall): OpeningCalculatedDimensionBaseTypes.AdjacentPointsData[];

  /**
   * Formats dimension view data from adjacent points.
   * Creates three dimension lines (left offset, main, right offset) for each curve.
   * @param adjacentPointsArray - Array of adjacent points data
   * @param outputDimensions - Output array to populate with dimension data
   * @param includeMiddleDimension - Whether to include the middle dimension (default: true)
   */
  formatDimensionView(
    adjacentPointsArray: OpeningCalculatedDimensionBaseTypes.AdjacentPointsData[],
    outputDimensions: (OpeningCalculatedDimensionBaseTypes.DimensionData | undefined)[],
    includeMiddleDimension?: boolean
  ): void;

  /**
   * Gets the length of the opening entity.
   * @returns Length in model units
   * @protected
   */
  protected getEntityLength(): number;

  /**
   * Gets the profile curves of the working entity.
   * @returns Array of curve segments
   * @protected
   */
  protected getWorkingEntityProfile(): any[];

  /**
   * Handles value change commit from dimension input.
   * @param event - Value change event
   * @protected
   */
  protected onValueChangeCommit(event: any): void;

  /**
   * Creates all dimension view gizmos (6 total).
   * @private
   */
  private _createDimensions(): void;

  /**
   * Event handler for command end events.
   * @param event - Command event data
   * @private
   */
  private _onCommandEnd(event: { data: { cmd?: any } }): void;

  /**
   * Finds the nearest intersection point to a reference point.
   * @param direction - Direction vector from reference
   * @param referencePoint - Reference point for distance calculation
   * @returns Nearest point or undefined
   * @private
   */
  private _getNearestPoint(direction: Vector2, referencePoint: Vector2): Vector2 | undefined;

  /**
   * Calculates adjacent points for dimension placement along a curve.
   * @param wall - The host wall entity
   * @param workingCurve - The curve segment to work with
   * @param structuralFaces - Array of structural face geometries
   * @param floor - Optional floor entity
   * @returns Adjacent points data
   * @private
   */
  private _getAdjacentPoints(
    wall: HSCore.Model.Wall,
    workingCurve: any,
    structuralFaces: any[],
    floor?: HSCore.Model.Floor
  ): OpeningCalculatedDimensionBaseTypes.AdjacentPointsData;
}