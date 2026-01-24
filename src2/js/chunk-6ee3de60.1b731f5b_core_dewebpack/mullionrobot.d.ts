import type { Point, Vector, Matrix, Segment } from '@flatten-js/core';
import type { WinPolygon } from './WinPolygon';
import type { Bar, Sash } from './Frame';
import type { CutLine } from './CutLine';
import type { BaseRobot } from './BaseRobot';
import type { ToolType } from './ToolType';
import type { EventBus, EventType, BarEndpoint } from './EventBus';
import type { DrawParams } from './DrawParams';
import type { Artisan, DisplayUtils, Utils, ShapeColor } from './ShapeUtils';

/**
 * Data attached to robot shapes for drag operations
 */
export interface RobotData {
  /** Whether this is an arc control point */
  arc: boolean;
  /** The point being controlled */
  pt: Point;
  /** Center point for rotation */
  cpt: Point;
  /** Polygon index */
  idx: number;
  /** Whether this is the start point */
  start: boolean;
  /** Inner edge index for cut lines */
  innerEdgeIndex: number;
}

/**
 * Shape attributes for robot visualization
 */
export interface ShapeAttributes {
  /** Polygon and color data */
  data: {
    poly: WinPolygon;
    fcolor: ShapeColor;
    drag: boolean;
  };
  /** Reference to the robot instance */
  robot: MullionRobot;
  /** Robot-specific data */
  robData: RobotData;
  /** Tool type identifier */
  tool: ToolType;
}

/**
 * Visual shape wrapper with Konva-like API
 */
export interface VShape {
  /** Get shape attributes */
  attrs: ShapeAttributes;
  /** Set shape attribute */
  setAttr<K extends keyof ShapeAttributes>(key: K, value: ShapeAttributes[K]): void;
  /** Get transformation matrix */
  getTransform(): {
    m: [number, number, number, number, number, number];
    decompose(): any;
  };
  /** Internal method to set transform */
  _setTransform(transform: any): void;
  /** Move shape to top layer */
  moveToTop(): void;
  /** Show the shape */
  show(): void;
  /** Check if shape is visible */
  isVisible(): boolean;
}

/**
 * View/Canvas interface for rendering
 */
export interface View {
  /** Active drawing layer */
  activeLayer: {
    add(shape: VShape): void;
  };
  /** Event bus for cross-component communication */
  eventBus: EventBus;
}

/**
 * Mullion manager for handling frame divisions
 */
export interface MullionManager {
  /** Splitter for dividing polygons */
  splitter: {
    /** Split lines in the manager */
    lines: Array<{
      start: { fixed: boolean };
      end: { fixed: boolean };
    }>;
    /** Adjust mullion position */
    tweak(
      index: number,
      points: Point[],
      offset: Vector,
      immediate: boolean,
      sync: boolean,
      rotationCenter?: Point
    ): void;
  };
  /** Refresh visualization */
  refresh(view: View): void;
}

/**
 * Mullion status check result
 */
interface MullionStatus {
  /** Whether dragging is allowed */
  drag: boolean;
  /** Control point for rotation */
  cpt: Point;
}

/**
 * Shape creation result
 */
interface ShapeResult {
  /** The geometric shape */
  shape: WinPolygon;
  /** The visual representation */
  vshape: VShape;
}

/**
 * Robot for manipulating mullion bars in window frames.
 * Handles creation, attachment, and dragging of mullion control points.
 */
export declare class MullionRobot extends BaseRobot {
  /** Mullion manager reference */
  private mm: MullionManager;
  
  /** View/canvas reference */
  private view: View;
  
  /** The mullion bar being controlled */
  private mulBar: Bar;
  
  /** Control points for the mullion */
  private mulPts: Point[];
  
  /** Rotation center point */
  private rotCpt: Point;
  
  /** Geometric shapes for hit testing */
  private shapes: WinPolygon[];
  
  /** Visual shapes for rendering */
  private vshapes: VShape[];
  
  /** Size of robot control handles */
  protected rsize: number;

  /**
   * Create a new MullionRobot
   * @param mm - Mullion manager
   * @param view - View for rendering
   */
  constructor(mm: MullionManager, view: View);

  /**
   * Create anchor points for mullion bar manipulation
   * @param bar - The mullion bar to attach to
   */
  createAnchor(bar: Bar): void;

  /**
   * Create a single control point shape
   * @param point - Position of the control point
   * @param polyIndex - Polygon index
   * @param isArc - Whether this is an arc control point
   * @param isStart - Whether this is the start point
   * @param innerEdgeIndex - Inner edge index for cut lines
   * @returns Shape and visual shape pair
   */
  create(
    point: Point,
    polyIndex: number,
    isArc: boolean,
    isStart: boolean,
    innerEdgeIndex: number
  ): ShapeResult;

  /**
   * Check mullion constraints and determine drag behavior
   * @param isStart - Whether checking the start point
   * @returns Mullion status with drag permission and control point
   */
  checkMullionStatus(isStart: boolean): MullionStatus;

  /**
   * Hit test against mullion bar control points
   * @param point - Test point in world coordinates
   * @returns True if any control point was hit
   */
  hitBar(point: Point): boolean;

  /**
   * Send bar endpoint event when control point is interacted with
   * @param vshape - The visual shape that was interacted with
   */
  sendBarEndpointEvent(vshape: VShape): void;

  /**
   * Get transformation matrix for shape positioning
   * @param center - Center point of the shape
   * @returns Transformation matrix accounting for parent transforms
   */
  getMatrix(center: Point): Matrix;

  /**
   * Attach robot to a mullion bar
   * @param bar - The bar to attach to
   */
  attach(bar: Bar): void;

  /**
   * Drag mullion control point
   * @param offset - Translation vector or rotation angle
   * @param index - Control point index
   * @param sync - Whether to sync with other components
   * @param rotationCenter - Center point for rotation (default: origin)
   * @param rotationVector - Rotation axis vector (default: zero vector)
   * @param isRotation - Whether this is a rotation operation (default: false)
   */
  drag(
    offset: Vector | number,
    index: number,
    sync: boolean,
    rotationCenter?: Point,
    rotationVector?: Vector,
    isRotation?: boolean
  ): void;

  /**
   * Hide robot controls
   */
  hide(): void;
}