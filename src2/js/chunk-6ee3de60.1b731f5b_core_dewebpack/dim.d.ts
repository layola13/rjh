/**
 * Dimension management module for shapes
 * Handles creation, display, and management of dimensional annotations
 */

import Flatten from '@flatten-js/core';
import { ToolType } from './ToolType';
import { DrawParams } from './DrawParams';
import { Direction, EdgeFinder } from './EdgeFinder';
import { EventType, DimSetting } from './EventBus';
import { DimType, InnerSpaceDimInfo, InnerSpaceDimRefType } from './DimTypes';
import { CirclePoly, ThreeDimensionalArcPoly, SingleTrackPolygon } from './PolygonTypes';
import { 
  ShapeColor, 
  Utils, 
  DockTaskStatus, 
  PolyId, 
  DockType, 
  EqualSplitType 
} from './Utils';
import { 
  Shape, 
  ShapeType, 
  Frame, 
  Sash, 
  KfcSash, 
  DoubleKfcSash, 
  SubFrame, 
  DimInfo, 
  DimInfoManager, 
  InnerMullionDimInfo, 
  MullionDimInfo, 
  ChordDimInfo, 
  AlignTypeEnum 
} from './CoreTypes';

/**
 * Represents dimensional information for a shape
 * Manages frame dimensions, mullion dimensions, and inner space dimensions
 */
export declare class Dim extends Shape {
  /** The host shape that owns this dimension */
  host: Frame | Sash;
  
  /** Outer distance for dimension positioning */
  odist: number;
  
  /** Visual shapes representing dimension lines */
  vshapes: Shape[];
  
  /** Manager for dimension information */
  diMgr: DimInfoManager;
  
  /** Map storing maximum distances by edge index */
  maxdMap: Map<number, number>;

  /**
   * Creates a new Dim instance
   * @param host - The shape that owns this dimension
   */
  constructor(host: Frame | Sash);

  /**
   * Gets the bounding box containing all dimension lines
   */
  get box(): Flatten.Box;

  /**
   * Sets the visibility status of a frame dimension
   * @param edgeIndex - Index of the edge
   * @param show - Whether to show the dimension
   * @param view - The view to redraw
   */
  setFrameDimStatus(edgeIndex: number, show: boolean, view: unknown): void;

  /**
   * Draws all dimension lines
   * @param view - The view to draw on
   * @param resetDisplayLength - Whether to reset display lengths
   */
  draw(view: unknown, resetDisplayLength?: boolean): void;

  /**
   * Updates the polygon and recalculates dimensions
   * @param polygon - New polygon geometry
   */
  updatePoly(polygon?: Flatten.Polygon): void;

  /**
   * Serializes dimension data to JSON
   * @returns JSON representation of dimensions
   */
  toJSON(): { dims: unknown[] };

  /**
   * Deserializes dimension data from JSON
   * @param data - JSON data containing dimension information
   */
  deserialize(data: { dims?: unknown[] }): void;

  /**
   * Tests if a point hits this dimension
   * @param point - Point to test
   * @returns True if point hits the dimension
   */
  hitTest(point: Flatten.Point): boolean;

  /**
   * Recycles dimension resources
   * @param recycleChildren - Whether to recycle child elements
   */
  recycle(recycleChildren?: boolean): void;

  /**
   * Translates all dimension lines by a vector
   * @param offset - Translation vector
   */
  translate(offset: Flatten.Vector): void;

  /**
   * Creates dimension information for all edges and mullions
   * @param preserveExisting - Whether to preserve existing dimension data
   */
  createDimInfo(preserveExisting?: boolean): void;

  /**
   * Removes dirty mullion dimension information
   * @param dockManager - Dock manager for dimensions
   */
  removeDirtyMullionInfo(dockManager: unknown): void;

  /**
   * Checks if dimension data is dirty (needs update)
   * @returns True if frame count doesn't match edge count
   */
  checkDirty(): boolean;

  /**
   * Creates visual shapes for all dimensions
   */
  createDimShapes(): void;

  /**
   * Creates dimension line for a frame edge
   * @param dimInfo - Dimension information
   * @param bars - Frame bars
   * @param edge - Edge geometry
   * @param bottomEdges - Indexes of bottom edges
   */
  createFrameDim(
    dimInfo: DimInfo,
    bars: unknown[],
    edge: Flatten.Segment | Flatten.Arc,
    bottomEdges: number[]
  ): void;

  /**
   * Creates a dimension line
   * @param dimInfo - Dimension information
   * @param segment - Segment to dimension
   * @param bar - Reference bar
   * @param tangent - Tangent vector
   * @param additionalOffset - Additional offset distance
   * @param reverseOrientation - Whether to reverse orientation
   */
  createDim(
    dimInfo: DimInfo,
    segment: Flatten.Segment,
    bar: unknown,
    tangent: Flatten.Vector,
    additionalOffset?: number,
    reverseOrientation?: boolean
  ): void;

  /**
   * Creates dimension lines for mullions
   * @param dimInfo - Dimension information
   * @param bottomEdges - Indexes of bottom edges
   */
  createMulDim(dimInfo: MullionDimInfo, bottomEdges: number[]): void;

  /**
   * Creates chord height dimension for arc mullions
   * @param dimInfo - Dimension information
   */
  createMulChordHeight(dimInfo: DimInfo): void;

  /**
   * Creates inner space dimension lines
   * @param dimInfo - Dimension information
   * @param frame - Frame shape
   * @param bottomEdges - Indexes of bottom edges
   */
  createInnerSpaceDim(
    dimInfo: InnerSpaceDimInfo,
    frame: Frame,
    bottomEdges: number[]
  ): void;

  /**
   * Creates mullion projection dimensions
   * @param dimInfo - Dimension information
   */
  createMulProjectionDim(dimInfo: DimInfo): void;

  /**
   * Gets adjusted length based on dock type
   * @param dock - Dock information
   * @param bar - Bar reference
   * @returns Adjusted length
   */
  getAdjustedLength(dock: unknown, bar: unknown): number;

  /**
   * Grows segment by endpoint dock adjustments
   * @param bar - Bar to grow
   * @returns Adjusted segment
   */
  growByEpDock(bar: unknown): Flatten.Segment;

  /**
   * Creates inner mullion dimension lines
   * @param dimInfo - Dimension information
   */
  createInnerMulDim(dimInfo: InnerMullionDimInfo): void;

  /**
   * Calculates mullion distance information
   * @param edge - Edge segment
   * @param mullionShape - Mullion geometry
   * @param bar - Mullion bar
   * @param dimInfo - Dimension information
   * @param point - Reference point
   * @returns Distance tuple [distance, segment]
   */
  calcMulDist(
    edge: Flatten.Segment,
    mullionShape: Flatten.Segment | Flatten.Arc,
    bar: unknown,
    dimInfo: DimInfo,
    point: Flatten.Point
  ): [number[], Flatten.Segment];

  /**
   * Calculates maximum distance for an edge
   * @param edgeIndex - Index of the edge
   * @returns Maximum distance
   */
  calcMaxd(edgeIndex: number): number;

  /**
   * Calculates offset distance based on slope and length
   * @param slope - Slope angle
   * @param length - Base length
   * @returns Offset distance
   */
  static calcDist(slope: number, length: number): number;

  /**
   * Tests if a point hits a dimension bar
   * @param point - Point to test
   * @param view - View context
   * @returns True if hit detected
   */
  hitBar(point: Flatten.Point, view: unknown): boolean;

  /**
   * Ensures all mullion bars have proper alignment settings
   */
  ensureAlignment(): void;
}