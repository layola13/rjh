import { Vector, Point, Segment, Line } from './flatten-js';
import { WinPolygon } from './WinPolygon';
import { BaseRobot } from './BaseRobot';
import { DrawParams, Artisan } from './DrawParams';
import { ShapeColor } from './ShapeColor';
import { ToolType } from './ToolType';

/**
 * Robot data attached to visual shapes for drag operations
 */
interface RobotData {
  /** Index of the edge or vertex */
  idx: number;
  /** The vertex point being controlled */
  vertex: Point;
  /** Whether this is a vertex control point (true) or edge control point (false) */
  vertexControl: boolean;
  /** Wall entity ID */
  hid: string | number;
}

/**
 * Shape attributes for rendering and interaction
 */
interface ShapeAttributes {
  /** Polygon geometry data */
  poly: WinPolygon;
  /** Fill color */
  fcolor: string;
  /** Whether the shape is draggable */
  drag: boolean;
}

/**
 * Visual shape representation in the view layer
 */
interface VShape {
  /** Move shape to top of rendering order */
  moveToTop(): void;
  /** Show the shape */
  show(): void;
  /** Hide the shape */
  hide(): void;
  /** Translate shape by vector */
  translate(offset: Vector): void;
  /** Set shape attribute */
  setAttr(key: string, value: unknown): void;
}

/**
 * View/Canvas interface for rendering
 */
interface View {
  /** Active drawing layer */
  activeLayer: {
    /** Add shape to layer */
    add(shape: VShape): void;
  };
}

/**
 * Wall entity with polygon geometry
 */
interface Wall {
  /** Unique wall identifier */
  id: string | number;
  /** Polygon defining wall geometry */
  polygon: WinPolygon;
  /** Update polygon with drag offset */
  updatePoly(offset: Vector): void;
  /** Redraw wall in view */
  draw(view: View): void;
}

/**
 * Robot for editing wall edges and joints interactively.
 * Provides visual anchors for dragging vertices and edge midpoints.
 * 
 * @extends BaseRobot
 */
export declare class WallEdgeJointRobot extends BaseRobot {
  /** Reference to the rendering view */
  protected view: View;
  
  /** Wall entity this robot is attached to */
  protected wall: Wall;
  
  /** Collection of polygon shapes for anchors */
  protected shapes: WinPolygon[];
  
  /** Visual shape representations in the view */
  protected vshapes: VShape[];

  /**
   * Constructs a new WallEdgeJointRobot
   * @param view - The rendering view context
   */
  constructor(view: View);

  /**
   * Attach robot to a wall entity and initialize anchors
   * @param wall - Wall entity to control
   */
  attach(wall: Wall): void;

  /**
   * Perform drag operation on wall geometry
   * @param offset - Drag offset vector
   * @param index - Edge or vertex index
   * @param isVertex - True if dragging vertex, false if dragging edge
   */
  drag(offset: Vector, index: number, isVertex: boolean): void;

  /**
   * Drag wall geometry to absolute target position
   * @param target - Target point position
   * @param index - Edge or vertex index
   * @param isVertex - True if dragging vertex, false if dragging edge
   * @param skipRounding - Skip rounding to integer coordinates (default: false)
   */
  dragTo(target: Point, index: number, isVertex: boolean, skipRounding?: boolean): void;

  /**
   * Round drag offset to integer coordinates
   * @param offset - Raw drag offset vector
   * @returns Rounded offset vector
   */
  protected roundDragOffset(offset: Vector): Vector;

  /**
   * Translate all robot shapes by offset
   * @param offset - Translation vector
   */
  translate(offset: Vector): void;

  /**
   * Create rectangular anchor shape geometry
   * @param width - Anchor width
   * @param height - Anchor height
   * @returns Polygon representing anchor shape
   */
  protected anchorShape(width: number, height: number): WinPolygon;

  /**
   * Create all anchor shapes for wall edges and vertices
   */
  protected createAnchors(): void;

  /**
   * Create single anchor for edge or vertex
   * @param edge - Edge segment to create anchor for
   * @param index - Edge index
   * @param isVertex - True to create vertex anchor, false for edge midpoint anchor
   */
  protected createEdgeAnchor(edge: Segment, index: number, isVertex?: boolean): void;

  /**
   * Hide all visual shapes
   */
  hide(): void;

  /**
   * Show all visual shapes
   */
  show(): void;
}