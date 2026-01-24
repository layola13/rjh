import { Vector3, Line3 } from 'three';
import * as HSApp from './hsapp';
import * as HSCore from './hscore';
import * as HSCatalog from './hscatalog';

/**
 * Point marker types for 3D content visualization
 */
export enum WebGLPointMarkerType {
  upLeftTop = 'upLeftTop',
  upRightTop = 'upRightTop',
  downLeftTop = 'downLeftTop'
}

/**
 * Linear dimension types for measuring content
 */
export enum LinearDimensionType {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  back = 'back'
}

/**
 * Bounding box points for content positioning
 */
export interface BoundingPoints {
  leftTop: { x: number; y: number; z: number };
  leftBottom: { x: number; y: number; z: number };
  rightTop: { x: number; y: number; z: number };
  rightBottom: { x: number; y: number; z: number };
  upZ: number;
  downZ: number;
}

/**
 * Collision detection result
 */
export interface CollisionInfo {
  intersect: Vector3;
  line: Line3;
  param1: number;
  param2: number;
  type: 'content' | 'wall';
  content?: HSCore.Model.Content;
}

/**
 * Dimension measurement data
 */
export interface DimensionData {
  start?: Vector3;
  end?: Vector3;
  intersect?: Vector3;
  line?: Line3;
  param2?: number;
  endToWall?: Vector3;
  collisionType?: 'content' | 'wall';
  content?: HSCore.Model.Content;
}

/**
 * Value change event data
 */
export interface ValueChangedEvent {
  data: {
    value: number;
    oldValue: number;
    dim: HSApp.View.T3d.LinearDimension;
  };
}

/**
 * Display controller for content gizmo operations
 */
export declare class ContentGizmoController extends HSApp.View.Base.DisplayController {
  readonly content: HSCore.Model.Content;

  constructor(context: HSApp.Context, content: HSCore.Model.Content);

  /**
   * Move content to specified position
   */
  protected _move(position: { x?: number; y?: number; z?: number }): void;

  /**
   * Calculate target position based on dimension value
   */
  targetWithDimValue(dimension: DimensionData, value: number): { x: number; y: number };

  /**
   * Handle dimension value changes
   */
  dispatch(event: ValueChangedEvent): void;
}

/**
 * 3D content gizmo for visualization and interaction
 */
export default class ContentGizmo extends HSApp.View.Base.Gizmo {
  isEnabled: boolean;
  transManager: HSApp.TransactionManager;
  content: HSCore.Model.Content;
  host: HSCore.Model.Face | HSCore.Model.Content;
  room: HSCore.Model.Room | null;
  pointMarkers: Map<WebGLPointMarkerType, HSApp.View.T3d.PointMarker>;
  lineDimensions: Map<LinearDimensionType, HSApp.View.T3d.LinearDimension>;
  controller: ContentGizmoController;

  constructor(
    context: HSApp.Context,
    canvas: HSApp.Canvas,
    content: HSCore.Model.Content
  );

  /**
   * Cleanup resources and event listeners
   */
  onCleanup(): void;

  /**
   * Activate gizmo and register event listeners
   */
  onActivate(): void;

  /**
   * Deactivate gizmo and unregister listeners
   */
  onDeactivate(): void;

  /**
   * Iterate over contents that may collide with this gizmo
   */
  forEachCollisionContent(callback: (content: HSCore.Model.Content) => void): void;

  /**
   * Get bounding points of the content
   */
  protected _getBoundingPoints(content: HSCore.Model.Content): BoundingPoints;

  /**
   * Update point marker positions
   */
  protected _updatePointMarkers(markers: Map<WebGLPointMarkerType, HSApp.View.T3d.PointMarker>): void;

  /**
   * Initialize point markers for content corners
   */
  protected _initPointMarkers(
    context: HSApp.Context,
    canvas: HSApp.Canvas,
    content: HSCore.Model.Content
  ): Map<WebGLPointMarkerType, HSApp.View.T3d.PointMarker>;

  /**
   * Initialize child gizmos (dimensions and markers)
   */
  protected _initChildenGizmo(
    context: HSApp.Context,
    canvas: HSApp.Canvas,
    content: HSCore.Model.Content
  ): void;

  /**
   * Get contents that may collide with specified line
   */
  protected _getCollisionContents(line: Line3): HSCore.Model.Content[];

  /**
   * Check if content edges are perpendicular to line
   */
  protected _isPerpendicular(content: HSCore.Model.Content, line: Line3): boolean;

  /**
   * Find closest collision line from content array
   */
  protected _getClosestCollisionLine(
    contents: HSCore.Model.Content[],
    line: Line3
  ): CollisionInfo | undefined;

  /**
   * Get collision point between line and room wall
   */
  protected _getCollisionPointToWall(line: Line3): CollisionInfo | undefined;

  /**
   * Get dimension measurement data for specified type
   */
  getLinearDimensionDataByType(type: LinearDimensionType): DimensionData;

  /**
   * Handle dimension value change events
   */
  onValueChanged(event: ValueChangedEvent): void;

  /**
   * Update all dimension measurements
   */
  updateDimensionData(): void;

  /**
   * Mark gizmo as needing update
   */
  update(): void;

  /**
   * Show gizmo if enabled
   */
  show(): void;

  /**
   * Hide gizmo
   */
  hide(): void;

  /**
   * Render gizmo to canvas
   */
  draw(): void;

  /**
   * Handle content field changes
   */
  protected _onContentFieldChange(): void;

  /**
   * Handle application setting changes
   */
  protected _onSettingChanged(event: { data: { fieldName: string; oldValue: any; value: any } }): void;

  /**
   * Handle view activation events
   */
  protected _onViewActivated(event: { data: { newView: HSApp.Canvas } }): void;
}