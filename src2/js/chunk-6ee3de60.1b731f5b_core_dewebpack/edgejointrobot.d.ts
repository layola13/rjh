import { Point, Segment, Vector, Matrix, segment, point, vector, matrix } from '@flatten-js/core';
import { Artisan } from './artisan';
import { ToolType } from './tool-type';
import { WinPolygon, Frame } from './geometry';
import { ShapeColor, DisplayUtils, Utils } from './display-utils';
import { EventType, FrameJointWay } from './events';
import { BaseRobot } from './base-robot';
import { Shape, VShape } from './shapes';

/**
 * Robot data attached to shape elements
 */
interface RobotData {
  /** Whether this robot controls an arc segment */
  arc: boolean;
  /** Index of the edge being controlled */
  idx: number;
  /** Vertex point reference */
  vertex: Point;
  /** Host frame ID */
  hid: string;
}

/**
 * Shape attribute data structure
 */
interface ShapeData {
  /** Polygon geometry */
  poly: WinPolygon;
  /** Fill color */
  fcolor: string;
  /** Whether dragging is enabled */
  drag: boolean;
}

/**
 * Anchor creation result
 */
interface AnchorResult {
  /** Geometric shape */
  shape: WinPolygon;
  /** Visual shape element */
  vshape: VShape;
}

/**
 * Host object interface for EdgeJointRobot
 */
interface EdgeJointHost {
  /** Host's unique identifier */
  id: string;
  /** Polygon geometry */
  polygon: WinPolygon;
  /** Whether drag modification is enabled */
  dragModify: boolean;
  /** Top-level parent frame */
  topFrame: Frame;
  /** Show extra dimension angles */
  showExtraDimAngle(): void;
  /** Extra dimension manager */
  extraDimManager: {
    draw(view: View): void;
  };
}

/**
 * View interface containing rendering context
 */
interface View {
  /** Active drawing layer */
  activeLayer: {
    add(shape: VShape): void;
  };
  /** Event bus for emitting UI events */
  eventBus: {
    emit(event: { type: EventType; payload: unknown }): void;
  };
  /** Shape manager for layout calculations */
  shapeManager: {
    refreshTotalHeight(): void;
    refreshTotalWidth(): void;
  };
}

/**
 * Frame manager interface
 */
interface FrameManager {
  /** Host frame or polygon being controlled */
  host: EdgeJointHost;
  /** Inner polygon geometries */
  innerPoly: WinPolygon[];
  /**
   * Drag an arc control point
   * @param edgeIndex - Index of the edge
   * @param vertex - Target vertex position
   * @param view - Rendering view
   */
  dragArc(edgeIndex: number, vertex: Point, view: View): void;
  /**
   * Drag a vertex control point
   * @param edgeIndex - Index of the edge
   * @param vertex - Target vertex position
   * @param robData - Robot data context
   * @param view - Rendering view
   * @param offset - Position offset
   */
  dragVertex(
    edgeIndex: number,
    vertex: Point,
    robData: RobotData,
    view: View,
    offset: Point
  ): void;
}

/**
 * Edge joint robot for manipulating polygon edges and vertices.
 * Provides interactive control points for modifying frame geometry.
 */
export declare class EdgeJointRobot extends BaseRobot {
  /** Frame manager instance */
  private readonly fm: FrameManager;
  
  /** Rendering view reference */
  private readonly view: View;
  
  /** Whether the controlled polygon is a circle */
  private isCircle: boolean;
  
  /** Array of geometric shapes for control points */
  private shapes: WinPolygon[];
  
  /** Array of visual shape elements */
  private vshapes: VShape[];
  
  /** Size of robot control handles */
  protected readonly rsize: number;

  /**
   * Creates an edge joint robot instance
   * @param frameManager - Frame manager to control
   * @param view - Rendering view context
   */
  constructor(frameManager: FrameManager, view: View);

  /**
   * Creates anchor control points for all edges of a polygon
   * @param host - Host object containing polygon geometry
   */
  private createAnchor(host: EdgeJointHost): void;

  /**
   * Creates a single control point anchor
   * @param segment - Edge segment to create anchor for
   * @param edgeIndex - Index of the edge in polygon
   * @param isArc - Whether this controls an arc segment
   * @returns Shape and visual shape pair
   */
  private create(
    segment: Segment,
    edgeIndex: number,
    isArc: boolean
  ): AnchorResult;

  /**
   * Hit test to check if a point intersects any control handle
   * @param point - Test point in world coordinates
   * @returns True if a handle was hit and highlighted
   */
  hitBar(point: Point): boolean;

  /**
   * Computes transformation matrix for positioning control handles
   * @param center - Center point of control handle
   * @returns Transformation matrix accounting for parent transforms
   */
  private getMatrix(center: Point): Matrix;

  /**
   * Attaches robot controls to a host object and updates positions
   * @param host - Host object to attach to
   */
  attach(host: EdgeJointHost): void;

  /**
   * Handles dragging of control points
   * @param edgeIndex - Index of edge being modified
   * @param vertex - New vertex position
   * @param isArc - Whether dragging an arc control
   * @param robData - Robot data context
   * @param offset - Position offset (default: origin point)
   */
  drag(
    edgeIndex: number,
    vertex: Point,
    isArc: boolean,
    robData: RobotData,
    offset?: Point
  ): void;

  /**
   * Hides all control handles
   */
  hide(): void;
}