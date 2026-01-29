import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { ContentTypeEnum } from './ContentTypeEnum';
import { Line2d, Vector2, Loop, MathAlg } from './MathTypes';
import { NewFurnitureDimension } from './NewFurnitureDimension';

/**
 * Direction and starting point information for dimension calculations
 */
interface DirectionStartPoint {
  /** Direction vector for the dimension line */
  dir: Vector2;
  /** Starting point for the dimension measurement */
  startPt: Vector2;
}

/**
 * Starting points for all four cardinal directions
 */
interface ContentStartPoints {
  /** Left side starting point */
  left: Vector2;
  /** Right side starting point */
  right: Vector2;
  /** Top side starting point */
  top: Vector2;
  /** Bottom side starting point */
  bottom: Vector2;
}

/**
 * Linear dimension data containing start and end points
 */
interface LinearDimensionData {
  /** Starting point of the dimension */
  startPoint: Vector2;
  /** Ending point of the dimension */
  endPoint?: Vector2;
}

/**
 * Helper line data for dimension visualization
 */
interface HelperLinearData {
  /** Start point of the helper line */
  start: Vector2;
  /** End point of the helper line */
  end: Vector2;
}

/**
 * Helper box data for dimension visualization (structure to be defined)
 */
interface HelperBoxData {
  // Structure depends on implementation details
  [key: string]: unknown;
}

/**
 * Curve information for dimension candidate detection
 */
interface CurveInfo {
  /** Associated entity */
  entity: HSCore.Model.Content;
  /** 2D curve representation */
  curve: Line2d;
}

/**
 * Complete dimension information including linear and helper data
 */
interface DimensionInfo {
  /** Linear dimension data */
  linearDimensionData: LinearDimensionData;
  /** Helper line data for visualization */
  helperLinearData?: HelperLinearData;
  /** Helper box data for visualization */
  helperBoxData?: HelperBoxData;
}

/**
 * Intersection information between dimension line and content
 */
interface IntersectInfo extends DimensionInfo {
  /** Starting point of intersection calculation */
  startPoint: Vector2;
  /** Ending point where intersection occurs */
  endPoint?: Vector2;
}

/**
 * Setting change event data
 */
interface SettingChangeEvent {
  data: {
    /** Name of the field that changed */
    fieldName: string;
    [key: string]: unknown;
  };
}

/**
 * NewConcealedworkDimension - Handles dimension calculations for concealed work content
 * 
 * This class extends NewFurnitureDimension to provide specialized dimensioning
 * for concealed work items like plumbing, electrical, etc. It calculates dimensions
 * from content edges to nearby walls and other content.
 */
export declare class NewConcealedworkDimension extends NewFurnitureDimension {
  /**
   * Default tolerance for geometric calculations (in model units)
   */
  private _defaultTol: number;

  /**
   * Direction vectors and starting points for dimension lines in all four directions
   */
  private _dirStartPts: DirectionStartPoint[];

  /**
   * Type identifier for this gizmo
   */
  readonly type: string;

  /**
   * Information about candidate content curves for dimensioning
   */
  protected contentCurvesInfo: CurveInfo[];

  /**
   * The content entity being dimensioned
   */
  protected entity: HSCore.Model.Content;

  /**
   * Context containing auxiliary options for validation
   */
  protected context: {
    auxOptions?: {
      canCreateEntity(entity: HSCore.Model.Content): boolean;
    };
  };

  /**
   * Creates a new concealed work dimension gizmo
   * 
   * @param entity - The content entity to dimension
   * @param param1 - Second constructor parameter (type depends on parent class)
   * @param param2 - Third constructor parameter (type depends on parent class)
   */
  constructor(entity: HSCore.Model.Content, param1: unknown, param2: unknown);

  /**
   * Validates whether a content entity can be dimensioned
   * 
   * Checks if the content is:
   * - Not removed or hidden
   * - Allowed by auxiliary options
   * - Not a ceiling light
   * - Has at least one parent entity
   * 
   * @param content - The content entity to validate
   * @returns True if the content is valid for dimensioning
   */
  isValidContent(content: HSCore.Model.Content): boolean;

  /**
   * Finds the nearest intersection between a dimension line and candidate content
   * 
   * Calculates intersections between the dimension line (in the specified direction)
   * and all candidate content curves, returning information about the closest intersection.
   * Special handling is applied for unique concealed work content within rooms.
   * 
   * @param line - The dimension line to test intersections against
   * @param candidates - Array of candidate content with their curves
   * @returns Intersection information including dimension and helper data
   */
  getNearestIntersectInfo(line: Line2d, candidates: CurveInfo[]): IntersectInfo;

  /**
   * Computes child gizmo information for the dimension
   * 
   * Calculates direction vectors and starting points for dimension lines,
   * then delegates to parent class implementation.
   */
  computeChildGizmoInfo(): void;

  /**
   * Handles setting changes that affect dimension display
   * 
   * @param event - Setting change event containing field name and new value
   */
  protected _onSettingChanged(event: SettingChangeEvent): void;

  /**
   * Checks if a content entity is a valid candidate for dimensioning
   * 
   * A candidate must:
   * - Not be the entity being dimensioned
   * - Pass validation checks
   * - Have a valid bounding box
   * - Not have intersecting outline with the source entity
   * 
   * @param content - The content entity to check
   * @returns True if the content is a valid dimension candidate
   */
  checkCandidateContent(content: HSCore.Model.Content): boolean;

  /**
   * Finds all candidate content entities for dimensioning
   * 
   * Searches through structure faces and linked walls to find content
   * that should be dimensioned relative to the source entity.
   * 
   * @param entity - The source entity to find candidates for
   * @returns Array of candidate content entities
   */
  protected _findCandidateContents(entity: HSCore.Model.Content): HSCore.Model.Content[];

  /**
   * Computes dimension information for overlapping content
   * 
   * Calculates dimension data when content overlaps with a dimension line.
   * If no intersection endpoint is found, projects the target point onto the line.
   * 
   * @param line - The dimension line
   * @param targetPoint - The point to dimension to
   * @returns Complete dimension information including helper data
   */
  computeOverLapDimensionInfo(line: Line2d, targetPoint: Vector2): DimensionInfo;

  /**
   * Gets dimension information for a given line and curve candidates
   * 
   * @param line - The dimension line
   * @param candidates - Array of candidate curves
   * @returns Complete dimension information
   */
  protected getDimensionInfoByLine(line: Line2d, candidates: CurveInfo[]): DimensionInfo;

  /**
   * Calculates helper data for dimension visualization
   * 
   * @param curve - The curve being dimensioned
   * @param point - The dimension point
   * @param entity - The entity being dimensioned
   * @returns Helper line and box data for rendering
   */
  protected calculateHelperData(
    curve: Line2d | undefined,
    point: Vector2 | undefined,
    entity: HSCore.Model.Content | undefined
  ): {
    helperLinearData?: HelperLinearData;
    helperBoxData?: HelperBoxData;
  };

  /**
   * Filters candidate curves that intersect with a dimension line's region
   * 
   * Creates a rectangular region from the dimension line and its perpendiculars,
   * then filters curves that intersect this region.
   * 
   * @param line - The dimension line defining the region
   * @param candidates - Array of all candidate curves
   * @returns Filtered array of curves within the dimension region
   */
  getCandidateCurvesInfoByLine(line: Line2d, candidates: CurveInfo[]): CurveInfo[];

  /**
   * Computes direction vectors and starting points for all four cardinal directions
   * 
   * Calculates normalized direction vectors (left, right, top, bottom) based on
   * the entity's outline, and determines appropriate starting points based on
   * the content type and alignment settings.
   */
  private _computeDirAndStartPt(): void;

  /**
   * Determines the alignment type for concealed work content
   * 
   * Returns alignment type based on content category:
   * - 0: Center alignment (for water-related content)
   * - Custom setting value: For other content types
   * 
   * @param content - The content entity to check
   * @returns Alignment type (0 for center, or custom setting value)
   */
  private _getAlginType(content: HSCore.Model.Content): number;

  /**
   * Calculates starting points for dimension lines in all four directions
   * 
   * Based on content type and alignment settings, determines appropriate
   * starting points for dimensions on each side of the content.
   * 
   * @param content - The content entity to calculate starting points for
   * @returns Starting points for all four cardinal directions
   */
  private _getCWContentStartPoint(content: HSCore.Model.Content): ContentStartPoints;

  /**
   * Calculates the center point of a line segment
   * 
   * @param start - Start point of the segment
   * @param end - End point of the segment
   * @returns Center point of the segment
   */
  private _getCenterOfSegment(start: Vector2, end: Vector2): Vector2;

  /**
   * Gets the room curve that the content snaps to in 2D
   * 
   * Searches through room paths (outer boundary and holes) to find a curve
   * that overlaps with the content's edge line.
   * 
   * @param content - The content entity
   * @param room - The room containing the content
   * @returns The room curve that the content aligns with, or undefined if none found
   */
  private _getSnapedRoomCurveIn2D(
    content: HSCore.Model.Content,
    room: HSCore.Model.Room
  ): Line2d | undefined;

  /**
   * Updates the dimension display
   */
  update(): void;
}