import type Flatten from '@flatten-js/core';
import type { WinPolygon } from './WinPolygon';
import type { BaseRobot } from './BaseRobot';
import type { ToolType } from './ToolType';
import type { Artisan } from './Artisan';
import type { Utils, ShapeColor } from './Utils';

/**
 * Data attributes for connector robot visual shapes
 */
interface ConnectorRobotShapeData {
  /** The polygon geometry of the shape */
  poly: WinPolygon;
  /** Fill color for the shape */
  fcolor: string;
  /** Whether the shape is draggable */
  drag: boolean;
  /** Whether this is a middle shape between corners */
  isMiddleShape: boolean;
  /** Index of the associated corner edge */
  cornerEdgeIndex: number;
}

/**
 * Visual shape interface for connector robot handles
 */
interface VShape {
  /** Set an attribute on the visual shape */
  setAttr(key: string, value: unknown): void;
  /** Get the current transformation matrix */
  getTransform(): Transform;
  /** Internal method to apply transformed values */
  _setTransform(decomposed: DecomposedTransform): void;
  /** Move the shape to the top of the rendering stack */
  moveToTop(): void;
  /** Show the visual shape */
  show(): void;
  /** Check if the shape is currently visible */
  isVisible(): boolean;
}

/**
 * Transform matrix representation
 */
interface Transform {
  /** Matrix values [a, b, c, d, tx, ty] */
  m: [number, number, number, number, number, number];
  /** Decompose the transformation into components */
  decompose(): DecomposedTransform;
}

/**
 * Decomposed transformation components
 */
interface DecomposedTransform {
  translateX: number;
  translateY: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
}

/**
 * Host shape that the connector robot attaches to
 */
interface HostShape {
  /** The polygon geometry of the host shape */
  polygon: {
    edges: Flatten.Segment[];
    box: {
      center: Flatten.Point;
    };
    /** Clone the polygon with new edges */
    cloneWith(edges: Flatten.Segment[]): WinPolygon;
  };
  /** The center edge of the connector */
  centerEdge: Flatten.Segment;
  /** Get parent transformation matrices */
  getParentMatrices(): Flatten.Matrix[];
  /** Update the polygon geometry */
  updatePoly(poly: WinPolygon): void;
  /** Redraw the shape */
  draw(view: unknown): void;
  /** Outer edges of the shape */
  outerEdges: Flatten.Segment[];
}

/**
 * ConnectorRobot handles the visual manipulation controls for connector shapes.
 * It creates draggable handles at both ends of a connector that allow users to
 * adjust the connector's length by dragging.
 */
export declare class ConnectorRobot extends BaseRobot {
  /** The view/canvas this robot operates on */
  protected view: unknown;
  
  /** Internal polygon shapes for the robot handles */
  protected shapes: WinPolygon[];
  
  /** Visual shape representations rendered on the view */
  protected vshapes: VShape[];
  
  /** The connector shape this robot is currently attached to */
  protected hostShape?: HostShape;
  
  /** Robot handle size in pixels */
  protected rsize: number;
  
  /** Cached center point */
  protected cpt?: Flatten.Point;

  /**
   * Creates a new ConnectorRobot instance
   * @param view - The view/canvas to render robot handles on
   */
  constructor(view: unknown);

  /**
   * Creates the robot handle geometries for a connector shape.
   * Generates two rectangular handles positioned at both ends of the connector's center edge,
   * perpendicular to the edge direction.
   * @param hostShape - The connector shape to create handles for
   */
  create(hostShape: HostShape): void;

  /**
   * Attaches the robot to a connector shape and displays the handles.
   * Hides any previous handles, creates new ones, and applies the correct transformations
   * based on the host shape's position and parent transformations.
   * @param hostShape - The connector shape to attach to
   */
  attach(hostShape: HostShape): void;

  /**
   * Translates all robot handle shapes by the given vector
   * @param vector - The translation vector to apply
   */
  translate(vector: Flatten.Vector): void;

  /**
   * Handles dragging operations to adjust the connector's length.
   * Projects the drag movement onto the connector's axis and updates the edge geometry.
   * @param shape - The handle shape being dragged
   * @param edgeIndex - Index of the edge being modified
   * @param dragVector - The drag movement vector
   * @param view - The view to redraw on
   */
  dragLength(
    shape: WinPolygon,
    edgeIndex: number,
    dragVector: Flatten.Vector,
    view: unknown
  ): void;

  /**
   * Computes the transformation matrix for positioning robot handles.
   * Accounts for the host shape's parent transformations to ensure handles
   * appear in the correct screen space position.
   * @param center - The center point to transform from
   * @returns The computed transformation matrix
   */
  getMatrix(center: Flatten.Point): Flatten.Matrix;

  /**
   * Tests if a point intersects any of the robot's visible handles.
   * Applies transformations and highlights handles on hover.
   * @param point - The point to test for intersection
   * @returns True if the point hits any handle, false otherwise
   */
  hitTest(point: Flatten.Point): boolean;
}