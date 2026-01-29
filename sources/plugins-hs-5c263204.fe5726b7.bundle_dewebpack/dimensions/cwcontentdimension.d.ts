/**
 * Module: CWContentDimension
 * Provides dimension measurement and positioning functionality for concealed work (CW) content items.
 */

import { Vector3, Line3 } from './Vector3Types';
import { ContentTypeEnum } from './ContentTypes';
import { ViewModeEnum, PointMarkerType, LinearDimensionType } from './ViewTypes';
import { HSCatalog, HSCore, HSApp } from './HSTypes';

/**
 * Supported dimension face types for content measurement
 */
export enum DimensionFaceType {
  centerBottom = 'centerBottom',
  centerBack = 'centerBack',
  centerTop = 'centerTop',
}

/**
 * Collision detection result for dimension calculations
 */
export interface CollisionInfo {
  /** Intersection point in 3D space */
  intersect: Vector3;
  /** The line segment involved in collision */
  line: Line3;
  /** Parameter along the first line (0-1) */
  param1: number;
  /** Parameter along the second line (0-1) */
  param2: number;
  /** Type of collision detected */
  type: 'content' | 'wall';
  /** Content item involved in collision, if applicable */
  content?: HSCore.Model.Content;
}

/**
 * Linear dimension data structure
 */
export interface LinearDimensionData {
  /** Starting point of dimension line */
  start?: Vector3;
  /** Ending point of dimension line */
  end?: Vector3;
  /** Intersection point with obstacles */
  intersect?: Vector3;
  /** Line segment representing the dimension */
  line?: Line3;
  /** Secondary parameter for dimension calculation */
  param2?: number;
  /** Associated content item */
  content?: HSCore.Model.Content;
  /** Type of collision detected */
  collisionType?: 'content' | 'wall';
}

/**
 * Mid-line snap data for alignment
 */
export interface MidLineData {
  /** Start point of snap line */
  start: Vector3;
  /** End point of snap line */
  end: Vector3;
}

/**
 * Point marker initialization data
 */
export interface PointMarkerData {
  /** Position in 3D space */
  position: Vector3;
  /** Optional marker configuration */
  config?: unknown;
}

/**
 * Dimension update parameters
 */
export interface DimensionUpdateParams {
  /** Start point of dimension */
  start?: Vector3;
  /** End point of dimension */
  end?: Vector3;
  /** Screen bounding rectangle */
  bound?: ClientRect;
  /** Mid-line alignment data */
  midSnapLineData?: MidLineData[];
}

/**
 * Content geometric lines for alignment calculations
 */
export interface ContentLines {
  /** Horizontal mid-line */
  hMidLine: Line3;
  /** Vertical mid-line */
  vMidLine: Line3;
}

/**
 * View mode change event data
 */
export interface ViewModeChangedEventData {
  /** New view mode */
  newViewMode: ViewModeEnum;
  /** Previous view mode */
  oldViewMode: ViewModeEnum;
}

/**
 * Setting change event data
 */
export interface SettingChangedEventData {
  /** Name of the setting field that changed */
  fieldName: string;
  /** New value */
  value: unknown;
  /** Previous value */
  oldValue: unknown;
}

/**
 * Dimension value change event data
 */
export interface DimensionValueChangedEventData {
  /** New dimension value */
  value: number;
  /** Previous dimension value */
  oldValue: number;
  /** Associated dimension object */
  dim?: {
    type: LinearDimensionType;
  };
}

/**
 * Main dimension gizmo class for concealed work content items.
 * Handles dimension display, collision detection, and interactive positioning.
 */
export declare class CWContentDimension extends BaseDimensionGizmo {
  /**
   * Creates a new CWContentDimension instance
   * @param context - Application context
   * @param layer - Layer containing the content
   * @param content - The content item to dimension
   */
  constructor(
    context: HSApp.Context,
    layer: HSCore.Model.Layer,
    content: HSCore.Model.Content
  );

  /**
   * Called when the dimension gizmo is activated.
   * Sets up event listeners for view mode changes.
   */
  onActivate(): void;

  /**
   * Handles primary view mode changes (2D/3D/Elevation).
   * Refreshes point markers and updates dimension display.
   * @param event - View mode change event
   */
  protected _onPrimaryViewModeChanged(event: { data: ViewModeChangedEventData }): void;

  /**
   * Determines the alignment type based on content type.
   * Water-related content uses type 0, others use user-configured type.
   * @returns Alignment type: 0 for center-based, 1 for edge-based
   */
  protected _getAlginType(): 0 | 1;

  /**
   * Updates the cached room and collision contents for the dimensioned item.
   */
  protected _updateContentRoom(): void;

  /**
   * Updates point marker positions based on content geometry.
   * @param markers - Map of point markers to update
   */
  protected _updatePointMarkers(markers: Map<PointMarkerType, HSApp.View.T3d.PointMarker>): void;

  /**
   * Gets all applicable point marker types for the current dimension face.
   * @returns Array of point marker types to display
   */
  protected _getAllPointMarkerTypes(): PointMarkerType[];

  /**
   * Initializes or refreshes the point marker collection.
   * @param context - Application context
   * @param layer - Content layer
   * @param content - Content item
   * @returns Map of initialized point markers
   */
  protected _initPointMarkers(
    context: HSApp.Context,
    layer: HSCore.Model.Layer,
    content: HSCore.Model.Content
  ): Map<PointMarkerType, HSApp.View.T3d.PointMarker>;

  /**
   * Refreshes all point markers when alignment or view mode changes.
   */
  protected _refreshPointMarkers(): void;

  /**
   * Handles user setting changes (e.g., dimension alignment type).
   * @param event - Setting change event
   */
  protected _onSettingChanged(event: { data: SettingChangedEventData }): void;

  /**
   * Calculates linear dimension data for a specific dimension type.
   * Performs collision detection and finds closest obstacles.
   * @param dimensionType - Type of dimension to calculate
   * @returns Dimension data including start/end points and collision info
   */
  getLinearDimensionDataByType(dimensionType: LinearDimensionType): LinearDimensionData;

  /**
   * Finds the closest collision line among multiple content items.
   * @param contents - Array of potentially colliding content items
   * @param measureLine - Line along which to measure
   * @param dimensionType - Type of dimension being calculated
   * @returns Closest collision info, if any
   */
  protected _getClosestLine(
    contents: HSCore.Model.Content[],
    measureLine: Line3,
    dimensionType: LinearDimensionType
  ): CollisionInfo | undefined;

  /**
   * Retrieves content items that may collide with the given outline polygon.
   * @param outline - Polygon outline to check for collisions
   * @param dimensionType - Type of dimension being calculated
   * @param tolerance - Distance tolerance for collision detection (default: 1e-6)
   * @returns Array of colliding content items
   */
  protected _getCollisionContents(
    outline: Array<{ x: number; y: number }>,
    dimensionType: LinearDimensionType,
    tolerance?: number
  ): HSCore.Model.Content[];

  /**
   * Refreshes content bounding boxes for collision detection.
   */
  protected _refreshContentBound(): void;

  /**
   * Checks if content is hosted on a wall face.
   * @param content - Content item to check
   * @returns True if hosted on wall
   */
  protected _isWallHost(content: HSCore.Model.Content): boolean;

  /**
   * Iterates through all content items that may collide with this dimension.
   * @param callback - Function to call for each collision candidate
   */
  forEachCollisionContent(callback: (content: HSCore.Model.Content) => void): void;

  /**
   * Updates all dimension line data based on current content position.
   */
  updateDimensionData(): void;

  /**
   * Calculates mid-line snap data for aligning with another content item.
   * @param content - Target content for alignment
   * @returns Array of snap lines
   */
  protected _getMidLineData(content: HSCore.Model.Content): MidLineData[];

  /**
   * Extracts horizontal and vertical mid-lines from content geometry.
   * @param content - Content item to analyze
   * @returns Object containing h/v mid-lines
   */
  protected _getContentLines(content: HSCore.Model.Content): ContentLines;

  /**
   * Calculates the center point between two 3D points.
   * @param point1 - First point
   * @param point2 - Second point
   * @returns Center point
   */
  protected _getCenterPoint(point1: Vector3, point2: Vector3): Vector3;

  /**
   * Finds collision point with nearest wall along a ray.
   * @param ray - Ray to test for wall collision
   * @returns Collision info if wall intersected
   */
  protected _getCollisionPointToWall(ray: Line3): CollisionInfo | undefined;

  /**
   * Checks if content orientation is perpendicular to measurement line.
   * @param content - Content to check
   * @param line - Measurement line
   * @returns True if perpendicular
   */
  protected _isPerpendicular(content: HSCore.Model.Content, line: Line3): boolean;

  /**
   * Gets the room containing the content.
   * @param content - Content item
   * @param layer - Layer containing the content
   * @returns Room instance
   */
  protected _getRoomContentIn(
    content: HSCore.Model.Content,
    layer: HSCore.Model.Layer
  ): HSCore.Model.Room;

  /**
   * Gets the height of a room.
   * @param room - Room to measure
   * @returns Room height in model units
   */
  protected _getRoomHeight(room: HSCore.Model.Room): number;

  /**
   * Gets the 8 corner points of content bounding box.
   * @param content - Content item
   * @returns Array of 8 bounding box corners
   */
  getContentBoundingPoints(content: HSCore.Model.Content): Vector3[];

  /**
   * Gets the center point of a dimension face.
   * @param face - Face type
   * @returns Center point of the face
   */
  getDimensionFaceCenter(face: DimensionFaceType): Vector3;

  /**
   * Gets the screen-space bounding rectangle of content.
   * @param content - Content item
   * @returns Client rectangle in screen coordinates
   */
  getContentScreenBound(content: HSCore.Model.Content): ClientRect;

  /** The dimension face used for measurements */
  protected accordingFace: DimensionFaceType;
  
  /** Content item being dimensioned */
  protected content: HSCore.Model.Content;
  
  /** Room containing the content */
  protected room?: HSCore.Model.Room;
  
  /** Collection of point markers */
  protected pointMarkers: Map<PointMarkerType, HSApp.View.T3d.PointMarker>;
  
  /** Collection of linear dimension gizmos */
  protected lineDimensions: Map<LinearDimensionType, HSApp.View.T3d.LinearDimension>;
  
  /** Whether the gizmo has been disposed */
  protected _disposed: boolean;
  
  /** Contents in the same room for collision detection */
  protected _roomContents: HSCore.Model.Content[];
}

/**
 * Controller for handling dimension value changes and content positioning.
 */
export declare class ContentDimensionController {
  /**
   * Creates a new controller instance
   * @param content - Content item to control
   * @param context - Application context
   */
  constructor(content: HSCore.Model.Content, context: HSApp.Context);

  /**
   * Dispatches dimension value change and moves content accordingly.
   * @param event - Dimension value change event
   */
  dispatch(event: { data: DimensionValueChangedEventData }): void;

  /**
   * Calculates target position based on dimension value.
   * @param dimension - Dimension being modified
   * @param value - New dimension value
   * @returns New position properties
   */
  protected targetWithDimValue(
    dimension: { type: LinearDimensionType },
    value: number
  ): Partial<{ x: number; y: number; z: number }> | undefined;

  /**
   * Moves content to new position.
   * @param position - New position properties
   */
  protected _move(position?: Partial<{ x: number; y: number; z: number }>): void;

  /** The content item being controlled */
  protected content: HSCore.Model.Content;
}