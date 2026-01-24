/**
 * Wall module - Represents a wall shape in the design system
 * Handles wall geometry, dimensions, connections with frames, and interactive editing
 */

import type Flatten from '@flatten-js/core';
import type { ToolType } from './ToolType';
import type { FillPatternType } from './FillPatternType';
import type { Shape, ShapeType, Frame, CornerJoiner, TopView, PolyParser, SizeDim, Dimension, HoleStyle } from './Shape';
import type { WallEdgeJointRobot } from './WallEdgeJointRobot';
import type { Artisan, DrawParams } from './Artisan';
import type { Utils } from './Utils';
import type { Direction, EdgeFinder, FrameUtil } from './FrameUtil';

/**
 * Represents a hole configuration within the wall polygon
 */
export interface HoleConfig {
  /** Visual style of the hole */
  style: HoleStyle;
  /** Edge segments that define the hole boundary */
  edges: Flatten.Segment[];
}

/**
 * Serialized representation of a Wall for persistence
 */
export interface WallJSON {
  /** Shape type identifier */
  type: ShapeType;
  /** Serialized polygon geometry */
  polygon: unknown;
  /** Height dimension data */
  dim: unknown;
  /** Width dimension data */
  dimW: unknown;
}

/**
 * View/ShapeManager interface for interacting with the canvas
 */
export interface WallView {
  /** Active drawing layer */
  activeLayer: unknown;
  /** Shape management interface */
  shapeManager: {
    /** All shapes in the scene */
    shapem: Shape[];
    /** Connector shapes */
    connectors: Shape[];
    /** Corner joiner shapes */
    cornerJoiners: CornerJoiner[];
    /** Wall shapes */
    walls: Wall[];
    /** Update all ground dimensions */
    updateAllDimToGround(): void;
    /** Refresh dimension visibility/status */
    refreshDimStatus(): void;
  };
  /** Refresh the view rendering */
  refresh(): void;
}

/**
 * Wall class - Main structural element that can contain frames, doors, and windows
 * Extends Shape to provide wall-specific geometry, dimensions, and editing capabilities
 */
export declare class Wall extends Shape {
  /** Associated view context */
  readonly view: WallView;
  
  /** Whether this wall is currently selected */
  selected: boolean;
  
  /** Hole configurations for frames/openings within the wall */
  holes: HoleConfig[];
  
  /** Interactive joint manipulation tool */
  readonly joint: WallEdgeJointRobot;
  
  /** Dimension for wall height */
  readonly dimForHeight: SizeDim;
  
  /** Dimension for wall width */
  readonly dimForWidth: SizeDim;
  
  /** Bottom margin dimension (distance from contained elements) */
  readonly bottomMarginDim: Dimension;
  
  /** Left margin dimension */
  readonly leftMarginDim: Dimension;
  
  /** Right margin dimension */
  readonly rightMarginDim: Dimension;
  
  /** Total height dimension including margins */
  readonly totalHeightDim: Dimension;

  /**
   * Creates a new Wall instance
   * @param polygon - The geometric shape defining the wall boundary
   * @param view - The view context for rendering and interaction
   */
  constructor(polygon: Flatten.Polygon, view: WallView);

  /**
   * Bounding box encompassing the wall and all dimensions
   */
  get box(): Flatten.Box;

  /**
   * All dimension objects associated with this wall
   */
  get dims(): [SizeDim, SizeDim];

  /**
   * Whether this wall is behind other components (contains child elements)
   */
  get isBackground(): boolean;

  /**
   * Components (frames, connectors, etc.) that are contained within this wall's bounds
   */
  get coverComponents(): Shape[];

  /**
   * Handles height editing interaction
   * @param newHeight - The new height value in mm
   */
  onEditHeight(newHeight: number): void;

  /**
   * Handles width editing interaction
   * @param newWidth - The new width value in mm
   */
  onEditWidth(newWidth: number): void;

  /**
   * Checks if the wall is adjacent to a frame in the specified direction
   * @param direction - Direction to check (Up, Down, Left, Right)
   * @returns True if a frame is adjacent in that direction
   */
  besideFrame(direction: Direction): boolean;

  /**
   * Hit test for wall selection
   * @param point - Point to test
   * @param tolerance - Hit test tolerance
   * @returns True if the point hits the wall
   */
  hitWall(point: Flatten.Point, tolerance: number): boolean;

  /**
   * Deletes the wall if selected
   * @param event - Deletion event context
   * @returns True if the wall was deleted
   */
  delete(event: unknown): boolean;

  /**
   * Renders the wall to the view
   * @param view - Target view for rendering
   */
  draw(view: WallView): void;

  /**
   * Updates the wall polygon and recalculates all dependent geometry
   * @param newPolygon - Optional new polygon to replace current geometry
   */
  updatePoly(newPolygon?: Flatten.Polygon): void;

  /**
   * Updates the bottom margin dimension based on contained components
   * @param components - Components within the wall
   * @param offset - Offset distance for dimension placement
   */
  updateBottomMarginDim(components: Shape[], offset: number): void;

  /**
   * Updates the left margin dimension
   * @param components - Components within the wall
   * @param offset - Offset distance for dimension placement
   */
  updateLeftMarginDim(components: Shape[], offset: number): void;

  /**
   * Updates the right margin dimension
   * @param components - Components within the wall
   * @param offset - Offset distance for dimension placement
   */
  updateRightMarginDim(components: Shape[], offset: number): void;

  /**
   * Updates the total height dimension
   * @param offset - Offset distance for dimension placement
   */
  updateTotalHeightDim(offset: number): void;

  /**
   * Translates the wall and all associated dimensions
   * @param vector - Translation vector
   */
  translate(vector: Flatten.Vector): void;

  /**
   * Hides all interactive assistance elements (joints, handles)
   */
  hideAssist(): void;

  /**
   * Recycles/cleans up resources
   * @param deep - Whether to perform deep cleanup
   */
  recycle(deep?: boolean): void;

  /**
   * Serializes the wall to JSON
   * @returns JSON representation of the wall
   */
  toJSON(): WallJSON;

  /**
   * Deserializes wall from JSON data
   * @param data - JSON data to deserialize
   * @param view - View context for rendering
   */
  deserialize(data: WallJSON, view: WallView): void;

  /**
   * Attempts to snap a point to the nearest wall edge
   * @param point - Point to snap
   * @param testPoint - Additional test point for snap validation
   * @param excludeShape - Shape to exclude from snapping (typically the shape being moved)
   * @returns Snapped edge segment or undefined if no snap found
   */
  snapEdge(point: Flatten.Point, testPoint: Flatten.Point, excludeShape: Shape | null): Flatten.Segment | undefined;

  /**
   * Attempts to snap to the nearest wall vertex
   * @param point - Point to snap
   * @param excludeShapeId - ID of shape to exclude from snapping
   * @returns Snapped vertex point or undefined if no snap found
   */
  snapVertex(point: Flatten.Point, excludeShapeId: string): Flatten.Point | undefined;

  /**
   * Finds the wall edge that best aligns with a frame for connection
   * @param frame - Frame to snap to the wall
   * @returns Wall edge segment for connection or undefined if no suitable edge found
   */
  snapToFrame(frame: Frame): Flatten.Segment | undefined;
}